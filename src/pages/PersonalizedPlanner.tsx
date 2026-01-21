import { useState } from 'react';
import { Navigation } from '@/components/Navigation';
import { Footer } from '@/components/Footer';
import { ActivitySelector, type ActivityType } from '@/components/ActivitySelector';
import { UserPreferencesForm, type UserPreferences } from '@/components/UserPreferencesForm';
import { RecommendationsDisplay } from '@/components/RecommendationsDisplay';
import { destinations, type Destination } from '@/data/destinations';
import { ArrowDown } from 'lucide-react';

const PersonalizedPlanner = () => {
  const [selectedActivities, setSelectedActivities] = useState<ActivityType[]>([]);
  const [recommendations, setRecommendations] = useState<Destination[]>([]);
  const [hasSubmitted, setHasSubmitted] = useState(false);
  const [activeSection, setActiveSection] = useState('planner');

  const handleActivityChange = (activities: ActivityType[]) => {
    setSelectedActivities(activities);
  };

  const handlePreferencesSubmit = (preferences: UserPreferences) => {
    // Filter destinations based on preferences
    const filtered = destinations.filter((dest) => {
      // Check activities match
      const activitiesMatch = preferences.activities.some((activity) =>
        dest.activities.includes(activity)
      );

      // Check nature preferences match
      const natureMatch = preferences.naturePreferences.some((nature) =>
        dest.naturePreferences.includes(nature)
      );

      // Check duration compatibility
      const durationMatch =
        preferences.duration >= dest.duration.min && preferences.duration <= dest.duration.max;

      // Check budget compatibility
      const budgetMatch = true; // All destinations have options for all budgets

      // Check group compatibility
      const groupMatch =
        (preferences.groupType === 'family' && !dest.childrenFriendly) ||
        (preferences.groupType === 'family' && !dest.groupFriendly)
          ? false
          : true;

      // Check month availability
      const monthMatch = preferences.preferredMonths.some((month) =>
        dest.bestMonths.includes(month) || dest.bestMonths.includes('All year round')
      );

      // Check special interests alignment
      const interestMatch =
        preferences.interests.length === 0 ||
        preferences.interests.some((interest) => {
          if (interest === 'Photography') return dest.activities.includes('sightseeing');
          if (interest === 'Bird Watching') return dest.activities.includes('wildlife');
          if (interest === 'Culture & Festivals') return dest.activities.includes('sightseeing');
          if (interest === 'Relaxation') return dest.difficulty === 'Easy';
          return true;
        });

      return activitiesMatch && natureMatch && durationMatch && budgetMatch && groupMatch && monthMatch && interestMatch;
    });

    // Sort by eco-score and rating
    const sorted = filtered.sort((a, b) => {
      // Prioritize eco-friendly travel style
      if (preferences.travelStyle === 'eco-friendly') {
        return b.ecoScore - a.ecoScore;
      }
      // Sort by rating
      return b.rating - a.rating;
    });

    setRecommendations(sorted);
    setHasSubmitted(true);
  };

  return (
    <div className="min-h-screen bg-background">
      <Navigation activeSection={activeSection} onNavigate={() => {}} />

      {/* Hero Section */}
      <div className="min-h-96 pt-32 pb-16 px-6 bg-gradient-to-b from-primary/10 to-background">
        <div className="container mx-auto max-w-7xl text-center">
          <h1 className="font-display text-5xl md:text-6xl font-bold mb-6">
            Discover Your Perfect Nepal Adventure
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto mb-8">
            Get personalized travel recommendations based on your preferences, budget, and interests.
            Explore sustainable tourism options with detailed eco-scores and carbon footprint data.
          </p>
          <div className="flex justify-center">
            <ArrowDown className="w-6 h-6 text-primary animate-bounce" />
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="py-16 px-6">
        <div className="container mx-auto max-w-5xl">
          {!hasSubmitted ? (
            <div className="space-y-12">
              {/* Activity Selection */}
              <div className="bg-card rounded-2xl p-8 border border-border/50">
                <ActivitySelector
                  selectedActivities={selectedActivities}
                  onActivityChange={handleActivityChange}
                />
              </div>

              {/* User Preferences Form */}
              {selectedActivities.length > 0 && (
                <div className="space-y-4">
                  <div className="text-center">
                    <p className="text-sm text-muted-foreground">Step 2 of 2</p>
                    <h2 className="text-3xl font-display font-bold mt-2">Customize Your Preferences</h2>
                  </div>
                  <UserPreferencesForm
                    selectedActivities={selectedActivities}
                    onSubmit={handlePreferencesSubmit}
                  />
                </div>
              )}
            </div>
          ) : (
            <div className="space-y-8">
              {/* Results Header */}
              <div className="text-center">
                <button
                  onClick={() => {
                    setHasSubmitted(false);
                    setSelectedActivities([]);
                    setRecommendations([]);
                  }}
                  className="text-primary hover:underline text-sm font-medium mb-4"
                >
                  ← Update preferences
                </button>
              </div>

              {/* Recommendations */}
              <RecommendationsDisplay recommendations={recommendations} />
            </div>
          )}
        </div>
      </div>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default PersonalizedPlanner;
