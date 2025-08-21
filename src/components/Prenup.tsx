import { useState, useEffect, useRef } from 'react';
import '../styles/Prenup.css'

const Prenup = () => {
    // Array of placeholder image URLs for the gallery
    const images = Array.from({ length: 26 }, (_, i) => `/Prenup/Prenup${i + 1}.jpeg`);

    // State to track in-view status for each image
    const [inViewStates, setInViewStates] = useState(images.map(() => false));
    // Refs for each image element
    const imageRefs = useRef<(HTMLDivElement | null)[]>([]);

    // State for the modal (lightbox)
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [currentModalImageIndex, setCurrentModalImageIndex] = useState(0);

    // List of possible animation classes for images
    const animationEffects = ['fade-up', 'fade-in'];

    useEffect(() => {
        const observers: IntersectionObserver[] = [];

        images.forEach((_, index) => {
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
                    threshold: 0.2, // Trigger when 20% of the image is visible
                }
            );

            if (imageRefs.current[index]) {
                observer.observe(imageRefs.current[index] as Element);
            }
            observers.push(observer);
        });

        // Clean up observers on component unmount
        return () => {
            observers.forEach((observer, index) => {
                if (imageRefs.current[index]) {
                    observer.unobserve(imageRefs.current[index] as Element);
                }
            });
        };
    }, [inViewStates, images.length]); // Re-run effect if inViewStates or number of images changes

    // Function to open the modal with a specific image
    const openModal = (index: number) => {
        setCurrentModalImageIndex(index);
        setIsModalOpen(true);
    };

    // Function to close the modal
    const closeModal = () => {
        setIsModalOpen(false);
    };

    // Function to navigate to the previous image in the modal
    const goToPreviousModalImage = () => {
        setCurrentModalImageIndex(prevIndex => 
            (prevIndex === 0) ? images.length - 1 : prevIndex - 1
        );
    };

    // Function to navigate to the next image in the modal
    const goToNextModalImage = () => {
        setCurrentModalImageIndex(prevIndex => 
            (prevIndex + 1) % images.length
        );
    };

    return (
        <>
           

            <div className="gallery-container">
                <h1 className="gallery-title">Our Prenup Gallery</h1>
                <div className="image-grid">
                    {images.map((image, index) => {
                        const randomEffect = animationEffects[Math.floor(Math.random() * animationEffects.length)];
                        const animatedClass = inViewStates[index] ? `animate-${randomEffect}` : `initial-${randomEffect}`;

                        return (
                            <div 
                                key={index} 
                                ref={el => { imageRefs.current[index] = el; }}
                                className={`image-item ${animatedClass}`}
                                onClick={() => openModal(index)} // Open modal on click
                            >
                                <img 
                                    src={image} 
                                    alt={`Prenup Photo ${index + 1}`} 
                                    onError={(e) => { (e.target as HTMLImageElement).src = 'https://placehold.co/600x400/000000/ffffff?text=Image+Error'; }}
                                />
                            </div>
                        );
                    })}
                </div>
            </div>

            {/* Modal (Lightbox) */}
            {isModalOpen && (
                <div className="modal-overlay" onClick={closeModal}>
                    <button className="modal-close-button" onClick={closeModal}>&times;</button>
                    <button className="modal-nav-button left" onClick={(e) => { e.stopPropagation(); goToPreviousModalImage(); }}>&#10094;</button>
                    <div className="modal-content" onClick={(e) => e.stopPropagation()}> {/* Prevent closing when clicking on image */}
                        <img 
                            src={images[currentModalImageIndex]} 
                            alt={`Prenup Photo ${currentModalImageIndex + 1}`} 
                            className="modal-image" 
                            onError={(e) => { (e.target as HTMLImageElement).src = 'https://placehold.co/1200x800/000000/ffffff?text=Image+Error'; }}
                        />
                    </div>
                    <button className="modal-nav-button right" onClick={(e) => { e.stopPropagation(); goToNextModalImage(); }}>&#10095;</button>
                </div>
            )}
        </>
    );
};

export default Prenup;
