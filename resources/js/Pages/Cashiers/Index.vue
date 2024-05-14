<script setup>
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout.vue";
import { Head } from "@inertiajs/vue3";
</script>

<template>
    <AuthenticatedLayout>
        <Head title="Caixa" />
        <template #header>
            <h2 class="font-semibold text-xl text-gray-800 leading-tight">
                Caixas
            </h2>
        </template>
        <div>
            <h1>Cashiers</h1>
        </div>
    </AuthenticatedLayout>
</template>
