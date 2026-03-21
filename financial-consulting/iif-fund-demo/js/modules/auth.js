// Authentication Manager
export class AuthManager {
  constructor(storageManager) {
    this.storage = storageManager;
    this.currentUser = null;
    this.isAuthenticated = false;
    this.token = null;
  }

  async init() {
    // Check for existing session
    await this.checkExistingSession();
    
    console.log('🔐 Auth manager initialized');
  }

  async checkExistingSession() {
    const token = this.storage.get('token');
    const user = this.storage.get('user');
    
    if (token && user) {
      this.token = token;
      this.currentUser = user;
      this.isAuthenticated = true;
      
      // Validate token (in real app, this would be an API call)
      const isValid = await this.validateToken(token);
      if (!isValid) {
        this.logout();
      }
    }
  }

  async validateToken(token) {
    // Simulate token validation
    // In real app, this would make an API call
    try {
      // For demo, accept any non-empty token
      return token && token.length > 0;
    } catch (error) {
      console.error('Token validation failed:', error);
      return false;
    }
  }

  async login(email, password) {
    try {
      console.log('🔐 Attempting login...');
      
      // Simulate API call
      const response = await this.simulateLoginAPI(email, password);
      
      if (response.success) {
        const { user, token } = response.data;
        
        // Store session
        this.storage.set('user', user);
        this.storage.set('token', token);
        
        // Update state
        this.currentUser = user;
        this.token = token;
        this.isAuthenticated = true;
        
        console.log('✅ Login successful');
        
        // Emit event
        document.dispatchEvent(new CustomEvent('login', {
          detail: { user }
        }));
        
        return { success: true, user };
      } else {
        console.error('❌ Login failed:', response.error);
        return { success: false, error: response.error };
      }
    } catch (error) {
      console.error('❌ Login error:', error);
      return { success: false, error: 'Login failed. Please try again.' };
    }
  }

  async register(userData) {
    try {
      console.log('🔐 Attempting registration...');
      
      // Validate input
      const validation = this.validateRegistrationData(userData);
      if (!validation.isValid) {
        return { success: false, error: validation.error };
      }
      
      // Simulate API call
      const response = await this.simulateRegisterAPI(userData);
      
      if (response.success) {
        const { user, token } = response.data;
        
        // Store session
        this.storage.set('user', user);
        this.storage.set('token', token);
        
        // Update state
        this.currentUser = user;
        this.token = token;
        this.isAuthenticated = true;
        
        console.log('✅ Registration successful');
        
        // Emit event
        document.dispatchEvent(new CustomEvent('login', {
          detail: { user }
        }));
        
        return { success: true, user };
      } else {
        console.error('❌ Registration failed:', response.error);
        return { success: false, error: response.error };
      }
    } catch (error) {
      console.error('❌ Registration error:', error);
      return { success: false, error: 'Registration failed. Please try again.' };
    }
  }

  logout() {
    console.log('🔐 Logging out...');
    
    // Clear storage
    this.storage.delete('user');
    this.storage.delete('token');
    
    // Clear state
    this.currentUser = null;
    this.token = null;
    this.isAuthenticated = false;
    
    console.log('✅ Logged out successfully');
    
    // Emit event
    document.dispatchEvent(new CustomEvent('logout'));
  }

  getCurrentUser() {
    return this.currentUser;
  }

  getToken() {
    return this.token;
  }

  isLoggedIn() {
    return this.isAuthenticated;
  }

  hasRole(role) {
    return this.currentUser && this.currentUser.role === role;
  }

  isAdmin() {
    return this.hasRole('admin');
  }

  isStaff() {
    return this.hasRole('staff') || this.isAdmin();
  }

  // Simulated API methods (replace with real API calls)
  async simulateLoginAPI(email, password) {
    // Simulate network delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Demo users
    const demoUsers = {
      'admin@iiffund.com': {
        id: '1',
        name: 'Admin User',
        email: 'admin@iiffund.com',
        role: 'admin',
        avatar: 'assets/admin-avatar.jpg'
      },
      'staff@iiffund.com': {
        id: '2',
        name: 'Staff User',
        email: 'staff@iiffund.com',
        role: 'staff',
        avatar: 'assets/staff-avatar.jpg'
      },
      'user@iiffund.com': {
        id: '3',
        name: 'Regular User',
        email: 'user@iiffund.com',
        role: 'user',
        avatar: 'assets/user-avatar.jpg'
      }
    };
    
    const user = demoUsers[email];
    
    if (user && password === 'password') {
      return {
        success: true,
        data: {
          user,
          token: `demo-token-${Date.now()}`
        }
      };
    } else {
      return {
        success: false,
        error: 'Invalid email or password'
      };
    }
  }

  async simulateRegisterAPI(userData) {
    // Simulate network delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Check if user already exists
    const existingUsers = ['admin@iiffund.com', 'staff@iiffund.com', 'user@iiffund.com'];
    
    if (existingUsers.includes(userData.email)) {
      return {
        success: false,
        error: 'User already exists'
      };
    }
    
    // Create new user
    const newUser = {
      id: Date.now().toString(),
      name: userData.name,
      email: userData.email,
      role: 'user',
      avatar: 'assets/default-avatar.jpg',
      createdAt: new Date().toISOString()
    };
    
    return {
      success: true,
      data: {
        user: newUser,
        token: `demo-token-${Date.now()}`
      }
    };
  }

  validateRegistrationData(userData) {
    const { name, email, password, confirmPassword } = userData;
    
    if (!name || name.trim().length < 2) {
      return { isValid: false, error: 'Name must be at least 2 characters long' };
    }
    
    if (!email || !this.isValidEmail(email)) {
      return { isValid: false, error: 'Please enter a valid email address' };
    }
    
    if (!password || password.length < 8) {
      return { isValid: false, error: 'Password must be at least 8 characters long' };
    }
    
    if (password !== confirmPassword) {
      return { isValid: false, error: 'Passwords do not match' };
    }
    
    return { isValid: true };
  }

  isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }

  // Password strength checker
  checkPasswordStrength(password) {
    let strength = 0;
    const feedback = [];
    
    if (password.length >= 8) {
      strength += 1;
    } else {
      feedback.push('Password should be at least 8 characters');
    }
    
    if (/[a-z]/.test(password)) {
      strength += 1;
    } else {
      feedback.push('Include lowercase letters');
    }
    
    if (/[A-Z]/.test(password)) {
      strength += 1;
    } else {
      feedback.push('Include uppercase letters');
    }
    
    if (/\d/.test(password)) {
      strength += 1;
    } else {
      feedback.push('Include numbers');
    }
    
    if (/[!@#$%^&*(),.?":{}|<>]/.test(password)) {
      strength += 1;
    } else {
      feedback.push('Include special characters');
    }
    
    const levels = ['Very Weak', 'Weak', 'Fair', 'Good', 'Strong'];
    const level = levels[Math.min(strength, 4)];
    
    return {
      score: strength,
      level,
      feedback,
      isValid: strength >= 3
    };
  }

  // Update user profile
  async updateProfile(updates) {
    try {
      if (!this.isAuthenticated) {
        return { success: false, error: 'Not authenticated' };
      }
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 500));
      
      // Update user data
      const updatedUser = { ...this.currentUser, ...updates };
      
      // Store updated user
      this.storage.set('user', updatedUser);
      this.currentUser = updatedUser;
      
      console.log('✅ Profile updated successfully');
      
      return { success: true, user: updatedUser };
    } catch (error) {
      console.error('❌ Profile update failed:', error);
      return { success: false, error: 'Failed to update profile' };
    }
  }

  // Change password
  async changePassword(currentPassword, newPassword) {
    try {
      if (!this.isAuthenticated) {
        return { success: false, error: 'Not authenticated' };
      }
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 500));
      
      // Validate current password (in real app, this would be verified server-side)
      if (currentPassword !== 'password') {
        return { success: false, error: 'Current password is incorrect' };
      }
      
      // Validate new password
      const strength = this.checkPasswordStrength(newPassword);
      if (!strength.isValid) {
        return { success: false, error: 'New password is not strong enough' };
      }
      
      console.log('✅ Password changed successfully');
      
      return { success: true };
    } catch (error) {
      console.error('❌ Password change failed:', error);
      return { success: false, error: 'Failed to change password' };
    }
  }

  // Request password reset
  async requestPasswordReset(email) {
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 500));
      
      console.log('✅ Password reset email sent');
      
      return { success: true, message: 'Password reset email sent' };
    } catch (error) {
      console.error('❌ Password reset request failed:', error);
      return { success: false, error: 'Failed to send password reset email' };
    }
  }

  // Reset password
  async resetPassword(token, newPassword) {
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 500));
      
      // Validate token (in real app, this would be verified server-side)
      if (!token || token.length < 10) {
        return { success: false, error: 'Invalid or expired reset token' };
      }
      
      // Validate new password
      const strength = this.checkPasswordStrength(newPassword);
      if (!strength.isValid) {
        return { success: false, error: 'New password is not strong enough' };
      }
      
      console.log('✅ Password reset successful');
      
      return { success: true, message: 'Password reset successful' };
    } catch (error) {
      console.error('❌ Password reset failed:', error);
      return { success: false, error: 'Failed to reset password' };
    }
  }
}
