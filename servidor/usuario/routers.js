const express = require ('express');
const router = express.Router();
const { createUser } = require ('./crud');

// CREAR
router.post ('/usuarios', (req, res) => {
    const { nombre } = req.body;
    createUser (nombre, (err, lastID) => {
        if (err) {
            res.status (400).json({ error: err.message });
        } else {
            res.json({ id: lastID, nombre });
        }
    });
});

module.exports = router;
