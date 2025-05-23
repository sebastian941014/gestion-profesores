import React, { useState } from 'react';

const DisciplinaryNotesManager = ({ notes, setNotes, currentUser, subjects }) => {
  const [newNote, setNewNote] = useState({
    student: '',
    subject: '',
    description: '',
    category: 'leve',
    dateTime: new Date().toISOString().slice(0, 16),
    evidence: null,
    evidencePreview: null
  });

  const [filters, setFilters] = useState({
    student: '',
    subject: '',
    date: '',
    category: ''
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewNote({ ...newNote, [name]: value });
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setNewNote({
        ...newNote,
        evidence: file,
        evidencePreview: URL.createObjectURL(file)
      });
    }
  };

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters({ ...filters, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!newNote.student || !newNote.subject || !newNote.description) {
      alert('Por favor complete todos los campos obligatorios');
      return;
    }

    const noteToAdd = {
      id: notes.length + 1,
      student: newNote.student,
      subject: newNote.subject,
      description: newNote.description,
      category: newNote.category,
      dateTime: new Date(newNote.dateTime).toISOString(),
      registeredBy: currentUser.username,
      evidence: newNote.evidence ? {
        name: newNote.evidence.name,
        type: newNote.evidence.type,
        preview: newNote.evidencePreview
      } : null
    };

    setNotes([...notes, noteToAdd]);
    
    // Reset form
    setNewNote({
      student: '',
      subject: '',
      description: '',
      category: 'leve',
      dateTime: new Date().toISOString().slice(0, 16),
      evidence: null,
      evidencePreview: null
    });

    // Mostrar alerta para anotaciones graves
    if (newNote.category === 'grave' || newNote.category === 'muy grave') {
      alert(`¡Anotación ${newNote.category} registrada! Se notificará al administrador.`);
    }
  };

  const handleDelete = (id) => {
    if (window.confirm('¿Está seguro de eliminar esta anotación?')) {
      setNotes(notes.filter(note => note.id !== id));
    }
  };

  const filteredNotes = notes.filter(note => {
    return (
      (filters.student === '' || note.student.toLowerCase().includes(filters.student.toLowerCase())) &&
      (filters.subject === '' || note.subject === filters.subject) &&
      (filters.date === '' || new Date(note.dateTime).toLocaleDateString() === new Date(filters.date).toLocaleDateString()) &&
      (filters.category === '' || note.category === filters.category)
    );
  });

  return (
    <div className="space-y-8">
      <h2 className="text-2xl font-bold text-gray-800">Anotaciones Disciplinarias</h2>
      
      {/* Formulario de registro */}
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h3 className="text-xl font-semibold mb-4">Registrar Nueva Anotación</h3>
        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div>
              <label className="block text-gray-700 mb-2">Estudiante <span className="text-red-500">*</span></label>
              <input
                type="text"
                name="student"
                value={newNote.student}
                onChange={handleInputChange}
                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                required
              />
            </div>
            <div>
              <label className="block text-gray-700 mb-2">Materia <span className="text-red-500">*</span></label>
              <select
                name="subject"
                value={newNote.subject}
                onChange={handleInputChange}
                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                required
              >
                <option value="">Seleccionar materia</option>
                {subjects.map((subject) => (
                  <option key={subject} value={subject}>{subject}</option>
                ))}
              </select>
            </div>
          </div>
          
          <div className="mb-4">
            <label className="block text-gray-700 mb-2">Descripción <span className="text-red-500">*</span></label>
            <textarea
              name="description"
              value={newNote.description}
              onChange={handleInputChange}
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              rows="3"
              required
            ></textarea>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
            <div>
              <label className="block text-gray-700 mb-2">Categoría <span className="text-red-500">*</span></label>
              <select
                name="category"
                value={newNote.category}
                onChange={handleInputChange}
                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                required
              >
                <option value="leve">Leve</option>
                <option value="grave">Grave</option>
                <option value="muy grave">Muy Grave</option>
              </select>
            </div>
            <div>
              <label className="block text-gray-700 mb-2">Fecha y Hora <span className="text-red-500">*</span></label>
              <input
                type="datetime-local"
                name="dateTime"
                value={newNote.dateTime}
                onChange={handleInputChange}
                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                required
              />
            </div>
            <div>
              <label className="block text-gray-700 mb-2">Evidencia (Opcional)</label>
              <input
                type="file"
                onChange={handleFileChange}
                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                accept="image/*,.pdf"
              />
              {newNote.evidencePreview && (
                <div className="mt-2">
                  <span className="text-sm text-gray-500">Vista previa:</span>
                  {newNote.evidence.type.startsWith('image/') ? (
                    <img src={newNote.evidencePreview} alt="Preview" className="h-16 mt-1 rounded border" />
                  ) : (
                    <div className="text-sm text-blue-600 mt-1">Documento listo para subir</div>
                  )}
                </div>
              )}
            </div>
          </div>
          
          <button
            type="submit"
            className="bg-blue-600 text-white py-2 px-6 rounded-lg hover:bg-blue-700 transition-colors"
          >
            Registrar Anotación
          </button>
        </form>
      </div>

      {/* Filtros y listado */}
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h3 className="text-xl font-semibold mb-4">Listado de Anotaciones</h3>
        
        <div className="mb-6">
          <h4 className="text-lg font-medium mb-2">Filtrar Anotaciones</h4>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div>
              <label className="block text-gray-700 mb-2">Estudiante</label>
              <input
                type="text"
                name="student"
                value={filters.student}
                onChange={handleFilterChange}
                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="Buscar estudiante"
              />
            </div>
            <div>
              <label className="block text-gray-700 mb-2">Materia</label>
              <select
                name="subject"
                value={filters.subject}
                onChange={handleFilterChange}
                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="">Todas las materias</option>
                {subjects.map((subject) => (
                  <option key={subject} value={subject}>{subject}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-gray-700 mb-2">Fecha</label>
              <input
                type="date"
                name="date"
                value={filters.date}
                onChange={handleFilterChange}
                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
            <div>
              <label className="block text-gray-700 mb-2">Categoría</label>
              <select
                name="category"
                value={filters.category}
                onChange={handleFilterChange}
                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="">Todas</option>
                <option value="leve">Leve</option>
                <option value="grave">Grave</option>
                <option value="muy grave">Muy Grave</option>
              </select>
            </div>
          </div>
        </div>

        <div className="space-y-4">
          {filteredNotes.length === 0 ? (
            <p className="text-gray-500 text-center py-4">No se encontraron anotaciones</p>
          ) : (
            filteredNotes.map((note) => (
              <div 
                key={note.id} 
                className={`
                  p-4 rounded-lg border-l-4
                  ${note.category === 'leve' ? 'border-yellow-300 bg-yellow-50' : 
                    note.category === 'grave' ? 'border-orange-400 bg-orange-50' : 
                    'border-red-500 bg-red-50'}
                `}
              >
                <div className="flex justify-between items-start">
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <h4 className="font-bold text-lg">{note.student}</h4>
                      <span className="text-sm font-medium px-2 py-1 rounded capitalize">
                        {note.category}
                      </span>
                    </div>
                    <p className="text-gray-600 mt-1">{note.description}</p>
                    <div className="text-sm text-gray-500 mt-2">
                      <span className="mr-3"><strong>Materia:</strong> {note.subject}</span>
                      <span className="mr-3"><strong>Fecha:</strong> {new Date(note.dateTime).toLocaleString()}</span>
                      <span><strong>Registrado por:</strong> {note.registeredBy}</span>
                    </div>
                    {note.evidence && (
                      <div className="mt-3">
                        <span className="text-sm font-medium">Evidencia adjunta:</span>
                        {note.evidence.type.startsWith('image/') ? (
                          <div className="mt-1">
                            <img 
                              src={note.evidence.preview} 
                              alt="Evidencia" 
                              className="h-24 rounded border cursor-pointer"
                              onClick={() => window.open(note.evidence.preview, '_blank')}
                            />
                          </div>
                        ) : (
                          <a 
                            href={note.evidence.preview} 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="text-blue-600 text-sm ml-2"
                          >
                            Ver documento adjunto
                          </a>
                        )}
                      </div>
                    )}
                  </div>
                  {(currentUser.username === note.registeredBy || currentUser.role === 'admin') && (
                    <button
                      onClick={() => handleDelete(note.id)}
                      className="text-red-600 hover:text-red-800 ml-4"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
                      </svg>
                    </button>
                  )}
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default DisciplinaryNotesManager;

// DONE