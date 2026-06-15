<script setup>
import { ref } from "vue";
import { useRouter, RouterLink } from "vue-router";
import { useAuthStore } from "../../stores/auth.store";
import AuthCard from "../../components/auth/AuthCard.vue";

const router = useRouter();
const authStore = useAuthStore();

const email = ref("");
const password = ref("");

const loading = ref(false);
const errorMessage = ref("");

const handleLogin = async () => {
    errorMessage.value = "";

    // Required validation
    if (!email.value.trim() || !password.value) {
        errorMessage.value = "Email and Password are required";
        return;
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(email.value.trim())) {
        errorMessage.value = "Please enter a valid email";
        return;
    }

    try {
        loading.value = true;

        await authStore.login({
            email: email.value.trim(),
            password: password.value,
        });

        router.push("/dashboard");
    } catch (error) {
        errorMessage.value =
            error.response?.data?.message || "Invalid email or password";
    } finally {
        loading.value = false;
    }
};
</script>

<template>
    <AuthCard title="Welcome Back" button-text="Login" :loading="loading" @submit="handleLogin">
        <input v-model="email" type="email" placeholder="Email"
            class="w-full border rounded-lg p-3 mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500" />

        <input v-model="password" type="password" placeholder="Password"
            class="w-full border rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500" />

        <p v-if="errorMessage" class="text-red-500 text-sm mt-3">
            {{ errorMessage }}
        </p>

        <template #footer>
            <p class="text-center mt-4 text-gray-500">
                Don't have an account?

                <RouterLink to="/register" class="text-blue-500 font-medium hover:underline">
                    Register
                </RouterLink>
            </p>
        </template>
    </AuthCard>
</template>