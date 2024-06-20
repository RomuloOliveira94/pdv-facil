<template>
    <label class="input input-bordered flex items-center gap-2">
        <input
            type="search"
            class="grow border-none focus:ring-0 focus:outline-none text-xl"
            v-model="query"
            @input="updateSearch"
            placeholder="Pesquisar..."
        />
        <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 16 16"
            fill="currentColor"
            class="w-6 h-6 opacity-70"
        >
            <path
                fill-rule="evenodd"
                d="M9.965 11.026a5 5 0 1 1 1.06-1.06l2.755 2.754a.75.75 0 1 1-1.06 1.06l-2.755-2.754ZM10.5 7a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0Z"
                clip-rule="evenodd"
            />
        </svg>
    </label>
</template>

<script setup lang="ts">
import { ref } from "vue";

const props = defineProps({
    q: String,
});

const query = ref(props.q);
const emit = defineEmits(["search"]);

const updateSearch = () => {
    emit("search", query.value);
};
</script>
