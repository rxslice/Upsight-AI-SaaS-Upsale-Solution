const mockCustomers = [
  { id: 1, name: 'Acme Corp', plan: 'Basic', usage: 'Low', industry: 'Tech', lastActivity: '2024-07-26T10:00:00Z', satisfaction: 'High', lifecycleStage: 'Trial', potentialRevenue: 100, segment: 'Tech Startups', recommendationStrategy: 'A' },
  { id: 2, name: 'Beta Inc', plan: 'Standard', usage: 'Medium', industry: 'Finance', lastActivity: '2024-07-26T12:30:00Z', satisfaction: 'Medium', lifecycleStage: 'Active', potentialRevenue: 500, segment: 'Financial Institutions', recommendationStrategy: 'B' },
  { id: 3, name: 'Gamma Ltd', plan: 'Basic', usage: 'High', industry: 'Retail', lastActivity: '2024-07-26T14:00:00Z', satisfaction: 'Low', lifecycleStage: 'Active', potentialRevenue: 200, segment: 'Retail Businesses', recommendationStrategy: 'A' },
  { id: 4, name: 'Delta Co', plan: 'Premium', usage: 'Medium', industry: 'Healthcare', lastActivity: '2024-07-26T16:45:00Z', satisfaction: 'High', lifecycleStage: 'Renewal', potentialRevenue: 1000, segment: 'Healthcare Providers', recommendationStrategy: 'B' },
  { id: 5, name: 'Epsilon Ltd', plan: 'Basic', usage: 'Medium', industry: 'Tech', lastActivity: '2024-07-26T18:00:00Z', satisfaction: 'Medium', lifecycleStage: 'Trial', potentialRevenue: 150, segment: 'Tech Startups', recommendationStrategy: 'A' },
  { id: 6, name: 'Zeta Corp', plan: 'Standard', usage: 'High', industry: 'Finance', lastActivity: '2024-07-26T20:00:00Z', satisfaction: 'High', lifecycleStage: 'Active', potentialRevenue: 600, segment: 'Financial Institutions', recommendationStrategy: 'B' },
  { id: 7, name: 'Eta Inc', plan: 'Premium', usage: 'Low', industry: 'Retail', lastActivity: '2024-07-26T22:00:00Z', satisfaction: 'Low', lifecycleStage: 'Renewal', potentialRevenue: 800, segment: 'Retail Businesses', recommendationStrategy: 'A' },
  { id: 8, name: 'Theta Co', plan: 'Basic', usage: 'Medium', industry: 'Healthcare', lastActivity: '2024-07-27T00:00:00Z', satisfaction: 'Medium', lifecycleStage: 'Active', potentialRevenue: 250, segment: 'Healthcare Providers', recommendationStrategy: 'B' },
];

let currentCustomers = [...mockCustomers];
let customSegments = [];
let feedbackMessages = [];
let recommendationStrategies = {
  'A': {
    name: 'Strategy A',
    description: 'Default recommendation strategy.',
  },
  'B': {
    name: 'Strategy B',
    description: 'Alternative recommendation strategy.',
  },
};

let ws;
let retryCount = 0;

export const setupWebSocket = (setCustomers, setSelectedCustomer, setRecommendations, setNotifications) => {
  ws = new WebSocket('ws://localhost:8080');

  ws.onopen = () => {
    console.log('Connected to WebSocket server');
    retryCount = 0;
  };

  ws.onmessage = (event) => {
    try {
      const message = JSON.parse(event.data);
      if (message.type === 'customerUpdate') {
        currentCustomers = currentCustomers.map(c => c.id === message.customer.id ? message.customer : c);
        setCustomers(currentCustomers);
        if (setSelectedCustomer && setSelectedCustomer.id === message.customer.id) {
          const newRecommendations = getRecommendations(message.customer);
          setRecommendations(newRecommendations);
          newRecommendations.forEach(rec => {
            setNotifications(prevNotifications => [...prevNotifications, {
              text: `New recommendation for ${message.customer.name}: ${rec.text}`,
              timestamp: new Date().toLocaleString(),
              urgency: rec.urgency
            }]);
          });
        }
      }
    } catch (error) {
      console.error('Error parsing WebSocket message:', error);
    }
  };

  ws.onclose = () => {
    console.log('Disconnected from WebSocket server');
    if (retryCount < 3) {
      setTimeout(() => {
        console.log('Attempting to reconnect...');
        setupWebSocket(setCustomers, setSelectedCustomer, setRecommendations, setNotifications);
        retryCount++;
      }, 3000);
    } else {
      console.error('Max reconnection attempts reached.');
    }
  };

  ws.onerror = (error) => {
    console.error('WebSocket error:', error);
    ws.close();
  };
};

export const fetchCustomerData = async (page = 1, pageSize = 10) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      try {
        const startIndex = (page - 1) * pageSize;
        const endIndex = startIndex + pageSize;
        const paginatedCustomers = currentCustomers.slice(startIndex, endIndex);
        if (Math.random() < 0.9) {
          resolve({
            customers: paginatedCustomers,
            total: currentCustomers.length,
            page,
            pageSize,
          });
        } else {
          reject(new Error('Failed to fetch customer data from CRM.'));
        }
      } catch (error) {
        reject(new Error('Failed to fetch customer data: ' + error.message));
      }
    }, 500);
  });
};

export const getRecommendations = (customer) => {
  try {
    const recommendations = [];
    const strategy = customer.recommendationStrategy;

    // Basic AI/ML simulation using a simple rule-based approach with a slight variation
    const baseRevenue = customer.potentialRevenue;
    let adjustedRevenue = baseRevenue;
    if (customer.satisfaction === 'Low') {
      adjustedRevenue *= 0.8;
    } else if (customer.satisfaction === 'High') {
      adjustedRevenue *= 1.2;
    }

    if (strategy === 'A') {
      if (customer.lifecycleStage === 'Trial' && customer.usage === 'High') {
        recommendations.push({
          text: 'Upgrade to Standard plan for better performance and support (Strategy A).',
          urgency: 'High',
          potentialRevenue: Math.round(adjustedRevenue * 1.2),
        });
      }
      if (customer.industry === 'Tech' && customer.plan === 'Basic' && customer.satisfaction === 'High') {
        recommendations.push({
          text: 'Consider the Premium plan for advanced features and dedicated support (Strategy A).',
          urgency: 'Medium',
          potentialRevenue: Math.round(adjustedRevenue * 1.5),
        });
      }
    } else if (strategy === 'B') {
      if (customer.lifecycleStage === 'Trial' && customer.usage === 'High') {
        recommendations.push({
          text: 'Try our Standard plan for enhanced features and support (Strategy B).',
          urgency: 'High',
          potentialRevenue: Math.round(adjustedRevenue * 1.3),
        });
      }
      if (customer.industry === 'Tech' && customer.plan === 'Basic' && customer.satisfaction === 'High') {
        recommendations.push({
          text: 'Explore the Premium plan for top-tier features and support (Strategy B).',
          urgency: 'Medium',
          potentialRevenue: Math.round(adjustedRevenue * 1.6),
        });
      }
    }

    if (customer.usage === 'Low' && customer.plan !== 'Premium') {
      recommendations.push({
        text: 'Explore additional features to maximize your plan and increase usage.',
        urgency: 'Low',
        potentialRevenue: Math.round(adjustedRevenue * 0.9),
      });
    }

    if (customer.plan === 'Standard' && customer.industry === 'Finance' && customer.satisfaction === 'Medium') {
      recommendations.push({
        text: 'Check out our add-on for financial reporting and compliance.',
        urgency: 'Medium',
        potentialRevenue: Math.round(adjustedRevenue * 1.1),
      });
    }

    if (customer.satisfaction === 'Low') {
      recommendations.push({
        text: 'Contact customer support to address any issues and improve satisfaction.',
        urgency: 'High',
        potentialRevenue: 0,
      });
    }

    if (customer.lifecycleStage === 'Renewal' && customer.lastActivity && new Date(customer.lastActivity) < new Date(Date.now() - 30 * 24 * 60 * 60 * 1000)) {
      recommendations.push({
        text: 'Renew your subscription to continue enjoying our services.',
        urgency: 'High',
        potentialRevenue: Math.round(adjustedRevenue),
      });
    }

    return recommendations;
  } catch (error) {
    console.error('Error generating recommendations:', error);
    return [];
  }
};

export const updateCustomerData = async (customerId, updates) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      try {
        const customerIndex = currentCustomers.findIndex(c => c.id === customerId);
        if (customerIndex !== -1) {
          currentCustomers[customerIndex] = { ...currentCustomers[customerIndex], ...updates };
          if (ws && ws.readyState === WebSocket.OPEN) {
            ws.send(JSON.stringify({ type: 'customerUpdate', customer: currentCustomers[customerIndex] }));
          }
          resolve(currentCustomers[customerIndex]);
        } else {
          resolve(null);
        }
      } catch (error) {
        console.error('Error updating customer data:', error);
        resolve(null);
      }
    }, 300);
  });
};

export const exportCustomerData = (customers) => {
  try {
    const csvRows = [];
    const headers = Object.keys(customers[0]);
    csvRows.push(headers.join(','));

    for (const customer of customers) {
      const values = headers.map(header => customer[header]);
      csvRows.push(values.join(','));
    }

    const csvString = csvRows.join('\n');
    const blob = new Blob([csvString], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'customer_data.csv';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  } catch (error) {
    console.error('Error exporting customer data:', error);
  }
};

export const importCustomerData = (file, setCustomers) => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        const csvString = event.target.result;
        const csvRows = csvString.split('\n');
        const headers = csvRows[0].split(',');
        const importedCustomers = [];

        for (let i = 1; i < csvRows.length; i++) {
          const values = csvRows[i].split(',');
          if (values.length === headers.length) {
            const customer = {};
            for (let j = 0; j < headers.length; j++) {
              customer[headers[j].trim()] = values[j].trim();
            }
            importedCustomers.push(customer);
          }
        }
        currentCustomers = [...currentCustomers, ...importedCustomers];
        setCustomers(currentCustomers);
        resolve(importedCustomers);
      } catch (error) {
        reject(new Error('Failed to parse CSV file: ' + error.message));
      }
    };
    reader.onerror = () => {
      reject(new Error('Failed to read CSV file.'));
    };
    reader.readAsText(file);
  });
};

export const createCustomSegment = (segmentName, criteria) => {
  customSegments.push({ name: segmentName, criteria });
};

export const getCustomSegments = () => {
  return customSegments;
};

export const applyCustomSegment = (customer, segment) => {
  if (!segment || !segment.criteria) {
    return true;
  }

  for (const key in segment.criteria) {
    if (customer[key] !== segment.criteria[key]) {
      return false;
    }
  }
  return true;
};

export const submitFeedback = (user, message) => {
  feedbackMessages.push({
    timestamp: new Date().toLocaleString(),
    user: user ? user.username : 'System',
    message: message,
  });
};

export const getFeedbackMessages = () => {
  return feedbackMessages;
};

export const getRecommendationStrategies = () => {
  return recommendationStrategies;
};
