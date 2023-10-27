const jwt = require('jsonwebtoken');

const validateJWT = (req, resp = response, next) => {
    // Token read
    const token = req.header('X-Token');

    if( !token ) {
        resp.status(401).json({
            ok: false,
            msg: 'Token missing',
        });
    }

    try {

        const { uuid } = jwt.verify(token, process.env.JWT_KEY);
        
        // We do this so in any route that this mdw is being used
        // the uuid will be included in the request
        req.uuid = uuid;

        next();
    } catch (err) {
        return resp.status(500).json({
            ok: false,
            msg: 'Token invalid',
        });
    }

    console.log(token);
};

module.exports = {
    validateJWT,
}