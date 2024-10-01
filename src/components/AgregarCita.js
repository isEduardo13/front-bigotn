import React, { useState } from 'react';
import Header from './HeadComponent';  // Importa el Header reutilizable
import Footer from './FootComponent';
import CitaService from '../services/CitaService'; // Importa tu servicio
import useServicios from '../hooks/useServicios';
import 'bootstrap/dist/css/bootstrap.min.css';

const CitaForm = () => {
    const [fecha, setFecha] = useState('');
    const [hora, setHora] = useState('');
    const [servicio1, setServicio1] = useState('');
    const [cliente, setCliente] = useState('');
    const [telefono, setTelefono] = useState(''); // Agregado para el teléfono
    const [barbero, setBarbero] = useState('');
    const { servicios, error } = useServicios();

    if (error) {
        console.error('Error al obtener los servicios:', error);
    }

    const handleSubmit = async (event) => {
        event.preventDefault();

        const formattedHora = hora.includes(':') ? `${hora}:00` : hora;

        const citaData = {
            fecha: fecha,
            hora: formattedHora,
            servicios: [{ idServicio: parseInt(servicio1) }],
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
            <Header />
            <div className="container d-flex flex-column flex-grow-1">
                <h1 className="mb-4 text-center">Citas</h1>
                <form onSubmit={handleSubmit} className="border p-3 flex-grow-1">
                    <div className="row mb-3">
                        <div className="col-md-8">
                            <h2 aria-label="Sucursal">Sucursal</h2>
                            <select className="form-select" size="3" aria-label="size 3 select example">
                                <option selected>Open this select menu</option>
                                <option value="1">One</option>
                                <option value="2">Two</option>
                                <option value="3">Three</option>
                            </select>
                        </div>
                        <div className="col-md-4">
                            <div>
                                <label htmlFor="fecha">Fecha</label>
                                <input type="date" className="form-control" id="fecha" name="fecha" value={fecha} onChange={(e) => setFecha(e.target.value)} />
                            </div>
                            <div className="form-group">
                                <label htmlFor="hora">Hora</label>
                                <input type="time" className="form-control" id="hora" name="hora" value={hora} onChange={(e) => setHora(e.target.value)} />
                            </div>
                        </div>
                    </div>
                    <h2>Servicios</h2>
                    <div className="border p-3">
                        <select className="form-select" value={servicio1} onChange={(e) => setServicio1(e.target.value)}>
                            <option value="">Seleccione un servicio</option>
                            {servicios.map((servicio) => (
                                <option key={servicio.idServicio} value={servicio.idServicio}>{servicio.descripcion}</option>
                            ))}
                        </select>
                    </div>
                    <div className="row">
                        <div className="col-md-6">
                            <div class="mb-3">
                                <label for="formGroupExampleInput" class="form-label">Cliente</label>
                                <input type="text" class="form-control" id="formGroupExampleInput" placeholder="" />
                            </div>
                        </div>
                        <div className="col-md-6">
                        <div class="mb-3">
                                <label for="formGroupExampleInput" class="form-label">Telefono</label>
                                <input type="text" class="form-control" id="formGroupExampleInput" placeholder="" />
                            </div>
                        </div>
                    </div>
                    <h2>Barbero</h2>
                    <select className="form-select" size="3" aria-label="size 3 select example" value={barbero} onChange={(e) => setBarbero(e.target.value)}>
                        <option selected>Seleccione al barbero</option>
                        <option value="1">Jafet</option>
                        <option value="2">Lalo</option>
                        <option value="3">Eduardo</option>
                        <option value="4">Phantom</option>
                    </select>
                    <div className="mt-3">
                        <button type="submit" className="btn btn-outline-success">Agregar Cita</button>

                    </div>
                </form>
            </div>

        </>
    );
};

export default CitaForm;
