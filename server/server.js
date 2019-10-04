require('./config/config');

const express = require('express');
const mongoose = require('mongoose');

const app = express();
const bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(require('./routes/index'))


mongoose.connect(process.env.URLDB, { useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true }, (err, res) => {
    if (err) throw new err;

    console.log('Base de datos onLine');
});

app.listen(process.env.PORT, () => { console.log('Escuchando el puesrto: ', process.env.PORT); })