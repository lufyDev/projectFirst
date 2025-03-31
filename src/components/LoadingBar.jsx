import React from 'react';
import gsap from 'gsap';

const LoadingBar = ({ progress }) => {
  return (
    <div className="loading-container">
      <div className="loading-content">
        <div className="loading-text">Loading... {Math.round(progress)}%</div>
        <div className="loading-bar-container">
          <div 
            className="loading-bar-fill"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>
    </div>
  );
};

export default LoadingBar; 