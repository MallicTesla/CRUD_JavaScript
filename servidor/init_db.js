const sqlite3 = require('sqlite3').verbose();
const fs = require('fs');

const db = new sqlite3.Database('./schema.db', (err) => {
    if (err) {
        console.error(err.message);

    } else {
        console.log('Conectado a la base de datos SQLite.');
    }
});

const esquema = fs.readFileSync('./bd.sql', 'utf8');

db.exec(esquema, (err) => {
    if (err) {
        console.error(err.message);

    } else {
        console.log('Base de datos inicializada correctamente.');
    }
    db.close();
});
