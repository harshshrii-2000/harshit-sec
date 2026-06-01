'use client';
import { useEffect, useState } from 'react';

const BOOT_LINES = [
  { text: 'BIOS v2.4.7 — Secure Boot Enabled', delay: 200 },
  { text: 'Initializing hardware security modules...', delay: 400 },
  { text: 'Verifying cryptographic signatures... [OK]', delay: 700 },
  { text: 'Loading kernel modules: firewall, ids, vpn...', delay: 1000 },
  { text: 'Establishing encrypted tunnel... [AES-256]', delay: 1300 },
  { text: 'Mounting secure filesystem...', delay: 1600 },
  { text: 'Running vulnerability scanner...', delay: 1900 },
  { text: 'No critical threats detected ✓', delay: 2200 },
  { text: 'Loading portfolio interface...', delay: 2500 },
  { text: '> ACCESS GRANTED — Welcome, Harshit Shrivastav', delay: 2800 },
];

export default function LoadingScreen({ onComplete }: { onComplete: () => void }) {
  const [lines, setLines] = useState<string[]>([]);
  const [progress, setProgress] = useState(0);
  const [done, setDone] = useState(false);

  useEffect(() => {
    BOOT_LINES.forEach(({ text, delay }) => {
      setTimeout(() => {
        setLines(prev => [...prev, text]);
        setProgress(Math.round((delay / 3200) * 100));
      }, delay);
    });
    setTimeout(() => {
      setDone(true);
      setTimeout(onComplete, 600);
    }, 3400);
  }, [onComplete]);

  return (
    <div
      className={`fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-cyber-dark transition-opacity duration-700 ${done ? 'opacity-0' : 'opacity-100'}`}
      style={{ fontFamily: 'Fira Code, monospace' }}
    >
      <div className="grid-bg absolute inset-0 opacity-30" />

      {/* Logo */}
      <div className="relative z-10 mb-8 text-center">
        <div className="text-4xl font-bold text-cyber-green mb-1" style={{ textShadow: '0 0 30px rgba(0,255,102,0.8)' }}>
          HS_SEC
        </div>
        <div className="text-xs text-cyber-blue tracking-widest uppercase">Harshit Security Terminal v1.0</div>
      </div>

      {/* Terminal box */}
      <div className="relative z-10 w-full max-w-xl mx-4 rounded-lg border border-cyber-green/20 bg-black/60 backdrop-blur p-6 shadow-[0_0_40px_rgba(0,255,102,0.1)]">
        <div className="flex items-center gap-2 mb-4 border-b border-cyber-green/10 pb-3">
          <div className="w-3 h-3 rounded-full bg-red-500/70" />
          <div className="w-3 h-3 rounded-full bg-yellow-500/70" />
          <div className="w-3 h-3 rounded-full bg-cyber-green/70" />
          <span className="ml-2 text-xs text-gray-500 font-mono">boot_sequence.sh</span>
        </div>
        <div className="space-y-1.5 min-h-[200px]">
          {lines.map((line, i) => (
            <div key={i} className={`text-sm font-mono flex items-start gap-2 ${line.startsWith('>') ? 'text-cyber-green' : 'text-gray-400'}`}>
              <span className="text-cyber-green/40 select-none shrink-0">
                {line.startsWith('>') ? '>' : '$'}
              </span>
              <span>{line.startsWith('>') ? line.slice(2) : line}</span>
            </div>
          ))}
          {!done && (
            <div className="flex items-center gap-2 text-sm text-cyber-green/60">
              <span className="text-cyber-green/40">$</span>
              <span className="animate-pulse">▮</span>
            </div>
          )}
        </div>
      </div>

      {/* Progress bar */}
      <div className="relative z-10 mt-6 w-full max-w-xl mx-4">
        <div className="flex justify-between text-xs text-gray-500 font-mono mb-1">
          <span>LOADING SYSTEM</span>
          <span>{progress}%</span>
        </div>
        <div className="h-1 bg-cyber-gray/30 rounded-full overflow-hidden">
          <div
            className="h-full bg-cyber-green transition-all duration-300 rounded-full"
            style={{ width: `${progress}%`, boxShadow: '0 0 10px rgba(0,255,102,0.6)' }}
          />
        </div>
      </div>
    </div>
  );
}
