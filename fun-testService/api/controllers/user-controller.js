const {User} = require('../../../fun-test-model/models');

exports.createUser = async(req,res,next)=>{
    const createUserDetails = req.body;
    try{
        const newUser = await User.create(createUserDetails);
        res.status(201).json({
            success:true,
            message:"User was created",
            data: newUser
        })
    }
    catch(err){
        console.log('ERROR..!!', err);
        res.status(404).json({
            success: false,
            message: "Error to create user..!!"
        })
    }
}