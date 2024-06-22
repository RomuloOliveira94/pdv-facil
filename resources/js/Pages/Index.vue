<script setup lang="ts">
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout.vue";
import { Head } from "@inertiajs/vue3";
</script>

<template>
    <AuthenticatedLayout>
        <Head title="Inicio" />
        <template #header>
            <h2
                class="font-semibold text-2xl text-gray-800 leading-tight text-center"
            >
                Bem vindo {{ $page.props.auth.user.name }}
            </h2>
        </template>
    </AuthenticatedLayout>
</template>
