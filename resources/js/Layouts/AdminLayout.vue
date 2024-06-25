<script setup>
import Header from "@/Components/Admin/Header.vue";
import SideBar from "@/Components/Admin/SideBar.vue";
import EasyPdvLogo from "@/Components/EasyPdvLogo.vue";
import { Link } from "@inertiajs/vue3";

import { ref } from "vue";
const sidebarOpen = ref(false);

const handleSideBar = (value) => {
    sidebarOpen.value = value;
};
</script>

<template>
    <div class="flex h-screen bg-gray-200 font-roboto">
        <SideBar @sidebar-open="handleSideBar" :open="sidebarOpen" />
        <div class="flex-1 flex flex-col overflow-hidden">
            <Header @sidebar-open="handleSideBar" :open="sidebarOpen" />
            <main class="flex-1 overflow-x-hidden overflow-y-auto bg-gray-200">
                <slot />
            </main>
        </div>
    </div>
</template>
