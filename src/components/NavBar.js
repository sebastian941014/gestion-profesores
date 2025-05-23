import React from 'react';

const NavBar = ({ currentUser, onLogout }) => {
  return (
    <nav className="bg-blue-700 text-white p-4 shadow-lg">
      <div className="container mx-auto flex justify-between items-center">
        <h1 className="text-xl font-bold">Gestor Escolar Digital</h1>
        <div className="flex items-center gap-4">
          <span className="text-sm">Bienvenido, {currentUser.username}</span>
          <button
            onClick={onLogout}
            className="bg-white text-blue-700 px-4 py-1 rounded hover:bg-gray-100"
          >
            Cerrar sesión
          </button>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;