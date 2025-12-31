import { Link } from 'react-router-dom';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Spa } from '@/types/spa';

interface SpaNavigationProps {
  prevSpa: Spa | null;
  nextSpa: Spa | null;
}

const SpaNavigation = ({ prevSpa, nextSpa }: SpaNavigationProps) => {
  return (
    <nav aria-label="Spa navigation" className="border-t border-border pt-8 mb-12">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {prevSpa ? (
          <Link
            to={`/spa/${prevSpa.id}`}
            className="group flex items-center gap-4 p-4 bg-muted rounded-xl hover:bg-muted/80 transition-colors"
          >
            <ChevronLeft className="w-5 h-5 text-muted-foreground group-hover:text-primary transition-colors" />
            <div className="text-left">
              <p className="text-sm text-muted-foreground">Previous Spa</p>
              <p className="font-semibold text-foreground group-hover:text-primary transition-colors">
                {prevSpa.name}
              </p>
            </div>
          </Link>
        ) : (
          <div />
        )}
        
        {nextSpa ? (
          <Link
            to={`/spa/${nextSpa.id}`}
            className="group flex items-center justify-end gap-4 p-4 bg-muted rounded-xl hover:bg-muted/80 transition-colors text-right"
          >
            <div>
              <p className="text-sm text-muted-foreground">Next Spa</p>
              <p className="font-semibold text-foreground group-hover:text-primary transition-colors">
                {nextSpa.name}
              </p>
            </div>
            <ChevronRight className="w-5 h-5 text-muted-foreground group-hover:text-primary transition-colors" />
          </Link>
        ) : (
          <div />
        )}
      </div>
    </nav>
  );
};

export default SpaNavigation;