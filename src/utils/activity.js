const activityLog = [];

export const logActivity = (user, action, details) => {
  const logEntry = {
    timestamp: new Date().toLocaleString(),
    user: user ? user.username : 'System',
    action: action,
    details: details,
  };
  activityLog.push(logEntry);
  console.log('Activity Log:', logEntry);
};

export const getActivityLog = () => {
  return activityLog;
};
