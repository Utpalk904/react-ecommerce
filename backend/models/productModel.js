const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    name : {
        type : String,
        required : [true,'Please enter product name']
    },
    description : {
        type : String,
        required : [true,'Please enter product description']
    },
    price : {
        type : Number,
        required : [true,'Please enter product price'],
        maxLength : [8,'Price cant exceed 8 digits']
    },
    ratings : {
        type : Number,
        default : 0
    },
    images : [
        {
            public_id : {
                type : String,
                required : true
            },
            url : {
                type : String,
                required : true
            }
        }
    ],
    category : {
        type : String,
        required : [true,'Please enter product category']
    },
    stock : {
        type : Number,
        required : [true,'Please enter product stock'],
        maxLength : [4,'Stock cant exceed 4 digits'],
        default : 1
    },
    numOfReviews : {
        type : Number,
        default : 0
    },
    reviews : [
        {
            user : {
                type : mongoose.Schema.ObjectId,
                ref : 'User',
                required : true
            },
            name : {
                type : String,
                required : true
            },
            rating : {
                type : Number,
                required : true
            },
            comment : {
                type : String,
                required : true
            }
        }
    ],
    createdAt : {
        type : Date,
        default : Date.now
    },
    user : {
        type : mongoose.Schema.ObjectId,
        ref : 'User',
        required : true
    },
    trending : {
        type : Boolean,
        default : false
    }
});

module.exports = mongoose.model("Product",productSchema);