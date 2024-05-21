<script setup>
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout.vue";
import SellProductsModal from "@/Components/SellProductsModal.vue";
import SectionContainer from "@/Components/SectionContainer.vue";
import Pagination from "@/Components/Pagination.vue";
import { Head, Link } from "@inertiajs/vue3";
import { defineProps, ref } from "vue";

const selectedProduct = ref([]);
const props = defineProps({
    sells: Object,
});

const formatDate = (dateString) => {
    const options = { year: "numeric", month: "long", day: "numeric" };
    return new Date(dateString).toLocaleDateString(undefined, options);
};

const openProductsModal = (id) => {
    document.getElementById("productModal").showModal();
    selectedProduct.value = props.sells.data.find((sell) => sell.id === id).products;
};
</script>

<template>
    <AuthenticatedLayout>
        <Head title="Vendas" />
        <template #header>
            <h2 class="font-semibold text-xl text-gray-800 leading-tight">
                Vendas
            </h2>
        </template>
        <Link :href="route('sells.create')" class="btn btn-primary mb-6"
            >Criar Nova Venda</Link
        >
        <SectionContainer>
            <div class="min-h-[20vh] flex flex-col">
                <div class="overflow-x-auto">
                    <table class="table">
                        <thead class="text-black font-bold text-lg">
                            <tr>
                                <th>Data</th>
                                <th>Entrega</th>
                                <th>Valor</th>
                                <th>Forma de Pagamento</th>
                                <th>Produtos</th>
                            </tr>
                        </thead>
                        <tbody class="text-gray-700 font-bold text-md">
                            <tr
                                v-for="(sell) in sells.data"
                                :key="sell.id"
                            >
                                <td>{{ formatDate(sell.created_at) }}</td>
                                <td>{{ sell.delivery_tax }}</td>
                                <td>
                                    {{
                                        sell.total.toLocaleString("pt-BR", {
                                            currency: "BRL",
                                            style: "currency",
                                        })
                                    }}
                                </td>
                                <td>{{ sell.payment_type.name }}</td>
                                <td>
                                    <button
                                        class="btn btn-primary"
                                        @click="openProductsModal(sell.id)"
                                    >
                                        Ver Produtos
                                    </button>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
            <SellProductsModal :products="selectedProduct" />
            <pagination class="mt-6" :links="sells.links" />
        </SectionContainer>
    </AuthenticatedLayout>
</template>
