<template>
  <transition
    enter-active-class="transition-all duration-300 ease-out"
    enter-from-class="opacity-0"
    enter-to-class="opacity-100"
    leave-active-class="transition-all duration-200 ease-in"
    leave-from-class="opacity-100"
    leave-to-class="opacity-0"
  >
    <div v-if="show" class="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <transition
        enter-active-class="transition-all duration-300 ease-out"
        enter-from-class="opacity-0 scale-95 translate-y-4"
        enter-to-class="opacity-100 scale-100 translate-y-0"
        leave-active-class="transition-all duration-200 ease-in"
        leave-from-class="opacity-100 scale-100 translate-y-0"
        leave-to-class="opacity-0 scale-95 translate-y-4"
      >
        <div v-if="show" class="bg-white rounded-3xl shadow-2xl max-w-md w-full mx-4 overflow-hidden border border-white/20">
          <!-- Header -->
          <div class="bg-gradient-to-r from-blue-600 to-purple-600 p-6 text-white relative overflow-hidden">
            <div class="absolute inset-0 bg-white/10 backdrop-blur-sm"></div>
            <div class="relative z-10 text-center">
              <div class="w-16 h-16 mx-auto mb-4 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center">
                <svg class="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-1a2 2 0 00-2-2H6a2 2 0 00-2 2v1a2 2 0 002 2zM11 5.07V5a4 4 0 00-4-4H7a4 4 0 004 4v.07m4-.07V5a4 4 0 004-4v0a4 4 0 00-4 4v.07M11 5a4 4 0 104 0M11 5a4 4 0 014 0"></path>
                </svg>
              </div>
              <h2 class="text-2xl font-bold mb-2">Admin Access</h2>
              <p class="text-white/90">Enter your secure PIN to continue</p>
            </div>
          </div>

          <!-- Content -->
          <div class="p-8">
            <form @submit.prevent="submit" class="space-y-6">
              <!-- PIN Input -->
              <div class="space-y-2">
                <label for="admin-pin" class="block text-sm font-semibold text-slate-700">
                  Security PIN
                </label>
                <div class="relative">
                  <input
                    id="admin-pin"
                    v-model="pin"
                    :type="showPin ? 'text' : 'password'"
                    placeholder="Enter your admin PIN"
                    class="w-full border-2 border-slate-200 focus:border-blue-500 rounded-2xl px-4 py-4 pr-12 
                           focus:outline-none transition-colors text-lg font-mono tracking-wider
                           placeholder:text-slate-400 placeholder:font-sans placeholder:tracking-normal"
                    :class="{
                      'border-red-300 focus:border-red-500': hasError,
                      'border-green-300 focus:border-green-500': isValid && pin.length > 0
                    }"
                    maxlength="20"
                    autocomplete="off"
                    ref="pinInput"
                  />
                  
                  <!-- Toggle visibility button -->
                  <button
                    type="button"
                    @click="togglePinVisibility"
                    class="absolute right-3 top-1/2 transform -translate-y-1/2 text-slate-400 hover:text-slate-600 transition-colors p-1"
                    :title="showPin ? 'Hide PIN' : 'Show PIN'"
                  >
                    <svg v-if="showPin" class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.878 9.878L8.464 8.464a1.42 1.42 0 00-2.007 0l-6.378 6.379a1.42 1.42 0 000 2.007L8.464 25.236"></path>
                    </svg>
                    <svg v-else class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path>
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"></path>
                    </svg>
                  </button>
                </div>
                
                <!-- Error message -->
                <transition
                  enter-active-class="transition-all duration-200 ease-out"
                  enter-from-class="opacity-0 -translate-y-2"
                  enter-to-class="opacity-100 translate-y-0"
                  leave-active-class="transition-all duration-200 ease-in"
                  leave-from-class="opacity-100 translate-y-0"
                  leave-to-class="opacity-0 -translate-y-2"
                >
                  <p v-if="hasError" class="text-red-600 text-sm font-medium flex items-center gap-2">
                    <svg class="w-4 h-4 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                    </svg>
                    {{ errorMessage }}
                  </p>
                </transition>
              </div>

              <!-- Security Notice -->
              <div class="bg-amber-50 border-2 border-amber-200 rounded-2xl p-4">
                <div class="flex items-start gap-3">
                  <svg class="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                  </svg>
                  <div>
                    <p class="text-amber-800 text-sm font-medium mb-1">Security Notice</p>
                    <p class="text-amber-700 text-xs leading-relaxed">
                      Admin access grants full control over portfolio content. Only enter your PIN if you are the site owner.
                    </p>
                  </div>
                </div>
              </div>

              <!-- Action Buttons -->
              <div class="flex flex-col sm:flex-row gap-3">
                <button
                  type="button"
                  @click="close"
                  class="flex-1 bg-slate-100 hover:bg-slate-200 text-slate-700 px-6 py-3 rounded-2xl font-semibold 
                         transition-all duration-300 hover:shadow-lg border-2 border-slate-200 hover:border-slate-300"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  :disabled="!pin || isLoading"
                  class="flex-1 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 
                         text-white px-6 py-3 rounded-2xl font-semibold transition-all duration-300 
                         hover:shadow-xl transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed
                         disabled:transform-none disabled:hover:shadow-none flex items-center justify-center gap-2"
                >
                  <svg v-if="isLoading" class="w-4 h-4 animate-spin" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"></path>
                  </svg>
                  <svg v-else class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                  </svg>
                  {{ isLoading ? 'Verifying...' : 'Access Admin Panel' }}
                </button>
              </div>
            </form>

            <!-- Attempts Counter -->
            <div v-if="attempts > 0" class="mt-6 text-center">
              <p class="text-sm text-slate-500">
                {{ maxAttempts - attempts }} attempt{{ maxAttempts - attempts !== 1 ? 's' : '' }} remaining
              </p>
              <div class="w-full bg-slate-200 rounded-full h-2 mt-2">
                <div 
                  class="bg-gradient-to-r from-red-500 to-orange-500 h-2 rounded-full transition-all duration-300"
                  :style="{ width: `${(attempts / maxAttempts) * 100}%` }"
                ></div>
              </div>
            </div>
          </div>
        </div>
      </transition>
    </div>
  </transition>
</template>

<script setup>
import { ref, defineEmits, nextTick } from 'vue'

const emit = defineEmits(['success'])

// State
const show = ref(false)
const pin = ref('')
const showPin = ref(false)
const hasError = ref(false)
const errorMessage = ref('')
const isLoading = ref(false)
const attempts = ref(0)
const maxAttempts = 3
const isValid = ref(false)

// Correct PIN - you should change this
const CORRECT_PIN = 'goodgames21'

// Methods
function open() {
  show.value = true
  pin.value = ''
  hasError.value = false
  errorMessage.value = ''
  showPin.value = false
  attempts.value = 0
  isValid.value = false
  
  // Focus input after modal opens
  nextTick(() => {
    if (document.querySelector('#admin-pin')) {
      document.querySelector('#admin-pin').focus()
    }
  })
}

function close() {
  show.value = false
  pin.value = ''
  hasError.value = false
  errorMessage.value = ''
  isLoading.value = false
  attempts.value = 0
}

function togglePinVisibility() {
  showPin.value = !showPin.value
}

async function submit() {
  if (!pin.value.trim()) {
    showError('Please enter your PIN')
    return
  }

  isLoading.value = true
  hasError.value = false

  // Simulate network delay for more realistic feel
  await new Promise(resolve => setTimeout(resolve, 800))

  if (pin.value === CORRECT_PIN) {
    // Success
    localStorage.setItem('admin_token', pin.value)
    isValid.value = true
    
    // Brief success state
    await new Promise(resolve => setTimeout(resolve, 500))
    
    emit('success')
    close()
    
    // Success feedback
    showSuccessNotification()
  } else {
    // Failed attempt
    attempts.value++
    
    if (attempts.value >= maxAttempts) {
      showError('Too many failed attempts. Please try again later.')
      // Auto-close after max attempts
      setTimeout(() => {
        close()
      }, 3000)
    } else {
      showError(`Invalid PIN. ${maxAttempts - attempts.value} attempt${maxAttempts - attempts.value !== 1 ? 's' : ''} remaining.`)
    }
  }

  isLoading.value = false
}

function showError(message) {
  hasError.value = true
  errorMessage.value = message
  
  // Clear error after delay
  setTimeout(() => {
    hasError.value = false
    errorMessage.value = ''
  }, 4000)
  
  // Shake animation effect
  const input = document.querySelector('#admin-pin')
  if (input) {
    input.classList.add('animate-shake')
    setTimeout(() => {
      input.classList.remove('animate-shake')
    }, 600)
  }
}

function showSuccessNotification() {
  // You can implement a toast notification here
  console.log('Admin access granted successfully!')
}

// Expose methods
defineExpose({ open })

// Handle escape key
if (typeof window !== 'undefined') {
  const handleEscape = (e) => {
    if (e.key === 'Escape' && show.value) {
      close()
    }
  }
  
  window.addEventListener('keydown', handleEscape)
  
  // Cleanup would be handled by component lifecycle in a full app
}
</script>

<style scoped>
/* Custom shake animation */
@keyframes shake {
  0%, 100% { transform: translateX(0); }
  10%, 30%, 50%, 70%, 90% { transform: translateX(-4px); }
  20%, 40%, 60%, 80% { transform: translateX(4px); }
}

.animate-shake {
  animation: shake 0.6s ease-in-out;
}

/* Focus ring enhancement */
input:focus {
  box-shadow: 0 0 0 3px rgb(59 130 246 / 0.1);
}

/* Loading spinner animation */
@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}

.animate-spin {
  animation: spin 1s linear infinite;
}

/* Backdrop blur support */
@supports (backdrop-filter: blur(4px)) {
  .backdrop-blur-sm {
    backdrop-filter: blur(4px);
  }
}

/* Enhanced button states */
button:disabled {
  transform: none !important;
}

button:focus {
  outline: 2px solid #3b82f6;
  outline-offset: 2px;
}

/* Smooth transitions for all elements */
* {
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

/* Custom scrollbar if needed */
::-webkit-scrollbar {
  width: 8px;
}

::-webkit-scrollbar-track {
  background: #f1f5f9;
}

::-webkit-scrollbar-thumb {
  background: #cbd5e1;
  border-radius: 4px;
}

::-webkit-scrollbar-thumb:hover {
  background: #94a3b8;
}

/* Progressive enhancement for advanced CSS features */
@supports (backdrop-filter: blur(4px)) {
  .bg-black\/60 {
    background-color: rgba(0, 0, 0, 0.4);
  }
}

/* Mobile-specific adjustments */
@media (max-width: 640px) {
  .max-w-md {
    max-width: calc(100vw - 2rem);
  }
}
</style>