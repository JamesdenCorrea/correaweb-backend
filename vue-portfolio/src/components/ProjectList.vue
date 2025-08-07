
<template>
  <div class="p-6">
    <h1 class="text-3xl font-bold text-center mb-6">📂 My Projects</h1>

    <div v-if="loading" class="text-center">Loading projects...</div>
    <div v-else-if="projects.length === 0" class="text-center">No projects found.</div>

    <ul v-else class="space-y-4 max-w-xl mx-auto">
      <li v-for="project in projects" :key="project.id">
        <div class="bg-white border border-gray-300 rounded-xl shadow-md px-6 py-4 hover:bg-blue-50 transition duration-300 flex justify-between items-center">
          <router-link
            :to="`/projects/${project.id}`"
            class="text-xl font-medium text-blue-700 hover:underline"
          >
            {{ project.name }}
          </router-link>
          
          <!-- 🔧 Admin Actions -->
          <div v-if="isAdmin" class="flex gap-2">
            <button @click="$emit('edit-project', project)" class="text-sm text-yellow-600 hover:underline">✏️</button>
            <button @click="deleteProject(project.id)" class="text-sm text-red-600 hover:underline">🗑️</button>
          </div>
        </div>
      </li>
    </ul>

    <!-- ➕ Add New Project -->
    <div v-if="isAdmin" class="mt-6 text-center">
      <button @click="$emit('add-project')" class="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">
        ➕ Add New Project
      </button>
    </div>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  name: 'ProjectList',
  props: ['isAdmin'],
  data() {
    return {
      projects: [],
      loading: true,
    }
  },
  mounted() {
    axios.get('http://127.0.0.1:8000/api/projects')
      .then(response => {
        this.projects = response.data
      })
      .catch(error => {
        console.error('Error fetching projects:', error)
      })
      .finally(() => {
        this.loading = false
      })
  },
  methods: {
    deleteProject(id) {
      const token = localStorage.getItem('admin_token')
      if (!token) return alert('Unauthorized')
      if (!confirm('Are you sure you want to delete this project?')) return

      axios.delete(`http://127.0.0.1:8000/api/projects/${id}`, {
        headers: {
          'X-ADMIN-TOKEN': token
        }
      }).then(() => {
        this.projects = this.projects.filter(p => p.id !== id)
      }).catch(err => {
        alert('Error deleting project.')
        console.error(err)
      })
    }
  }
}
</script>
