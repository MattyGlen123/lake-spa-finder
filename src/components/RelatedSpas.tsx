import { Link } from 'react-router-dom';
import { MapPin } from 'lucide-react';
import { Spa, businessModelConfig, BusinessModel } from '@/types/spa';

// Import spa images
import spaArmathwaite from '@/assets/spa-armathwaite.jpg';
import spaAnotherPlace from '@/assets/spa-another-place.jpg';
import spaLowWood from '@/assets/spa-low-wood.jpg';

const imageMap: Record<string, string> = {
  '/spa-armathwaite.jpg': spaArmathwaite,
  '/spa-another-place.jpg': spaAnotherPlace,
  '/spa-low-wood.jpg': spaLowWood,
};

interface RelatedSpasProps {
  spas: Spa[];
  currentSpaId: string;
}

const getBadgeClass = (model: BusinessModel) => {
  const classes: Record<BusinessModel, string> = {
    'free-with-booking': 'badge-green',
    'paid-extra': 'badge-yellow',
    'day-passes': 'badge-blue',
    'guests-only': 'badge-red',
    'hybrid': 'badge-purple',
  };
  return classes[model];
};

const RelatedSpas = ({ spas, currentSpaId }: RelatedSpasProps) => {
  const filteredSpas = spas.filter(spa => spa.id !== currentSpaId);
  
  if (filteredSpas.length === 0) return null;

  return (
    <section className="border-t border-border pt-12">
      <h2 className="text-2xl font-bold text-foreground mb-8">Similar Spas You Might Like</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredSpas.map(spa => {
          const config = businessModelConfig[spa.businessModel];
          const imageUrl = imageMap[spa.imageUrl] || spa.imageUrl;
          
          return (
            <Link 
              key={spa.id} 
              to={`/spa/${spa.id}`}
              className="group spa-card overflow-hidden"
            >
              {/* Badge */}
              <div className={`h-8 flex items-center justify-center text-xs font-bold ${getBadgeClass(spa.businessModel)}`}>
                {config.dot} {config.label}
              </div>
              
              {/* Image */}
              <div className="aspect-video overflow-hidden">
                <img
                  src={imageUrl}
                  alt={`${spa.name} spa`}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  loading="lazy"
                />
              </div>
              
              {/* Content */}
              <div className="p-4">
                <h3 className="font-semibold text-foreground group-hover:text-primary transition-colors mb-1">
                  {spa.name}
                </h3>
                <p className="flex items-center gap-1 text-sm text-muted-foreground">
                  <MapPin className="w-3 h-3" />
                  {spa.location}
                </p>
              </div>
            </Link>
          );
        })}
      </div>
    </section>
  );
};

export default RelatedSpas;