const mockUsers = [
  { id: 1, username: 'admin', password: 'password', role: 'admin', permissions: ['manage_users', 'view_data', 'edit_data', 'view_activity', 'view_audit'], settings: { theme: 'light', notifications: true } },
  { id: 2, username: 'user', password: 'userpass', role: 'user', permissions: ['view_data'], settings: { theme: 'dark', notifications: false } },
  { id: 3, username: 'manager', password: 'managerpass', role: 'manager', permissions: ['view_data', 'edit_data', 'view_activity'], settings: { theme: 'light', notifications: true } },
];

export const login = async (username, password) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const user = mockUsers.find(u => u.username === username && u.password === password);
      if (user) {
        resolve(user);
      } else {
        reject(new Error('Invalid username or password.'));
      }
    }, 300);
  });
};

export const getUserSettings = async (userId) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const user = mockUsers.find(u => u.id === userId);
      if (user) {
        resolve(user.settings);
      } else {
        reject(new Error('User not found.'));
      }
    }, 200);
  });
};

export const updateUserSettings = async (userId, newSettings) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const userIndex = mockUsers.findIndex(u => u.id === userId);
      if (userIndex !== -1) {
        mockUsers[userIndex] = { ...mockUsers[userIndex], settings: newSettings };
        resolve(mockUsers[userIndex].settings);
      } else {
        reject(new Error('User not found.'));
      }
    }, 200);
  });
};

export const getAllUsers = async () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(mockUsers);
    }, 200);
  });
};

export const updateUserRole = async (userId, newRole) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const userIndex = mockUsers.findIndex(u => u.id === userId);
      if (userIndex !== -1) {
        mockUsers[userIndex] = { ...mockUsers[userIndex], role: newRole };
        resolve(mockUsers[userIndex]);
      } else {
        reject(new Error('User not found.'));
      }
    }, 200);
  });
};

export const updateUserPermissions = async (userId, newPermissions) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const userIndex = mockUsers.findIndex(u => u.id === userId);
      if (userIndex !== -1) {
        mockUsers[userIndex] = { ...mockUsers[userIndex], permissions: newPermissions };
        resolve(mockUsers[userIndex]);
      } else {
        reject(new Error('User not found.'));
      }
    }, 200);
  });
};

export const hasPermission = (user, permission) => {
  return user && user.permissions && user.permissions.includes(permission);
};
