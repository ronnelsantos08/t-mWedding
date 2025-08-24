import  { useState, useEffect, useRef } from 'react';
import '../styles/Invite.css'
// import '../styles/Invite.css' // This import is commented out as styles are inline for Canvas rendering

const Invite = () => {
    // State to track if the main invitation text is in view
    const [invitationTextInView, setInvitationTextInView] = useState(false);
    // State to hold the randomly selected animation class for the main invitation text
    const [invitationTextAnimClass, setInvitationTextAnimClass] = useState('');
    // Ref to the main invitation text element
    const invitationTextRef = useRef<HTMLHeadingElement>(null);

    // States and refs for in-view animations for husband's message section
    const [husbandSectionInView, setHusbandSectionInView] = useState(false);
    const [husbandSectionAnimClass, setHusbandSectionAnimClass] = useState('');
    const husbandSectionRef = useRef<HTMLDivElement>(null);

    // States and refs for in-view animations for wife's message section
    const [wifeSectionInView, setWifeSectionInView] = useState(false);
    const [wifeSectionAnimClass, setWifeSectionAnimClass] = useState('');
    const wifeSectionRef = useRef<HTMLDivElement>(null);

    // List of possible animation classes
    const animationEffects = ['fade-up', 'fade-right', 'fade-in'];

    useEffect(() => {
        // Randomly select animation effects once on mount for all elements
        setInvitationTextAnimClass(animationEffects[Math.floor(Math.random() * animationEffects.length)]);
        setHusbandSectionAnimClass(animationEffects[Math.floor(Math.random() * animationEffects.length)]);
        setWifeSectionAnimClass(animationEffects[Math.floor(Math.random() * animationEffects.length)]);

        // Observer for the main invitation text
        const invitationObserver = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting && !invitationTextInView) {
                    setInvitationTextInView(true);
                }
            },
            { root: null, rootMargin: '0px', threshold: 0.5 }
        );

        // Observer for the husband's message section
        const husbandObserver = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting && !husbandSectionInView) {
                    setHusbandSectionInView(true);
                }
            },
            { root: null, rootMargin: '0px', threshold: 0.3 } // Adjust threshold for message sections
        );

        // Observer for the wife's message section
        const wifeObserver = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting && !wifeSectionInView) {
                    setWifeSectionInView(true);
                }
            },
            { root: null, rootMargin: '0px', threshold: 0.3 } // Adjust threshold for message sections
        );

        // Observe elements if they exist
        if (invitationTextRef.current) invitationObserver.observe(invitationTextRef.current);
        if (husbandSectionRef.current) husbandObserver.observe(husbandSectionRef.current);
        if (wifeSectionRef.current) wifeObserver.observe(wifeSectionRef.current);

        // Clean up observers on component unmount
        return () => {
            if (invitationTextRef.current) invitationObserver.unobserve(invitationTextRef.current);
            if (husbandSectionRef.current) husbandObserver.unobserve(husbandSectionRef.current);
            if (wifeSectionRef.current) wifeObserver.unobserve(wifeSectionRef.current);
        };
    }, [invitationTextInView, husbandSectionInView, wifeSectionInView]); // Re-run effect if inView states change

    // Base class for the main invitation text animation
    const animatedInvitationTextClass = invitationTextInView ? `animate-${invitationTextAnimClass}` : `initial-${invitationTextAnimClass}`;

    // Base class for husband's message section animation
    const animatedHusbandSectionClass = husbandSectionInView ? `animate-${husbandSectionAnimClass}` : `initial-${husbandSectionAnimClass}`;

    // Base class for wife's message section animation
    const animatedWifeSectionClass = wifeSectionInView ? `animate-${wifeSectionAnimClass}` : `initial-${wifeSectionAnimClass}`;

    return (
        <>
          

            <div className="invitation-container">
                {/* Decorative Images */}
                <img 
                    src="/Invite/ring.png" 
                    alt="Decorative Element" 
                    className="decoration-img decoration-top-left" 
                    onError={(e) => { (e.target as HTMLImageElement).src = 'https://placehold.co/100x100/000000/ffffff?text=Deco'; }}
                />
                <img 
                    src="/Invite/flower.png" 
                    alt="Decorative Element" 
                    className="decoration-img decoration-bottom-right" 
                    onError={(e) => { (e.target as HTMLImageElement).src = 'https://placehold.co/100x100/000000/ffffff?text=Deco'; }}
                />

                <h1 
                    ref={invitationTextRef} 
                    className={`invitation-text ${animatedInvitationTextClass}`}
                >
                    Together with our families, We invite you to witness our Matrimony
                </h1>
                <div className="couple-messages-container">
                    <div 
                        ref={husbandSectionRef}
                        className={`message-section husband-section ${animatedHusbandSectionClass}`}
                    >
                        <img 
                            src="/Invite/husband.jpg" // Using placeholder for Canvas
                            alt="Tristan" 
                            onError={(e) => { (e.target as HTMLImageElement).src = 'https://placehold.co/300x300/000000/ffffff?text=Tristan'; }}
                        />
                        <h2>My Dearest Mara,</h2>
                        <p>
                            From the moment our eyes met, I knew my search was over. You are my home, my confidante, and the love of my life.
                            I cannot wait to begin our forever with you, to cherish every moment, and to build a beautiful life together.
                        </p>
                    </div>
                    <div className="message-divider"></div>
                    <div 
                        ref={wifeSectionRef}
                        className={`message-section wife-section ${animatedWifeSectionClass}`}
                    >
                        <img 
                            src="/Invite/wife.jpg" // Using placeholder for Canvas
                            alt="Mara" 
                            onError={(e) => { (e.target as HTMLImageElement).src = 'https://placehold.co/300x300/000000/ffffff?text=Mara'; }}
                        />
                        <h2>My Love Tristan,</h2>
                        <p>
                            You came into my life and painted my world with colors I never knew existed. You are my greatest adventure and my
                            calmest port. I am so blessed to call you mine, and I eagerly anticipate the day we say "I do."
                        </p>
                    </div> 
                </div>
            </div>
        </>
    );
};

export default Invite;
