const Order = require('../models/orderModel');
const Product = require('../models/productModel');
const ErrorHandler = require('../utils/errhandler');
const catchAsyncErr = require('../middleware/catchAsyncErr');

//create new order
exports.newOrder = catchAsyncErr(
    async (req,res,next)=>{
        const {shippingInfo, orderItems, paymentInfo, itemsPrice, taxPrice, shippingPrice, totalPrice} = req.body;
    
    const order = await Order.create({
        shippingInfo, orderItems, paymentInfo, itemsPrice, taxPrice, shippingPrice, totalPrice, paidAt : Date.now(), user : req.user._id
    });

    res.status(201).json({
        success : true,
        order
    });
});

//get single order
exports.getSingleOrder = catchAsyncErr(
    async (req,res,next)=>{
        const order = await Order.findById(req.params.id).populate("user","name email"); // populate(), it will search the user from user database with the id present in order,  will given user name and email connected with "user" available in order

        if (!order){
            return next(new ErrorHandler(`Order not found with given order id : ${req.params.id}`,404));
        }

        res.status(200).json({
            success : true,
            order
        });
    }
);

//get logged in user order
exports.myOrders = catchAsyncErr(
    async (req,res,next)=>{
        const orders = await Order.find({ user : req.user._id });

        res.status(200).json({
            success : true,
            orders
        });
    }
);

//get all orders
exports.getAllOrders = catchAsyncErr(
    async (req,res,next)=>{
        const orders = await Order.find();
        const totalOrders = await Order.countDocuments(); 

        let totalAmount = 0;

        orders.forEach(
            (order)=>{
                totalAmount+=order.totalPrice;
            }
        );

        res.status(200).json({
            success : true,
            orders,
            totalAmount,
            totalOrders
        });
    }
);

//update order status
exports.updateOrderStatus = catchAsyncErr(
    async (req,res,next)=>{
        const order = await Order.findById(req.params.id);

        if (!order){
            return next(new ErrorHandler(`Order not found with given order id : ${req.params.id}`,404));
        }

        if (order.orderStatus==='Delivered'){
            return next(new ErrorHandler('Already delivered product', 400));
        }

        order.orderItems.forEach(
            async (order)=>{
                await updateStock(order.product, order.quantity);
            }
        );

        order.orderStatus = req.body.status;
        if (req.body.status==='Delivered'){
            order.deliveredAt = Date.now();
        }

        await order.save({ validateBeforeSave : false });

        res.status(200).json({
            success : true,
            order
        });
    }
);

async function updateStock(productId, orderQuantity){
    const product = await Product.findById(productId);
    product.stock -= orderQuantity;

    await product.save({ validateBeforeSave : false });
}

//delete order
exports.deleteOrder = catchAsyncErr(
    async (req,res,next)=>{
        const order = await Order.findById(req.params.id);

        if (!order){
            return next(new ErrorHandler(`Order not found with given order id : ${req.params.id}`,404));
        }

        await order.remove();

        res.status(200).json({
            success : true,
            message : 'Order deleted Successfully'
        });
    }
);