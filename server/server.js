const express = require('express')
const app = express()

const uri = 'mongodb+srv://dayronpc24:24191308@casasdb.fopkvps.mongodb.net/?retryWrites=true&w=majority';
// DB connection
const mongoose = require('mongoose')
mongoose
    .connect(uri)
    .then(() => console.log('CONECTADO A BBDD'))


// Model
const Coaster = require('./Models/Coaster.model')
const Casas = require('./Models/casa')

// CORS
const cors = require('cors')
app.use(cors())
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ limit: '50mb', extended: true }));

// Routing
app.get('/api/coasters', (req, res) => {

    Casas
        .find()
        .then(allCasas => res.json(allCasas))
})


app.get('/api/details/:casa_id', (req, res) => {

    const { casa_id } = req.params

    Casas
        .findById(casas_id)
        .then(casa => res.json(casa))
})

app.post('/guardarDatos', async (req, res) => {
    // Aquí puedes manejar y guardar los datos en tu base de datos
    const datosRecibidos = req.body;
    console.log('Datos recibidos:', req.body);
   
    
    const nuevaCasa = new Casas({
      nombre: datosRecibidos.nombre,
      descripcion: datosRecibidos.descripcion,
      ubicacion: datosRecibidos.ubicacion,
      precio: datosRecibidos.precio,
      imagenes: [datosRecibidos.imagen1]
        
    });
    try {
        // ... (código existente)
    
        await nuevaCasa.save();
    
        // Devuelve un mensaje de éxito
        res.json({ message: 'Casa guardada exitosamente en la base de datos' });
      } catch (error) {
        console.error(error);
        
        // Devuelve un mensaje de error
        res.status(500).json({ message: 'Error al guardar la casa en la base de datos' });
      }
    });


app.listen(5005, () => console.log('SERVIDOR LEVANTADO'))