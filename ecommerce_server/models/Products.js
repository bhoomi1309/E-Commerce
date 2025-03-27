const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
    No:Number,
    Image: String,
    Title: String,
<<<<<<< HEAD
=======
    Brand: String,
>>>>>>> b397825 (Commit)
    Category: String,
    Price: Number,
    SalePrice: Number,
    Stock: Number,
    Details: String,
    Similarity: Number,
<<<<<<< HEAD
=======
    purchaseCount: { type: Number, default: 0 },
    viewCount: { type: Number, default: 0 },
>>>>>>> b397825 (Commit)
    isOutOfStock: { type: Boolean, default: false },
    Reviews:[]
});

productSchema.pre('save', function (next) {
    this.isOutOfStock = this.Stock <= 0;
    next();
});

productSchema.pre('findOneAndUpdate', function (next) {
    const update = this.getUpdate();
    if (update.$set && 'Stock' in update.$set) {
        update.$set.isOutOfStock = update.$set.Stock <= 0;
    }
    next();
});

module.exports = mongoose.model("products", productSchema);