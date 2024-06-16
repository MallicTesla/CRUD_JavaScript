const sqlite3 = require('sqlite3').verbose();
const fs = require('fs');

const db = new sqlite3.Database('./db.db', (err) => {
    if (err) {
        console.error(err.message);

    } else {
        console.log('Conectado a la base de datos SQLite.');
    }
});

// Leer el contenido de los archivos SQL
const usuarioSql = fs.readFileSync('./usuario.sql', 'utf8');
const pedidosSql = fs.readFileSync('./pedidos.sql', 'utf8');

// Ejecutar los archivos SQL en orden
db.exec(usuarioSql, (err) => {
    if (err) {
        console.error(`Error al ejecutar usuario.sql: ${err.message}`);

    } else {
        console.log('Tabla usuarios creada correctamente.');

        db.exec(pedidosSql, (err) => {
            if (err) {
                console.error(`Error al ejecutar pedidos.sql: ${err.message}`);

            } else {
                console.log('Tabla pedidos creada correctamente.');
            }

            db.close((err) => {
                if (err) {
                    console.error(err.message);

                } else {
                    console.log('Cerrada la conexión a la base de datos SQLite.');
                }
            });
        });
    }
});
