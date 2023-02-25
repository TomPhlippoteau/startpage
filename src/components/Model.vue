<script setup>

    import { defineProps } from 'vue'

    const name = "Model";

    const props = defineProps(['search']);

    let engines = [
        { title:'canard pc', url:'https://www.canardpc.com/moteur-de-recherche?s='},
        { title:'gamekult', url:'https://www.gamekult.com/rechercher-jeu.html?q='},
    ];

    let searchingWords = props.search.value.replace(' ', '+');

</script>

<template>
    <div>
        <ul class="c-help">
            <li v-for="(engine,key) in engines" :key="key">
                <a :href="engine.url + searchingWords" target="_blank" class="main">{{ engine.title }} ({{ props.search.value }})</a>
            </li>
        </ul>
    </div>
</template>