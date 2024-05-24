<script setup>
import SectionContainer from "@/Components/SectionContainer.vue";
import ToastError from "@/Components/ToastError.vue";
import ToastSuccess from "@/Components/ToastSuccess.vue";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout.vue";
import { formatMoneyToBRL } from "@/utils";
import { Head, Link, router } from "@inertiajs/vue3";
import { ref, watch } from "vue";
const props = defineProps({
    products: Object,
});

const showToast = ref(false);

const destroy = (company_id) => {
    showToast.value = true;

    if (confirm("Tem certeza que quer deletar esse produto?")) {
        router.delete(route("products.destroy", company_id));
    }
};

watch(
    showToast,
    (value) => {
        if (value) {
            setTimeout(() => {
                showToast.value = false;
            }, 4000);
        }
    },
    { immediate: true }
);
</script>

<template>
    <AuthenticatedLayout>
        <Head title="Produtos" />
        <template #header>
            <h2 class="font-semibold text-xl text-gray-800 leading-tight">
                Produtos
            </h2>
        </template>
        <div class="mb-3">
            <Link :href="route('products.create')" class="btn btn-primary"
                >Criar Novo Produto</Link
            >
        </div>
        <SectionContainer>
            <div class="grid md:grid-cols-4 w-full gap-3">
                <div
                    v-for="(product, index) in products"
                    :key="index"
                    class="card card-side border border-slate-100 items-center shadow-sm"
                >
                    <div class="p-2 w-full grid gap-3">
                        <figure v-show="product.imageUrl" class="w-full">
                            <img
                                :src="'/storage/' + product.imageUrl"
                                :alt="product.name"
                                class="object-cover w-full h-36 rounded-lg"
                            />
                        </figure>
                        <div class="flex justify-between w-full items-center">
                            <div class="w-36">
                                <h2
                                    class="text-wrap truncate ... font-semibold text-lg"
                                >
                                    {{ product.name }}
                                </h2>
                                <p>
                                    {{ formatMoneyToBRL(product.price) }}
                                </p>
                            </div>
                            <div class="card-actions justify-end flex-col">
                                <Link
                                    :href="route('products.edit', product.id)"
                                    class="btn btn-info btn-sm w-full"
                                    >Editar</Link
                                >
                                <button
                                    @click="destroy(product.id)"
                                    class="btn btn-error btn-sm w-full"
                                >
                                    Deletar
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </SectionContainer>
        <ToastSuccess v-if="$page.props.flash.success && showToast">
            {{ $page.props.flash.success }}
        </ToastSuccess>

        <ToastError v-if="$page.props.flash.error && showToast">
            {{ $page.props.flash.error }}
        </ToastError>
    </AuthenticatedLayout>
</template>
