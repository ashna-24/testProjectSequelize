const {User} = require('../../../fun-test-model/models');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const jwtKey = "my_secret_key";
const {addToBlacklist} = require('../utils/blacklistUtils');

exports.createUserToken = async (req, res, next) => {
    const { firstName, lastName, email, password } = req.body;
    
    try {
        const createdUser = await User.create({
            firstName,
            lastName,
            email,
            password
        });

        res.status(201).json({ 
            message: 'User registered successfully',
            user: createdUser
        });
    } 
    catch (error) {
        console.error('Error registering user:', error);
        res.status(500).json({ 
            message: 'Internal server error' 
        });
    }
};

exports.createLoginData = async (req, res, next) => {
    const { email, password } = req.body;
    try {
        const user = await User.findOne({ 
            where: { 
                email 
            } 
        });
        if (user) {
            const isValidPassword = await bcrypt.compare(password, user.password);
            if (isValidPassword) {
                const token = jwt.sign(
                    { 
                        email: user.email 
                    }, 
                    jwtKey, 
                    { 
                        expiresIn: '2d' 
                    }
                );
                res.status(200).json({ 
                    status: "Ok",
                    token: token 
                });
            } else {
                res.status(400).json({ 
                    error: "Password Incorrect" 
                });
            }
        } else {
            res.status(404).json({
                error: "User doesn't exist"
            });
        }
    } catch (error) {
        console.error('Error logging in:', error);
        res.status(500).json({ 
            message: 'Internal server error' 
        });
    }
};

exports.getLogin = async(req,res,next)=>{
    const tokenPayload = req.authUser;
    if (!tokenPayload) {
        return res.status(401).json({ 
            message: 'Unauthorized' 
        });
    }
    res.status(200).json({ 
        message: 'Protected route accessed successfully' ,
        data: tokenPayload
    });
}

exports.jwtWebLogout = async(req,res,next)=>{
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

exports.updatePassword = async (req, res, next) => {
    const userId = req.params.id;
    const { oldPassword, newPassword } = req.body;

    try {
        const user = await User.findByPk(userId);

        if (!user) {
            return res.status(404).json({ 
                error: 'User not found' 
            });
        }

        if (user.password === oldPassword) {
            console.log('Passwords match directly');
        } 
        else {
            console.log('Passwords do not match directly');
        }

        user.password = newPassword;
        await user.save();

        return res.status(200).json({
            message: 'Password updated successfully' 
        });
    } 
    catch (error) {
        console.error('Error updating password:', error);
        return res.status(500).json({ 
            message: 'Internal server error' 
        });
    }
};

exports.updateUserdata = async (req, res, next) => {
    const userId = req.params.id;
    const { firstName, lastName, email } = req.body;

    try {
        const user = await User.findByPk(userId);
        if (!user) {
            return res.status(404).json({
                error: 'User not found'
            });
        }

        if (firstName) {
            user.firstName = firstName;
        }

        if (lastName) {
            user.lastName = lastName;
        }

        if (email) {
            user.email = email;
        }
        await user.save();
        res.status(200).json({
            success: true,
            message: "User data was updated",
            data: user
        });
    } 
    catch (err) {
        console.error('Error updating user:', err);
        return res.status(500).json({
            message: 'Internal server error'
        });
    }
}
