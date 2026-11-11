export interface NavLink {
    href: string;
    label: string;
}

export interface SocialLink {
    label: string;
    href: string;
    icon: "github" | "gmail" | "linkedin";
}

export interface HeroTerminalLine {
    command: string;
    output: string;
}

export interface HeroHighlight {
    label: string;
    color: string;
}

export interface Stat {
    label: string;
    value: string;
}

export interface AboutTag {
    label: string;
}

export interface TerminalStatus {
    label: string;
    color: string;
}

export interface SkillCategory {
    label: string;
    icon: string;
    items: string[];
}

export interface FooterMeta {
    status: string;
    build: string;
    version: string;
}

export interface ContactItem {
    label: string;
    value: string;
    href: string;
    icon: "mail" | "telegram" | "github" | "linkedin";
    description: string;
}

export const person = {
    name: "Maksym Martynyshyn",
    firstName: "Maksym",
    lastName: "Martynyshyn",
    handle: "mkzxsm",
    role: "Junior Full-Stack Developer",
    university: "Ivan Franko National University, Lviv",
    degree: "Cybersecurity",
    location: "Lviv, UA 🇺🇦",
    bio: "Building fast, user-friendly web apps and cross-platform mobile solutions. Cybersecurity student. Linux power user. Open-source enthusiast.",
    madeWith: "React + TypeScript",
};

export const socials: SocialLink[] = [
    {
        label: "GitHub",
        href: "https://github.com/mkzxsm",
        icon: "github",
    },
    {
        label: "Gmail",
        href: "mailto:maxym.martyn@gmail.com",
        icon: "gmail",
    },
    {
        label: "LinkedIn",
        href: "https://www.linkedin.com/in/%D0%BC%D0%B0%D0%BA%D1%81%D0%B8%D0%BC-%D0%BC%D0%B0%D1%80%D1%82%D0%B8%D0%BD%D0%B8%D1%88%D0%B8%D0%BD-62a3483b2/",
        icon: "linkedin",
    },
];

export const navLinks: NavLink[] = [
    { href: "#about", label: "about" },
    { href: "#skills", label: "skills" },
    { href: "#projects", label: "projects" },
    { href: "#contact", label: "contact" },
];

export const heroTerminalLines: HeroTerminalLine[] = [
    {
        command: "whoami",
        output: `${person.name} — ${person.role}`,
    },
    {
        command: "uname -r",
        output: `CS student @ ${person.university}`,
    },
];

export const heroHighlights: HeroHighlight[] = [
    { label: "React / TS", color: "text-blue-400" },
    { label: "Flutter", color: "text-cyan-400" },
    { label: "C++", color: "text-orange-400" },
    { label: "Linux", color: "text-yellow-400" },
];

export const aboutHeadline = "A developer who loves to go";
export const aboutHeadlineAccent = "deep";

export const aboutParagraphs = [
    `Hi! I'm Maksym — from Zolochiv, based in Lviv. I study *Cybersecurity* at Ivan Franko National University and work as a freelance Full-Stack developer.`,
    `I build modern web apps with ~React~ and ~TypeScript~, backend with ~PHP~, and cross-platform mobile apps on ~Flutter~.`,
    `I believe in understanding my tools deeply — that's why I work on *Linux*, write system-level utilities in ~C++~, and constantly explore algorithms and low-level systems.`,
];

export const aboutTags: AboutTag[] = [{ label: person.location }, { label: "Open to work" }, { label: "Freelance" }];

export const stats: Stat[] = [
    { label: "Years coding", value: "2+" },
    { label: "Projects shipped", value: "5+" },
    { label: "Stack layers", value: "Full" },
];

export const terminalStatuses: TerminalStatus[] = [
    { label: "studying", color: "text-green-400" },
    { label: "building", color: "text-yellow-400" },
    { label: "shipping", color: "text-primary" },
];

export const skillCategories: SkillCategory[] = [
    {
        label: "Frontend",
        icon: "◈",
        items: ["React", "TypeScript", "Tailwind CSS", "HTML/CSS"],
    },
    {
        label: "Mobile",
        icon: "◉",
        items: ["Flutter", "Dart"],
    },
    {
        label: "Systems",
        icon: "◆",
        items: ["C++", "CMake", "STL"],
    },
    {
        label: "Backend & DB",
        icon: "◇",
        items: ["PHP", "Python", "MySQL/MariaDB"],
    },
    {
        label: "Tools",
        icon: "◎",
        items: ["Linux", "Git", "Docker"],
    },
];

export const footerMeta: FooterMeta = {
    status: "deployed",
    build: "passing",
    version: "1.0.0",
};

export const contactItems: ContactItem[] = [
    {
        label: "Telegram",
        value: "@mkzxsm",
        href: "https://t.me/mkzxsm",
        icon: "telegram",
        description: "Fastest way to reach me",
    },
    {
        label: "GitHub",
        value: "github.com/mkzxsm",
        href: "https://github.com/mkzxsm",
        icon: "github",
        description: "See my open-source work",
    },
    {
        label: "LinkedIn",
        value: "in/mkzxsm",
        href: "https://www.linkedin.com/in/%D0%BC%D0%B0%D0%BA%D1%81%D0%B8%D0%BC-%D0%BC%D0%B0%D1%80%D1%82%D0%B8%D0%BD%D0%B8%D1%88%D0%B8%D0%BD-62a3483b2/",
        icon: "linkedin",
        description: "Professional profile",
    },
];

export const contactHeadline = "Let's work together";
export const contactSubtext =
    "Open to freelance projects, internships, and interesting collaborations. Drop me a message — I reply fast.";
