import { useState } from 'react';
import { Calendar, Backpack, Wallet, BarChart3, Sun, Cloud, Snowflake, CloudRain, Check, X } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { seasons, packingLists, treks } from '@/data/treks';

type DifficultyLevel = 'Easy' | 'Moderate' | 'Challenging';

export const TripPlanner = () => {
  const [selectedDifficulty, setSelectedDifficulty] = useState<DifficultyLevel>('Moderate');

  const seasonIcons = [
    <Sun className="w-5 h-5 text-amber-500" />,
    <Sun className="w-5 h-5 text-orange-500" />,
    <CloudRain className="w-5 h-5 text-blue-500" />,
    <Snowflake className="w-5 h-5 text-cyan-500" />,
  ];

  const budgetEstimates = {
    Easy: { permits: 50, guide: 200, food: 150, equipment: 100, total: 500 },
    Moderate: { permits: 100, guide: 400, food: 300, equipment: 250, total: 1050 },
    Challenging: { permits: 200, guide: 800, food: 500, equipment: 500, total: 2000 },
  };

  const popularVsHidden = treks.reduce((acc, trek) => {
    const category = trek.isHiddenGem ? 'hidden' : 'popular';
    if (!acc[category]) {
      acc[category] = { carbon: 0, cost: 0, count: 0, rating: 0 };
    }
    acc[category].carbon += trek.carbonScore;
    acc[category].cost += trek.cost;
    acc[category].rating += trek.rating;
    acc[category].count += 1;
    return acc;
  }, {} as Record<string, { carbon: number; cost: number; count: number; rating: number }>);

  const comparison = {
    popular: {
      carbon: Math.round(popularVsHidden.popular.carbon / popularVsHidden.popular.count),
      cost: Math.round(popularVsHidden.popular.cost / popularVsHidden.popular.count),
      crowds: 'High',
      rating: (popularVsHidden.popular.rating / popularVsHidden.popular.count).toFixed(1),
    },
    hidden: {
      carbon: Math.round(popularVsHidden.hidden.carbon / popularVsHidden.hidden.count),
      cost: Math.round(popularVsHidden.hidden.cost / popularVsHidden.hidden.count),
      crowds: 'Low',
      rating: (popularVsHidden.hidden.rating / popularVsHidden.hidden.count).toFixed(1),
    },
  };

  return (
    <section className="py-16 px-6">
      <div className="container mx-auto max-w-6xl">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-secondary/10 border border-secondary/20 mb-4">
            <Calendar className="w-4 h-4 text-secondary" />
            <span className="text-sm font-medium text-secondary">Trip Planner</span>
          </div>
          <h2 className="font-display text-4xl md:text-5xl font-bold mb-4">
            Plan Your Adventure
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Everything you need to know for a perfect trek in Nepal
          </p>
        </div>

        <Tabs defaultValue="seasons" className="w-full">
          <TabsList className="grid w-full grid-cols-4 mb-8">
            <TabsTrigger value="seasons" className="gap-2">
              <Calendar className="w-4 h-4" />
              <span className="hidden sm:inline">Seasons</span>
            </TabsTrigger>
            <TabsTrigger value="packing" className="gap-2">
              <Backpack className="w-4 h-4" />
              <span className="hidden sm:inline">Packing</span>
            </TabsTrigger>
            <TabsTrigger value="budget" className="gap-2">
              <Wallet className="w-4 h-4" />
              <span className="hidden sm:inline">Budget</span>
            </TabsTrigger>
            <TabsTrigger value="compare" className="gap-2">
              <BarChart3 className="w-4 h-4" />
              <span className="hidden sm:inline">Compare</span>
            </TabsTrigger>
          </TabsList>

          {/* Seasons Tab */}
          <TabsContent value="seasons" className="animate-fade-in">
            <div className="grid md:grid-cols-2 gap-6">
              {seasons.map((season, index) => (
                <Card key={season.name} className="shadow-card hover-lift">
                  <CardHeader>
                    <CardTitle className="font-display text-xl flex items-center gap-3">
                      {seasonIcons[index]}
                      {season.name}
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <h4 className="font-medium text-primary mb-2 flex items-center gap-2">
                        <Check className="w-4 h-4" /> Pros
                      </h4>
                      <ul className="space-y-1">
                        {season.pros.map((pro) => (
                          <li key={pro} className="text-sm text-muted-foreground flex items-start gap-2">
                            <span className="text-primary mt-1">•</span>
                            {pro}
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div>
                      <h4 className="font-medium text-destructive mb-2 flex items-center gap-2">
                        <X className="w-4 h-4" /> Cons
                      </h4>
                      <ul className="space-y-1">
                        {season.cons.map((con) => (
                          <li key={con} className="text-sm text-muted-foreground flex items-start gap-2">
                            <span className="text-destructive mt-1">•</span>
                            {con}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Packing Tab */}
          <TabsContent value="packing" className="animate-fade-in">
            <Card className="shadow-card">
              <CardHeader>
                <CardTitle className="font-display text-2xl flex items-center gap-3">
                  <Backpack className="w-6 h-6 text-primary" />
                  Packing List
                </CardTitle>
                <div className="flex gap-2 mt-4">
                  {(['Easy', 'Moderate', 'Challenging'] as DifficultyLevel[]).map((level) => (
                    <Badge
                      key={level}
                      variant={selectedDifficulty === level ? 'default' : 'outline'}
                      className="cursor-pointer transition-all"
                      onClick={() => setSelectedDifficulty(level)}
                    >
                      {level}
                    </Badge>
                  ))}
                </div>
              </CardHeader>
              <CardContent>
                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
                  {packingLists[selectedDifficulty].map((item, index) => (
                    <div
                      key={item}
                      className="flex items-center gap-3 p-3 bg-muted/50 rounded-lg animate-fade-in"
                      style={{ animationDelay: `${index * 0.05}s` }}
                    >
                      <div className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center">
                        <Check className="w-4 h-4 text-primary" />
                      </div>
                      <span className="text-sm">{item}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Budget Tab */}
          <TabsContent value="budget" className="animate-fade-in">
            <Card className="shadow-card">
              <CardHeader>
                <CardTitle className="font-display text-2xl flex items-center gap-3">
                  <Wallet className="w-6 h-6 text-accent" />
                  Budget Estimates
                </CardTitle>
                <div className="flex gap-2 mt-4">
                  {(['Easy', 'Moderate', 'Challenging'] as DifficultyLevel[]).map((level) => (
                    <Badge
                      key={level}
                      variant={selectedDifficulty === level ? 'default' : 'outline'}
                      className="cursor-pointer transition-all"
                      onClick={() => setSelectedDifficulty(level)}
                    >
                      {level}
                    </Badge>
                  ))}
                </div>
              </CardHeader>
              <CardContent>
                <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
                  {Object.entries(budgetEstimates[selectedDifficulty])
                    .filter(([key]) => key !== 'total')
                    .map(([key, value]) => (
                      <div key={key} className="p-4 bg-muted/50 rounded-xl text-center">
                        <p className="text-sm text-muted-foreground capitalize mb-1">{key}</p>
                        <p className="text-2xl font-display font-bold text-foreground">${value}</p>
                      </div>
                    ))}
                </div>
                <div className="p-6 gradient-hero rounded-xl text-center">
                  <p className="text-primary-foreground/80 text-sm mb-1">Estimated Total</p>
                  <p className="text-4xl font-display font-bold text-primary-foreground">
                    ${budgetEstimates[selectedDifficulty].total}
                  </p>
                  <p className="text-primary-foreground/60 text-xs mt-2">per person, excluding flights</p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Compare Tab */}
          <TabsContent value="compare" className="animate-fade-in">
            <Card className="shadow-card">
              <CardHeader>
                <CardTitle className="font-display text-2xl flex items-center gap-3">
                  <BarChart3 className="w-6 h-6 text-secondary" />
                  Popular vs Hidden Gems
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-2 gap-6">
                  {/* Popular Treks */}
                  <div className="p-6 rounded-xl border-2 border-border">
                    <h3 className="font-display text-xl font-semibold mb-4 text-center">Popular Routes</h3>
                    <div className="space-y-4">
                      <div className="flex justify-between items-center">
                        <span className="text-muted-foreground">Avg. Carbon</span>
                        <span className="font-semibold text-red-500">{comparison.popular.carbon} kg CO₂</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-muted-foreground">Avg. Cost</span>
                        <span className="font-semibold">${comparison.popular.cost}</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-muted-foreground">Crowd Level</span>
                        <Badge variant="destructive">{comparison.popular.crowds}</Badge>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-muted-foreground">Avg. Rating</span>
                        <span className="font-semibold">⭐ {comparison.popular.rating}</span>
                      </div>
                    </div>
                  </div>

                  {/* Hidden Gems */}
                  <div className="p-6 rounded-xl border-2 border-primary bg-primary/5">
                    <h3 className="font-display text-xl font-semibold mb-4 text-center flex items-center justify-center gap-2">
                      <span>Hidden Gems</span>
                      <Badge variant="secondary">Recommended</Badge>
                    </h3>
                    <div className="space-y-4">
                      <div className="flex justify-between items-center">
                        <span className="text-muted-foreground">Avg. Carbon</span>
                        <span className="font-semibold text-green-600">{comparison.hidden.carbon} kg CO₂</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-muted-foreground">Avg. Cost</span>
                        <span className="font-semibold">${comparison.hidden.cost}</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-muted-foreground">Crowd Level</span>
                        <Badge className="bg-green-100 text-green-800">{comparison.hidden.crowds}</Badge>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-muted-foreground">Avg. Rating</span>
                        <span className="font-semibold">⭐ {comparison.hidden.rating}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </section>
  );
};
