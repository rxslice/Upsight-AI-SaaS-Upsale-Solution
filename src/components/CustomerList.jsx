import React, { useState } from 'react';
import { getCustomSegments, applyCustomSegment, getRecommendationStrategies } from '../utils/data';
import './CustomerList.css';

function CustomerList({ customers, selectedCustomer, onSelect, onUpdateCustomer }) {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterPlan, setFilterPlan] = useState('all');
  const [filterLifecycle, setFilterLifecycle] = useState('all');
  const [filterSegment, setFilterSegment] = useState('all');
  const [filterCustomSegment, setFilterCustomSegment] = useState('all');
  const [showCustomSegmentModal, setShowCustomSegmentModal] = useState(false);

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleFilterPlanChange = (e) => {
    setFilterPlan(e.target.value);
  };

  const handleFilterLifecycleChange = (e) => {
    setFilterLifecycle(e.target.value);
  };

  const handleFilterSegmentChange = (e) => {
    setFilterSegment(e.target.value);
  };

  const handleFilterCustomSegmentChange = (e) => {
    setFilterCustomSegment(e.target.value);
  };

  const handleCreateCustomSegment = () => {
    setShowCustomSegmentModal(true);
  };

  const handleCloseCustomSegmentModal = () => {
    setShowCustomSegmentModal(false);
  };

  const handleCustomSegmentCreated = () => {
    setFilterCustomSegment('all');
  };

  const handleStrategyChange = (customerId, newStrategy) => {
    onUpdateCustomer(customerId, { recommendationStrategy: newStrategy });
  };

  const filteredCustomers = customers.filter(customer => {
    const searchMatch = customer.name.toLowerCase().includes(searchTerm.toLowerCase());
    const planMatch = filterPlan === 'all' || customer.plan === filterPlan;
    const lifecycleMatch = filterLifecycle === 'all' || customer.lifecycleStage === filterLifecycle;
    const segmentMatch = filterSegment === 'all' || customer.segment === filterSegment;
    const customSegmentMatch = filterCustomSegment === 'all' || applyCustomSegment(customer, getCustomSegments().find(seg => seg.name === filterCustomSegment));
    return searchMatch && planMatch && lifecycleMatch && segmentMatch && customSegmentMatch;
  });

  const uniqueSegments = ['all', ...new Set(customers.map(c => c.segment))];
  const customSegments = ['all', ...getCustomSegments().map(seg => seg.name)];
  const strategies = getRecommendationStrategies();

  return (
    
      
        <input
          type="text"
          placeholder="Search customers..."
          value={searchTerm}
          onChange={handleSearchChange}
        />
        
          <label>Filter by Plan:</label>
          <select value={filterPlan} onChange={handleFilterPlanChange}>
            <option value="all">All</option>
            <option value="Basic">Basic</option>
            <option value="Standard">Standard</option>
            <option value="Premium">Premium</option>
          </select>
        
        
          <label>Filter by Lifecycle:</label>
          <select value={filterLifecycle} onChange={handleFilterLifecycleChange}>
            <option value="all">All</option>
            <option value="Trial">Trial</option>
            <option value="Active">Active</option>
            <option value="Renewal">Renewal</option>
          </select>
        
        
          <label>Filter by Segment:</label>
          <select value={filterSegment} onChange={handleFilterSegmentChange}>
            {uniqueSegments.map(segment => (
              <option key={segment} value={segment}>{segment}</option>
            ))}
          </select>
        
        
          <label>Filter by Custom Segment:</label>
          <select value={filterCustomSegment} onChange={handleFilterCustomSegmentChange}>
            {customSegments.map(segment => (
              <option key={segment} value={segment}>{segment}</option>
            ))}
          </select>
          <button onClick={handleCreateCustomSegment}>Create Custom Segment</button>
        
      
      
        {filteredCustomers.map((customer) => (
          <div
            key={customer.id}
            className={`customer-item ${selectedCustomer?.id === customer.id ? 'selected' : ''}`}
            onClick={() => onSelect(customer)}
          >
            {customer.name}
            
              <select
                value={customer.recommendationStrategy}
                onChange={(e) => handleStrategyChange(customer.id, e.target.value)}
              >
                {Object.keys(strategies).map(key => (
                  <option key={key} value={key}>{strategies[key].name}</option>
                ))}
              </select>
            
          </div>
        ))}
      
      {showCustomSegmentModal && (
        <CustomSegmentModal
          onClose={handleCloseCustomSegmentModal}
          onSegmentCreated={handleCustomSegmentCreated}
        />
      )}
    
  );
}

export default CustomerList;
