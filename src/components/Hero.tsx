import { useState, useEffect, useRef } from 'react';
import '../styles/Hero.css'


    // The Hero section component with a fading image carousel and countdown timer
    const App = () => {
        // Array of placeholder image URLs
        const images = [
            '/HeroImg/hero1.jpg',
            '/HeroImg/hero2.jpg',
            '/HeroImg/hero3.jpg',
            '/HeroImg/hero4.jpg',
        ];
    
        // State to track the current image index in the carousel
        const [currentImageIndex, setCurrentImageIndex] = useState(0);
    
        // State for the countdown timer, initialized with a default object to prevent TypeScript errors
        const [timeLeft, setTimeLeft] = useState({
            days: 0,
            hours: 0,
            minutes: 0,
            seconds: 0,
        });
    
        // States and refs for in-view animations for each text element
        const [titleInView, setTitleInView] = useState(false);
        const [subtitleInView, setSubtitleInView] = useState(false);
        const [dateInView, setDateInView] = useState(false);
    
        const titleRef = useRef<HTMLHeadingElement>(null);
        const subtitleRef = useRef<HTMLHeadingElement>(null);
        const dateRef = useRef<HTMLHeadingElement>(null);
    
        // List of possible animation classes
        const animationEffects = ['fade-up', 'fade-right', 'fade-in'];
    
        // The target date for the wedding
        const weddingDate = new Date('October 16, 2025 15:00:00');
    
        // Function to calculate the time remaining until the wedding date
        const calculateTimeLeft = () => {
            const difference = +weddingDate - +new Date();
            let newTimeLeft = { days: 0, hours: 0, minutes: 0, seconds: 0 };
    
            if (difference > 0) {
                newTimeLeft = {
                    days: Math.floor(difference / (1000 * 60 * 60 * 24)),
                    hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
                    minutes: Math.floor((difference / 1000 / 60) % 60),
                    seconds: Math.floor((difference / 1000) % 60),
                };
            }
    
            return newTimeLeft;
        };
    
        // useEffect hook for the automatic carousel sliding
        useEffect(() => {
            // Set an interval to change the image every 5 seconds
            const intervalId = setInterval(() => {
                setCurrentImageIndex(prevIndex => 
                    (prevIndex + 1) % images.length
                );
            }, 5000); // 5000ms = 5 seconds
    
            // Clear the interval when the component unmounts
            return () => clearInterval(intervalId);
        }, [images.length]); // Re-run effect if the number of images changes
    
        // useEffect hook for the countdown timer
        useEffect(() => {
            // Update the countdown every second
            const timer = setInterval(() => {
                setTimeLeft(calculateTimeLeft());
            }, 1000);
    
            // Clean up the timer when the component unmounts
            return () => clearInterval(timer);
        }, []);
    
        // IntersectionObserver for the text elements
        useEffect(() => {
            const titleObserver = new IntersectionObserver(([entry]) => {
                if (entry.isIntersecting && !titleInView) {
                    setTitleInView(true);
                }
            }, { threshold: 0.5 });
            
            const subtitleObserver = new IntersectionObserver(([entry]) => {
                if (entry.isIntersecting && !subtitleInView) {
                    setSubtitleInView(true);
                }
            }, { threshold: 0.5 });
            
            const dateObserver = new IntersectionObserver(([entry]) => {
                if (entry.isIntersecting && !dateInView) {
                    setDateInView(true);
                }
            }, { threshold: 0.5 });
    
            if (titleRef.current) titleObserver.observe(titleRef.current);
            if (subtitleRef.current) subtitleObserver.observe(subtitleRef.current);
            if (dateRef.current) dateObserver.observe(dateRef.current);
    
            return () => {
                if (titleRef.current) titleObserver.unobserve(titleRef.current);
                if (subtitleRef.current) subtitleObserver.unobserve(subtitleRef.current);
                if (dateRef.current) dateObserver.unobserve(dateRef.current);
            };
        }, [titleInView, subtitleInView, dateInView]);
    
        // Function to navigate to the previous image
        const goToPrevious = () => {
            const newIndex = currentImageIndex === 0 ? images.length - 1 : currentImageIndex - 1;
            setCurrentImageIndex(newIndex);
        };
    
        // Function to navigate to the next image
        const goToNext = () => {
            const newIndex = (currentImageIndex + 1) % images.length;
            setCurrentImageIndex(newIndex);
        };
    
        // Check if there is any time left to display the countdown
        const hasTimeLeft = timeLeft.days > 0 || timeLeft.hours > 0 || timeLeft.minutes > 0 || timeLeft.seconds > 0;
        
        // Get random animation for each text element
        const titleEffect = animationEffects[Math.floor(Math.random() * animationEffects.length)];
        const subtitleEffect = animationEffects[Math.floor(Math.random() * animationEffects.length)];
        const dateEffect = animationEffects[Math.floor(Math.random() * animationEffects.length)];
    
        return (
            <>
              
    
                <div className="hero-container">
                    {/* Carousel images */}
                    {images.map((image, index) => (
                        <img 
                            key={index}
                            src={image} 
                            alt={`Wedding Carousel Image ${index + 1}`} 
                            className={`carousel-image ${index === currentImageIndex ? 'active' : ''}`} 
                            // Use an onerror handler to prevent breaking if the image fails to load
                            onError={(e) => { (e.target as HTMLImageElement).src = 'https://placehold.co/1920x1080/000000/ffffff?text=Image+Not+Found'; }}
                        />
                    ))}
    
                    {/* Navigation arrows */}
                    <div className="carousel-nav">
                        <button onClick={goToPrevious} className="nav-button" aria-label="Previous image">&#10094;</button>
                        <button onClick={goToNext} className="nav-button" aria-label="Next image">&#10095;</button>
                    </div>
    
                    {/* Overlay text and countdown */}
                    <div className="overlay-content">
                        <h1 
                            ref={titleRef} 
                            className={`main-title ${titleInView ? `animate-${titleEffect}` : `initial-${titleEffect}`}`}
                        >
                            Tristan <span className='and'>and</span> Mara
                        </h1>
                        <h2 
                            ref={subtitleRef} 
                            className={`sub-title ${subtitleInView ? `animate-${subtitleEffect}` : `initial-${subtitleEffect}`}`}
                        >
                            We're getting married
                        </h2>
                        <h2 
                            ref={dateRef} 
                            className={`sub-title ${dateInView ? `animate-${dateEffect}` : `initial-${dateEffect}`}`}
                        >
                            October 16, 2025
                        </h2>
                        <div className="music-player">
        <audio controls>
          <source src="/Audio/music.mp3" type="audio/mp3" />
          Your browser does not support the audio element.
        </audio>
      </div>
                        <div className="countdown-timer">
                            {hasTimeLeft ? (
                                <>
                                    <span><span className="number">{timeLeft.days}</span> <br /> Days</span>
                                    <span><span className="number">{timeLeft.hours}</span> <br /> Hours</span>
                                    <span><span className="number">{timeLeft.minutes}</span> <br /> Minutes</span>
                                    <span><span className="number">{timeLeft.seconds}</span> <br /> Seconds</span>
                                </>
                            ) : (
                                
                                <h3 className="sub-title">The wedding has begun!</h3>
                            )}
                        </div>
                    </div>
                </div>
            </>
        );
    };
    
    export default App;
    
