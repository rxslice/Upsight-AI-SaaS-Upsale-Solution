import React from 'react';
import { getRecommendationStrategies } from '../utils/data';
import './ABTestingDashboard.css';

function ABTestingDashboard() {
  const strategies = getRecommendationStrategies();

  return (
    
      <h2>A/B Testing Dashboard</h2>
      
        {Object.values(strategies).map(strategy => (
          
            <h3>{strategy.name}</h3>
            <p>{strategy.description}</p>
            
          
        ))}
      
    
  );
}

export default ABTestingDashboard;
