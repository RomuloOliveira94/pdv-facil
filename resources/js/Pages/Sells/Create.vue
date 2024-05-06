<script setup>
import SectionContainer from "@/Components/SectionContainer.vue";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout.vue";
import { Head } from "@inertiajs/vue3";
</script>

<template>
    <Head title="Venda" />

    <AuthenticatedLayout>
        <template #header>
            <h2 class="font-semibold text-xl text-gray-800 leading-tight">
                Registar Venda
            </h2>
        </template>

        <SectionContainer>
            <div class="p-6 text-gray-900">Produtos</div>
        </SectionContainer>
    </AuthenticatedLayout>
</template>
