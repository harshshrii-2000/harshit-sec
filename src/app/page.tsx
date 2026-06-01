'use client';

import { useState, useEffect, useRef } from 'react';
import { 
  Shield, 
  Terminal as TermIcon, 
  Cpu, 
  Database, 
  Github, 
  Linkedin, 
  Mail, 
  ExternalLink, 
  CheckCircle2, 
  AlertTriangle, 
  Radio, 
  Lock, 
  Unlock, 
  Search, 
  Key, 
  Award, 
  BookOpen, 
  ChevronRight, 
  Send,
  Flag,
  Binary,
  Layers,
  Sparkles
} from 'lucide-react';
import CustomCursor from '../components/CustomCursor';
import CyberBackground from '../components/CyberBackground';
import LoadingScreen from '../components/LoadingScreen';

// Mock Cybersecurity Projects
const PROJECTS = [
  {
    id: 'vulnradar',
    title: 'VulnRadar — Automated Pentest Agent',
    description: 'An AI-driven vulnerability analysis scanner designed to crawl subdomains, perform active network scanning, and automatically suggest customized threat mitigation strategies.',
    scanType: 'External Vulnerability Assessment',
    status: 'ACTIVE',
    severity: 'MEDIUM風險 (Patched)',
    tags: ['Python', 'Docker', 'OWASP TOP 10', 'AI-Triage'],
    github: 'https://github.com/harshshrii-2000/Portfolio',
    stats: { scanned: 412, vulnerabilities: 12 }
  },
  {
    id: 'deforensics',
    title: 'DeForensics Suite',
    description: 'A light, high-performance toolkit for RAM capture, basic registry forensic analysis, and file system carving following a mock digital intrusion incident.',
    scanType: 'Incident Response & Analysis',
    status: 'COMPLETED',
    severity: 'STABLE',
    tags: ['Go', 'Memory Carving', 'Windows Internals'],
    github: 'https://github.com/harshshrii-2000/Portfolio',
    stats: { processedFiles: 18450, signaturesFound: 8 }
  },
  {
    id: 'cryptid',
    title: 'CryptID: Dynamic ROT-AES Hybrid Encrypter',
    description: 'A high-speed secure messaging protocol using a hybrid cryptosystem with client-side key generation, supporting salt customization.',
    scanType: 'Cryptography & Protocol Design',
    status: 'COMPLETED',
    severity: 'MILITARY_GRADE',
    tags: ['TypeScript', 'Web Crypto API', 'SubtleCrypto'],
    github: 'https://github.com/harshshrii-2000/Portfolio',
    stats: { keyBitSize: 256, encryptSpeedMs: 1.4 }
  },
  {
    id: 'osint-tracker',
    title: 'SubFinder-Pro (OSINT Scout)',
    description: 'A recursive subdomain finder and passive DNS harvester, performing fast asset mapping, MX records checks, and visual correlation nodes visualization.',
    scanType: 'Reconnaissance & OSINT',
    status: 'STABLE',
    tags: ['Python', 'Flask', 'API Integration', 'DNS Recon'],
    github: 'https://github.com/harshshrii-2000/Portfolio',
    stats: { apiEndpoints: 14, reqPerSec: 150 }
  }
];

// Interactive Terminal Presets
const TERMINAL_PRESETS = [
  { 
    cmd: 'help', 
    label: 'Help Desk', 
    output: [
      'AVAILABLE MODULES FOR SECURITY AUDIT:',
      '  - scan       Initiate local vulnerabilities scanner',
      '  - profile    Display Harshit Shrivastav academic dossier',
      '  - clear      Clear console screen memory',
      '  - decode     Crack rot13 cryptograms',
      '  - sysinfo    Fetch active runtime environment variables'
    ] 
  },
  {
    cmd: 'scan',
    label: 'Execute Port Audit',
    output: [
      '★ LAUNCHING VULNERABILITY PORT SCANNER...',
      '[!] Requesting network handshake with local host 0.0.0.0:3000',
      '[+] PORT 80/TCP  [SSH]  - Filtered',
      '[+] PORT 443/TCP [HTTPS] - Securing Handshake... Certificate Valid ✓',
      '[+] PORT 3000/TCP [NEXTJS-DEV] - Operational & Optimized',
      '[OK] Audit completed. Threat level: Safe (0 critical CVE vulnerabilities found)'
    ]
  },
  {
    cmd: 'profile',
    label: 'Analyze Developer',
    output: [
      'NAME: Harshit Shrivastav',
      'DEGREE: B.Tech CSE (Cyber Security) - Galgotias University',
      'SPECIALTIES:',
      '  ✔ Web Application Penetration Testing',
      '  ✔ Threat Intelligence, Reverse Engineering & Malware Analysis',
      '  ✔ Digital Forensics & Advanced Incident Handling',
      '  ✔ OSINT & Asset Mapping Protocol Design',
      'CTF TEAM RANKING: Elite Hacker Rank (Targeting Level 300+)'
    ]
  },
  {
    cmd: 'sysinfo',
    label: 'Fetch OS Meta',
    output: [
      'HOST: Cloud Run Sandboxed Environment',
      'PORT BINDING: Exclusively mapped over Port 3000 via NGINX proxy',
      'DATABASE SERVICE: In-memory stubs and Local Host cache activated',
      'API ROUTER: Active Gateway client with standard SSL layer'
    ]
  }
];

const CERTIFICATIONS = [
  { name: 'Certified Ethical Hacker (CEH) - In Progress', issuer: 'EC-Council Partner Training', year: '2025' },
  { name: 'eLearnSecurity Junior Penetration Tester (eJPT)', issuer: 'INE Security', year: '2025' },
  { name: 'Web Application Security & Academy', issuer: 'PortSwigger certified training', year: '2024' },
  { name: 'Advanced Digital Forensics Practical', issuer: 'University Hacking Unit', year: '2024' }
];

export default function Page() {
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<'offensive' | 'defensive'>('offensive');
  const [interactiveLog, setInteractiveLog] = useState<string[]>([
    'Type "help" or select a quick command below to begin auditing...',
  ]);
  const [customInput, setCustomInput] = useState('');
  const [contactName, setContactName] = useState('');
  const [contactEmail, setContactEmail] = useState('');
  const [contactMessage, setContactMessage] = useState('');
  const [guestMessages, setGuestMessages] = useState<{ id: string; name: string; msg: string; timestamp: string }[]>([
    { id: '1', name: 'Dr. Alok Verma', msg: 'Deep research into Web Security protocols is quite impressive. Keep securing systems!', timestamp: '2026-05-31 14:20' },
    { id: '2', name: 'CyberSec_Enthusiast', msg: 'Fascinating terminal layout design. Standalone Next.js deployment loads super fast!', timestamp: '2026-06-01 09:12' }
  ]);
  
  // Custom decryption code game state
  const [cipherInput, setCipherInput] = useState('Uryyb Sryjbj Unpxre!');
  const [cipherOutput, setCipherOutput] = useState('');
  const [formSubmitted, setFormSubmitted] = useState(false);

  const terminalEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (terminalEndRef.current) {
      terminalEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [interactiveLog]);

  const runCommand = (cmdStr: string) => {
    const sanitized = cmdStr.trim().toLowerCase();
    setInteractiveLog(prev => [...prev, `guest_user@cyber_node $ ${cmdStr}`]);
    
    if (sanitized === 'clear') {
      setInteractiveLog([]);
      return;
    }

    if (sanitized.startsWith('decode ')) {
      const textToDecode = cmdStr.substring(7);
      const rot13 = textToDecode.replace(/[a-zA-Z]/g, (char) => {
        const code = char.charCodeAt(0);
        const base = char <= 'Z' ? 65 : 97;
        return String.fromCharCode(((code - base + 13) % 26) + base);
      });
      setInteractiveLog(prev => [...prev, `[DECRYPTION ENGINE]: ${rot13}`]);
      return;
    }

    const preset = TERMINAL_PRESETS.find(p => p.cmd === sanitized);
    if (preset) {
      setTimeout(() => {
        setInteractiveLog(prev => [...prev, ...preset.output]);
      }, 100);
    } else {
      setTimeout(() => {
        setInteractiveLog(prev => [
          ...prev, 
          `[!] Command not found: "${cmdStr}". Type "help" to view diagnostic services.`
        ]);
      }, 100);
    }
  };

  const handleTerminalSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!customInput.trim()) return;
    runCommand(customInput);
    setCustomInput('');
  };

  const handleRot13Decrypt = () => {
    const decoded = cipherInput.replace(/[a-zA-Z]/g, (char) => {
      const code = char.charCodeAt(0);
      const base = char <= 'Z' ? 65 : 97;
      return String.fromCharCode(((code - base + 13) % 26) + base);
    });
    setCipherOutput(decoded);
  };

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!contactName || !contactMessage) return;
    
    // Auto encrypt mock animation in terminal
    setInteractiveLog(prev => [
      ...prev,
      `[!] Incoming secure submission from ${contactName}`,
      `[*] Encrypting communication payload via client-side keys...`,
      `[SUCCESS] Connection secure. Data packet delivered safely to terminal backup.`
    ]);

    const newMessage = {
      id: Date.now().toString(),
      name: contactName,
      msg: contactMessage,
      timestamp: new Date().toISOString().replace('T', ' ').substring(0, 16)
    };

    setGuestMessages(prev => [newMessage, ...prev]);
    setContactName('');
    setContactMessage('');
    setFormSubmitted(true);
    setTimeout(() => {
      setFormSubmitted(false);
    }, 5000);
  };

  return (
    <main className="relative min-h-screen bg-cyber-dark text-slate-100 overflow-hidden select-none select-text">
      {/* Background and Cursor */}
      <CyberBackground />
      <CustomCursor />

      {/* Loading Screen Overlay */}
      {loading && <LoadingScreen onComplete={() => setLoading(false)} />}

      {/* Hero Header Glows */}
      <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-hero-gradient pointer-events-none z-0 rounded-full opacity-40 blur-3xl" />
      
      <div className={`relative z-10 w-full max-w-7xl mx-auto px-4 py-8 md:py-16 transition-opacity duration-1000 ${loading ? 'opacity-0' : 'opacity-100'}`}>
        
        {/* Navigation / Header */}
        <header id="nav-header" className="flex flex-col md:flex-row justify-between items-center border-b border-cyber-green/20 pb-6 mb-12 sm:mb-16 gap-4">
          <div className="flex items-center gap-3">
            <div className="p-2 border border-cyber-green/30 bg-cyber-dark/80 rounded shadow-[0_0_15px_rgba(0,255,102,0.1)]">
              <Shield className="w-8 h-8 text-cyber-green animate-pulse" />
            </div>
            <div>
              <span className="text-xl font-bold tracking-wider text-white font-mono flex items-center gap-2">
                HARSHIT_SEC <span className="text-[10px] bg-cyber-green/10 text-cyber-green px-1.5 py-0.5 rounded border border-cyber-green/20">LIVE</span>
              </span>
              <p className="text-xs text-cyber-blue font-mono">B.TECH CSE (CYBER SECURITY) • PORTFOLIO</p>
            </div>
          </div>
          
          <div className="flex items-center gap-4 text-xs font-mono">
            <div className="flex items-center gap-2 px-3 py-1.5 border border-cyber-blue/30 rounded bg-cyber-blue/5">
              <Radio className="w-3.5 h-3.5 text-cyber-blue animate-ping" />
              <span className="text-slate-300">SECURE SHELL GATEWAY: ACTIVE</span>
            </div>
            <a 
              href="https://github.com/harshshrii-2000" 
              target="_blank" 
              rel="noopener noreferrer"
              className="p-2 border border-cyber-green/30 rounded text-cyber-green hover:bg-cyber-green/10 transition duration-300"
              title="GitHub Profile"
            >
              <Github className="w-5 h-5" />
            </a>
          </div>
        </header>

        {/* Hero Section & Cyber Status Hub */}
        <section id="hero" className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-16 items-start">
          
          {/* Glitch Promo & Personal Meta */}
          <div className="lg:col-span-7 space-y-6">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-cyber-green/10 border border-cyber-green/30 rounded-full">
              <Binary className="w-3.5 h-3.5 text-cyber-green animate-pulse" />
              <span className="text-[10px] font-mono font-semibold tracking-wider text-cyber-green uppercase">SECURITY PORTFOLIO v1.0.4</span>
            </div>
            
            <h1 className="text-4xl sm:text-6xl font-extrabold font-mono text-white leading-tight tracking-tight">
              HARSHIT <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyber-green via-cyan-400 to-cyber-blue">SHRIVASTAV</span>
            </h1>
            
            <p className="text-base sm:text-lg text-slate-300 leading-relaxed max-w-2xl">
              Ethical Hacker and Cyber Security Researcher specialized in vulnerability mitigation, penetration auditing, and digital system defense. Deeply interested in exploring intricate vulnerability patterns, reverse engineering code anomalies, and securing distributed web infrastructure.
            </p>

            {/* Quick Cyber Metric Counters */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-4">
              <div className="p-4 border border-cyber-green/20 rounded bg-cyber-card/60 backdrop-blur">
                <div className="text-2xl font-bold text-cyber-green font-mono">300+</div>
                <div className="text-[10px] tracking-wider uppercase text-slate-400 font-mono">CTF Flags Captured</div>
              </div>
              <div className="p-4 border border-cyber-blue/20 rounded bg-cyber-card/60 backdrop-blur">
                <div className="text-2xl font-bold text-cyber-blue font-mono">20+</div>
                <div className="text-[10px] tracking-wider uppercase text-slate-400 font-mono">Security Tools Built</div>
              </div>
              <div className="p-4 border border-cyber-purple/20 rounded bg-cyber-card/60 backdrop-blur">
                <div className="text-2xl font-bold text-cyber-purple font-mono">15+</div>
                <div className="text-[10px] tracking-wider uppercase text-slate-400 font-mono">Vulnerabilities Solved</div>
              </div>
              <div className="p-4 border border-cyber-red/20 rounded bg-cyber-card/60 backdrop-blur">
                <div className="text-2xl font-bold text-cyber-red font-mono">Top Rank</div>
                <div className="text-[10px] tracking-wider uppercase text-slate-400 font-mono">Hacking Platforms</div>
              </div>
            </div>

            {/* Platform / Location tags */}
            <div className="flex flex-wrap gap-2 text-xs font-mono pt-2">
              <div className="px-3 py-1.5 rounded bg-cyber-gray/50 border border-slate-800 text-slate-300 flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-cyber-green" />
                <span>Galgotias University</span>
              </div>
              <div className="px-3 py-1.5 rounded bg-cyber-gray/50 border border-slate-800 text-slate-300 flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-cyber-blue" />
                <span>Web Application Hacking</span>
              </div>
              <div className="px-3 py-1.5 rounded bg-cyber-gray/50 border border-slate-800 text-slate-300 flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-cyber-purple" />
                <span>OSINT Specialist</span>
              </div>
            </div>
          </div>

          {/* Interactive Secure System Terminal */}
          <div className="lg:col-span-5 w-full">
            <div className="border border-cyber-green/30 rounded-lg overflow-hidden bg-black/80 backdrop-blur flex flex-col shadow-[0_0_30px_rgba(0,255,102,0.1)]">
              {/* Header bar */}
              <div className="bg-cyber-gray/80 border-b border-cyber-green/20 px-4 py-2.5 flex justify-between items-center">
                <span className="text-xs text-cyber-green font-mono flex items-center gap-2">
                  <TermIcon className="w-4 h-4 text-cyber-green shrink-0 animate-pulse" />
                  <span>harshit@gu-terminal: ~</span>
                </span>
                <div className="flex items-center gap-1.5">
                  <div className="w-2.5 h-2.5 rounded-full bg-red-500/80" />
                  <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/80" />
                  <div className="w-2.5 h-2.5 rounded-full bg-cyber-green/80" />
                </div>
              </div>

              {/* Terminal Logs */}
              <div className="p-4 font-mono text-xs space-y-2 h-[260px] overflow-y-auto bg-black/90 scrollbar-mini select-text">
                {interactiveLog.map((line, idx) => (
                  <div 
                    key={idx} 
                    className={`${
                      line.startsWith('[!]') ? 'text-cyber-red' : 
                      line.startsWith('[*]') ? 'text-cyan-400' :
                      line.startsWith('[SUCCESS]') || line.startsWith('[OK]') ? 'text-cyber-green' : 
                      line.startsWith('guest_user@') ? 'text-cyber-blue' : 'text-slate-300'
                    }`}
                  >
                    <span>{line}</span>
                  </div>
                ))}
                <div ref={terminalEndRef} />
              </div>

              {/* Shell Quick Presets Actions */}
              <div className="p-3 bg-cyber-gray/40 border-t border-cyber-green/10 flex flex-wrap gap-1.5">
                {TERMINAL_PRESETS.map((p) => (
                  <button
                    key={p.cmd}
                    onClick={() => runCommand(p.cmd)}
                    className="px-2.5 py-1 text-[10px] font-mono border border-cyber-green/30 bg-cyber-green/5 hover:bg-cyber-green/20 text-cyber-green rounded transition"
                  >
                    {p.cmd}
                  </button>
                ))}
                <button
                  type="button"
                  onClick={() => runCommand('clear')}
                  className="px-2.5 py-1 text-[10px] font-mono border border-cyber-red/30 bg-cyber-red/5 hover:bg-cyber-red/20 text-cyber-red rounded transition ml-auto"
                >
                  clear
                </button>
              </div>

              {/* Command Prompt Form */}
              <form onSubmit={handleTerminalSubmit} className="flex border-t border-cyber-green/20">
                <span className="p-3 text-cyber-green/60 font-mono text-xs select-none bg-black/40 border-r border-cyber-green/20 shrink-0">
                  $
                </span>
                <input
                  type="text"
                  placeholder="Type shell command here..."
                  className="flex-1 p-3 bg-black/60 text-cyber-green font-mono text-xs placeholder-slate-600 focus:outline-none focus:ring-0 focus:border-transparent select-text"
                  value={customInput}
                  onChange={(e) => setCustomInput(e.target.value)}
                />
              </form>
            </div>
          </div>

        </section>

        {/* Security Fields & Skill Vectors Slider */}
        <section id="skills" className="mb-16">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-8 gap-4 border-b border-cyber-green/10 pb-4">
            <div>
              <h2 className="text-2xl font-bold font-mono tracking-tight text-white flex items-center gap-2">
                <Shield className="w-6 h-6 text-cyber-green" />
                <span>SECURITY AUDIT PROFILE</span>
              </h2>
              <p className="text-xs text-slate-400 font-mono mt-1">Select specialized unit to decrypt metrics dashboard</p>
            </div>

            <div className="flex bg-cyber-card/80 border border-slate-800 p-1 rounded-lg">
              <button
                onClick={() => setActiveTab('offensive')}
                className={`px-4 py-2 rounded text-xs font-mono font-semibold transition ${
                  activeTab === 'offensive' ? 'bg-cyber-green/10 text-cyber-green border border-cyber-green/20' : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                📁 Offensive Pentesting
              </button>
              <button
                onClick={() => setActiveTab('defensive')}
                className={`px-4 py-2 rounded text-xs font-mono font-semibold transition ${
                  activeTab === 'defensive' ? 'bg-cyber-blue/10 text-cyber-blue border border-cyber-blue/20' : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                🛡 Defensive Engineering
              </button>
            </div>
          </div>

          {activeTab === 'offensive' ? (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="cyber-card p-6 flex flex-col justify-between">
                <div>
                  <div className="flex items-center gap-2.5 mb-3">
                    <TermIcon className="w-5 h-5 text-cyber-green" />
                    <h3 className="text-sm font-semibold tracking-wider uppercase text-white font-mono">Web Pentesting</h3>
                  </div>
                  <p className="text-xs text-slate-400 leading-relaxed mb-4">
                    Experienced with auditing OWASP Top 10 vulnerabilities (SQLi, XSS, CSRF, insecure direct object references, deserialization errors). Skilled with industry-standard auditing suites.
                  </p>
                </div>
                <div className="space-y-2 pt-2">
                  <div className="h-1 bg-cyber-gray/30 rounded-full overflow-hidden">
                    <div className="h-full bg-cyber-green rounded-full shadow-[0_0_8px_rgba(0,255,102,0.5)]" style={{ width: '90%' }} />
                  </div>
                  <div className="flex justify-between text-[10px] font-mono text-slate-500">
                    <span>proficiency</span>
                    <span>90% (Elite)</span>
                  </div>
                </div>
              </div>

              <div className="cyber-card p-6 flex flex-col justify-between">
                <div>
                  <div className="flex items-center gap-2.5 mb-3">
                    <Search className="w-5 h-5 text-cyber-green" />
                    <h3 className="text-sm font-semibold tracking-wider uppercase text-white font-mono">OSINT & Network Recon</h3>
                  </div>
                  <p className="text-xs text-slate-400 leading-relaxed mb-4">
                    Utilizing DNS tracing, historical caches, metadata harvesting, and network asset scanning to trace digital trails and identify exposed attack surfaces passively.
                  </p>
                </div>
                <div className="space-y-2 pt-2">
                  <div className="h-1 bg-cyber-gray/30 rounded-full overflow-hidden">
                    <div className="h-full bg-cyber-green rounded-full shadow-[0_0_8px_rgba(0,255,102,0.5)]" style={{ width: '85%' }} />
                  </div>
                  <div className="flex justify-between text-[10px] font-mono text-slate-500">
                    <span>proficiency</span>
                    <span>85% (Advanced)</span>
                  </div>
                </div>
              </div>

              <div className="cyber-card p-6 flex flex-col justify-between">
                <div>
                  <div className="flex items-center gap-2.5 mb-3">
                    <Key className="w-5 h-5 text-cyber-green" />
                    <h3 className="text-sm font-semibold tracking-wider uppercase text-white font-mono">Malware Reverse Eng</h3>
                  </div>
                  <p className="text-xs text-slate-400 leading-relaxed mb-4">
                    Static and dynamic analysis of binary behavior, unpacking obfuscated payloads, decompiling assemblies, and exploring exploit proof-of-concepts inside sandboxed environments.
                  </p>
                </div>
                <div className="space-y-2 pt-2">
                  <div className="h-1 bg-cyber-gray/30 rounded-full overflow-hidden">
                    <div className="h-full bg-cyber-green rounded-full shadow-[0_0_8px_rgba(0,255,102,0.5)]" style={{ width: '75%' }} />
                  </div>
                  <div className="flex justify-between text-[10px] font-mono text-slate-500">
                    <span>proficiency</span>
                    <span>75% (Proficient)</span>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="cyber-card-blue p-6 flex flex-col justify-between">
                <div>
                  <div className="flex items-center gap-2.5 mb-3">
                    <Database className="w-5 h-5 text-cyber-blue" />
                    <h3 className="text-sm font-semibold tracking-wider uppercase text-white font-mono">Digital Forensics</h3>
                  </div>
                  <p className="text-xs text-slate-400 leading-relaxed mb-4">
                    Memory acquisition, artifact discovery inside file tables, forensic recovery of digital traces, log analysis across operating system databases, and building intrusion evidence reports.
                  </p>
                </div>
                <div className="space-y-2 pt-2">
                  <div className="h-1 bg-cyber-gray/30 rounded-full overflow-hidden">
                    <div className="h-full bg-cyber-blue rounded-full shadow-[0_0_8px_rgba(0,240,255,0.5)]" style={{ width: '85%' }} />
                  </div>
                  <div className="flex justify-between text-[10px] font-mono text-slate-500">
                    <span>proficiency</span>
                    <span>85% (Advanced)</span>
                  </div>
                </div>
              </div>

              <div className="cyber-card-blue p-6 flex flex-col justify-between">
                <div>
                  <div className="flex items-center gap-2.5 mb-3">
                    <Cpu className="w-5 h-5 text-cyber-blue" />
                    <h3 className="text-sm font-semibold tracking-wider uppercase text-white font-mono">Intrusion Auditing (IDS)</h3>
                  </div>
                  <p className="text-xs text-slate-400 leading-relaxed mb-4">
                    Deploying host and network intrusion detection systems, setting up rules files, configuring firewall alerts grids, and monitoring anomalies for incident response.
                  </p>
                </div>
                <div className="space-y-2 pt-2">
                  <div className="h-1 bg-cyber-gray/30 rounded-full overflow-hidden">
                    <div className="h-full bg-cyber-blue rounded-full shadow-[0_0_8px_rgba(0,240,255,0.5)]" style={{ width: '80%' }} />
                  </div>
                  <div className="flex justify-between text-[10px] font-mono text-slate-500">
                    <span>proficiency</span>
                    <span>80% (Advanced)</span>
                  </div>
                </div>
              </div>

              <div className="cyber-card-blue p-6 flex flex-col justify-between">
                <div>
                  <div className="flex items-center gap-2.5 mb-3">
                    <Layers className="w-5 h-5 text-cyber-blue" />
                    <h3 className="text-sm font-semibold tracking-wider uppercase text-white font-mono">Secure Coding</h3>
                  </div>
                  <p className="text-xs text-slate-400 leading-relaxed mb-4">
                    Integrating encryption algorithms, static analysis checkers into pipelines, applying least privilege principles, and securing backends with sanitizers and isolated process spaces.
                  </p>
                </div>
                <div className="space-y-2 pt-2">
                  <div className="h-1 bg-cyber-gray/30 rounded-full overflow-hidden">
                    <div className="h-full bg-cyber-blue rounded-full shadow-[0_0_8px_rgba(0,240,255,0.5)]" style={{ width: '75%' }} />
                  </div>
                  <div className="flex justify-between text-[10px] font-mono text-slate-500">
                    <span>proficiency</span>
                    <span>75% (Proficient)</span>
                  </div>
                </div>
              </div>
            </div>
          )}
        </section>

        {/* Selected Projects Grid */}
        <section id="projects" className="mb-16">
          <div className="border-b border-cyber-green/10 pb-4 mb-8">
            <h2 className="text-2xl font-bold font-mono tracking-tight text-white flex items-center gap-2">
              <Cpu className="w-6 h-6 text-cyber-green" />
              <span>OFFENSIVE / DEFENSIVE PROJECT REPOSITORY</span>
            </h2>
            <p className="text-xs text-slate-400 font-mono mt-1">Click External Link icon to replicate code or review files</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {PROJECTS.map((proj) => (
              <div 
                key={proj.id} 
                className="group border border-slate-800 bg-cyber-card/40 hover:border-cyber-green/30 rounded-lg p-6 flex flex-col justify-between relative overflow-hidden transition duration-300"
              >
                {/* Visual scan indicator */}
                <div className="absolute top-0 right-0 w-24 h-24 bg-radial-glow pointer-events-none opacity-0 group-hover:opacity-100 transition duration-500" />
                
                <div>
                  <div className="flex justify-between items-start mb-3">
                    <span className="text-[10px] font-mono px-2 py-0.5 bg-cyber-gray text-cyber-blue rounded border border-slate-800">
                      {proj.scanType}
                    </span>
                    <span className={`text-[9px] font-mono px-2 py-0.5 rounded ${
                      proj.status === 'ACTIVE' ? 'bg-cyber-green/10 text-cyber-green border border-cyber-green/20' : 'bg-cyber-gray text-slate-400 border border-slate-700'
                    }`}>
                      {proj.status}
                    </span>
                  </div>

                  <h3 className="text-base font-bold font-mono text-white mb-2 group-hover:text-cyber-green transition duration-200">
                    {proj.title}
                  </h3>

                  <p className="text-xs text-slate-400 leading-relaxed mb-4">
                    {proj.description}
                  </p>
                </div>

                <div>
                  {/* Dynamic stats tracker indicator */}
                  {proj.stats && (
                    <div className="grid grid-cols-2 gap-2 bg-black/40 border border-slate-900 rounded p-2 mb-4 text-[10px] font-mono">
                      {Object.entries(proj.stats).map(([k, v]) => (
                        <div key={k} className="flex justify-between px-1">
                          <span className="text-slate-500 uppercase">{k.replace(/([A-Z])/g, ' $1')}</span>
                          <span className="text-cyber-green font-semibold">{v}</span>
                        </div>
                      ))}
                    </div>
                  )}

                  <div className="flex items-center justify-between border-t border-slate-800/60 pt-3">
                    <div className="flex flex-wrap gap-1">
                      {proj.tags.map((tag) => (
                        <span key={tag} className="text-[9px] font-mono text-slate-400 px-1.5 py-0.5 bg-cyber-gray/30 rounded border border-slate-800">
                          {tag}
                        </span>
                      ))}
                    </div>

                    <a 
                      href={proj.github} 
                      target="_blank" 
                      rel="noopener noreferrer" 
                      className="p-1.5 text-cyber-green hover:bg-cyber-green/10 rounded transition"
                      title="Inspect Exploit Code"
                    >
                      <ExternalLink className="w-4 h-4" />
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Cryptography Sandbox & Academic Accolades */}
        <section className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-16">
          
          {/* Certifications & Academic Dossier */}
          <div className="lg:col-span-6 space-y-6">
            <div className="border-b border-cyber-green/10 pb-4">
              <h2 className="text-2xl font-bold font-mono tracking-tight text-white flex items-center gap-2">
                <Award className="w-6 h-6 text-cyber-green" />
                <span>ACCOLADES & PRE-VEILLANCE</span>
              </h2>
              <p className="text-xs text-slate-400 font-mono mt-1">Credentials and academic focus targets</p>
            </div>

            <div className="space-y-4">
              {CERTIFICATIONS.map((cert, index) => (
                <div key={index} className="flex items-start gap-4 p-4 rounded bg-cyber-card/30 border border-slate-800">
                  <div className="p-2 border border-cyber-green/20 bg-cyber-green/5 text-cyber-green rounded">
                    <CheckCircle2 className="w-4 h-4 text-cyber-green shrink-0" />
                  </div>
                  <div>
                    <h4 className="text-xs sm:text-sm font-semibold font-mono text-white leading-snug">{cert.name}</h4>
                    <p className="text-[10px] text-slate-400 font-mono mt-0.5">{cert.issuer} • {cert.year}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="p-5 border border-slate-800 bg-cyber-card/20 rounded-lg space-y-3">
              <div className="flex items-center gap-2">
                <BookOpen className="w-4 h-4 text-cyber-blue" />
                <span className="text-xs font-semibold font-mono text-white">Galgotias University • B.Tech CSE (Cyber Security)</span>
              </div>
              <p className="text-xs text-slate-400 leading-relaxed">
                Focus on Cryptography, Advanced System Forensics, Secure App Architecture, and Network Audits. Exploring practical methodologies via CTFs, community collaborations, and secure development pipelines.
              </p>
            </div>
          </div>

          {/* Interactive Cryptography ROT-13 Tool Widget */}
          <div className="lg:col-span-6">
            <div className="border border-cyber-blue/30 rounded-lg overflow-hidden bg-black/80 backdrop-blur shadow-[0_0_30px_rgba(0,240,255,0.08)]">
              <div className="bg-cyber-gray/80 border-b border-cyber-blue/20 px-4 py-2.5 flex justify-between items-center">
                <span className="text-xs text-cyber-blue font-mono flex items-center gap-2">
                  <Lock className="w-4 h-4 text-cyber-blue shrink-0" />
                  <span>DECRYPTOR TOOL : SHIFT-ROT13 MODULE</span>
                </span>
                <span className="text-[9px] bg-cyber-blue/10 text-cyber-blue px-1.5 py-0.5 rounded border border-cyber-blue/20 font-mono">
                  AES READY
                </span>
              </div>

              <div className="p-6 space-y-4 font-mono text-xs">
                <p className="text-slate-400">
                  Test standard payload shift: enter cipher text below to instantly execute a dynamic cryptographic decoding algorithm.
                </p>

                <div className="space-y-1.5">
                  <label className="text-slate-400 text-[10px] uppercase tracking-wider">Input Ciphertext</label>
                  <input 
                    type="text" 
                    value={cipherInput}
                    onChange={(e) => setCipherInput(e.target.value)}
                    className="w-full p-2.5 bg-black border border-cyber-blue/20 rounded text-cyber-blue placeholder-slate-700 font-mono text-xs focus:outline-none focus:border-cyber-blue"
                  />
                </div>

                <button
                  type="button"
                  onClick={handleRot13Decrypt}
                  className="w-full py-2.5 bg-cyber-blue/10 hover:bg-cyber-blue/20 text-cyber-blue border border-cyber-blue/30 rounded font-mono font-bold tracking-wider transition uppercase"
                >
                  🔓 Decrypt Cryptogram
                </button>

                {cipherOutput && (
                  <div className="p-3 bg-cyan-950/20 border border-cyber-blue/30 rounded space-y-1">
                    <span className="text-[9px] uppercase tracking-wider text-slate-500">Decoded Payload</span>
                    <div className="text-cyber-green text-sm font-semibold tracking-wider p-2 bg-black/60 rounded">
                      {cipherOutput}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </section>

        {/* Contact Hacking Shell & Guestbook Logs */}
        <section id="contact" className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-16">
          
          {/* Guestbook Messages Log */}
          <div className="lg:col-span-5 space-y-6">
            <div className="border-b border-cyber-green/10 pb-4">
              <h2 className="text-2xl font-bold font-mono tracking-tight text-white flex items-center gap-2">
                <TermIcon className="w-6 h-6 text-cyber-green" />
                <span>DECRYPTED VISITOR LOGS</span>
              </h2>
              <p className="text-xs text-slate-400 font-mono mt-1">Real-time feedback secured via cryptography</p>
            </div>

            <div className="space-y-4 max-h-[360px] overflow-y-auto pr-2 scrollbar-mini">
              {guestMessages.map((msg) => (
                <div key={msg.id} className="p-4 border border-slate-800 bg-cyber-card/20 rounded-md space-y-2">
                  <div className="flex justify-between items-center text-[10px] font-mono">
                    <span className="text-cyber-blue font-semibold">{msg.name}</span>
                    <span className="text-slate-500">{msg.timestamp}</span>
                  </div>
                  <p className="text-xs text-slate-300 leading-relaxed italic bg-black/30 p-2.5 rounded border border-slate-900">
                    &ldquo;{msg.msg}&rdquo;
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Secure Email Broadcast Console Container */}
          <div className="lg:col-span-7">
            <div className="border border-cyber-green/30 rounded-lg overflow-hidden bg-black/80 backdrop-blur shadow-[0_0_30px_rgba(0,255,102,0.08)]">
              <div className="bg-cyber-gray/80 border-b border-cyber-green/20 px-4 py-2.5 flex justify-between items-center">
                <span className="text-xs text-cyber-green font-mono flex items-center gap-2">
                  <Shield className="w-4 h-4 text-cyber-green" />
                  <span>TRANSMIT SYSTEM BROADCAST</span>
                </span>
                <span className="text-[9px] bg-cyber-green/10 text-cyber-green px-1.5 py-0.5 rounded border border-cyber-green/20 font-mono">
                  CIPHER WRITER
                </span>
              </div>

              <form onSubmit={handleSendMessage} className="p-6 space-y-4 font-mono text-xs">
                
                <p className="text-slate-400">
                  Transmit secure system feedback, collaborative CTF requests, or security audits inquiry directly to Harshit&apos;s secure terminal mailbox.
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="text-slate-400 text-[10px] uppercase tracking-wider">Ident Unit Name</label>
                    <input 
                      type="text" 
                      placeholder="e.g. Guest Auditor" 
                      required
                      value={contactName}
                      onChange={(e) => setContactName(e.target.value)}
                      className="w-full p-2.5 bg-black border border-cyber-green/20 rounded text-cyber-green placeholder-slate-700 font-mono text-xs focus:outline-none focus:border-cyber-green"
                    />
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-slate-400 text-[10px] uppercase tracking-wider">Access Email Offset</label>
                    <input 
                      type="email" 
                      placeholder="e.g. expert@security.unit" 
                      required
                      value={contactEmail}
                      onChange={(e) => setContactEmail(e.target.value)}
                      className="w-full p-2.5 bg-black border border-cyber-green/20 rounded text-cyber-green placeholder-slate-700 font-mono text-xs focus:outline-none focus:border-cyber-green"
                    />
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label className="text-slate-400 text-[10px] uppercase tracking-wider">Communication Payload</label>
                  <textarea 
                    rows={4}
                    placeholder="Enter encrypted text or messages audit queries..." 
                    required
                    value={contactMessage}
                    onChange={(e) => setContactMessage(e.target.value)}
                    className="w-full p-2.5 bg-black border border-cyber-green/20 rounded text-cyber-green placeholder-slate-700 font-mono text-xs focus:outline-none focus:border-cyber-green resize-none"
                  />
                </div>

                {formSubmitted && (
                  <div className="p-3 bg-cyber-green/10 border border-cyber-green/30 text-cyber-green rounded font-mono text-center text-xs animate-shake">
                    [✔] COMMUNICATION SECURED. PAYLOAD DELIVERED SAFELY TO TERMINAL备份 logs.
                  </div>
                )}

                <button
                  type="submit"
                  className="w-full py-3 bg-cyber-green/10 hover:bg-cyber-green/20 text-cyber-green border border-cyber-green/30 rounded font-mono font-bold tracking-wider transition uppercase flex items-center justify-center gap-2 cursor-pointer"
                >
                  <Send className="w-4 h-4 text-cyber-green" />
                  <span>Transmit Encrypted Packet</span>
                </button>

              </form>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="border-t border-slate-800 pt-8 mt-16 text-center space-y-2">
          <p className="text-xs font-mono text-slate-500">
            SYSTEM CONSOLE SECURITY VERIFIED • BACKED BY STANADLONE PORT 3000 ARCHITECTURE
          </p>
          <p className="text-[10px] font-mono text-cyber-green/60 uppercase">
            © {new Date().getFullYear()} Harshit Shrivastav. Secured Endpoint Encryption. All Rights Reserved.
          </p>
        </footer>

      </div>
    </main>
  );
}
