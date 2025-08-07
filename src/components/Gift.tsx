import  { useState, useEffect, useRef } from 'react';
import '../styles/Gift.css'

const Gift = () => {
  // Data for the new gift guide section
  const giftGuideDetails = {
    title: "Gift Guide",
    description: "IN THIS HAPPIEST MOMENT OF OUR LIVES, YOUR PRESENCE IS PRESENT ENOUGH. BUT IF WE ARE HONORED WITH A GIFT, A MONETARY GIFT WILL BE MUCH APPRECIATED.",
    // Using a new placeholder image for a light background with a subtle pattern
    bgImageUrl: "/Invite/gift.jpg", 
    // Using a new placeholder image for a gold-colored decoration
    decorationImageUrl: "/Invite/gift2.png" 
  };

  const giftRef = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);

  // Observer for fade-in animation
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );

    if (giftRef.current) observer.observe(giftRef.current);

    return () => {
      if (giftRef.current) observer.unobserve(giftRef.current);
    };
  }, []);

  // Function to calculate animation delay for each element
  const getAnimationDelay = (index: number) => `${0.2 + index * 0.15}s`;

  return (
    <>
     

      <div
        className={`gift-container ${inView ? 'in-view' : ''}`}
        ref={giftRef}
        style={{ backgroundImage: `url(${giftGuideDetails.bgImageUrl})` }}
      >
        <div className="gift-section">
          <h2 style={{ animationDelay: getAnimationDelay(0) }}>{giftGuideDetails.title}</h2>
          <p style={{ animationDelay: getAnimationDelay(1) }}>
            {giftGuideDetails.description}
          </p>
        </div>

        {giftGuideDetails.decorationImageUrl && (
        <img 
        src={ giftGuideDetails.decorationImageUrl}
        alt="Decorative Element"
        className="decoration-img decoration-bottom-right"
      />
         
        )}
      </div>
    </>
  );
};

export default Gift;
