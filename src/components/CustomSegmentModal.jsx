import React, { useState } from 'react';
import { createCustomSegment } from '../utils/data';
import './CustomSegmentModal.css';

function CustomSegmentModal({ onClose, onSegmentCreated }) {
  const [segmentName, setSegmentName] = useState('');
  const [criteria, setCriteria] = useState({
    plan: 'all',
    lifecycleStage: 'all',
    industry: 'all',
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCriteria({ ...criteria, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    createCustomSegment(segmentName, criteria);
    onSegmentCreated();
    onClose();
  };

  return (
    
      
        <h2>Create Custom Segment</h2>
        <form onSubmit={handleSubmit}>
          
            <label>Segment Name:</label>
            <input
              type="text"
              value={segmentName}
              onChange={(e) => setSegmentName(e.target.value)}
              required
            />
          
          
            <label>Plan:</label>
            <select name="plan" value={criteria.plan} onChange={handleInputChange}>
              <option value="all">All</option>
              <option value="Basic">Basic</option>
              <option value="Standard">Standard</option>
              <option value="Premium">Premium</option>
            </select>
          
          
            <label>Lifecycle Stage:</label>
            <select name="lifecycleStage" value={criteria.lifecycleStage} onChange={handleInputChange}>
              <option value="all">All</option>
              <option value="Trial">Trial</option>
              <option value="Active">Active</option>
              <option value="Renewal">Renewal</option>
            </select>
          
          
            <label>Industry:</label>
            <select name="industry" value={criteria.industry} onChange={handleInputChange}>
              <option value="all">All</option>
              <option value="Tech">Tech</option>
              <option value="Finance">Finance</option>
              <option value="Retail">Retail</option>
              <option value="Healthcare">Healthcare</option>
            </select>
          
          
            <button type="submit">Create Segment</button>
            <button type="button" onClick={onClose}>Cancel</button>
          
        </form>
      
    
  );
}

export default CustomSegmentModal;
