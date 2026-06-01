'use client';
import { useEffect, useState } from 'react';

export default function CustomCursor() {
  const [pos, setPos] = useState({ x: 0, y: 0 });
  const [trail, setTrail] = useState({ x: 0, y: 0 });
  const [clicking, setClicking] = useState(false);
  const [hovering, setHovering] = useState(false);

  useEffect(() => {
    const move = (e: MouseEvent) => {
      setPos({ x: e.clientX, y: e.clientY });
      setTimeout(() => setTrail({ x: e.clientX, y: e.clientY }), 80);
      const t = e.target as Element;
      setHovering(!!(t?.closest('a, button, [role="button"], input, textarea')));
    };
    const down = () => setClicking(true);
    const up = () => setClicking(false);
    window.addEventListener('mousemove', move);
    window.addEventListener('mousedown', down);
    window.addEventListener('mouseup', up);
    return () => {
      window.removeEventListener('mousemove', move);
      window.removeEventListener('mousedown', down);
      window.removeEventListener('mouseup', up);
    };
  }, []);

  return (
    <>
      {/* Trail dot */}
      <div
        className="fixed pointer-events-none z-[9999] rounded-full transition-all duration-100"
        style={{
          left: trail.x - 18,
          top: trail.y - 18,
          width: hovering ? 44 : 36,
          height: hovering ? 44 : 36,
          border: `1px solid ${hovering ? 'rgba(0,240,255,0.5)' : 'rgba(0,255,102,0.3)'}`,
          boxShadow: hovering ? '0 0 12px rgba(0,240,255,0.3)' : '0 0 8px rgba(0,255,102,0.2)',
          transform: clicking ? 'scale(0.85)' : 'scale(1)',
        }}
      />
      {/* Crosshair center */}
      <div
        className="fixed pointer-events-none z-[9999]"
        style={{ left: pos.x - 5, top: pos.y - 5 }}
      >
        <div style={{
          width: 10, height: 10,
          borderRadius: '50%',
          background: hovering ? 'rgba(0,240,255,0.9)' : 'rgba(0,255,102,0.9)',
          boxShadow: hovering ? '0 0 10px rgba(0,240,255,0.8)' : '0 0 10px rgba(0,255,102,0.8)',
          transform: clicking ? 'scale(1.5)' : 'scale(1)',
          transition: 'transform 0.1s, background 0.2s',
        }} />
      </div>
      {/* Crosshair lines */}
      <div className="fixed pointer-events-none z-[9998]" style={{ left: pos.x, top: pos.y - 12 }}>
        <div style={{ width: 1, height: 8, background: 'rgba(0,255,102,0.5)' }} />
      </div>
      <div className="fixed pointer-events-none z-[9998]" style={{ left: pos.x, top: pos.y + 5 }}>
        <div style={{ width: 1, height: 8, background: 'rgba(0,255,102,0.5)' }} />
      </div>
      <div className="fixed pointer-events-none z-[9998]" style={{ left: pos.x - 12, top: pos.y }}>
        <div style={{ height: 1, width: 8, background: 'rgba(0,255,102,0.5)' }} />
      </div>
      <div className="fixed pointer-events-none z-[9998]" style={{ left: pos.x + 5, top: pos.y }}>
        <div style={{ height: 1, width: 8, background: 'rgba(0,255,102,0.5)' }} />
      </div>
    </>
  );
}
