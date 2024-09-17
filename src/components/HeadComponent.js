import React from 'react';
import '../Inicio.css';

const Header = () => (
    <header className="header">
        <nav className="navbar">
            <h2 className="logo">El Mapache Bigotón</h2>
            <ul className="nav-links">
                <li><a href="/lista-citas">Citas</a></li>
                <li><a href="/">Inicio</a></li>
            </ul>
        </nav>
    </header>
);

export default Header;
