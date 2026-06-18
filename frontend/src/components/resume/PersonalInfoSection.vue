<template>
    <div class="bg-white rounded-xl shadow p-6">

        <h2 class="text-2xl font-semibold mb-6">
            Personal Information
        </h2>

        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">

            <!-- Full Name -->
            <div>
                <label class="block text-sm font-medium text-gray-700 mb-1">
                    Full Name
                </label>

                <input v-model="personalInfo.fullName" type="text" placeholder="Enter your full name"
                    autocomplete="name"
                    class="w-full border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500" />
            </div>

            <!-- Email -->
            <div>
                <label class="block text-sm font-medium text-gray-700 mb-1" autocomplete="email">
                    Email
                </label>

                <input v-model="personalInfo.email" type="email" placeholder="john@example.com" autocomplete="email"
                    class="w-full border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500" />
            </div>

            <!-- Phone -->
            <div>
                <label class="block text-sm font-medium text-gray-700 mb-1">
                    Phone
                </label>

                <input v-model="personalInfo.phone" type="tel" placeholder="Enter your phone number" autocomplete="tel"
                    class="w-full border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500" />
            </div>

            <!-- Address -->
            <div>
                <label class="block text-sm font-medium text-gray-700 mb-1">
                    Address
                </label>

                <input v-model="personalInfo.address" type="text" placeholder="Enter your address"
                    autocomplete="street-address"
                    class="w-full border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500" />
            </div>

            <!-- LinkedIn -->
            <div>
                <label class="block text-sm font-medium text-gray-700 mb-1">
                    LinkedIn
                </label>

                <input v-model="personalInfo.linkedin" type="url" placeholder="https://linkedin.com/in/username"
                    autocomplete="url"
                    class="w-full border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500" />
            </div>

            <!-- GitHub -->
            <div>
                <label class="block text-sm font-medium text-gray-700 mb-1">
                    GitHub
                </label>

                <input v-model="personalInfo.github" type="url" placeholder="https://github.com/username"
                    autocomplete="url"
                    class="w-full border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500" />
            </div>

            <!-- Portfolio -->
            <div class="md:col-span-2">
                <label class="block text-sm font-medium text-gray-700 mb-1">
                    Portfolio Website
                </label>

                <input v-model="personalInfo.portfolio" type="url" placeholder="https://myportfolio.com"
                    autocomplete="url"
                    class="w-full border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500" />
            </div>

        </div>

    </div>
</template>
<script setup>
const personalInfo = defineModel({
    type: Object,
    required: true,
});
</script>

<style></style>