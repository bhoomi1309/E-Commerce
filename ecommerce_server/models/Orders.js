const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({
    Email:String,
    No:Number,
    Items: [],
    PaymentMethod: String, 
<<<<<<< HEAD
    TotalAmount: Number,
    OrderDate: String,
=======
    TotalAmount: Number,    
    OrderDate: String
>>>>>>> b397825 (Commit)
});

module.exports = mongoose.model("orders", orderSchema);