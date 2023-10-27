const mongoose = require('mongoose');

const dbConnection = async () => {
    try {
        await mongoose.connect(process.env.DB_CNN);

        console.log('Connected to DB');

    } catch (err) {
        console.log(err);
        throw new Error('Database error: Contact admin');
    }
}

module.exports = {
    dbConnection
}