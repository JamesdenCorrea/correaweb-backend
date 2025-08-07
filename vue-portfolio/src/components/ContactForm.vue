<template>
  <div
    class="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50"
  >

    <div class="bg-white p-6 rounded-lg shadow-xl w-full max-w-xl relative">
      <button
        @click="emitClose"
        class="absolute top-2 right-2 text-gray-600 hover:text-red-500"
      >
        ✖
      </button>

      <h2 class="text-2xl font-bold mb-4 text-center">📬 Contact Me</h2>

      <form @submit.prevent="submitForm" class="space-y-4">
        <div>
          <label class="block mb-1 font-semibold text-gray-700">Your Name:</label>
          <input
            v-model="form.name"
            type="text"
            class="w-full border px-4 py-2 rounded focus:outline-none focus:ring-2 focus:ring-pink-500"
            required
          />
        </div>

        <div>
          <label class="block mb-1 font-semibold text-gray-700">Your Email:</label>
          <input
            v-model="form.email"
            type="email"
            class="w-full border px-4 py-2 rounded focus:outline-none focus:ring-2 focus:ring-pink-500"
            required
          />
        </div>

        <div>
          <label class="block mb-1 font-semibold text-gray-700">Message:</label>
          <textarea
            v-model="form.message"
            rows="4"
            class="w-full border px-4 py-2 rounded focus:outline-none focus:ring-2 focus:ring-pink-500"
            required
          ></textarea>
        </div>

<button
  type="submit"
  class="bg-pink-600 text-white px-6 py-2 rounded hover:bg-pink-700 transition"
  :disabled="isSending"
>
  {{ isSending ? 'Sending...' : 'Send Message' }}
</button>

      </form>

      <div
        v-if="submitted"
        class="mt-4 text-green-600 text-center font-semibold"
      >
        ✅ Thank you! I’ll get back to you soon.
      </div>
    </div>
  </div>
</template>

<script setup>
import { reactive, ref, defineProps, defineEmits } from 'vue'
import emailjs from 'emailjs-com'

// ✅ Your actual EmailJS credentials
const SERVICE_ID = 'service_tdhatbq'
const TEMPLATE_ID = 'template_rrla6lw'
const PUBLIC_KEY = '2_g4b-9H-YInsLjKp'

const props = defineProps({
  visible: Boolean,
})

const emit = defineEmits(['close'])

const emitClose = () => {
  emit('close')
}

const form = reactive({
  name: '',
  email: '',
  message: ''
})

const submitted = ref(false)
const isSending = ref(false)

const submitForm = async () => {
  if (!form.name || !form.email || !form.message) {
    alert('Please fill out all fields.')
    return
  }

  isSending.value = true

  try {
await emailjs.send(
  SERVICE_ID,
  TEMPLATE_ID,
  {
    name: form.name,
    email: form.email,
    message: form.message,
    time: new Date().toLocaleString(), // or Date.now()
  },
  PUBLIC_KEY
);



    submitted.value = true
    setTimeout(() => {
      form.name = ''
      form.email = ''
      form.message = ''
      submitted.value = false
      emitClose()
    }, 4000)
  } catch (error) {
    console.error('Email sending failed:', error)
    alert('❌ Failed to send message. Please try again.')
  } finally {
    isSending.value = false
  }
}
</script>
