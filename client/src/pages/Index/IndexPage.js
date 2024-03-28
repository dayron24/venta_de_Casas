import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

import './estilos.css';

const IndexPage = () => {
    const [casas, setCasas] = useState([]);

    useEffect(() => {
        const loadCasas = async () => {
            try {
                const URL = 'https://servidorgallos.duckdns.org:446';
                const response = await fetch(`${URL}/api/coasters`);
                if (!response.ok) {
                    throw new Error('Error al obtener las casas del servidor');
                }
                const allCasas = await response.json();
                setCasas(allCasas);
            } catch (error) {
                console.error('Error cargando las casas:', error);
            }
        };

        loadCasas();
    }, []); // Sin dependencias para que se ejecute solo una vez al montar el componente

    return (
        <main>
            <link href='https://unpkg.com/boxicons@2.1.4/css/boxicons.min.css' rel='stylesheet' />
            <div className="banner-container">
                
                Productos disponibles en Ragnar
                
                <img className='imagen-derecha' src='/logoRagnar.png'></img>
                

            </div>
            <div className='listado'>
            {casas.map(eachCasa => (
                <div className="casa-item" key={eachCasa._id || Math.random()}>
                    <div className="margen">
                        <Link key={eachCasa._id} to={`/detalles/${eachCasa._id}`} className="no-underline">
                            <strong>{eachCasa.nombre}</strong>
                            <div className="imagen-container">
                                <img src={`https://servidorgallos.duckdns.org:446/get-image/${eachCasa._id}`} alt={eachCasa.nombre} />
                            </div>
                            <p>{eachCasa.descripcion}</p>
                            <h3> Ubicación: {eachCasa.ubicacion}</h3>

                            <h3>Precio: {formatPrecio(eachCasa.precio)}</h3>
                        </Link>
                    </div>
                </div>
            ))}
            </div>
            {/* <Link to="/">Ir al inicio</Link> */}
        </main>
    );
};

function formatPrecio(precio) {
    precio = precio.toLocaleString('es-ES');
    return `${precio} colones`
}

export default IndexPage;
