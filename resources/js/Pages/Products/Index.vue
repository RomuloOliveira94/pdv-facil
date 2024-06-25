<script setup lang="ts">
import SectionContainer from "@/Components/SectionContainer.vue";
import ToastError from "@/Components/ToastError.vue";
import ToastSuccess from "@/Components/ToastSuccess.vue";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout.vue";
import Pagination from "@/Components/Pagination.vue";
import SearchInput from "@/Components/SearchInput.vue";
import { formatMoneyToBRL } from "@/utils";
import { Head, Link, router } from "@inertiajs/vue3";
import { computed, ref, watch } from "vue";
import { ProductWithPaginate } from "./types";
import { Flash } from "@/types";

const props = defineProps<{
    products: ProductWithPaginate;
    flash: Flash;
    search?: string;
}>();

const query = ref(props.search);

const linksWithSearch = computed(() => {
    return props.products.links.map((link) => {
        if (link.url === null) return link;

        let url = new URL(link.url);

        if (query.value) {
            url.searchParams.set("product", query.value);
        }

        return {
            ...link,
            url: `${url}`,
        };
    });
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

const searchProducts = (search) => {
    query.value = search;
    router.get(
        route("products.index", { product: query.value }),
        {},
        { preserveState: true, preserveScroll: true }
    );
};
</script>

<template>
    <AuthenticatedLayout>
        <Head title="Produtos" />
        <template #header>
            <h2 class="font-semibold text-3xl text-gray-800 leading-tight">
                Produtos
            </h2>
        </template>
        <div class="mb-3">
            <Link
                :href="route('products.create')"
                class="btn btn-primary w-full text-lg mb-2"
                >Criar Novo Produto</Link
            >
        </div>
        <SectionContainer>
            <h1 class="text-3xl font-bold mb-2 text-gray-800 text-center">
                Produtos
            </h1>
            <SearchInput
                class="my-4"
                placeholder="Pesquisar produtos"
                @search="searchProducts"
                :q="query"
            />
            <div v-if="!products.data.length" class="text-center">
                <h1 class="text-2xl font-bold py-16">
                    Nenhum produto encontrado.
                </h1>
            </div>
            <div
                class="grid md:grid-cols-4 w-full gap-3"
                v-if="products.data.length"
            >
                <div
                    v-for="(product, index) in products.data"
                    :key="index"
                    class="card card-side border border-slate-100 items-center shadow-sm"
                >
                    <div class="p-2 w-full grid gap-3">
                        <figure v-show="product" class="w-full h-32 relative">
                            <span
                                v-show="!product.imageUrl"
                                class="text-2xl text-white font-bold absolute top-12 text-center z-10"
                                >{{ product.name }}</span
                            >
                            <div
                                v-show="!product.imageUrl"
                                class="absolute bg-black opacity-80 rounded-lg"
                            ></div>
                            <img
                                :src="
                                    product.imageUrl
                                        ? '/storage/' + product.imageUrl
                                        : '/storage/logos/pdvfacil.png'
                                "
                                :alt="product.name"
                                class="object-cover w-full h-full rounded-lg"
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
                                    class="btn btn-primary btn-sm w-full"
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
            <pagination class="mt-6" :links="linksWithSearch" />
        </SectionContainer>
        <ToastSuccess v-if="props.flash.success && showToast">
            {{ props.flash.success }}
        </ToastSuccess>

        <ToastError v-if="props.flash.error && showToast">
            {{ props.flash.error }}
        </ToastError>
    </AuthenticatedLayout>
</template>
