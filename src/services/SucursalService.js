import axios from "axios";

const URL_BASE = "http://localhost:8080/sucursal";
class SucursalService{
    findAll(){
        return axios.get(URL_BASE);
    }

    findById(idSucursal){
        return axios.get(URL_BASE+'/'+idSucursal);
    }

    create(sucursal){
        return axios.post(URL_BASE, sucursal);
    }

    update(idSucursal, sucursal){
        return axios.put(URL_BASE+'/'+idSucursal, sucursal);
    }

    delete(idSucursal){ 
        return axios.delete(URL_BASE+'/'+idSucursal);
    }

    getBarberos(idSucursal){
        return axios.get(URL_BASE+'/barberos/'+idSucursal)
    }

    getCitas(idSucursal){
        return axios.get(URL_BASE+'/citas/'+idSucursal)
    }

}

export default new SucursalService();
