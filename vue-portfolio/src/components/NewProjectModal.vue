<template>
  <div v-if="isVisible" class="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
    <div class="bg-white rounded-lg p-6 w-96 shadow-xl">
      <h2 class="text-lg font-bold mb-4">Add New Project</h2>

      <!-- Project Name -->
      <input
        v-model="projectName"
        type="text"
        placeholder="Enter project name"
        class="w-full px-4 py-2 border border-gray-300 rounded mb-4"
      />

      <!-- Description -->
      <textarea
        v-model="description"
        placeholder="Enter description (optional)"
        class="w-full px-4 py-2 border border-gray-300 rounded mb-4"
      ></textarea>

      <!-- Tech Stack -->
      <input
        v-model="techStack"
        type="text"
        placeholder="Enter tech stack (comma separated)"
        class="w-full px-4 py-2 border border-gray-300 rounded mb-4"
      />

      <div class="flex justify-end gap-2">
        <button @click="closeModal" class="text-gray-500">Cancel</button>
        <button
          @click="createProject"
          :disabled="loading || !projectName.trim()"
          class="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          {{ loading ? 'Creating...' : 'Create' }}
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
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
const techStack = ref('')
const loading = ref(false)

const createProject = async () => {
  if (!projectName.value.trim()) return
  loading.value = true

  try {
    const token = localStorage.getItem('admin_token')
    const res = await axios.post(
      `${import.meta.env.VITE_API_URL}/projects`,
      {
        name: projectName.value.trim(),
        description: description.value.trim() || null,
        tech_stack: techStack.value.trim() || null
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
  techStack.value = ''
}
</script>
