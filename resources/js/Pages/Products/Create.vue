<script setup>
import { Head, Link, useForm } from "@inertiajs/vue3";
import { vMaska } from "maska";
import SectionContainer from "@/Components/SectionContainer.vue";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout.vue";
import InputError from "@/Components/InputError.vue";
import TextInput from "@/Components/TextInput.vue";
import InputLabel from "@/Components/InputLabel.vue";

const form = useForm({
    name: "",
    price: "",
    category: "",
    image: "",
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
                        autofocus
                        autocomplete="name"
                    />

                    <InputError class="mt-2" :message="form.errors.name" />
                </div>

                <div class="mt-4">
                    <InputLabel for="price" value="Price" />

                    <TextInput
                        id="price"
                        type="text"
                        class="mt-1 block w-full"
                        v-model="form.price"
                        autocomplete="price"
                        v-maska
                        data-maska="R$ 0.99"
                        data-maska-tokens="0:\d:multiple|9:\d:optional"
                        placeholder="R$ 00.00"
                    />

                    <InputError class="mt-2" :message="form.errors.price" />
                </div>

                <div class="mt-4">
                    <InputLabel for="category" value="Category" />

                    <TextInput
                        id="category"
                        type="text"
                        class="mt-1 block w-full"
                        v-model="form.category"
                        autocomplete="new-category"
                    />

                    <InputError class="mt-2" :message="form.errors.category" />
                </div>

                <div class="mt-4">
                    <InputLabel for="image" value="Imagem" />

                    <input
                        type="file"
                        class="file-input w-full bg-inherit mt-1 block"
                        @input="form.image = $event.target.files[0]"
                    />

                    <progress
                        v-if="form.progress"
                        class="progress w-56"
                        :value="form.progress.percentage"
                        max="100"
                    >
                        {{ form.progress.percentage }}%
                    </progress>

                    <InputError class="mt-2" :message="form.errors.image" />
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
