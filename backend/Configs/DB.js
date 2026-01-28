import mongoose from "mongoose";

const Connection=async()=>{

    try {
      await mongoose.connect(`${process.env.MONGOOSE_URL}`);

        console.log("Database Connected")
        console.log(mongoose.connection.readyState)
    } catch (error) {
         console.log("Connection failed")
    }


}

export default Connection;