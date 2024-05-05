<script setup>
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout.vue";
import SectionContainer from "@/Components/SectionContainer.vue";

</script>

<template>
    <AuthenticatedLayout>
        <template #header>
            <h2 class="font-semibold text-xl text-gray-800 leading-tight">
                Empresa
            </h2>
        </template>
        <SectionContainer>
            <div class="p-6 text-gray-900">Empresas</div>
        </SectionContainer>
    </AuthenticatedLayout>
</template>
