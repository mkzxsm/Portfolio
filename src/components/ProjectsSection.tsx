import React, { useEffect, useState } from "react";
import type { Project } from "../data/portfolio";
import ProjectCard from "./ProjectCard";

const ProjectsSection: React.FC = () => {
    const [projects, setProjects] = useState<Project[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetch("/api/projects")
            .then(res => res.json())
            .then(data => {
                setProjects(data);
                setLoading(false);
            })
            .catch(error => {
                console.error("Помилка отримання даних:", error);
                setLoading(false);
            });
    }, []);

    return (
        <section id="projects" className="py-20 px-4 max-w-5xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-textMain mb-10 text-center">My Projects</h2>

            {loading ? (
                <div className="flex justify-center items-center h-40">
                    <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
                </div>
            ) : projects.length === 0 ? (
                <div className="text-center text-textMuted">
                    <p>Проєкти ще не додані в Notion або API недоступне.</p>
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {projects.map((project, index) => (
                        <ProjectCard key={project.id} project={project} index={index} />
                    ))}
                </div>
            )}
        </section>
    );
};

export default ProjectsSection;
