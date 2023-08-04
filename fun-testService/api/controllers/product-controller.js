const {Product} = require('../../../fun-test-model/models');
const token = require('../middlewares/tokens');
// const jwt = require('jsonwebtoken');
// const jwtKey = "my_secret_key";

exports.createProductDetails = async (req,res, next)=>{
    const createProduct = req.body;
    console.log(createProduct);
    try{
        createProduct.token = req.user.token;
        console.log(createProduct.token);
        const newProduct = await Product.create(createProduct);
        res.status(201).json(newProduct);
    }
    catch(err){
        console.log('Error', err);
        res.status(404).json({
            success: false,
            message: "Error"
        });
    }
}

exports.createBulkProduct = async(req, res, next) =>{
    const bulkCreateProduct = req.body;
    try{
        const bulkProduct = await Product.bulkCreate(bulkCreateProduct);
        res.status(201).json({
            success: true,
            data: bulkProduct
        });
    }
    catch(err){
        console.log('Error', err);
        res.status(404).json({
            success: false,
            message: "Error"
        });
    }
}

exports.getAllProducts = async (req,res,next)=>{
    try{
        const allProducts = await Product.findAll();
        res.status(200).json({
            success:true,
            message:"List of products",
            data : allProducts
        })
    }
    catch(err){
        console.log("Error",err);
        res.status(404).json({
            success: false,
            message: "No available data"
        })
    }
}

exports.deleteProduct = async(req,res,next)=>{
    const deleteData = req.params.id;
    try{
        const recordToDelete = await Product.findByPk(deleteData);
        if(!recordToDelete){
            return res.status(404).json({ 
                success:false,
                message: 'Record not found' 
            });
        }
        await recordToDelete.destroy();
        res.status(200).json({
            success:true,
            message:"Deleted successfully",
        })
    }
    catch(err){
        console.log("Error", err);
        res.status(404).json({
            success: false,
            message:"Error"
        })
    }
}

exports.countAllProducts = async(req,res,next)=>{
    try{
        const countAll = await Product.count();
        res.status(200).json({
            success: true,
            count: countAll
        })
    }
    catch(err){
        console.log("Error",err);
        res.status(404).json({
            success: false,
            message: "Unable to count"
        })
    }
}

exports.editProductPrice = async(req,res,next)=>{
    const getId = req.params.id;
    const {updatedPrice} = req.body;
    try{
        const recordToEdit = await Product.findByPk(getId);
        if(!recordToEdit){
            return res.status(404).json({ 
                success:false,
                message: 'Record not found' 
            });
        }
        recordToEdit.price = updatedPrice;
        await recordToEdit.save();
        res.status(200).json({
            success: true,
            message:"Updated successfully",
            data: recordToEdit
        });
    }
    catch(err){
        console.log("Error",err);
        res.status(404).json({
            success: false,
            message: "Unable to edit"
        })
    }
}

exports.editProductQuantity = async(req,res, next)=>{
    const getPrdtId = req.params.id;
    const {updatedQuantity} = req.body;
    try{
        const quantityToEdit = await Product.findByPk(getPrdtId);
        if(!quantityToEdit){
            return res.status(404).json({
                success: false,
                message: "Record not found"
            })
        }
        quantityToEdit.quantity = updatedQuantity;
        await quantityToEdit.save();
        res.status(200).json({
            success:true,
            message:"Quantity was updated",
            data: quantityToEdit
        })
    }
    catch(err){
        console.log("Error",err);
        res.status(404).json({
            success: false,
            message: "Unable to edit quantity"
        })
    }
}