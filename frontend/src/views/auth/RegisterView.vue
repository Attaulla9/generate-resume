<script setup>
import { ref } from "vue";
import { useRouter, RouterLink } from "vue-router";
import { useAuthStore } from "../../stores/auth.store";
import AuthCard from "../../components/auth/AuthCard.vue";

const router = useRouter();
const authStore = useAuthStore();

const name = ref("");
const email = ref("");
const password = ref("");
const confirmPassword = ref("");

const loading = ref(false);
const errorMessage = ref("");

const handleRegister = async () => {
    if (password.value !== confirmPassword.value) {
        errorMessage.value = "Passwords do not match";
        return;
    }

    try {
        loading.value = true;
        errorMessage.value = "";

        await authStore.register({
            name: name.value,
            email: email.value,
            password: password.value,
        });

        router.push("/login");
    } catch (error) {
        errorMessage.value =
            error.response?.data?.message || "Registration failed";
    }
};
</script>

<template>
    <AuthCard title="Create Account" button-text="Create Account" @submit="handleRegister">
        <input v-model="name" class="w-full border rounded-lg p-3 mb-4" placeholder="Name" />

        <input v-model="email" type="email" class="w-full border rounded-lg p-3 mb-4" placeholder="Email" />

        <input v-model="password" type="password" class="w-full border rounded-lg p-3 mb-4" placeholder="Password" />

        <input v-model="confirmPassword" type="password" class="w-full border rounded-lg p-3"
            placeholder="Confirm Password" />

        <p v-if="errorMessage" class="text-red-500 text-sm mt-3">
            {{ errorMessage }}
        </p>

        <template #footer>
            <p class="text-center mt-4">
                Already have an account?

                <RouterLink to="/login" class="text-blue-500">
                    Login
                </RouterLink>
            </p>
        </template>
    </AuthCard>
</template>