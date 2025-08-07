import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/navbar";
import Hero from "./components/Hero";
import Invite from "./components/Invite";
import LoveStory from "./components/LoveStory";
import Prenup from "./components/Prenup";
import Location from "./components/Location";
import Entourage from "./components/Entourage";
import Entourage2 from "./components/Entourage2";
import Dress from "./components/Dress";
import Rsvp from "./components/Rsvp";
import Footer from "./components/Footer";

function HomePage() {
  return (
    <>
      <Hero />
      <Invite />
      <LoveStory />
      <Prenup />
      <Location />
      <Entourage />
      <Dress />
      <Rsvp />
    </>
  );
}

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/entourage" element={<Entourage2 />} />
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
