// Footer.tsx
import React from 'react';
import '../styles/Footer.css'
const Footer: React.FC = () => {
  return (
    <footer className="footer-container">
      
      <p className="footer-text">
        &copy; {new Date().getFullYear()} Our Wedding. All Rights Reserved. Tristan And Mara Wedding.
        <br />
        Site Developed by: Webworks
      </p>
      <div className="social-icons">
        {/* Facebook Icon */}
        <a href="https://www.facebook.com/ronnel.santos08" target="_blank" rel="noopener noreferrer" className="social-icon-link" aria-label="Facebook">
          <svg className="social-icon-svg" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
            <path d="M12 2.04C6.5 2.04 2 6.54 2 12.04c0 4.98 3.65 9.13 8.43 9.87v-7.75H7.72V12.04h2.71V9.77c0-2.68 1.63-4.16 4.04-4.16 1.16 0 2.16.21 2.16.21v2.37h-1.2c-1.18 0-1.54.73-1.54 1.48v1.78h2.64l-.42 2.7H14.1V21.9c4.78-.74 8.43-4.89 8.43-9.87C22 6.54 17.5 2.04 12 2.04z"/>
          </svg>
        </a>
        {/* Messenger Icon */}
        <a href="https://m.me/ronnel.santos08" target="_blank" rel="noopener noreferrer" className="social-icon-link" aria-label="Messenger">
          <svg className="social-icon-svg" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
            <path d="M12 2C6.48 2 2 6.03 2 11.01c0 3.32 1.9 6.2 4.7 7.73l-.7 2.04 2.1-.64c.8.24 1.64.37 2.5.37 5.52 0 10-4.03 10-9.01S17.52 2 12 2zm0 16c-1.8 0-3.5-.47-5-1.3l-.6.18.3 1.05.7-.21c1.2-.36 2.4-.54 3.6-.54 4.41 0 8-3.13 8-7s-3.59-7-8-7-8 3.13-8 7c0 3.87 3.59 7 8 7zM10.5 8.5h3v2h-3v-2zm-3 0h2v2h-2v-2zm6 0h2v2h-2v-2z"/>
          </svg>
        </a>
        {/* Email Icon */}
        <a href="mailto:ronnel.santos08@gmail.com.com" className="social-icon-link" aria-label="Email">
          <svg className="social-icon-svg" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
            <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/>
          </svg>
        </a>
      </div>
    </footer>
  );
};

export default Footer;
