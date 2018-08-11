const server = require('./server');
const mongoose = require('mongoose');

const PORT = 3000;
server.listen(PORT, '0.0.0.0', () => {
    mongoose.Promise = global.Promise;
    mongoose.connect('mongodb://root:pass@localhost:27017/admin',{ useNewUrlParser: true });

    const db = mongoose.connection;

    db.on('error',(err) => {
        console.error(err);
        process.exit(1);
    });

    db.once('open', () => {
        const routes = require('./http/routes');
        routes(server);
    });
});
