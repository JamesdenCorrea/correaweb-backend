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
            <button v-if="!project.tech_stack" @click="startEdit('tech_stack')" class="text-blue-500">➕</button>
            <button v-else @click="startEdit('tech_stack')" class="text-yellow-500">✏️</button>
            <button v-if="project.tech_stack" @click="updateField('tech_stack', '')" class="text-red-500">🗑</button>
          </template>
        </div>
        <div v-if="editingField === 'tech_stack'" class="flex items-center gap-2 mt-2">
          <input
            v-model="editValue"
            @keyup.enter="saveEdit('tech_stack')"
            class="w-full border p-2 rounded"
            placeholder="Enter tech stack"
          />
          <button @click="saveEdit('tech_stack')" class="text-green-500">✅</button>
        </div>
      </div>

      <!-- Carousel -->
      <div v-if="project.screenshots?.length" class="relative mb-6">
        <div class="rounded-xl overflow-hidden shadow">
          <img
            :src="currentSlide.image"
            :alt="project.name"
            class="w-full max-h-[400px] object-cover transition duration-300"
          />
        </div>
        <div class="mt-2 text-center">
          <span class="italic text-gray-600">{{ currentSlide.caption || 'No caption yet' }}</span>
          <template v-if="isAdmin">
            <button @click="startSlideCaptionEdit" class="ml-2 text-yellow-500">✏️</button>
            <button @click="deleteSlide(currentSlideIndex)" class="ml-2 text-red-500">🗑</button>
          </template>
        </div>

        <div v-if="editingSlideCaption" class="mt-2 flex justify-center gap-2">
          <input
            v-model="editValue"
            @keyup.enter="saveSlideCaption"
            class="border p-2 rounded w-2/3"
            placeholder="Enter caption"
          />
          <button @click="saveSlideCaption" class="text-green-500">✅</button>
        </div>

        <!-- Slide Controls -->
        <div class="flex justify-between items-center mt-4">
          <button @click="prevSlide" class="px-3 py-1 bg-gray-200 rounded hover:bg-gray-300">← Prev</button>
          <div class="flex gap-2">
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
          </div>
          <button @click="nextSlide" class="px-3 py-1 bg-gray-200 rounded hover:bg-gray-300">Next →</button>
        </div>

        <!-- Reorder Slides -->
        <div v-if="isAdmin" class="mt-4">
          <label class="font-semibold">Reorder Slides:</label>
          <ul class="mt-2">
            <li
              v-for="(slide, index) in project.screenshots"
              :key="index"
              draggable="true"
              @dragstart="onDragStart(index)"
              @dragover.prevent
              @drop="onDrop(index)"
              class="p-2 border rounded mb-2 flex justify-between items-center bg-gray-50 cursor-move"
            >
              <span>{{ index + 1 }}. {{ slide.caption || 'No caption' }}</span>
            </li>
          </ul>
        </div>
      </div>

      <!-- Add Slide -->
      <div v-if="isAdmin" class="mt-4">
        <label class="font-semibold">Add Slide:</label>
        <div class="flex flex-col gap-2">
          <input
            ref="fileInput"
            type="file"
            @change="handleImageUpload"
            accept="image/*"
            class="border p-2 rounded"
          />
          <input type="text" v-model="newSlide.caption" placeholder="Caption" class="border p-2 rounded" />
          <button @click="addSlide" class="px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600">➕ Add Slide</button>
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
            class="w-full border p-2 rounded"
            placeholder="Enter project description"
          ></textarea>
          <button @click="saveEdit('description')" class="text-green-500">✅</button>
        </div>
      </div>

      <!-- Links -->
      <div class="mb-4">
        <label class="font-semibold">GitHub Link:</label>
        <div class="flex items-center gap-2">
          <a v-if="project.github_link" :href="project.github_link" target="_blank" class="text-blue-600 underline hover:text-blue-800">🔗 GitHub</a>
          <template v-if="isAdmin">
            <button v-if="!project.github_link" @click="startEdit('github_link')" class="text-blue-500">➕</button>
            <button v-else @click="startEdit('github_link')" class="text-yellow-500">✏️</button>
            <button v-if="project.github_link" @click="updateField('github_link', '')" class="text-red-500">🗑</button>
          </template>
        </div>
        <div v-if="editingField === 'github_link'" class="flex items-center gap-2 mt-2">
          <input v-model="editValue" @keyup.enter="saveEdit('github_link')" class="w-full border p-2 rounded" placeholder="Enter URL" />
          <button @click="saveEdit('github_link')" class="text-green-500">✅</button>
        </div>
      </div>

      <div class="mb-4">
        <label class="font-semibold">Demo Link:</label>
        <div class="flex items-center gap-2">
          <a v-if="project.demo_link" :href="project.demo_link" target="_blank" class="text-green-600 underline hover:text-green-800">🚀 Live Demo</a>
          <template v-if="isAdmin">
            <button v-if="!project.demo_link" @click="startEdit('demo_link')" class="text-blue-500">➕</button>
            <button v-else @click="startEdit('demo_link')" class="text-yellow-500">✏️</button>
            <button v-if="project.demo_link" @click="updateField('demo_link', '')" class="text-red-500">🗑</button>
          </template>
        </div>
        <div v-if="editingField === 'demo_link'" class="flex items-center gap-2 mt-2">
          <input v-model="editValue" @keyup.enter="saveEdit('demo_link')" class="w-full border p-2 rounded" placeholder="Enter URL" />
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
      newSlide: { image: '', caption: '' },
      dragStartIndex: null
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
    // URL validation with TLD
    validateURL(url) {
      const regex = /^(https?:\/\/)?([\w-]+\.)+[\w-]{2,}(\/\S*)?$/
      return regex.test(url)
    },
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
      if (['github_link', 'demo_link'].includes(field) && this.editValue && !this.validateURL(this.editValue)) {
        alert('Please enter a valid URL with a domain (e.g., https://example.com)')
        return
      }
      this.updateField(field, this.editValue)
      this.editingField = null
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
    deleteSlide(index) {
      if (!confirm('Are you sure you want to delete this slide?')) return
      const updatedSlides = this.project.screenshots.filter((_, i) => i !== index)
      axios.put(`${import.meta.env.VITE_API_URL}/projects/${this.project.id}`, { screenshots: updatedSlides })
        .then(() => {
          this.project.screenshots = updatedSlides
          this.currentSlideIndex = Math.min(this.currentSlideIndex, updatedSlides.length - 1)
        })
        .catch(err => console.error('Failed to delete slide:', err))
    },
    handleImageUpload(e) {
      const file = e.target.files[0]
      if (!file) return
      const reader = new FileReader()
      reader.onload = () => {
        this.newSlide.image = reader.result
      }
      reader.readAsDataURL(file)
    },
    addSlide() {
      if (!this.newSlide.image) {
        alert('Please select an image to upload')
        return
      }
      const updatedSlides = [...(this.project.screenshots || []), { ...this.newSlide }]
      axios.put(`${import.meta.env.VITE_API_URL}/projects/${this.project.id}`, { screenshots: updatedSlides })
        .then(() => {
          this.project.screenshots = updatedSlides
          this.newSlide = { image: '', caption: '' }
          // Show the newly added slide immediately
          this.currentSlideIndex = updatedSlides.length - 1
          // Clear file input value to allow re-upload same file if needed
          this.$refs.fileInput.value = ''
        })
        .catch(err => console.error('Failed to add slide:', err))
    },
    // Drag-and-drop reorder
    onDragStart(index) {
      this.dragStartIndex = index
    },
    onDrop(dropIndex) {
      const slides = [...this.project.screenshots]
      const [movedSlide] = slides.splice(this.dragStartIndex, 1)
      slides.splice(dropIndex, 0, movedSlide)
      this.dragStartIndex = null
      axios.put(`${import.meta.env.VITE_API_URL}/projects/${this.project.id}`, { screenshots: slides })
        .then(() => {
          this.project.screenshots = slides
          // Adjust currentSlideIndex if needed
          if (this.currentSlideIndex === this.dragStartIndex) {
            this.currentSlideIndex = dropIndex
          }
        })
        .catch(err => console.error('Failed to reorder slides:', err))
    }
  },
  mounted() {
    const projectId = this.$route.params.id
    axios.get(`${import.meta.env.VITE_API_URL}/projects/${projectId}`)
      .then(res => {
        this.project = res.data
        this.currentSlideIndex = 0
      })
      .catch(err => console.error('Error fetching project:', err))
  }
}
</script>
