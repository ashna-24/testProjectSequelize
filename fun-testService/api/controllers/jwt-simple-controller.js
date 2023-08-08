const {User} = require('../../../fun-test-model/models');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const jwtKey = "my_secret_key";

exports.createSampleLogin = async(req,res,next)=>{
    const { firstName, lastName, email, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    console.log("password:",hashedPassword);
    try {
        await User.create({
            firstName,
            lastName,
            email,
            password: hashedPassword
        });
        res.status(201).json({ 
            message: 'User registered successfully' 
        });
    } 
    catch (error) {
        console.error('Error registering user:', error);
        res.status(500).json({ 
            message: 'Internal server error' 
        });
    }
}


