import { useState } from 'react';


import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom'
import './estilo_subirCasas.css'

const SubirCasa = () => {
  const isAdminAuthenticated = localStorage.getItem('isAdminAuthenticated');
  const navigate = useNavigate();

  if (!isAdminAuthenticated) {
    // Si no está autenticado, redirige a la página de login
    navigate('/login');
    return null; // Agrega un return para salir de la función si no está autenticado
  }

  return <SubirCasaContent />;

};


const SubirCasaContent = () => {

   const [values, setValues] = useState({
        nombre: '',
        descripcion: '',
        ubicacion: '',
        precio: '',
        imagen1: '',
        imagen2: '',
        imagen3: '',
        imagen4: '',
        imagen5: '',
 
       });

    
       const handleInputChange = (e) => {
        const { name, files } = e.target;
      
        // Si es un campo de entrada de archivo, realiza la conversión a base64
        if (files) {
          const file = files[0];
          convertirArchivoABase64(file)
            .then(base64String => {
                setValues(prevData => ({
                ...prevData,
                [name]: base64String,
              }));
            })
            .catch(error => {
              console.error('Error al convertir la imagen:', error);
            });
        } else {
          // Si no es un campo de entrada de archivo, actualiza el valor directamente
          setValues(prevData => ({
            ...prevData,
            [name]: e.target.value,
          }));
        }
      };
      
      // Función para convertir un archivo a formato base64
      const convertirArchivoABase64 = (file) => {
        return new Promise((resolve, reject) => {
          const reader = new FileReader();
          reader.onload = () => resolve(reader.result.split(',')[1]);
          reader.onerror = (error) => reject(error);
          reader.readAsDataURL(file);
        });
      };
    // Función para convertir un archivo a formato base64
    const handleForm = (e) => {
        e.preventDefault();
        
        subirCasa(JSON.stringify(values));
        
        
    };

    const [serverMessage, setServerMessage] = useState('');

    const subirCasa = async (casa) => {
        console.log(casa);
        try {
            const response = fetch('http://localhost:5005/guardarDatos',{
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: casa,
              
            });
            if (!response.ok) {
                throw new Error('Error al enviar datos al servidor');
              }
        
              const responseData = await response.json();
              console.log(responseData);
        
              // Actualiza el estado con el mensaje del servidor
              setServerMessage(responseData.message || 'Datos guardados exitosamente');
            } catch (error) {
              console.error('Error:', error);
              // Actualiza el estado con el mensaje de error
              setServerMessage('Error al enviar datos al servidor');
            }
          };
            
    return (
        <main>
        
        <h2>Publicar una nueva casa</h2>
        {/* Mostrar el mensaje del servidor */}
        {serverMessage && <p>{serverMessage}</p>}
        <form id="formularioCasa" onSubmit={handleForm}>

          <label htmlFor="nombre">Nombre:</label>
          <input type="text" 
           name="nombre" onChange={handleInputChange}
           value = {values.nombre} 
           required/><br/>
  
          <label htmlFor="descripcion">Descripción:</label>
          <textarea id="descripcion" name="descripcion" 
          value = {values.descripcion} 
          onChange={handleInputChange} rows="4" required/><br/>
  
          <label htmlFor="ubicacion">Ubicación:</label>
          <input type="text" id="ubicacion" name="ubicacion" 
          value = {values.ubicacion} 
          onChange={handleInputChange} required/><br/>
  
          <label htmlFor="precio">Precio:</label>
          <input type="number" id="precio" name="precio" step="1" 
          value = {values.precio} 
          onChange={handleInputChange} required/><br/>
  
          <label htmlFor="imagen1">Imagen 1:</label>
          <input type="file" id="imagen1" name="imagen1" 
          
          accept="image/*" onChange={handleInputChange}  /><br/>
  
          <label htmlFor="imagen2">Imagen 2:</label>
          <input type="file" id="imagen2" name="imagen2" 
   
          accept="image/*" onChange={handleInputChange} /><br/>
  
          <label htmlFor="imagen3">Imagen 3:</label>
          <input type="file" id="imagen3" name="imagen3" 
 
          accept="image/*" onChange={handleInputChange} /><br/>
  
          <label htmlFor="imagen4">Imagen 4:</label>
          <input type="file" id="imagen4" name="imagen4" 
  
          accept="image/*" onChange={handleInputChange}  /><br/>
  
          <label htmlFor="imagen5">Imagen 5:</label>
          <input type="file" id="imagen5" name="imagen5" 
       
          accept="image/*" onChange={handleInputChange} /><br/>
  
  
          <input type="submit" value="Enviar"/>
        </form>
      
      </main>
    );
  };
        // <main>
        //     <h1>Binevenid@ a la MERN Coasters!</h1>
        //     <hr />
        //     <Link to="/galeria">Ver galeria</Link>
        // </main>

export default SubirCasa;
