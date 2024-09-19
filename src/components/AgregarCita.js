import React, { useState } from 'react';
import Header from './HeadComponent';  // Importa el Header reutilizable
import Footer from './FootComponent';
import CitaService from '../services/CitaService'; // Importa tu servicio

const CitaForm = () => {
    const [fecha, setFecha] = useState('');
    const [hora, setHora] = useState('');
    const [servicio1, setServicio1] = useState({});
    const [cliente, setCliente] = useState({});
    const [barbero, setBarbero] = useState({});

    const handleSubmit = async (event) => {
        event.preventDefault();

        // Asegurarse de que la hora tenga el formato correcto
        const formattedHora = hora.includes(':') ? `${hora}:00` : hora;

        const citaData = {
            fecha: fecha,  // Enviar solo la fecha
            hora: formattedHora,  // Añadir los segundos (HH:mm -> HH:mm:ss)
            servicios: [
                { idServicio: parseInt(servicio1) }
            ],
            cliente: { idCliente: parseInt(cliente) },
            barbero: { idBarbero: parseInt(barbero) }
        };

        try {
            const response = await CitaService.createCita(citaData);
            console.log('Cita creada:', response.data);
            alert('Cita creada exitosamente.');
        } catch (error) {
            if (error.response) {
                console.error('Error en la respuesta del servidor:', error.response.data);
                alert(`Error: ${error.response.data.message || 'Problema al crear la cita'}`);
            } else if (error.request) {
                console.error('No se recibió respuesta del servidor:', error.request);
                alert('No se recibió respuesta del servidor.');
            } else {
                console.error('Error:', error.message);
                alert(`Error: ${error.message}`);
            }
        }
    };

    return (
        <>
            <Header /> {/* Añadir el Header reutilizable */}

            <form onSubmit={handleSubmit}>
                <label>
                    Fecha:
                    <input type="date" value={fecha} onChange={(e) => setFecha(e.target.value)} />
                </label>
                <label>
                    Hora:
                    <input type="time" value={hora} onChange={(e) => setHora(e.target.value)} />
                </label>
                <label>
                    Servicio 1:
                    <input type="text" value={servicio1} onChange={(e) => setServicio1(e.target.value)} />
                </label>

                <label>
                    Cliente:
                    <input type="text" value={cliente} onChange={(e) => setCliente(e.target.value)} />
                </label>
                <label>
                    Barbero:
                    <input type="text" value={barbero} onChange={(e) => setBarbero(e.target.value)} />
                </label>
                <button type="submit" className="btn btn-success mt-3">Crear Cita</button>
            </form>

            <Footer /> {/* Añadir el Footer reutilizable */}

        </>
    );
};

export default CitaForm;
