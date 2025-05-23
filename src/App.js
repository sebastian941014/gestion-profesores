import React, { useState, useEffect } from 'react';
import users from './mock/users';
import initialFiles from './mock/files';
import subjects from './mock/subjects';
import initialSchedule from './mock/schedule';
import initialNotes from './mock/disciplinaryNotes';
import AuthLoginForm from './components/AuthLoginForm';
import NavBar from './components/NavBar';
import MainMenu from './components/MainMenu';
import FileManager from './components/FileManager';
import ScheduleManager from './components/ScheduleManager';
import DisciplinaryNotesManager from './components/DisciplinaryNotesManager';

const App = () => {
  const [currentUser, setCurrentUser] = useState(null);
  const [activeModule, setActiveModule] = useState('login');
  const [files, setFiles] = useState(initialFiles);
  const [schedule, setSchedule] = useState(initialSchedule);
  const [disciplinaryNotes, setDisciplinaryNotes] = useState(initialNotes);

  useEffect(() => {
    const savedUser = JSON.parse(localStorage.getItem('currentUser'));
    if (savedUser) {
      setCurrentUser(savedUser);
      setActiveModule('files');
    }
  }, []);

  const handleLogin = (credentials) => {
    const user = users.find(
      (u) =>
        u.username === credentials.username &&
        (!credentials.password || u.password === credentials.password)
    );

    if (user) {
      setCurrentUser(user);
      setActiveModule('files');
      localStorage.setItem('currentUser', JSON.stringify(user));
    } else {
      alert('Usuario o contraseña incorrectos');
    }
  };

  const handleLogout = () => {
    setCurrentUser(null);
    setActiveModule('login');
    localStorage.removeItem('currentUser');
  };

  if (activeModule === 'login') {
    return <AuthLoginForm onLogin={handleLogin} />;
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <NavBar currentUser={currentUser} onLogout={handleLogout} />
      <MainMenu activeModule={activeModule} setActiveModule={setActiveModule} />
      
      <div className="container mx-auto p-4">
        {activeModule === 'files' && (
          <FileManager
            files={files}
            setFiles={setFiles}
            currentUser={currentUser}
            subjects={subjects}
          />
        )}

        {activeModule === 'schedule' && (
          <ScheduleManager
            schedule={schedule}
            setSchedule={setSchedule}
            currentUser={currentUser}
            subjects={subjects}
          />
        )}

        {activeModule === 'notes' && (
          <DisciplinaryNotesManager
            notes={disciplinaryNotes}
            setNotes={setDisciplinaryNotes}
            currentUser={currentUser}
            subjects={subjects}
          />
        )}
      </div>
    </div>
  );
};

export default App;