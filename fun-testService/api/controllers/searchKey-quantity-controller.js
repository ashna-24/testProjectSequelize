const {sequelize} = require('../../../fun-test-model/models');

exports.searchKeyQuantity = async(req,res,next)=>{
    try {
        const searchKey = req.body.searchKey;
        const products = await sequelize.query(
            'EXEC SearchProducts @searchKey = :searchKey', {
                replacements: {
                    searchKey
                },
                type: sequelize.QueryTypes.SELECT,
            });

        res.status(200).json({
            products
        });
    } 
    catch (err) {
        console.error(err);
        res.status(500).send('Internal Server Error');
    }
}

