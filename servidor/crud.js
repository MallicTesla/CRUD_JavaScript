const express = require ('express');
const sqlite3 = require ('sqlite3').verbose();
const app = express();

const puerto = 3000;


// Middleware para parsear JSON
app.use (express.json());

// Conectar a la base de datos SQLite
const db = new sqlite3.Database ('./db.db', (err) => {
    if (err) {
        console.error (err.message);
    } else {
        console.log ('Conectado a la base de datos SQLite.');
    }
});

// Crear la tabla si no existe
db.run ('CREATE TABLE IF NOT EXISTS usuarios (id INTEGER PRIMARY KEY AUTOINCREMENT, nombre TEXT, correo TEXT UNIQUE)');

// Endpoints CRUD

// CREAR
app.post ('/usuarios', (req, res) => {
    const { nombre, correo } = req.body;
    const sql = 'INSERT INTO usuarios (nombre, correo) VALUES (?, ?)';
    db.run (sql, [nombre, correo], function (err) {

        if (err) {
            res.status (400).json ({ error: err.message });
            return;
        }

        res.json ({ id: this.lastID, nombre, correo });
    });
});

// LEER
app.get ('/usuarios', (req, res) => {
    const sql = 'SELECT * FROM usuarios';
    db.all (sql, [], (err, filas) => {

        if (err) {
            res.status (400).json ({ error: err.message });
            return;
        }

        res.json ({ usuarios: filas });
    });
});

app.get('/usuarios/:id', (req, res) => {
    const { id } = req.params;
    const sql = 'SELECT * FROM usuarios WHERE id = ?';
    db.get (sql, [id], (err, fila) => {

        if (err) {
            res.status (400).json ({ error: err.message });
            return;
        }

        res.json ({ usuario: fila });
    });
});

// ACTUALIZAR
app.put ('/usuarios/:id', (req, res) => {
    const { id } = req.params;
    const { nombre, correo } = req.body;
    const sql = 'UPDATE usuarios SET nombre = ?, correo = ? WHERE id = ?';
    db.run (sql, [nombre, correo, id], function (err) {

        if (err) {
            res.status (400).json ({ error: err.message });
            return;
        }
        res.json ({ mensaje: `Usuario actualizado correctamente`, cambios: this.changes });
    });
});

// ELIMINAR
app.delete ('/usuarios/:id', (req, res) => {
    const { id } = req.params;
    const sql = 'DELETE FROM usuarios WHERE id = ?';

    db.run (sql, [id], function (err) {

        if (err) {
            res.status (400).json ({ error: err.message });
            return;
        }

        res.json ({ mensaje: `Usuario eliminado correctamente`, cambios: this.changes });
    });
});

// Iniciar el servidor
app.listen(puerto, () => {
    console.log (`Servidor está corriendo en http://localhost:${puerto}`);
});
