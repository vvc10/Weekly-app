import React from 'react';
import './Home.css';

// Component for displaying when there are no jobs available for a category
const NullJobs = () => {
  return (
    <div className='nulljobs_error'>
      {/* Emoji for face with open mouth */}
      <span>😵</span>
      <p>No jobs available for this category at the moment</p>
    </div>
  );
}

export default NullJobs;
