const ErrorHandler = require("../utils/errorhandler");
const catchAsyncErrors = require("../middleware/catchAsyncErrors");
const User = require("../models/userModels");
const sendToken = require("../utils/jwtToken");
const sendEmail = require("../utils/sendEmail");
const crypto = require("crypto");

//Register a user
exports.registerUser = catchAsyncErrors(async(req,res,next)=>{
    const {name,email,password} = req.body;

    const user = await User.create({
        name,
        email,
        password,
        avatar:{
            public_id:"this is a sample id",
            url:"/Profile.png"
        }
    });

    sendToken(user,201,res);

});

//Login User
exports.loginUser = catchAsyncErrors(async(req,res,next)=>{

    const {email,password} = req.body;

    //check if user has not  entered both email and password
    if(!email || !password) {
        return next(new ErrorHandler("Please enter email & password",400));
    }

    const user = await User.findOne({email}).select("+password");

    if(!user) {
        return next(new ErrorHandler("Invalid email or password",401));
    }

    const isPasswordMatched = await user.comparePassword(password);

    if(!isPasswordMatched){
        return next(new ErrorHandler("Invalid email or password",401));
    }

    sendToken(user,200,res);

});

//Logout user

exports.logout = catchAsyncErrors(async(req,res,next)=>{
    res.cookie("token",null,{
        expires:new Date(Date.now()),
        httpOnly: true,
    });


    res.status(200).json({
        sucess:true,
        message:"Logged out successfully",
    });
});

//Forgot Password 
exports.forgotPassword = catchAsyncErrors(async(req,res,next)=>{

    const user = await User.findOne({email:req.body.email});

    if(!user){
        return next(new ErrorHandler("USER NOT FOUND",404));
    }

    //Get ResetPasswordToken

    const resetToken = user.getResetPasswordToken();

    await user.save({validateBeforeSave:false});

    const resetPasswordUrl = `${req.protocol}://${req.get("host")}/api/v1/password/reset/${resetToken}`

    const message = `your password reset token is :- 
            \n\n ${resetPasswordUrl} \n\nIf you have not requested for reset password then kindly ignore this email`;

            try {

                await sendEmail({
                     email:user.email,
                     subject:`Ecommerce Password recovery`,
                     message,
                });

                res.status(200).json({
                    success:true,
                    message:`Email sent to ${user.email} successfully`
                });
                
            } catch (error) {
                user.resetPasswordToken = undefined;
                user.resetPasswordExpire = undefined;
                await user.save({validateBeforeSave:false});
                
                return next(new ErrorHandler(error.message,500));
                
            }
});

//Reset Password
exports.resetPassword = catchAsyncErrors(async(req,res,next)=>{
    //creating token hash
    const resetPasswordToken = crypto
          .createHash("sha256")
          .update(req.params.token)
          .digest("hex");

    const user = await User.findOne({
        resetPasswordToken,
        resetPasswordExpire: { $gt: Date.now()},
    });

    if(!user){
        return next(new ErrorHandler("Reset Password is invalid or has been expired",400));
    }

    if(req.body.password !== req.body.confirmPassword){
        return next(new ErrorHandler("Password does not match with confirm password",400));
    }

    user.password = req.body.password;
    user.resetPasswordToken = undefined;
    user.resetPasswordExpire = undefined;

    await user.save();

    sendToken(user,200,res);

})

//Get user details
exports.getUserDetails = catchAsyncErrors(async(req,res,next)=>{

        const user = await User.findById(req.user.id);

        res.status(200).json({
            success:true,
            user,
        });
});

//Update User Password
exports.updatePassword = catchAsyncErrors(async(req,res,next)=>{
        const user = await User.findById(req.user.id).select("+password");

        const isPasswordMatched = await user.comparePassword(req.body.oldPassword);

        if(!isPasswordMatched){
            return next(new ErrorHandler("Entered password does not match with the saved password",400));
        }

        if(req.body.newPassword !== req.body.confirmPassword){
            return next(new ErrorHandler("password did not match",400));
        }

        user.password = req.body.newPassword;

        await user.save();

        sendToken(user,200,res);
});

//Update User Profile
exports.updateProfile = catchAsyncErrors(async(req,res,next)=>{
   const newUserData = {
    name:req.body.name,
    email:req.body.email,
   };

   //we'll add avtar/Profile pic changes later(cloudinary)
   
   const user = await User.findByIdAndUpdate(req.user.id,newUserData,{
    new : true,
    runValidators : true,
    useFindAndModify:false,
   });
   
   res.status(200).json({
    sucess:true,
   });
});

//get all users(admin)
exports.getAllusers = catchAsyncErrors(async(req,res,next)=>{
    const users = await User.find();

    res.status(200).json({
        success : true,
        users
    });
});

//Get single user (admin)
exports.getSingleUser = catchAsyncErrors(async(req,res,next)=>{
        const user = await User.findById(req.params.id);

        if(!user){
            return next(new ErrorHandler(` Cant't find any User with id: ${req.params.id}`))
        }
        res.status(200).json({
            success : true,
            user
        });
});

//Update User Role -- Admin
exports.updateUserRole = catchAsyncErrors(async(req,res,next)=>{
    const newUserData = {
     name:req.body.name,
     email:req.body.email,
     role : req.body.role,
    };
   
    const user = await User.findByIdAndUpdate(req.params.id,newUserData,{
     new : true,
     runValidators : true,
     useFindAndModify:false,
    });
    
    res.status(200).json({
     sucess:true,
    });
 });

 //Delete User -- Admin
 exports.deleteUser = catchAsyncErrors(async(req,res,next)=>{
    const user = await User.findById(req.params.id);
    //we'll remove avtar/Profile pic changes later(cloudinary)
    
    if(!user){
        return next(new ErrorHandler(`Id:${req.params.id} does not match with any registered users!`))
    };

    await user.deleteOne();
   
    
    res.status(200).json({
     sucess:true,
     message : "User deleted succesfully"
    });
 });

