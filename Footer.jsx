import { Link } from 'react-router-dom';
import { MapPin, Phone, Mail, Facebook, Instagram, Twitter, Youtube } from 'lucide-react';

export const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer data-testid="footer" className="bg-[#050505] border-t border-white/5 pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          {/* Brand Column */}
          <div className="space-y-6">
            <Link to="/" className="flex items-center gap-3">
              <div className="w-12 h-12 bg-primary flex items-center justify-center clip-slant">
                <span className="text-white font-bold text-2xl">V</span>
              </div>
              <span className="text-white font-bold text-2xl tracking-tight uppercase">
                Velocity
              </span>
            </Link>
            <p className="text-muted-foreground text-sm leading-relaxed">
              Premium luxury vehicles and unmatched customer service. Experience the thrill of performance at Velocity Motors.
            </p>
            <div className="flex items-center gap-4">
              <a href="#" aria-label="Facebook" className="text-muted-foreground hover:text-primary transition-colors duration-200">
                <Facebook size={20} />
              </a>
              <a href="#" aria-label="Instagram" className="text-muted-foreground hover:text-primary transition-colors duration-200">
                <Instagram size={20} />
              </a>
              <a href="#" aria-label="Twitter" className="text-muted-foreground hover:text-primary transition-colors duration-200">
                <Twitter size={20} />
              </a>
              <a href="#" aria-label="YouTube" className="text-muted-foreground hover:text-primary transition-colors duration-200">
                <Youtube size={20} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-white font-bold uppercase tracking-wider text-sm mb-6">Quick Links</h4>
            <ul className="space-y-4">
              <li>
                <Link to="/inventory" className="footer-link text-sm">View Inventory</Link>
              </li>
              <li>
                <Link to="/about" className="footer-link text-sm">About Us</Link>
              </li>
              <li>
                <Link to="/contact" className="footer-link text-sm">Contact</Link>
              </li>
              <li>
                <a href="#" className="footer-link text-sm">Financing Options</a>
              </li>
              <li>
                <a href="#" className="footer-link text-sm">Trade-In</a>
              </li>
            </ul>
          </div>

          {/* Brands */}
          <div>
            <h4 className="text-white font-bold uppercase tracking-wider text-sm mb-6">Our Brands</h4>
            <ul className="space-y-4">
              <li><a href="#" className="footer-link text-sm">Lamborghini</a></li>
              <li><a href="#" className="footer-link text-sm">Ferrari</a></li>
              <li><a href="#" className="footer-link text-sm">Porsche</a></li>
              <li><a href="#" className="footer-link text-sm">Mercedes-AMG</a></li>
              <li><a href="#" className="footer-link text-sm">BMW M</a></li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-white font-bold uppercase tracking-wider text-sm mb-6">Contact Us</h4>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <MapPin size={18} className="text-primary mt-0.5 flex-shrink-0" />
                <span className="text-muted-foreground text-sm">
                  123 Automotive Drive<br />
                  Los Angeles, CA 90001
                </span>
              </li>
              <li className="flex items-center gap-3">
                <Phone size={18} className="text-primary flex-shrink-0" />
                <a href="tel:+13105551234" className="footer-link text-sm">+1 (310) 555-1234</a>
              </li>
              <li className="flex items-center gap-3">
                <Mail size={18} className="text-primary flex-shrink-0" />
                <a href="mailto:info@velocitymotors.com" className="footer-link text-sm">info@velocitymotors.com</a>
              </li>
            </ul>
            <div className="mt-6">
              <h5 className="text-white font-medium text-sm mb-2">Business Hours</h5>
              <p className="text-muted-foreground text-sm">
                Mon - Fri: 9:00 AM - 7:00 PM<br />
                Sat: 10:00 AM - 5:00 PM<br />
                Sun: By Appointment
              </p>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-white/5 pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-muted-foreground text-sm">
            © {currentYear} Velocity Motors. All rights reserved.
          </p>
          <div className="flex items-center gap-6">
            <a href="#" className="footer-link text-xs uppercase tracking-wider">Privacy Policy</a>
            <a href="#" className="footer-link text-xs uppercase tracking-wider">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
};
