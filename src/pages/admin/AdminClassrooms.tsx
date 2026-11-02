import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import {
  Building,
  Plus,
  DoorOpen,
  CheckCircle2,
  Wrench,
  Search,
  Filter,
  Users
} from 'lucide-react';
import { ClassroomRoom } from '../../types';

export const AdminClassrooms: React.FC = () => {
  const { rooms, addToast } = useApp();
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('ALL');

  // Modal for new room
  const [newRoomModalOpen, setNewRoomModalOpen] = useState(false);
  const [building, setBuilding] = useState('Building C (Tech Block)');
  const [floor, setFloor] = useState('2nd Floor');
  const [roomNumber, setRoomNumber] = useState('');
  const [roomType, setRoomType] = useState<'Lecture Hall' | 'Computer Lab' | 'Tutorial Room' | 'Auditorium' | 'Seminar Hall'>('Lecture Hall');
  const [capacity, setCapacity] = useState(60);
  const [equipmentText, setEquipmentText] = useState('Smart Board, Projector, AC');

  const filteredRooms = rooms.filter((r) => {
    if (statusFilter !== 'ALL' && r.status !== statusFilter) return false;
    if (
      searchTerm &&
      !r.roomNumber.toLowerCase().includes(searchTerm.toLowerCase()) &&
      !r.building.toLowerCase().includes(searchTerm.toLowerCase())
    ) {
      return false;
    }
    return true;
  });

  const handleCreateRoom = (e: React.FormEvent) => {
    e.preventDefault();
    addToast({
      type: 'success',
      title: 'Classroom Registered',
      message: `Room ${roomNumber} (${roomType}, Cap: ${capacity}) added to campus inventory.`
    });
    setNewRoomModalOpen(false);
    setRoomNumber('');
  };

  return (
    <div className="space-y-6 pb-12">
      {/* ADD ROOM MODAL */}
      {newRoomModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-xs animate-in fade-in">
          <div className="bg-white rounded-2xl shadow-2xl border border-slate-200 w-full max-w-lg overflow-hidden">
            <div className="p-5 border-b border-slate-100 flex items-center justify-between bg-indigo-50/50">
              <h3 className="font-bold text-slate-900 text-base">Register Campus Classroom</h3>
              <button onClick={() => setNewRoomModalOpen(false)} className="text-slate-400 hover:text-slate-600">✕</button>
            </div>
            <form onSubmit={handleCreateRoom} className="p-6 space-y-4">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-1">Building</label>
                  <input
                    type="text"
                    required
                    value={building}
                    onChange={(e) => setBuilding(e.target.value)}
                    className="w-full text-sm rounded-xl border border-slate-200 px-3.5 py-2.5 bg-slate-50"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-1">Floor</label>
                  <input
                    type="text"
                    required
                    value={floor}
                    onChange={(e) => setFloor(e.target.value)}
                    className="w-full text-sm rounded-xl border border-slate-200 px-3.5 py-2.5 bg-slate-50"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-1">Room Number / Name</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. C-301 or Lab 3"
                    value={roomNumber}
                    onChange={(e) => setRoomNumber(e.target.value)}
                    className="w-full text-sm rounded-xl border border-slate-200 px-3.5 py-2.5 bg-slate-50"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-1">Room Type</label>
                  <select
                    value={roomType}
                    onChange={(e) => setRoomType(e.target.value as any)}
                    className="w-full text-sm rounded-xl border border-slate-200 px-3 py-2.5 bg-slate-50"
                  >
                    <option value="Lecture Hall">Lecture Hall</option>
                    <option value="Computer Lab">Computer Lab</option>
                    <option value="Tutorial Room">Tutorial Room</option>
                    <option value="Auditorium">Auditorium</option>
                    <option value="Seminar Hall">Seminar Hall</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-1">Seating Capacity</label>
                  <input
                    type="number"
                    required
                    value={capacity}
                    onChange={(e) => setCapacity(Number(e.target.value))}
                    className="w-full text-sm rounded-xl border border-slate-200 px-3.5 py-2.5 bg-slate-50"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-1">Equipment Installed</label>
                  <input
                    type="text"
                    value={equipmentText}
                    onChange={(e) => setEquipmentText(e.target.value)}
                    placeholder="Smart Board, AC, Projector"
                    className="w-full text-sm rounded-xl border border-slate-200 px-3.5 py-2.5 bg-slate-50"
                  />
                </div>
              </div>

              <div className="flex justify-end gap-3 pt-3 border-t">
                <button type="button" onClick={() => setNewRoomModalOpen(false)} className="px-4 py-2 text-xs font-semibold text-slate-600">Cancel</button>
                <button type="submit" className="px-5 py-2 text-xs font-bold text-white bg-indigo-600 hover:bg-indigo-700 rounded-xl shadow">Save Room</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* HEADER */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 bg-white p-6 rounded-2xl border border-slate-200/80 shadow-xs">
        <div>
          <div className="flex items-center gap-2 text-indigo-600 text-xs font-bold uppercase tracking-wider mb-1">
            <Building className="w-4 h-4" />
            <span>Campus Infrastructure Inventory</span>
          </div>
          <h1 className="text-xl sm:text-2xl font-black text-slate-900">
            Classrooms, Auditoriums &amp; Labs
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
            Monitor real-time occupancy, seating capacity, maintenance status, and AV hardware.
          </p>
        </div>

        <button
          onClick={() => setNewRoomModalOpen(true)}
          className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl text-xs font-bold shadow-md shadow-indigo-500/20 flex items-center gap-2"
        >
          <Plus className="w-4 h-4" />
          <span>+ Add Classroom</span>
        </button>
      </div>

      {/* FILTERS */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div className="relative flex-1 max-w-sm">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search room or building..."
            className="w-full text-xs rounded-xl border border-slate-200 pl-9 pr-3 py-2.5 bg-white focus:outline-hidden focus:ring-2 focus:ring-indigo-500"
          />
        </div>

        <div className="flex items-center bg-slate-100 p-1 rounded-xl">
          {['ALL', 'available', 'occupied', 'maintenance'].map((st) => (
            <button
              key={st}
              onClick={() => setStatusFilter(st)}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold capitalize transition-all ${
                statusFilter === st ? 'bg-white text-indigo-700 shadow-xs' : 'text-slate-600'
              }`}
            >
              {st}
            </button>
          ))}
        </div>
      </div>

      {/* ROOMS GRID */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {filteredRooms.map((r) => {
          const isOccupied = r.status === 'occupied';
          const isMaintenance = r.status === 'maintenance';
          return (
            <div
              key={r.id}
              className="bg-white rounded-2xl border border-slate-200/80 p-5 shadow-xs hover:shadow-md transition-all flex flex-col justify-between space-y-4"
            >
              <div>
                <div className="flex items-center justify-between gap-2 mb-2">
                  <span className="text-sm font-black text-slate-900">
                    Room {r.roomNumber}
                  </span>
                  <span
                    className={`text-[10px] font-black uppercase px-2 py-0.5 rounded-full ${
                      isOccupied
                        ? 'bg-blue-100 text-blue-800'
                        : isMaintenance
                        ? 'bg-amber-100 text-amber-900'
                        : 'bg-emerald-100 text-emerald-800'
                    }`}
                  >
                    {r.status}
                  </span>
                </div>

                <div className="text-xs text-slate-500 space-y-1">
                  <div>{r.building} • {r.floor}</div>
                  <div className="font-semibold text-slate-700">{r.roomType} • Capacity: {r.capacity} Seats</div>
                </div>

                <div className="mt-3 pt-3 border-t border-slate-100">
                  <span className="text-[10px] uppercase font-bold text-slate-400 block mb-1">
                    Equipment Installed:
                  </span>
                  <div className="flex flex-wrap gap-1">
                    {r.equipment.map((eq, idx) => (
                      <span
                        key={idx}
                        className="text-[10px] font-medium bg-slate-50 text-slate-600 px-2 py-0.5 rounded border border-slate-100"
                      >
                        {eq}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
                <span className="text-slate-400">ID: {r.id}</span>
                <span className="font-bold text-indigo-600">Configured ✓</span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
