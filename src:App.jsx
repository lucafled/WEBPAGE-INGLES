import React, { useState } from 'react'
import { Calendar, User, Video, Plus, Trash2, ArrowRight, ShieldCheck, LogOut, BookOpen } from 'lucide-react'

export default function App() {
  const [currentView, setCurrentView] = useState('landing')
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [userRole, setUserRole] = useState(null)

  const [availableSlots, setAvailableSlots] = useState([
    { id: '1', date: 'Lunes, 12 Oct', time: '10:00 AM - 11:00 AM', status: 'disponible' },
    { id: '2', date: 'Lunes, 12 Oct', time: '04:00 PM - 05:00 PM', status: 'disponible' },
    { id: '3', date: 'Miércoles, 14 Oct', time: '11:30 AM - 12:30 PM', status: 'disponible' },
  ])

  const [students, setStudents] = useState([
    { id: '101', username: 'maria_g', name: 'María García', modality: 'online' },
    { id: '102', username: 'carlos_r', name: 'Carlos Rodríguez', modality: 'presencial' },
  ])

  const [newUsername, setNewUsername] = useState('')
  const [newName, setNewName] = useState('')
  const [newModality, setNewModality] = useState('online')

  const handleLogin = (role) => {
    setUserRole(role)
    setIsLoggedIn(true)
    setCurrentView(role)
  }

  const handleLogout = () => {
    setIsLoggedIn(false)
    setUserRole(null)
    setCurrentView('landing')
  }

  const handleAddSlot = () => {
    const newSlot = {
      id: Date.now().toString(),
      date: 'Viernes, 16 Oct',
      time: '05:00 PM - 06:00 PM',
      status: 'disponible'
    }
    setAvailableSlots([...availableSlots, newSlot])
  }

  const handleDeleteSlot = (id) => {
    setAvailableSlots(availableSlots.filter(s => s.id !== id))
  }

  const handleCreateStudent = (e) => {
    e.preventDefault()
    if (!newUsername || !newName) return
    setStudents([...students, { id: Date.now().toString(), username: newUsername, name: newName, modality: newModality }])
    setNewUsername('')
    setNewName('')
  }

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col font-sans">
      <header className="bg-white border-b border-slate-200 sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-4 py-4 flex flex-wrap justify-between items-center gap-4">
          <div className="flex items-center gap-3 cursor-pointer" onClick={() => setCurrentView('landing')}>
            <div className="bg-blue-600 text-white p-2.5 rounded-2xl shadow-md">
              <BookOpen className="w-7 h-7" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-slate-900 tracking-tight">English Academy</h1>
              <p className="text-xs text-slate-500 font-medium">Clases Accesibles</p>
            </div>
          </div>

          <div className="flex items-center gap-2 bg-slate-100 p-1.5 rounded-xl border border-slate-200 text-sm">
            <button
              onClick={() => setCurrentView('landing')}
              className={`px-4 py-2 rounded-lg font-semibold transition ${currentView === 'landing' ? 'bg-white text-blue-600 shadow-sm' : 'text-slate-600'}`}
            >
              Vista Pública
            </button>
            <button
              onClick={() => handleLogin('student')}
              className={`px-4 py-2 rounded-lg font-semibold transition ${currentView === 'student' ? 'bg-white text-blue-600 shadow-sm' : 'text-slate-600'}`}
            >
              Portal Alumno
            </button>
            <button
              onClick={() => handleLogin('admin')}
              className={`px-4 py-2 rounded-lg font-semibold transition ${currentView === 'admin' ? 'bg-white text-blue-600 shadow-sm' : 'text-slate-600'}`}
            >
              Panel Admin
            </button>
          </div>

          {isLoggedIn && (
            <button onClick={handleLogout} className="flex items-center gap-2 text-sm font-semibold text-rose-600 hover:bg-rose-50 px-3 py-2 rounded-lg">
              <LogOut className="w-4 h-4" /> Salir
            </button>
          )}
        </div>
      </header>

      <main className="flex-1 max-w-6xl w-full mx-auto p-4 md:p-6">
        {currentView === 'landing' && (
          <div className="space-y-12 py-4">
            <section className="bg-gradient-to-br from-blue-700 via-blue-600 to-indigo-700 rounded-3xl p-8 md:p-12 text-white shadow-xl">
              <div className="max-w-2xl space-y-6">
                <span className="bg-blue-500/30 text-blue-100 text-sm font-semibold px-4 py-1.5 rounded-full border border-blue-400/30">
                  Clases 100% Personalizadas
                </span>
                <h2 className="text-3xl md:text-5xl font-extrabold leading-tight">Habla Inglés con Confianza</h2>
                <p className="text-lg md:text-xl text-blue-100">Diseñado para niños, jóvenes y adultos mayores.</p>
                <button onClick={() => handleLogin('student')} className="bg-white text-blue-700 hover:bg-blue-50 font-bold px-8 py-4 rounded-2xl shadow-lg flex items-center gap-2 text-lg">
                  Ingresar como Alumno <ArrowRight className="w-5 h-5" />
                </button>
              </div>
            </section>

            <section className="bg-white rounded-3xl p-6 md:p-8 border border-slate-200 shadow-sm space-y-6">
              <div className="flex flex-col md:flex-row justify-between gap-4 border-b pb-6">
                <div>
                  <h3 className="text-2xl font-bold text-slate-900 flex items-center gap-3">
                    <Calendar className="w-7 h-7 text-blue-600" />
                    Horarios Disponibles (Solo Lectura)
                  </h3>
                </div>
              </div>

              <div className="grid md:grid-cols-3 gap-4">
                {availableSlots.map((slot) => (
                  <div key={slot.id} className="p-5 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
                    <div className="text-sm font-bold text-blue-600">{slot.date}</div>
                    <div className="text-lg font-bold text-slate-800">{slot.time}</div>
                    <span className="inline-block px-3 py-1 bg-emerald-100 text-emerald-800 text-xs font-bold rounded-full">Disponible</span>
                  </div>
                ))}
              </div>
            </section>
          </div>
        )}

        {currentView === 'student' && (
          <div className="max-w-3xl mx-auto space-y-8 py-4">
            <div className="bg-white p-6 md:p-8 rounded-3xl border border-slate-200 shadow-sm flex justify-between items-center">
              <div>
                <span className="text-xs font-extrabold text-blue-600 uppercase">Bienvenido(a)</span>
                <h2 className="text-3xl font-extrabold text-slate-900 mt-1">Hola, María García 👋</h2>
              </div>
              <div className="bg-blue-50 border border-blue-200 px-4 py-3 rounded-2xl flex items-center gap-3">
                <Video className="w-6 h-6 text-blue-600" />
                <div>
                  <p className="text-xs text-blue-600 font-bold">Modalidad</p>
                  <p className="text-sm font-extrabold text-slate-800">Clase Online</p>
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-r from-blue-600 to-indigo-600 rounded-3xl p-8 text-white shadow-xl space-y-6">
              <div className="space-y-2">
                <span className="bg-white/20 text-white text-xs font-bold px-3 py-1 rounded-full uppercase">Próxima Sesión</span>
                <h3 className="text-2xl font-bold">Lunes 12 de Octubre — 10:00 AM</h3>
              </div>
              <a href="https://meet.google.com" target="_blank" rel="noreferrer" className="inline-flex items-center justify-center gap-3 bg-white text-blue-700 hover:bg-slate-100 font-extrabold px-8 py-5 rounded-2xl shadow-lg text-xl w-full text-center">
                <Video className="w-7 h-7 text-blue-600" /> Entrar a mi Clase en Google Meet
              </a>
            </div>
          </div>
        )}

        {currentView === 'admin' && (
          <div className="space-y-8 py-4">
            <div className="bg-slate-900 text-white p-6 md:p-8 rounded-3xl shadow-xl flex justify-between items-center">
              <div>
                <span className="text-xs font-bold text-blue-400 uppercase">Panel Administrador</span>
                <h2 className="text-3xl font-extrabold mt-1">Gestión de Clases y Alumnos</h2>
              </div>
              <ShieldCheck className="w-10 h-10 text-blue-400" />
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm space-y-6">
                <div className="flex justify-between items-center">
                  <h3 className="text-xl font-bold text-slate-900">Horarios Disponibles</h3>
                  <button onClick={handleAddSlot} className="bg-blue-600 hover:bg-blue-700 text-white font-bold px-4 py-2 rounded-xl text-sm flex items-center gap-1">
                    <Plus className="w-4 h-4" /> Agregar
                  </button>
                </div>
                <div className="space-y-3">
                  {availableSlots.map((slot) => (
                    <div key={slot.id} className="p-4 rounded-2xl bg-slate-50 border flex justify-between items-center">
                      <div>
                        <p className="font-bold text-slate-800">{slot.date}</p>
                        <p className="text-sm text-slate-500">{slot.time}</p>
                      </div>
                      <button onClick={() => handleDeleteSlot(slot.id)} className="text-rose-600 hover:bg-rose-50 p-2 rounded-xl">
                        <Trash2 className="w-5 h-5" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm space-y-6">
                <h3 className="text-xl font-bold text-slate-900">Registrar Alumno</h3>
                <form onSubmit={handleCreateStudent} className="space-y-4">
                  <input type="text" placeholder="Nombre completo" value={newName} onChange={(e) => setNewName(e.target.value)} className="w-full px-4 py-3 rounded-xl border" />
                  <input type="text" placeholder="Username asignado" value={newUsername} onChange={(e) => setNewUsername(e.target.value)} className="w-full px-4 py-3 rounded-xl border font-mono" />
                  <select value={newModality} onChange={(e) => setNewModality(e.target.value)} className="w-full px-4 py-3 rounded-xl border">
                    <option value="online">Online (Google Meet)</option>
                    <option value="presencial">Presencial</option>
                  </select>
                  <button type="submit" className="w-full bg-slate-900 text-white font-bold py-3 rounded-xl">Guardar Alumno</button>
                </form>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  )
}