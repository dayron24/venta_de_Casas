import { useState } from 'react'
import { Link } from 'react-router-dom'

import './estilos.css'

const IndexPage = () => {

    const [casas, setCasas] = useState([])

    const loadCasas = () => {

        fetch('http://localhost:5005/api/coasters')
            .then(res => res.json())
            .then(allCasas => setCasas(allCasas))
    }

    loadCasas()

    return (
        
        <main>
            <link href='https://unpkg.com/boxicons@2.1.4/css/boxicons.min.css' rel='stylesheet'></link>
         <div className="banner-container">

           <h1>Listado de casas</h1>
  
        </div >
       
        <div class="casa-item" > 
        </div >
        {casas.map(eachCasa => (
            
            <div class="casa-item" key={eachCasa._id}>
               <div class="margen" >
                <Link key={eachCasa._id} to={`/detalles/${eachCasa._id}`} className="no-underline">
              
                
                <strong>{eachCasa.nombre}</strong>
                <img src={`data:image/jpeg;base64, ${eachCasa.imagenes[0]}`} alt= {eachCasa.nombre}></img>
                    <p>{eachCasa.descripcion}</p>
                 
                    <p>Ubicación: {eachCasa.ubicacion}</p>
                     <p>Precio: {formatPrecio(eachCasa.precio)}</p>
                  
                    

                     </Link>
                     </div>
                </div>
            
        ))}
        <Link to="/">Ir al inicio</Link>
    </main>
    )
}
function formatPrecio(precio) {
    return precio.toLocaleString('es-ES');
}
export default IndexPage