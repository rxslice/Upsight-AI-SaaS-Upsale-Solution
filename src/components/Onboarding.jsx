import React from 'react';
import './Onboarding.css';

function Onboarding({ onClose }) {
  return (
    
      
        <h2>Welcome to Upsight AI!</h2>
        
          <h3>Step 1: Explore the Customer Dashboard</h3>
          <p>View customer data, recommendations, and more.</p>
        
        
          <h3>Step 2: Check out the A/B Testing Dashboard</h3>
          <p>See the different recommendation strategies.</p>
        
        
          <h3>Step 3: Submit Feedback</h3>
          <p>Let us know what you think!</p>
        
        
          <button onClick={onClose}>Get Started</button>
        
      
    
  );
}

export default Onboarding;
