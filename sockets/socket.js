const { io } = require('../index.js');

// Socket messaging
io.on('connect', client => {
    console.log('Client connection established');
    client.on('disconnect', () => {
        console.log('Client disconnected');
    });
    client.on('message', (payload) => {
        console.log(payload);
        io.emit('message', `Bienvenido ${payload.nombre}`);
    });
});