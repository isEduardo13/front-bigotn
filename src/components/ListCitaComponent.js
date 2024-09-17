import React, { useEffect, useState } from "react";
import CitaService from "../services/CitaService";
// import { Link } from "react-router-dom";

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
    <div className="contenedor">
      <div className="citas">
      <h2 className="text-center fs-1 fw-bold mb-3">Citas</h2>
      <table className="">
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
              <td>{cita.servicios.map((servicio) => <tr>{servicio.descripcion}</tr>)}</td>
              <td>{cita.servicios.map((servicio) => <tr>{'$'+servicio.costo}</tr>)}</td>
              <td>{cita.barbero.nombre}</td>
              {/* <td>
                <Link
                  className="btn btn-info"
                  to={`/cita/edit-cita/${cita.idCita}`}
                >
                  Editar
                </Link>
                <button
                  style={{ marginLeft: "10px" }}
                  className="btn btn-danger"
                  onClick={() => deleteCita(cita.idCita)}
                >
                  Eliminar
                </button>
              </td> */}
            </tr>
          ))}
        </tbody>
      </table>
      </div>
      
      
    </div>
    <div class="text-end">
    <button type="button" class="btn btn-success " href="" >Agregar cita</button>
    </div>
    </>
  );
}
