import React, { useRef, useEffect, useState } from 'react';
import '../styles/Entourage.css'

// ProgramItem component handles the display and in-view animation for each program event.
interface ProgramItemProps {
  time: string;
  event: string;
  delay: number; // Stagger delay for animation in milliseconds
  isEven: boolean; // Prop to determine if the item is at an even index for alternating animation
}

const ProgramItem: React.FC<ProgramItemProps> = ({ time, event, delay, isEven }) => {
  const itemRef = useRef<HTMLDivElement>(null); // Ref to observe the DOM element
  const [isVisible, setIsVisible] = useState(false); // State to control visibility and animation

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        // If the element is intersecting the viewport, set isVisible to true
        if (entry.isIntersecting) {
          setIsVisible(true);
          // Stop observing once it's visible to prevent re-triggering
          observer.unobserve(entry.target);
        }
      },
      {
        threshold: 0.5, // Trigger when 50% of the item is visible
        rootMargin: '0px 0px -50px 0px', // Adjust the viewport margin if needed
      }
    );

    // Start observing the element if it exists
    if (itemRef.current) {
      observer.observe(itemRef.current);
    }

    // Cleanup function: disconnect the observer when the component unmounts
    return () => {
      if (itemRef.current) {
        observer.unobserve(itemRef.current);
      }
    };
  }, []); // Empty dependency array ensures this effect runs only once on mount

  return (
    <div
      ref={itemRef} // Attach the ref to the div
      className={`program-item ${isVisible ? 'is-visible' : ''} ${isEven ? 'item-left' : 'item-right'}`}
      style={{ transitionDelay: `${delay * 150}ms` }}
    >
      <div className="program-time">
        {time}
      </div>
      <div className="program-event">
        {event}
      </div>
    </div>
  );
};

// Main App component that renders the wedding program
const Entourage: React.FC = () => {
  // Define the program details
  const program = [
    { time: '3:00 PM', event: 'Wedding Ceremony' },
    { time: '4:30 PM', event: 'Drinks & Canapes' },
    { time: '6:00 PM', event: 'Reception & Dinner' },
  ];

  return (
    <div className="app-container">
    
      <div className="content-box">
        <h1 className="program-heading">
          Our Program
        </h1>
        <div className="program-list">
          {program.map((item, index) => (
            // Render each ProgramItem with a unique key, staggered delay, and alternating side
            <ProgramItem key={index} time={item.time} event={item.event} delay={index} isEven={index % 2 === 0} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Entourage;
