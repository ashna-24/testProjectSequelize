const {Product} = require('../../../fun-test-model/models');
const token = require('../middlewares/jwt-web-token');
const jwt = require('jsonwebtoken');
const jwtKey = "my_secret_key";

exports.createProductDetails = async (req,res, next)=>{
    const createProduct = req.body;
    token.tokendata.push(createProduct);
    let isPresent = false;
    let isPresentIndex = null;
    try{
        for(let i=0; i< token.tokendata.length ;i++){
            if((token.tokendata[i].name === createProduct.name) && 
            (token.tokendata[i].description === createProduct.description)&&
            (token.tokendata[i].price === createProduct.price)&&
            (token.tokendata[i].quantity === createProduct.quantity)){
                isPresent = true;
                isPresentIndex = i;
                break;
            }
        }
        const newProduct = await Product.create(createProduct);
        if(isPresent){
            const tokens = jwt.sign(
                token.tokendata[isPresentIndex], 
                jwtKey,
                { expiresIn: '2d' }
            );
            res.json({
                login: true,
                token: tokens,
                data: newProduct,
            });
        }
        else{
            res.json({
                login: false,
                error: "Invalid data",
            });
        }
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
    // const bulkCreateProduct = req.body;
    // token.tokendata.push(bulkCreateProduct);
    // let isPresent = false;
    // let isPresentIndex = null;
    // try{
    //     for(let i=0; i< token.tokendata.length ;i++){
    //         if((token.tokendata[i].name === bulkCreateProduct.name) && 
    //         (token.tokendata[i].description === bulkCreateProduct.description)&&
    //         (token.tokendata[i].price === bulkCreateProduct.price)&&
    //         (token.tokendata[i].quantity === bulkCreateProduct.quantity)){
    //             isPresent = true;
    //             isPresentIndex = i;
    //             break;
    //         }
    //     }
    //     const bulkProduct = await Product.bulkCreate(bulkCreateProduct);
    //     if(isPresent){
    //         const bulktokens = jwt.sign(token.tokendata[isPresentIndex], jwtKey);
    //         res.json({
    //             login: true,
    //             token: bulktokens,
    //             data: bulkProduct,
    //         });
    //     }
    //     else{
    //         res.json({
    //             login: false,
    //             error: "Invalid data",
    //         });
    //     }
    // }
    // catch(err){
    //     console.log('Error', err);
    //     res.status(404).json({
    //         success: false,
    //         message: "Error"
    //     });
    // }
}

exports.getAllProducts = async (req,res,next)=>{
    try{
        const allProducts = await Product.findAll();
        jwt.verify(req.authUser, jwtKey, (err, authdata)=>{
            res.status(200).json({
                success:true,
                message:"List of products",
                dbdata: allProducts
            })
        });
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
        jwt.verify(req.authUser, jwtKey, (err, authdata)=>{
            if(!recordToDelete){
                return res.status(404).json({ 
                    success:false,
                    message: err 
                });
            }
            recordToDelete.destroy();
            res.status(200).json({
                success:true,
                message:"Deleted successfully",
                data: authdata
            })
        });
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
    let isPresent = false;
    try{
        const recordToEdit = await Product.findByPk(getId);
        console.log(recordToEdit);
        
        for(let i=0; i< token.tokendata.length ;i++){
            if((token.tokendata[i].name === recordToEdit.name) && 
            (token.tokendata[i].description === recordToEdit.description)&&
            (token.tokendata[i].quantity === recordToEdit.quantity)){
                isPresent = true;
                isPresentIndex = i;
                break;
            }
        }
        if(isPresent){
            jwt.verify(req.authUser, jwtKey, (err, authdata)=>{
                if(!recordToEdit){
                    return res.status(404).json({ 
                        success:false,
                        message: 'Record not found',
                        error: err
                    });
                }
                recordToEdit.price = updatedPrice;
                recordToEdit.save();
                res.status(200).json({
                    success: true,
                    token: token.tokendata,
                    message:"Updated successfully",
                    data: recordToEdit
                });
            });
        }
    }
    catch(err){
        console.log("Error",err);
        res.status(404).json({
            success: false,
            message: "Unable to edit"
        });
    }
}

exports.editProductQuantity = async(req,res, next)=>{
    const getPrdtId = req.params.id;
    const {updatedQuantity} = req.body;
    let isPresent = false;
    try{
        const quantityToEdit = await Product.findByPk(getPrdtId);
        for(let i=0; i<token.tokendata.length ;i++){
            if((token.tokendata[i].name === quantityToEdit.name) &&
            (token.tokendata[i].description === quantityToEdit.description) &&
            (token.tokendata[i].price === quantityToEdit.price)){
                isPresent = true;
                isPresentIndex = i;
                break;
            }
        }
        if(isPresent){
            jwt.verify(req.authUser, jwtKey, (err, authdata)=>{
                if(!quantityToEdit){
                    return res.status(404).json({
                        success: false,
                        message: "Record not found",
                        error: err
                    });
                }
                quantityToEdit.quantity = updatedQuantity;
                quantityToEdit.save();
                res.status(200).json({
                    success:true,
                    message:"Quantity was updated",
                    data: quantityToEdit
                });
            });
        }
        
    }
    catch(err){
        console.log("Error",err);
        res.status(404).json({
            success: false,
            message: "Unable to edit quantity"
        });
    }
}