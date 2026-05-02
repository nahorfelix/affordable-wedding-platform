import bcrypt from 'bcryptjs'

export interface AdminUser {
  id: string
  username: string
  passwordHash: string
  createdAt: string
  lastLogin?: string
}

export interface LoginSession {
  userId: string
  username: string
  loginTime: string
  expiresAt: string
}

// Default admin credentials (will be hashed on first run)
const DEFAULT_ADMIN = {
  username: 'admin',
  password: 'ASKOFU_ADMIN_2026'
}

// Session duration (24 hours)
const SESSION_DURATION = 24 * 60 * 60 * 1000

export class AuthService {
  private static readonly USERS_KEY = 'adminUsers'
  private static readonly SESSION_KEY = 'adminSession'

  // Initialize default admin user if not exists
  static async initializeDefaultAdmin(): Promise<void> {
    const users = this.getUsers()
    
    // Create default admin if no users exist
    if (users.length === 0) {
      const hashedPassword = await bcrypt.hash(DEFAULT_ADMIN.password, 12)
      const defaultUser: AdminUser = {
        id: 'admin-1',
        username: DEFAULT_ADMIN.username,
        passwordHash: hashedPassword,
        createdAt: new Date().toISOString()
      }
      
      localStorage.setItem(this.USERS_KEY, JSON.stringify([defaultUser]))
    }
  }

  // Get all admin users
  static getUsers(): AdminUser[] {
    if (typeof window === 'undefined') return []
    
    const stored = localStorage.getItem(this.USERS_KEY)
    return stored ? JSON.parse(stored) : []
  }

  // Save users to storage
  private static saveUsers(users: AdminUser[]): void {
    localStorage.setItem(this.USERS_KEY, JSON.stringify(users))
  }

  // Find user by username
  static findUserByUsername(username: string): AdminUser | null {
    const users = this.getUsers()
    return users.find(user => user.username === username) || null
  }

  // Authenticate user
  static async authenticate(username: string, password: string): Promise<{ success: boolean; user?: AdminUser; error?: string }> {
    try {
      // Initialize admin if needed
      await this.initializeDefaultAdmin()
      
      const user = this.findUserByUsername(username)
      if (!user) {
        return { success: false, error: 'Invalid username or password' }
      }

      const isValidPassword = await bcrypt.compare(password, user.passwordHash)
      if (!isValidPassword) {
        return { success: false, error: 'Invalid username or password' }
      }

      // Update last login
      const users = this.getUsers()
      const updatedUsers = users.map(u => 
        u.id === user.id 
          ? { ...u, lastLogin: new Date().toISOString() }
          : u
      )
      this.saveUsers(updatedUsers)

      return { success: true, user: { ...user, lastLogin: new Date().toISOString() } }
    } catch (error) {
      console.error('Authentication error:', error)
      return { success: false, error: 'Authentication failed' }
    }
  }

  // Create session
  static createSession(user: AdminUser): LoginSession {
    const session: LoginSession = {
      userId: user.id,
      username: user.username,
      loginTime: new Date().toISOString(),
      expiresAt: new Date(Date.now() + SESSION_DURATION).toISOString()
    }

    localStorage.setItem(this.SESSION_KEY, JSON.stringify(session))
    return session
  }

  // Get current session
  static getCurrentSession(): LoginSession | null {
    if (typeof window === 'undefined') return null
    
    const stored = localStorage.getItem(this.SESSION_KEY)
    if (!stored) return null

    const session: LoginSession = JSON.parse(stored)
    
    // Check if session is expired
    if (new Date(session.expiresAt) < new Date()) {
      this.clearSession()
      return null
    }

    return session
  }

  // Check if user is authenticated
  static isAuthenticated(): boolean {
    return this.getCurrentSession() !== null
  }

  // Clear session (logout)
  static clearSession(): void {
    localStorage.removeItem(this.SESSION_KEY)
  }

  // Change password
  static async changePassword(currentPassword: string, newPassword: string): Promise<{ success: boolean; error?: string }> {
    try {
      const session = this.getCurrentSession()
      if (!session) {
        return { success: false, error: 'Not authenticated' }
      }

      const user = this.findUserByUsername(session.username)
      if (!user) {
        return { success: false, error: 'User not found' }
      }

      // Verify current password
      const isValidCurrentPassword = await bcrypt.compare(currentPassword, user.passwordHash)
      if (!isValidCurrentPassword) {
        return { success: false, error: 'Current password is incorrect' }
      }

      // Validate new password
      if (newPassword.length < 8) {
        return { success: false, error: 'New password must be at least 8 characters long' }
      }

      // Hash new password
      const newPasswordHash = await bcrypt.hash(newPassword, 12)

      // Update user
      const users = this.getUsers()
      const updatedUsers = users.map(u =>
        u.id === user.id
          ? { ...u, passwordHash: newPasswordHash }
          : u
      )

      this.saveUsers(updatedUsers)
      return { success: true }
    } catch (error) {
      console.error('Password change error:', error)
      return { success: false, error: 'Failed to change password' }
    }
  }

  // Get current user
  static getCurrentUser(): AdminUser | null {
    const session = this.getCurrentSession()
    if (!session) return null

    return this.findUserByUsername(session.username)
  }

  // Extend session (refresh expiration)
  static extendSession(): boolean {
    const session = this.getCurrentSession()
    if (!session) return false

    const extendedSession: LoginSession = {
      ...session,
      expiresAt: new Date(Date.now() + SESSION_DURATION).toISOString()
    }

    localStorage.setItem(this.SESSION_KEY, JSON.stringify(extendedSession))
    return true
  }
}