//Puerto

process.env.PORT = process.env.PORT || 3000;


//Entorno
process.env.NODE_ENV = process.env.NODE_ENV || 'dev';

//BD

let urlDB;

if (process.env.NODE_ENV === 'dev') {
    urlDB = 'mongodb://localhost:27017/cafe';
} else {
    urlDB = process.env.MONGO_URI;
}

process.env.URLDB = urlDB;

//Vencimiento token
//60 segundos
//60 minituos
//24 Horas
//30 Dias

process.env.CADUCIDAD_TOKEN = 60 * 60 * 24 * 30;


//SEED => Semilla de autenticacion

process.env.SEED_TOKEN = process.env.SEED_TOKEN || 'este-es-el-seed-desarrollo';

// Google cliente ID

process.env.CLIENTE_ID = process.env.CLIENTE_ID || '609331389430-oleqvcgis02du1l7ggc88bjogk74lpnf.apps.googleusercontent.com'