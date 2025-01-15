const {Router } = require("express");
const { userModel } = require("../db");

const userRouter = Router();


userRouter.post("/user/signup" , async (req , res) => {
    const {email , password, firstName , lastName} = req.body;

    // Hash the password so plaintext is not stored in DB
    try{
    await userModel.create({
        email,
        password : password ,
        firstName,
        lastName
    })
    } catch(err){
        res.json({message : "Error signup"});
    }
});



userRouter.post("/user/signin" , (req , res) => {

});



userRouter.post("/user/purchases" , (req , res) => {

});

module.exports ={
    userRouter: userRouter
}