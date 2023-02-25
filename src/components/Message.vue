<script setup>

    import { defineProps } from 'vue'

    const name = "Message";

    const props = defineProps(['data']);

</script>

<template>
    <div>
        <span v-if="data.response.response === false">error : </span>
        <span v-if="data.response.response === true">success : </span>
        <span>{{ data.response.msg }}</span>
    </div>
</template>