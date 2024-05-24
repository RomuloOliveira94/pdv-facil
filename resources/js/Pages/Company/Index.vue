<script setup>
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout.vue";
import SectionContainer from "@/Components/SectionContainer.vue";
import { Link, Head } from "@inertiajs/vue3";

defineProps({
    company: Object,
});
</script>

<template>
    <AuthenticatedLayout>
        <Head title="Empresa" />
        <template #header>
            <h2 class="font-semibold text-xl text-gray-800 leading-tight">
                Dados da Empresa: {{ company.name }}
                <span v-show="company.cnpj">- {{ company.cnpj }}</span>
            </h2>
        </template>
        <SectionContainer>
            <div class="flex gap-3 justify-between items-center w-full">
                <div class="grid gap-1">
                    <h1>{{ company.name }}</h1>
                    <h2>{{ company.email }}</h2>
                    <h2>
                        {{ company.address }}, {{ company.address_number }} -
                        {{ company.zip_code }}
                    </h2>
                    <h2>{{ company.city }} - {{ company.state }}</h2>
                    <h2>{{ company.phone }}</h2>
                </div>
                <img
                    :src="'/storage/' + company.logo"
                    :alt="company.name"
                    class="w-40 h-40 object-cover rounded-lg"
                />
            </div>
        </SectionContainer>
        <Link
            :href="route('company.edit', company)"
            class="btn btn-primary w-32 mt-6 self-end"
            >Editar</Link
        >
    </AuthenticatedLayout>
</template>
