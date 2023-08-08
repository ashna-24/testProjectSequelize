const{Product, User, Cart} = require('../../../fun-test-model/models');
// const { Op } = require('sequelize');

exports.addtoCart = async(req,res,next)=>{
    const createCart = req.body;
    try{
        const createdData = await Cart.create(createCart);
        res.status(201).json({
            success: true,
            message: createdData
        });
    }
    catch(err){
        console.log('Error', err);
        res.status(404).json({
            success: false,
            message: "Failed to add data to cart"
        });
    }
}

exports.fetchData = async(req,res,next)=>{
    try{
        const fetchCartData = await Cart.findAll({
            include:[
                {model: Product},
                {model: User}
            ]
        });
        res.status(200).json({
            success: true,
            data: fetchCartData
        });
    }
    catch(err){
        console.log('Error',err);
        res.status(404).json({
            success: false,
            message: 'Cannot fetch data'
        })
    }
}

exports.deleteData = async(req,res,next)=>{
    const removedata = req.params.id;
    try{
        const recordToRemove = await Cart.findByPk(removedata);
        if(!recordToRemove){
            return res.status(404).json({
                success: false,
                message:'Record not found'
            })
        }
        await recordToRemove.destroy();
        res.status(200).json({
            success:true,
            message:"Deleted successfully",
        })
    }
    catch(err){
        console.log('Error', err);
        res.status(404).json({
            success: false,
            message: 'Error'
        })
    }
}

exports.updateQuantity = async (req,res, next)=>{
    const updateDataId = req.params.id;
    const {newQuantity} =  req.body;
    try{
        const recoredToUpdate = await Cart.findByPk(updateDataId);
        if(!recoredToUpdate){
            return res.status(404).json({
                success: false,
                message: 'Record not found'
            })
        }
        recoredToUpdate.quantity = newQuantity;
        await recoredToUpdate.save();
        res.status(200).json({
            success: true,
            message:"Updated successfully",
            data: recoredToUpdate
        });
    }
    catch(err){
        console.log('Error',err);
        res.status(404).json({
            success: false,
            message:"Unable to update"
        });
    }
}