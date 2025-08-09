// src/composables/useAuth.js
import { ref, computed } from 'vue'
import axios from 'axios'

// Global state
const isAdmin = ref(false)
const adminTokenKey = 'admin_token'
const sessionTimeoutKey = 'admin_session_timeout'

// Session timeout (24 hours in milliseconds)
const SESSION_DURATION = 24 * 60 * 60 * 1000

// Enhanced authentication checker
function checkAuth() {
  const token = localStorage.getItem(adminTokenKey)
  const sessionTimeout = localStorage.getItem(sessionTimeoutKey)
  const now = Date.now()

  // Check if token exists and session hasn't expired
  if (token && sessionTimeout && now < parseInt(sessionTimeout)) {
    isAdmin.value = true
    setAxiosHeaders(token)
    
    // Auto-refresh session if within last hour
    if (parseInt(sessionTimeout) - now < 60 * 60 * 1000) {
      refreshSession()
    }
  } else {
    // Session expired or invalid
    clearAuth()
  }
}

// Set axios headers with token
function setAxiosHeaders(token) {
  axios.defaults.headers.common['X-ADMIN-TOKEN'] = token
}

// Clear axios headers
function clearAxiosHeaders() {
  delete axios.defaults.headers.common['X-ADMIN-TOKEN']
}

// Refresh session timeout
function refreshSession() {
  const newTimeout = Date.now() + SESSION_DURATION
  localStorage.setItem(sessionTimeoutKey, newTimeout.toString())
}

// Clear all authentication data
function clearAuth() {
  localStorage.removeItem(adminTokenKey)
  localStorage.removeItem(sessionTimeoutKey)
  sessionStorage.clear()
  isAdmin.value = false
  clearAxiosHeaders()
}

// Enhanced login function
const login = (token = 'goodgames21') => {
  try {
    // Store token and session timeout
    localStorage.setItem(adminTokenKey, token)
    const sessionTimeout = Date.now() + SESSION_DURATION
    localStorage.setItem(sessionTimeoutKey, sessionTimeout.toString())
    
    // Update state and headers
    isAdmin.value = true
    setAxiosHeaders(token)
    
    // Log successful login
    console.log('Admin login successful')
    
    // Optional: Track login analytics
    trackAdminLogin()
    
    return true
  } catch (error) {
    console.error('Login failed:', error)
    return false
  }
}

// Enhanced logout function
const logout = () => {
  try {
    // Clear authentication data
    clearAuth()
    
    // Log successful logout
    console.log('Admin logout successful')
    
    // Optional: Track logout analytics
    trackAdminLogout()
    
    // Optional: Redirect to home page
    if (typeof window !== 'undefined' && window.location.pathname !== '/') {
      window.location.href = '/'
    }
    
    return true
  } catch (error) {
    console.error('Logout failed:', error)
    return false
  }
}

// Check if session is expiring soon (within next 10 minutes)
const isSessionExpiring = computed(() => {
  const sessionTimeout = localStorage.getItem(sessionTimeoutKey)
  if (!sessionTimeout || !isAdmin.value) return false
  
  const now = Date.now()
  const timeout = parseInt(sessionTimeout)
  const tenMinutes = 10 * 60 * 1000
  
  return timeout - now < tenMinutes && timeout > now
})

// Get remaining session time in minutes
const remainingSessionTime = computed(() => {
  const sessionTimeout = localStorage.getItem(sessionTimeoutKey)
  if (!sessionTimeout || !isAdmin.value) return 0
  
  const now = Date.now()
  const timeout = parseInt(sessionTimeout)
  const remainingMs = Math.max(0, timeout - now)
  
  return Math.floor(remainingMs / (60 * 1000))
})

// Extend current session
const extendSession = () => {
  if (isAdmin.value) {
    const token = localStorage.getItem(adminTokenKey)
    if (token) {
      refreshSession()
      console.log('Session extended')
      return true
    }
  }
  return false
}

// Validate current session
const validateSession = async () => {
  const token = localStorage.getItem(adminTokenKey)
  const sessionTimeout = localStorage.getItem(sessionTimeoutKey)
  
  if (!token || !sessionTimeout) {
    logout()
    return false
  }
  
  const now = Date.now()
  if (now >= parseInt(sessionTimeout)) {
    logout()
    return false
  }
  
  // Optional: Validate with server
  try {
    // You can add a server endpoint to validate the token
    // const response = await axios.get('/api/validate-admin', {
    //   headers: { 'X-ADMIN-TOKEN': token }
    // })
    // return response.status === 200
    return true
  } catch (error) {
    console.error('Session validation failed:', error)
    logout()
    return false
  }
}

// Activity tracker to extend session on user activity
let activityTimer = null
let lastActivity = Date.now()

const trackActivity = () => {
  if (!isAdmin.value) return
  
  lastActivity = Date.now()
  
  // Clear existing timer
  if (activityTimer) {
    clearTimeout(activityTimer)
  }
  
  // Set new timer to refresh session after 30 minutes of activity
  activityTimer = setTimeout(() => {
    if (Date.now() - lastActivity < 30 * 60 * 1000) {
      refreshSession()
    }
  }, 30 * 60 * 1000)
}

// Analytics tracking functions (optional)
const trackAdminLogin = () => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', 'admin_login', {
      event_category: 'admin',
      event_label: 'successful_login',
      value: 1
    })
  }
}

const trackAdminLogout = () => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', 'admin_logout', {
      event_category: 'admin', 
      event_label: 'successful_logout',
      value: 1
    })
  }
}

// Set up activity listeners if in browser environment
if (typeof window !== 'undefined') {
  const activityEvents = ['mousedown', 'mousemove', 'keypress', 'scroll', 'touchstart', 'click']
  
  const throttledTrackActivity = throttle(trackActivity, 60000) // Throttle to once per minute
  
  activityEvents.forEach(event => {
    window.addEventListener(event, throttledTrackActivity, true)
  })
  
  // Session expiration warning
  const checkSessionExpiration = () => {
    if (isSessionExpiring.value && isAdmin.value) {
      // You can show a toast notification here
      console.warn('Admin session expires soon!')
      
      // Optional: Show confirmation dialog to extend session
      if (confirm('Your admin session is about to expire. Extend session?')) {
        extendSession()
      }
    }
  }
  
  // Check session expiration every minute
  setInterval(checkSessionExpiration, 60000)
}

// Utility function to throttle function calls
function throttle(func, limit) {
  let inThrottle
  return function() {
    const args = arguments
    const context = this
    if (!inThrottle) {
      func.apply(context, args)
      inThrottle = true
      setTimeout(() => inThrottle = false, limit)
    }
  }
}

// Initialize authentication check on module load
checkAuth()

// Set up axios interceptors for automatic token handling
axios.interceptors.response.use(
  response => response,
  error => {
    // Handle 401 Unauthorized responses
    if (error.response?.status === 401 && isAdmin.value) {
      console.warn('Admin session expired due to server response')
      logout()
    }
    return Promise.reject(error)
  }
)

// Export the composable
export function useAuth() {
  return {
    // State
    isAdmin,
    isSessionExpiring,
    remainingSessionTime,
    
    // Actions
    login,
    logout,
    checkAuth,
    extendSession,
    validateSession,
    
    // Utilities
    refreshSession,
    trackActivity
  }
}