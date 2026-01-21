import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
  Mountain, Footprints, Compass, Eye, Leaf, Wind,
  MapPin, DollarSign, Zap, AlertCircle, Check, TreePine, Waves,
  Users, Baby, Heart, AlertTriangle, Star, Home
} from 'lucide-react';

interface UserPreferences {
  activities: string[];
  naturePreference: string[];
  budget: 'low' | 'medium' | 'high';
  travelStyle: 'eco-friendly' | 'budget' | 'luxury';
  duration: number;
  travelers: number;
  hasChildren: boolean;
  hasElderly: boolean;
  groupType: 'solo' | 'couple' | 'family' | 'group';
  months: string[];
  season: 'peak' | 'off-season';
  interests: string[];
  transport: string;
}

interface Recommendation {
  name: string;
  location: string;
  image: string;
  difficulty: string;
  duration: number;
  altitude: string;
  rating: number;
  eco_score: number;
  carbon_footprint: string;
  cost_budget: number;
  cost_medium: number;
  cost_luxury: number;
  activities: string[];
  accommodations: string[];
  sustainableTips: string[];
  warnings: string[];
  groupFriendly: boolean;
  childrenFriendly: boolean;
  elderlyFriendly: boolean;
}

export const TripPlanner = () => {
  const [step, setStep] = useState<'activities' | 'preferences' | 'results'>('activities');
  const [prefs, setPrefs] = useState<UserPreferences>({
    activities: [],
    naturePreference: [],
    budget: 'medium',
    travelStyle: 'eco-friendly',
    duration: 5,
    travelers: 1,
    hasChildren: false,
    hasElderly: false,
    groupType: 'solo',
    months: [],
    season: 'peak',
    interests: [],
    transport: 'bus',
  });

  const [recommendations, setRecommendations] = useState<Recommendation[]>([]);

  const activities = [
    { id: 'trekking', label: 'Trekking', icon: Mountain },
    { id: 'hiking', label: 'Hiking', icon: Footprints },
    { id: 'adventure', label: 'Adventure', icon: Compass },
    { id: 'sightseeing', label: 'Sightseeing', icon: Eye },
    { id: 'walking', label: 'Light Walking', icon: Leaf },
    { id: 'wildlife', label: 'Wildlife & Nature', icon: Wind },
  ];

  const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
  const interests = ['Local Culture', 'Photography', 'Bird Watching', 'Eco-Tourism', 'Food', 'Festivals', 'Camping'];
  const transportOptions = ['Walking', 'Cycling', 'Public Bus', 'Shared Jeep', 'Flight'];

  const toggleActivity = (id: string) => {
    setPrefs(prev => ({
      ...prev,
      activities: prev.activities.includes(id)
        ? prev.activities.filter(a => a !== id)
        : [...prev.activities, id]
    }));
  };

  const toggleNature = (nature: string) => {
    setPrefs(prev => ({
      ...prev,
      naturePreference: prev.naturePreference.includes(nature)
        ? prev.naturePreference.filter(n => n !== nature)
        : [...prev.naturePreference, nature]
    }));
  };

  const toggleMonth = (month: string) => {
    setPrefs(prev => ({
      ...prev,
      months: prev.months.includes(month)
        ? prev.months.filter(m => m !== month)
        : [...prev.months, month]
    }));
  };

  const toggleInterest = (interest: string) => {
    setPrefs(prev => ({
      ...prev,
      interests: prev.interests.includes(interest)
        ? prev.interests.filter(i => i !== interest)
        : [...prev.interests, interest]
    }));
  };

  const handleGenerateRecommendations = () => {
    // Mock recommendations based on preferences
    const mockRecommendations: Recommendation[] = [
      {
        name: 'Langtang Valley Trek',
        location: 'Langtang National Park',
        image: 'https://images.unsplash.com/photo-1544735716-392fe2489ffa?w=800',
        difficulty: 'Moderate',
        duration: 7,
        altitude: '3870m',
        rating: 4.8,
        eco_score: 82,
        carbon_footprint: 'low',
        cost_budget: 700,
        cost_medium: 1000,
        cost_luxury: 1600,
        activities: ['Trekking', 'Photography', 'Culture'],
        accommodations: ['Teahouse', 'Eco-Lodge', 'Community Homestay'],
        sustainableTips: ['Use local guides', 'Stay in community lodges', 'Carry out all trash', 'Respect wildlife'],
        warnings: ['High altitude - acclimatization needed', 'Weather can change rapidly', 'Limited medical facilities'],
        groupFriendly: true,
        childrenFriendly: false,
        elderlyFriendly: false,
      },
      {
        name: 'Pokhara Lake & Mountain Views',
        location: 'Pokhara',
        image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800',
        difficulty: 'Easy',
        duration: 3,
        altitude: '822m',
        rating: 4.7,
        eco_score: 72,
        carbon_footprint: 'low',
        cost_budget: 400,
        cost_medium: 800,
        cost_luxury: 1500,
        activities: ['Sightseeing', 'Boat', 'Photography'],
        accommodations: ['Hotel', 'Guesthouse', 'Lakeside Resort'],
        sustainableTips: ['Use eco-friendly boat tours', 'Support local cafes', 'No plastic bags'],
        warnings: ['Crowded during peak season', 'Air quality during winter'],
        groupFriendly: true,
        childrenFriendly: true,
        elderlyFriendly: true,
      },
    ];

    setRecommendations(mockRecommendations);
    setStep('results');
  };

  return (
    <section className="py-16 px-6 bg-gradient-to-b from-background to-card">
      <div className="container mx-auto max-w-6xl">
        <div className="text-center mb-12">
          <h2 className="font-display text-4xl md:text-5xl font-bold mb-4">
            Plan Your Perfect Trip
          </h2>
          <p className="text-lg text-muted-foreground">
            Get personalized recommendations based on your preferences, budget, and interests
          </p>
        </div>

        {/* Step 1: Activities */}
        {step === 'activities' && (
          <div className="space-y-8">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Mountain className="w-5 h-5" />
                  What activities interest you?
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  {activities.map(activity => {
                    const Icon = activity.icon;
                    const isSelected = prefs.activities.includes(activity.id);
                    return (
                      <button
                        key={activity.id}
                        onClick={() => toggleActivity(activity.id)}
                        className={`p-4 rounded-lg border-2 transition-all ${
                          isSelected
                            ? 'border-primary bg-primary/10'
                            : 'border-border hover:border-primary/50'
                        }`}
                      >
                        <Icon className="w-6 h-6 mx-auto mb-2" />
                        <p className="text-sm font-medium">{activity.label}</p>
                        {isSelected && <Check className="w-4 h-4 mx-auto mt-2 text-primary" />}
                      </button>
                    );
                  })}
                </div>
              </CardContent>
            </Card>

            <Button
              onClick={() => setStep('preferences')}
              disabled={prefs.activities.length === 0}
              className="w-full md:w-auto"
            >
              Continue to Preferences →
            </Button>
          </div>
        )}

        {/* Step 2: Preferences */}
        {step === 'preferences' && (
          <div className="space-y-8">
            <Card>
              <CardHeader>
                <CardTitle>Nature Preferences</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-3 gap-4">
                  <button
                    onClick={() => toggleNature('mountains')}
                    className={`p-4 rounded-lg border-2 transition-all ${
                      prefs.naturePreference.includes('mountains')
                        ? 'border-primary bg-primary/10'
                        : 'border-border hover:border-primary/50'
                    }`}
                  >
                    <Mountain className="w-6 h-6 mx-auto mb-2" />
                    <p className="text-sm font-medium">Mountains 🏔️</p>
                  </button>
                  <button
                    onClick={() => toggleNature('forests')}
                    className={`p-4 rounded-lg border-2 transition-all ${
                      prefs.naturePreference.includes('forests')
                        ? 'border-primary bg-primary/10'
                        : 'border-border hover:border-primary/50'
                    }`}
                  >
                    <TreePine className="w-6 h-6 mx-auto mb-2" />
                    <p className="text-sm font-medium">Forests 🌲</p>
                  </button>
                  <button
                    onClick={() => toggleNature('lakes')}
                    className={`p-4 rounded-lg border-2 transition-all ${
                      prefs.naturePreference.includes('lakes')
                        ? 'border-primary bg-primary/10'
                        : 'border-border hover:border-primary/50'
                    }`}
                  >
                    <Waves className="w-6 h-6 mx-auto mb-2" />
                    <p className="text-sm font-medium">Lakes 🌊</p>
                  </button>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Budget & Style</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <label className="text-sm font-medium mb-3 block">Estimated Budget</label>
                  <div className="flex gap-4">
                    {(['low', 'medium', 'high'] as const).map(b => (
                      <button
                        key={b}
                        onClick={() => setPrefs(p => ({ ...p, budget: b }))}
                        className={`px-4 py-2 rounded-lg border-2 transition-all capitalize ${
                          prefs.budget === b
                            ? 'border-primary bg-primary/10'
                            : 'border-border hover:border-primary/50'
                        }`}
                      >
                        {b === 'low' ? '💰' : b === 'medium' ? '💰💰' : '💰💰💰'} {b}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="text-sm font-medium mb-3 block">Travel Style</label>
                  <div className="flex gap-4">
                    {(['eco-friendly', 'budget', 'luxury'] as const).map(s => (
                      <button
                        key={s}
                        onClick={() => setPrefs(p => ({ ...p, travelStyle: s }))}
                        className={`px-4 py-2 rounded-lg border-2 transition-all capitalize ${
                          prefs.travelStyle === s
                            ? 'border-primary bg-primary/10'
                            : 'border-border hover:border-primary/50'
                        }`}
                      >
                        {s === 'eco-friendly' ? '🌱' : s === 'budget' ? '💰' : '👑'} {s.replace('-', ' ')}
                      </button>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Duration & Group</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <label className="text-sm font-medium mb-3 block">Duration (days): {prefs.duration}</label>
                  <input
                    type="range"
                    min="1"
                    max="30"
                    value={prefs.duration}
                    onChange={e => setPrefs(p => ({ ...p, duration: parseInt(e.target.value) }))}
                    className="w-full"
                  />
                </div>

                <div>
                  <label className="text-sm font-medium mb-3 block">Number of Travelers: {prefs.travelers}</label>
                  <input
                    type="range"
                    min="1"
                    max="20"
                    value={prefs.travelers}
                    onChange={e => setPrefs(p => ({ ...p, travelers: parseInt(e.target.value) }))}
                    className="w-full"
                  />
                </div>

                <div className="flex gap-4">
                  <label className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      checked={prefs.hasChildren}
                      onChange={e => setPrefs(p => ({ ...p, hasChildren: e.target.checked }))}
                    />
                    <Baby className="w-4 h-4" />
                    Has Children
                  </label>
                  <label className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      checked={prefs.hasElderly}
                      onChange={e => setPrefs(p => ({ ...p, hasElderly: e.target.checked }))}
                    />
                    <Heart className="w-4 h-4" />
                    Has Elderly
                  </label>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Time of Visit</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <label className="text-sm font-medium mb-3 block">Preferred Months</label>
                  <div className="grid grid-cols-3 md:grid-cols-6 gap-2">
                    {months.map(month => (
                      <button
                        key={month}
                        onClick={() => toggleMonth(month)}
                        className={`p-2 rounded text-xs font-medium transition-all ${
                          prefs.months.includes(month)
                            ? 'bg-primary text-primary-foreground'
                            : 'bg-muted hover:bg-muted/80'
                        }`}
                      >
                        {month.slice(0, 3)}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="text-sm font-medium mb-3 block">Season</label>
                  <div className="flex gap-4">
                    <button
                      onClick={() => setPrefs(p => ({ ...p, season: 'peak' }))}
                      className={`px-4 py-2 rounded-lg border-2 ${
                        prefs.season === 'peak'
                          ? 'border-primary bg-primary/10'
                          : 'border-border'
                      }`}
                    >
                      Peak Season (Festivals)
                    </button>
                    <button
                      onClick={() => setPrefs(p => ({ ...p, season: 'off-season' }))}
                      className={`px-4 py-2 rounded-lg border-2 ${
                        prefs.season === 'off-season'
                          ? 'border-primary bg-primary/10'
                          : 'border-border'
                      }`}
                    >
                      Off-Season (Less Crowded)
                    </button>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Special Interests</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                  {interests.map(interest => (
                    <button
                      key={interest}
                      onClick={() => toggleInterest(interest)}
                      className={`p-2 rounded text-sm font-medium transition-all ${
                        prefs.interests.includes(interest)
                          ? 'bg-primary text-primary-foreground'
                          : 'bg-muted hover:bg-muted/80'
                      }`}
                    >
                      {interest}
                    </button>
                  ))}
                </div>
              </CardContent>
            </Card>

            <div className="flex gap-4">
              <Button
                variant="outline"
                onClick={() => setStep('activities')}
                className="w-full md:w-auto"
              >
                ← Back
              </Button>
              <Button
                onClick={handleGenerateRecommendations}
                className="w-full md:w-auto"
              >
                Generate Recommendations →
              </Button>
            </div>
          </div>
        )}

        {/* Step 3: Results */}
        {step === 'results' && (
          <div className="space-y-8">
            {recommendations.length > 0 && (
              <>
                <div className="grid md:grid-cols-2 gap-6">
                  {recommendations.map((rec, idx) => (
                    <Card key={idx} className="overflow-hidden hover:shadow-elevated transition-shadow">
                      <div className="relative h-48 overflow-hidden">
                        <img
                          src={rec.image}
                          alt={rec.name}
                          className="w-full h-full object-cover"
                        />
                        <div className="absolute top-4 right-4 bg-primary text-primary-foreground px-3 py-1 rounded-full text-sm font-semibold">
                          ⭐ {rec.rating}
                        </div>
                      </div>

                      <CardContent className="p-6 space-y-4">
                        <div>
                          <h3 className="font-display text-2xl font-bold mb-1">{rec.name}</h3>
                          <p className="text-muted-foreground flex items-center gap-1">
                            <MapPin className="w-4 h-4" /> {rec.location}
                          </p>
                        </div>

                        {/* Quick Stats */}
                        <div className="grid grid-cols-3 gap-2 py-3 border-y">
                          <div className="text-center">
                            <p className="text-xs text-muted-foreground">Duration</p>
                            <p className="font-semibold">{rec.duration} days</p>
                          </div>
                          <div className="text-center">
                            <p className="text-xs text-muted-foreground">Altitude</p>
                            <p className="font-semibold">{rec.altitude}</p>
                          </div>
                          <div className="text-center">
                            <p className="text-xs text-muted-foreground">Difficulty</p>
                            <p className="font-semibold text-sm">{rec.difficulty}</p>
                          </div>
                        </div>

                        {/* Eco-Friendliness Score */}
                        <div className="bg-green-50 dark:bg-green-950 p-4 rounded-lg">
                          <p className="text-sm font-semibold flex items-center gap-2 mb-2">
                            <Leaf className="w-4 h-4 text-green-600" />
                            Eco-Friendliness Score
                          </p>
                          <div className="flex items-center gap-2">
                            <div className="flex-1 bg-green-200 h-2 rounded-full overflow-hidden">
                              <div
                                className="bg-green-600 h-full"
                                style={{ width: `${rec.eco_score}%` }}
                              />
                            </div>
                            <span className="font-bold text-green-700">{rec.eco_score}/100</span>
                          </div>
                        </div>

                        {/* Carbon Footprint */}
                        <div>
                          <p className="text-sm font-semibold flex items-center gap-2 mb-2">
                            <Zap className="w-4 h-4" />
                            Carbon Footprint
                          </p>
                          <Badge className={rec.carbon_footprint === 'low' ? 'bg-green-600' : rec.carbon_footprint === 'medium' ? 'bg-yellow-600' : 'bg-red-600'}>
                            {rec.carbon_footprint === 'low' ? '🟢' : rec.carbon_footprint === 'medium' ? '🟡' : '🔴'} {rec.carbon_footprint.toUpperCase()}
                          </Badge>
                        </div>

                        {/* Cost Breakdown */}
                        <div>
                          <p className="text-sm font-semibold flex items-center gap-2 mb-2">
                            <DollarSign className="w-4 h-4" />
                            Estimated Cost (per person)
                          </p>
                          <div className="space-y-1 text-sm">
                            <p>💰 Budget: ₹{rec.cost_budget.toLocaleString()}</p>
                            <p>💰💰 Medium: ₹{rec.cost_medium.toLocaleString()}</p>
                            <p>💰💰💰 Luxury: ₹{rec.cost_luxury.toLocaleString()}</p>
                          </div>
                        </div>

                        {/* Activities */}
                        <div>
                          <p className="text-sm font-semibold mb-2">Activities</p>
                          <div className="flex flex-wrap gap-1">
                            {rec.activities.map(act => (
                              <Badge key={act} variant="secondary" className="text-xs">
                                {act}
                              </Badge>
                            ))}
                          </div>
                        </div>

                        {/* Accommodations */}
                        <div>
                          <p className="text-sm font-semibold mb-2 flex items-center gap-1">
                            <Home className="w-4 h-4" /> Accommodations
                          </p>
                          <div className="space-y-1 text-sm">
                            {rec.accommodations.map(acc => (
                              <p key={acc}>• {acc}</p>
                            ))}
                          </div>
                        </div>

                        {/* Group & Accessibility */}
                        <div>
                          <p className="text-sm font-semibold mb-2 flex items-center gap-1">
                            <Users className="w-4 h-4" /> Group & Accessibility
                          </p>
                          <div className="space-y-1 text-sm">
                            {rec.groupFriendly && <p>✅ Group Friendly</p>}
                            {rec.childrenFriendly && <p>✅ Children Friendly</p>}
                            {rec.elderlyFriendly && <p>✅ Elderly Friendly</p>}
                          </div>
                        </div>

                        {/* Sustainable Tips */}
                        <div className="bg-green-50 dark:bg-green-950 p-4 rounded-lg">
                          <p className="text-sm font-semibold mb-2 flex items-center gap-1">
                            <Leaf className="w-4 h-4" /> Sustainable Travel Tips
                          </p>
                          <ul className="space-y-1 text-sm">
                            {rec.sustainableTips.map((tip, i) => (
                              <li key={i} className="flex items-start gap-2">
                                <Check className="w-3 h-3 text-green-600 mt-0.5 flex-shrink-0" />
                                <span>{tip}</span>
                              </li>
                            ))}
                          </ul>
                        </div>

                        {/* Warnings */}
                        {rec.warnings.length > 0 && (
                          <div className="bg-amber-50 dark:bg-amber-950 p-4 rounded-lg">
                            <p className="text-sm font-semibold mb-2 flex items-center gap-1 text-amber-800 dark:text-amber-200">
                              <AlertTriangle className="w-4 h-4" /> Important Notes
                            </p>
                            <ul className="space-y-1 text-sm text-amber-900 dark:text-amber-100">
                              {rec.warnings.map((warning, i) => (
                                <li key={i} className="flex items-start gap-2">
                                  <AlertCircle className="w-3 h-3 mt-0.5 flex-shrink-0" />
                                  <span>{warning}</span>
                                </li>
                              ))}
                            </ul>
                          </div>
                        )}
                      </CardContent>
                    </Card>
                  ))}
                </div>

                <div className="flex gap-4">
                  <Button
                    variant="outline"
                    onClick={() => setStep('preferences')}
                    className="w-full md:w-auto"
                  >
                    ← Modify Preferences
                  </Button>
                  <Button
                    onClick={() => setStep('activities')}
                    className="w-full md:w-auto"
                  >
                    Start Over
                  </Button>
                </div>
              </>
            )}
          </div>
        )}
      </div>
    </section>
  );
};
