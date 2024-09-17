// App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Inicio from './components/Index';
import CitaForm from './components/AgregarCita';

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Inicio />} />
                <Route path="/agregar-cita" element={<CitaForm />} />
            </Routes>
        </Router>
    );
}

export default App;
