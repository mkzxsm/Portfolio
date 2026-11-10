import React from 'react';
import { projects } from '../data/portfolio';
import ProjectCard from './ProjectCard';

const ProjectsSection: React.FC = () => {
  return (
    <section id="projects" className="py-20 md:py-28 px-6 max-w-5xl mx-auto scroll-mt-16 md:scroll-mt-20">
      <div className="section-label">projects.ts</div>

      <div className="flex items-end justify-between mb-12 flex-wrap gap-4">
        <h2 className="text-3xl md:text-4xl font-bold text-textMain">
          Things I've <span className="text-primary">built</span>
        </h2>
        <a
          href="https://github.com/mkzxsm"
          target="_blank"
          rel="noopener noreferrer"
          className="font-mono text-sm text-textMuted hover:text-primary transition-colors duration-300 flex items-center gap-2"
        >
          <span>view all on github</span>
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <line x1="5" y1="12" x2="19" y2="12" />
            <polyline points="12 5 19 12 12 19" />
          </svg>
        </a>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {projects.map((project, i) => (
          <ProjectCard key={project.id} project={project} index={i} />
        ))}
      </div>
    </section>
  );
};

export default ProjectsSection;
