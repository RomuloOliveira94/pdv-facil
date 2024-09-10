<script setup>
import SectionContainer from "@/Components/SectionContainer.vue";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout.vue";
import { Head, Link, router, useForm } from "@inertiajs/vue3";
import InputError from "@/Components/InputError.vue";
import TextInput from "@/Components/TextInput.vue";
import InputLabel from "@/Components/InputLabel.vue";

const props = defineProps({
    errors: Object,
    company: Object,
    categoryTypes: Object,
});

const form = useForm({
    name: "",
    description: "",
    type: "",
});

const submit = () => {
    router.post(route("categories.store", props.company.id), {
        _method: "post",
        name: form.name,
        description: form.description,
        slug: form.name.toLowerCase().replace(/ /g, "-"),
        company_id: props.company.id,
        type: form.type,
    });
};
</script>
<template>
    <AuthenticatedLayout>
        <Head title="Categorias" />
        <template #header>
            <h2 class="font-semibold text-xl text-gray-800 leading-tight">
                Criar nova categoria:
            </h2>
        </template>
        <SectionContainer>
            <form @submit.prevent="submit">
                <div>
                    <InputLabel for="name" value="Nome" />

                    <TextInput
                        id="name"
                        type="text"
                        class="mt-1 block w-full"
                        v-model="form.name"
                        autofocus
                        autocomplete="name"
                    />

                    <InputError class="mt-2" :message="errors.name" />
                </div>

                <div>
                    <InputLabel for="description" value="Descrição" />

                    <TextInput
                        id="description"
                        type="text"
                        class="mt-1 block w-full"
                        v-model="form.description"
                        autofocus
                        autocomplete="description"
                    />

                    <InputError class="mt-2" :message="errors.description" />
                </div>

                <div class="mt-4">
                    <InputLabel for="type" value="Tipo de Categoria" />

                    <select
                        id="type"
                        class="mt-1 block w-full select input-bordered"
                        v-model="form.type"
                        autocomplete="type"
                    >
                        <option value="" selected>Selecione o tipo</option>
                        <option
                            v-for="(type, index) in categoryTypes"
                            :key="index"
                            :value="index"
                        >
                            {{ type }}
                        </option>
                    </select>
                    <InputError class="mt-2" :message="errors.type" />
                </div>

                <div class="flex items-center justify-between mt-4 gap-6">
                    <button
                        class="btn btn-success"
                        :class="{ 'opacity-25': form.processing }"
                        :disabled="form.processing"
                        type="submit"
                    >
                        Criar
                    </button>
                    <Link
                        :href="route('categories.index', company.id)"
                        class="btn btn-error text-sm text-gray-600 hover:text-gray-900"
                    >
                        Cancelar
                    </Link>
                </div>
            </form>
        </SectionContainer>
    </AuthenticatedLayout>
</template>
