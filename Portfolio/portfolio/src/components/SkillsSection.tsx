import React from 'react';
import { skillCategories } from '../data/config';
import { skills } from '../data/portfolio';

const SkillsSection: React.FC = () => {
  return (
    <section id="skills" className="py-20 md:py-28 px-6 max-w-5xl mx-auto scroll-mt-16 md:scroll-mt-20">
      <div className="section-label">skills.json</div>

      <div className="mb-12">
        <h2 className="text-3xl md:text-4xl font-bold text-textMain">
          Tech <span className="text-primary">stack</span>
        </h2>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {skillCategories.map(({ label, icon, items }) => (
          <div key={label} className="card p-6 group">
            <div className="flex items-center gap-3 mb-5">
              <span className="text-primary text-xl">{icon}</span>
              <span className="font-mono text-xs text-textMuted tracking-widest uppercase">
                {label}
              </span>
            </div>
            <div className="flex flex-wrap gap-2">
              {items.map((skill) => (
                <span
                  key={skill}
                  className="badge hover:border-primary/40 hover:text-textMain transition-all duration-200 cursor-default"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>
        ))}

        <div className="card p-6 sm:col-span-2 lg:col-span-1">
          <div className="flex items-center gap-3 mb-5">
            <span className="text-primary text-xl">◑</span>
            <span className="font-mono text-xs text-textMuted tracking-widest uppercase">
              All skills
            </span>
          </div>
          <div className="flex flex-wrap gap-2">
            {skills.map((skill) => (
              <span
                key={skill}
                className="badge hover:border-primary/40 hover:bg-primary/5 hover:text-primary transition-all duration-200 cursor-default"
              >
                {skill}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default SkillsSection;
