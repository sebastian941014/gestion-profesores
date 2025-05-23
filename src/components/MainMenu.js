import React from 'react';

const MainMenu = ({ activeModule, setActiveModule }) => {
  const modules = [
    { id: 'files', name: 'Archivos' },
    { id: 'schedule', name: 'Horarios' },
    { id: 'notes', name: 'Anotaciones' }
  ];

  if (activeModule === 'login') return null;

  return (
    <div className="bg-white shadow-md">
      <div className="container mx-auto px-4">
        <div className="flex space-x-1">
          {modules.map((module) => (
            <button
              key={module.id}
              onClick={() => setActiveModule(module.id)}
              className={`px-4 py-2 font-medium text-sm rounded-t-lg ${activeModule === module.id ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`}
            >
              {module.name}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MainMenu;