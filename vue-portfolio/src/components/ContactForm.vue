<template>
  <div class="fixed inset-0 bg-black/60 backdrop-blur-sm flex justify-center items-center z-50 p-4">
    <!-- Enhanced Modal Container -->
    <div 
      class="bg-white/95 backdrop-blur-xl rounded-3xl shadow-2xl w-full max-w-2xl relative border border-slate-200/50 overflow-hidden transform animate-modal-enter"
      @click.stop
    >
      <!-- Animated Background Elements -->
      <div class="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-blue-500/10 to-purple-500/10 rounded-full blur-2xl animate-pulse"></div>
      <div class="absolute bottom-0 left-0 w-48 h-48 bg-gradient-to-tr from-pink-500/10 to-rose-500/10 rounded-full blur-2xl animate-pulse delay-1000"></div>

      <!-- Enhanced Close Button -->
      <button
        @click="emitClose"
        class="absolute top-6 right-6 z-20 w-12 h-12 rounded-2xl bg-slate-100/80 hover:bg-red-100 backdrop-blur-sm flex items-center justify-center text-slate-600 hover:text-red-600 transition-all duration-300 hover:scale-110 shadow-lg group"
      >
        <svg class="w-5 h-5 group-hover:rotate-90 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
        </svg>
      </button>

      <!-- Modal Content -->
      <div class="relative z-10 p-8 md:p-12">
        <!-- Enhanced Header -->
        <div class="text-center mb-10">
          <div class="w-20 h-20 mx-auto mb-6 rounded-3xl bg-gradient-to-r from-blue-600 to-purple-600 flex items-center justify-center shadow-2xl animate-bounce-subtle">
            <svg class="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path>
            </svg>
          </div>
          <h2 class="text-3xl md:text-4xl font-bold mb-4 bg-gradient-to-r from-slate-800 to-slate-600 bg-clip-text text-transparent">
            Let's Connect!
          </h2>
          <p class="text-slate-600 text-lg max-w-md mx-auto leading-relaxed">
            I'd love to hear from you. Send me a message and I'll get back to you as soon as possible.
          </p>
        </div>

        <!-- Enhanced Form -->
        <form @submit.prevent="submitForm" class="space-y-6">
          <!-- Name Field -->
          <div class="group">
            <label class="block text-sm font-semibold text-slate-700 mb-3 flex items-center gap-2">
              <div class="w-5 h-5 rounded-lg bg-gradient-to-r from-blue-500 to-purple-500 flex items-center justify-center">
                <svg class="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path>
                </svg>
              </div>
              Your Name
            </label>
            <input
              v-model="form.name"
              type="text"
              class="w-full border-2 border-slate-200 focus:border-blue-500 px-6 py-4 rounded-2xl focus:outline-none focus:ring-4 focus:ring-blue-100 transition-all duration-300 bg-white/80 backdrop-blur-sm text-lg group-hover:border-slate-300"
              placeholder="Enter your full name"
              required
            />
          </div>

          <!-- Email Field -->
          <div class="group">
            <label class="block text-sm font-semibold text-slate-700 mb-3 flex items-center gap-2">
              <div class="w-5 h-5 rounded-lg bg-gradient-to-r from-green-500 to-emerald-500 flex items-center justify-center">
                <svg class="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207"></path>
                </svg>
              </div>
              Email Address
            </label>
            <input
              v-model="form.email"
              type="email"
              class="w-full border-2 border-slate-200 focus:border-blue-500 px-6 py-4 rounded-2xl focus:outline-none focus:ring-4 focus:ring-blue-100 transition-all duration-300 bg-white/80 backdrop-blur-sm text-lg group-hover:border-slate-300"
              placeholder="your.email@example.com"
              required
            />
          </div>

          <!-- Message Field -->
          <div class="group">
            <label class="block text-sm font-semibold text-slate-700 mb-3 flex items-center gap-2">
              <div class="w-5 h-5 rounded-lg bg-gradient-to-r from-purple-500 to-pink-500 flex items-center justify-center">
                <svg class="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"></path>
                </svg>
              </div>
              Your Message
            </label>
            <textarea
              v-model="form.message"
              rows="5"
              class="w-full border-2 border-slate-200 focus:border-blue-500 px-6 py-4 rounded-2xl focus:outline-none focus:ring-4 focus:ring-blue-100 transition-all duration-300 bg-white/80 backdrop-blur-sm text-lg resize-none group-hover:border-slate-300"
              placeholder="Tell me about your project, ideas, or just say hello!"
              required
            ></textarea>
          </div>

          <!-- Enhanced Submit Button -->
          <div class="pt-4">
            <button
              type="submit"
              class="group w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 disabled:from-slate-400 disabled:to-slate-500 text-white px-8 py-5 rounded-2xl font-bold text-lg transition-all duration-300 hover:scale-[1.02] hover:shadow-2xl disabled:cursor-not-allowed disabled:transform-none flex items-center justify-center gap-3 shadow-xl"
              :disabled="isSending"
              :class="{
                'animate-pulse': isSending,
                'hover:shadow-blue-500/25': !isSending
              }"
            >
              <div v-if="isSending" class="flex items-center gap-3">
                <svg class="w-5 h-5 animate-spin" fill="none" viewBox="0 0 24 24">
                  <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                  <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Sending Message...
              </div>
              <div v-else class="flex items-center gap-3">
                <svg class="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"></path>
                </svg>
                Send Message
              </div>
            </button>
          </div>
        </form>

        <!-- Enhanced Success Message -->
        <transition
          enter-active-class="transition-all duration-500 ease-out"
          enter-from-class="opacity-0 scale-95 translate-y-4"
          enter-to-class="opacity-100 scale-100 translate-y-0"
          leave-active-class="transition-all duration-300 ease-in"
          leave-from-class="opacity-100 scale-100"
          leave-to-class="opacity-0 scale-95"
        >
          <div
            v-if="submitted"
            class="mt-8 p-6 bg-gradient-to-r from-green-50 to-emerald-50 border-2 border-green-200 rounded-2xl text-center"
          >
            <div class="w-16 h-16 mx-auto mb-4 rounded-2xl bg-gradient-to-r from-green-500 to-emerald-500 flex items-center justify-center shadow-lg animate-bounce">
              <svg class="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
              </svg>
            </div>
            <h3 class="text-xl font-bold text-green-800 mb-2">Message Sent Successfully! 🎉</h3>
            <p class="text-green-700 font-medium">
              Thank you for reaching out! I'll get back to you within 24 hours.
            </p>
          </div>
        </transition>

        <!-- Contact Info Footer -->
        <div class="mt-8 pt-6 border-t border-slate-200/50">
          <p class="text-center text-slate-500 text-sm">
            Or reach me directly at 
            <a href="mailto:your-email@example.com" class="text-blue-600 hover:text-blue-800 font-medium transition-colors">
              your-email@example.com
            </a>
          </p>
        </div>
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
        time: new Date().toLocaleString(),
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

<style scoped>
/* Custom animations */
@keyframes modal-enter {
  from {
    opacity: 0;
    transform: scale(0.9) translateY(20px);
  }
  to {
    opacity: 1;
    transform: scale(1) translateY(0);
  }
}

@keyframes bounce-subtle {
  0%, 100% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-5px);
  }
}

.animate-modal-enter {
  animation: modal-enter 0.3s ease-out;
}

.animate-bounce-subtle {
  animation: bounce-subtle 2s infinite;
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

/* Focus states enhancement */
input:focus,
textarea:focus {
  box-shadow: 0 0 0 4px rgb(59 130 246 / 0.1);
}

/* Hover effects */
.group:hover input,
.group:hover textarea {
  border-color: rgb(148 163 184);
}

/* Custom scrollbar for textarea */
textarea::-webkit-scrollbar {
  width: 6px;
}

textarea::-webkit-scrollbar-track {
  background: #f1f5f9;
  border-radius: 10px;
}

textarea::-webkit-scrollbar-thumb {
  background: linear-gradient(to bottom, #3b82f6, #8b5cf6);
  border-radius: 10px;
}

textarea::-webkit-scrollbar-thumb:hover {
  background: linear-gradient(to bottom, #2563eb, #7c3aed);
}
</style>