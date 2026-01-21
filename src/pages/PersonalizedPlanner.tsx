import { Navigation } from '@/components/Navigation';
import { Footer } from '@/components/Footer';
import { TripPlanner } from '@/components/TripPlanner';
import { useState } from 'react';

const PersonalizedPlanner = () => {
  const [activeSection, setActiveSection] = useState('planner');

  return (
    <div className="min-h-screen bg-background">
      <Navigation activeSection={activeSection} onNavigate={() => {}} />

      {/* Main Content */}
      <div className="pt-16">
        <TripPlanner />
      </div>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default PersonalizedPlanner;
