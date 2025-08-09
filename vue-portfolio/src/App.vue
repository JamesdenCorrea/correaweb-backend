<template>
  <div class="min-h-screen bg-slate-50">
    <!-- Enhanced Navbar -->
    <header class="sticky top-0 z-50 bg-white/95 backdrop-blur-xl shadow-lg border-b border-slate-200/50">
      <nav class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex justify-between items-center h-20">
          <!-- Enhanced Logo -->
          <div
            class="flex items-center gap-3 cursor-pointer group transition-all duration-300"
            @click="navigateToHome"
          >
            <!-- Logo Icon -->
            <div class="relative">
              <div class="w-10 h-10 bg-gradient-to-br from-blue-600 to-purple-600 rounded-xl flex items-center justify-center shadow-lg group-hover:shadow-xl transition-all duration-300 transform group-hover:rotate-12">
                <span class="text-white font-bold text-lg">JC</span>
              </div>
              <div class="absolute -top-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-white animate-pulse"></div>
            </div>
            
            <!-- Brand Text -->
            <div class="flex flex-col">
              <span class="text-xl font-bold bg-gradient-to-r from-slate-800 to-slate-600 bg-clip-text text-transparent group-hover:from-blue-600 group-hover:to-purple-600 transition-all duration-300">
                Correa Portfolio
              </span>
              <span class="text-xs text-slate-500 font-medium">Full Stack Developer</span>
            </div>
            
            <!-- Admin Badge -->
            <span
              v-if="isAdmin"
              class="ml-3 bg-gradient-to-r from-green-500 to-emerald-500 text-white text-xs font-bold px-3 py-1 rounded-full border border-green-400 shadow-md animate-pulse"
            >
              <svg class="w-3 h-3 inline mr-1" fill="currentColor" viewBox="0 0 20 20">
                <path fill-rule="evenodd" d="M18 8a6 6 0 01-7.743 5.743L10 14l-1 1-1 1H6l2-2 2-2 .257-.257A6 6 0 118 2z" clip-rule="evenodd"></path>
                <path d="M7 8a1 1 0 100-2 1 1 0 000 2z"></path>
              </svg>
              Admin
            </span>
          </div>

          <!-- Desktop Menu -->
          <div class="hidden md:flex items-center space-x-1">
            <nav-item 
              @click="navigateToHome" 
              :active="$route.name === 'Home'"
              icon="home"
            >
              Home
            </nav-item>
            
            <nav-item 
              @click="navigateToProjects" 
              :active="$route.name === 'Projects' || $route.path.includes('/projects')"
              icon="briefcase"
            >
              Projects
            </nav-item>
            
            <nav-item 
              @click="scrollToContact"
              icon="mail"
            >
              Contact
            </nav-item>

            <!-- Social Links in Navigation -->
            <div class="ml-6 flex items-center gap-2">
              <social-nav-link 
                href="https://github.com/JamesdenCorrea" 
                icon="github"
                tooltip="GitHub Profile"
              />
              
              <social-nav-link 
                href="https://www.linkedin.com/in/jamesden-correa-557742348/" 
                icon="linkedin"
                tooltip="LinkedIn Profile"
              />
            </div>

            <!-- Admin Controls -->
            <div v-if="isAdmin" class="ml-4 flex items-center gap-3">
              <button
                @click="handleLogout"
                class="group bg-gradient-to-r from-red-500 to-rose-500 text-white px-4 py-2 rounded-xl font-medium text-sm
                       hover:from-red-600 hover:to-rose-600 transform hover:scale-105 transition-all duration-300
                       shadow-lg hover:shadow-xl flex items-center gap-2"
              >
                <svg class="w-4 h-4 group-hover:rotate-12 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"></path>
                </svg>
                Logout
              </button>
            </div>
          </div>

          <!-- Mobile Menu Button -->
          <button 
            class="md:hidden relative w-10 h-10 rounded-xl bg-slate-100 hover:bg-slate-200 transition-colors duration-200 flex items-center justify-center group"
            @click="toggleMenu"
          >
            <div class="space-y-1.5">
              <span class="block w-5 h-0.5 bg-slate-600 transition-all duration-300 group-hover:bg-blue-600" 
                    :class="{ 'rotate-45 translate-y-2': isOpen }"></span>
              <span class="block w-5 h-0.5 bg-slate-600 transition-all duration-300 group-hover:bg-blue-600" 
                    :class="{ 'opacity-0': isOpen }"></span>
              <span class="block w-5 h-0.5 bg-slate-600 transition-all duration-300 group-hover:bg-blue-600" 
                    :class="{ '-rotate-45 -translate-y-2': isOpen }"></span>
            </div>
          </button>
        </div>

        <!-- Enhanced Mobile Menu -->
        <transition
          enter-active-class="transition-all duration-300 ease-out"
          enter-from-class="opacity-0 -translate-y-4"
          enter-to-class="opacity-100 translate-y-0"
          leave-active-class="transition-all duration-300 ease-in"
          leave-from-class="opacity-100 translate-y-0"
          leave-to-class="opacity-0 -translate-y-4"
        >
          <div v-if="isOpen" class="md:hidden bg-white/95 backdrop-blur-xl border-t border-slate-200/50 rounded-b-2xl shadow-2xl">
            <div class="px-6 py-6 space-y-3">
              <mobile-nav-item 
                @click="handleMobileNavClick('home')" 
                :active="$route.name === 'Home'"
                icon="home"
              >
                Home
              </mobile-nav-item>
              
              <mobile-nav-item 
                @click="handleMobileNavClick('projects')" 
                :active="$route.name === 'Projects' || $route.path.includes('/projects')"
                icon="briefcase"
              >
                Projects
              </mobile-nav-item>
              
              <mobile-nav-item 
                @click="handleMobileNavClick('contact')"
                icon="mail"
              >
                Contact
              </mobile-nav-item>

              <!-- Mobile Social Links -->
              <div class="pt-4 border-t border-slate-200">
                <p class="text-xs font-semibold text-slate-500 mb-3 uppercase tracking-wider">Connect With Me</p>
                <div class="flex items-center gap-3">
                  <mobile-social-link 
                    href="https://github.com/JamesdenCorrea" 
                    icon="github"
                    label="GitHub"
                  />
                  <mobile-social-link 
                    href="https://www.linkedin.com/in/jamesden-correa-557742348/" 
                    icon="linkedin"
                    label="LinkedIn"
                  />
                </div>
              </div>

              <!-- Mobile Admin Controls -->
              <div v-if="isAdmin" class="pt-4 border-t border-slate-200">
                <button
                  @click="handleMobileLogout"
                  class="w-full bg-gradient-to-r from-red-500 to-rose-500 text-white px-4 py-3 rounded-xl font-medium
                         hover:from-red-600 hover:to-rose-600 transition-all duration-300
                         shadow-lg flex items-center justify-center gap-2"
                >
                  <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"></path>
                  </svg>
                  Logout
                </button>
              </div>
            </div>
          </div>
        </transition>
      </nav>
    </header>

    <!-- Page Content with smooth transitions -->
    <main class="transition-all duration-500">
      <router-view />
    </main>

    <!-- Enhanced Contact Modal -->
    <transition
      enter-active-class="transition-all duration-300 ease-out"
      enter-from-class="opacity-0 scale-95"
      enter-to-class="opacity-100 scale-100"
      leave-active-class="transition-all duration-200 ease-in"
      leave-from-class="opacity-100 scale-100"
      leave-to-class="opacity-0 scale-95"
    >
      <ContactForm v-if="isModalOpen" :visible="isModalOpen" @close="closeModal" />
    </transition>

    <!-- Enhanced Footer/Contact Section -->

    <!-- Admin Login Modal -->
    <AdminPinModal ref="adminPinModal" @success="onAdminLoginSuccess" />
  </div>
</template>

<script setup>
import { ref, provide, onMounted, computed } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import ContactForm from './components/ContactForm.vue'
import AdminPinModal from './components/AdminPinModal.vue'
import { useAuth } from './composables/useAuth'
import axios from 'axios'

// ✅ Set base URL from environment variable so it's never undefined
axios.defaults.baseURL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000'

// Composables
const router = useRouter()
const route = useRoute()
const { isAdmin, login, logout } = useAuth()

// UI state
const isOpen = ref(false)
const isModalOpen = ref(false)
const adminPinModal = ref(null)

// Navigation functions
const navigateToHome = () => {
  closeMenu()
  if (route.name !== 'Home') {
    router.push('/')
  } else {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }
}

const navigateToProjects = () => {
  closeMenu()
  if (route.name !== 'Home') {
    router.push('/')
    // Wait for navigation then scroll to projects
    setTimeout(() => {
      scrollToProjects()
    }, 100)
  } else {
    scrollToProjects()
  }
}

const scrollToProjects = () => {
  const projectsElement = document.getElementById('projects')
  if (projectsElement) {
    projectsElement.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }
}

const scrollToContact = () => {
  closeMenu()
  const contactElement = document.getElementById('contact')
  if (contactElement) {
    contactElement.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }
}

// Mobile navigation
const handleMobileNavClick = (target) => {
  closeMenu()
  switch (target) {
    case 'home':
      navigateToHome()
      break
    case 'projects':
      navigateToProjects()
      break
    case 'contact':
      scrollToContact()
      break
  }
}

// Modal functions
const openModal = () => {
  isModalOpen.value = true
}

const closeModal = () => {
  isModalOpen.value = false
}

// Menu functions
const toggleMenu = () => {
  isOpen.value = !isOpen.value
}

const closeMenu = () => {
  isOpen.value = false
}

// Auth functions
const handleLogout = () => {
  logout()
}

const handleMobileLogout = () => {
  closeMenu()
  logout()
}

const onAdminLoginSuccess = () => {
  login()
}

// Keep admin state after refresh
onMounted(() => {
  const token = localStorage.getItem('admin_token')
  if (token) {
    login()
  }
})

provide('isAdmin', isAdmin)
</script>

<!-- Enhanced Navigation Components -->
<script>
// Navigation Item Component
const NavItem = {
  props: ['active', 'icon'],
  template: `
    <button
      class="relative px-4 py-2 rounded-xl font-medium text-sm transition-all duration-300 group flex items-center gap-2"
      :class="{
        'bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg': active,
        'text-slate-600 hover:text-slate-900 hover:bg-slate-100': !active
      }"
    >
      <svg v-if="icon === 'home'" class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"></path>
      </svg>
      <svg v-else-if="icon === 'briefcase'" class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2-2v2m8 0V6a2 2 0 012 2v6a2 2 0 01-2 2H8a2 2 0 01-2-2V8a2 2 0 012-2V6"></path>
      </svg>
      <svg v-else-if="icon === 'mail'" class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path>
      </svg>
      <slot></slot>
      <div v-if="active" class="absolute -bottom-1 left-1/2 w-1 h-1 bg-white rounded-full transform -translate-x-1/2"></div>
    </button>
  `
}

const MobileNavItem = {
  props: ['active', 'icon'],
  template: `
    <button
      class="w-full text-left px-4 py-3 rounded-xl font-medium transition-all duration-300 flex items-center gap-3"
      :class="{
        'bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg': active,
        'text-slate-700 hover:text-slate-900 hover:bg-slate-100': !active
      }"
    >
      <svg v-if="icon === 'home'" class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"></path>
      </svg>
      <svg v-else-if="icon === 'briefcase'" class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2-2v2m8 0V6a2 2 0 012 2v6a2 2 0 01-2 2H8a2 2 0 01-2-2V8a2 2 0 012-2V6"></path>
      </svg>
      <svg v-else-if="icon === 'mail'" class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path>
      </svg>
      <slot></slot>
    </button>
  `
}

const SocialNavLink = {
  props: ['href', 'icon', 'tooltip'],
  template: `
    <a
      :href="href"
      target="_blank"
      rel="noopener noreferrer"
      class="group w-10 h-10 rounded-xl bg-slate-100 hover:bg-slate-200 flex items-center justify-center transition-all duration-300 hover:scale-110 shadow-md hover:shadow-lg relative"
      :title="tooltip"
    >
      <svg v-if="icon === 'github'" class="w-5 h-5 text-slate-600 group-hover:text-slate-800 transition-colors" fill="currentColor" viewBox="0 0 20 20">
        <path fill-rule="evenodd" d="M10 0C4.477 0 0 4.484 0 10.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0110 4.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.203 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.942.359.31.678.921.678 1.856 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0020 10.017C20 4.484 15.522 0 10 0z" clip-rule="evenodd"></path>
      </svg>
      <svg v-else-if="icon === 'linkedin'" class="w-5 h-5 text-slate-600 group-hover:text-blue-600 transition-colors" fill="currentColor" viewBox="0 0 20 20">
        <path d="M16.338 16.338H13.67V12.16c0-.995-.017-2.277-1.387-2.277-1.39 0-1.601 1.086-1.601 2.207v4.248H8.014v-8.59h2.559v1.174h.037c.356-.675 1.227-1.387 2.526-1.387 2.703 0 3.203 1.778 3.203 4.092v4.711zM5.005 6.575a1.548 1.548 0 11-.003-3.096 1.548 1.548 0 01.003 3.096zm-1.337 9.763H6.34v-8.59H3.667v8.59zM17.668 1H2.328C1.595 1 1 1.581 1 2.298v15.403C1 18.418 1.595 19 2.328 19h15.34c.734 0 1.332-.582 1.332-1.299V2.298C19 1.581 18.402 1 17.668 1z"></path>
      </svg>
    </a>
  `
}

const MobileSocialLink = {
  props: ['href', 'icon', 'label'],
  template: `
    <a
      :href="href"
      target="_blank"
      rel="noopener noreferrer"
      class="flex items-center gap-2 px-3 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 transition-all duration-300 text-slate-700 hover:text-slate-900 flex-1"
    >
      <svg v-if="icon === 'github'" class="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
        <path fill-rule="evenodd" d="M10 0C4.477 0 0 4.484 0 10.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0110 4.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.203 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.942.359.31.678.921.678 1.856 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0020 10.017C20 4.484 15.522 0 10 0z" clip-rule="evenodd"></path>
      </svg>
      <svg v-else-if="icon === 'linkedin'" class="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
        <path d="M16.338 16.338H13.67V12.16c0-.995-.017-2.277-1.387-2.277-1.39 0-1.601 1.086-1.601 2.207v4.248H8.014v-8.59h2.559v1.174h.037c.356-.675 1.227-1.387 2.526-1.387 2.703 0 3.203 1.778 3.203 4.092v4.711zM5.005 6.575a1.548 1.548 0 11-.003-3.096 1.548 1.548 0 01.003 3.096zm-1.337 9.763H6.34v-8.59H3.667v8.59zM17.668 1H2.328C1.595 1 1 1.581 1 2.298v15.403C1 18.418 1.595 19 2.328 19h15.34c.734 0 1.332-.582 1.332-1.299V2.298C19 1.581 18.402 1 17.668 1z"></path>
      </svg>
      <span class="text-sm font-medium">{{ label }}</span>
    </a>
  `
}

const SocialLink = {
  props: ['href', 'icon', 'label', 'description', 'color', 'isButton'],
  template: `
    <component
      :is="isButton ? 'button' : 'a'"
      :href="!isButton ? href : undefined"
      :target="!isButton ? '_blank' : undefined"
      :rel="!isButton ? 'noopener noreferrer' : undefined"
      class="group flex flex-col items-center gap-3 p-6 rounded-3xl hover:bg-white/10 transition-all duration-300 transform hover:scale-110 border border-white/10 hover:border-white/20"
      :class="color"
    >
      <div class="w-16 h-16 bg-white/10 backdrop-blur-sm rounded-3xl flex items-center justify-center group-hover:bg-white/20 transition-all duration-300 shadow-lg group-hover:shadow-2xl">
        <svg v-if="icon === 'github'" class="w-8 h-8" fill="currentColor" viewBox="0 0 20 20">
          <path fill-rule="evenodd" d="M10 0C4.477 0 0 4.484 0 10.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0110 4.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.203 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.942.359.31.678.921.678 1.856 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0020 10.017C20 4.484 15.522 0 10 0z" clip-rule="evenodd"></path>
        </svg>
        <svg v-else-if="icon === 'linkedin'" class="w-8 h-8" fill="currentColor" viewBox="0 0 20 20">
          <path d="M16.338 16.338H13.67V12.16c0-.995-.017-2.277-1.387-2.277-1.39 0-1.601 1.086-1.601 2.207v4.248H8.014v-8.59h2.559v1.174h.037c.356-.675 1.227-1.387 2.526-1.387 2.703 0 3.203 1.778 3.203 4.092v4.711zM5.005 6.575a1.548 1.548 0 11-.003-3.096 1.548 1.548 0 01.003 3.096zm-1.337 9.763H6.34v-8.59H3.667v8.59zM17.668 1H2.328C1.595 1 1 1.581 1 2.298v15.403C1 18.418 1.595 19 2.328 19h15.34c.734 0 1.332-.582 1.332-1.299V2.298C19 1.581 18.402 1 17.668 1z"></path>
        </svg>
        <svg v-else-if="icon === 'mail'" class="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path>
        </svg>
      </div>
      <div class="text-center">
        <p class="font-bold text-lg mb-1">{{ label }}</p>
        <p class="text-sm text-slate-400">{{ description }}</p>
      </div>
    </component>
  `
}

// Register components globally for this component
export default {
  components: {
    'nav-item': NavItem,
    'mobile-nav-item': MobileNavItem,
    'social-nav-link': SocialNavLink,
    'mobile-social-link': MobileSocialLink,
    'social-link': SocialLink
  }
}
</script>

<style scoped>
/* Smooth scrolling behavior */
html {
  scroll-behavior: smooth;
}

/* Enhanced backdrop blur support */
@supports (backdrop-filter: blur(10px)) {
  .backdrop-blur-xl {
    backdrop-filter: blur(24px);
  }
  .backdrop-blur-sm {
    backdrop-filter: blur(4px);
  }
}

/* Custom hamburger menu animation */
.hamburger-line {
  transition: all 0.3s ease;
  transform-origin: center;
}

/* Enhanced gradient animations */
@keyframes gradient-x {
  0%, 100% {
    transform: translateX(-50%);
  }
  50% {
    transform: translateX(50%);
  }
}

.animate-gradient-x {
  animation: gradient-x 3s ease infinite;
}

/* Custom scrollbar */
::-webkit-scrollbar {
  width: 8px;
}

::-webkit-scrollbar-track {
  background: #f1f5f9;
}

::-webkit-scrollbar-thumb {
  background: linear-gradient(to bottom, #3b82f6, #8b5cf6);
  border-radius: 4px;
}

::-webkit-scrollbar-thumb:hover {
  background: linear-gradient(to bottom, #2563eb, #7c3aed);
}

/* Tooltip animations */
.group:hover .tooltip {
  opacity: 1;
  visibility: visible;
  transform: translateY(-5px);
}

.tooltip {
  opacity: 0;
  visibility: hidden;
  transform: translateY(0);
  transition: all 0.3s ease;
}
</style>