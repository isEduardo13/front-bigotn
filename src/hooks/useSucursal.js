import {useEffect, useState} from 'react'
import {getAll} from '../services/SucursalService'

const useSucursal = () => {
    const [sucursales, setSucursales] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)

    useEffect(() => {
        const fetchData = async () => {
            try {
                const data = await getAll()
                setSucursales(data)
            } catch (error) {
                setError(error)
            } finally {
                setLoading(false)
            }
        }

        fetchData()
    }, [])

    return {sucursales, loading, error}
}

export default useSucursal;