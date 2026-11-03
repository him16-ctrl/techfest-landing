import React, { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { Cpu, ShieldAlert, Zap, Sparkles, ChevronRight, Terminal } from 'lucide-react';

export default function App() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [terminalInput, setTerminalInput] = useState('');
  const [terminalLogs, setTerminalLogs] = useState<string[]>([
    'System initialized: IIT Bombay Techfest Node 2026',
    'Type "help" or "events" for available commands'
  ]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let animationId: number;
    let w = (canvas.width = window.innerWidth);
    let h = (canvas.height = window.innerHeight);

    const particles: { x: number; y: number; vx: number; vy: number }[] = Array.from({ length: 60 }, () => ({
      x: Math.random() * w,
      y: Math.random() * h,
      vx: (Math.random() - 0.5) * 0.8,
      vy: (Math.random() - 0.5) * 0.8,
    }));

    const draw = () => {
      ctx!.clearRect(0, 0, w, h);
      ctx!.fillStyle = '#00F2FE';
      ctx!.strokeStyle = 'rgba(0, 242, 254, 0.15)';

      particles.forEach((p, i) => {
        p.x += p.vx;
        p.y += p.vy;
        if (p.x < 0 || p.x > w) p.vx *= -1;
        if (p.y < 0 || p.y > h) p.vy *= -1;

        ctx!.beginPath();
        ctx!.arc(p.x, p.y, 2, 0, Math.PI * 2);
        ctx!.fill();

        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[j].x - p.x;
          const dy = particles[j].y - p.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 130) {
            ctx!.beginPath();
            ctx!.moveTo(p.x, p.y);
            ctx!.lineTo(particles[j].x, particles[j].y);
            ctx!.stroke();
          }
        }
      });
      animationId = requestAnimationFrame(draw);
    };

    draw();
    const handleResize = () => {
      w = canvas.width = window.innerWidth;
      h = canvas.height = window.innerHeight;
    };
    window.addEventListener('resize', handleResize);
    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const handleTerminalSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const val = terminalInput.trim().toLowerCase();
    if (!val) return;

    let res = `Unrecognized command: "${val}". Type "help" for options.`;
    if (val === 'help') res = 'Commands: events, stats, venue, clear';
    if (val === 'events') res = 'Flagships: Robowars (120kg), International Drone League, HackAI, Technoholix';
    if (val === 'stats') res = '175,000+ Footfall | ₹50L+ Prize Pool | 2,500+ Institutes';
    if (val === 'venue') res = 'IIT Bombay, Powai, Mumbai - 400076 (19.1334° N, 72.9133° E)';
    if (val === 'clear') {
      setTerminalLogs([]);
      setTerminalInput('');
      return;
    }

    setTerminalLogs((prev) => [...prev, `> ${terminalInput}`, res]);
    setTerminalInput('');
  };

  return (
    <div className="relative min-h-screen bg-[#07080B] text-slate-100 selection:bg-cyan-400 selection:text-black">
      <canvas ref={canvasRef} className="fixed inset-0 pointer-events-none z-0 opacity-50" />

      {/* Navbar */}
      <nav className="fixed top-4 left-1/2 -translate-x-1/2 z-50 w-[92%] max-w-6xl px-6 py-3 rounded-2xl bg-black/40 backdrop-blur-xl border border-white/10 flex items-center justify-between shadow-2xl">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-cyan-400 to-fuchsia-500 flex items-center justify-center font-black text-black text-sm">
            TF
          </div>
          <span className="font-bold tracking-wider font-mono text-sm hidden sm:inline text-white">
            TECHFEST<span className="text-cyan-400">.ORG</span>
          </span>
        </div>
        <div className="flex items-center gap-6 text-xs font-mono uppercase text-gray-300">
          <a href="#events" className="hover:text-cyan-400 transition-colors hidden md:inline">Competitions</a>
          <a href="#metrics" className="hover:text-cyan-400 transition-colors hidden md:inline">Highlights</a>
          <a href="#terminal" className="hover:text-cyan-400 transition-colors">Terminal</a>
          <button className="px-4 py-2 rounded-xl bg-cyan-400 text-black font-bold hover:shadow-[0_0_20px_rgba(0,242,254,0.6)] transition-all">
            REGISTER
          </button>
        </div>
      </nav>

      {/* Hero */}
      <section className="relative z-10 min-h-screen flex flex-col justify-center items-center text-center px-4 pt-24">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-cyan-500/30 bg-cyan-950/20 backdrop-blur-md font-mono text-xs text-cyan-300 mb-6"
        >
          <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
          IIT BOMBAY // 19.1334° N, 72.9133° E
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6 }}
          className="text-5xl sm:text-7xl md:text-9xl font-black tracking-tighter uppercase max-w-6xl leading-[0.9]"
        >
          ASIA'S <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-sky-200 to-fuchsia-500">LARGEST</span> TECH FESTIVAL
        </motion.h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="mt-6 max-w-2xl text-gray-400 text-base md:text-lg font-normal"
        >
          Experience 3 days of combat robotics, international hackathons, luminaries, and techno-cultural night shows at IIT Bombay.
        </motion.p>

        <div className="mt-8 flex flex-wrap gap-4 justify-center">
          <a
            href="#events"
            className="px-8 py-3.5 rounded-xl bg-cyan-400 text-black font-mono font-bold text-sm tracking-wider hover:shadow-[0_0_25px_rgba(0,242,254,0.6)] transition-all flex items-center gap-2"
          >
            EXPLORE ARENAS <ChevronRight className="w-4 h-4" />
          </a>
          <button className="px-8 py-3.5 rounded-xl border border-white/10 bg-white/5 hover:bg-white/10 transition-all font-mono text-sm tracking-wider">
            CAMPUS AMBASSADOR
          </button>
        </div>
      </section>

      {/* Metrics */}
      <section id="metrics" className="relative z-10 py-12 border-y border-white/10 bg-black/60 backdrop-blur-md">
        <div className="max-w-6xl mx-auto px-6 grid grid-cols-2 md:grid-cols-4 gap-8 text-center font-mono">
          <div>
            <div className="text-3xl md:text-5xl font-black text-cyan-400">175K+</div>
            <div className="text-xs text-gray-400 uppercase mt-1">Footfall</div>
          </div>
          <div>
            <div className="text-3xl md:text-5xl font-black text-fuchsia-400">₹50L+</div>
            <div className="text-xs text-gray-400 uppercase mt-1">Prize Pool</div>
          </div>
          <div>
            <div className="text-3xl md:text-5xl font-black text-cyan-400">2500+</div>
            <div className="text-xs text-gray-400 uppercase mt-1">Colleges</div>
          </div>
          <div>
            <div className="text-3xl md:text-5xl font-black text-fuchsia-400">60+</div>
            <div className="text-xs text-gray-400 uppercase mt-1">Countries</div>
          </div>
        </div>
      </section>

      {/* Bento Grid */}
      <section id="events" className="relative z-10 py-24 max-w-6xl mx-auto px-6">
        <h2 className="text-3xl md:text-5xl font-black tracking-tight uppercase mb-12">
          Flagship <span className="text-cyan-400">Arenas</span>
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="md:col-span-2 p-8 rounded-3xl bg-gradient-to-br from-white/5 to-white/[0.02] border border-white/10 hover:border-cyan-400/50 transition-all group">
            <div className="flex justify-between items-start">
              <span className="p-3 rounded-2xl bg-cyan-400/10 text-cyan-400"><ShieldAlert className="w-6 h-6" /></span>
              <span className="font-mono text-xs text-gray-400 border border-white/10 px-3 py-1 rounded-full">120KG COMBAT</span>
            </div>
            <h3 className="text-2xl md:text-3xl font-black uppercase mt-12 group-hover:text-cyan-400 transition-colors">International Robowars</h3>
            <p className="text-gray-400 text-sm mt-2 max-w-md">High-impact pneumatic flippers, spinners, and titanium armor battling inside India's strongest combat enclosure.</p>
          </div>

          <div className="p-8 rounded-3xl bg-gradient-to-br from-white/5 to-white/[0.02] border border-white/10 hover:border-fuchsia-400/50 transition-all group">
            <span className="p-3 rounded-2xl bg-fuchsia-400/10 text-fuchsia-400 inline-block"><Zap className="w-6 h-6" /></span>
            <h3 className="text-2xl font-black uppercase mt-12 group-hover:text-fuchsia-400 transition-colors">Drone Racing</h3>
            <p className="text-gray-400 text-sm mt-2">FPV drone pilots maneuvering across illuminated multi-level obstacle circuits at 140+ km/h.</p>
          </div>

          <div className="p-8 rounded-3xl bg-gradient-to-br from-white/5 to-white/[0.02] border border-white/10 hover:border-cyan-400/50 transition-all group">
            <span className="p-3 rounded-2xl bg-cyan-400/10 text-cyan-400 inline-block"><Cpu className="w-6 h-6" /></span>
            <h3 className="text-2xl font-black uppercase mt-12 group-hover:text-cyan-400 transition-colors">HackAI & Web3</h3>
            <p className="text-gray-400 text-sm mt-2">36-hour sprint solving frontier challenges in LLMs, autonomous robotics, and zero-knowledge proofs.</p>
          </div>

          <div className="md:col-span-2 p-8 rounded-3xl bg-gradient-to-br from-white/5 to-white/[0.02] border border-white/10 hover:border-cyan-400/50 transition-all group">
            <div className="flex justify-between items-start">
              <span className="p-3 rounded-2xl bg-fuchsia-400/10 text-fuchsia-400"><Sparkles className="w-6 h-6" /></span>
              <span className="font-mono text-xs text-gray-400 border border-white/10 px-3 py-1 rounded-full">NIGHT SHOWS</span>
            </div>
            <h3 className="text-2xl md:text-3xl font-black uppercase mt-12 group-hover:text-fuchsia-400 transition-colors">Technoholix Nights</h3>
            <p className="text-gray-400 text-sm mt-2 max-w-md">Holographic projections, aerial acrobatics, laser stage shows, and international music performers.</p>
          </div>
        </div>
      </section>

      {/* Terminal Easter Egg */}
      <section id="terminal" className="relative z-10 py-16 max-w-4xl mx-auto px-6">
        <div className="p-6 rounded-2xl bg-black/80 border border-white/10 shadow-2xl font-mono text-sm">
          <div className="flex items-center gap-2 pb-4 border-b border-white/10 text-xs text-gray-400">
            <Terminal className="w-4 h-4 text-cyan-400" />
            <span>techfest-terminal@iitb:~</span>
          </div>
          <div className="mt-4 space-y-2 text-xs md:text-sm max-h-48 overflow-y-auto">
            {terminalLogs.map((log, i) => (
              <div key={i} className={log.startsWith('>') ? 'text-cyan-400' : 'text-gray-300'}>{log}</div>
            ))}
          </div>
          <form onSubmit={handleTerminalSubmit} className="mt-4 flex gap-2">
            <span className="text-cyan-400">&gt;</span>
            <input
              type="text"
              value={terminalInput}
              onChange={(e) => setTerminalInput(e.target.value)}
              placeholder="Type 'events', 'stats', or 'help'..."
              className="w-full bg-transparent text-white outline-none placeholder-gray-600 font-mono text-sm"
            />
          </form>
        </div>
      </section>

      {/* Footer */}
      <footer className="relative z-10 py-12 border-t border-white/10 text-center text-xs font-mono text-gray-500">
        <p>IIT Bombay Techfest Concept • Built with React & 2D Canvas</p>
      </footer>
    </div>
  );
}