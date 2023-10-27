/*
    path: api/login
*/

const { Router } = require('express');
const { createUser, loginUser, renewToken } = require('../controllers/auth');
const { loginValidator, signUpValidator, validateFields } = require('../middlewares/validate-fields');
const { validateJWT } = require('../middlewares/validate-jwt');

const router = Router();

/*

    To do the validation we set some middlewares between 
    the api endpoint and the controller.

    In this case se use 'check' from express-validator.
    - 'name' is the field to validate
    - 'Name is mandatory' is the error message
    - not().isEmpty() check that it's not empty 

*/
router.post('/create_user', signUpValidator, [
    validateFields,
],createUser );

// post: /
// validar email y password 
router.post('/', loginValidator, [validateFields], loginUser);

router.get('/renew_token', validateJWT, renewToken);



module.exports = router; 