import React, { useState } from 'react';

const FileList = ({ files, onDelete, currentUser }) => {
  const [filterSubject, setFilterSubject] = useState('');
  const [filterWeek, setFilterWeek] = useState('');

  const filteredFiles = files.filter((file) => {
    const subjectMatch = filterSubject ? file.subject === filterSubject : true;
    return subjectMatch;
  });

  const uniqueSubjects = [...new Set(files.map((file) => file.subject))];

  return (
    <div>
      <div className="flex gap-4 mb-6">
        <div className="w-1/2">
          <label className="block text-gray-700 mb-2">Filtrar por materia</label>
          <select
            value={filterSubject}
            onChange={(e) => setFilterSubject(e.target.value)}
            className="w-full px-4 py-2 border rounded-lg"
          >
            <option value="">Todas las materias</option>
            {uniqueSubjects.map((subject) => (
              <option key={subject} value={subject}>
                {subject}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="grid gap-4">
        {filteredFiles.map((file) => (
          <div key={file.id} className="bg-white p-4 rounded-lg shadow">
            <div className="flex justify-between items-start">
              <div>
                <h3 className="font-bold text-lg">{file.fileName}</h3>
                <p className="text-gray-600">{file.description}</p>
                <div className="mt-2 text-sm text-gray-500">
                  <span className="mr-4">Materia: {file.subject}</span>
                  <span>Subido por: {file.uploadedBy}</span>
                </div>
              </div>
              <div className="flex gap-2">
                <a
                  href={file.fileUrl}
                  download
                  className="bg-blue-100 text-blue-600 px-3 py-1 rounded hover:bg-blue-200"
                >
                  Descargar
                </a>
                {(currentUser.username === file.uploadedBy || currentUser.role === 'admin') && (
                  <button
                    onClick={() => onDelete(file.id)}
                    className="bg-red-100 text-red-600 px-3 py-1 rounded hover:bg-red-200"
                  >
                    Eliminar
                  </button>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FileList;

// DONE