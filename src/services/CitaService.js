import axios from "axios";

const URL_BASE = "http://localhost:8080/cita";

class CitaService {
    // Método para obtener todas las citas
    findAll() {
        return axios.get(URL_BASE);
    }

    // Método para crear una cita
    createCita(citaData) {
        return axios.post(URL_BASE, citaData);
    }
}

export default new CitaService();
