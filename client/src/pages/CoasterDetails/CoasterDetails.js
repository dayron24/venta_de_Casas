import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";

import './CoasterDetails.css';

const CoasterDetails = () => {
    const { _id } = useParams();
    const [casa, setCasa] = useState({});
    const [image, setImage] = useState(null);

    // const formatPrecio = (precio) => {
    //     console.log(precio)
    //     precioFormat = precio.toLocaleString('es-ES');
    //     return precioFormat
    // }
    const url = 'https://servidorgallos.duckdns.org:446'

    useEffect(() => {
        const loadCosterDetails = () => {
            fetch(`${url}/api/details/${_id}`)
                .then(response => response.json())
                .then(casa => setCasa(casa))
                .catch(error => console.error('Error cargando los detalles de la casa:', error));
        };

        const loadImagenes = async () => {
            try {
                const response = await fetch(`${url}/get-image/${_id}`);
                if (!response.ok) {
                    throw new Error(`Error al obtener la imagen de la casa ${_id}`);
                }
                const blob = await response.blob();
                const imageUrl = URL.createObjectURL(blob);
                setImage(imageUrl);
            } catch (error) {
                console.error('Error cargando la imagen:', error);
            }
        };

        loadCosterDetails();
        loadImagenes();
    }, [_id]);

    // Función para obtener la URL de WhatsApp con el mensaje predefinido
    const getWhatsAppLink = () => {
        const message = `¡Hola! Estoy interesado en la propiedad ${casa.nombre}. Más detalles en: ${window.location.href}`;
        const phoneNumber = '+50663737602'; // Aquí coloca tu número de WhatsApp
        return `https://api.whatsapp.com/send?phone=${phoneNumber}&text=${encodeURIComponent(message)}`;
    };

    return (
        <main className="casa-details">
            <div className="container">
                <h1>Detalles de {casa.nombre}</h1>

                <article className="content">
                <div className="img-container">
                    <img className="imagen" src={image} alt={casa.nombre} />
                </div>
                    <h3>Especificaciones</h3>
                    <p>{casa.descripcion}</p>
                    <ul>
                        <li><strong>Ubicación:</strong> {casa.ubicacion}</li>
                        <li><strong>Precio:</strong> {casa.precio} colones</li>
                    </ul>
                    <a href={getWhatsAppLink()} className="whatsapp-button" target="_blank" rel="noopener noreferrer">Consultar por WhatsApp</a>
                    
                </article>
                <Link to="/" className="my-button">Volver</Link>
            </div>
        </main>
    );
};

function formatPrecioD(precio) {
    precio = precio.toLocaleString('es-ES');
    return `${precio} colones`
}

export default CoasterDetails;
