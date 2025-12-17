import { Check, ChevronDown } from 'lucide-react';
import { BusinessModel, businessModelConfig } from '@/types/spa';
import { locations, facilityOptions } from '@/data/spas';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Checkbox } from '@/components/ui/checkbox';

interface FilterSectionProps {
  selectedBusinessModels: BusinessModel[];
  onBusinessModelChange: (model: BusinessModel) => void;
  selectedLocation: string;
  onLocationChange: (location: string) => void;
  selectedFacilities: string[];
  onFacilityChange: (facility: string) => void;
  onClearFilters: () => void;
  totalCount: number;
  filteredCount: number;
}

const FilterSection = ({
  selectedBusinessModels,
  onBusinessModelChange,
  selectedLocation,
  onLocationChange,
  selectedFacilities,
  onFacilityChange,
  onClearFilters,
  totalCount,
  filteredCount,
}: FilterSectionProps) => {
  const businessModels: BusinessModel[] = [
    'free-with-booking',
    'paid-extra',
    'day-passes',
    'guests-only',
    'hybrid',
  ];

  const getBusinessModelColors = (model: BusinessModel) => {
    const colors: Record<BusinessModel, string> = {
      'free-with-booking': 'bg-spa-green text-spa-green-foreground',
      'paid-extra': 'bg-spa-yellow text-spa-yellow-foreground',
      'day-passes': 'bg-spa-blue text-spa-blue-foreground',
      'guests-only': 'bg-spa-red text-spa-red-foreground',
      'hybrid': 'bg-spa-purple text-spa-purple-foreground',
    };
    return colors[model];
  };

  return (
    <section className="bg-filter-bg py-6 md:py-8">
      <div className="container mx-auto px-4">
        <div className="flex flex-col gap-6">
          {/* Business Model Filter - Most Prominent */}
          <div>
            <label className="block text-sm font-semibold text-foreground mb-3">
              Spa Access:
            </label>
            <div className="flex flex-wrap gap-2">
              {businessModels.map((model) => {
                const config = businessModelConfig[model];
                const isActive = selectedBusinessModels.includes(model);
                
                return (
                  <button
                    key={model}
                    onClick={() => onBusinessModelChange(model)}
                    className={`
                      filter-pill
                      ${isActive ? `${getBusinessModelColors(model)} border-transparent` : ''}
                    `}
                    aria-pressed={isActive}
                  >
                    <span>{config.dot}</span>
                    <span>{config.label}</span>
                    {isActive && <Check className="w-4 h-4 ml-1" />}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Location and Facilities Row */}
          <div className="flex flex-col sm:flex-row gap-6">
            {/* Location Filter */}
            <div className="flex-1">
              <label className="block text-sm font-semibold text-foreground mb-3">
                Location:
              </label>
              <DropdownMenu>
                <DropdownMenuTrigger className="w-full sm:w-auto flex items-center justify-between gap-2 px-4 py-2.5 bg-background border border-border rounded-lg text-sm font-medium hover:border-primary/50 transition-colors">
                  <span>{selectedLocation}</span>
                  <ChevronDown className="w-4 h-4 text-muted-foreground" />
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-56 bg-background border border-border">
                  {locations.map((location) => (
                    <DropdownMenuItem
                      key={location}
                      onClick={() => onLocationChange(location)}
                      className={`cursor-pointer ${selectedLocation === location ? 'bg-accent text-primary font-medium' : ''}`}
                    >
                      {location}
                    </DropdownMenuItem>
                  ))}
                </DropdownMenuContent>
              </DropdownMenu>
            </div>

            {/* Facilities Filter */}
            <div className="flex-1">
              <label className="block text-sm font-semibold text-foreground mb-3">
                Must have:
              </label>
              <div className="flex flex-wrap gap-x-6 gap-y-2">
                {facilityOptions.map((facility) => (
                  <div key={facility.key} className="flex items-center gap-2">
                    <Checkbox
                      id={facility.key}
                      checked={selectedFacilities.includes(facility.key)}
                      onCheckedChange={() => onFacilityChange(facility.key)}
                      className="border-border data-[state=checked]:bg-primary data-[state=checked]:border-primary"
                    />
                    <label
                      htmlFor={facility.key}
                      className="text-sm text-foreground cursor-pointer"
                    >
                      {facility.label}
                    </label>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Results Count and Clear */}
          <div className="flex items-center justify-between pt-2 border-t border-border/50">
            <p className="text-sm text-muted-foreground">
              Showing <span className="font-semibold text-foreground">{filteredCount}</span> of {totalCount} spas
            </p>
            <button
              onClick={onClearFilters}
              className="text-sm text-primary hover:text-primary-dark font-medium transition-colors"
            >
              Clear all filters
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FilterSection;
