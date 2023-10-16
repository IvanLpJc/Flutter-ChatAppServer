const { v4: uuidV4 } = require('uuid');

class Band {

    constructor(name = 'No Name') {
        this.id = uuidV4(); // Unique id 
        this.name = name;
        this.votes = 0;
    }
}

module.exports = Band;