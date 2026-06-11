import { useState } from "react";

const DUMMY_USERS = [
  { id: 1, name: "Boss", email: "boss@saints.com", password: "password123" }
];

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

const INITIAL_APPOINTMENTS = [
  { id: 'a1', date: 5, month: CURRENT_MONTH, year: CURRENT_YEAR, slotId: 's1', time: '9:00 AM – 10:30 AM', title: 'Franchise Meeting', capacity: 5, spotsLeft: 2 },
  { id: 'a2', date: 12, month: CURRENT_MONTH, year: CURRENT_YEAR, slotId: 's4', time: '1:00 PM – 3:00 PM', title: 'Supply Drop', capacity: 3, spotsLeft: 0 },
  { id: 'a3', date: 18, month: CURRENT_MONTH, year: CURRENT_YEAR, slotId: 's3', time: '11:00 AM – 12:30 PM', title: 'Auto Customization', capacity: 4, spotsLeft: 4 },
  { id: 'a4', date: 18, month: CURRENT_MONTH, year: CURRENT_YEAR, slotId: 's6', time: '3:00 PM – 5:00 PM', title: 'Turf Strategy', capacity: 2, spotsLeft: 1 },
  { id: 'a5', date: 25, month: CURRENT_MONTH, year: CURRENT_YEAR, slotId: 's2', time: '10:00 AM – 12:00 PM', title: 'Inventory Check', capacity: 6, spotsLeft: 6 },
];

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

  const handleSubmit = (e) => {
    e.preventDefault();
    const user = DUMMY_USERS.find(u => u.email === email && u.password === password);
    if (user) onLogin(user);
    else {
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
              placeholder="boss@saints.com"
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
          Hint: boss@saints.com / password123
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

// ─── EVENT DETAIL MODAL ───────────────────────────────────────────────────────
function EventDetailModal({ appt, onReserve, onCancelReservation, onClose, userReserved }) {
  const isFull = appt.spotsLeft === 0;
  const capacity = appt.capacity ?? null;
  const spotsLeft = appt.spotsLeft ?? null;
  const col = getEventColor(appt.id);

  const dateStr = new Date(appt.year, appt.month, appt.date).toLocaleDateString('en-US', {
    weekday: 'long', month: 'long', day: 'numeric', year: 'numeric'
  });

  return (
    <div style={{
      position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.4)',
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      zIndex: 1000, padding: '16px', fontFamily: "'Google Sans','Segoe UI',sans-serif"
    }} onClick={onClose}>
      <div onClick={e => e.stopPropagation()} style={{
        background: '#fff', borderRadius: '14px',
        boxShadow: '0 24px 64px rgba(0,0,0,0.2)',
        width: '100%', maxWidth: '420px', overflow: 'hidden'
      }}>
        {/* Colored header bar */}
        <div style={{ background: isFull ? '#9e9e9e' : col.bg, padding: '20px 20px 16px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
            <div>
              <div style={{ fontSize: '20px', fontWeight: 700, color: '#fff', marginBottom: '4px' }}>{appt.title}</div>
              <div style={{ fontSize: '13px', color: 'rgba(255,255,255,0.85)' }}>{dateStr}</div>
            </div>
            <button onClick={onClose} style={{ background: 'rgba(255,255,255,0.2)', border: 'none', cursor: 'pointer', color: '#fff', fontSize: '18px', lineHeight: 1, padding: '4px 8px', borderRadius: '6px' }}>×</button>
          </div>
        </div>

        {/* Body */}
        <div style={{ padding: '20px' }}>
          {/* Time */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '16px' }}>
            <div style={{ width: '32px', height: '32px', borderRadius: '8px', background: '#f3f0ff', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#592683" strokeWidth="2" strokeLinecap="round"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
            </div>
            <span style={{ fontSize: '15px', color: '#202124', fontWeight: 500 }}>{appt.time}</span>
          </div>

          {/* Capacity bar */}
          {capacity !== null && (
            <div style={{ marginBottom: '20px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '6px' }}>
                <span style={{ fontSize: '13px', fontWeight: 600, color: '#5f6368' }}>AVAILABILITY</span>
                <span style={{ fontSize: '13px', fontWeight: 700, color: isFull ? '#c62828' : spotsLeft <= 2 ? '#e65100' : '#2e7d32' }}>
                  {isFull ? 'Full' : `${spotsLeft} of ${capacity} spots left`}
                </span>
              </div>
              <div style={{ height: '6px', background: '#f1f3f4', borderRadius: '3px', overflow: 'hidden' }}>
                <div style={{
                  height: '100%', borderRadius: '3px',
                  width: `${Math.max(0, ((capacity - spotsLeft) / capacity)) * 100}%`,
                  background: isFull ? '#9e9e9e' : spotsLeft <= 2 ? '#e65100' : col.bg,
                  transition: 'width 0.3s ease'
                }} />
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '4px' }}>
                <span style={{ fontSize: '11px', color: '#9e9e9e' }}>{capacity - spotsLeft} reserved</span>
                <span style={{ fontSize: '11px', color: '#9e9e9e' }}>{capacity} total</span>
              </div>
            </div>
          )}

          {/* CTA */}
          {userReserved ? (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              <div style={{ background: '#e8f5e9', border: '1px solid #a5d6a7', borderRadius: '8px', padding: '10px 14px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#2e7d32" strokeWidth="2.5" strokeLinecap="round"><polyline points="20 6 9 17 4 12"/></svg>
                <span style={{ fontSize: '14px', color: '#2e7d32', fontWeight: 600 }}>You're reserved for this appointment</span>
              </div>
              <button onClick={() => { onCancelReservation(appt.id); onClose(); }} style={{
                padding: '10px', borderRadius: '8px', border: '1px solid #dadce0',
                background: '#fff', color: '#c62828', fontSize: '14px', fontWeight: 500, cursor: 'pointer', width: '100%'
              }}>Cancel My Reservation</button>
            </div>
          ) : isFull ? (
            <div style={{ background: '#f5f5f5', border: '1px solid #e0e0e0', borderRadius: '8px', padding: '12px 14px', textAlign: 'center', color: '#9e9e9e', fontSize: '14px', fontWeight: 500 }}>
              This appointment is fully booked
            </div>
          ) : (
            <button onClick={() => { onReserve(appt.id); onClose(); }} style={{
              width: '100%', padding: '12px', borderRadius: '8px', border: 'none',
              background: `linear-gradient(135deg, ${col.bg}, ${col.bg}cc)`,
              color: '#fff', fontSize: '15px', fontWeight: 600, cursor: 'pointer',
              boxShadow: `0 2px 8px ${col.bg}55`
            }}>Reserve a Spot</button>
          )}
        </div>
      </div>
    </div>
  );
}

// ─── CREATE TASK MODAL ───────────────────────────────────────────────────────
function CreateTaskModal({ onClose, onSave }) {
  const [taskName, setTaskName] = useState('');
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

// ─── PROFILE PAGE ────────────────────────────────────────────────────────────
function ProfilePage({ user, onBack, onUpdate, onSignOut }) {
  const [username, setUsername] = useState(user.name);
  const [email, setEmail] = useState(user.email);
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [saved, setSaved] = useState('');
  const [error, setError] = useState('');

  const inputStyle = {
    width: '100%', padding: '10px 14px', fontSize: '14px',
    border: '1px solid #dadce0', borderRadius: '8px',
    background: '#fafafa', color: '#202124', outline: 'none',
    fontFamily: 'inherit', transition: 'border 0.2s, box-shadow 0.2s',
    boxSizing: 'border-box'
  };
  const labelStyle = {
    display: 'block', fontSize: '12px', fontWeight: 600,
    color: '#5f6368', marginBottom: '6px',
    letterSpacing: '0.3px'
  };
  const focus = e => { e.target.style.borderColor = '#592683'; e.target.style.boxShadow = '0 0 0 3px rgba(89,38,131,0.1)'; };
  const blur  = e => { e.target.style.borderColor = '#dadce0'; e.target.style.boxShadow = 'none'; };

  const handleSaveProfile = () => {
    setError(''); setSaved('');
    if (!username.trim()) { setError('Username cannot be empty.'); return; }
    if (!email.trim() || !email.includes('@')) { setError('Please enter a valid email.'); return; }
    onUpdate({ name: username.trim(), email: email.trim() });
    setSaved('profile');
    setTimeout(() => setSaved(''), 2500);
  };

  const handleSavePassword = () => {
    setError(''); setSaved('');
    if (!currentPassword) { setError('Please enter your current password.'); return; }
    if (currentPassword !== user.password) { setError('Current password is incorrect.'); return; }
    if (newPassword.length < 6) { setError('New password must be at least 6 characters.'); return; }
    if (newPassword !== confirmPassword) { setError('New passwords do not match.'); return; }
    onUpdate({ password: newPassword });
    setCurrentPassword(''); setNewPassword(''); setConfirmPassword('');
    setSaved('password');
    setTimeout(() => setSaved(''), 2500);
  };

  return (
    <div style={{
      position: 'fixed', inset: 0, background: '#f8f9fa',
      fontFamily: "'Google Sans','Segoe UI',sans-serif", color: '#202124',
      display: 'flex', flexDirection: 'column', overflow: 'hidden'
    }}>
      {/* Header */}
      <header style={{
        height: '64px', background: '#fff', borderBottom: '1px solid #dadce0',
        display: 'flex', alignItems: 'center', padding: '0 24px', gap: '16px', flexShrink: 0
      }}>
        <button onClick={onBack} style={{
          width: '36px', height: '36px', borderRadius: '50%', border: 'none',
          background: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center',
          justifyContent: 'center', color: '#5f6368'
        }}
          onMouseEnter={e => e.currentTarget.style.background = '#f1f3f4'}
          onMouseLeave={e => e.currentTarget.style.background = 'none'}
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><path d="M19 12H5M12 5l-7 7 7 7"/></svg>
        </button>
        <span style={{ fontSize: '20px', fontWeight: 500, color: '#592683' }}>Account Settings</span>
      </header>

      {/* Body */}
      <div style={{ flex: 1, overflowY: 'auto', display: 'flex', justifyContent: 'center', padding: '32px 16px' }}>
        <div style={{ width: '100%', maxWidth: '520px', display: 'flex', flexDirection: 'column', gap: '20px' }}>

          {/* Avatar hero */}
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '12px', paddingBottom: '8px' }}>
            <div style={{
              width: '80px', height: '80px', borderRadius: '50%',
              background: 'linear-gradient(135deg,#592683,#7b2fbe)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              boxShadow: '0 4px 20px rgba(89,38,131,0.3)'
            }}>
              <svg width="40" height="40" viewBox="0 0 24 24" fill="white">
                <path d="M12 12c2.7 0 4.8-2.1 4.8-4.8S14.7 2.4 12 2.4 7.2 4.5 7.2 7.2 9.3 12 12 12zm0 2.4c-3.2 0-9.6 1.6-9.6 4.8v2.4h19.2v-2.4c0-3.2-6.4-4.8-9.6-4.8z"/>
              </svg>
            </div>
            <div style={{ textAlign: 'center' }}>
              <div style={{ fontSize: '20px', fontWeight: 700, color: '#1a0a2e' }}>{user.name}</div>
              <div style={{ fontSize: '14px', color: '#9e9e9e' }}>{user.email}</div>
            </div>
          </div>

          {/* Error / success banners */}
          {error && (
            <div style={{ background: '#fce8e6', border: '1px solid #f5c6c2', borderRadius: '8px', padding: '10px 14px', color: '#c62828', fontSize: '13px', fontWeight: 500 }}>
              ⚠ {error}
            </div>
          )}
          {saved === 'profile' && (
            <div style={{ background: '#e8f5e9', border: '1px solid #a5d6a7', borderRadius: '8px', padding: '10px 14px', color: '#2e7d32', fontSize: '13px', fontWeight: 500, display: 'flex', alignItems: 'center', gap: '6px' }}>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#2e7d32" strokeWidth="2.5" strokeLinecap="round"><polyline points="20 6 9 17 4 12"/></svg>
              Profile updated successfully.
            </div>
          )}
          {saved === 'password' && (
            <div style={{ background: '#e8f5e9', border: '1px solid #a5d6a7', borderRadius: '8px', padding: '10px 14px', color: '#2e7d32', fontSize: '13px', fontWeight: 500, display: 'flex', alignItems: 'center', gap: '6px' }}>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#2e7d32" strokeWidth="2.5" strokeLinecap="round"><polyline points="20 6 9 17 4 12"/></svg>
              Password changed successfully.
            </div>
          )}

          {/* Profile Info Card */}
          <div style={{ background: '#fff', borderRadius: '12px', border: '1px solid #dadce0', boxShadow: '0 1px 4px rgba(0,0,0,0.06)' }}>
            <div style={{ padding: '16px 20px', borderBottom: '1px solid #f1f3f4', display: 'flex', alignItems: 'center', gap: '10px' }}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#592683" strokeWidth="2" strokeLinecap="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
              <span style={{ fontSize: '14px', fontWeight: 600, color: '#1a0a2e' }}>Profile Information</span>
            </div>
            <div style={{ padding: '20px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <div style={{ minWidth: 0 }}>
                <label style={labelStyle}>Username</label>
                <input value={username} onChange={e => { setUsername(e.target.value); setError(''); setSaved(''); }}
                  style={inputStyle} placeholder="Your name" onFocus={focus} onBlur={blur} />
              </div>
              <div style={{ minWidth: 0 }}>
                <label style={labelStyle}>Email Address</label>
                <input type="email" value={email} onChange={e => { setEmail(e.target.value); setError(''); setSaved(''); }}
                  style={inputStyle} placeholder="you@example.com" onFocus={focus} onBlur={blur} />
              </div>
              <button onClick={handleSaveProfile} style={{
                alignSelf: 'flex-end', padding: '9px 24px', borderRadius: '8px', border: 'none',
                background: 'linear-gradient(135deg,#592683,#7b2fbe)', color: '#fff',
                fontSize: '14px', fontWeight: 600, cursor: 'pointer',
                boxShadow: '0 2px 8px rgba(89,38,131,0.25)'
              }}
                onMouseEnter={e => e.currentTarget.style.opacity = '0.9'}
                onMouseLeave={e => e.currentTarget.style.opacity = '1'}
              >Save Changes</button>
            </div>
          </div>

          {/* Change Password Card */}
          <div style={{ background: '#fff', borderRadius: '12px', border: '1px solid #dadce0', boxShadow: '0 1px 4px rgba(0,0,0,0.06)' }}>
            <div style={{ padding: '16px 20px', borderBottom: '1px solid #f1f3f4', display: 'flex', alignItems: 'center', gap: '10px' }}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#592683" strokeWidth="2" strokeLinecap="round"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>
              <span style={{ fontSize: '14px', fontWeight: 600, color: '#1a0a2e' }}>Change Password</span>
            </div>
            <div style={{ padding: '20px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <div style={{ minWidth: 0 }}>
                <label style={labelStyle}>Current Password</label>
                <input type="password" value={currentPassword} onChange={e => { setCurrentPassword(e.target.value); setError(''); setSaved(''); }}
                  style={inputStyle} placeholder="••••••••" onFocus={focus} onBlur={blur} />
              </div>
              <div style={{ minWidth: 0 }}>
                <label style={labelStyle}>New Password</label>
                <input type="password" value={newPassword} onChange={e => { setNewPassword(e.target.value); setError(''); setSaved(''); }}
                  style={inputStyle} placeholder="Min. 6 characters" onFocus={focus} onBlur={blur} />
              </div>
              <div style={{ minWidth: 0 }}>
                <label style={{ ...labelStyle, whiteSpace: 'normal' }}>Confirm New Password</label>
                <input type="password" value={confirmPassword} onChange={e => { setConfirmPassword(e.target.value); setError(''); setSaved(''); }}
                  style={inputStyle} placeholder="Re-enter new password" onFocus={focus} onBlur={blur} />
              </div>
              <button onClick={handleSavePassword} style={{
                alignSelf: 'flex-end', padding: '9px 24px', borderRadius: '8px', border: 'none',
                background: 'linear-gradient(135deg,#592683,#7b2fbe)', color: '#fff',
                fontSize: '14px', fontWeight: 600, cursor: 'pointer',
                boxShadow: '0 2px 8px rgba(89,38,131,0.25)'
              }}
                onMouseEnter={e => e.currentTarget.style.opacity = '0.9'}
                onMouseLeave={e => e.currentTarget.style.opacity = '1'}
              >Update Password</button>
            </div>
          </div>

          {/* Sign Out */}
          <div style={{ background: '#fff', borderRadius: '12px', border: '1px solid #dadce0', overflow: 'hidden', boxShadow: '0 1px 4px rgba(0,0,0,0.06)' }}>
            <div style={{ padding: '20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div>
                <div style={{ fontSize: '14px', fontWeight: 600, color: '#1a0a2e' }}>Sign Out</div>
                <div style={{ fontSize: '13px', color: '#9e9e9e', marginTop: '2px' }}>Sign out of your account on this device</div>
              </div>
              <button onClick={onSignOut} style={{
                padding: '9px 20px', borderRadius: '8px', border: '1px solid #dadce0',
                background: '#fff', color: '#c62828', fontSize: '14px', fontWeight: 500, cursor: 'pointer'
              }}
                onMouseEnter={e => { e.currentTarget.style.background = '#fce8e6'; e.currentTarget.style.borderColor = '#f5c6c2'; }}
                onMouseLeave={e => { e.currentTarget.style.background = '#fff'; e.currentTarget.style.borderColor = '#dadce0'; }}
              >Sign Out</button>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}


function CalendarPage({ user, onSignOut, onUpdate }) {
  const [currentDate, setCurrentDate] = useState(new Date(CURRENT_YEAR, CURRENT_MONTH, 1));
  const [appointments, setAppointments] = useState(INITIAL_APPOINTMENTS);
  const [selectedAppt, setSelectedAppt] = useState(null);
  const [showCreate, setShowCreate] = useState(false);
  const [reservedIds, setReservedIds] = useState(new Set());
  const [showProfile, setShowProfile] = useState(false);

  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();
  const monthName = currentDate.toLocaleString('default', { month: 'long' });
  const cells = getCalendarCells(year, month);

  const navigate = (dir) => setCurrentDate(new Date(year, month + dir, 1));

  const handleReserve = (apptId) => {
    setAppointments(prev => prev.map(a =>
      a.id === apptId ? { ...a, spotsLeft: Math.max(0, (a.spotsLeft ?? 1) - 1) } : a
    ));
    setReservedIds(prev => new Set([...prev, apptId]));
  };

  const handleCancelReservation = (apptId) => {
    setAppointments(prev => prev.map(a =>
      a.id === apptId ? { ...a, spotsLeft: (a.spotsLeft ?? 0) + 1 } : a
    ));
    setReservedIds(prev => { const n = new Set(prev); n.delete(apptId); return n; });
  };

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
          <button onClick={() => setShowProfile(true)} style={{
            width: '36px', height: '36px', borderRadius: '50%',
            background: 'linear-gradient(135deg,#592683,#7b2fbe)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            border: 'none', cursor: 'pointer', boxShadow: '0 2px 8px rgba(89,38,131,0.3)',
            transition: 'transform 0.15s, box-shadow 0.15s'
          }}
            onMouseEnter={e => { e.currentTarget.style.transform = 'scale(1.08)'; e.currentTarget.style.boxShadow = '0 4px 16px rgba(89,38,131,0.4)'; }}
            onMouseLeave={e => { e.currentTarget.style.transform = 'scale(1)'; e.currentTarget.style.boxShadow = '0 2px 8px rgba(89,38,131,0.3)'; }}
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="white">
              <path d="M12 12c2.7 0 4.8-2.1 4.8-4.8S14.7 2.4 12 2.4 7.2 4.5 7.2 7.2 9.3 12 12 12zm0 2.4c-3.2 0-9.6 1.6-9.6 4.8v2.4h19.2v-2.4c0-3.2-6.4-4.8-9.6-4.8z"/>
            </svg>
          </button>
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
          </div>
          <MiniCalendar year={year} month={month} onNavigate={navigate} selectedDay={selectedAppt} />

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
                  onClick={() => setSelectedCell(cell)}
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
                      const isFull = appt.spotsLeft === 0;
                      const isReserved = reservedIds.has(appt.id);
                      return (
                        <div key={appt.id} onClick={e => { e.stopPropagation(); setSelectedAppt(appt); }} className="event-pill" style={{
                          background: isFull ? '#bdbdbd' : col.bg,
                          color: '#fff', fontSize: '11px', padding: '2px 6px',
                          borderRadius: '4px', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis',
                          fontWeight: 500, lineHeight: '18px', cursor: 'pointer',
                          opacity: isFull ? 0.7 : 1,
                          display: 'flex', alignItems: 'center', gap: '3px'
                        }}>
                          {isReserved && <span style={{ fontSize: '9px' }}>✓</span>}
                          {appt.time} {appt.title}
                          {isFull && <span style={{ fontSize: '9px', marginLeft: '2px', opacity: 0.9 }}>• Full</span>}
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

      {/* ── EVENT DETAIL MODAL ── */}
      {selectedAppt && (
        <EventDetailModal
          appt={selectedAppt}
          userReserved={reservedIds.has(selectedAppt.id)}
          onReserve={handleReserve}
          onCancelReservation={handleCancelReservation}
          onClose={() => setSelectedAppt(null)}
        />
      )}

      {/* ── CREATE TASK MODAL ── */}
      {showCreate && (
        <CreateTaskModal
          onClose={() => setShowCreate(false)}
          onSave={(newAppts) => setAppointments(prev => [...prev, ...newAppts])}
        />
      )}

      {/* ── PROFILE PAGE ── */}
      {showProfile && (
        <ProfilePage
          user={user}
          onBack={() => setShowProfile(false)}
          onUpdate={onUpdate}
          onSignOut={onSignOut}
        />
      )}
    </div>
  );
}

// ─── ROOT ─────────────────────────────────────────────────────────────────────
export default function App() {
  const [user, setUser] = useState(null);
  const handleUpdate = (changes) => setUser(prev => ({ ...prev, ...changes }));
  return user
    ? <CalendarPage user={user} onSignOut={() => setUser(null)} onUpdate={handleUpdate} />
    : <LoginPage onLogin={setUser} />;
}