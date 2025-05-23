import React from 'react';
import FileUploadForm from './FileUploadForm';
import FileList from './FileList';

const FileManager = ({ files, setFiles, currentUser, subjects }) => {
  const handleFileUpload = (newFile) => {
    const fileToAdd = {
      id: files.length + 1,
      ...newFile,
      fileUrl: URL.createObjectURL(newFile.file),
      uploadDate: new Date().toISOString()
    };
    setFiles([...files, fileToAdd]);
  };

  const handleFileDelete = (fileId) => {
    setFiles(files.filter((file) => file.id !== fileId));
  };

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-gray-800">Gestor de Archivos</h2>
      <FileUploadForm
        onSubmit={handleFileUpload}
        subjects={currentUser.role === 'admin' ? subjects : currentUser.subjects}
        currentUser={currentUser}
      />
      <FileList
        files={files}
        onDelete={handleFileDelete}
        currentUser={currentUser}
      />
    </div>
  );
};

export default FileManager;