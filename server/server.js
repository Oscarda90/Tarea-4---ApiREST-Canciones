require('./config/config');

const express = require('express');
const mongoose = require('mongoose');
const app = express();
const bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({ extended: false }));
 
app.use(bodyParser.json());

app.use( require('./routes/canciones'));

mongoose.connect(process.env.URLDB, 
	{ useNewUrlParser: true, useCreateIndex: true },
	(err, res) => {

	if(err) throw err;

	console.log('BD Online');
});

app.listen(process.env.PORT, () => {
	console.log('Escuchando peticiones en el puerto 3000');
});

