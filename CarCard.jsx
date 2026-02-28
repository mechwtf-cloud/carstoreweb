import { Link } from 'react-router-dom';
import { Zap, Gauge, Calendar } from 'lucide-react';

export const CarCard = ({ car, featured = false }) => {
  const formatPrice = (price) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      maximumFractionDigits: 0,
    }).format(price);
  };

  return (
    <div
      data-testid={`car-card-${car.id}`}
      className={`car-card group relative overflow-hidden bg-zinc-900/50 border border-white/5 hover:border-primary/50 ${
        featured ? 'aspect-[4/3]' : ''
      }`}
    >
      {/* Brand Badge */}
      <div className="absolute top-4 left-4 z-10">
        <span className="brand-badge">{car.brand}</span>
      </div>

      {/* Image Container */}
      <div className="relative aspect-[16/10] overflow-hidden">
        <img
          src={car.image}
          alt={car.name}
          className="car-image w-full h-full object-cover transition-transform duration-500"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
      </div>

      {/* Content */}
      <div className="p-6">
        <h3 className="text-xl font-bold text-white uppercase tracking-tight mb-2 group-hover:text-primary transition-colors duration-300">
          {car.name}
        </h3>

        <div className="price-tag text-2xl mb-4">
          {formatPrice(car.price)}
        </div>

        {/* Specs Row */}
        <div className="flex items-center gap-6 mb-6 text-muted-foreground text-sm">
          <div className="flex items-center gap-2">
            <Zap size={14} className="text-primary" />
            <span className="mono-numbers">{car.horsepower} HP</span>
          </div>
          <div className="flex items-center gap-2">
            <Gauge size={14} className="text-primary" />
            <span className="mono-numbers">{car.acceleration}</span>
          </div>
          <div className="flex items-center gap-2">
            <Calendar size={14} className="text-primary" />
            <span className="mono-numbers">{car.year}</span>
          </div>
        </div>

        {/* Hover Reveal Specs */}
        <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 mb-4">
          <div className="flex items-center justify-between text-sm border-t border-white/10 pt-4">
            <span className="text-muted-foreground">Engine</span>
            <span className="text-white mono-numbers">{car.engine}</span>
          </div>
          <div className="flex items-center justify-between text-sm pt-2">
            <span className="text-muted-foreground">Top Speed</span>
            <span className="text-white mono-numbers">{car.top_speed}</span>
          </div>
        </div>

        {/* CTA Button */}
        <Link
          to={`/car/${car.id}`}
          data-testid={`view-details-${car.id}`}
          className="block w-full text-center bg-transparent border border-white/20 text-white font-bold uppercase tracking-wider py-3 hover:bg-primary hover:border-primary transition-all duration-300"
        >
          View Details
        </Link>
      </div>
    </div>
  );
};


