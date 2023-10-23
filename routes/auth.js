/*
    path: api/login
*/

const { Router } = require('express');
const { check } = require('express-validator');
const { createUser } = require('../controllers/auth');

const router = Router();

/*

    To do the validation we set some middlewares between 
    the api endpoint and the controller.

    In this case se use 'check' from express-validator.
    - 'name' is the field to validate
    - 'Name is mandatory' is the error message
    - not().isEmpty() check that it's not empty 

*/
router.post('/create_user',[check('name', 'Name is mandatory').not().isEmpty()],createUser );






module.exports = router; 