const { response } = require('express');
const { validationResult } = require('express-validator');


const createUser = (req, resp = response) => {

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

    console.log(resp);
    resp.json({
        ok: true,
        msg: 'User created successfully'
    });
}

module.exports = {
    createUser
}