const { response } = require('express');
const bcrypt = require('bcryptjs');

const User = require('../models/user');
const { generateJWT } = require('../helpers/jwt');

const createUser = async (req, resp = response) => {

    const { email, password } = req.body;

    /*
        Check if the email is unique
    */

    try {
        const uniqueEmail = await User.findOne({ email });
        if(uniqueEmail ) {
            return resp.status(400).json({
                ok: false, 
                msg: 'Email already exists.'
            })
        }
        
        const user = new User(req.body);

        /**
         * We need to encrypt the password.
         * SALT: Random number to encrypt the password
         */
        const salt = bcrypt.genSaltSync();
        user.password = bcrypt.hashSync(password, salt)

        await user.save();

        // Generate JWT
        const token =  await generateJWT(user.id);

        resp.json({
            ok: true,
            user, token
        });

    } catch (error) {
        resp.status(500).json({
            ok: false,
            msg: 'Contact admin'
        });
    }
};

// const login ... req, res...
// responder {ok:true, msg: 'login'}

const loginUser = async (req, resp = response) => {

    const { email, password } = req.body;

    try {

        const dbUser = await User.findOne({email});
        if(!dbUser) {
            return resp.status(404).json({
                ok: false,
                msg: 'User not found',
            });
        }

        const validPassword = bcrypt.compareSync(password, dbUser.password);

        if(!validPassword) {
            return resp.status(404).json({
                ok: false,
                msg: 'Wrong password',
            });
        }

        const token = await generateJWT(dbUser.id);

        resp.json({
            ok: true,
            user: dbUser,
            token
        });

    } catch (error) {
        console.log(error);
        resp.status(500).json({
            ok: false,
            msg: 'Contact admin'
        });
    }
};

const renewToken = async (req, resp = response) => {

    const uuid = req.uuid;

    try {
        const token = await generateJWT(uuid); 

        const user = await User.findById(uuid);
        if(!user) {
            return resp.status(404).json({
                ok: false,
                msg: 'User not found',
            });
        }
    
        resp.json({
            ok: true,
            user: user,
            token
        });
    } catch (error) {
        console.log(error);
        resp.status(500).json({
            ok: false,
            msg: 'Contact admin'
        });
    };
};

module.exports = {
    loginUser,
    createUser,
    renewToken,
}