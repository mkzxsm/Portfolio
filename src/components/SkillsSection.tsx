import React, { useEffect, useState } from "react";

interface Skill {
    id: string;
    name: string;
    category: string;
    icon: string;
}

const CATEGORY_META: Record<string, { icon: string; order: number }> = {
    frontend: { icon: "🎨", order: 1 },
    backend: { icon: "⚙️", order: 2 },
    mobile: { icon: "📱", order: 3 },
    database: { icon: "🗄️", order: 4 },
    "systems & tools": { icon: "🛠️", order: 5 },
};

const getMeta = (category: string) => CATEGORY_META[category.toLowerCase()] ?? { icon: "⚡", order: 99 };

const SkillsSection: React.FC = () => {
    const [skills, setSkills] = useState<Skill[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetch("/api/skills")
            .then(res => {
                if (!res.ok) throw new Error(`HTTP ${res.status}`);
                return res.json();
            })
            .then(data => {
                setSkills(Array.isArray(data) ? data : []);
                setLoading(false);
            })
            .catch(err => {
                console.error("Помилка завантаження скіллів:", err);
                setLoading(false);
            });
    }, []);

    const categoriesMap = skills.reduce((acc: Record<string, Skill[]>, skill) => {
        if (!acc[skill.category]) {
            acc[skill.category] = [];
        }
        acc[skill.category].push(skill);
        return acc;
    }, {});

    const sortedCategories = Object.entries(categoriesMap).sort(([a], [b]) => getMeta(a).order - getMeta(b).order);

    return (
        <section id="skills" className="py-20 md:py-28 px-6 max-w-5xl mx-auto scroll-mt-16 md:scroll-mt-20">
            <div className="section-label">skills.json</div>

            <div className="mb-12">
                <h2 className="text-3xl md:text-4xl font-bold text-textMain">
                    Tech <span className="text-primary">stack</span>
                </h2>
            </div>

            {loading ? (
                <div className="flex justify-center items-center h-40">
                    <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
                </div>
            ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    {sortedCategories.map(([category, items], i) => (
                        <div
                            key={category}
                            className={`card p-6 group ${
                                i === sortedCategories.length - 1 && sortedCategories.length % 3 === 2
                                    ? "lg:col-span-2"
                                    : ""
                            }`}
                        >
                            <div className="flex items-center gap-3 mb-5">
                                <span className="text-primary text-xl">{getMeta(category).icon}</span>
                                <span className="font-mono text-xs text-textMuted tracking-widest uppercase">
                                    {category}
                                </span>
                            </div>
                            <div className="flex flex-wrap gap-2">
                                {items.map(skill => (
                                    <span
                                        key={skill.id}
                                        className="badge hover:border-primary/40 hover:text-textMain transition-all duration-200 cursor-default"
                                    >
                                        {skill.name}
                                    </span>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </section>
    );
};

export default SkillsSection;
