//Puerto
process.env.PORT = process.env.PORT || 3000;

//ENTORNO
process.env.NODE_ENV = process.env.NODE_ENV || 'dev';

//Base de Datos
let urlDB;


urlDB = 'mongodb+srv://oscarda:8lMoBbudvkhkMehW@cluster0-dgmcv.mongodb.net/canciones';

process.env.URLDB = urlDB;