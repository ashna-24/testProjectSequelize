const {User} = require('../../../fun-test-model/models');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const jwtKey = "my_secret_key";

exports.createUserToken = async(req,res,next)=>{
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

exports.createLoginData = async(req,res,next)=>{
    const { email, password } = req.body;
    try {
        const user = await User.findOne({ 
            where: { email } 
        });
        console.log(user);
        if (!user) {
            return res.status(401).json({ 
                message: 'Invalid credentials' 
            });
        }
        const isValidPassword = await bcrypt.compare(password, user.password);
        if (!isValidPassword) {
            return res.status(401).json({ 
                message: 'Invalid credentials' 
            });
        }
        const token = jwt.sign(
            { email: user.email }, jwtKey, { expiresIn: '2d' }
        );
        res.status(200).json({ token });
    } 
    catch (error) {
        console.error('Error logging in:', error);
        res.status(500).json({ 
            message: 'Internal server error' 
        });
    }
}