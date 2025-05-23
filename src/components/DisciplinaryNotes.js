import React, { useState } from 'react';

const DisciplinaryNotes = ({ notes, subjects, currentUser, onAdd, onDelete }) => {
  const [newNote, setNewNote] = useState({
    student: '',
    subject: '',
    description: '',
    category: 'leve',
    dateTime: new Date().toISOString().slice(0, 16),
    evidence: null
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

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters({ ...filters, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onAdd({
      ...newNote,
      registeredBy: currentUser.username
    });
    setNewNote({
      student: '',
      subject: '',
      description: '',
      category: 'leve',
      dateTime: new Date().toISOString().slice(0, 16),
      evidence: null
    });
  };

  const filteredNotes = notes.filter(note => {
    return (
      (filters.student === '' || note.student.includes(filters.student)) &&
      (filters.subject === '' || note.subject === filters.subject) &&
      (filters.date === '' || note.dateTime.includes(filters.date)) &&
      (filters.category === '' || note.category === filters.category)
    );
  });

  return (
    <div className="bg-white p-6 rounded-lg shadow-lg">
      <h3 className="text-2xl font-bold text-gray-800 mb-6">Anotaciones Disciplinarias</h3>
      
      <form onSubmit={handleSubmit} className="mb-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          <div>
            <label className="block text-gray-700 mb-2">Estudiante</label>
            <input
              type="text"
              name="student"
              value={newNote.student}
              onChange={handleInputChange}
              className="w-full px-4 py-2 border rounded-lg"
              required
            />
          </div>
          <div>
            <label className="block text-gray-700 mb-2">Materia</label>
            <select
              name="subject"
              value={newNote.subject}
              onChange={handleInputChange}
              className="w-full px-4 py-2 border rounded-lg"
              required
            >
              <option value="">Seleccionar</option>
              {subjects.map((subject) => (
                <option key={subject} value={subject}>{subject}</option>
              ))}
            </select>
          </div>
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 mb-2">Descripción</label>
          <textarea
            name="description"
            value={newNote.description}
            onChange={handleInputChange}
            className="w-full px-4 py-2 border rounded-lg"
            rows="3"
            required
          ></textarea>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
          <div>
            <label className="block text-gray-700 mb-2">Categoría</label>
            <select
              name="category"
              value={newNote.category}
              onChange={handleInputChange}
              className="w-full px-4 py-2 border rounded-lg"
              required
            >
              <option value="leve">Leve</option>
              <option value="grave">Grave</option>
              <option value="muy grave">Muy Grave</option>
            </select>
          </div>
          <div>
            <label className="block text-gray-700 mb-2">Fecha y Hora</label>
            <input
              type="datetime-local"
              name="dateTime"
              value={newNote.dateTime}
              onChange={handleInputChange}
              className="w-full px-4 py-2 border rounded-lg"
              required
            />
          </div>
          <div>
            <label className="block text-gray-700 mb-2">Evidencia (Opcional)</label>
            <input
              type="file"
              name="evidence"
              onChange={(e) => setNewNote({...newNote, evidence: e.target.files[0]})}
              className="w-full px-4 py-2 border rounded-lg"
              accept="image/*,.pdf"
            />
          </div>
        </div>
        <button
          type="submit"
          className="bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors"
        >
          Registrar Anotación
        </button>
      </form>

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
              className="w-full px-4 py-2 border rounded-lg"
            />
          </div>
          <div>
            <label className="block text-gray-700 mb-2">Materia</label>
            <select
              name="subject"
              value={filters.subject}
              onChange={handleFilterChange}
              className="w-full px-4 py-2 border rounded-lg"
            >
              <option value="">Todas</option>
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
              className="w-full px-4 py-2 border rounded-lg"
            />
          </div>
          <div>
            <label className="block text-gray-700 mb-2">Categoría</label>
            <select
              name="category"
              value={filters.category}
              onChange={handleFilterChange}
              className="w-full px-4 py-2 border rounded-lg"
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
        {filteredNotes.map((note) => (
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
              <div>
                <h4 className="font-bold">{note.student}</h4>
                <p className="text-gray-600 mt-1">{note.description}</p>
                <div className="text-sm text-gray-500 mt-2">
                  <span className="mr-3">{note.subject}</span>
                  <span className="mr-3">{new Date(note.dateTime).toLocaleString()}</span>
                  <span className="mr-3 capitalize">{note.category}</span>
                  <span>Registrado por: {note.registeredBy}</span>
                </div>
                {note.evidence && (
                  <div className="mt-2">
                    <span className="text-sm font-medium">Evidencia:</span>
                    <a 
                      href={URL.createObjectURL(note.evidence)} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-blue-600 text-sm ml-2"
                    >
                      Ver archivo adjunto
                    </a>
                  </div>
                )}
              </div>
              {(currentUser.username === note.registeredBy || currentUser.role === 'admin') && (
                <button
                  onClick={() => onDelete(note.id)}
                  className="text-red-600 hover:text-red-800"
                >
                  Eliminar
                </button>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DisciplinaryNotes;

// DONE