import React from 'react';
import { getFeedbackMessages } from '../utils/data';
import './FeedbackList.css';

function FeedbackList() {
  const feedbackMessages = getFeedbackMessages();

  return (
    
      <h2>User Feedback</h2>
      {feedbackMessages.length > 0 ? (
        
          
            
              <th>Timestamp</th>
              <th>User</th>
              <th>Message</th>
            
            
              {feedbackMessages.map((feedback, index) => (
                <tr key={index}>
                  <td>{feedback.timestamp}</td>
                  <td>{feedback.user}</td>
                  <td>{feedback.message}</td>
                </tr>
              ))}
            
          
        
      ) : (
        <p>No feedback messages yet.</p>
      )}
    
  );
}

export default FeedbackList;
