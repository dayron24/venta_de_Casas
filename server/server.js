const express = require('express')
const app = express()
const multer = require('multer');
const sharp = require('sharp');

const uri = 'mongodb+srv://dayronpc24:24191308@cluster0.k3sv0ty.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0';
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
const path = require('path');

app.use('/imagenes', express.static(path.join(__dirname, 'imagenes')));

app.get('/api/coasters', (req, res) => {

  Casas
      .find()
      .then(allCasas => res.json(allCasas))
})

app.get('/get-image/:id', async (req, res) => {
  try {
      const { id } = req.params
      console.log(id)
      // Buscar al usuario en la base de datos
      const casa = await Casas.findById(id);

      if (!casa) {
          return res.status(404).json({ error: 'Usuario no encontrado' });
      }

      // Obtener el nombre de la imagen del usuario
      const imageName = casa.imagenesPath[0];
      console.log(imageName);
      if (!imageName) {
          return res.status(404).json({ error: 'Imagen no encontrada para este usuario' });
      }

      // Construir la ruta completa al archivo de imagen
      const imagePath = path.join(__dirname ,'imagenes', imageName);
      

      // Enviar la imagen como respuesta
      res.sendFile(imagePath, {}, (err) => {
          if (err) {
              return res.status(500).json({ error: 'Error al enviar el archivo' });
          }
      });
  } catch (error) {
      return res.status(500).json({ error: error.message });
  }
});

app.get('/api/details/:_id', (req, res) => {

    const { _id } = req.params

    Casas
        .findById(_id)
        .then(casa => res.json(casa))
})

const helperImg = (filePath,fileName,width= 500,height=300) => {
  return sharp(filePath)
      .resize(width,height)
      .toFile(`./imagenes/${fileName}`);

}


const storage = multer.diskStorage({
  destination:(req, file,cb) =>{
      cb(null,'./uploads' )
  },
  filename:(req,file,cb) => {
      const ext = file.originalname.split('.').pop()
      cb(null, `${Date.now()}.png`)
  }
});
const upload = multer({storage,  limits: {
  fieldSize: 1024 * 1024 * 10 // 10 MB, puedes ajustar este valor según tus necesidades
}});

app.post('/upload', upload.single('file'), (req, res) => {

  console.log(req.file);
  helperImg(req.file.path, `resize-${req.file.filename}`)
  const path = `resize-${req.file.filename}`;

// Utilizamos split para obtener el nombre sin extensión y la extensión
  const [nombreSinExtension, extension] = path.split('.');

// Construimos el nuevo nombre del archivo
  const pathFinal = `${nombreSinExtension}.png`;

  res.send({ path: pathFinal})
});

app.post('/guardarDatos',upload.single('file'), async (req, res) => {
    // Aquí puedes manejar y guardar los datos en tu base de datos
    const datosRecibidos = req.body;
    console.log('Datos recibidos:', req.body);
    console.log('file:', req.file)
    // Proceso de carga de archivos
    if (req.file) {
      console.log(req.file);
      helperImg(req.file.path, `resize-${req.file.filename}`);
      const path = `resize-${req.file.filename}`;

      // Utilizamos split para obtener el nombre sin extensión y la extensión
      const [nombreSinExtension, extension] = path.split('.');

      // Construimos el nuevo nombre del archivo
      const pathFinal = `${nombreSinExtension}.png`;
      console.log(pathFinal)

      const nuevaCasa = new Casas({
        nombre: datosRecibidos.nombre,
        descripcion: datosRecibidos.descripcion,
        ubicacion: datosRecibidos.ubicacion,
        precio: datosRecibidos.precio,
        imagenesPath: [pathFinal]
      
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
    
    } else {
    // No se cargó ningún archivo
      return res.json( {data:"No se envio ningguna imagen"} );
    }

    });


app.listen(5005, () => console.log('SERVIDOR LEVANTADO'))