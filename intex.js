// 1. Traemos la herramienta Express para poder crear las rutas del mesero
import express from 'express';

const app = express();
const PORT = 3000; // El número de "mesa" o puerto donde atenderá nuestro servidor

// 2. Le decimos a nuestra API que apunte todo en formato JSON (un formato de texto organizado)
app.use(express.json());

// 3. Nuestra Base de Datos simulada (La despensa de la cocina con los productos)
let productos = [
{ id: 1, nombre: "Crema Hidratante Facial", precio: 15.99 },
{ id: 2, nombre: "Serum Vitamina C", precio: 22.50 },
{ id: 3, nombre: "Protector Solar SPF 50", precio: 18.00 }
];

// --- AQUÍ EMPIEZAN LAS RUTAS DE LA API REST (Las órdenes que entiende el mesero) ---

// ORDEN 1: Obtener todos los productos (Método GET = Leer)
// Si el cliente pide ir a /api/productos, le entregamos la lista completa
app.get('/api/productos', (req, res) => {
res.json(productos);
});

// ORDEN 2: Obtener un solo producto usando su ID (Método GET = Leer)
// Si el cliente pide /api/productos/2, buscamos el producto con ID número 2
app.get('/api/productos/:id', (req, res) => {
const idBuscar = parseInt(req.params.id); // Guardamos el número que escribió el cliente
const producto = productos.find(p => p.id === idBuscar); // Lo buscamos en nuestra despensa

// Si no existe, el mesero responde con un error 404 (No encontrado)
if (!producto) {
return res.status(404).json({ mensaje: "Producto no encontrado" });
}
// Si existe, se lo entregamos
res.json(producto);
});

// ORDEN 3: Agregar un nuevo producto (Método POST = Crear/Enviar)
// El cliente nos envía los datos de un nuevo producto y lo guardamos
app.post('/api/productos', (req, res) => {
const nuevoProducto = {
id: productos.length + 1, // Le asignamos el siguiente ID disponible
nombre: req.body.nombre, // Guardamos el nombre que nos enviaron
precio: req.body.precio // Guardamos el precio que nos enviaron
};

productos.push(nuevoProducto); // Lo sumamos a nuestra despensa

// Respondemos con el código 201 (Creado con éxito)
res.status(201).json({ mensaje: "Producto creado con éxito", producto: nuevoProducto });
});

// 4. Encendemos los fogones de la cocina (Iniciar el servidor)
// Ruta raíz para dar la bienvenida al usuario
app.get('/', (req, res) => {
res.send('<h1>¡Bienvenido a la API REST de Dermacare Store!</h1><p>Usa la ruta <strong>/api/productos</strong> para ver los productos.</p>');
});

app.listen(PORT, () => {
console.log(`Servidor de la API corriendo en http://localhost:${PORT}`);
});
