<script setup>

    import links from '../data/bookmarks.json';

    const name = "Bookmarks";

    import { useStructureStore } from "@/stores/structureStore";

    let structure = useStructureStore();
    let bookmarks = structure.bookmarks;

</script>

<template>
  <div>
    <!-- <ul class="inlineblock ul-bookmarks" v-for="(links,index) in links.bookmarks" :key="index">
        <li class="title" :class="links.color">{{ links.category }} :::::</li>
        <li v-for="(cat,index) in links.links" :key="index">
            <strong>-- {{ cat.subcategory }} --</strong>
            <ul>
            <li v-for="(link, index) in cat.links" :key="index">
                <a :href="link.url">{{ link.name }}</a> 
                <a class="ml c-secondary" v-if="link.prod == true" :href="link.url.replace('/devel.', '/manager.')">[prod]</a>
            </li>
            </ul>
        </li>
    </ul> -->

    <ul class="inlineblock ul-bookmarks" v-for="(category,index) in bookmarks.folders" :key="index">
        <li class="title" :class="category.color">{{ category.name }} :::::</li>
        <li v-for="(subcategory,index) in category.folders" :key="index">
            <strong>-- {{ subcategory.name }} --</strong>
            <ul>
            <li v-for="(file, index) in subcategory.files" :key="index">
                <a :href="file.link">{{ file.name }}</a> 
            </li>
            </ul>
        </li>
    </ul>
  </div>
</template>