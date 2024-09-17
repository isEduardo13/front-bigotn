import axios from "axios";

const URL_BASE = "http://localhost:8080/cita";
class CitaService{
    findAll(){
        return axios.get(URL_BASE);
    }

    findAllQueries(){
        return axios.get(URL_BASE+'/consulta');
    }

    findById(idCita){
        return axios.get(URL_BASE+'/'+idCita);
    }

    create(cita){
        return axios.post(URL_BASE, cita);
    }

    update(idCita, cita){
        return axios.put(URL_BASE+'/'+idCita, cita);
    }

    delete(idCita){ 
        return axios.delete(URL_BASE+'/'+idCita);
    }

    query(idCita){
        return axios.get(URL_BASE+'/consulta/'+idCita);
    }

}

export default new CitaService();