<template>
  <div class="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 flex items-center justify-center px-4">
    <div class="text-center max-w-2xl mx-auto">
      <!-- 404 Animation -->
      <div class="mb-12">
        <div class="text-8xl sm:text-9xl font-black bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent animate-pulse">
          404
        </div>
        <div class="mt-4 text-2xl sm:text-3xl font-bold text-slate-700">
          Oops! Page Not Found
        </div>
      </div>

      <!-- Error Message -->
      <div class="bg-white/80 backdrop-blur-xl rounded-3xl shadow-2xl p-8 mb-8 border border-white/20">
        <div class="mb-6">
          <svg class="w-20 h-20 mx-auto text-slate-400 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1" d="M9.172 16.172a4 4 0 015.656 0M9 12h6m-6-4h6m2 5.291A7.962 7.962 0 0112 15c-2.34 0-4.291-1.1-5.64-2.709A7.962 7.962 0 014 12a7.96 7.96 0 012.36-5.291A7.962 7.962 0 0112 4a7.96 7.96 0 015.64 2.709A7.962 7.962 0 0120 12a7.96 7.96 0 01-2.36 5.291z"></path>
          </svg>
        </div>
        
        <h1 class="text-2xl font-bold text-slate-800 mb-4">
          The page you're looking for doesn't exist
        </h1>
        
        <p class="text-slate-600 text-lg leading-relaxed mb-8">
          It might have been moved, deleted, or you entered the wrong URL. 
          Don't worry, let's get you back on track!
        </p>

        <!-- Action Buttons -->
        <div class="flex flex-col sm:flex-row gap-4 justify-center">
          <button 
            @click="goHome"
            class="group bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-4 rounded-2xl font-semibold text-lg
                   hover:from-blue-700 hover:to-purple-700 transform hover:scale-105 transition-all duration-300
                   shadow-lg hover:shadow-xl flex items-center justify-center gap-2"
          >
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"></path>
            </svg>
            Go Home
          </button>
          
          <button 
            @click="goBack"
            class="group bg-white text-slate-800 px-8 py-4 rounded-2xl font-semibold text-lg border-2 border-slate-200
                   hover:border-blue-300 hover:bg-slate-50 transform hover:scale-105 transition-all duration-300
                   shadow-lg hover:shadow-xl flex items-center justify-center gap-2"
          >
            <svg class="w-5 h-5 group-hover:-translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 16l-4-4m0 0l4-4m-4 4h18"></path>
            </svg>
            Go Back
          </button>
        </div>
      </div>

      <!-- Helpful Links -->
      <div class="text-slate-600">
        <p class="mb-4 font-medium">Or explore these sections:</p>
        <div class="flex flex-wrap justify-center gap-4">
          <router-link 
            to="/" 
            class="text-blue-600 hover:text-blue-800 font-medium hover:underline transition-colors"
          >
            Home
          </router-link>
          <router-link 
            to="/projects" 
            class="text-blue-600 hover:text-blue-800 font-medium hover:underline transition-colors"
          >
            Projects
          </router-link>
          <button 
            @click="scrollToContact"
            class="text-blue-600 hover:text-blue-800 font-medium hover:underline transition-colors"
          >
            Contact
          </button>
        </div>
      </div>
    </div>

    <!-- Background decoration -->
    <div class="absolute inset-0 overflow-hidden pointer-events-none">
      <div class="absolute -top-4 -right-4 w-72 h-72 bg-gradient-to-br from-blue-400/10 to-purple-500/10 rounded-full blur-3xl animate-pulse"></div>
      <div class="absolute top-1/2 -left-8 w-96 h-96 bg-gradient-to-tr from-cyan-300/10 to-blue-500/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
      <div class="absolute bottom-0 right-1/3 w-64 h-64 bg-gradient-to-tl from-purple-400/10 to-pink-500/10 rounded-full blur-3xl animate-pulse delay-500"></div>
    </div>
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router'

const router = useRouter()

const goHome = () => {
  router.push('/')
}

const goBack = () => {
  if (window.history.length > 1) {
    router.go(-1)
  } else {
    router.push('/')
  }
}

const scrollToContact = () => {
  // Go to home page first, then scroll to contact
  router.push('/')
  setTimeout(() => {
    const contactElement = document.getElementById('contact')
    if (contactElement) {
      contactElement.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }
  }, 100)
}
</script>

<style scoped>
/* Additional animation for the 404 number */
@keyframes float {
  0%, 100% {
    transform: translateY(0px);
  }
  50% {
    transform: translateY(-10px);
  }
}

.animate-float {
  animation: float 3s ease-in-out infinite;
}
</style>