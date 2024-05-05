<script setup>
import { Head, Link, useForm } from "@inertiajs/vue3";
import SectionContainer from "@/Components/SectionContainer.vue";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout.vue";
import InputError from "@/Components/InputError.vue";
import TextInput from "@/Components/TextInput.vue";
import InputLabel from "@/Components/InputLabel.vue";

const form = useForm({
    name: "",
    price: 0,
    category: "",
});

const submit = () => {
    form.post("/products", form);
};
</script>
<template>
    <AuthenticatedLayout>
        <Head title="Criar produto" />
        <template #header>
            <div class="flex items-center justify-between">
                <h2 class="font-semibold text-xl text-gray-800 leading-tight">
                    Criar novo produto
                </h2>
            </div>
        </template>
        <SectionContainer>
            <form @submit.prevent="submit">
                <div>
                    <InputLabel for="name" value="Name" />

                    <TextInput
                        id="name"
                        type="text"
                        class="mt-1 block w-full"
                        v-model="form.name"
                        required
                        autofocus
                        autocomplete="name"
                    />

                    <InputError class="mt-2" :message="form.errors.name" />
                </div>

                <div class="mt-4">
                    <InputLabel for="price" value="Price" />

                    <TextInput
                        id="price"
                        type="number"
                        class="mt-1 block w-full"
                        v-model="form.price"
                        required
                        autocomplete="price"
                    />

                    <InputError class="mt-2" :message="form.errors.price" />
                </div>

                <div class="mt-4">
                    <InputLabel for="category" value="category" />

                    <TextInput
                        id="category"
                        type="text"
                        class="mt-1 block w-full"
                        v-model="form.category"
                        required
                        autocomplete="new-category"
                    />

                    <InputError class="mt-2" :message="form.errors.category" />
                </div>

                <div class="flex items-center justify-between mt-4 gap-6">
                    <button
                        class="btn btn-success"
                        :class="{ 'opacity-25': form.processing }"
                        :disabled="form.processing"
                    >
                        Criar
                    </button>
                    <Link
                        :href="route('products.index')"
                        class="btn btn-error text-sm text-gray-600 hover:text-gray-900"
                    >
                        Cancelar
                    </Link>
                </div>
            </form>
        </SectionContainer>
    </AuthenticatedLayout>
</template>
