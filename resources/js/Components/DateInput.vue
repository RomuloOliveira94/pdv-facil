<template>
    <div>
        <input
            type="date"
            class="input input-bordered focus:ring-0 focus:outline-none text-xl"
            v-model="date"
            @change="updateSearch"
        />
    </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
const date = ref("");
const emit = defineEmits(["searchDate"]);

const updateSearch = () => {
    emit("searchDate", date.value);
};
</script>
