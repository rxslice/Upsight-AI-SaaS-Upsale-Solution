
import React from 'react';
import './CustomerDetails.css';

function CustomerDetails({ customer, recommendations }) {
  return (
    
      <h3>Customer Details</h3>
      <p><strong>Name:</strong> {customer.name}</p>
      <p><strong>Plan:</strong> {customer.plan}</p>
      <p><strong>Usage:</strong> {customer.usage}</p>
      <p><strong>Industry:</strong> {customer.industry}</p>
      <p><strong>Satisfaction:</strong> {customer.satisfaction}</p>
      <p><strong>Last Activity:</strong> {new Date(customer.lastActivity).toLocaleString()}</p>
      <p><strong>Lifecycle Stage:</strong> {customer.lifecycleStage}</p>
      <p><strong>Recommendation Strategy:</strong> {customer.recommendationStrategy}</p>
      
        <h3>Recommendations</h3>
        {recommendations.length > 0 ? (
          
            {recommendations.map((rec, index) => (
              <div key={index} className={`recommendation-item ${rec.urgency.toLowerCase()}`}>
                <p><strong>{rec.text}</strong></p>
                <p><strong>Urgency:</strong> {rec.urgency}</p>
                <p><strong>Potential Revenue:</strong> ${rec.potentialRevenue}</p>
              </div>
            ))}
          
        ) : (
          <p>No recommendations at this time.</p>
        )}
      
    
  );
}

export default CustomerDetails;
  