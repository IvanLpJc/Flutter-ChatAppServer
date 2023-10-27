const jwt = require('jsonwebtoken');

const generateJWT = (uuid) => {
    return new Promise((resolve, reject) => {
        const payload = {
            uuid
        };
    
        jwt.sign(payload, process.env.JWT_KEY, {expiresIn: '24h'}, (err, token) => {
            if (err) {
                reject('Could not generate JWT token');
            } else {
                resolve(token);
            }
        });
    });
};

module.exports = {
    generateJWT,
}