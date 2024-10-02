import React, { useEffect, useState } from "react";
import CitaService from "../services/CitaService";
import Header from './HeadComponent'; // Importa el Header
import Footer from './FootComponent'; // Importa el Footer
import { Grid2, MenuItem, Select } from "@mui/material";
import SucursalService from "../services/SucursalService"; // Importa tu servicio

export default function ListCitaComponent() {
  const [citas, setCitas] = useState([]);
  const [sucursales, setSucursales] = useState([]);
  const [sucursal, setSucursal] = useState("");

  useEffect(() => {
    getSucursales();
  }, []);


  const getSucursales = () => {
    SucursalService.findAll()
      .then((response) => {
        setSucursales(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };



  const listarCitas = (idSucursal) => {
    // CitaService.findAllQueries()
    //   .then((response) => {
    //     setCitas(response.data);
    //     console.log(response.data);
    //   })
    //   .catch((error) => {
    //     console.log(error);
    //   });

    SucursalService.getCitas(idSucursal)
    .then((response) => {
      setCitas(response.data);
      console.log(response.data);
    })
    .catch((error) => {
      console.log(error);
    })
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

  const handleSucursalChange = (event) => {setSucursal(event.target.value);
    listarCitas(event.target.value);
  }
  

  return (
    <>
      <Header /> {/* Añadir el Header reutilizable */}
      <div className="contenedor">
        <div className="citas">
          <h2 className="text-center fs-1 fw-bold mb-3">Citas</h2>
          <br></br>
          <Grid2 item xs={12} md={6} size={8}>
              <Select
                fullWidth
                value={sucursal}
                onChange={handleSucursalChange}
              >
                {sucursales.map((sucursal) => (
                  <MenuItem value={sucursal.idSucursal}>
                    {sucursal.direccion}
                  </MenuItem>
                ))}
              </Select>
            </Grid2>
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
