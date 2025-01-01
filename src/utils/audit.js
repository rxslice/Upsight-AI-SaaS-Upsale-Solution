const auditLog = [];

export const logAction = (user, action, details) => {
  const logEntry = {
    timestamp: new Date().toLocaleString(),
    user: user ? user.username : 'System',
    action: action,
    details: details,
  };
  auditLog.push(logEntry);
  console.log('Audit Log:', logEntry);
};

export const getAuditLog = () => {
  return auditLog;
};
