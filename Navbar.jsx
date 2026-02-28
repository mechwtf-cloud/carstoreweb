/* Velocity Motors - Additional Styles */

/* Hero section styles */
.hero-section {
    position: relative;
    min-height: 100vh;
    overflow: hidden;
}

.hero-bg {
    position: absolute;
    inset: 0;
    background-size: cover;
    background-position: center;
    filter: brightness(0.6);
}

/* Navigation styles */
.nav-link {
    position: relative;
    font-size: 0.875rem;
    font-weight: 500;
    text-transform: uppercase;
    letter-spacing: 0.1em;
    color: #EDEDED;
    transition: color 0.2s ease;
}

.nav-link:hover {
    color: #D90429;
}

.nav-link::after {
    content: '';
    position: absolute;
    bottom: -4px;
    left: 0;
    width: 0;
    height: 2px;
    background: #D90429;
    transition: width 0.3s ease;
}

.nav-link:hover::after {
    width: 100%;
}

/* Slant clip path for buttons */
.clip-slant {
    clip-path: polygon(8px 0, 100% 0, calc(100% - 8px) 100%, 0 100%);
}

/* Gallery thumbnail hover */
.gallery-thumb {
    opacity: 0.6;
    transition: opacity 0.3s ease, border-color 0.3s ease;
}

.gallery-thumb:hover,
.gallery-thumb.active {
    opacity: 1;
}

/* Spec grid styling */
.spec-item {
    border-bottom: 1px solid rgba(255, 255, 255, 0.1);
    padding: 1rem 0;
}

.spec-label {
    font-size: 0.75rem;
    text-transform: uppercase;
    letter-spacing: 0.15em;
    color: #A3A3A3;
}

.spec-value {
    font-family: 'JetBrains Mono', monospace;
    font-size: 1.25rem;
    font-weight: 600;
    color: #EDEDED;
}

/* Filter sidebar */
.filter-section {
    border-bottom: 1px solid rgba(255, 255, 255, 0.1);
    padding-bottom: 1.5rem;
    margin-bottom: 1.5rem;
}

/* Testimonial card */
.testimonial-card {
    position: relative;
    padding: 2rem;
    background: rgba(10, 10, 10, 0.8);
    border: 1px solid rgba(255, 255, 255, 0.05);
    transition: border-color 0.3s ease;
}

.testimonial-card:hover {
    border-color: rgba(217, 4, 41, 0.3);
}

.testimonial-card::before {
    content: '"';
    position: absolute;
    top: 1rem;
    left: 1.5rem;
    font-family: 'Oswald', sans-serif;
    font-size: 4rem;
    color: #D90429;
    opacity: 0.3;
    line-height: 1;
}

/* Footer link hover */
.footer-link {
    color: #A3A3A3;
    transition: color 0.2s ease;
}

.footer-link:hover {
    color: #D90429;
}

/* Loading skeleton */
.skeleton {
    background: linear-gradient(90deg, #1a1a1a 25%, #262626 50%, #1a1a1a 75%);
    background-size: 200% 100%;
    animation: skeleton-loading 1.5s infinite;
}

@keyframes skeleton-loading {
    0% {
        background-position: 200% 0;
    }
    100% {
        background-position: -200% 0;
    }
}

/* Mobile menu animation */
.mobile-menu {
    transform: translateX(100%);
    transition: transform 0.3s ease;
}

.mobile-menu.open {
    transform: translateX(0);
}

/* Image zoom on hover */
.image-zoom {
    overflow: hidden;
}

.image-zoom img {
    transition: transform 0.5s ease;
}

.image-zoom:hover img {
    transform: scale(1.1);
}

/* Price tag styling */
.price-tag {
    font-family: 'JetBrains Mono', monospace;
    font-weight: 600;
    color: #D90429;
}

/* Badge styling */
.brand-badge {
    font-size: 0.625rem;
    text-transform: uppercase;
    letter-spacing: 0.15em;
    padding: 0.25rem 0.75rem;
    background: rgba(217, 4, 41, 0.2);
    color: #D90429;
    border: 1px solid rgba(217, 4, 41, 0.3);
}

/* Team member hover effect */
.team-member img {
    filter: grayscale(100%);
    transition: filter 0.5s ease;
}

.team-member:hover img {
    filter: grayscale(0%);
}

/* Form success animation */
.form-success {
    animation: successPulse 0.5s ease;
}

@keyframes successPulse {
    0%, 100% {
        transform: scale(1);
    }
    50% {
        transform: scale(1.02);
    }
}
