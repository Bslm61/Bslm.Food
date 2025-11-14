import mongoose from "mongoose";


export const connectDB = async () => 
    {
    await mongoose.connect('mongodb+srv://FoodDel:14112025DB@cluster0.wq3hb5k.mongodb.net/Food-Del')
    .then(
        ()=>console.log(("DB Connected"))
        
    )
}