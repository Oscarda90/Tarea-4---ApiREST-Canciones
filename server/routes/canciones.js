const express = require('express');
const _ = require('underscore');
const app = express();
const Cancion = require('../models/canciones');

//Consultar todas la canciones
app.get('/canciones', (req, res) => {
	
	Cancion.find({})
		   .exec((err, cancion) => {

				if (err) {
					return res.status(400).json({
						ok: false,
						err
					});
				}

				Cancion.count({}, (err, conteo) => {

					res.json({
						ok: true,
						cancion, 
						Total: conteo
					});					

				});


		   });	

});

//Mostrar caniones por id
app.get('/canciones/:id', (req, res) => {

	let id = req.params.id;
	
	
	Cancion.findById(id, (err, cancion) => {
		  

				if (err) {
					return res.status(400).json({
						ok: false,
						err
					});
				}

				res.json({
					ok: true,
					cancion
				});					
		   });	
});

//Mostrar canciones entre 2 años	
app.get('/canciones/', (req, res) => {

	let desde = req.query.desde;

	let limite = req.query.limite;
	
	Cancion.find({'Añod' : {'$gte' : desde}, 'Añol' : { '$lte' : limite}}, (err, cancion) => {

				if (err) {
					return res.status(400).json({
						ok: false,
						err
					});
				}

				res.json({
					ok: true,
					cancion
				});					
		   });	
});

//Crear nueva cancion en la BD
app.post('/canciones', (req, res) => {

	let body = req.body;

	let cancion = new Cancion({
		cancion: body.cancion,
		artista: body.artista,
		album: body.album,
		anio: body.anio,
		pais: body.pais
	});

	cancion.save((err, cancionDB) => {
		
		if (err) {
			return res.status(400).json({
				ok: false,
				err
			});
		}

		res.json({
			ok: true,
			cancion: cancionDB
		});
	});

});

//Modificar cancion por id
app.put('/canciones/:id', (req, resp) => {

	let id = req.params.id;
	let body = _.pick( req.body, ['cancion','artista','album','anio','pais']);

	Cancion.findByIdAndUpdate(id, body, {new: true, runValidatos: true}, (err, cancionDB) => {

		if (err) {
			return res.status(400).json({
				ok: false,
				err
			});
		}

		resp.json({
			ok: true,
			cancion: cancionDB
		});
	});
});

//Eliminar cancion por id
app.delete('/canciones/:id', (req, res) => {
	
	let id = req.params.id;

	Cancion.findByIdAndRemove(id, (err, cancionBorrada) => {

		if (err) {
			return res.status(400).json({
				ok: false,
				err
			});
		}

		if (!cancionBorrada) {
			return res.status(400).json({
				ok: false,
				err: {
					message: 'Cancion no encontrada'
				}
			});		
		}

		res.json({
			ok: true,
			cancion: cancionBorrada
		});
	});
});

module.exports = app;