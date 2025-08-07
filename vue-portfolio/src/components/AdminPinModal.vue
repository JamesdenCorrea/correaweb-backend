<!-- src/components/AdminPinModal.vue -->
<template>
  <div v-if="show" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
    <div class="bg-white p-6 rounded-xl shadow-lg max-w-sm w-full">
      <h2 class="text-xl font-semibold mb-4">🔐 Enter Admin PIN</h2>
      <input
        v-model="pin"
        type="password"
        placeholder="Enter secret PIN"
        class="w-full border rounded p-2 mb-4"
      />
      <div class="flex justify-end gap-2">
        <button @click="close" class="px-4 py-2 text-gray-600">Cancel</button>
        <button @click="submit" class="px-4 py-2 bg-blue-600 text-white rounded">Enter</button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, defineEmits } from 'vue'

const emit = defineEmits(['success'])

const show = ref(false)
const pin = ref('')

function open() {
  show.value = true
  pin.value = ''
}

function close() {
  show.value = false
}

function submit() {
  if (pin.value === 'goodgames21') { // 👈 Replace this with your actual PIN
    localStorage.setItem('admin_token', pin.value)
    emit('success')
    close()
  } else {
    alert('Invalid PIN')
  }
}

defineExpose({ open })
</script>
