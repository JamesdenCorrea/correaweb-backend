<template>
  <div class="p-6 max-w-4xl mx-auto bg-white rounded-2xl shadow-md">
    <button
      @click="$router.push('/')"
      class="text-sm text-blue-500 mb-6 hover:underline"
    >
      ← Back to Projects
    </button>

    <div v-if="project">
      <h1 class="text-3xl font-bold mb-2">{{ project.name }}</h1>
      <p class="text-sm text-gray-500 mb-4">{{ project.tech_stack }}</p>

      <!-- 🖼️ Carousel Starts -->
      <div v-if="project.screenshots && project.screenshots.length" class="relative mb-6">
        <div class="rounded-xl overflow-hidden shadow">
          <img
            :src="currentSlide.image"
            :alt="project.name"
            class="w-full max-h-[400px] object-cover transition duration-300"
          />
        </div>
        <p class="mt-2 text-center text-gray-600 italic">
          {{ currentSlide.caption }}
        </p>

        <!-- 🔘 Slide Controls -->
        <div class="flex justify-between items-center mt-4">
          <button
            @click="prevSlide"
            class="px-3 py-1 bg-gray-200 rounded hover:bg-gray-300"
          >
            ← Prev
          </button>
          <div class="flex gap-2">
            <span
              v-for="(slide, index) in project.screenshots"
              :key="index"
              class="w-3 h-3 rounded-full"
              :class="{
                'bg-blue-500': index === currentSlideIndex,
                'bg-gray-300': index !== currentSlideIndex
              }"
            ></span>
          </div>
          <button
            @click="nextSlide"
            class="px-3 py-1 bg-gray-200 rounded hover:bg-gray-300"
          >
            Next →
          </button>
        </div>
      </div>

      <!-- 📄 Description -->
      <p class="text-lg text-gray-700 leading-relaxed mb-6">
        {{ project.description }}
      </p>

      <!-- 🔗 Links -->
      <div class="flex gap-4">
        <a
          :href="project.github_link"
          target="_blank"
          class="text-blue-600 underline hover:text-blue-800"
        >
          🔗 GitHub
        </a>
        <a
          :href="project.demo_link"
          target="_blank"
          class="text-green-600 underline hover:text-green-800"
        >
          🚀 Live Demo
        </a>
      </div>
    </div>

    <div v-else class="text-center text-gray-500">Loading project...</div>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  data() {
    return {
      project: null,
      currentSlideIndex: 0,
    }
  },
  computed: {
    currentSlide() {
      if (!this.project || !this.project.screenshots || !this.project.screenshots.length) {
        return { image: '', caption: '' }
      }
      return this.project.screenshots[this.currentSlideIndex]
    },
  },
  methods: {
    nextSlide() {
      if (this.project && this.project.screenshots.length) {
        this.currentSlideIndex =
          (this.currentSlideIndex + 1) % this.project.screenshots.length
      }
    },
    prevSlide() {
      if (this.project && this.project.screenshots.length) {
        this.currentSlideIndex =
          (this.currentSlideIndex - 1 + this.project.screenshots.length) % this.project.screenshots.length
      }
    },
  },
  mounted() {
    const projectId = this.$route.params.id
    axios.get(`http://127.0.0.1:8000/api/projects/${projectId}`)
      .then(response => {
        this.project = response.data
        this.currentSlideIndex = 0
      })
      .catch(error => {
        console.error('Error fetching project:', error)
      })
  }
}
</script>
