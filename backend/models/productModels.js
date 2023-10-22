const mongoose = require('mongoose');

const productSchema = mongoose.Schema({
    name:{
        type:String,
        required:[true,"Please Enter Product Name"],
        trim:true
    },
    description:{
        type:String,
        required:[true,"Please enter Product Description"]
    },
    price:{
        type:Number,
        required:[true,"Please enter Product Price"],
        maxLength:[8,"price Cannot exceede 8 charecters"]
    },
    ratings:{
        type:Number,
        default:0
    },
    image:[{

        public_id:{
            type:String,
            required:true
        },
        url:{
            type:String,
            required:true
        },
    }
],
    category:{
        type:String,
        required:[true,"please Enter Product category"]
    },
    Stock:{
        type:Number,
        required:[true,"please enter product stock"],
        maxLength:[4,"Max Length Cannot exceede 4 charecters"],
        default:1
    },
    reviews:[
        {
            user:{
                type:mongoose.Schema.ObjectId,
                ref:"User",
                required:true,
            },
            name:{
                type:String,
                required:true
            },
            rating:{
                type:Number,
                required:true
            },
            comment:{
                type:String,
                required:true
            }
        }
    ],
    user:{
        type:mongoose.Schema.ObjectId,
        ref:"User",
        required:true,
    },
    createdAt:{
        type:Date,
        default:Date.now
    }
});

module.exports = mongoose.model(`Product`,productSchema);