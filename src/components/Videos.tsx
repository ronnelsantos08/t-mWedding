import React from 'react';
import '../styles/Videos.css'; // Import the CSS file for this component

interface VideosProps {
  /**
   * The URL of the video to display.
   */
  videoUrl: string;
  /**
   * An optional title or description for the video.
   */
  videoTitle?: string; // Keeping this prop, even if not currently displayed in the JSX
  /**
   * The URL of the image to display as a thumbnail before the video plays.
   */
  posterUrl?: string; // <--- NEW: Add posterUrl prop
}

const Videos: React.FC<VideosProps> = ({ videoUrl, posterUrl }) => { // <--- NEW: Destructure posterUrl
  return (
    <div className="videos-container">
      {/* You previously had a videoTitle here, if you want it back:
          <h2 className="videos-title">{videoTitle}</h2>
      */}
      <div className="video-wrapper">
        <video
          controls
          loop
          className="responsive-video"
          poster={posterUrl} // <--- NEW: Use the posterUrl prop here
        >
          <source src={videoUrl} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      </div>
    </div>
  );
};

export default Videos;