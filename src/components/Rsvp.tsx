import React, { useState, useEffect, useRef } from 'react';
import '../styles/Rsvp.css';

const Rsvp = () => {
  const rsvpDetails = {
    title: "Kindly RSVP",
    description: "Please let us know if you can join us by filling out the form below. Your timely response is greatly appreciated!",
    bgImageUrl: "/Prenup/Prenup4.jpeg",
    decorationImageUrl: "/Invite/ring2.png"
  };

  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [guests, setGuests] = useState(1);
  const [message, setMessage] = useState('');
  const [isAttending, setIsAttending] = useState(true);
  const [submissionStatus, setSubmissionStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');

  const rsvpRef = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);

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

    if (rsvpRef.current) observer.observe(rsvpRef.current);

    return () => {
      if (rsvpRef.current) observer.unobserve(rsvpRef.current);
    };
  }, []);

  const getAnimationDelay = (index: number) => `${0.2 + index * 0.15 + Math.random() * 0.2}s`;

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setSubmissionStatus('submitting');

    const formData = new FormData();
    formData.append('entry.111290630', name);              // Name
    formData.append('entry.925295489', phone);             // Phone Number
    formData.append('entry.115025782', isAttending ? 'Yes' : 'No'); // Attending?
    formData.append('entry.290850160', guests.toString()); // Number of guests
    formData.append('entry.1668259494', message);          // Message

    try {
        await fetch('https://docs.google.com/forms/d/e/1FAIpQLSf-h5gMKXLL7YzXsu0nkmHzeFeRaIKmkmh-OvXAUNSBgko2EQ/formResponse', {
        method: 'POST',
        mode: 'no-cors',
        body: formData,
      });

      setSubmissionStatus('success');
      setName('');
      setPhone('');
      setGuests(1);
      setIsAttending(true);
      setMessage('');
    } catch (error) {
      console.error('RSVP submission failed:', error);
      setSubmissionStatus('error');
    }
  };

  return (
    <div
      className={`rsvp-container ${inView ? 'in-view' : ''}`}
      ref={rsvpRef}
      style={{ backgroundImage: `url(${rsvpDetails.bgImageUrl})` }}
    >
      <h1 className="rsvp-heading" style={{ animationDelay: getAnimationDelay(0) }}>{rsvpDetails.title}</h1>
      <p className="rsvp-paragraph" style={{ animationDelay: getAnimationDelay(1) }}>{rsvpDetails.description}</p>

      <form className="rsvp-form" onSubmit={handleSubmit}>
        <div className="form-group" style={{ animationDelay: getAnimationDelay(2) }}>
          <label htmlFor="name">Full Name:</label>
          <input
            type="text"
            id="name"
            value={name}
            required
            onChange={(e) => setName(e.target.value)}
            placeholder="Your full name"
          />
        </div>

        <div className="form-group" style={{ animationDelay: getAnimationDelay(3) }}>
          <label htmlFor="phone">Phone Number:</label>
          <input
            type="tel"
            id="phone"
            value={phone}
            required
            onChange={(e) => setPhone(e.target.value)}
            placeholder="+63 900 000 0000"
          />
        </div>

        <div className="form-group" style={{ animationDelay: getAnimationDelay(4) }}>
          <label>Will you be attending?</label>
          <div className="radio-group">
            <label>
              <input
                type="radio"
                name="attending"
                value="yes"
                checked={isAttending}
                onChange={() => setIsAttending(true)}
              />
              Yes, I'll be there!
            </label>
            <label>
              <input
                type="radio"
                name="attending"
                value="no"
                checked={!isAttending}
                onChange={() => setIsAttending(false)}
              />
              No, I can't make it.
            </label>
          </div>
        </div>

        {isAttending && (
          <div className="form-group" style={{ animationDelay: getAnimationDelay(5) }}>
            <label htmlFor="guests">Number of Guests (including yourself):</label>
            <input
              type="number"
              id="guests"
              value={guests}
              min="1"
              required
              onChange={(e) => setGuests(Math.max(1, parseInt(e.target.value) || 1))}
            />
          </div>
        )}

        <div className="form-group" style={{ animationDelay: getAnimationDelay(isAttending ? 6 : 5) }}>
          <label htmlFor="message">Message (optional):</label>
          <textarea
            id="message"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Any special requests or messages?"
            rows={3}
          />
        </div>

        <button
          type="submit"
          className="submit-button"
          disabled={submissionStatus === 'submitting'}
          style={{ animationDelay: getAnimationDelay(isAttending ? 7 : 6) }}
        >
          {submissionStatus === 'submitting' ? 'Submitting...' : 'Submit RSVP'}
        </button>

        {submissionStatus === 'success' && (
          <p className="submission-message success">Thank you for your RSVP!</p>
        )}
        {submissionStatus === 'error' && (
          <p className="submission-message error">There was an error submitting your RSVP. Please try again.</p>
        )}
      </form>

      {rsvpDetails.decorationImageUrl && (
        <img 
          src={rsvpDetails.decorationImageUrl}
          alt="Decorative Element"
          className="decoration-img decoration-bottom-right"
        />
      )}
    </div>
  );
};

export default Rsvp;
