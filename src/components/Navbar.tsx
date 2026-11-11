import React, { useEffect, useState } from "react";
import { navLinks, person, socials } from "../data/config";

const Navbar: React.FC = () => {
    const [scrolled, setScrolled] = useState(false);
    const [menuOpen, setMenuOpen] = useState(false);

    const contactLink = socials.find(s => s.icon === "gmail");

    useEffect(() => {
        const onScroll = () => {
            setScrolled(window.scrollY > 20);
            if (window.scrollY > 20) {
                setMenuOpen(false);
            }
        };
        window.addEventListener("scroll", onScroll, { passive: true });
        return () => window.removeEventListener("scroll", onScroll);
    }, []);

    return (
        <nav
            className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
                scrolled || menuOpen
                    ? "bg-background/95 backdrop-blur-xl border-b border-border shadow-lg shadow-black/20"
                    : "bg-background/80 md:bg-transparent backdrop-blur-md md:backdrop-blur-none border-b border-border/40 md:border-transparent"
            }`}
        >
            <div className="max-w-5xl mx-auto px-6 h-16 flex items-center justify-between">
                <a
                    href="#"
                    onClick={() => setMenuOpen(false)}
                    className="font-mono text-primary font-bold text-lg group flex items-center gap-1"
                >
                    <span className="text-textMuted group-hover:text-primary transition-colors duration-300">~/</span>
                    <span>{person.handle}</span>
                    <span className="animate-blink text-primary ml-0.5">_</span>
                </a>

                <div className="hidden md:flex items-center gap-1">
                    {navLinks.map(({ href, label }, i) => (
                        <a
                            key={label}
                            href={href}
                            className="relative px-4 py-2 font-mono text-sm text-textMuted hover:text-primary transition-colors duration-300 group"
                        >
                            <span className="text-primary/50 mr-1 text-xs">{String(i + 1).padStart(2, "0")}.</span>
                            {label}
                            <span className="absolute inset-x-4 bottom-1 h-px bg-primary scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left" />
                        </a>
                    ))}
                </div>

                <div className="hidden md:block">
                    {contactLink && (
                        <a
                            href={contactLink.href}
                            className="btn-ghost text-xs"
                        >
                            contact.sh
                        </a>
                    )}
                </div>

                <button
                    onClick={() => setMenuOpen(!menuOpen)}
                    className="md:hidden text-textMuted hover:text-primary transition-colors p-2"
                    aria-label="Toggle menu"
                >
                    <div className="w-5 h-4 flex flex-col justify-between">
                        <span
                            className={`block h-px bg-current transition-all duration-300 ${menuOpen ? "rotate-45 translate-y-1.5" : ""}`}
                        />
                        <span
                            className={`block h-px bg-current transition-all duration-300 ${menuOpen ? "opacity-0" : ""}`}
                        />
                        <span
                            className={`block h-px bg-current transition-all duration-300 ${menuOpen ? "-rotate-45 -translate-y-2.5" : ""}`}
                        />
                    </div>
                </button>
            </div>

            {menuOpen && (
                <div className="md:hidden border-t border-border bg-background/95 backdrop-blur-xl px-6 py-4 flex flex-col gap-3">
                    {navLinks.map(({ href, label }, i) => (
                        <a
                            key={label}
                            href={href}
                            onClick={() => setMenuOpen(false)}
                            className="font-mono text-sm text-textMuted hover:text-primary transition-colors py-1"
                        >
                            <span className="text-primary/50 mr-2 text-xs">{String(i + 1).padStart(2, "0")}.</span>
                            {label}
                        </a>
                    ))}
                    {contactLink && (
                        <a
                            href={contactLink.href}
                            onClick={() => setMenuOpen(false)}
                            className="btn-ghost text-xs mt-2 text-center"
                        >
                            contact.sh
                        </a>
                    )}
                </div>
            )}
        </nav>
    );
};

export default Navbar;
