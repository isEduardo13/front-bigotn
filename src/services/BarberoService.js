import axios from "axios";

const URL_BASE = "http://localhost:8080/barbero";
class BarberoService{
    findAll(){
        return axios.get(URL_BASE);
    }

    findById(idBarbero){
        return axios.get(URL_BASE+'/'+idBarbero);
    }

    create(barbero){
        return axios.post(URL_BASE, barbero);
    }

    update(idBarbero, barbero){
        return axios.put(URL_BASE+'/'+idBarbero, barbero);
    }

    delete(idBarbero){ 
        return axios.delete(URL_BASE+'/'+idBarbero);
    }

}

export default new BarberoService();