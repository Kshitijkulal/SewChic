const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcrypt');
const JWT = require('jsonwebtoken');
const crypto = require('crypto');


const userSchema = new mongoose.Schema({
    name:{
        type:String,
        required:[true,"Please Enter Your name"],
        maxLength:[30,"Name can not exceede 30 chars"],
        minLength:[4,"Your name must be more than 5 chars"]
    },
    email:{
        type:String,
        required:[true,"Please Entwer your email"],
        unique:true,
        validate:[validator.isEmail,"please enter a valid email"],
    },
    password:{
        type:String,
        required:[true,"Password is needed"],
        minLength:[8,"Password should be greater than 8 charecters"],
        select:false,
    },
    avatar:{
        public_id:{
            type:String,
            required:true
        },
        url:{
            type:String,
            required:true
        },
    },
    role:{
        type:String,
        default:"user",

    },
    resetPasswordToken:String,
    resetPasswordExpire:Date,
});

userSchema.pre("save",async function(next){
    
   if(!this.isModified("password")){
    next();
   } 

    this.password = await bcrypt.hash(this.password,10);
});
// JWT Token

userSchema.methods.getJWTToken = function () {
    return JWT.sign({id:this._id},process.env.JWT_SECRET,{
        expiresIn:process.env.JWT_EXPIRES_IN,
    });
};

// Compare Password

userSchema.methods.comparePassword = async function(password){
    return await bcrypt.compare(password,this.password);
}

// Forgot password (Password Reset Token)

userSchema.methods.getResetPasswordToken = async function(){
//  generating token
const resetToken = crypto.randomBytes(20).toString(`hex`);



// Hashing and adding to userSchema

this.resetPasswordToken = crypto.createHash("sha256").update(resetToken).digest("hex");

this.resetPasswordExpire = Date.now() + 15 * 60 * 1000;

return resetToken;
};


module.exports = mongoose.model("User",userSchema);