<template>
  <div class="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 relative">
    <!-- Hero Section -->
    <div class="px-4 sm:px-6 lg:px-8 pt-8 pb-12 max-w-7xl mx-auto">
      <div class="flex flex-col lg:flex-row items-center gap-8 lg:gap-12 mb-16">
        <!-- Profile Image -->
        <div class="flex-shrink-0">
          <img
            src="/me.jpg"
            alt="Jamesden Correa"
            class="w-48 h-48 sm:w-56 sm:h-56 md:w-64 md:h-64 lg:w-72 lg:h-72 xl:w-80 xl:h-80 
                   object-cover rounded-2xl border-4 border-white shadow-xl 
                   hover:shadow-2xl transition-all duration-300 transform hover:scale-105"
          />
        </div>

        <!-- Intro Text -->
        <div class="text-center lg:text-left max-w-2xl">
          <h1 class="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-bold mb-4 lg:mb-6 
                     bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            Hi, I'm Jamesden Correa 👋
          </h1>
          <p class="text-gray-700 text-base sm:text-lg lg:text-xl leading-relaxed">
            I'm a passionate full-stack web developer with a strong foundation in modern web technologies 
            and a constant drive to learn and grow. As a recent graduate, I'm eager to explore new tools, frameworks, 
            and best practices. I thrive in environments where I can take on challenges, collaborate with others, and 
            continuously expand my skill set.
          </p>
        </div>
      </div>

      <!-- Skills -->
      <div class="bg-white rounded-3xl shadow-lg p-6 sm:p-8 lg:p-10">
        <h2 class="text-2xl sm:text-3xl lg:text-4xl font-bold mb-6 lg:mb-8 text-center text-gray-800">
          Technical Skills
        </h2>

        <div class="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 lg:gap-8">
          <!-- Frontend -->
          <div class="bg-gradient-to-br from-blue-50 to-blue-100 rounded-2xl p-6 border border-blue-200 hover:shadow-lg transition-all duration-300">
            <div class="flex items-center mb-4">
              <div class="w-3 h-3 bg-blue-500 rounded-full mr-3"></div>
              <h3 class="text-lg sm:text-xl font-semibold text-blue-800">Frontend</h3>
            </div>
            <div class="flex flex-wrap gap-2">
              <span class="skill-tag">HTML</span>
              <span class="skill-tag">CSS</span>
              <span class="skill-tag">JavaScript</span>
              <span class="skill-tag">TypeScript</span>
              <span class="skill-tag">Vue.js</span>
              <span class="skill-tag">React</span>
              <span class="skill-tag">Tailwind CSS</span>
            </div>
          </div>

          <!-- Backend -->
          <div class="bg-gradient-to-br from-green-50 to-green-100 rounded-2xl p-6 border border-green-200 hover:shadow-lg transition-all duration-300">
            <div class="flex items-center mb-4">
              <div class="w-3 h-3 bg-green-500 rounded-full mr-3"></div>
              <h3 class="text-lg sm:text-xl font-semibold text-green-800">Backend</h3>
            </div>
            <div class="flex flex-wrap gap-2">
              <span class="skill-tag green">PHP</span>
              <span class="skill-tag green">Laravel</span>
              <span class="skill-tag green">Node.js</span>
              <span class="skill-tag green">Express</span>
              <span class="skill-tag green">Python</span>
              <span class="skill-tag green">Flask</span>
              <span class="skill-tag green">MySQL</span>
              <span class="skill-tag green">MongoDB</span>
            </div>
          </div>

          <!-- Tools -->
          <div class="bg-gradient-to-br from-amber-50 to-amber-100 rounded-2xl p-6 border border-amber-200 hover:shadow-lg transition-all duration-300 md:col-span-2 xl:col-span-1">
            <div class="flex items-center mb-4">
              <div class="w-3 h-3 bg-amber-500 rounded-full mr-3"></div>
              <h3 class="text-lg sm:text-xl font-semibold text-amber-800">Tools & Others</h3>
            </div>
            <div class="flex flex-wrap gap-2">
              <span class="skill-tag amber">Git</span>
              <span class="skill-tag amber">GitHub</span>
              <span class="skill-tag amber">Postman</span>
              <span class="skill-tag amber">MVC Pattern</span>
              <span class="skill-tag amber">OOP</span>
              <span class="skill-tag amber">Vite</span>
            </div>
          </div>
        </div>

        <div class="mt-8 pt-6 border-t border-gray-200">
          <p class="text-sm text-gray-500 text-center italic">
            *Most frameworks and tools listed are used at a basic level or for personal and academic projects.*
          </p>
        </div>
      </div>
      
    </div>

    <!-- Floating Add Project Button -->

  </div>
      <!-- Floating Add Project Button -->
    <button
      v-if="isAdmin"
      @click="showModal = true"
      class="fixed bottom-6 right-6 bg-blue-600 text-white rounded-full p-4 shadow-lg hover:bg-blue-700 z-50"
    >
      <i class="fas fa-plus text-xl"></i>
    </button>

    <!-- New Project Modal -->
<NewProjectModal
  :is-visible="showModal"
  @close="showModal = false"
  @created="handleProjectCreated"
/>


    <!-- Projects -->
    <main id="projects">
      <ProjectList />
    </main>

    <!-- Admin Login Modal Trigger -->
    <AdminPinModal ref="modalRef" @success="isAdmin = true" />
</template>

<script setup>
import ProjectList from '../components/ProjectList.vue'
import AdminPinModal from '../components/AdminPinModal.vue'
import NewProjectModal from '../components/NewProjectModal.vue'
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'


const isAdmin = ref(false)

onMounted(() => {
  // Check on mount if already logged in
  isAdmin.value = !!localStorage.getItem('admin_token')

  // Keyboard shortcut to open admin modal
  window.addEventListener('keydown', (e) => {
    if (e.ctrlKey && e.altKey && e.key === 'a') {
      modalRef.value.open()
    }
  })
})

const showModal = ref(false)
const modalRef = ref()
const router = useRouter()

// 🔐 Secret CTRL + ALT + A login shortcut
onMounted(() => {
  window.addEventListener('keydown', (e) => {
    if (e.ctrlKey && e.altKey && e.key === 'a') {
      modalRef.value.open()
    }
  })
})

// After creating project → go to detail page
const handleProjectCreated = (projectId) => {
  showModal.value = false
  router.push(`/projects/${projectId}`)
}
</script>

<style scoped>
.skill-tag {
  @apply bg-blue-200 text-blue-900 px-3 py-1.5 rounded-full text-sm font-medium hover:bg-blue-300 transition-colors duration-200;
}
.skill-tag.green {
  @apply bg-green-200 text-green-900 hover:bg-green-300;
}
.skill-tag.amber {
  @apply bg-amber-200 text-amber-900 hover:bg-amber-300;
}
</style>
