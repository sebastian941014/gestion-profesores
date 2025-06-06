import React, { useState, useEffect } from 'react';

const ScheduleManager = ({ schedule, setSchedule, currentUser, subjects }) => {
  const [newSchedule, setNewSchedule] = useState({
    subject: '',
    day: 'Lunes',
    startTime: '08:00',
    endTime: '09:00'
  });

  const [timeSlots, setTimeSlots] = useState([]);
  const days = ['Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado'];

  useEffect(() => {
    const slots = [];
    for (let hour = 7; hour < 20; hour++) {
      slots.push(`${hour.toString().padStart(2, '0')}:00`);
      slots.push(`${hour.toString().padStart(2, '0')}:30`);
    }
    setTimeSlots(slots);
  }, []);

  // 🔧 FUNCIONES FALTANTES:
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewSchedule(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const duplicado = schedule.some(
      item =>
        item.subject === newSchedule.subject &&
        item.day === newSchedule.day &&
        item.startTime === newSchedule.startTime
    );

    if (duplicado) {
      alert("Este horario ya existe");
      return;
    }

    setSchedule(prev => [
      ...prev,
      { ...newSchedule, teacher: currentUser?.name || "Docente" }
    ]);

    setNewSchedule({
      subject: '',
      day: 'Lunes',
      startTime: '08:00',
      endTime: '09:00'
    });
  };

  const findClassAtTime = (day, time) => {
    return schedule.find(item => item.day === day && item.startTime === time);
  };

  const calculateRowSpan = (day, time, classItem) => {
    if (!classItem || classItem.startTime !== time) return 0;

    const [startH, startM] = classItem.startTime.split(':').map(Number);
    const [endH, endM] = classItem.endTime.split(':').map(Number);
    const duration = (endH * 60 + endM - (startH * 60 + startM)) / 30;

    return duration;
  };

  return (
    <div className="space-y-8">
      <h2 className="text-2xl font-bold text-gray-800">Gestor de Horarios</h2>

      {/* Formulario para agregar horarios */}
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h3 className="text-xl font-semibold mb-4">Agregar Nuevo Horario</h3>
        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4">
            <div>
              <label className="block text-gray-700 mb-2">Materia</label>
              <select
                name="subject"
                value={newSchedule.subject}
                onChange={handleInputChange}
                className="w-full px-4 py-2 border rounded-lg"
                required
              >
                <option value="">Seleccionar materia</option>
                {subjects.map((subject) => (
                  <option key={subject} value={subject}>{subject}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-gray-700 mb-2">Día</label>
              <select
                name="day"
                value={newSchedule.day}
                onChange={handleInputChange}
                className="w-full px-4 py-2 border rounded-lg"
                required
              >
                {days.map((day) => (
                  <option key={day} value={day}>{day}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-gray-700 mb-2">Hora Inicio</label>
              <select
                name="startTime"
                value={newSchedule.startTime}
                onChange={handleInputChange}
                className="w-full px-4 py-2 border rounded-lg"
              >
                {timeSlots.map((time) => (
                  <option key={time} value={time}>{time}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-gray-700 mb-2">Hora Fin</label>
              <select
                name="endTime"
                value={newSchedule.endTime}
                onChange={handleInputChange}
                className="w-full px-4 py-2 border rounded-lg"
              >
                {timeSlots.map((time) => (
                  <option key={time} value={time}>{time}</option>
                ))}
              </select>
            </div>
          </div>
          <button
            type="submit"
            className="bg-blue-600 text-white py-2 px-6 rounded-lg hover:bg-blue-700 transition-colors"
          >
            Agregar Horario
          </button>
        </form>
      </div>

      {/* Visualización del horario semanal */}
      <div className="bg-white p-6 rounded-lg shadow-md overflow-x-auto">
        <h3 className="text-xl font-semibold mb-4">Horario Semanal</h3>
        <table className="w-full border-collapse">
          <thead>
            <tr className="bg-gray-100">
              <th className="p-3 text-left border-b border-r min-w-[100px]">Hora</th>
              {days.map(day => (
                <th key={day} className="p-3 text-center border-b border-r min-w-[150px]">{day}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {timeSlots.map((time, timeIndex) => {
              const isNewClass = days.some(day => {
                const classItem = findClassAtTime(day, time);
                return classItem && classItem.startTime === time;
              });

              if (!isNewClass && timeIndex > 0) return null;

              return (
                <tr key={time}>
                  <td className="p-2 border-b border-r font-medium bg-gray-50">{time}</td>
                  {days.map(day => {
                    const classItem = findClassAtTime(day, time);
                    const rowSpan = calculateRowSpan(day, time, classItem);

                    if (rowSpan === 0) return null;

                    return (
                      <td
                        key={`${day}-${time}`}
                        className="p-0 border-b border-r"
                        rowSpan={rowSpan}
                      >
                        {classItem && (
                          <div className="bg-blue-50 p-2 h-full flex flex-col justify-center border border-blue-100 rounded m-1">
                            <div className="font-medium text-blue-800">{classItem.subject}</div>
                            <div className="text-xs text-blue-600">{classItem.teacher}</div>
                            <div className="text-xs text-gray-500">
                              {classItem.startTime} - {classItem.endTime}
                            </div>
                          </div>
                        )}
                      </td>
                    );
                  })}
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ScheduleManager;
