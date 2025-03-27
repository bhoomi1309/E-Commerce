const mongoose=require('mongoose');
const schema=mongoose.Schema({
    Id:Number,
    Username:String,
    Email:String,
    Phone:Number,
    Password:String,
    Role:{
        type:String,
        default:'user'
    },
<<<<<<< HEAD
=======
    wishlist: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Products' }],
>>>>>>> b397825 (Commit)
});
module.exports=mongoose.model('users',schema);