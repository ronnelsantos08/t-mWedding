import { useState, useEffect, useRef } from 'react';
import '../styles/Location.css'

const Location = () => {
    // Data for wedding and reception venues
    const venues = [
        {
            type: 'Ceremony',
            name: 'Our Lady of Lourdes Parish Church',
            address: 'Silang Junction North, Tagaytay City, Cavite, Philippines',
            description: 'The Our Lady of Lourdes Parish Church in Tagaytay is a serene sanctuary known for its beautiful architecture, tranquil environment, and spiritual ambiance.',
            mapLink: 'https://maps.app.goo.gl/1JJasYCD5VVhFvRa7', // IMPORTANT: Replace with actual Google Maps link
            image: '/Location/location1.jpg'
        },
        {
            type: 'Reception',
            name: 'Aquila Crystal Palace Tagaytay Events Place',
            address: '328 Brgy. Maitim 2nd East, Emilio Aguinaldo Highway, Tagaytay City, Philippines',
            description: 'Experience romance of air in Aquila Crystal Palace. It is a never been seen venue in the heart of Metro Tagaytay with its signature polycarbonate crystal architecture and Porcelain flooring in front of a huge man-made lake.',
            mapLink: 'https://maps.app.goo.gl/a4HnW3pJmn6NGhXe6', // IMPORTANT: Replace with actual Google Maps link
            image: '/Location/location2.jpg'
        },
    ];

    // State to track in-view status for the main title and each venue block
    const [titleInView, setTitleInView] = useState(false);
    const [venueInViewStates, setVenueInViewStates] = useState(venues.map(() => false));

    // Refs for the main title and each venue block
    const titleRef = useRef<HTMLHeadingElement>(null);
    const venueRefs = useRef<(HTMLDivElement | null)[]>([]);

    // List of possible animation classes for in-view effects
    const animationEffects = ['fade-up', 'fade-in', 'slide-left', 'slide-right'];

    // Effect for the main title's in-view animation
    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting && !titleInView) {
                    setTitleInView(true);
                }
            },
            { root: null, rootMargin: '0px', threshold: 0.5 }
        );

        if (titleRef.current) observer.observe(titleRef.current);
        return () => {
            if (titleRef.current) observer.unobserve(titleRef.current);
        };
    }, [titleInView]);

    // Effect for individual venue blocks' in-view animations
    useEffect(() => {
        const observers: IntersectionObserver[] = [];
        venues.forEach((_, index) => {
            const observer = new IntersectionObserver(
                ([entry]) => {
                    if (entry.isIntersecting && !venueInViewStates[index]) {
                        setVenueInViewStates(prevStates => {
                            const newStates = [...prevStates];
                            newStates[index] = true;
                            return newStates;
                        });
                    }
                },
                { root: null, rootMargin: '0px', threshold: 0.3 }
            );
            if (venueRefs.current[index]) observer.observe(venueRefs.current[index] as Element);
            observers.push(observer);
        });

        return () => {
            observers.forEach((observer, index) => {
                if (venueRefs.current[index]) observer.unobserve(venueRefs.current[index] as Element);
            });
        };
    }, [venueInViewStates, venues.length]);

    // Determine animation class for the main title
    const titleAnimationClass = titleInView 
        ? `animate-${animationEffects[Math.floor(Math.random() * animationEffects.length)]}` 
        : `initial-${animationEffects[Math.floor(Math.random() * animationEffects.length)]}`;

    return (
        <>
           

            <div className="venue-section-container">
                <h1 
                    ref={titleRef} 
                    className={`venue-section-title ${titleAnimationClass}`}
                >
                    Our Venues
                </h1>
                <div className="venue-blocks-wrapper">
                    {venues.map((venue, index) => {
                        // Randomly select an animation effect for each venue block
                        const randomEffect = animationEffects[Math.floor(Math.random() * animationEffects.length)];
                        const animatedClass = venueInViewStates[index] ? `animate-${randomEffect}` : `initial-${randomEffect}`;

                        return (
                            <div 
                                key={index} 
                                ref={el => { venueRefs.current[index] = el; }}
                                className={`venue-block ${animatedClass}`}
                            >
                                <img 
                                    src={venue.image} 
                                    alt={`${venue.type} Venue`} 
                                    className="venue-block-image"
                                    onError={(e) => { (e.target as HTMLImageElement).src = 'https://placehold.co/600x400/000000/ffffff?text=Image+Error'; }}
                                />
                                <h2 className="venue-block-type">{venue.type}</h2>
                                <h3 className="venue-block-name">{venue.name}</h3>
                                <p className="venue-block-address">{venue.address}</p>
                                <p className="venue-block-description">{venue.description}</p>
                                <a 
                                    href={venue.mapLink} 
                                    target="_blank" 
                                    rel="noopener noreferrer" 
                                    className="map-link"
                                >
                                    {/* Google Maps icon (simplified SVG) */}
                                    <svg className="map-icon" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
                                    </svg>
                                    View on Map
                                </a>
                            </div>
                        );
                    })}
                </div>
            </div>
        </>
    );
};

export default Location;
