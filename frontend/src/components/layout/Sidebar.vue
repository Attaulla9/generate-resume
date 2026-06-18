<script setup>
import { useRouter } from "vue-router";
import { useAuthStore } from "../../stores/auth.store";

defineProps({
    isOpen: Boolean
});

const emit = defineEmits(["close"]);
const router = useRouter();
const authStore = useAuthStore();

const handleLogout = async () => {
    await authStore.logout();
    router.push("/login");
};

</script>

<template>

    <div>

        <div v-if="isOpen" class="fixed inset-0 bg-black/40 z-30 lg:hidden" @click="emit('close')">
        </div>

        <aside :class="[
            'fixed lg:static z-40 w-64 bg-white h-screen shadow transition-transform duration-300',

            isOpen
                ? 'translate-x-0'
                : '-translate-x-full lg:translate-x-0'
        ]">

            <div class="p-6">

                <h2 class="text-2xl font-bold mb-8">

                    Resume Builder

                </h2>

                <nav class="space-y-2 flex flex-col">

                    <RouterLink to="/dashboard" class="block p-3 rounded hover:bg-gray-100">

                        Dashboard

                    </RouterLink>

                    <RouterLink to="/resumes" class="block p-3 rounded hover:bg-gray-100">

                        My Resumes

                    </RouterLink>

                    <RouterLink to="/resumes/create" class="block p-3 rounded hover:bg-gray-100">

                        Create Resume

                    </RouterLink>

                    <RouterLink to="/profile" class="block p-3 rounded hover:bg-gray-100">

                        Profile

                    </RouterLink>
                    <div class="border-t my-4 mt-auto">
                        <button @click="handleLogout"
                            class="w-full text-left p-3 rounded hover:bg-red-100 text-red-500 ">

                            Logout

                        </button>
                    </div>
                </nav>

            </div>

        </aside>

    </div>

</template>