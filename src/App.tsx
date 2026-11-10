import HeroSection from './components/HeroSection';
import AboutSection from './components/AboutSection';
import SkillsSection from './components/SkillsSection';
import ProjectsSection from './components/ProjectsSection';
import Footer from './components/Footer';
import Navbar from './components/Navbar';

function App() {
  return (
    <main className="bg-background min-h-screen relative overflow-x-hidden">
      <div className="noise-overlay" />
      <Navbar />
      <HeroSection />
      <AboutSection />
      <SkillsSection />
      <ProjectsSection />
      <Footer />
    </main>
  );
}

export default App;
