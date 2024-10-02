import axios from "axios";

const URL_BASE = "http://localhost:8080/cliente";
class ClienteService{
    findAll(){
        return axios.get(URL_BASE);
    }

    findById(idCliente){
        return axios.get(URL_BASE+'/'+idCliente);
    }

    create(cliente){
        return axios.post(URL_BASE, cliente);
    }

    update(idCliente, cliente){
        return axios.put(URL_BASE+'/'+idCliente, cliente);
    }

    delete(idCliente){ 
        return axios.delete(URL_BASE+'/'+idCliente);
    }

}

export default new ClienteService();