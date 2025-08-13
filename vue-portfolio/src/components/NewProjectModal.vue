<template>
  <Teleport to="body">
    <div
      v-if="isVisible"
      class="fixed inset-0 z-[9999] flex items-center justify-center p-4"
    >
      <!-- Backdrop -->
      <div 
        class="absolute inset-0 bg-black/80 backdrop-blur-md"
        @click="closeModal"
      ></div>
      
      <!-- Modal Container with proper z-index -->
      <div class="relative z-10 w-full max-w-2xl max-h-[90vh] overflow-hidden">
        <!-- Modal Content -->
        <div class="bg-white rounded-2xl shadow-2xl border border-white/10 overflow-hidden">
          <!-- Header -->
          <div class="bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 text-white p-6">
            <div class="flex items-center justify-between">
              <div class="flex items-center gap-3">
                <div class="w-10 h-10 bg-white/20 rounded-lg flex items-center justify-center backdrop-blur-sm">
                  <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"/>
                  </svg>
                </div>
                <div>
                  <h2 class="text-xl font-bold">Create New Project</h2>
                  <p class="text-blue-100 text-sm">Build something amazing</p>
                </div>
              </div>
              <button
                @click="closeModal"
                class="w-10 h-10 bg-white/10 hover:bg-white/20 rounded-xl transition-all duration-200 flex items-center justify-center hover:scale-110 hover:rotate-90"
              >
                <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/>
                </svg>
              </button>
            </div>
          </div>

          <!-- Scrollable Content Area -->
          <div class="max-h-[calc(90vh-140px)] overflow-y-auto">
            <div class="p-6 space-y-6">
              <!-- Project Name -->
              <div class="space-y-3">
                <label class="block text-sm font-semibold text-slate-800 flex items-center gap-2">
                  <svg class="w-4 h-4 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z"/>
                  </svg>
                  Project Name
                  <span class="text-red-500">*</span>
                </label>
                <div class="relative">
                  <input
                    v-model="projectName"
                    type="text"
                    placeholder="Enter your project name"
                    class="w-full px-4 py-3 border-2 border-slate-200 focus:border-blue-500 focus:ring-4 focus:ring-blue-100 rounded-xl transition-all duration-200 text-sm bg-white/70 backdrop-blur-sm"
                    :class="{
                      'border-red-300 focus:border-red-500 focus:ring-red-100 bg-red-50/50': projectName.trim() === '' && hasValidationError
                    }"
                  />
                  <div class="absolute right-3 top-1/2 -translate-y-1/2">
                    <svg v-if="projectName.trim()" class="w-5 h-5 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"/>
                    </svg>
                  </div>
                </div>
                <p v-if="projectName.trim() === '' && hasValidationError" class="text-red-500 text-xs flex items-center gap-1">
                  <svg class="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                    <path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"/>
                  </svg>
                  Project name is required
                </p>
              </div>

              <!-- Description -->
              <div class="space-y-3">
                <label class="block text-sm font-semibold text-slate-800 flex items-center gap-2">
                  <svg class="w-4 h-4 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"/>
                  </svg>
                  Description
                  <span class="text-slate-400 font-normal text-xs">(optional)</span>
                </label>
                <div class="relative">
                  <textarea
                    v-model="description"
                    placeholder="Describe your project, its goals, features, and what makes it special..."
                    rows="4"
                    class="w-full px-4 py-3 border-2 border-slate-200 focus:border-green-500 focus:ring-4 focus:ring-green-100 rounded-xl transition-all duration-200 text-sm resize-none bg-white/70 backdrop-blur-sm"
                  ></textarea>
                  <div class="absolute bottom-2 right-2 text-xs text-slate-400">
                    {{ description.length }}/500
                  </div>
                </div>
              </div>

              <!-- Tech Stack Section -->
              <div class="space-y-4">
                <label class="block text-sm font-semibold text-slate-800 flex items-center gap-2">
                  <svg class="w-4 h-4 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4"/>
                  </svg>
                  Tech Stack
                  <span class="text-slate-400 font-normal text-xs">(optional)</span>
                </label>
                
                <!-- Tech Stack Input -->
                <div class="relative">
                  <input
                    v-model="currentTechInput"
                    @keydown.enter.prevent="addTechStack"
                    @keydown.comma.prevent="addTechStack"
                    @keydown.tab.prevent="addTechStack"
                    type="text"
                    placeholder="Type technology and press Enter, Tab, or comma to add..."
                    class="w-full px-4 py-3 pr-14 border-2 border-slate-200 focus:border-purple-500 focus:ring-4 focus:ring-purple-100 rounded-xl transition-all duration-200 text-sm bg-white/70 backdrop-blur-sm"
                  />
                  <button
                    @click="addTechStack"
                    :disabled="!currentTechInput.trim()"
                    class="absolute right-2 top-1/2 -translate-y-1/2 w-9 h-9 bg-purple-500 hover:bg-purple-600 disabled:bg-slate-300 text-white rounded-lg transition-all duration-200 hover:scale-110 disabled:hover:scale-100 flex items-center justify-center"
                  >
                    <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4"/>
                    </svg>
                  </button>
                </div>
                
                <!-- Popular Tech Stack Suggestions -->
                <div class="space-y-3">
                  <div class="flex items-center gap-2">
                    <svg class="w-4 h-4 text-slate-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z"/>
                    </svg>
                    <p class="text-xs text-slate-600 font-medium">Popular technologies:</p>
                  </div>
                  <div class="flex flex-wrap gap-2 max-h-32 overflow-y-auto">
                    <button
                      v-for="suggestion in techSuggestions"
                      :key="suggestion"
                      @click="addSuggestedTech(suggestion)"
                      class="px-3 py-1.5 bg-gradient-to-r from-slate-100 to-slate-200 hover:from-purple-100 hover:to-purple-200 text-slate-700 hover:text-purple-800 rounded-full text-xs font-medium transition-all duration-200 hover:scale-105 border border-slate-200 hover:border-purple-300 shadow-sm hover:shadow-md"
                      :disabled="techStackList.includes(suggestion)"
                      :class="{ 
                        'opacity-50 cursor-not-allowed hover:scale-100 hover:from-slate-100 hover:to-slate-200': techStackList.includes(suggestion),
                        'bg-gradient-to-r from-purple-100 to-purple-200 border-purple-300': techStackList.includes(suggestion)
                      }"
                    >
                      <span v-if="techStackList.includes(suggestion)" class="mr-1">✓</span>
                      {{ suggestion }}
                    </button>
                  </div>
                </div>

                <!-- Selected Tech Stack Pills -->
                <div v-if="techStackList.length > 0" class="space-y-3">
                  <div class="flex items-center gap-2">
                    <svg class="w-4 h-4 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"/>
                    </svg>
                    <p class="text-xs text-slate-600 font-medium">Selected technologies ({{ techStackList.length }}):</p>
                  </div>
                  <div class="flex flex-wrap gap-2 p-4 bg-gradient-to-r from-purple-50 to-blue-50 rounded-xl border-2 border-purple-100 max-h-32 overflow-y-auto">
                    <div
                      v-for="(tech, index) in techStackList"
                      :key="index"
                      class="inline-flex items-center gap-2 px-3 py-2 bg-gradient-to-r from-purple-500 to-blue-600 text-white rounded-lg text-xs font-medium shadow-sm hover:shadow-md transition-all duration-200 hover:scale-105 group"
                    >
                      <span>{{ tech }}</span>
                      <button
                        @click="removeTechStack(index)"
                        class="w-4 h-4 hover:bg-white/20 rounded-full flex items-center justify-center transition-all duration-200 group-hover:scale-110"
                      >
                        <svg class="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/>
                        </svg>
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              <!-- Project Tips -->
              <div class="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl p-4 border border-blue-200">
                <div class="flex items-start gap-3">
                  <div class="w-8 h-8 bg-blue-500 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5">
                    <svg class="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>
                    </svg>
                  </div>
                  <div class="space-y-2">
                    <h4 class="text-sm font-semibold text-blue-900">💡 Project Tips</h4>
                    <ul class="text-xs text-blue-800 space-y-1">
                      <li>• Choose a descriptive name that reflects your project's purpose</li>
                      <li>• Add a detailed description to help visitors understand your project</li>
                      <li>• Select relevant technologies to showcase your technical skills</li>
                      <li>• You can always edit these details after creating the project</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- Footer -->
          <div class="bg-slate-50 px-6 py-4 flex justify-between items-center border-t border-slate-200">
            <div class="flex items-center gap-2 text-xs text-slate-500">
              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"/>
              </svg>
              All fields can be edited later
            </div>
            <div class="flex gap-3">
              <button
                @click="closeModal"
                class="px-6 py-2.5 text-slate-600 hover:text-slate-800 hover:bg-slate-200 rounded-xl transition-all duration-200 font-medium border border-slate-300 hover:border-slate-400"
              >
                Cancel
              </button>
              <button
                @click="createProject"
                :disabled="loading || !projectName.trim()"
                class="px-6 py-2.5 bg-gradient-to-r from-purple-600 via-blue-600 to-indigo-600 hover:from-purple-700 hover:via-blue-700 hover:to-indigo-700 disabled:from-slate-400 disabled:to-slate-500 text-white rounded-xl transition-all duration-200 font-medium hover:scale-105 hover:shadow-lg disabled:hover:scale-100 disabled:hover:shadow-none disabled:cursor-not-allowed flex items-center gap-2 min-w-[140px] justify-center"
              >
                <svg
                  v-if="loading"
                  class="w-4 h-4 animate-spin"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
                  />
                </svg>
                <svg
                  v-else
                  class="w-4 h-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4"/>
                </svg>
                {{ loading ? 'Creating...' : 'Create Project' }}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </Teleport>
</template>

<script setup>
import { ref, watch } from 'vue'
import axios from 'axios'
import { useAuth } from '../composables/useAuth'

const props = defineProps({
  isVisible: Boolean,
})

const emit = defineEmits(['close', 'created'])

const { checkAuth } = useAuth()
checkAuth()

const projectName = ref('')
const description = ref('')
const techStackList = ref([])
const currentTechInput = ref('')
const loading = ref(false)
const hasValidationError = ref(false)

// Enhanced tech suggestions with more categories
const techSuggestions = [
  // Frontend
  'Vue.js', 'React', 'Angular', 'Svelte', 'Next.js', 'Nuxt.js', 'Vite',
  // Backend
  'Node.js', 'Express', 'FastAPI', 'Django', 'Flask', 'Spring Boot', 'Laravel',
  // Databases
  'MongoDB', 'PostgreSQL', 'MySQL', 'Redis', 'Firebase', 'Supabase',
  // Languages
  'TypeScript', 'JavaScript', 'Python', 'Java', 'PHP', 'Go', 'Rust', 'C#',
  // Styling
  'Tailwind CSS', 'Bootstrap', 'SCSS', 'CSS3', 'Material-UI', 'Chakra UI',
  // Tools & Others
  'Docker', 'Kubernetes', 'AWS', 'Vercel', 'Netlify', 'GraphQL', 'REST API',
  'Git', 'GitHub Actions', 'Jest', 'Cypress', 'Webpack', 'ESLint'
]

const addTechStack = () => {
  const tech = currentTechInput.value.trim().replace(/[,\t]$/, '') // Remove trailing comma or tab
  if (tech && !techStackList.value.includes(tech)) {
    techStackList.value.push(tech)
    currentTechInput.value = ''
  }
}

const addSuggestedTech = (tech) => {
  if (!techStackList.value.includes(tech)) {
    techStackList.value.push(tech)
  }
}

const removeTechStack = (index) => {
  techStackList.value.splice(index, 1)
}

const createProject = async () => {
  hasValidationError.value = false
  
  if (!projectName.value.trim()) {
    hasValidationError.value = true
    return
  }
  
  loading.value = true
  
  try {
    const token = localStorage.getItem('admin_token')
    const techStackString = techStackList.value.length > 0 ? techStackList.value.join(', ') : null
    
    const res = await axios.post(
      `${import.meta.env.VITE_API_URL}/projects`,
      {
        name: projectName.value.trim(),
        description: description.value.trim() || null,
        tech_stack: techStackString
      },
      {
        headers: {
          'X-ADMIN-TOKEN': token,
          'Content-Type': 'application/json'
        }
      }
    )
    
    const newId = res.data.id || res.data.project?.id
    emit('created', newId)
    window.dispatchEvent(new Event('projects:refresh'))
    closeModal()
  } catch (err) {
    alert('❌ Failed to create project. Check admin token or API response.')
    console.error('Create Project Error:', err.response?.data || err)
  } finally {
    loading.value = false
  }
}

const closeModal = () => {
  emit('close')
  projectName.value = ''
  description.value = ''
  techStackList.value = []
  currentTechInput.value = ''
  hasValidationError.value = false
}

// Watch for modal visibility to reset validation error
watch(() => props.isVisible, (newVal) => {
  if (newVal) {
    hasValidationError.value = false
  }
})
</script>