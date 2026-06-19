<template>
    <div class="bg-white rounded-lg shadow-sm p-6">

        <div>

            <textarea id="summary" v-model="resume" rows="6" maxlength="500" placeholder="Summary"
                class="w-full border rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"></textarea>

            <div class="flex justify-between mt-2">


                <span class="text-gray-500 text-sm ml-auto">
                    {{ resume.length || 0 }}/500
                </span>
            </div>
        </div>
    </div>
</template>

<script setup>


const resume = defineModel({
    type: String,
    required: true,
});


</script>