import Order from "../Models/Order.js";
import Products from "../Models/ProductModel.js";

export const placeOrderCOD=async(req,res)=>{
    try {
        const {userId,items,address}=req.body;

        if(!address || items.length===0)
        {
            return res.json({success:false,message:"Invalid data"})
        }

        let amount=await item.reduce(async(ActiveXObject,item)=>{
            const product=await Products.findById(item.product)
            return (await acc)+product.offerPrice*item.quantity;

        },0)
        amount +=Math.floor(amount *0.02);

        await Order.create({
            userId,items,amount,address,paymentType:"COD"
        });
        return res.json({success:true,message:"Order placed successfully"})
    } catch (error) {
         console.log(error.message)
         res.json({success:false,message:error.message})
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

