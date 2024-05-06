<script setup>
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout.vue";
import SectionContainer from "@/Components/SectionContainer.vue";
import { Link, useForm } from "@inertiajs/vue3";

defineProps({
    company: Object,
});

const form = useForm({
    name: company.name,
});
</script>

<template>
    <AuthenticatedLayout>
        <template #header>
            <h2 class="font-semibold text-xl text-gray-800 leading-tight">
                Editar Empresa: {{ company.name }}
            </h2>
        </template>
        <SectionContainer>
            <form @submit.prevent="submit">
                <label class="form-control w-full max-w-xs">
                    <div class="label">
                        <span class="label-text">Nome</span>
                    </div>
                    <input
                        type="text"
                        placeholder="Type here"
                        class="input input-bordered bg-inherit w-full max-w-xs"
                        v-model="form.name"
                    />
                </label>
            </form>
        </SectionContainer>
    </AuthenticatedLayout>
</template>
