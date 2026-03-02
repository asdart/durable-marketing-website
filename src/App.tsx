import Nav from './components/Nav';
import HeroSection from './components/HeroSection';
import ScoresSection from './components/ScoresSection';
import DifferenceSection from './components/DifferenceSection';
import CategorySection from './components/CategorySection';
import ComparisonTable from './components/ComparisonTable';
import HowWeScore from './components/HowWeScore';
import CtaSection from './components/CtaSection';
import Footer from './components/Footer';
import FadeIn from './components/FadeIn';

function App() {
  return (
    <div className="min-h-screen bg-white">
      <Nav />
      <main>
        <HeroSection />
        <FadeIn><ScoresSection /></FadeIn>
        <FadeIn><DifferenceSection /></FadeIn>
        <FadeIn><CategorySection /></FadeIn>
        <FadeIn><ComparisonTable /></FadeIn>
        <FadeIn><HowWeScore /></FadeIn>
        <FadeIn><CtaSection /></FadeIn>
      </main>
      <Footer />
    </div>
  );
}

export default App;
