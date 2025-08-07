import { ref } from 'vue'

const isAdmin = ref(!!localStorage.getItem('admin_token'))

const login = () => {
  localStorage.setItem('admin_token', 'true')
  isAdmin.value = true
}

const logout = () => {
  localStorage.removeItem('admin_token')
  isAdmin.value = false
}

export function useAuth() {
  return { isAdmin, login, logout }
}
