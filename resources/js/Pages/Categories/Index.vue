<script setup>
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout.vue";
import SectionContainer from "@/Components/SectionContainer.vue";
import { Link, Head, router } from "@inertiajs/vue3";
import { formatCategoryType } from "@/utils";
const props = defineProps({
    categories: Array,
    company: Object,
});

const destroy = (category_id) => {
    if (confirm("Tem certeza que quer deletar essa categoria?")) {
        router.delete(
            route("categories.destroy", {
                company: props.company.id,
                category: category_id,
            })
        );
    }
};
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
            :href="route('categories.create', $page.props.auth.user.company.id)"
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
                                <th>Nome</th>
                                <th>Tipo</th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr
                                v-for="(category, index) in categories"
                                :key="index"
                            >
                                <td>
                                    <div class="grid gap-0.5">
                                        <p class="line-clamp-1">
                                            {{ category.name }}
                                        </p>
                                        <p class="line-clamp-1">
                                            {{ category.description }}
                                        </p>
                                    </div>
                                </td>
                                <td>{{ formatCategoryType(category.type) }}</td>
                                <th>
                                    <div class="flex items-center gap-6">
                                        <Link
                                            :href="
                                                route('categories.edit', [
                                                    $page.props.auth.user
                                                        .company.id,
                                                    category.id,
                                                ])
                                            "
                                            class="btn btn-primary"
                                            >📝</Link
                                        >
                                        <button
                                            @click="destroy(category.id)"
                                            class="btn btn-error"
                                        >
                                            🗑️
                                        </button>
                                    </div>
                                </th>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </SectionContainer>
    </AuthenticatedLayout>
</template>
