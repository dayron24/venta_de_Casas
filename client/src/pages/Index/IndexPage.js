import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

import './estilos.css';

const IndexPage = () => {
    const [casas, setCasas] = useState([]);

    useEffect(() => {
        loadCasas();
    }, []);

    const loadCasas = async () => {
        try {
            const URL = 'http://https://venta-casas.onrender.com';
            
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

    useEffect(() => {
        const loadImagenes = async () => {
            try {
                const nuevasCasas = await Promise.all(casas.map(async (casa) => {
                    const response = await fetch(`${URL}/get-image/${casa._id}`);
                    if (!response.ok) {
                        throw new Error(`Error al obtener la imagen de la casa ${casa._id}`);
                    }
                    const blob = await response.blob();
                    const imageUrl = URL.createObjectURL(blob);
                    return { ...casa, imageUrl };
                }));
                setCasas(nuevasCasas);
            } catch (error) {
                console.error('Error cargando las imágenes:', error);
            }
        };
    
        if (casas.length > 0) {
            loadImagenes();
        }
    }, [casas.length]); // Solo ejecuta el efecto cuando cambie la longitud de 'casas'


    return (
        <main>
            <link href='https://unpkg.com/boxicons@2.1.4/css/boxicons.min.css' rel='stylesheet' />
            <div className="banner-container">
                <h1>Productos y servicios disponibles</h1>
            </div>

            {casas.map(eachCasa => (
                <div className="casa-item" key={eachCasa._id || Math.random()}>
                    <div className="margen">
                        <Link key={eachCasa._id} to={`/detalles/${eachCasa._id}`} className="no-underline">
                            <strong>{eachCasa.nombre}</strong>
                            <div className="imagen-container">
                                <img src={eachCasa.imageUrl} alt={eachCasa.nombre} />
                            </div>
                            <p>{eachCasa.descripcion}</p>
                            <h3> Ubicación: {eachCasa.ubicacion}</h3>

                            <h3>Precio: {formatPrecio(eachCasa.precio)}</h3>
                        </Link>
                    </div>
                </div>
            ))}
            {/* <Link to="/">Ir al inicio</Link> */}
        </main>
    );
};

function formatPrecio(precio) {
    precio = precio.toLocaleString('es-ES');
    return `${precio} colones`
}

export default IndexPage;
