import { useState } from 'react';
import { Mountain, Menu, X, Compass, Calendar, Users, History } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';

interface NavigationProps {
  activeSection: string;
  onNavigate: (section: string) => void;
}

export const Navigation = ({ activeSection, onNavigate }: NavigationProps) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems = [
    { id: 'discover', label: 'Discover', icon: Compass, path: '/#discover' },
    { id: 'trip-planner', label: 'Trip Planner', icon: Calendar, path: '/planner' },
    { id: 'community', label: 'Community', icon: Users, path: '/#community' },
    { id: 'activity-log', label: 'Activity Log', icon: History, path: '/activity-log' },
  ];

  const handleNavigate = (section: string) => {
    onNavigate(section);
    setMobileMenuOpen(false);
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-lg border-b border-border/50">
      <div className="container mx-auto px-6">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link
            to="/"
            className="flex items-center gap-2 font-display text-xl font-bold text-primary hover:opacity-80 transition-opacity"
          >
            <Mountain className="w-7 h-7" />
            <span className="hidden sm:block">Nepal Hidden Gems</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-1">
            {navItems.map((item) => (
              <a key={item.id} href={item.path} className="no-underline">
                <Button
                  variant={activeSection === item.id ? 'default' : 'ghost'}
                  size="sm"
                  className="gap-2"
                >
                  <item.icon className="w-4 h-4" />
                  {item.label}
                </Button>
              </a>
            ))}
          </div>



          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2 text-foreground"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden py-4 border-t border-border/50 animate-fade-in">
            <div className="flex flex-col gap-2">
              {navItems.map((item) => (
                <a key={item.id} href={item.path} className="no-underline">
                  <Button
                    variant={activeSection === item.id ? 'default' : 'ghost'}
                    className="justify-start gap-3 w-full"
                  >
                    <item.icon className="w-5 h-5" />
                    {item.label}
                  </Button>
                </a>
              ))}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};
