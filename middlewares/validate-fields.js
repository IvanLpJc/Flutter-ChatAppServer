const { validationResult, body } = require('express-validator');


/*
    This is a middleware for validating the fields that we 
    are creating.
    We receive the request and response and a parameter called 'next'.
    This 'next' parameter is a callback function that will tell express
    that if everything is OK, we can continue processing the request in the
    next middleware.
*/

/*
'Check' internally will call the next callback and if the any middleware
does not trigger the next callback, it will stop and not reach 'createUser'
*/
const loginValidator = [
    body('email', 'Email is mandatory').not().isEmpty().isEmail().withMessage('Enter a valid email address'),
    body('password', 'Password is mandatory').not().isEmpty(),
];

const signUpValidator = [
    body('name', 'Name is mandatory').not().isEmpty(),
    ...loginValidator,
];


const validateFields = (req, resp, next) => {
    /*
    validationResult does the validation and return the possible errors

    If errors is not empty, then return a response with status code 400 (bad request)
    and the errors.
    */
    const errors = validationResult(req);

    if(!errors.isEmpty()) {
        return resp.status(400).json({
            ok: false,
            errors: errors.mapped(),
        });
    }

    next();

}



module.exports = {
    loginValidator,
    signUpValidator,
    validateFields
}