import React, { useRef, useEffect, useState } from 'react';
import '../styles/Entourage2.css'

// Define the data for the wedding entourage
const entourageData = {
  nuptials: "OLIVAR - DOMINGO NUPTIALS",
  parentsOfTheGroom: ["ERMINIO GONZALES OLIVAR", "ELENITA GONZALES OLIVAR"],
  parentsOfTheBride: ["ALEX DIMAPILIS MOJICA", "MA. ALICE MOJICA DOMINGO"],
  principalSponsors: [
    { name: "OSCAR OLIVAR JR.", partner: "LOIDA OLIVAR" },
    { name: "AQUINO OLIVAR", partner: "MARY GRACE MERCADO" },
    { name: "ARWIN DEMILLO", partner: "ALELI DEMILLO" },
    { name: "ARGEL JOSEPH MOJICA", partner: "ABIGAIL LOURDES MOJICA" },
    { name: "MICHAEL JOHN MONTENEGRO", partner: "MA. ANGELICA MONTENEGRO" },
    { name: "APOLO ALCAZAR", partner: "ELENA ALCAZAR" },
    { name: "NORBELL DOMINGO", partner: "MA. VICTORIA CORTEZ" },
    { name: "JAY VILLANUEVA", partner: "MYLENE VILLANUEVA" },
    { name: "STEPHEN CHARLES KEPPLER", partner: "MARISSA ASITOGUE" },
    { name: "CHRISTOPHER GARCIA", partner: "LOIDA GARCIA" },
    { name: "HON. CELSO DE CASTRO", partner: "MARIAN VIDALLO" },
    { name: "ENGR. WILLIAM REYES", partner: "HON. LEONOR REYES" },
    { name: "RIZALINO CRYSTAL", partner: "DEM CRYSTAL" },
    { name: "GEOK HEE TERENCE CHUA", partner: "LORELEI CHUA" },
    { name: "GENEROSO BUNYI", partner: "OLIVIA BUNYI" },
  ],
  secondarySponsors: {
    veil: [{ name: "RALPH MARON EDBERT DOMINGO" }, { name: "DANICA LANDICHO" }],
    candle: [{ name: "JOHN LAURENCE OLIVAR" }, { name: "CARLA OPINION" }],
    cord: [{ name: "ROVIN JOHN SALAUM" }, { name: "MIL ANN ELLA NOZON" }],
  },
  bestMan: "MARC GIAN VILLANUEVA",
  groomsmen: [
    "JUDE ANDREW DE GRANO",
    "JETHRO AREVALO",
    "JOHN EDRIAN LEGASPI",
    "LESTER TORDECILLA",
    "KIM XAVIER LABAGALA",
    "KHRYZS ANDREW ALIPIO",
    "JEFFERSON ROSALES",
    "KRISTIAN JAY RAMOS",
  ],
  maidOfHonor: "MIKHAJOY MANALO",
  bridesmaids: [
    "DIANNE DE GRANO",
    "LEAH MAE CUADRA",
    "JEAN KLAIRE VISCO",
    "MARICEL BACOS",
    "MILCA DECENA",
    "QUEEN ANNACELLE REOSA",
    "KORINE JADE AMBAT",
    "ANGELYN GUAB",
  ],
  ringBearer: "JOHN LAURIEL OLIVAR",
  bibleBearer: "ALWYN ISAAC FABIAN DEMILLO",
  coinBearer: "JOHN LOURVINCE OLIVAR",
  flowerGirls: [
    "AIOFE DENISE ANGELINE PEJI",
    "BETINA MAE MERCADO",
    "YLLOIDA JEAN OLIVAR",
    "YLLOIDA JADE OLIVAR",
  ],
};

// Section component for in-view animation
interface SectionProps {
  children: React.ReactNode;
  delay: number; // Stagger delay for animation in milliseconds
}

const Section: React.FC<SectionProps> = ({ children, delay }) => {
  const sectionRef = useRef<HTMLDivElement>(null); // Ref to observe the DOM element
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
        threshold: 0.1, // Trigger when 10% of the section is visible
      }
    );

    // Start observing the element if it exists
    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    // Cleanup function: disconnect the observer when the component unmounts
    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, []); // Empty dependency array ensures this effect runs only once on mount

  return (
    <div
      ref={sectionRef} // Attach the ref to the div
      className={`entourage-section ${isVisible ? 'is-visible' : ''}`}
      style={{ transitionDelay: `${delay * 100}ms` }} // Stagger delay for sections
    >
      {children}
    </div>
  );
};

// Main Entourage component that renders the wedding party details
const Entourage2: React.FC = () => {
  return (
    <div className="app2-container">
      
      <div className="content2-box">
        <h1 className="entourage-heading">Wedding Entourage</h1>
        <p className="nuptials-title">{entourageData.nuptials}</p>

        <Section delay={0}>
          <h2 className="section-title">Parents of the Groom</h2>
          <ul className="name-list">
            {entourageData.parentsOfTheGroom.map((name, i) => (
              <li key={i} className="name-item">{name}</li>
            ))}
          </ul>
        </Section>

        <Section delay={1}>
          <h2 className="section-title">Parents of the Bride</h2>
          <ul className="name-list">
            {entourageData.parentsOfTheBride.map((name, i) => (
              <li key={i} className="name-item">{name}</li>
            ))}
          </ul>
        </Section>

        <Section delay={2}>
          <h2 className="section-title">Principal Sponsors</h2>
          <ul className="name-list">
            {entourageData.principalSponsors.map((sponsor, i) => (
              <li key={i} className="name-item">
                {sponsor.name} {sponsor.partner && `& ${sponsor.partner}`}
              </li>
            ))}
          </ul>
        </Section>

        <Section delay={3}>
          <h2 className="section-title">Secondary Sponsors</h2>
          <ul className="name-list">
            <li className="name-item"><strong>VEIL:</strong> {entourageData.secondarySponsors.veil.map(p => p.name).join(' & ')}</li>
            <li className="name-item"><strong>CANDLE:</strong> {entourageData.secondarySponsors.candle.map(p => p.name).join(' & ')}</li>
            <li className="name-item"><strong>CORD:</strong> {entourageData.secondarySponsors.cord.map(p => p.name).join(' & ')}</li>
          </ul>
        </Section>

        <Section delay={4}>
          <h2 className="section-title">Best Man</h2>
          <ul className="name-list">
            <li className="name-item">{entourageData.bestMan}</li>
          </ul>
        </Section>

        <Section delay={5}>
          <h2 className="section-title">Groomsmen</h2>
          <ul className="name-list">
            {entourageData.groomsmen.map((name, i) => (
              <li key={i} className="name-item">{name}</li>
            ))}
          </ul>
        </Section>

        <Section delay={6}>
          <h2 className="section-title">Maid of Honor</h2>
          <ul className="name-list">
            <li key={0} className="name-item">{entourageData.maidOfHonor}</li>
          </ul>
        </Section>

        <Section delay={7}>
          <h2 className="section-title">Bridesmaids</h2>
          <ul className="name-list">
            {entourageData.bridesmaids.map((name, i) => (
              <li key={i} className="name-item">{name}</li>
            ))}
          </ul>
        </Section>

        <Section delay={8}>
          <h2 className="section-title">Bearers</h2>
          <ul className="name-list">
            <li className="name-item"><strong>RING BEARER:</strong> {entourageData.ringBearer}</li>
            <li className="name-item"><strong>BIBLE BEARER:</strong> {entourageData.bibleBearer}</li>
            <li className="name-item"><strong>COIN BEARER:</strong> {entourageData.coinBearer}</li>
          </ul>
        </Section>

        <Section delay={9}>
          <h2 className="section-title">Flower Girls</h2>
          <ul className="name-list">
            {entourageData.flowerGirls.map((name, i) => (
              <li key={i} className="name-item">{name}</li>
            ))}
          </ul>
        </Section>

      </div>
    </div>
  );
};

export default Entourage2;
