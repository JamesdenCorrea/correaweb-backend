<template>
  <div class="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 relative overflow-hidden">
    <!-- Animated background elements -->
    <div class="absolute inset-0 overflow-hidden pointer-events-none">
      <div class="absolute -top-4 -right-4 w-72 h-72 bg-gradient-to-br from-blue-400/20 to-purple-500/20 rounded-full blur-3xl animate-pulse"></div>
      <div class="absolute top-1/2 -left-8 w-96 h-96 bg-gradient-to-tr from-cyan-300/20 to-blue-500/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
      <div class="absolute bottom-0 right-1/3 w-64 h-64 bg-gradient-to-tl from-purple-400/20 to-pink-500/20 rounded-full blur-3xl animate-pulse delay-500"></div>
    </div>

    <!-- Hero Section -->
    <div class="relative z-10 px-4 sm:px-6 lg:px-8 pt-12 pb-16 max-w-7xl mx-auto">
      <div class="flex flex-col lg:flex-row items-center gap-12 lg:gap-16 mb-20">
        <!-- Profile Image with enhanced styling -->
        <div class="flex-shrink-0 relative group">
          <div class="absolute -inset-4 bg-gradient-to-r from-blue-600 to-purple-600 rounded-3xl blur-lg opacity-30 group-hover:opacity-50 transition-opacity duration-500"></div>
          <div class="relative bg-white p-2 rounded-3xl shadow-2xl">
            <img
              src="/me.jpg"
              alt="Jamesden Correa - Full Stack Developer"
              class="w-48 h-48 sm:w-56 sm:h-56 md:w-64 md:h-64 lg:w-72 lg:h-72 xl:w-80 xl:h-80 
                     object-cover rounded-2xl
                     hover:shadow-2xl transition-all duration-500 transform hover:scale-105
                     ring-4 ring-white ring-opacity-60"
            />
          </div>
          <!-- Status indicator -->
          <div class="absolute bottom-4 right-4 bg-green-500 w-6 h-6 rounded-full border-4 border-white shadow-lg animate-pulse"></div>
        </div>

        <!-- Intro Text with enhanced typography -->
        <div class="text-center lg:text-left max-w-2xl space-y-6">
          <div class="space-y-4">
            <h1 class="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-black leading-tight">
              <span class="block bg-gradient-to-r from-slate-800 to-slate-600 bg-clip-text text-transparent">
                Hi, I'm
              </span>
              <span class="block bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 bg-clip-text text-transparent animate-gradient">
                Jamesden Correa
              </span>
            </h1>
            <div class="flex items-center justify-center lg:justify-start gap-3 text-2xl">
              <span class="animate-wave">👋</span>
              <span class="text-slate-600 font-medium">Full Stack Developer</span>
            </div>
          </div>
          
          <p class="text-slate-700 text-lg lg:text-xl leading-relaxed font-medium">
            I'm a passionate full-stack web developer with a strong foundation in modern web technologies 
            and a constant drive to learn and grow. As a recent graduate, I'm eager to explore new tools, frameworks, 
            and best practices. I thrive in environments where I can take on challenges, collaborate with others, and 
            continuously expand my skill set.
          </p>

          <!-- CTA Buttons -->
          <div class="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start pt-4">
            <button 
              @click="scrollToProjects"
              class="group bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-4 rounded-2xl font-semibold text-lg
                     hover:from-blue-700 hover:to-purple-700 transform hover:scale-105 transition-all duration-300
                     shadow-lg hover:shadow-xl flex items-center justify-center gap-2"
            >
              View My Work
              <svg class="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 8l4 4m0 0l-4 4m4-4H3"></path>
              </svg>
            </button>
            <button 
              @click="scrollToContact"
              class="group bg-white text-slate-800 px-8 py-4 rounded-2xl font-semibold text-lg border-2 border-slate-200
                     hover:border-blue-300 hover:bg-slate-50 transform hover:scale-105 transition-all duration-300
                     shadow-lg hover:shadow-xl flex items-center justify-center gap-2"
            >
              Get In Touch
              <svg class="w-5 h-5 group-hover:rotate-12 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path>
              </svg>
            </button>
          </div>
        </div>
      </div>

      <!-- Enhanced Skills Section -->
      <div class="bg-white/80 backdrop-blur-xl rounded-3xl shadow-2xl p-8 lg:p-12 border border-white/20">
        <div class="text-center mb-12">
          <h2 class="text-3xl sm:text-4xl lg:text-5xl font-black mb-4 bg-gradient-to-r from-slate-800 to-slate-600 bg-clip-text text-transparent">
            Technical Skills
          </h2>
          <p class="text-slate-600 text-lg max-w-2xl mx-auto">
            A comprehensive toolkit for building modern, scalable web applications
          </p>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
          <!-- Frontend -->
          <div class="group bg-gradient-to-br from-blue-50 to-indigo-100 rounded-3xl p-8 border-2 border-blue-100 
                      hover:border-blue-300 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2">
            <div class="flex items-center mb-6">
              <div class="w-12 h-12 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-xl flex items-center justify-center mr-4 shadow-lg">
                <svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path>
                </svg>
              </div>
              <h3 class="text-xl font-bold text-blue-800">Frontend Development</h3>
            </div>
            <div class="flex flex-wrap gap-3">
              <span class="skill-tag skill-tag-blue">HTML5</span>
              <span class="skill-tag skill-tag-blue">CSS3</span>
              <span class="skill-tag skill-tag-blue">JavaScript</span>
              <span class="skill-tag skill-tag-blue">TypeScript</span>
              <span class="skill-tag skill-tag-blue">Vue.js</span>
              <span class="skill-tag skill-tag-blue">React</span>
              <span class="skill-tag skill-tag-blue">Tailwind CSS</span>
            </div>
          </div>

          <!-- Backend -->
          <div class="group bg-gradient-to-br from-emerald-50 to-green-100 rounded-3xl p-8 border-2 border-emerald-100 
                      hover:border-emerald-300 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2">
            <div class="flex items-center mb-6">
              <div class="w-12 h-12 bg-gradient-to-r from-emerald-500 to-green-500 rounded-xl flex items-center justify-center mr-4 shadow-lg">
                <svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 12h14M5 12a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v4a2 2 0 01-2 2M5 12a2 2 0 00-2 2v4a2 2 0 002 2h14a2 2 0 002-2v-4a2 2 0 00-2-2m-2-4h.01M17 16h.01"></path>
                </svg>
              </div>
              <h3 class="text-xl font-bold text-emerald-800">Backend Development</h3>
            </div>
            <div class="flex flex-wrap gap-3">
              <span class="skill-tag skill-tag-green">PHP</span>
              <span class="skill-tag skill-tag-green">Laravel</span>
              <span class="skill-tag skill-tag-green">Node.js</span>
              <span class="skill-tag skill-tag-green">Express</span>
              <span class="skill-tag skill-tag-green">Python</span>
              <span class="skill-tag skill-tag-green">Flask</span>
              <span class="skill-tag skill-tag-green">MySQL</span>
              <span class="skill-tag skill-tag-green">MongoDB</span>
            </div>
          </div>

          <!-- Tools & Others -->
          <div class="group bg-gradient-to-br from-amber-50 to-orange-100 rounded-3xl p-8 border-2 border-amber-100 
                      hover:border-amber-300 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 md:col-span-2 xl:col-span-1">
            <div class="flex items-center mb-6">
              <div class="w-12 h-12 bg-gradient-to-r from-amber-500 to-orange-500 rounded-xl flex items-center justify-center mr-4 shadow-lg">
                <svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"></path>
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path>
                </svg>
              </div>
              <h3 class="text-xl font-bold text-amber-800">Tools & Methodologies</h3>
            </div>
            <div class="flex flex-wrap gap-3">
              <span class="skill-tag skill-tag-amber">Git</span>
              <span class="skill-tag skill-tag-amber">GitHub</span>
              <span class="skill-tag skill-tag-amber">Postman</span>
              <span class="skill-tag skill-tag-amber">MVC Pattern</span>
              <span class="skill-tag skill-tag-amber">OOP</span>
              <span class="skill-tag skill-tag-amber">Vite</span>
            </div>
          </div>
        </div>

        <div class="mt-12 pt-8 border-t border-slate-200">
          <p class="text-sm text-slate-500 text-center italic bg-slate-50 rounded-xl p-4">
            💡 <strong>Note:</strong> Most frameworks and tools listed are used at a basic level or for personal and academic projects.
            I'm always eager to learn and deepen my expertise in these technologies.
          </p>
        </div>
      </div>
    </div>

    <!-- Floating Admin Button -->
    <button
      v-if="isAdmin"
      @click="showModal = true"
      class="fixed bottom-8 right-8 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-2xl p-4 shadow-2xl hover:shadow-3xl 
             transform hover:scale-110 transition-all duration-300 z-50 group"
    >
      <svg class="w-6 h-6 group-hover:rotate-90 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4"></path>
      </svg>
    </button>

    <!-- Enhanced Modals -->
    <NewProjectModal
      :is-visible="showModal"
      @close="showModal = false"
      @created="handleProjectCreated"
    />

    <AdminPinModal ref="modalRef" @success="login" />

    <!-- Projects Section -->
    <main id="projects" class="relative z-10">
      <ProjectList />
    </main>

    <!-- Enhanced Contact Section -->
    <section id="contact" class="bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white py-16 px-4 mt-20 relative overflow-hidden">
      <!-- Background decoration -->
      <div class="absolute inset-0 bg-gradient-to-br from-blue-900/20 to-purple-900/20"></div>
      <div class="absolute top-0 left-1/4 w-72 h-72 bg-blue-500/10 rounded-full blur-3xl animate-pulse"></div>
      <div class="absolute bottom-0 right-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
      
      <div class="relative z-10 max-w-4xl mx-auto text-center">
        <h2 class="text-4xl sm:text-5xl font-bold mb-6 bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
          Let's Connect
        </h2>
        <p class="text-xl text-slate-300 mb-12 max-w-2xl mx-auto leading-relaxed">
          I'm always open to discussing new opportunities, interesting projects, or just having a great conversation about technology.
        </p>
        
        <!-- Enhanced Social Links -->
        <div class="flex justify-center items-center gap-8 mb-12">
          <a
            href="https://github.com/JamesdenCorrea"
            target="_blank"
            rel="noopener noreferrer"
            class="group flex flex-col items-center gap-3 p-6 rounded-3xl hover:bg-white/10 transition-all duration-300 transform hover:scale-110 border border-white/10 hover:border-white/20 hover:text-slate-300"
          >
            <div class="w-16 h-16 bg-white/10 backdrop-blur-sm rounded-3xl flex items-center justify-center group-hover:bg-white/20 transition-all duration-300 shadow-lg group-hover:shadow-2xl">
              <svg class="w-8 h-8" fill="currentColor" viewBox="0 0 20 20">
                <path fill-rule="evenodd" d="M10 0C4.477 0 0 4.484 0 10.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0110 4.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.203 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.942.359.31.678.921.678 1.856 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0020 10.017C20 4.484 15.522 0 10 0z" clip-rule="evenodd"></path>
              </svg>
            </div>
            <div class="text-center">
              <p class="font-bold text-lg mb-1">GitHub</p>
              <p class="text-sm text-slate-400">Explore my code repositories</p>
            </div>
          </a>
          
          <a
            href="https://www.linkedin.com/in/jamesden-correa-557742348/"
            target="_blank"
            rel="noopener noreferrer"
            class="group flex flex-col items-center gap-3 p-6 rounded-3xl hover:bg-white/10 transition-all duration-300 transform hover:scale-110 border border-white/10 hover:border-white/20 hover:text-blue-400"
          >
            <div class="w-16 h-16 bg-white/10 backdrop-blur-sm rounded-3xl flex items-center justify-center group-hover:bg-white/20 transition-all duration-300 shadow-lg group-hover:shadow-2xl">
              <svg class="w-8 h-8" fill="currentColor" viewBox="0 0 20 20">
                <path d="M16.338 16.338H13.67V12.16c0-.995-.017-2.277-1.387-2.277-1.39 0-1.601 1.086-1.601 2.207v4.248H8.014v-8.59h2.559v1.174h.037c.356-.675 1.227-1.387 2.526-1.387 2.703 0 3.203 1.778 3.203 4.092v4.711zM5.005 6.575a1.548 1.548 0 11-.003-3.096 1.548 1.548 0 01.003 3.096zm-1.337 9.763H6.34v-8.59H3.667v8.59zM17.668 1H2.328C1.595 1 1 1.581 1 2.298v15.403C1 18.418 1.595 19 2.328 19h15.34c.734 0 1.332-.582 1.332-1.299V2.298C19 1.581 18.402 1 17.668 1z"></path>
              </svg>
            </div>
            <div class="text-center">
              <p class="font-bold text-lg mb-1">LinkedIn</p>
              <p class="text-sm text-slate-400">Connect professionally</p>
            </div>
          </a>
          
          <button
            @click="openContactModal"
            class="group flex flex-col items-center gap-3 p-6 rounded-3xl hover:bg-white/10 transition-all duration-300 transform hover:scale-110 border border-white/10 hover:border-white/20 hover:text-red-400"
          >
            <div class="w-16 h-16 bg-white/10 backdrop-blur-sm rounded-3xl flex items-center justify-center group-hover:bg-white/20 transition-all duration-300 shadow-lg group-hover:shadow-2xl">
              <svg class="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path>
              </svg>
            </div>
            <div class="text-center">
              <p class="font-bold text-lg mb-1">Email</p>
              <p class="text-sm text-slate-400">Send me a message</p>
            </div>
          </button>
        </div>
        
        <div class="bg-white/10 backdrop-blur-sm rounded-2xl p-8 border border-white/20">
          <p class="text-slate-300 text-lg font-medium">
            Ready to bring your ideas to life? Let's build something amazing together!
          </p>
          <button
            @click="openContactModal"
            class="mt-6 bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-4 rounded-2xl font-semibold text-lg
                   hover:from-blue-700 hover:to-purple-700 transform hover:scale-105 transition-all duration-300
                   shadow-xl hover:shadow-2xl flex items-center gap-2 mx-auto"
          >
            Start a Conversation
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"></path>
            </svg>
          </button>
        </div>
      </div>
    </section>

    <!-- Contact Modal -->
    <ContactModal
      v-if="showContactModal"
      :visible="showContactModal"
      @close="closeContactModal"
    />
  </div>
</template>

<script setup>
import ProjectList from '../components/ProjectList.vue'
import AdminPinModal from '../components/AdminPinModal.vue'
import NewProjectModal from '../components/NewProjectModal.vue'
import ContactModal from '../components/ContactForm.vue'
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useAuth } from '../composables/useAuth'

// Auth state
const { isAdmin, login } = useAuth()

// UI state
const showModal = ref(false)
const showContactModal = ref(false)
const modalRef = ref()
const router = useRouter()

// Navigation functions
const scrollToProjects = () => {
  const projectsElement = document.getElementById('projects')
  if (projectsElement) {
    projectsElement.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }
}

const scrollToContact = () => {
  const contactElement = document.getElementById('contact')
  if (contactElement) {
    contactElement.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }
}

// Contact Modal functions
const openContactModal = () => {
  showContactModal.value = true
}

const closeContactModal = () => {
  showContactModal.value = false
}

// Secret CTRL + ALT + A login shortcut
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
/* Enhanced skill tags */
.skill-tag {
  @apply px-4 py-2 rounded-xl text-sm font-semibold transition-all duration-300 transform hover:scale-105 cursor-default shadow-sm;
}

.skill-tag-blue {
  @apply bg-blue-100 text-blue-900 hover:bg-blue-200 hover:shadow-md;
}

.skill-tag-green {
  @apply bg-emerald-100 text-emerald-900 hover:bg-emerald-200 hover:shadow-md;
}

.skill-tag-amber {
  @apply bg-amber-100 text-amber-900 hover:bg-amber-200 hover:shadow-md;
}

/* Custom animations */
@keyframes wave {
  0%, 100% { transform: rotate(0deg); }
  25% { transform: rotate(20deg); }
  75% { transform: rotate(-10deg); }
}

@keyframes gradient {
  0%, 100% { background-position: 0% 50%; }
  50% { background-position: 100% 50%; }
}

.animate-wave {
  animation: wave 2s ease-in-out infinite;
}

.animate-gradient {
  background-size: 200% 200%;
  animation: gradient 3s ease infinite;
}

/* Hover effects */
.group:hover .group-hover\:translate-x-1 {
  transform: translateX(0.25rem);
}

.group:hover .group-hover\:rotate-12 {
  transform: rotate(12deg);
}

.group:hover .group-hover\:rotate-90 {
  transform: rotate(90deg);
}

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
</style>