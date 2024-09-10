<script setup>
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout.vue";
import SectionContainer from "@/Components/SectionContainer.vue";
import { Link, Head } from "@inertiajs/vue3";
defineProps({
    categories: Array,
    company: Object,
});
</script>
<template>
    <AuthenticatedLayout>
        <Head title="Categorias" />
        <template #header>
            <h2 class="font-semibold text-xl text-gray-800 leading-tight">
                Categorias
            </h2>
        </template>
        <Link
            v-if="company !== null"
            :href="
                route(
                    'categories.create',
                    $page.props.auth.user.company.id
                )
            "
            class="btn btn-primary w-fit mb-6"
            >Criar categoria ➕</Link
        >
        <SectionContainer>
            <div v-if="categories.length">
                <div class="overflow-x-auto">
                    <table class="table">
                        <!-- head -->
                        <thead>
                            <tr>
                                <th></th>
                                <th>Nome</th>
                                <th>Descrição</th>
                                <th>Tipo</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr
                                v-for="(category, index) in categories"
                                :key="index"
                            >
                                <th>{{ index }}</th>
                                <td>{{ category.name }}</td>
                                <td>{{ category.description }}</td>
                                <td>{{ category.categorizable_type }}</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </SectionContainer>
    </AuthenticatedLayout>
</template>
