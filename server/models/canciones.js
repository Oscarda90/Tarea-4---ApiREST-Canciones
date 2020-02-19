const mongoose = require('mongoose');

let Schema = mongoose.Schema;

let cancionSchema = new Schema({
	cancion: {
		type: String,
		required: [true, 'La canción es obligatoria']
	},
	artista: {
		type: String,
		required: [true, 'El artista es obligatorio']
	},
	album: {
		type: String,
		required: [true, 'El album es obligatorio']
	},
	anio: {
		type: String,
		required: false
	},
	pais: {
		type: String,
		required: [true, 'El pais es obligatorio']
	}
});

module.exports = mongoose.model('Cancion', cancionSchema);