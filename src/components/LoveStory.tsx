import  { useState, useEffect, useRef } from 'react';
import '../styles/LoveStory.css'

const LoveStory = () => {
    // Array of story events, each with a date, title, description, and image
    const storyEvents = [
        {
            date: 'January 2020',
            title: 'Our First Hello',
            description: 'It all began with a chance encounter at a cozy coffee shop. What started as a simple conversation quickly blossomed into something special.',
            image: '/LoveStory/lovestory1.jpg',
            alignment: 'left'
        },
        {
            date: 'August 2021',
            title: 'A Song Between Us',
            description: 'Our next encounter felt like a chorus repeating. You hummed to the café’s guitar, I joined softly, and suddenly the world disappeared, just two hearts keeping time with the same song.',
            image: '/LoveStory/lovestory2.jpg',
            alignment: 'right'
        },
        {
            date: 'February 2023',
            title: 'A Question Asked',
            description: 'Under a sky full of stars, a question was asked, and a resounding "Yes!" echoed. The beginning of our forever truly started that night.',
            image: '/LoveStory/lovestory3.jpg',
            alignment: 'left'
        },
        {
            date: 'Today',
            title: 'Anticipating Forever',
            description: 'Every day since has been a joyful journey towards this moment. We are so excited to celebrate our union with all of you.',
            image: '/LoveStory/lovestory4.jpg',
            alignment: 'right'
        },
    ];

    // State to track in-view status for each story event
    const [inViewStates, setInViewStates] = useState(storyEvents.map(() => false));
    // Refs for each story event element
    const eventRefs = useRef<(HTMLDivElement | null)[]>([]);

    // List of possible animation classes
    const animationEffects = ['fade-up', 'fade-right', 'fade-in', 'fade-left'];

    useEffect(() => {
        const observers: IntersectionObserver[] = [];

        storyEvents.forEach((_, index) => {
            const observer = new IntersectionObserver(
                ([entry]) => {
                    if (entry.isIntersecting && !inViewStates[index]) {
                        setInViewStates(prevStates => {
                            const newStates = [...prevStates];
                            newStates[index] = true;
                            return newStates;
                        });
                    }
                },
                {
                    root: null,
                    rootMargin: '0px',
                    threshold: 0.3, // Trigger when 30% of the element is visible
                }
            );

            if (eventRefs.current[index]) {
                observer.observe(eventRefs.current[index] as Element);
            }
            observers.push(observer);
        });

        // Clean up observers on component unmount
        return () => {
            observers.forEach((observer, index) => {
                if (eventRefs.current[index]) {
                    observer.unobserve(eventRefs.current[index] as Element);
                }
            });
        };
    }, [inViewStates, storyEvents.length]); // Re-run effect if inViewStates or number of events changes

    return (
        <>
            

            <div className="love-story-container">
                <h1 className="love-story-title">Our Love Story</h1>
                {storyEvents.map((event, index) => {
                    const randomEffect = animationEffects[Math.floor(Math.random() * animationEffects.length)];
                    const animatedClass = inViewStates[index] ? `animate-${randomEffect}` : `initial-${randomEffect}`;

                    return (
                        <div
                            key={index}
                            ref={el => { eventRefs.current[index] = el; }}
                            className={`story-event ${event.alignment} ${animatedClass}`}
                        >
                            <div className="story-event-image">
                                <img
                                    src={event.image}
                                    alt={event.title}
                                    onError={(e) => { (e.target as HTMLImageElement).src = 'https://placehold.co/600x400/000000/ffffff?text=Image+Error'; }}
                                />
                            </div>
                            <div className="story-event-content">
                                <p className="story-event-date">{event.date}</p>
                                <h2 className="story-event-title">{event.title}</h2>
                                <p className="story-event-description">{event.description}</p>
                            </div>
                        </div>
                    );
                })}
            </div>
        </>
    );
};

export default LoveStory;
