import { useState, useEffect } from "react";

const MASTER_SLOTS = [
  { id: 's1', time: '9:00 AM' },
  { id: 's2', time: '10:00 AM' },
  { id: 's3', time: '11:00 AM' },
  { id: 's4', time: '1:00 PM' },
  { id: 's5', time: '2:00 PM' },
  { id: 's6', time: '3:00 PM' },
];

const NOW = new Date();
const CURRENT_YEAR = NOW.getFullYear();
const CURRENT_MONTH = NOW.getMonth();
const TODAY_DATE = NOW.getDate();
/*
const INITIAL_APPOINTMENTS = [
  { id: 'a1', date: 5, month: CURRENT_MONTH, year: CURRENT_YEAR, slotId: 's1', time: '9:00 AM', title: 'Franchise Meeting' },
  { id: 'a2', date: 12, month: CURRENT_MONTH, year: CURRENT_YEAR, slotId: 's4', time: '1:00 PM', title: 'Supply Drop' },
  { id: 'a3', date: 18, month: CURRENT_MONTH, year: CURRENT_YEAR, slotId: 's3', time: '11:00 AM', title: 'Auto Customization' },
  { id: 'a4', date: 18, month: CURRENT_MONTH, year: CURRENT_YEAR, slotId: 's6', time: '3:00 PM', title: 'Turf Strategy' },
  { id: 'a5', date: 25, month: CURRENT_MONTH, year: CURRENT_YEAR, slotId: 's2', time: '10:00 AM', title: 'Inventory Check' },
];
*/

const EVENT_COLORS = [
  { bg: '#4285F4', light: '#EAF1FF' },
  { bg: '#0F9D58', light: '#E6F4EA' },
  { bg: '#F4B400', light: '#FEF7E0' },
  { bg: '#DB4437', light: '#FCE8E6' },
  { bg: '#AB47BC', light: '#F3E5F5' },
  { bg: '#00ACC1', light: '#E0F7FA' },
];

function getEventColor(id) {
  const idx = id.charCodeAt(id.length - 1) % EVENT_COLORS.length;
  return EVENT_COLORS[idx];
}

function getCalendarCells(year, month) {
  const firstDayIndex = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const daysInPrevMonth = new Date(year, month, 0).getDate();
  const cells = [];
  for (let i = firstDayIndex - 1; i >= 0; i--)
    cells.push({ day: daysInPrevMonth - i, month: month - 1, year: month === 0 ? year - 1 : year, isCurrentMonth: false });
  for (let i = 1; i <= daysInMonth; i++)
    cells.push({ day: i, month, year, isCurrentMonth: true });
  const remaining = 42 - cells.length;
  for (let i = 1; i <= remaining; i++)
    cells.push({ day: i, month: month + 1, year: month === 11 ? year + 1 : year, isCurrentMonth: false });
  return cells;
}

// ─── LOGIN ───────────────────────────────────────────────────────────────────
function LoginPage({ onLogin }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [shake, setShake] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch('http://localhost:8080/vi/api/user/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
      });

      if (!res.ok) {
        setShake(true);
        setTimeout(() => setShake(false), 500);
        return;
      }

      const user = await res.json();
      console.log(user);
      onLogin(user);

    } catch (err) {
      setShake(true);
      setTimeout(() => setShake(false), 500);
    }
  };

  return (
    <div style={{
      position: 'fixed', inset: 0,
      background: 'linear-gradient(135deg, #f8f0ff 0%, #f0f4ff 50%, #f0fff4 100%)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      fontFamily: "'Google Sans', 'Segoe UI', sans-serif",
      padding: '16px'
    }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Google+Sans:wght@400;500;700&display=swap');
        @keyframes shake { 0%,100%{transform:translateX(0)} 20%{transform:translateX(-8px)} 40%{transform:translateX(8px)} 60%{transform:translateX(-5px)} 80%{transform:translateX(5px)} }
        @keyframes fadeInUp { from{opacity:0;transform:translateY(20px)} to{opacity:1;transform:translateY(0)} }
        .login-card { animation: fadeInUp 0.4s ease; }
        .shake { animation: shake 0.4s ease; }
        .login-input:focus { outline: none; border-color: #592683; box-shadow: 0 0 0 3px rgba(89,38,131,0.12); }
        .login-btn:hover { background: #431c63 !important; transform: translateY(-1px); box-shadow: 0 4px 16px rgba(89,38,131,0.3); }
        .login-btn { transition: all 0.2s ease; }
      `}</style>
      <div className={`login-card ${shake ? 'shake' : ''}`} style={{
        background: '#fff',
        borderRadius: '16px',
        boxShadow: '0 8px 40px rgba(0,0,0,0.12)',
        padding: '48px 40px',
        maxWidth: '400px',
        width: '100%',
        border: '1px solid rgba(89,38,131,0.1)'
      }}>
        {/* Logo */}
        <div style={{ textAlign: 'center', marginBottom: '32px' }}>
          <div style={{
            width: '56px', height: '56px', borderRadius: '14px',
            background: 'linear-gradient(135deg, #592683, #7b2fbe)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            margin: '0 auto 16px', boxShadow: '0 4px 16px rgba(89,38,131,0.3)'
          }}>
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <rect x="3" y="4" width="18" height="18" rx="2" ry="2"/>
              <line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/>
              <line x1="3" y1="10" x2="21" y2="10"/>
            </svg>
          </div>
          <h1 style={{ fontSize: '24px', fontWeight: 700, color: '#1a0a2e', margin: 0 }}>Appointment Calendar</h1>
          <p style={{ color: '#9e9e9e', marginTop: '6px', fontSize: '14px' }}>Sign in to manage your schedule</p>
        </div>

        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
          <div>
            <label style={{ display: 'block', fontSize: '13px', fontWeight: 500, color: '#5f6368', marginBottom: '6px' }}>Email</label>
            <input
              type="email" required value={email} onChange={e => setEmail(e.target.value)}
              className="login-input"
              placeholder="YourEmail@Email.com"
              style={{
                width: '100%', padding: '10px 14px', fontSize: '15px',
                border: '1px solid #dadce0', borderRadius: '8px',
                background: '#fafafa', color: '#202124', boxSizing: 'border-box',
                transition: 'border 0.2s, box-shadow 0.2s'
              }}
            />
          </div>
          <div>
            <label style={{ display: 'block', fontSize: '13px', fontWeight: 500, color: '#5f6368', marginBottom: '6px' }}>Password</label>
            <input
              type="password" required value={password} onChange={e => setPassword(e.target.value)}
              className="login-input"
              placeholder="••••••••"
              style={{
                width: '100%', padding: '10px 14px', fontSize: '15px',
                border: '1px solid #dadce0', borderRadius: '8px',
                background: '#fafafa', color: '#202124', boxSizing: 'border-box',
                transition: 'border 0.2s, box-shadow 0.2s'
              }}
            />
          </div>
          <button type="submit" className="login-btn" style={{
            marginTop: '8px', padding: '12px',
            background: '#592683', color: 'white', border: 'none',
            borderRadius: '8px', fontSize: '15px', fontWeight: 600, cursor: 'pointer'
          }}>
            Sign In
          </button>
        </form>

        <p style={{ textAlign: 'center', marginTop: '16px', fontSize: '13px', color: '#bbb' }}>

        </p>
      </div>
    </div>
  );
}

// ─── MINI CALENDAR (sidebar) ─────────────────────────────────────────────────
function MiniCalendar({ year, month, onNavigate, selectedDay }) {
  const cells = getCalendarCells(year, month);
  const monthName = new Date(year, month).toLocaleString('default', { month: 'long' });

  return (
    <div style={{ padding: '12px 8px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
        <button onClick={() => onNavigate(-1)} style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#5f6368', borderRadius: '50%', width: '28px', height: '28px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M15 18l-6-6 6-6"/></svg>
        </button>
        <span style={{ fontSize: '13px', fontWeight: 500, color: '#3c4043' }}>{monthName} {year}</span>
        <button onClick={() => onNavigate(1)} style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#5f6368', borderRadius: '50%', width: '28px', height: '28px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M9 18l6-6-6-6"/></svg>
        </button>
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7,1fr)', gap: '2px' }}>
        {['S','M','T','W','T','F','S'].map((d, i) => (
          <div key={i} style={{ textAlign: 'center', fontSize: '11px', fontWeight: 500, color: '#70757a', padding: '2px 0' }}>{d}</div>
        ))}
        {cells.map((cell, i) => {
          const isToday = cell.day === TODAY_DATE && cell.month === CURRENT_MONTH && cell.year === CURRENT_YEAR;
          const isSelected = selectedDay && cell.day === selectedDay.day && cell.month === selectedDay.month && cell.year === selectedDay.year;
          return (
            <div key={i} style={{
              textAlign: 'center', fontSize: '12px', padding: '4px 0', cursor: 'pointer',
              borderRadius: '50%', width: '28px', height: '28px', margin: '0 auto',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              background: isToday ? '#592683' : isSelected ? '#e8d5f5' : 'transparent',
              color: isToday ? '#fff' : !cell.isCurrentMonth ? '#ccc' : '#3c4043',
              fontWeight: isToday ? 700 : 400
            }}>
              {cell.day}
            </div>
          );
        })}
      </div>
    </div>
  );
}

// ─── BOOKING MODAL ────────────────────────────────────────────────────────────
function BookingModal({ cell, onClose, user, loadEvents }) {
  const [eventName, setEventName] = useState('');
  const [description, setDescription] = useState('');
  const [eventDate, setEventDate] = useState("2026-06-30");
  const [startTime, setStartTime] = useState('09:00');
  const [endTime, setEndTime] = useState('10:00');
  const [appointmentPointer, setAppointmentPointer] = useState('');
  const [repeating, setRepeating] = useState(false);
  const [error, setError] = useState('');

  const handleDateChange = (e) => {
  setEventDate(e.target.value);
};

  const dateString =
    `${cell.year}-${String(cell.month + 1).padStart(2, '0')}-${String(cell.day).padStart(2, '0')}`;

  const handleSave = async () => {
    if (!eventName.trim()) {
      setError('Event name is required');
      return;
    }

    const startDate = `${dateString}T${startTime}:00`;
    const endDate = `${dateString}T${endTime}:00`;

    if (new Date(startDate) >= new Date(endDate)) {
      setError('End time must be after start time');
      return;
    }

    const payload = {
      eventName: eventName.trim(),
      start: `${dateString}T${startTime}:00`,
      end: `${dateString}T${endTime}:00`,
      appointmentPointer: appointmentPointer
      ? Number(appointmentPointer || 0)
      : appointmentPointer,
      description,
      user: user.email,
      isRepeating: repeating
    };
    try {
      const response = await fetch(
        'http://localhost:8080/v1/api/event/PostEvent',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(payload)
        }
      );

      if (!response.ok) {
        throw new Error('Failed to create event');
      }
      await loadEvents();
      onClose();
    } catch (err) {
      setError(err.message);
    }
  };

  const inputStyle = {
    width: '100%',
    padding: '10px',
    border: '1px solid #dadce0',
    borderRadius: '8px',
    fontSize: '14px'
  };

  return (
    <div
      onClick={onClose}
      style={{
        position: 'fixed',
        inset: 0,
        background: 'rgba(0,0,0,.45)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 1100
      }}
    >
      <div
        onClick={e => e.stopPropagation()}
        style={{
          background: '#fff',
          width: '100%',
          maxWidth: '600px',
          borderRadius: '14px',
          overflow: 'hidden',
          boxShadow: '0 20px 50px rgba(0,0,0,.25)'
        }}
      >
        {/* Header */}
        <div
          style={{
            padding: '18px 24px',
            borderBottom: '1px solid #eee',
            background: 'linear-gradient(135deg,#f9f4ff,#f4f0ff)'
          }}
        >
          <h2
            style={{
              margin: 0,
              color: '#592683',
              fontSize: '18px'
            }}
          >
            Create Reminder
          </h2>
        </div>

        {/* Body */}
        <div
          style={{
            padding: '24px',
            display: 'flex',
            flexDirection: 'column',
            gap: '16px'
          }}
        >
          <input
            placeholder="Event Name"
            value={eventName}
            onChange={e => setEventName(e.target.value)}
            style={inputStyle}
          />

          <textarea
            rows={3}
            placeholder="Description"
            value={description}
            onChange={e => setDescription(e.target.value)}
            style={inputStyle}
          />

          <div>
            <label>Date</label>
            <input
              type="date"
              value={dateString}
              onChange={e => setEventDate}
              style={inputStyle}
            />
          </div>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: '1fr 1fr',
              gap: '12px'
            }}
          >
            <div>
              <label>Start Time</label>
              <input
                type="time"
                value={startTime}
                onChange={e => setStartTime(e.target.value)}
                style={inputStyle}
              />
            </div>

            <div>
              <label>End Time</label>
              <input
                type="time"
                value={endTime}
                onChange={e => setEndTime(e.target.value)}
                style={inputStyle}
              />
            </div>
          </div>

          <div>
            <label>Appointment ID (optional)</label>
            <input
              type="number"
              value={appointmentPointer}
              onChange={e => setAppointmentPointer(e.target.value)}
              style={inputStyle}
            />
          </div>

          <label
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '8px'
            }}
          >
            <input
              type="checkbox"
              checked={repeating}
              onChange={e => setRepeating(e.target.checked)}
            />
            Repeat Event
          </label>

          {error && (
            <div
              style={{
                background: '#fce8e6',
                color: '#c62828',
                padding: '10px',
                borderRadius: '8px'
              }}
            >
              {error}
            </div>
          )}
        </div>

        {/* Footer */}
        <div
          style={{
            padding: '16px 24px',
            borderTop: '1px solid #eee',
            display: 'flex',
            justifyContent: 'flex-end',
            gap: '10px'
          }}
        >
          <button
            onClick={onClose}
            style={{
              padding: '10px 18px',
              border: '1px solid #dadce0',
              background: '#fff',
              borderRadius: '8px'
            }}
          >
            Cancel
          </button>

          <button
            onClick={handleSave}
            style={{
              padding: '10px 22px',
              border: 'none',
              borderRadius: '8px',
              background: '#592683',
              color: '#fff',
              fontWeight: 600
            }}
          >
            Create Event
          </button>
        </div>
      </div>
    </div>
  );
}

// ─── CREATE TASK MODAL ───────────────────────────────────────────────────────
function CreateTaskModal({ onClose, onSave }) {
  const [taskName, setTaskName] = useState('');
  const [username, setUsername] = useState('');
  const [description, setDescription] = useState('');
  const [capacity, setCapacity] = useState(1);
  const [date, setDate] = useState('');
  const [timeStart, setTimeStart] = useState('');
  const [timeEnd, setTimeEnd] = useState('');
  const [error, setError] = useState('');

  const formatTime = (t) => {
    if (!t) return '';
    const [h, m] = t.split(':').map(Number);
    const ampm = h >= 12 ? 'PM' : 'AM';
    const hour = h % 12 || 12;
    return `${hour}:${m.toString().padStart(2,'0')} ${ampm}`;
  };

  const handleSave = () => {
    if (!taskName.trim()) { setError('Please enter an appointment name.'); return; }
    if (!date) { setError('Please select a date.'); return; }
    if (!timeStart || !timeEnd) { setError('Please set both a start and end time.'); return; }
    if (timeStart >= timeEnd) { setError('End time must be after start time.'); return; }
    const d = new Date(date + 'T00:00:00');
    onSave([{
      id: `task_${Date.now()}`,
      date: d.getDate(),
      month: d.getMonth(),
      year: d.getFullYear(),
      slotId: `custom_${Date.now()}`,
      time: `${formatTime(timeStart)} – ${formatTime(timeEnd)}`,
      title: taskName.trim(),
      capacity,
      spotsLeft: capacity,
    }]);
    onClose();
  };

  const inputStyle = {
    width: '100%', padding: '9px 12px', fontSize: '14px',
    border: '1px solid #dadce0', borderRadius: '8px',
    background: '#fafafa', color: '#202124', outline: 'none',
    transition: 'border 0.2s, box-shadow 0.2s', fontFamily: 'inherit'
  };
  const labelStyle = { display: 'block', fontSize: '12px', fontWeight: 600, color: '#5f6368', marginBottom: '5px', textTransform: 'uppercase', letterSpacing: '0.4px' };

  return (
    <div style={{
      position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.45)',
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      zIndex: 1000, padding: '16px', fontFamily: "'Google Sans','Segoe UI',sans-serif"
    }} onClick={onClose}>
      <div onClick={e => e.stopPropagation()} style={{
        background: '#fff', borderRadius: '14px',
        boxShadow: '0 24px 64px rgba(0,0,0,0.2)',
        width: '100%', maxWidth: '520px', overflow: 'hidden',
        maxHeight: '90vh', display: 'flex', flexDirection: 'column'
      }}>
        {/* Header */}
        <div style={{
          padding: '20px 24px 16px', borderBottom: '1px solid #f1f3f4',
          display: 'flex', justifyContent: 'space-between', alignItems: 'center',
          background: 'linear-gradient(135deg, #f9f4ff, #f4f0ff)'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <div style={{
              width: '32px', height: '32px', borderRadius: '8px',
              background: 'linear-gradient(135deg,#592683,#7b2fbe)',
              display: 'flex', alignItems: 'center', justifyContent: 'center'
            }}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>
            </div>
            <span style={{ fontSize: '17px', fontWeight: 600, color: '#1a0a2e' }}>Create Task</span>
          </div>
          <button onClick={onClose} style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#5f6368', fontSize: '22px', lineHeight: 1, padding: '4px 8px', borderRadius: '6px' }}>×</button>
        </div>

        {/* Body */}
        <div style={{ padding: '20px 24px', overflowY: 'auto', flex: 1, display: 'flex', flexDirection: 'column', gap: '18px' }}>

          {/* Task Name */}
          <div>
            <label style={labelStyle}>Appointment Name</label>
            <input
              value={taskName} onChange={e => { setTaskName(e.target.value); setError(''); }}
              placeholder="e.g. Client Consultation"
              style={inputStyle}
              onFocus={e => { e.target.style.borderColor = '#592683'; e.target.style.boxShadow = '0 0 0 3px rgba(89,38,131,0.1)'; }}
              onBlur={e => { e.target.style.borderColor = '#dadce0'; e.target.style.boxShadow = 'none'; }}
            />
          </div>

          {/* Description */}
          <div>
            <label style={labelStyle}>Description <span style={{ fontWeight: 400, textTransform: 'none', letterSpacing: 0, color: '#aaa' }}>(optional)</span></label>
            <textarea
              value={description} onChange={e => setDescription(e.target.value)}
              placeholder="Add any notes or details..."
              rows={2}
              style={{ ...inputStyle, resize: 'vertical', lineHeight: '1.5' }}
              onFocus={e => { e.target.style.borderColor = '#592683'; e.target.style.boxShadow = '0 0 0 3px rgba(89,38,131,0.1)'; }}
              onBlur={e => { e.target.style.borderColor = '#dadce0'; e.target.style.boxShadow = 'none'; }}
            />
          </div>

          {/* Capacity */}
          <div>
            <label style={labelStyle}>Number of Attendees</label>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <button onClick={() => setCapacity(c => Math.max(1, c - 1))} style={{
                width: '32px', height: '32px', borderRadius: '50%', border: '1px solid #dadce0',
                background: '#fff', cursor: 'pointer', fontSize: '18px', color: '#592683',
                display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 700, flexShrink: 0
              }}>−</button>
              <input
                type="number" min="1" max="999" value={capacity}
                onChange={e => setCapacity(Math.max(1, Number(e.target.value)))}
                style={{ ...inputStyle, width: '70px', textAlign: 'center', flex: 'none' }}
                onFocus={e => { e.target.style.borderColor = '#592683'; e.target.style.boxShadow = '0 0 0 3px rgba(89,38,131,0.1)'; }}
                onBlur={e => { e.target.style.borderColor = '#dadce0'; e.target.style.boxShadow = 'none'; }}
              />
              <button onClick={() => setCapacity(c => c + 1)} style={{
                width: '32px', height: '32px', borderRadius: '50%', border: '1px solid #dadce0',
                background: '#fff', cursor: 'pointer', fontSize: '18px', color: '#592683',
                display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 700, flexShrink: 0
              }}>+</button>
              <span style={{ fontSize: '13px', color: '#9e9e9e' }}>
                {capacity === 1 ? 'person' : 'people'}
              </span>
            </div>
          </div>

          {/* Date & Time Range */}
          <div>
            <label style={labelStyle}>Date & Time</label>
            <div style={{ background: '#f9f4ff', border: '1px solid #e8d5f5', borderRadius: '10px', padding: '12px', display: 'flex', flexDirection: 'column', gap: '10px' }}>
              {/* Date */}
              <div>
                <div style={{ fontSize: '11px', fontWeight: 600, color: '#9e9e9e', marginBottom: '4px', textTransform: 'uppercase', letterSpacing: '0.3px' }}>Date</div>
                <input
                  type="date" value={date}
                  onChange={e => { setDate(e.target.value); setError(''); }}
                  style={{ ...inputStyle, background: '#fff' }}
                  onFocus={e => { e.target.style.borderColor = '#592683'; e.target.style.boxShadow = '0 0 0 3px rgba(89,38,131,0.1)'; }}
                  onBlur={e => { e.target.style.borderColor = '#dadce0'; e.target.style.boxShadow = 'none'; }}
                />
              </div>
              {/* Time range */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: '11px', fontWeight: 600, color: '#9e9e9e', marginBottom: '4px', textTransform: 'uppercase', letterSpacing: '0.3px' }}>Start Time</div>
                  <input
                    type="time" value={timeStart}
                    onChange={e => { setTimeStart(e.target.value); setError(''); }}
                    style={{ ...inputStyle, background: '#fff' }}
                    onFocus={e => { e.target.style.borderColor = '#592683'; e.target.style.boxShadow = '0 0 0 3px rgba(89,38,131,0.1)'; }}
                    onBlur={e => { e.target.style.borderColor = '#dadce0'; e.target.style.boxShadow = 'none'; }}
                  />
                </div>
                <div style={{ paddingTop: '18px', color: '#592683', fontWeight: 700, fontSize: '16px', flexShrink: 0 }}>→</div>
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: '11px', fontWeight: 600, color: '#9e9e9e', marginBottom: '4px', textTransform: 'uppercase', letterSpacing: '0.3px' }}>End Time</div>
                  <input
                    type="time" value={timeEnd}
                    onChange={e => { setTimeEnd(e.target.value); setError(''); }}
                    style={{ ...inputStyle, background: '#fff' }}
                    onFocus={e => { e.target.style.borderColor = '#592683'; e.target.style.boxShadow = '0 0 0 3px rgba(89,38,131,0.1)'; }}
                    onBlur={e => { e.target.style.borderColor = '#dadce0'; e.target.style.boxShadow = 'none'; }}
                  />
                </div>
              </div>
            </div>
          </div>

          {error && (
            <div style={{ background: '#fce8e6', border: '1px solid #f5c6c2', borderRadius: '8px', padding: '10px 14px', color: '#c62828', fontSize: '13px', fontWeight: 500 }}>
              ⚠ {error}
            </div>
          )}
        </div>

        {/* Footer */}
        <div style={{
          padding: '16px 24px', borderTop: '1px solid #f1f3f4',
          display: 'flex', justifyContent: 'flex-end', gap: '10px', background: '#fafafa'
        }}>
          <button onClick={onClose} style={{
            padding: '9px 20px', borderRadius: '8px', border: '1px solid #dadce0',
            background: '#fff', color: '#3c4043', fontSize: '14px', fontWeight: 500, cursor: 'pointer'
          }}>Cancel</button>
          <button onClick={handleSave} style={{
            padding: '9px 24px', borderRadius: '8px', border: 'none',
            background: 'linear-gradient(135deg,#592683,#7b2fbe)',
            color: '#fff', fontSize: '14px', fontWeight: 600, cursor: 'pointer',
            boxShadow: '0 2px 8px rgba(89,38,131,0.3)'
          }}>Save Task</button>
        </div>
      </div>
    </div>
  );
}

// ─── MAIN CALENDAR ────────────────────────────────────────────────────────────
function CalendarPage({ user, onSignOut }) {
  const [currentDate, setCurrentDate] = useState(new Date(CURRENT_YEAR, CURRENT_MONTH, 1));
  const [appointments, setAppointments] = useState([]);
  const [selectedCell, setSelectedCell] = useState(null);
  const [showCreate, setShowCreate] = useState(false);

  

    const loadEvents = async () => {

      try {

        const response = await fetch(
          `http://localhost:8080/v1/api/event/${user.email}`
        );


        if (!response.ok) {
          throw new Error("Could not load events");
        }


        const events = await response.json();


        const formattedEvents = events.map(event => {

          const start = new Date(event.startDate);
        const end = new Date(event.endDate);

        return {

          id: `${event.userId}_${start.getTime()}`,

          date: start.getDate(),

          month: start.getMonth(),

          year: start.getFullYear(),

          time:
            `${start.toLocaleTimeString([], {
              hour: 'numeric',
              minute: '2-digit'
            })} - ${end.toLocaleTimeString([], {
              hour: 'numeric',
              minute: '2-digit'
            })}`,

          title: event.eventName,

          description: event.eventDescription,

          appointmentPointer: event.appointmentPointer,

          repeating: event.repeating

        };

        });

        console.log(formattedEvents);
        setAppointments(formattedEvents);


      } catch(err) {

        console.error(err);

      }

    };

    useEffect(() =>{
      loadEvents();
    }, []);


  

  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();
  const monthName = currentDate.toLocaleString('default', { month: 'long' });
  const cells = getCalendarCells(year, month);

  const navigate = (dir) => setCurrentDate(new Date(year, month + dir, 1));

  const handleBook = (slotId, time) => {
    setAppointments(prev => [...prev, {
      id: `a_${Date.now()}`,
      date: selectedCell.day,
      month: selectedCell.month,
      year: selectedCell.year,
      slotId, time, title: 'New Booking'
    }]);
  };

  const handleCancel = (id) => setAppointments(prev => prev.filter(a => a.id !== id));

  return (
    <div style={{
      position: 'fixed', inset: 0,
      display: 'flex', flexDirection: 'column',
      background: '#fff', fontFamily: "'Google Sans','Segoe UI',sans-serif",
      color: '#202124', overflow: 'hidden'
    }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Google+Sans:wght@400;500;700&display=swap');
        *, *::before, *::after { box-sizing: border-box; }
        html, body, #root { margin: 0; padding: 0; height: 100%; width: 100%; overflow: hidden; }
        .cal-cell:hover { background: #f6f8ff !important; }
        .nav-btn:hover { background: #f1f3f4 !important; }
        .day-pill:hover { background: #e8d5f5 !important; cursor: pointer; }
        .event-pill:hover { opacity: 0.85; }
        .slot-btn:hover { opacity: 0.85; }
        ::-webkit-scrollbar { width: 6px; }
        ::-webkit-scrollbar-thumb { background: #dadce0; border-radius: 3px; }
      `}</style>

      {/* ── TOP BAR ── */}
      <header style={{
        height: '64px', display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        padding: '0 16px', borderBottom: '1px solid #dadce0', flexShrink: 0
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <div style={{
            width: '36px', height: '36px', borderRadius: '10px',
            background: 'linear-gradient(135deg,#592683,#7b2fbe)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            boxShadow: '0 2px 8px rgba(89,38,131,0.25)'
          }}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <rect x="3" y="4" width="18" height="18" rx="2"/><line x1="16" y1="2" x2="16" y2="6"/>
              <line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/>
            </svg>
          </div>
          <span style={{ fontSize: '20px', fontWeight: 500, color: '#592683', letterSpacing: '-0.2px' }}>
            Appointment Calendar
          </span>
        </div>

        {/* Month nav */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <button onClick={() => setCurrentDate(new Date(CURRENT_YEAR, CURRENT_MONTH, 1))} className="nav-btn" style={{
            padding: '6px 14px', border: '1px solid #dadce0', borderRadius: '6px',
            background: '#fff', fontSize: '14px', fontWeight: 500, color: '#3c4043', cursor: 'pointer'
          }}>Today</button>
          <button onClick={() => navigate(-1)} className="nav-btn" style={{
            width: '32px', height: '32px', borderRadius: '50%', background: 'none',
            border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#5f6368'
          }}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M15 18l-6-6 6-6"/></svg>
          </button>
          <button onClick={() => navigate(1)} className="nav-btn" style={{
            width: '32px', height: '32px', borderRadius: '50%', background: 'none',
            border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#5f6368'
          }}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M9 18l6-6-6-6"/></svg>
          </button>
          <span style={{ fontSize: '22px', fontWeight: 400, color: '#202124', minWidth: '180px' }}>
            {monthName} {year}
          </span>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <div style={{
            width: '32px', height: '32px', borderRadius: '50%',
            background: 'linear-gradient(135deg,#592683,#7b2fbe)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            color: '#fff', fontSize: '14px', fontWeight: 700
          }}>{user.username[0]}</div>
          <button onClick={onSignOut} style={{
            background: 'none', border: '1px solid #dadce0', borderRadius: '6px',
            padding: '6px 12px', fontSize: '13px', color: '#592683', cursor: 'pointer', fontWeight: 500
          }}>Sign Out</button>
        </div>
      </header>

      {/* ── BODY ── */}
      <div style={{ display: 'flex', flex: 1, overflow: 'hidden' }}>

        {/* ── SIDEBAR ── */}
        <aside style={{ width: '256px', borderRight: '1px solid #dadce0', flexShrink: 0, overflowY: 'auto' }}>
          <div style={{ padding: '16px' }}>
            <button onClick={() => setShowCreate(true)} style={{
              display: 'flex', alignItems: 'center', gap: '8px',
              background: '#fff', border: '1px solid #dadce0',
              boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
              borderRadius: '24px', padding: '10px 20px',
              color: '#3c4043', fontSize: '14px', fontWeight: 500, cursor: 'pointer'
            }}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#592683" strokeWidth="2.5" strokeLinecap="round"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>
              Create
            </button>
            <button onClick={() => setSelectedCell(true)} style={{
              display: 'flex', alignItems: 'center', gap: '8px',
              background: '#fff', border: '1px solid #dadce0',
              boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
              borderRadius: '24px', padding: '10px 20px',
              color: '#3c4043', fontSize: '14px', fontWeight: 500, cursor: 'pointer'
            }}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#592683" strokeWidth="2.5" strokeLinecap="round"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>
              Create Reminder
            </button>
          </div>
          <MiniCalendar year={year} month={month} onNavigate={navigate} selectedDay={selectedCell} />

          <div style={{ padding: '16px', borderTop: '1px solid #f1f3f4', marginTop: '8px' }}>
            <div style={{ fontSize: '12px', fontWeight: 600, color: '#5f6368', textTransform: 'uppercase', letterSpacing: '0.5px', marginBottom: '12px' }}>
              My Calendars
            </div>
            {[
              { label: 'Appointments', color: '#592683' },
              { label: 'Personal', color: '#4285F4' },
              { label: 'Reminders', color: '#0F9D58' },
            ].map(item => (
              <div key={item.label} style={{ display: 'flex', alignItems: 'center', gap: '10px', padding: '6px 0', cursor: 'pointer' }}>
                <div style={{ width: '12px', height: '12px', borderRadius: '3px', background: item.color }} />
                <span style={{ fontSize: '14px', color: '#3c4043' }}>{item.label}</span>
              </div>
            ))}
          </div>
        </aside>

        {/* ── MAIN GRID ── */}
        <main style={{ flex: 1, display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
          {/* Day headers */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7,1fr)', borderBottom: '1px solid #dadce0', flexShrink: 0 }}>
            {['SUN','MON','TUE','WED','THU','FRI','SAT'].map((d, i) => (
              <div key={d} style={{ padding: '8px 0', textAlign: 'center' }}>
                <span style={{ fontSize: '11px', fontWeight: 600, color: i === 0 || i === 6 ? '#c62828' : '#70757a', letterSpacing: '0.8px' }}>{d}</span>
              </div>
            ))}
          </div>

          {/* 42-cell grid */}
          <div style={{ flex: 1, display: 'grid', gridTemplateColumns: 'repeat(7,1fr)', gridTemplateRows: 'repeat(6,1fr)', overflow: 'hidden' }}>
            {cells.map((cell, idx) => {
              const isToday = cell.day === TODAY_DATE && cell.month === CURRENT_MONTH && cell.year === CURRENT_YEAR;
              const isWeekend = idx % 7 === 0 || idx % 7 === 6;
              const dayAppts = appointments.filter(a => a.date === cell.day && a.month === cell.month && a.year === cell.year);
              const isFirstOfMonth = cell.day === 1;

              return (
                <div
                  key={idx}
                  className="cal-cell"
                  //onClick={() => setSelectedCell(cell)}
                  style={{
                    borderRight: (idx + 1) % 7 === 0 ? 'none' : '1px solid #dadce0',
                    borderBottom: idx >= 35 ? 'none' : '1px solid #dadce0',
                    padding: '4px 4px 2px',
                    display: 'flex', flexDirection: 'column',
                    cursor: 'pointer', overflow: 'hidden',
                    background: !cell.isCurrentMonth ? '#fafafa' : isWeekend ? '#fefefe' : '#fff',
                    transition: 'background 0.1s'
                  }}
                >
                  {/* Date number */}
                  <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '2px' }}>
                    <div className={isToday ? '' : 'day-pill'} style={{
                      width: '28px', height: '28px', borderRadius: '50%',
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      fontSize: '13px', fontWeight: isToday ? 700 : 400,
                      background: isToday ? '#592683' : 'transparent',
                      color: isToday ? '#fff' : !cell.isCurrentMonth ? '#bdbdbd' : isWeekend ? '#c62828' : '#3c4043',
                      transition: 'background 0.15s'
                    }}>
                      {isFirstOfMonth
                        ? <span style={{ fontSize: '11px', fontWeight: 600 }}>
                            {new Date(cell.year, cell.month).toLocaleString('default', { month: 'short' })} 1
                          </span>
                        : cell.day
                      }
                    </div>
                  </div>

                  {/* Event pills */}
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '2px', flex: 1, overflow: 'hidden' }}>
                    {dayAppts.slice(0, 3).map(appt => {
                      const col = getEventColor(appt.id);
                      return (
                        <div key={appt.id} className="event-pill" style={{
                          background: col.bg,
                          color: '#fff', fontSize: '11px', padding: '2px 6px',
                          borderRadius: '4px', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis',
                          fontWeight: 500, lineHeight: '18px'
                        }}>
                          {appt.time} {appt.title}
                        </div>
                      );
                    })}
                    {dayAppts.length > 3 && (
                      <div style={{ fontSize: '11px', color: '#5f6368', paddingLeft: '6px', fontWeight: 500 }}>
                        +{dayAppts.length - 3} more
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </main>
      </div>

      {/* ── BOOKING MODAL ── */}
      {selectedCell && (
        <BookingModal
          cell={selectedCell}
          user={user}
          loadEvents={loadEvents}
          onClose={() => setSelectedCell(null)}
        />
      )}

      {/* ── CREATE TASK MODAL ── */}
      {showCreate && (
        <CreateTaskModal
          onClose={() => setShowCreate(false)}
          onSave={(newAppts) => setAppointments(prev => [...prev, ...newAppts])}
        />
      )}
    </div>
  );
}

// ─── ROOT ─────────────────────────────────────────────────────────────────────
export default function App() {
  const [user, setUser] = useState(null);
  return user
    ? <CalendarPage user={user} onSignOut={() => setUser(null)} />
    : <LoginPage onLogin={setUser} />;
}