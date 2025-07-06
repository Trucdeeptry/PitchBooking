<template>
    <!-- Dialog Overlay -->
    <div v-if="isOpen" class="fixed inset-0 z-50 flex items-center justify-center bg-black/50" @click="closeDialog">
        <!-- Dialog Content -->
        <div class="bg-white rounded-lg shadow-lg w-full max-w-md mx-4 p-6" @click.stop>
            <!-- Dialog Header -->
            <div class="flex items-center justify-between mb-6">
                <h2 class="text-2xl font-bold text-gray-900">Sign In</h2>
                <button @click="closeDialog" class="text-gray-400 hover:text-gray-600 transition-colors">
                    <X class="w-6 h-6" />
                </button>
            </div>

            <!-- Sign In Form -->
            <form @submit.prevent="handleSignIn" class="space-y-4">
                <!-- Phone Number Field -->
                <div class="space-y-2">
                    <label for="phone" class="block text-sm font-medium text-gray-700">
                        Email
                    </label>
                    <input id="email" v-model="form.email" type="email" placeholder="you@example.com" required
                        class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                        :class="{ 'border-red-500': errors.email }" />
                    <p v-if="errors.email" class="text-sm text-red-600">
                        {{ errors.email }}
                    </p>
                </div>

                <!-- Password Field -->
                <div class="space-y-2">
                    <label for="password" class="block text-sm font-medium text-gray-700">
                        Password
                    </label>
                    <div class="relative">
                        <input id="password" v-model="form.password" :type="showPassword ? 'text' : 'password'"
                            placeholder="Enter your password" required
                            class="w-full px-3 py-2 pr-10 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                            :class="{ 'border-red-500': errors.password }" />
                        <button type="button" @click="showPassword = !showPassword"
                            class="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600">
                            <Eye v-if="!showPassword" class="w-5 h-5" />
                            <EyeOff v-else class="w-5 h-5" />
                        </button>
                    </div>
                    <p v-if="errors.password" class="text-sm text-red-600">
                        {{ errors.password }}
                    </p>
                </div>

                <!-- Remember Me & Forgot Password -->
                <div class="flex items-center justify-between">
                    <!-- <label class="flex items-center">
                        <input v-model="form.rememberMe" type="checkbox"
                            class="w-4 h-4 text-primary border-gray-300 rounded focus:ring-primary" />
                        <span class="ml-2 text-sm text-gray-600">Remember me</span>
                    </label> -->

                </div>

                <!-- Sign In Button -->
                <button type="submit" :disabled="isLoading"
                    class="w-full py-2 border bg-green-700 text-white px-4 bg-primary text-primary-foreground rounded-md hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-colors">
                    <span v-if="!isLoading">Sign In</span>
                    <span v-else class="flex items-center justify-center">
                        <Loader2 class="w-4 h-4 mr-2 animate-spin" />
                        Signing in...
                    </span>
                </button>
            </form>

        </div>
    </div>

</template>

<script setup>
import { ref, reactive, defineExpose } from 'vue'
import { X, Eye, EyeOff, Loader2 } from 'lucide-vue-next'
import { useStore } from 'vuex'
// Dialog state
const isOpen = ref(false)
const isLoading = ref(false)
const showPassword = ref(false)
const store = useStore()
// Form data
const form = reactive({
    email: '',
    password: '',
    rememberMe: false
})

// Form errors
const errors = reactive({
    email: '',
    password: ''
})


// Validate form
const validateForm = () => {
    errors.email = ''
    errors.password = ''

    if (!form.email) {
        errors.email = 'Email is required'
        return false
    }



    if (!form.password) {
        errors.password = 'Password is required'
        return false
    }

    if (form.password.length < 6) {
        errors.password = 'Password must be at least 6 characters'
        return false
    }

    return true
}

// Handle form submission
const handleSignIn = async () => {
    if (!validateForm()) return

    isLoading.value = true

    try {
        // Simulate API call
        await store.dispatch('auth/signIn', {
            email: form.email,
            password: form.password,
            rememberMe: form.rememberMe
        })

        form.email = ''
        form.password = ''
        form.rememberMe = false
        closeDialog()

        alert('Sign in successful!')
    } catch (error) {
        console.error('Sign in error:', error)
        alert('Sign in failed. Please try again.')
    } finally {
        isLoading.value = false
    }
}

// Close dialog
const closeDialog = () => {
    isOpen.value = false
    errors.email = ''
    errors.password = ''
}
const OpenDialog = () => {
    isOpen.value = true
}
// Close dialog on Escape key
const handleKeydown = (event) => {
    if (event.key === 'Escape' && isOpen.value) {
        closeDialog()
    }
}

// Add event listener for Escape key
if (typeof window !== 'undefined') {
    window.addEventListener('keydown', handleKeydown)
}

defineExpose({
    OpenDialog
})
</script>

<style scoped>
/* Custom styles for better visual hierarchy */
.animate-spin {
    animation: spin 1s linear infinite;
}

@keyframes spin {
    from {
        transform: rotate(0deg);
    }

    to {
        transform: rotate(360deg);
    }
}
</style>