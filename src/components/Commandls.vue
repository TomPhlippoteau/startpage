<script setup>

    import { defineProps } from 'vue'

    const name = "Ls";

    const props = defineProps(['data']);

    console.log(props.data);

</script>

<template>
    <div>
        <div v-for="(file,index) in data.response.folders" :key="index">
            [folder] {{ file.name }} 
        </div>
        <div v-for="(file,index) in data.response.files" :key="index">
            [file] {{ file.name }} 
        </div>
    </div>
</template>