import React, { useEffect, useState } from "react";
import Grid from "@mui/material/Grid2";
import {
  Box,
  Button,
  MenuItem,
  Modal,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Header from "./HeadComponent"; // Importa el Header reutilizable
import CitaService from "../services/CitaService"; // Importa tu servicio
import SucursalService from "../services/SucursalService"; 
import ServicioService from "../services/ServicioService"; 
import ClienteService from "../services/ClienteService"; 
import { Link, useNavigate } from "react-router-dom";

const Cita = () => {
  const navigate = useNavigate();

  const [sucursales, setSucursales] = useState([]);
  const [barberos, setBarberos] = useState([]);
  const [servicios, setServicios] = useState([]);

  const [serviciosSelecionados, setServiciosSelecionados] = useState([]);

  const [sucursal, setSucursal] = useState("");
  const [barbero, setBarbero] = useState("");
  const [servicio, setServicio] = useState({});

  const [nombre, setNombre] = useState("");
  const [telefono, setTelefono] = useState("");
  const [fecha, setFecha] = useState("");
  const [hora, setHora] = useState("");

  useEffect(() => {
    getSucursales();
    getServicios();
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

  const getBarberos = (idSucursal) => {
    SucursalService.getBarberos(idSucursal)
      .then((response) => {
        setBarberos(response.data);
        console.log(`Aqui estan los barberos ${response.data}`);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const getServicios = () => {
    ServicioService.findAll()
      .then((response) => {
        setServicios(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const createCliente = () => {
    const cliente = {
      nombre: nombre,
      telefono: telefono,
    };

    ClienteService.create(cliente)
      .then((response) => {
        console.log(response.data);
        createCita(response.data.idCliente);
      })
      .catch((error) => {
        if (error.response) {
          console.error(
            "Error en la respuesta del servidor:",
            error.response.data
          );
          alert(
            `Error: ${
              error.response.data.message || "Problema al crear el cliente"
            }`
          );
        } else if (error.request) {
          console.error("No se recibió respuesta del servidor:", error.request);
          alert("No se recibió respuesta del servidor.");
        } else {
          console.error("Error:", error.message);
          alert(`Error: ${error.message}`);
        }
      });
  };

  const createCita = (idCliente) => {
    // Asegurarse de que la hora tenga el formato correcto
    const formattedHora = hora.includes(":") ? `${hora}:00` : hora;

    const servicios = serviciosSelecionados.map((servicio) => ({
      idServicio: servicio.idServicio,
    }));

    const citaData = {
      fecha: fecha, // Enviar solo la fecha
      hora: formattedHora, // Añadir los segundos (HH:mm -> HH:mm:ss)
      servicios: servicios,
      cliente: { idCliente: parseInt(idCliente) },
      barbero: { idBarbero: parseInt(barbero) },
    };

    CitaService.createCita(citaData)
      .then((response) => {
        console.log(response.data);
        setIsModalOpen(true);
      })
      .catch((error) => {
        if (error.response) {
          console.error(
            "Error en la respuesta del servidor:",
            error.response.data
          );
          alert(
            `Error: ${
              error.response.data.message || "Problema al crear la cita"
            }`
          );
        } else if (error.request) {
          console.error("No se recibió respuesta del servidor:", error.request);
          alert("No se recibió respuesta del servidor.");
        } else {
          console.error("Error:", error.message);
          alert(`Error: ${error.message}`);
        }
      });
  };

  const handleSucursalChange = (event) => {
    setSucursal(event.target.value);
    getBarberos(parseInt(event.target.value));
  };
  const handleBarberoChange = (event) => setBarbero(event.target.value);
  const handleServicioChange = (event) => setServicio(event.target.value);

  const handleAgregarServicio = () => {
    // Lógica para agregar un servicio
    setServiciosSelecionados((prevServicios) => [...prevServicios, servicio]);
    console.log(serviciosSelecionados);
  };

  const handleNavigate = () => {
    // Redirige a la página deseada
    navigate("/lista-citas"); // Cambia '/otra-pagina' por la ruta a la que quieras ir
  };

  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      <Header></Header>
      <div className="citas">
        <Box
          sx={{
            padding: 4,
            backgroundColor: "#f4f4f4",
            borderRadius: 2,
            maxWidth: 800,
            margin: "auto",
          }}
        >
          <Typography variant="h4" align="center" gutterBottom>
            Citas
          </Typography>

          <Grid container spacing={2}>
            {/* Sucursal */}
            <Grid item size={12}>
              <Typography size={12}>Sucursal</Typography>
            </Grid>

            <Grid item xs={12} md={6} size={8}>
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
            </Grid>

            {/* Fecha y Hora */}
            <Grid item xs={12} md={6} size={4}>
              <Grid container direction="column" spacing={2}>
                <Grid item>
                  <TextField
                    fullWidth
                    label="Fecha"
                    type="date"
                    value={fecha}
                    onChange={(e) => setFecha(e.target.value)}
                    InputLabelProps={{ shrink: true }}
                  />
                </Grid>
                <Grid item>
                  <TextField
                    fullWidth
                    label="Hora"
                    type="time"
                    value={hora}
                    onChange={(e) => setHora(e.target.value)}
                    InputLabelProps={{ shrink: true }}
                  />
                </Grid>
              </Grid>
            </Grid>

            {/* Servicios */}
            <Grid container spacing={2}>
              <Grid item size={9}>
                <Typography>Servicios</Typography>
              </Grid>
              <Grid item xs={12} md={6} size={10}>
                <Select
                  fullWidth
                  value={servicio}
                  onChange={handleServicioChange}
                >
                  {servicios.map((servicio) => (
                    <MenuItem value={servicio}>{servicio.descripcion}</MenuItem>
                  ))}
                </Select>
              </Grid>
              <Grid item xs={3} size={2}>
                <Button
                  fullWidth
                  variant="contained"
                  color="success"
                  onClick={handleAgregarServicio}
                >
                  Agregar Servicio
                </Button>
              </Grid>
              <TableContainer component={Paper}>
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                  <TableHead>
                    <TableRow>
                      <TableCell>Descripcion</TableCell>
                      <TableCell align="right">Costo</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {serviciosSelecionados.map((ser) => (
                      <TableRow
                        key={ser.idServicio}
                        sx={{
                          "&:last-child td, &:last-child th": { border: 0 },
                        }}
                      >
                        <TableCell component="th" scope="row">
                          {ser.descripcion}
                        </TableCell>
                        <TableCell align="right">{ser.costo}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </Grid>

            {/* Cliente */}
            <Grid item size={12}>
              <Typography gutterBottom>Cliente</Typography>
            </Grid>
            <Grid item size={7}>
              <TextField
                fullWidth
                label="Nombre"
                value={nombre}
                onChange={(e) => setNombre(e.target.value)}
              />
            </Grid>
            <Grid item size={5}>
              <TextField
                fullWidth
                label="Teléfono"
                value={telefono}
                onChange={(e) => setTelefono(e.target.value)}
              />
            </Grid>

            {/* Barbero */}
            <Grid item size={12}>
              <Typography>Barbero</Typography>
              <Select fullWidth value={barbero} onChange={handleBarberoChange}>
                {barberos.map((barbero) => (
                  <MenuItem value={barbero.idBarbero}>
                    {barbero.nombre}
                  </MenuItem>
                ))}
              </Select>
            </Grid>

            {/* Botones */}
            <Grid item xs={12} md={6}>
              <Button
                fullWidth
                variant="contained"
                color="success"
                onClick={(e) => {
                  createCliente(e);
                }}
              >
                Agregar cita
              </Button>
            </Grid>
            <Grid item xs={12} md={6}>
              <Link to="/lista-citas">
                <Button fullWidth variant="outlined" color="secondary">
                  Cancelar
                </Button>
              </Link>
            </Grid>
          </Grid>
        </Box>
      </div>
      <Modal
        open={isModalOpen}
        aria-labelledby="modal-title"
        aria-describedby="modal-description"
      >
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: 300,
            bgcolor: "background.paper",
            border: "2px solid #000",
            boxShadow: 24,
            p: 4,
          }}
        >
          <Typography id="modal-title" variant="h6" component="h2">
            Cita Creada con Éxito
          </Typography>
          <Typography id="modal-description" sx={{ mt: 2 }}>
            ¡Tu cita ha sido creada con éxito!
          </Typography>
          <Button
            onClick={handleNavigate}
            variant="contained"
            color="success"
            sx={{ mt: 2 }}
          >
            Aceptar
          </Button>
        </Box>
      </Modal>
    </>
  );
};

export default Cita;
