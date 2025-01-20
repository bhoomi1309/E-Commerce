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
});
module.exports=mongoose.model('users',schema);