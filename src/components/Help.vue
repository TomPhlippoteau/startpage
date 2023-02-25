<script setup>

    import commands from '../data/commands.json';

    const name = "Help";

</script>

<template>
    <div>
        <ul class="c-help">
            <li v-for="(command,key) in commands" :key="key">
                <span class="main">{{ command.command }}</span>
                <span class="c-secondary">{{ command.description }}</span>
            </li>
        </ul>
    </div>
</template>