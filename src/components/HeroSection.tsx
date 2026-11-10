import React, { useEffect, useRef, useState } from 'react';
import { person, heroTerminalLines, heroHighlights, socials } from '../data/config';

const TypewriterText: React.FC<{ text: string; delay?: number }> = ({ text, delay = 0 }) => {
  const [displayed, setDisplayed] = useState('');
  const [started, setStarted] = useState(false);

  useEffect(() => {
    const startTimer = setTimeout(() => setStarted(true), delay);
    return () => clearTimeout(startTimer);
  }, [delay]);

  useEffect(() => {
    if (!started) return;
    if (displayed.length >= text.length) return;
    const timer = setTimeout(() => {
      setDisplayed(text.slice(0, displayed.length + 1));
    }, 40);
    return () => clearTimeout(timer);
  }, [displayed, started, text]);

  return (
    <span>
      {displayed}
      {displayed.length < text.length && (
        <span className="animate-blink text-primary">|</span>
      )}
    </span>
  );
};

const HeroSection: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const githubLink = socials.find((s) => s.icon === 'github');

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    canvas.width = window.innerWidth;
    canvas.height = canvas.parentElement?.clientHeight || window.innerHeight;

    const chars = '01アイウエオカキクケコサシスセソタチツテトナニヌネノ';
    const fontSize = 13;
    const cols = Math.floor(canvas.width / fontSize);
    const drops: number[] = Array(cols).fill(1);

    const draw = () => {
      ctx.fillStyle = 'rgba(6, 10, 15, 0.05)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      ctx.fillStyle = 'rgba(0, 255, 136, 0.12)';
      ctx.font = `${fontSize}px monospace`;

      for (let i = 0; i < drops.length; i++) {
        const char = chars[Math.floor(Math.random() * chars.length)];
        ctx.fillText(char, i * fontSize, drops[i] * fontSize);
        if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
          drops[i] = 0;
        }
        drops[i]++;
      }
    };

    const interval = setInterval(draw, 55);
    const handleResize = () => {
      if (!canvas) return;
      canvas.width = window.innerWidth;
      canvas.height = canvas.parentElement?.clientHeight || window.innerHeight;
    };
    window.addEventListener('resize', handleResize);

    return () => {
      clearInterval(interval);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const firstNameDelay = 600;
  const lastNameDelay = firstNameDelay + person.firstName.length * 40 + 200;
  const contentDelay = lastNameDelay + person.lastName.length * 40 + 400;

  return (
    <section className="relative min-h-screen min-h-dvh flex flex-col justify-center items-center px-6 pt-24 pb-16 sm:pt-28 sm:pb-20 md:pt-32 md:pb-24 overflow-hidden">
      <canvas
        ref={canvasRef}
        className="absolute inset-0 opacity-30 pointer-events-none"
      />

      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-background/60 to-background pointer-events-none" />

      <div className="relative z-10 max-w-4xl w-full">
        <div className="mb-6 sm:mb-8 font-mono text-sm space-y-2 opacity-0 animate-fade-in" style={{ animationDelay: '0.2s', animationFillMode: 'forwards' }}>
          {heroTerminalLines.map(({ command, output }) => (
            <div key={command}>
              <div className="terminal-line text-textMuted">
                <span className="text-primary">{command}</span>
              </div>
              <div className="terminal-line text-textMuted pl-4 break-words">
                <span>{output}</span>
              </div>
            </div>
          ))}
        </div>

        <div className="opacity-0 animate-fade-in-up" style={{ animationDelay: '0.5s', animationFillMode: 'forwards' }}>
          <h1 className="text-4xl sm:text-6xl md:text-8xl font-bold text-textMain leading-none mb-4 tracking-tight">
            <TypewriterText text={person.firstName} delay={firstNameDelay} />
            <br />
            <span className="text-primary">
              <TypewriterText text={person.lastName} delay={lastNameDelay} />
            </span>
          </h1>
        </div>

        <div className="mt-6 sm:mt-8 opacity-0 animate-fade-in" style={{ animationDelay: `${contentDelay}ms`, animationFillMode: 'forwards' }}>
          <p className="text-textMuted text-base sm:text-lg max-w-xl leading-relaxed mb-8 sm:mb-10 font-light">
            {person.bio}
          </p>

          <div className="flex flex-col sm:flex-row gap-3">
            <a href="#projects" className="btn-primary text-center">
              ./view-projects
            </a>
            {githubLink && (
              <a
                href={githubLink.href}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-ghost text-center"
              >
                {githubLink.href.replace('https://', '')} ↗
              </a>
            )}
          </div>
        </div>

        <div className="mt-10 sm:mt-16 flex flex-wrap items-center gap-4 sm:gap-6 opacity-0 animate-fade-in" style={{ animationDelay: `${contentDelay + 400}ms`, animationFillMode: 'forwards' }}>
          {heroHighlights.map(({ label, color }) => (
            <span key={label} className={`font-mono text-xs ${color} opacity-70`}>
              {label}
            </span>
          ))}
        </div>
      </div>

      <div className="hidden md:flex absolute bottom-8 lg:bottom-10 left-1/2 -translate-x-1/2 flex-col items-center gap-2 opacity-0 animate-fade-in" style={{ animationDelay: `${contentDelay + 800}ms`, animationFillMode: 'forwards' }}>
        <span className="font-mono text-xs text-textMuted tracking-widest">scroll</span>
        <div className="w-px h-10 bg-gradient-to-b from-primary/50 to-transparent" />
      </div>
    </section>
  );
};

export default HeroSection;
