import { useState, useEffect } from 'react';
import  {getAll}  from '../services/ServicioService';

const useServicios = () => {
    const [servicios, setServicios] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);


    useEffect(() => {
        const fetchData = async () => {
            try {
                const data = await getAll();
                setServicios(data);
            } catch (error) {
                setError(error);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);



    return { servicios, loading, error };
};

export default useServicios;