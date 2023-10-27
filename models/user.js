
const {Schema, model} = require('mongoose')

const UserSchema = Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    online: {
        type: Boolean,
        default: false,
    },
});

/*
    With this we can override the default implementation of toJSON.
    We use a classic function instead of an arrow function because
    the arrow function doesn't modify the value that 'this' is pointing to.
*/
UserSchema.method('toJSON', function () {
    /*
        We extract explictly the values that we are not interested in and 
        using the rest operator we extract all the rest of values in an variable
        called 'object' (this name can be whatever you like).

        We rename the _id in object to use uuid instead and return that var.
    */
    const { __v, _id, password, ...object } = this.toObject(); 
    object.uuid = _id;

    return object;
});

module.exports = model('User', UserSchema);