<script setup>

    const name = "Bookmarks";

    import { useStructureStore } from "@/stores/structureStore";

    let structure = useStructureStore();
    let bookmarks = structure.bookmarks;

</script>

<template>
  <div>
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