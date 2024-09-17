import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Inicio from './components/Index';
import CitaForm from './components/AgregarCita';
import ListCitaComponent from './components/ListCitaComponent'; // Mantener el componente de la otra rama

import './App.css'; // Importar los estilos que faltan
import './citas.css';

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Inicio />} />
                <Route path="/agregar-cita" element={<CitaForm />} />
                <Route path="/lista-citas" element={<ListCitaComponent />} /> {/* Ruta añadida para ListCitaComponent */}
            </Routes>
        </Router>
    );
}

export default App;
