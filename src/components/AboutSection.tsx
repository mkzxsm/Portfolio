import React from 'react';
import {
  stats,
  terminalStatuses,
  aboutTags,
  aboutHeadline,
  aboutHeadlineAccent,
  aboutParagraphs,
} from '../data/config';

const renderParagraph = (text: string) => {
  const parts = text.split(/(\*[^*]+\*|~[^~]+~)/g);
  return parts.map((part, i) => {
    if (part.startsWith('*') && part.endsWith('*')) {
      return <span key={i} className="text-textMain font-medium">{part.slice(1, -1)}</span>;
    }
    if (part.startsWith('~') && part.endsWith('~')) {
      return <span key={i} className="text-primary font-mono">{part.slice(1, -1)}</span>;
    }
    return <span key={i}>{part}</span>;
  });
};

const AboutSection: React.FC = () => {
  return (
    <section id="about" className="py-20 md:py-28 px-6 max-w-5xl mx-auto scroll-mt-16 md:scroll-mt-20">
      <div className="section-label">about.md</div>

      <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 items-start">
        <div className="lg:col-span-3 space-y-5">
          <h2 className="text-3xl md:text-4xl font-bold text-textMain">
            {aboutHeadline}{' '}
            <span className="text-primary">{aboutHeadlineAccent}</span>.
          </h2>

          <div className="space-y-4 text-textMuted leading-relaxed">
            {aboutParagraphs.map((p, i) => (
              <p key={i}>{renderParagraph(p)}</p>
            ))}
          </div>

          <div className="pt-4 flex flex-wrap gap-3">
            {aboutTags.map(({ label }) => (
              <span
                key={label}
                className="font-mono text-xs px-3 py-1.5 rounded-md border border-primary/20 text-primary bg-primary/5"
              >
                {label}
              </span>
            ))}
          </div>
        </div>

        <div className="lg:col-span-2 space-y-4">
          {stats.map(({ label, value }) => (
            <div key={label} className="card p-6 flex items-center justify-between group">
              <span className="text-textMuted text-sm font-mono">{label}</span>
              <span className="text-3xl font-bold text-primary group-hover:scale-110 transition-transform duration-300">
                {value}
              </span>
            </div>
          ))}

          <div className="card p-6 font-mono text-xs space-y-2">
            <div className="flex items-center gap-2 mb-3">
              <div className="w-2 h-2 rounded-full bg-red-500" />
              <div className="w-2 h-2 rounded-full bg-yellow-500" />
              <div className="w-2 h-2 rounded-full bg-green-500" />
              <span className="text-textMuted ml-2">status.sh</span>
            </div>
            {terminalStatuses.map(({ label, color }) => (
              <div key={label} className={`terminal-line ${color}`}>
                {label}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
