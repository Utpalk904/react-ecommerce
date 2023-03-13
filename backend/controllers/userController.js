const User = require('../models/userModel.js');
const ErrorHandler = require('../utils/errhandler');
const catchAsyncErr = require('../middleware/catchAsyncErr');
const sendToken = require('../utils/jwtToken');
const sendEmail = require('../utils/sendEmail.js');
const crypto = require('crypto');


// register a user
exports.registerUser = catchAsyncErr(
    async (req,res,next)=>{
        const {name,email,password} = req.body;
        
        const user = await User.create({
            name,email,password,
            avatar : {
                public_id : 'sample publicid',
                url : 'sample pic'
            }
        });

        sendToken(user, 201, res);
    }
);

// login users
exports.loginUser = catchAsyncErr(
    async (req,res,next)=>{
        const {email, password} = req.body;

        // checking if user has given password and email both
        if (!email || !password){
            return next(new ErrorHandler('Please enter email and password', 400));
        }

        const user = await User.findOne({email}).select('+password');
        
        if(!user){
            return next(new ErrorHandler('Invalid email or password',401));
        }

        const isPasswordMatched = await user.comparePassword(password);

        if (!isPasswordMatched){
            return next(new ErrorHandler('Invalid email or password',401));
        };

        sendToken(user, 200, res);
    }
);

//logout users
exports.logOut = catchAsyncErr(
    async(req,res,next)=>{

        res.cookie('token',null,{
            expires : new Date(Date.now()),
            httpOnly : true
        })

        res.status(200).json({
            success : true,
            message : 'Logged Out'
        })
    }
);

//forget password
exports.forgotPassword = catchAsyncErr(
    async (req,res,next)=>{
        const user = await User.findOne({email : req.body.email});

        if(!user){
            return next(new ErrorHandler('User not found',404));
        }

        const resetToken = user.getResetPasswordToken();

        //saving User data
        await user.save({ validateBeforeSave : false });

        const resetPasswordUrl = `${req.protocol}://${req.get('host')}/api/v1/password/reset/${resetToken}`;

        const message = `Your Password Reset Token is : \n\n ${resetPasswordUrl}\n\n If you have not requested this email, then report us your name and email on our contact-us form.`;

        try {
            
            await sendEmail({
                email : user.email,
                subject : 'Ecommerce Password Recovery',
                message
            });
            res.status(200).json({
                success : true,
                message : `Email sent to ${user.email} successfully`
            });

        } catch (e) {
            user.resetPasswordToken = undefined;
            user.resetPasswordExpire = undefined;
            
            await user.save({ validateBeforeSave : false });

            return next(new ErrorHandler(e.message,500));
        }
    }
);

// reset password
exports.resetPassword = catchAsyncErr(
    async (req,res,next)=>{

        // creating token hash
        const resetPasswordToken = crypto.createHash('sha256').update(req.params.token).digest('hex');

        const user = await User.findOne({resetPasswordToken, resetPasswordExpire : {$gt : Date.now()}});

        if (!user){
            return next(new ErrorHandler('Reset Password token is invalid or has been expired', 400));
        }

        if (req.body.password !== req.body.confirmPassword){
            return next(new ErrorHandler('Password doesnt match'));
        }

        user.password = req.body.password;
        user.resetPasswordToken = undefined;
        user.resetPasswordExpire = undefined;
            
        await user.save();

        sendToken(user, 200, res);
    }
);

//get user details
exports.getUserDetails = catchAsyncErr(async (req,res,next) => {

    const user = await User.findById(req.user.id);

    res.status(200).json({
        success : true,
        user
    });
});

//update user password
exports.updatePassword = catchAsyncErr(async (req,res,next) => {

    const user = await User.findById(req.user.id).select('+password');

    const isPasswordMatched = await user.comparePassword(req.body.oldPassword);

    if (!isPasswordMatched){
        return next(new ErrorHandler('Old Password is incorrect',400));
    }

    if (req.body.newPassword !== req.body.confirmPassword){
        return next(new ErrorHandler('password doesnt match'));
    }

    user.password = req.body.newPassword;

    await user.save();

    sendToken(user, 200, res);
});

//update user details(except password)
exports.updateProfile = catchAsyncErr(async (req,res,next) => {

    // we will add avatar change later
    const newUserData = {
        name : req.body.name,
        email : req.body.email
    }

    const user = await User.findByIdAndUpdate(req.user.id,newUserData,{
        new : true,
        runValidators : true,
    })

    res.status(200).json({
        success : true,
        user
    });
});

// get all users
exports.getAllUsers = catchAsyncErr(
    async (req,res,next)=>{
        const users = await User.find();
        const userCount = await User.countDocuments();

        res.status(200).json({
            success : true,
            users,
            userCount
        });
    }
);

// get single user for admin
exports.getSingleUser = catchAsyncErr(
    async (req,res,next)=>{
        const user = await User.findById(req.params.id);

        if (!user){
            return next(new ErrorHandler(`User not found with the given id : ${req.params.id}`,404));
        }

        res.status(200).json({
            success : true,
            user
        });
    }
);

//update user role
exports.changeUserRole = catchAsyncErr(async (req,res,next) => {

    // we will add avatar change later
    const role = {
        role : req.body.role
    }
    
    let user = await User.findById(req.params.id);

    if (!user) {
        return next(new ErrorHandler(`User not found with the given id : ${req.params.id}`,404));
    }

    user = await User.findByIdAndUpdate(req.params.id,role,{
        new : true
    });

    res.status(200).json({
        success : true,
        user
    });
});

//delete user
exports.deleteUser = catchAsyncErr(async (req,res,next) => {

    const user = await User.findById(req.params.id);

    if (!user) {
        return next(new ErrorHandler(`User not found with the given id : ${req.params.id}`,404));
    }

    await user.remove();

    res.status(200).json({
        success : true,
        message : 'User deleted Successfully'
    });
});