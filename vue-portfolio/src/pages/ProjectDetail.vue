<template>
  <div class="p-6 max-w-4xl mx-auto bg-white rounded-2xl shadow-md">
    <!-- Back Button -->
    <button
      @click="$router.push('/')"
      class="text-sm text-blue-500 mb-6 hover:underline"
    >
      ← Back to Projects
    </button>

    <div v-if="project">
      <!-- Project Name -->
      <h1 class="text-3xl font-bold mb-2">{{ project.name }}</h1>

      <!-- Tech Stack -->
      <div class="mb-4">
        <label class="font-semibold">Tech Stack:</label>
        <div class="flex items-center gap-2">
          <p class="text-sm text-gray-500">
            {{ project.tech_stack || 'No tech stack yet' }}
          </p>
          <template v-if="isAdmin">
            <button
              v-if="!project.tech_stack"
              @click="startEdit('tech_stack')"
              class="text-blue-500"
            >➕</button>
            <button
              v-else
              @click="startEdit('tech_stack')"
              class="text-yellow-500"
            >✏️</button>
            <button
              v-if="project.tech_stack"
              @click="updateField('tech_stack', '')"
              class="text-red-500"
            >🗑</button>
          </template>
        </div>
        <div v-if="editingField === 'tech_stack'" class="flex items-center gap-2 mt-2">
          <input
            v-model="editValue"
            @keyup.enter="saveEdit('tech_stack')"
            @blur="saveEdit('tech_stack')"
            class="w-full border p-2 rounded"
            placeholder="Enter tech stack"
            autofocus
          />
          <button @click="saveEdit('tech_stack')" class="text-green-500">✅</button>
        </div>
      </div>

      <!-- Carousel -->
      <div v-if="project.screenshots?.length" class="relative mb-6">
        <div class="rounded-xl overflow-hidden shadow relative">
          <img
            :src="currentSlide.image"
            :alt="project.name"
            class="w-full max-h-[400px] object-cover transition duration-300"
          />
          <template v-if="isAdmin">
            <!-- Replace Image -->
            <input
              type="file"
              accept="image/*"
              @change="replaceSlideImage($event)"
              class="absolute top-2 right-2 opacity-0 w-8 h-8 cursor-pointer"
              title="Replace Image"
            />
          </template>
        </div>

        <!-- Caption -->
        <div class="mt-2 text-center">
          <span class="italic text-gray-600">{{ currentSlide.caption || 'No caption yet' }}</span>
          <template v-if="isAdmin">
            <button @click="startSlideCaptionEdit" class="ml-2 text-yellow-500">✏️</button>
            <button @click="deleteSlide" class="ml-2 text-red-500">🗑</button>
          </template>
        </div>

        <!-- Edit caption input -->
        <div v-if="editingSlideCaption" class="mt-2 flex justify-center gap-2">
          <input
            v-model="editValue"
            @keyup.enter="saveSlideCaption"
            @blur="saveSlideCaption"
            class="border p-2 rounded w-2/3"
            placeholder="Enter caption"
            autofocus
          />
          <button @click="saveSlideCaption" class="text-green-500">✅</button>
        </div>

        <!-- Slide Controls -->
        <div class="flex justify-between items-center mt-4">
          <button
            @click="prevSlide"
            class="px-3 py-1 bg-gray-200 rounded hover:bg-gray-300"
          >
            ← Prev
          </button>
          <div class="flex gap-2 items-center">
            <button
              v-if="isAdmin"
              @click="moveSlideLeft(currentSlideIndex)"
              :disabled="currentSlideIndex === 0"
              title="Move slide left"
              class="text-blue-500 disabled:text-gray-400"
            >
              ⬅️
            </button>
            <span
              v-for="(slide, index) in project.screenshots"
              :key="index"
              class="w-3 h-3 rounded-full cursor-pointer"
              :class="{
                'bg-blue-500': index === currentSlideIndex,
                'bg-gray-300': index !== currentSlideIndex
              }"
              @click="currentSlideIndex = index"
            ></span>
            <button
              v-if="isAdmin"
              @click="moveSlideRight(currentSlideIndex)"
              :disabled="currentSlideIndex === project.screenshots.length -1"
              title="Move slide right"
              class="text-blue-500 disabled:text-gray-400"
            >
              ➡️
            </button>
          </div>
          <button
            @click="nextSlide"
            class="px-3 py-1 bg-gray-200 rounded hover:bg-gray-300"
          >
            Next →
          </button>
        </div>
      </div>

      <!-- Add Slide -->
      <div v-if="isAdmin" class="mt-4">
        <label class="font-semibold">Add Slide:</label>
        <div class="flex flex-col gap-2">
          <input
            type="file"
            @change="handleImageUpload"
            accept="image/*"
            class="border p-2 rounded"
          />
          <input
            type="text"
            v-model="newSlide.caption"
            placeholder="Caption"
            class="border p-2 rounded"
          />
          <button @click="addSlide" class="px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600" :disabled="!newSlide.image">
            ➕ Add Slide
          </button>
        </div>
      </div>

      <!-- Description -->
      <div class="mb-4 mt-6">
        <label class="font-semibold">Description:</label>
        <div class="flex items-center gap-2">
          <p class="text-gray-700 whitespace-pre-line">
            {{ project.description || 'No description yet.' }}
          </p>
          <template v-if="isAdmin">
            <button v-if="!project.description" @click="startEdit('description')" class="text-blue-500">➕</button>
            <button v-else @click="startEdit('description')" class="text-yellow-500">✏️</button>
            <button v-if="project.description" @click="updateField('description', '')" class="text-red-500">🗑</button>
          </template>
        </div>
        <div v-if="editingField === 'description'" class="flex items-center gap-2 mt-2">
          <textarea
            v-model="editValue"
            @keyup.enter="saveEdit('description')"
            @blur="saveEdit('description')"
            class="w-full border p-2 rounded"
            placeholder="Enter project description"
            autofocus
          ></textarea>
          <button @click="saveEdit('description')" class="text-green-500">✅</button>
        </div>
      </div>

      <!-- Links -->
      <div class="mb-4">
        <label class="font-semibold">GitHub Link:</label>
        <div class="flex items-center gap-2">
          <a
            v-if="project.github_link"
            :href="project.github_link"
            target="_blank"
            rel="noopener noreferrer"
            class="text-blue-600 underline hover:text-blue-800"
          >🔗 GitHub</a>
          <template v-if="isAdmin">
            <button v-if="!project.github_link" @click="startEdit('github_link')" class="text-blue-500">➕</button>
            <button v-else @click="startEdit('github_link')" class="text-yellow-500">✏️</button>
            <button v-if="project.github_link" @click="updateField('github_link', '')" class="text-red-500">🗑</button>
          </template>
        </div>
        <div v-if="editingField === 'github_link'" class="flex items-center gap-2 mt-2">
          <input
            v-model="editValue"
            @keyup.enter="saveEdit('github_link')"
            @blur="saveEdit('github_link')"
            class="w-full border p-2 rounded"
            placeholder="Enter valid URL starting with https://"
            autofocus
          />
          <button @click="saveEdit('github_link')" class="text-green-500">✅</button>
        </div>
      </div>

      <div class="mb-4">
        <label class="font-semibold">Demo Link:</label>
        <div class="flex items-center gap-2">
          <a
            v-if="project.demo_link"
            :href="project.demo_link"
            target="_blank"
            rel="noopener noreferrer"
            class="text-green-600 underline hover:text-green-800"
          >🚀 Live Demo</a>
          <template v-if="isAdmin">
            <button v-if="!project.demo_link" @click="startEdit('demo_link')" class="text-blue-500">➕</button>
            <button v-else @click="startEdit('demo_link')" class="text-yellow-500">✏️</button>
            <button v-if="project.demo_link" @click="updateField('demo_link', '')" class="text-red-500">🗑</button>
          </template>
        </div>
        <div v-if="editingField === 'demo_link'" class="flex items-center gap-2 mt-2">
          <input
            v-model="editValue"
            @keyup.enter="saveEdit('demo_link')"
            @blur="saveEdit('demo_link')"
            class="w-full border p-2 rounded"
            placeholder="Enter valid URL starting with https://"
            autofocus
          />
          <button @click="saveEdit('demo_link')" class="text-green-500">✅</button>
        </div>
      </div>
    </div>

    <div v-else class="text-center text-gray-500">Loading project...</div>
  </div>
</template>

<script>
import axios from 'axios'
import { useAuth } from '../composables/useAuth'

export default {
  data() {
    return {
      project: null,
      currentSlideIndex: 0,
      editingField: null,
      editValue: '',
      editingSlideCaption: false,
      newSlide: { image: '', caption: '' }
    }
  },
  computed: {
    currentSlide() {
      return this.project?.screenshots?.[this.currentSlideIndex] || { image: '', caption: '' }
    },
    isAdmin() {
      const { isAdmin } = useAuth()
      return isAdmin.value
    }
  },
  methods: {
    nextSlide() {
      if (this.project?.screenshots?.length) {
        this.currentSlideIndex = (this.currentSlideIndex + 1) % this.project.screenshots.length
      }
    },
    prevSlide() {
      if (this.project?.screenshots?.length) {
        this.currentSlideIndex = (this.currentSlideIndex - 1 + this.project.screenshots.length) % this.project.screenshots.length
      }
    },
    startEdit(field) {
      this.editingField = field
      this.editValue = this.project[field] || ''
    },
    saveEdit(field) {
      if (
        (field === 'github_link' || field === 'demo_link') &&
        this.editValue &&
        !this.isValidUrl(this.editValue)
      ) {
        alert('Please enter a valid URL starting with https://')
        return
      }
      this.updateField(field, this.editValue)
      this.editingField = null
      if (field === 'github_link' || field === 'demo_link') {
        // fix link display by forcing reload from backend if needed
        this.fetchProject()
      }
    },
    updateField(field, value) {
      axios.put(`${import.meta.env.VITE_API_URL}/projects/${this.project.id}`, { [field]: value })
        .then(() => {
          this.project[field] = value
        })
        .catch(err => console.error(`Failed to update ${field}:`, err))
    },
    startSlideCaptionEdit() {
      this.editingSlideCaption = true
      this.editValue = this.currentSlide.caption || ''
    },
    saveSlideCaption() {
      const slides = [...this.project.screenshots]
      slides[this.currentSlideIndex].caption = this.editValue
      axios.put(`${import.meta.env.VITE_API_URL}/projects/${this.project.id}`, { screenshots: slides })
        .then(() => {
          this.project.screenshots = slides
          this.editingSlideCaption = false
        })
        .catch(err => console.error('Failed to update caption:', err))
    },
    handleImageUpload(e) {
      const file = e.target.files[0]
      if (!file) return
      const formData = new FormData()
      formData.append('image', file)

      axios.post(`${import.meta.env.VITE_API_URL}/upload`, formData)
        .then(res => {
          this.newSlide.image = res.data.url
        })
        .catch(err => console.error('Image upload failed:', err))
    },
    addSlide() {
      if (!this.newSlide.image) return
      const updatedSlides = [...(this.project.screenshots || []), { ...this.newSlide }]
      axios.put(`${import.meta.env.VITE_API_URL}/projects/${this.project.id}`, { screenshots: updatedSlides })
        .then(() => {
          this.project.screenshots = updatedSlides
          this.newSlide = { image: '', caption: '' }
          this.currentSlideIndex = this.project.screenshots.length - 1 // jump to new slide
        })
        .catch(err => console.error('Failed to add slide:', err))
    },
    replaceSlideImage(e) {
      const file = e.target.files[0]
      if (!file) return
      const formData = new FormData()
      formData.append('image', file)

      axios.post(`${import.meta.env.VITE_API_URL}/upload`, formData)
        .then(res => {
          const slides = [...this.project.screenshots]
          slides[this.currentSlideIndex].image = res.data.url
          return axios.put(`${import.meta.env.VITE_API_URL}/projects/${this.project.id}`, { screenshots: slides })
            .then(() => {
              this.project.screenshots[this.currentSlideIndex].image = res.data.url
            })
        })
        .catch(err => console.error('Failed to replace image:', err))
    },
    deleteSlide() {
      const updatedSlides = this.project.screenshots.filter((_, idx) => idx !== this.currentSlideIndex)
      axios.put(`${import.meta.env.VITE_API_URL}/projects/${this.project.id}`, { screenshots: updatedSlides })
        .then(() => {
          this.project.screenshots = updatedSlides
          this.currentSlideIndex = 0
        })
        .catch(err => console.error('Failed to delete slide:', err))
    },
    moveSlideLeft(index) {
      if (index === 0) return
      const slides = [...this.project.screenshots]
      const temp = slides[index - 1]
      slides[index - 1] = slides[index]
      slides[index] = temp
      this.saveSlidesOrder(slides)
      this.currentSlideIndex = index - 1
    },
    moveSlideRight(index) {
      if (index === this.project.screenshots.length - 1) return
      const slides = [...this.project.screenshots]
      const temp = slides[index + 1]
      slides[index + 1] = slides[index]
      slides[index] = temp
      this.saveSlidesOrder(slides)
      this.currentSlideIndex = index + 1
    },
    saveSlidesOrder(slides) {
      axios.put(`${import.meta.env.VITE_API_URL}/projects/${this.project.id}`, { screenshots: slides })
        .then(() => {
          this.project.screenshots = slides
        })
        .catch(err => console.error('Failed to reorder slides:', err))
    },
    fetchProject() {
      axios.get(`${import.meta.env.VITE_API_URL}/projects/${this.$route.params.id}`)
        .then(res => {
          this.project = res.data
          if (this.currentSlideIndex >= this.project.screenshots.length) {
            this.currentSlideIndex = 0
          }
        })
        .catch(err => console.error('Error fetching project:', err))
    },
    isValidUrl(url) {
      // Basic check for https URL with common TLDs
      const pattern = /^https:\/\/.+\.(com|net|io|org|dev|app|tech|me|co|edu)(\/.*)?$/i
      return pattern.test(url)
    }
  },
  mounted() {
    this.fetchProject()
  }
}
</script>
