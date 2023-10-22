const { io } = require('../index.js');
console.log(bands);

// Socket messaging
io.on('connect', client => {
    console.log('Client connection established');
    client.on('disconnect', () => {
        console.log('Client disconnected');
    },);

    // client.emit('active_bands', bands.getBands())


    // client.on('add_band', (payload) => {
    //     bands.addBand(new Band(payload['name']));
    //     io.emit('active_bands', bands.getBands())
    // });
    // client.on('increase_vote', (payload) => {
    //     bands.voteBand(payload['id']);
    //     io.emit('active_bands', bands.getBands())
    // });
    // client.on('remove_band', (payload) => {
    //     bands.removeBand(payload['id']);
    //     io.emit('active_bands', bands.getBands());
    // });

    client.on('message', (payload) => {
        console.log(payload);
        io.emit('message', `Bienvenido ${payload.nombre}`);
    });

    client.on('new_message', (payload) => {
        io.emit('new_message', payload); // This emit to everyone
        // client.broadcast.emit('new_message', payload); // Emit to everyone but the sender
    });
    client.on('emited_message', (payload) => {
        client.broadcast.emit('emited_message', payload); // Emit to everyone but the sender
        console.log(payload);
    });


});