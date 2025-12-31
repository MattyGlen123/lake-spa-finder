import { useParams, Link, useNavigate } from 'react-router-dom';
import { ArrowLeft, ChevronRight, ExternalLink, MapPin, Users, Clock, Thermometer, Waves, Sparkles, Shield, AlertTriangle } from 'lucide-react';
import { spaData } from '@/data/spas';
import { businessModelConfig, BusinessModel } from '@/types/spa';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import RelatedSpas from '@/components/RelatedSpas';
import SpaNavigation from '@/components/SpaNavigation';

// Import spa images
import spaArmathwaite from '@/assets/spa-armathwaite.jpg';
import spaAnotherPlace from '@/assets/spa-another-place.jpg';
import spaLowWood from '@/assets/spa-low-wood.jpg';

const imageMap: Record<string, string> = {
  '/spa-armathwaite.jpg': spaArmathwaite,
  '/spa-another-place.jpg': spaAnotherPlace,
  '/spa-low-wood.jpg': spaLowWood,
};

const SpaDetail = () => {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  
  const spa = spaData.find(s => s.id === slug);
  const currentIndex = spaData.findIndex(s => s.id === slug);
  
  if (!spa) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-1 flex items-center justify-center pt-16">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-foreground mb-4">Spa Not Found</h1>
            <p className="text-muted-foreground mb-6">The spa you're looking for doesn't exist.</p>
            <Link 
              to="/" 
              className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to All Spas
            </Link>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  const config = businessModelConfig[spa.businessModel];
  const imageUrl = imageMap[spa.imageUrl] || spa.imageUrl;

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

  // Extract age restriction from access policy if exists
  const ageRestriction = spa.accessPolicy.find(policy => 
    policy.toLowerCase().includes('age') || policy.toLowerCase().includes('16+') || policy.toLowerCase().includes('18+')
  );

  // Find related spas (same location or business model)
  const relatedSpas = spaData
    .filter(s => s.id !== spa.id)
    .filter(s => s.location === spa.location || s.businessModel === spa.businessModel)
    .slice(0, 3);

  // Previous and next spas
  const prevSpa = currentIndex > 0 ? spaData[currentIndex - 1] : null;
  const nextSpa = currentIndex < spaData.length - 1 ? spaData[currentIndex + 1] : null;

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />
      
      <main className="flex-1 pt-16">
        {/* Breadcrumbs */}
        <nav aria-label="Breadcrumb" className="container mx-auto px-4 lg:px-8 py-4">
          <ol className="flex items-center gap-2 text-sm">
            <li>
              <Link to="/" className="text-muted-foreground hover:text-primary transition-colors">
                Home
              </Link>
            </li>
            <ChevronRight className="w-4 h-4 text-muted-foreground" />
            <li>
              <span className="text-muted-foreground">{spa.location}</span>
            </li>
            <ChevronRight className="w-4 h-4 text-muted-foreground" />
            <li>
              <span className="text-foreground font-medium">{spa.name}</span>
            </li>
          </ol>
        </nav>

        {/* Hero Section */}
        <section className="relative">
          <div className="aspect-[21/9] md:aspect-[3/1] lg:aspect-[4/1] overflow-hidden">
            <img 
              src={imageUrl} 
              alt={`${spa.name} spa facilities`}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-foreground/80 via-foreground/40 to-transparent" />
          </div>
          
          <div className="absolute inset-0 flex items-end">
            <div className="container mx-auto px-4 lg:px-8 pb-8 md:pb-12">
              <div className={`inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-bold mb-4 ${getBadgeClass(spa.businessModel)}`}>
                {config.dot} {config.label}
              </div>
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-2">
                {spa.name}
              </h1>
              <p className="flex items-center gap-2 text-lg text-white/90">
                <MapPin className="w-5 h-5" />
                {spa.location}, Lake District
              </p>
            </div>
          </div>
        </section>

        {/* Quick Facts Bar */}
        <section className="bg-muted/50 border-y border-border/50">
          <div className="container mx-auto px-4 lg:px-8 py-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="flex items-center gap-3 p-4 bg-card/80 rounded-lg border border-border/30">
                <div className="w-10 h-10 rounded-full bg-muted flex items-center justify-center">
                  <Users className="w-5 h-5 text-muted-foreground" />
                </div>
                <div>
                  <p className="text-xs text-muted-foreground uppercase tracking-wide">Guest Access</p>
                  <p className="font-medium text-foreground">{spa.businessModelText}</p>
                </div>
              </div>
              
              <div className="flex items-center gap-3 p-4 bg-card/80 rounded-lg border border-border/30">
                <div className="w-10 h-10 rounded-full bg-muted flex items-center justify-center">
                  <Clock className="w-5 h-5 text-muted-foreground" />
                </div>
                <div>
                  <p className="text-xs text-muted-foreground uppercase tracking-wide">Day Passes</p>
                  <p className="font-medium text-foreground">
                    {spa.businessModel === 'day-passes' || spa.businessModel === 'hybrid' 
                      ? 'Available' 
                      : 'Not Available'}
                  </p>
                </div>
              </div>
              
              {ageRestriction && (
                <div className="flex items-center gap-3 p-4 bg-card/80 rounded-lg border border-border/30">
                  <div className="w-10 h-10 rounded-full bg-muted flex items-center justify-center">
                    <AlertTriangle className="w-5 h-5 text-muted-foreground" />
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground uppercase tracking-wide">Age Restriction</p>
                    <p className="font-medium text-foreground">{ageRestriction.replace('Age restriction: ', '')}</p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </section>

        {/* Main Content */}
        <div className="container mx-auto px-4 lg:px-8 py-12 bg-muted/30">
          <div className="max-w-4xl">
            {/* Back Button */}
            <Link 
              to="/" 
              className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors mb-8"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to All Spas
            </Link>

            {/* Thermal Facilities */}
            {spa.thermalFacilities.length > 0 && (
              <section className="mb-12">
                <h2 className="flex items-center gap-3 text-xl font-semibold text-foreground mb-6">
                  <div className="w-8 h-8 rounded-full bg-muted flex items-center justify-center">
                    <Thermometer className="w-4 h-4 text-muted-foreground" />
                  </div>
                  Thermal Facilities
                </h2>
                <div className="prose prose-lg text-foreground">
                  <p className="text-muted-foreground leading-relaxed mb-4">
                    {spa.name} features a comprehensive thermal suite designed for complete relaxation and rejuvenation. 
                    The facilities include a range of heat experiences to suit every preference.
                  </p>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mt-6">
                    {spa.thermalFacilities.map((facility, index) => (
                      <div key={index} className="flex items-start gap-3 p-4 bg-card rounded-lg border border-border/40">
                        <span className="w-1.5 h-1.5 rounded-full bg-muted-foreground mt-2 shrink-0" />
                        <div>
                          <h3 className="font-medium text-foreground">{facility.name}</h3>
                          <p className="text-sm text-muted-foreground">{facility.details}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </section>
            )}

            {/* Pools & Water Features */}
            {spa.poolFeatures.length > 0 && (
              <section className="mb-12">
                <h2 className="flex items-center gap-3 text-xl font-semibold text-foreground mb-6">
                  <div className="w-8 h-8 rounded-full bg-muted flex items-center justify-center">
                    <Waves className="w-4 h-4 text-muted-foreground" />
                  </div>
                  Pools & Water Features
                </h2>
                <div className="prose prose-lg text-foreground">
                  <p className="text-muted-foreground leading-relaxed mb-4">
                    The water facilities at {spa.name} offer a variety of aquatic experiences, 
                    from swimming pools to hydrotherapy features.
                  </p>
                  <div className="space-y-3 mt-6">
                    {spa.poolFeatures.map((pool, index) => (
                      <div key={index} className="p-4 bg-card rounded-lg border border-border/40">
                        <h3 className="font-medium text-foreground mb-1">{pool.name}</h3>
                        <p className="text-muted-foreground text-sm">{pool.details}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </section>
            )}

            {/* Treatment & Relaxation */}
            {spa.goodToKnow.length > 0 && (
              <section className="mb-12">
                <h2 className="flex items-center gap-3 text-xl font-semibold text-foreground mb-6">
                  <div className="w-8 h-8 rounded-full bg-muted flex items-center justify-center">
                    <Sparkles className="w-4 h-4 text-muted-foreground" />
                  </div>
                  Treatment & Relaxation
                </h2>
                <div className="prose prose-lg text-foreground">
                  <p className="text-muted-foreground leading-relaxed mb-4">
                    Beyond the thermal suite and pools, {spa.name} offers additional amenities 
                    to enhance your spa experience.
                  </p>
                  <ul className="space-y-2 mt-6">
                    {spa.goodToKnow.map((info, index) => (
                      <li key={index} className="flex items-start gap-3 text-foreground text-sm">
                        <span className="w-1.5 h-1.5 rounded-full bg-muted-foreground mt-2 shrink-0" />
                        {info}
                      </li>
                    ))}
                  </ul>
                </div>
              </section>
            )}

            {/* Access & Pricing - Critical Section */}
            <section className="mb-12">
              <h2 className="flex items-center gap-3 text-xl font-semibold text-foreground mb-6">
                <div className="w-8 h-8 rounded-full bg-muted flex items-center justify-center">
                  <Shield className="w-4 h-4 text-muted-foreground" />
                </div>
                Access & Pricing
              </h2>
              <div className={`p-5 rounded-lg border mb-6 ${getBadgeClass(spa.businessModel)}`}>
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-xl">{config.dot}</span>
                  <span className="font-semibold">{config.label}</span>
                </div>
                <p className="text-sm opacity-90">{spa.businessModelText}</p>
              </div>
              
              <div className="prose prose-lg text-foreground">
                <p className="text-muted-foreground leading-relaxed mb-4">
                  Understanding the access policy is essential when planning your visit. 
                  Here's everything you need to know about accessing the spa at {spa.name}.
                </p>
                <div className="space-y-2 mt-6">
                  {spa.accessPolicy.map((policy, index) => (
                    <div key={index} className="flex items-start gap-3 p-3 bg-card rounded-lg border border-border/40">
                      <span className="text-muted-foreground text-sm">•</span>
                      <span className="text-foreground text-sm">{policy}</span>
                    </div>
                  ))}
                </div>
              </div>
            </section>

            {/* Age Restrictions */}
            {ageRestriction && (
              <section className="mb-12">
                <div className="p-5 bg-muted/60 border border-border/50 rounded-lg">
                  <h3 className="flex items-center gap-2 text-sm font-semibold text-foreground mb-2">
                    <AlertTriangle className="w-4 h-4 text-muted-foreground" />
                    Age Restrictions
                  </h3>
                  <p className="text-muted-foreground text-sm">{ageRestriction}</p>
                </div>
              </section>
            )}

            {/* CTA */}
            <section className="mb-12 pt-8 border-t border-border/50">
              <a
                href={spa.websiteUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-3 w-full md:w-auto px-8 py-4 bg-foreground text-background text-base font-medium rounded-lg hover:bg-foreground/90 transition-colors"
              >
                Visit {spa.name} Website
                <ExternalLink className="w-4 h-4" />
              </a>
              <p className="text-xs text-muted-foreground mt-3">
                Opens external website in a new tab
              </p>
            </section>
          </div>

          {/* Navigation */}
          <SpaNavigation prevSpa={prevSpa} nextSpa={nextSpa} />

          {/* Related Spas */}
          {relatedSpas.length > 0 && (
            <RelatedSpas spas={relatedSpas} currentSpaId={spa.id} />
          )}
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default SpaDetail;