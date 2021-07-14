const express  = require('express');
const cors     = require('cors');
const mongoose = require('mongoose');
const path     = require('path');
const bodyparser  = require('body-parser');

require('dotenv').config();

const app  = express();
const port = process.env.PORT || 5000;

app.use(bodyparser.urlencoded({
    extended: true
}));

app.use(cors());
app.use(express.json());

const uri = process.env.ATLAS_URI;
mongoose.connect(uri, {useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true});

const connection = mongoose.connection;
connection.once('open', () => {
    console.log('MongoDB database connection established successfully')
});

// declare routers
const rolesRouter          = require('./routes/roles');
const usersRouter          = require('./routes/users');
const eventsRouter         = require('./routes/events');
const ticketVariantsRouter = require('./routes/ticketvariants');
const ticketsRouter        = require('./routes/tickets');
const ordersRouter         = require('./routes/orders');

// public directory
const publicDir = require('path').join(__dirname, '/public');

// include routers in application
app.use('/roles', rolesRouter);
app.use('/users', usersRouter);
app.use('/events', eventsRouter);
app.use('/ticketvariants', ticketVariantsRouter);
app.use('/tickets', ticketsRouter);
app.use('/orders', ordersRouter);

// serve public directory for assets
app.use(express.static(publicDir));


if (process.env.NODE_ENV === 'production') {
    // Express will serve up production assets i.e. main.js # test
    app.use(express.static(__dirname + '/client/build'));

    // If Express doesn't recognize route serve index.html
    app.get('*', (req, res) => {
        res.sendFile(
            path.resolve(__dirname, 'client', 'build', 'index.html')
        );
    });
}

app.listen(port, () => {
    console.log(`Server is running on port: ${port}`);
});




// killall -9 node
// Run the client and server: -- npm run dev --
// Make this server available in dev by using: -- ngrok http 5000 --
