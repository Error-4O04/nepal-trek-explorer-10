import { useState, useRef } from 'react';
import { Navigation } from '@/components/Navigation';
import { Hero } from '@/components/Hero';
import { DiscoverTreks } from '@/components/DiscoverTreks';
import { CarbonCalculator } from '@/components/CarbonCalculator';
import { TripPlanner } from '@/components/TripPlanner';
import { Community } from '@/components/Community';
import { Footer } from '@/components/Footer';

const Index = () => {
  const [activeSection, setActiveSection] = useState('hero');
  
  const discoverRef = useRef<HTMLDivElement>(null);
  const carbonRef = useRef<HTMLDivElement>(null);
  const plannerRef = useRef<HTMLDivElement>(null);
  const communityRef = useRef<HTMLDivElement>(null);

  const handleNavigate = (section: string) => {
    setActiveSection(section);
    
    const refs: Record<string, React.RefObject<HTMLDivElement>> = {
      discover: discoverRef,
      carbon: carbonRef,
      planner: plannerRef,
      community: communityRef,
    };

    if (section === 'hero') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else if (refs[section]?.current) {
      refs[section].current.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const handleExplore = () => {
    handleNavigate('discover');
  };

  return (
    <div className="min-h-screen bg-background">
      <Navigation activeSection={activeSection} onNavigate={handleNavigate} />
      
      {/* Hero Section */}
      <Hero onExplore={handleExplore} />
      
      {/* Discover Treks Section */}
      <div ref={discoverRef} className="scroll-mt-16">
        <DiscoverTreks />
      </div>
      
      {/* Carbon Calculator Section */}
      <div ref={carbonRef} className="scroll-mt-16">
        <CarbonCalculator />
      </div>
      
      {/* Trip Planner Section */}
      <div ref={plannerRef} className="scroll-mt-16">
        <TripPlanner />
      </div>
      
      {/* Community Section */}
      <div ref={communityRef} className="scroll-mt-16">
        <Community />
      </div>
      
      {/* Footer */}
      <Footer />
    </div>
  );
};

export default Index;
