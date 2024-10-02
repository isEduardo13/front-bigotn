import axios from "axios";

const URL_BASE = "http://localhost:8080/servicio";
class ServicioService{
    findAll(){
        return axios.get(URL_BASE);
    }

    findById(idServicio){
        return axios.get(URL_BASE+'/'+idServicio);
    }

    create(servicio){
        return axios.post(URL_BASE, servicio);
    }

    update(idServicio, servicio){
        return axios.put(URL_BASE+'/'+idServicio, servicio);
    }

    delete(idServicio){ 
        return axios.delete(URL_BASE+'/'+idServicio);
    }

}

export default new ServicioService();
