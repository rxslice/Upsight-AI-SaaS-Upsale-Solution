import React, { useState } from 'react';
import { submitFeedback } from '../utils/data';
import './FeedbackModal.css';

function FeedbackModal({ onClose, user }) {
  const [message, setMessage] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    submitFeedback(user, message);
    onClose();
  };

  return (
    
      
        <h2>Submit Feedback</h2>
        <form onSubmit={handleSubmit}>
          
            <label>Message:</label>
            <textarea
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              required
            />
          
          
            <button type="submit">Submit</button>
            <button type="button" onClick={onClose}>Cancel</button>
          
        </form>
      
    
  );
}

export default FeedbackModal;
