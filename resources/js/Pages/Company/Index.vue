<script setup lang="ts">
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout.vue";
import SectionContainer from "@/Components/SectionContainer.vue";
import { Link, Head } from "@inertiajs/vue3";
import { Company } from "./types";

defineProps<{
    company: Company;
}>();
</script>

<template>
    <AuthenticatedLayout>
        <Head title="Empresa" />
        <template #header>
            <h2
                class="font-semibold text-xl text-gray-800 leading-tight"
                v-if="company !== null"
            >
                Dados da Empresa: {{ company.name }}
                <span v-show="company.cnpj">- {{ company.cnpj }}</span>
            </h2>
        </template>

        <SectionContainer v-if="company !== null">
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
                    :src="$page.props.logo.url"
                    :alt="company.name"
                    class="w-40 h-40 object-cover rounded-lg"
                />
            </div>
        </SectionContainer>
        <div v-else>
            <p>Empresa não encontrada.</p>
        </div>
        <div class="flex items-center justify-end gap-4">
            <Link
                v-if="company !== null"
                :href="route('company.edit', company.id)"
                class="btn btn-primary w-fit mt-6"
                >Editar empresa 🏣</Link
            >
            <Link
                :href="route('categories.index', company.id)"
                :active="route().current('categories.index')"
                class="btn btn-primary w-fit mt-6 flex items-center gap-2"
            >
                Gerenciar Categorias ⚙
            </Link>
        </div>
    </AuthenticatedLayout>
</template>
