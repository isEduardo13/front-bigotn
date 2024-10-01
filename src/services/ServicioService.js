import axios from "axios";

const URL_BASE = "http://localhost:8080/servicio";


export const getAll = async () => {
    try {
        const response = await axios.get(URL_BASE);
        return response.data;
    } catch (error) {
        console.error('Error al recuperar los servicios:', error);
        throw error;
    }
};
