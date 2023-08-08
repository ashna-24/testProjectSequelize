const { addToBlacklist } = require('../utils/blacklistUtils');

exports.getSimpleLogin = async(req,res,next)=>{
    const tokenPayload = req.authSimpleUser;
    if (!tokenPayload){
        return res.status(401).json({ 
            message: 'Unauthorized' 
        });
    }
    res.status(200).json({ 
        message: 'Protected route accessed successfully' ,
        data: tokenPayload
    });
}

exports.jwtSampleLogout = async(req,res,next)=>{
    const token = req.headers.authorization;

    if (!token) {
        return res.sendStatus(401).json({
            message: 'Unauthorized'
        });
    }
  
    addToBlacklist(token);
    res.sendStatus(200).json({
        status:"Logout successfully"
    });
}