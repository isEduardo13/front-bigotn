import React from 'react';
import Header from './HeadComponent';  // Importa el Header reutilizable
import Footer from './FootComponent';  // Importa el Footer reutilizable
import '../Inicio.css';  // Mantén el CSS vinculado

const Inicio = () => (
  <>
    <Header /> {/* Añadir el Header reutilizable */}
    <div className='inicio'>
      <main>
        <h1>Bienvenido a El Mapache Bigotón</h1>
        <p>Porque tú mereces lo mejor</p>
      </main>
    </div>
    <Footer /> {/* Añadir el Footer reutilizable */}
  </>
);

export default Inicio;
