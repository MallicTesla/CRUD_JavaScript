const sqlite3 = require ('sqlite3').verbose();


const db = new sqlite3.Database ('../db.db', (err) => {
    if (err) {
        console.error (err.message);
    } else {
        console.log ('Conectado a la base de datos SQLite.');
    }
});

// Crear la tabla si no existe
db.run ('CREATE TABLE IF NOT EXISTS usuarios (id INTEGER PRIMARY KEY AUTOINCREMENT, nombre TEXT)');


// Función para crear un usuario
const createUser = (nombre, callback) => {
    const sql = 'INSERT INTO usuarios (nombre) VALUES (?)';
    db.run (sql, [nombre], function (err) {
        callback (err, this ? this.lastID : null);
    });
};






// Exportar las funciones y la conexión a la base de datos
module.exports = {
    db,
    createUser
};
