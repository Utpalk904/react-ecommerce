const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const crypto = require('crypto');

const userSchema = new mongoose.Schema({
    
    name : {
        type : String,
        required : [true,'Please enter your name'],
        maxLength : [30,'Name cant exceed 30 character length'],
        minLength : [3,'Name should have atleast 3 character length']
    },
    email : {
        type : String,
        required : [true, 'Please enter your email'],
        unique : true,
        validate : [validator.isEmail, "Please enter a valid email"]
    },
    password : {
        type : String,
        required : [true,'Please enter your password'],
        minLength : [8, 'Password should be atleast 8 character long'],
        select : false
    },
    avatar : {
        public_id : {
            type : String,
            required : true
        },
        url : {
            type : String,
            required : true
        }
    },
    role : {
        type : String,
        default : 'user'
    },

    resetPasswordToken : String,
    resetPasswordExpire : Date
});

//on save event
userSchema.pre("save", async function(next){

    if (!this.isModified('password')){
        next();
    }

    this.password = await bcrypt.hash(this.password,10);
});

// jwt token
userSchema.methods.getJWTToken = function (){
    return jwt.sign({id : this._id}, process.env.JWT_SECRET,{
        expiresIn : process.env.JWT_EXPIRE
    });
}

//compare password
userSchema.methods.comparePassword = async function(enteredPassword){
    return await bcrypt.compare(enteredPassword,this.password);
}

// generating password reset token
userSchema.methods.getResetPasswordToken = function(){
    
    //generating token
    const resetToken = crypto.randomBytes(20).toString('hex');

    //hashing and add to userSchema
    this.resetPasswordToken = crypto.createHash('sha256').update(resetToken).digest('hex');

    this.resetPasswordExpire = Date.now() + 15*60*1000;
    return resetToken;
}

module.exports = mongoose.model("User", userSchema);