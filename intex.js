import http from 'http';

// Nuestra lista de productos en memoria
let productos = [
{ id: 1, nombre: "Labial Matte", precio: 15.50 },
{ id: 2, nombre: "Base de Maquillaje", precio: 22.00 },
{ id: 3, nombre: "Corrector de Ojeras", precio: 10.00 }
];

const server = http.createServer((req, res) => {
res.setHeader('Content-Type', 'application/json; charset=utf-8');

// 1. RUTA GET: Ver TODOS los productos (/api/productos)
if (req.url === '/api/productos' && req.method === 'GET') {
res.statusCode = 200;
return res.end(JSON.stringify(productos));
}

// 2. RUTA GET POR ID: Ver UN solo producto (ejemplo: /api/productos/1)
if (req.url.startsWith('/api/productos/') && req.method === 'GET') {
// Separamos la URL por las barras "/" para agarrar el ID que está al final
const partes = req.url.split('/');
const idBusca = parseInt(partes[3]); // Esto agarra el número final (ej: 1, 2, 3)

// Buscamos el producto en nuestro arreglo
const productoEncontrado = productos.find(p => p.id === idBusca);

if (productoEncontrado) {
res.statusCode = 200;
return res.end(JSON.stringify(productoEncontrado));
} else {
res.statusCode = 404;
return res.end(JSON.stringify({ mensaje: "Producto no encontrado" }));
}
}

// 3. RUTA POST: Agregar un producto nuevo
if (req.url === '/api/productos' && req.method === 'POST') {
let body = '';

req.on('data', chunk => {
body += chunk.toString();
});

req.on('end', () => {
try {
const nuevoProducto = JSON.parse(body);
nuevoProducto.id = productos.length + 1;
productos.push(nuevoProducto);

res.statusCode = 201;
res.end(JSON.stringify(nuevoProducto));
} catch (error) {
res.statusCode = 400;
res.end(JSON.stringify({ mensaje: "Error en el formato de los datos" }));
}
});
} else if (!req.url.startsWith('/api/productos')) {
// Si entran a cualquier otra ruta que no empiece por /api/productos
res.statusCode = 404;
res.end(JSON.stringify({ mensaje: "Ruta no encontrada" }));
}
});

server.listen(3000, () => {
console.log("Servidor nativo corriendo en el puerto 3000");
});

