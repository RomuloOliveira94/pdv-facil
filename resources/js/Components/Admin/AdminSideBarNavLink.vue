<script setup>
import { computed } from 'vue';
import { Link } from '@inertiajs/vue3';

const props = defineProps({
    href: {
        type: String,
        required: true,
    },
    active: {
        type: Boolean,
    },
});

const classes = computed(() =>
    props.active
        ? 'flex items-center px-6 py-2 mt-4 text-gray-700 bg-secondary text-gray-100'
        : 'flex items-center px-6 py-2 mt-4 text-gray-700 hover:bg-secondary hover:text-gray-100'
);
</script>

<template>
    <Link :href="href" :class="classes">
        <slot />
    </Link>
</template>
