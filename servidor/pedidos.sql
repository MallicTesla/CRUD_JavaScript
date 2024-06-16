CREATE TABLE IF NOT EXISTS pedidos (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    usuario_id INTEGER NOT NULL,
    numero_boleta  INTEGER NOT NULL,
    item_existente BOOLEAN DEFAULT TRUE,
    cantidad_items INTEGER NOT NULL,
    cantidad_items_negados INTEGER,
    notas TEXT,
    fecha DATE NOT NULL,

    FOREIGN KEY (usuario_id) REFERENCES usuarios (id)
);