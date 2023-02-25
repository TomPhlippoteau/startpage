<script setup>

    import { defineProps } from 'vue'

    const name = "Ls";

    const props = defineProps(['data']);

</script>

<template>
    <div>
        <div v-for="(file,index) in data.response.files" :key="index">
            [{{ file.type }}] {{ file.name }} 
        </div>
    </div>
</template>