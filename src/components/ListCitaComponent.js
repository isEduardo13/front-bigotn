import React, { useEffect, useState } from "react";
import CitaService from "../services/CitaService";
import Header from './HeadComponent'; // Importa el Header
import Footer from './FootComponent'; // Importa el Footer

export default function ListCitaComponent() {
  const [citas, setCitas] = useState([]);

  useEffect(() => {
    listarCitas();
  }, []);

  const listarCitas = () => {
    CitaService.findAllQueries()
      .then((response) => {
        setCitas(response.data);
        console.log(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const deleteCita = (idCita) => {
    CitaService.delete(idCita)
      .then((response) => {
        listarCitas();
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <>
      <Header /> {/* Añadir el Header reutilizable */}
      <div className="contenedor">
        <div className="citas">
          <h2 className="text-center fs-1 fw-bold mb-3">Citas</h2>
          <br></br>
          <table className="table table-striped"> {/* Añadir clase para estilos básicos */}
            <thead>
              <tr>
                <th>ID</th>
                <th>Nombre</th>
                <th>Fecha</th>
                <th>Hora</th>
                <th>Servicio</th>
                <th>Costo</th>
                <th>Barbero</th>
              </tr>
            </thead>
            <tbody>
              {citas.map((cita) => (
                <tr key={cita.idCita}>
                  <td>{cita.idCita}</td>
                  <td>{cita.cliente.nombre}</td>
                  <td>{cita.fecha}</td>
                  <td>{cita.hora}</td>
                  {/* Mostramos los servicios dentro de una sola celda */}
                  <td>
                    {cita.servicios.map((servicio, index) => (
                      <div key={index}>{servicio.descripcion}</div>
                    ))}
                  </td>
                  <td>
                    {cita.servicios.map((servicio, index) => (
                      <div key={index}>{'$' + servicio.costo}</div>
                    ))}
                  </td>
                  <td>{cita.barbero.nombre}</td>
                </tr>
              ))}
            </tbody>
          </table>
            <br></br>
          <div className="text-center">
            
            <a href="/agregar-cita" className="btn btn-success">Agregar cita</a>
          </div>
        </div>

      </div>
      <Footer /> {/* Añadir el Footer reutilizable */}
    </>
  );
}
