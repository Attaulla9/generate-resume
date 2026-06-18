<script setup>
import { ref } from "vue";
import Navbar from "../components/layout/Navbar.vue";
import Sidebar from "../components/layout/Sidebar.vue";

const sidebarOpen = ref(false);

const toggleSidebar = () => {
    sidebarOpen.value = !sidebarOpen.value;
};

const closeSidebar = () => {
    sidebarOpen.value = false;
};
</script>

<template>
    <div class="flex h-screen overflow-hidden bg-gray-100">

        <Sidebar :isOpen="sidebarOpen" @close="closeSidebar" />

        <div class="flex flex-col flex-1 overflow-hidden">

            <Navbar @toggleSidebar="toggleSidebar" />

            <main class="flex-1 overflow-y-auto p-4 md:p-6 lg:p-8">
                <RouterView />
            </main>

        </div>

    </div>
</template>