import { Star } from 'lucide-react';

export const TestimonialCard = ({ testimonial }) => {
  return (
    <div data-testid={`testimonial-${testimonial.id}`} className="testimonial-card">
      <div className="relative z-10">
        {/* Stars */}
        <div className="flex items-center gap-1 mb-4">
          {[...Array(5)].map((_, i) => (
            <Star
              key={i}
              size={16}
              className={i < testimonial.rating ? 'text-primary fill-primary' : 'text-muted-foreground'}
            />
          ))}
        </div>

        {/* Quote */}
        <p className="text-muted-foreground leading-relaxed mb-6">
          "{testimonial.text}"
        </p>

        {/* Author */}
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-full bg-zinc-800 overflow-hidden">
            {testimonial.avatar ? (
              <img src={testimonial.avatar} alt={testimonial.name} className="w-full h-full object-cover" />
            ) : (
              <div className="w-full h-full flex items-center justify-center text-white font-bold">
                {testimonial.name.charAt(0)}
              </div>
            )}
          </div>
          <div>
            <h4 className="text-white font-semibold">{testimonial.name}</h4>
            <p className="text-muted-foreground text-sm">{testimonial.car}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

