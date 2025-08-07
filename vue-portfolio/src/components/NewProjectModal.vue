<template>
  <div v-if="isVisible" class="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
    <div class="bg-white rounded-lg p-6 w-96 shadow-xl">
      <h2 class="text-lg font-bold mb-4">Add New Project</h2>
      <input
        v-model="projectName"
        type="text"
        placeholder="Enter project name"
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

const props = defineProps({
  isVisible: Boolean,
})
const emit = defineEmits(['close', 'created'])

const projectName = ref('')
const loading = ref(false)

const createProject = async () => {
  if (!projectName.value.trim()) return
  loading.value = true

  try {
    const res = await axios.post('http://127.0.0.1:8000/api/projects', {
      name: projectName.value,
    }, {
      headers: {
        'X-ADMIN-TOKEN': localStorage.getItem('admin_token'),
      }
    })

    // Emit the new project ID back to HomePage.vue
    emit('created', res.data.id)

    // Reset form
    projectName.value = ''
    closeModal()
  } catch (err) {
    alert('❌ Failed to create project. Check admin token or API.')
  } finally {
    loading.value = false
  }
}

const closeModal = () => {
  emit('close')
  projectName.value = ''
}
</script>
