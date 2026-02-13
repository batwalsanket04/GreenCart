import Order from "../Models/Order.js";
import Products from "../Models/ProductModel.js";
import Stripe from 'stripe'
import User from "../Models/User.js"

export const placeOrderCOD = async (req, res) => {
  try {
    const { userId, items, address } = req.body;

    if (!address || items.length === 0) {
      return res.json({ success: false, message: "Invalid data" });
    }

    let amount = await items.reduce(async (acc, item) => {
      const total = await acc;
      const product = await Products.findById(item.product);

      return total + product.offerPrice * item.quantity;
    }, Promise.resolve(0));

    amount += Math.floor(amount * 0.02);

    await Order.create({
      userId,
      items,
      amount,
      address,
      paymentType: "COD",
    });

    return res.json({ success: true, message: "Order placed successfully" });

  } catch (error) {
    console.log(error.message);
    res.json({ success: false, message: error.message });
  }
};

// place order 

export const placeOrderStripe = async (req, res) => {
  try {
    const { userId, items, address } = req.body;
    const { origin } = req.headers;

    if (!address || items.length === 0) {
      return res.json({ success: false, message: "Invalid data" });
    }

    let productData = [];

    //  correct async reduce
    let amount = await items.reduce(async (acc, item) => {
      const total = await acc;
      const product = await Products.findById(item.product);

      productData.push({
        name: product.name,
        price: product.offerPrice,
        quantity: item.quantity,
      });

      return total + product.offerPrice * item.quantity;
    }, Promise.resolve(0));

    amount += Math.floor(amount * 0.02);

    const order = await Order.create({
      userId,
      items,
      amount,
      address,
      paymentType: "Online",
    });

    const stripeInstance = new Stripe(process.env.STRIPE_SECRET_KEY);

    //  stripe line items
    const line_items = productData.map((item) => ({
      price_data: {
        currency: "inr",
        product_data: {
          name: item.name,
        },
        unit_amount: Math.floor(item.price * 1.02) * 100,
      },
      quantity: item.quantity,
    }));



    // stripe session
    const session = await stripeInstance.checkout.sessions.create({
      line_items,
      mode: "payment",
      success_url: `${origin}/loader?next=my-orders`,
      cancel_url: `${origin}/cart`,
      metadata: {
        orderId: order._id.toString(),
        userId,
      },
    });

    return res.json({ success: true, url: session.url });

  } catch (error) {
    console.log(error.message);
    res.json({ success: false, message: error.message });
  }
};

// Stripe webhooks to verify payment action:/stripe

export const stripeWebhook=async(req,res)=>{
    const stripeInstance = new Stripe(process.env.STRIPE_SECRET_KEY);
    const sig=req.headers["stripe-signature"];
    let event;
    try {
      event=stripeInstance.webhooks.constructEvent(
        req.body,
        sig,
        process.env.STRIPE_WEBHOOK_SECRET
      );
    } catch (error) {
      res.status(400).send(`Webhook Error L ${error.message}`)
    }

    // handle event

    switch(event.type)
    {
      case "Payment_intent_successed":
        {
          const paymentIntent=event.data.object;
          const paymentIntentId=paymentIntent.id

          // getting session metadata
          const session=await stripeInstance.checkout.session.list({
            paymentIntent:paymentIntentId,
          });

          const {orderId,userId}=session.data[0].metadata;
          // mark payment as paid

          await Order.findByIdAndUpdate(orderId,{isPaid:true})
          //clear user cart

          await User.findByIdAndUpdate(userId,{cartItems:{}})
          break;

        }
        case "payment_intent_failed":
          {
             const paymentIntent=event.data.object;
          const paymentIntentId=paymentIntent.id

          // getting session metadata
          const session=await stripeInstance.checkout.session.list({
            paymentIntent:paymentIntentId,
          });

          const {orderId}=session.data[0].metadata;
          // mark payment as paid

          await Order.findByIdAndDelete(orderId);
          break;
          break;
          }

        break;

        default:
          console.error(`Unhandled event type ${event.type}`)
          break;
    }
}



export const getUserOrders = async (req, res) => {
  try {
    const { userId } = req.body;

    const orders = await Order.find({
      userId,
      $or: [
        { paymentType: "COD" },
        { isPaid: true }
      ]
    })
      .populate("items.product address")
      .sort({ createdAt: -1 });

    res.json({ success: true, orders });

  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};


// all order for admin and seller


export const getAllOrders = async (req, res) => {
  try {

    const orders = await Order.find({
      $or: [
        { paymentType: "COD" },
        { isPaid: true }
      ]
    })
      .populate("items.product address").sort({createdAt:-1});

    res.json({ success: true, orders });

  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};

