import { useState, useEffect, useRef } from 'react';
import '../styles/Dress.css'

const Dress = () => {
    // Data for dress code details
    const dressCodeDetails = {
        mainAttire: 'GUEST ARE REQUESTED TO WEAR BLACK FORMAL ATTIRE',
        gentlemen: {
            subtitle: 'GENTLEMEN',
            items: ['COAT', 'SLACKS', 'LONG SLEEVES', 'TIE AND FORMAL SHOES'],
            restrictions: 'STRICTLY NO JEANS, SHIRTS, SHORTS, SNEAKERS'
        },
        ladies: {
            subtitle: 'LADIES',
            items: ['LONG DRESS'],
            restrictions: 'STRICTLY NO SUNDAY DRESS'
        },
        images: [
            '/Dress/dress1.png',
            '/Dress/dress2.png',
            '/Dress/dress3.png' // Added third image
        ]
    };

    // Color palette for display
    const colorPalette = [
        '#000000', // White
        '#000000', // Light Gray
        '#000000', // Medium Gray
        '#000000', // Dark Gray
        '#000000', // Black
    ];

    // State and refs for in-view animations
    const [titleInView, setTitleInView] = useState(false);
    const titleRef = useRef<HTMLHeadingElement>(null);

    const [mainTextInView, setMainTextInView] = useState(false);
    const mainTextRef = useRef<HTMLParagraphElement>(null);

    const [gentlemenColumnInView, setGentlemenColumnInView] = useState(false);
    const gentlemenColumnRef = useRef<HTMLDivElement>(null);

    const [ladiesColumnInView, setLadiesColumnInView] = useState(false);
    const ladiesColumnRef = useRef<HTMLDivElement>(null);

    const [imagesInView, setImagesInView] = useState(false);
    const imagesRef = useRef<HTMLDivElement>(null);

    const [paletteInView, setPaletteInView] = useState(false); // New state for palette
    const paletteRef = useRef<HTMLDivElement>(null); // New ref for palette

    // List of possible animation classes
    const animationEffects = ['fade-up', 'fade-in', 'slide-left', 'slide-right'];

    // Function to get a random animation class
    const getRandomAnimationClass = () => animationEffects[Math.floor(Math.random() * animationEffects.length)];

    // Effect for in-view animations
    useEffect(() => {
        const observers: IntersectionObserver[] = [];

        const elementsToObserve = [
            { ref: titleRef, setter: setTitleInView, threshold: 0.5 },
            { ref: mainTextRef, setter: setMainTextInView, threshold: 0.4 },
            { ref: gentlemenColumnRef, setter: setGentlemenColumnInView, threshold: 0.3 },
            { ref: ladiesColumnRef, setter: setLadiesColumnInView, threshold: 0.3 },
            { ref: imagesRef, setter: setImagesInView, threshold: 0.2 },
            { ref: paletteRef, setter: setPaletteInView, threshold: 0.2 }, // Observe new palette section
        ];

        elementsToObserve.forEach(({ ref, setter, threshold }) => {
            const observer = new IntersectionObserver(
                ([entry]) => {
                    if (entry.isIntersecting) {
                        setter(true);
                    }
                },
                { root: null, rootMargin: '0px', threshold }
            );
            if (ref.current) observer.observe(ref.current);
            observers.push(observer);
        });

        return () => {
            observers.forEach(observer => observer.disconnect());
        };
    }, []); // Empty dependency array means this effect runs once on mount

    return (
        <>
           

            <div className="dc-dress-code-container">
                <h1
                    ref={titleRef}
                    className={`dc-section-title ${titleInView ? `animate-${getRandomAnimationClass()}` : `initial-${getRandomAnimationClass()}`}`}
                >
                    Dress Code
                </h1>
                <p
                    ref={mainTextRef}
                    className={`dc-main-attire-text ${mainTextInView ? `animate-${getRandomAnimationClass()}` : `initial-${getRandomAnimationClass()}`}`}
                >
                    {dressCodeDetails.mainAttire}
                </p>

                <div className="dc-attire-details-wrapper">
                    <div
                        ref={gentlemenColumnRef}
                        className={`dc-attire-column ${gentlemenColumnInView ? `animate-${getRandomAnimationClass()}` : `initial-${getRandomAnimationClass()}`}`}
                    >
                        <h2 className="dc-attire-subtitle">{dressCodeDetails.gentlemen.subtitle}</h2>
                        <ul className="dc-attire-list">
                            {dressCodeDetails.gentlemen.items.map((item, index) => (
                                <li key={index}>{item}</li>
                            ))}
                        </ul>
                        <p className="dc-attire-restrictions">{dressCodeDetails.gentlemen.restrictions}</p>
                    </div>

                    <div
                        ref={ladiesColumnRef}
                        className={`dc-attire-column ${ladiesColumnInView ? `animate-${getRandomAnimationClass()}` : `initial-${getRandomAnimationClass()}`}`}
                    >
                        <h2 className="dc-attire-subtitle">{dressCodeDetails.ladies.subtitle}</h2>
                        <ul className="dc-attire-list">
                            {dressCodeDetails.ladies.items.map((item, index) => (
                                <li key={index}>{item}</li>
                            ))}
                        </ul>
                        <p className="dc-attire-restrictions">{dressCodeDetails.ladies.restrictions}</p>
                    </div>
                </div>

                <div
                    ref={imagesRef}
                    className={`dc-image-gallery ${imagesInView ? `animate-${getRandomAnimationClass()}` : `initial-${getRandomAnimationClass()}`}`}
                >
                    {dressCodeDetails.images.map((image, index) => (
                        <div key={index} className="dc-gallery-image-wrapper">
                            <img
                                src={image}
                                alt={`Attire Example ${index + 1}`}
                                className="dc-gallery-image"
                                onError={(e) => { (e.target as HTMLImageElement).src = 'https://placehold.co/600x400/000000/ffffff?text=Image+Error'; }}
                            />
                        </div>
                    ))}
                </div>

                {/* New Color Palette Section */}
                <div
                    ref={paletteRef}
                    className={`dc-color-palette-wrapper ${paletteInView ? `animate-${getRandomAnimationClass()}` : `initial-${getRandomAnimationClass()}`}`}
                >
                    <h2>Our Color Palette</h2>
                    <div className="dc-color-swatches">
                        {colorPalette.map((color, index) => (
                            <div
                                key={index}
                                className="dc-color-swatch"
                                style={{ backgroundColor: color }}
                            ></div>
                        ))}
                    </div>
                </div>
            </div>
        </>
    );
};

export default Dress;
