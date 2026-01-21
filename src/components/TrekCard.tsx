import { Heart, MapPin, Clock, Mountain, Star, Leaf, Users } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Trek } from '@/data/treks';

interface TrekCardProps {
  trek: Trek;
  isFavorite: boolean;
  onToggleFavorite: (id: string) => void;
  onBook: (trek: Trek) => void;
}

export const TrekCard = ({ trek, isFavorite, onToggleFavorite, onBook }: TrekCardProps) => {
  const difficultyColors = {
    Easy: 'bg-green-100 text-green-800 border-green-200',
    Moderate: 'bg-amber-100 text-amber-800 border-amber-200',
    Challenging: 'bg-red-100 text-red-800 border-red-200',
  };

  const crowdColors = {
    Low: 'text-green-600',
    Medium: 'text-amber-600',
    High: 'text-red-600',
  };

  return (
    <div className="group relative bg-card rounded-2xl overflow-hidden shadow-card card-hover border border-border/50">
      {/* Image */}
      <div className="relative h-56 overflow-hidden">
        <img
          src={trek.image}
          alt={trek.name}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
        
        {/* Hidden Gem Badge */}
        {trek.isHiddenGem && (
          <div className="absolute top-4 left-4 px-3 py-1 rounded-full bg-accent text-accent-foreground text-xs font-semibold flex items-center gap-1">
            <Leaf className="w-3 h-3" />
            Hidden Gem
          </div>
        )}

        {/* Favorite Button */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            onToggleFavorite(trek.id);
          }}
          className={`absolute top-4 right-4 p-2 rounded-full transition-all duration-300 ${
            isFavorite 
              ? 'bg-red-500 text-white' 
              : 'bg-white/80 text-gray-600 hover:bg-white'
          }`}
        >
          <Heart className={`w-5 h-5 ${isFavorite ? 'fill-current' : ''}`} />
        </button>

        {/* Location & Rating */}
        <div className="absolute bottom-4 left-4 right-4 flex justify-between items-end">
          <div className="flex items-center gap-1 text-white text-sm">
            <MapPin className="w-4 h-4" />
            <span>{trek.location}</span>
          </div>
          <div className="flex items-center gap-1 bg-white/90 px-2 py-1 rounded-full">
            <Star className="w-4 h-4 text-amber-500 fill-amber-500" />
            <span className="text-sm font-semibold text-foreground">{trek.rating}</span>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="p-5 space-y-4">
        <div>
          <h3 className="font-display text-xl font-semibold text-foreground group-hover:text-primary transition-colors">
            {trek.name}
          </h3>
          <div className="flex flex-wrap gap-2 mt-2">
            <Badge variant="outline" className={difficultyColors[trek.difficulty]}>
              {trek.difficulty}
            </Badge>
            {trek.vibes.slice(0, 2).map((vibe) => (
              <Badge key={vibe} variant="secondary" className="text-xs">
                {vibe}
              </Badge>
            ))}
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-3 py-3 border-y border-border/50">
          <div className="text-center">
            <Clock className="w-4 h-4 mx-auto text-muted-foreground mb-1" />
            <span className="text-xs text-muted-foreground block">Duration</span>
            <span className="text-sm font-medium">{trek.duration}</span>
          </div>
          <div className="text-center">
            <Mountain className="w-4 h-4 mx-auto text-muted-foreground mb-1" />
            <span className="text-xs text-muted-foreground block">Altitude</span>
            <span className="text-sm font-medium">{trek.altitude}</span>
          </div>
          <div className="text-center">
            <Users className="w-4 h-4 mx-auto text-muted-foreground mb-1" />
            <span className="text-xs text-muted-foreground block">Crowds</span>
            <span className={`text-sm font-medium ${crowdColors[trek.crowdLevel]}`}>
              {trek.crowdLevel}
            </span>
          </div>
        </div>

        {/* Highlights */}
        <div className="space-y-2">
          <span className="text-xs font-medium text-muted-foreground uppercase tracking-wide">Highlights</span>
          <div className="flex flex-wrap gap-1">
            {trek.highlights.slice(0, 3).map((highlight) => (
              <span key={highlight} className="text-xs px-2 py-1 bg-muted rounded-full text-muted-foreground">
                {highlight}
              </span>
            ))}
          </div>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between pt-2">
          <div className="flex items-center gap-2">
            <Leaf className="w-4 h-4 text-primary" />
            <span className="text-sm text-muted-foreground">
              {trek.carbonScore} kg CO₂
            </span>
          </div>
          <div className="text-right">
            <span className="text-lg font-display font-bold text-primary">${trek.cost}</span>
            <span className="text-xs text-muted-foreground">/person</span>
          </div>
        </div>

        <Button 
          className="w-full" 
          variant="default"
          onClick={() => onBook(trek)}
        >
          Book Now
        </Button>
      </div>
    </div>
  );
};
