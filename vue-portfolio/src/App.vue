<template>
  <div>
    <!-- NAVBAR -->
    <header class="sticky top-0 z-50 bg-white shadow">
      <nav class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
        <div class="text-xl font-bold text-pink-600 cursor-pointer" @click="scrollToTop">Correa Portfolio</div>

        <!-- Desktop Menu -->
        <div class="hidden md:flex space-x-6 items-center">
          <a href="#" class="text-gray-700 hover:text-pink-600 transition" @click.prevent="scrollToTop">Home</a>
          <a href="#projects" class="text-gray-700 hover:text-pink-600 transition">Projects</a>
          <a href="#contact" class="text-gray-700 hover:text-pink-600 transition">Contact</a>
          <!-- ✅ Show Logout if admin -->
          <button v-if="isAdmin" @click="logout" class="ml-4 text-red-600 hover:underline">Logout</button>
        </div>

        <!-- Mobile Menu Button -->
        <button class="md:hidden" @click="toggleMenu">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-gray-700" fill="none"
            viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
              d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>
      </nav>

      <!-- Mobile Menu -->
      <div v-if="isOpen" class="md:hidden bg-white border-t">
        <div class="px-4 py-2 space-y-2">
          <a href="#" class="block text-gray-700 hover:text-pink-600" @click.prevent="handleNavClick('top')">Home</a>
          <a href="#projects" class="block text-gray-700 hover:text-pink-600" @click="closeMenu">Projects</a>
          <a href="#contact" class="block text-gray-700 hover:text-pink-600" @click="closeMenu">Contact</a>
          <!-- ✅ Show Logout in mobile too -->
          <button v-if="isAdmin" @click="logout" class="block text-red-600 hover:underline">Logout</button>
        </div>
      </div>
    </header>

    <!-- PAGE CONTENT -->
    <router-view />

    <!-- CONTACT MODAL -->
    <ContactForm v-if="isModalOpen" :visible="isModalOpen" @close="closeModal" />

    <!-- CONTACT SECTION -->
    <footer id="contact" class="bg-gray-100 py-10 px-4 mt-12">
      <div class="flex justify-center gap-6 text-2xl mt-6">
        <a href="https://github.com/JamesdenCorrea" target="_blank" class="text-gray-700 hover:text-black">
          <i class="fab fa-github"></i>
        </a>
        <a href="https://www.linkedin.com/in/jamesden-correa-557742348/" target="_blank" class="text-blue-600 hover:text-blue-800">
          <i class="fab fa-linkedin"></i>
        </a>
        <!-- Open Contact Modal -->
        <button @click="openModal" class="text-red-600 hover:text-red-800">
          <i class="fas fa-envelope"></i>
        </button>
      </div>
    </footer>

    <!-- 🔐 Admin Login Modal -->
    <AdminPinModal ref="adminPinModal" @success="onAdminLoginSuccess" />
  </div>
</template>

<script setup>
import { ref, provide, onMounted } from 'vue'
import ContactForm from './components/ContactForm.vue'
import AdminPinModal from './components/AdminPinModal.vue'

const isOpen = ref(false)
const isModalOpen = ref(false)
const isAdmin = ref(false)
const adminPinModal = ref(null)

const openModal = () => {
  isModalOpen.value = true
}

const closeModal = () => {
  isModalOpen.value = false
}

const toggleMenu = () => {
  isOpen.value = !isOpen.value
}

const closeMenu = () => {
  isOpen.value = false
}

const scrollToTop = () => {
  window.scrollTo({ top: 0, behavior: 'smooth' })
}

const handleNavClick = (target) => {
  closeMenu()
  if (target === 'top') scrollToTop()
}

// 🔐 Detect admin token on mount
onMounted(() => {
  const token = localStorage.getItem('admin_token')
  if (token) {
    isAdmin.value = true
  }
})

// 🔐 Called after correct PIN entry
const onAdminLoginSuccess = () => {
  isAdmin.value = true
}

// 🔓 Logout
const logout = () => {
  localStorage.removeItem('admin_token')
  isAdmin.value = false
}
provide('isAdmin', isAdmin)
</script>
