<script setup lang="ts">
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout.vue";
import SellProductsModal from "@/Components/SellProductsModal.vue";
import SectionContainer from "@/Components/SectionContainer.vue";
import Pagination from "@/Components/Pagination.vue";
import { Head, Link, router } from "@inertiajs/vue3";
import { ref } from "vue";
import { formatDate, formatMoneyToBRL } from "@/utils";
import { SellWithPaginate } from "./types";
import { User } from "@/types";

const selectedProduct = ref([]);
const props = defineProps<{
    sells: SellWithPaginate;
    user: User;
}>();

const openProductsModal = (id) => {
    (document.getElementById("productModal") as HTMLDialogElement).showModal();
    selectedProduct.value = props.sells.data.find(
        (sell) => sell.id === id
    ).products;
};

const destroy = (id) => {
    if (confirm("Tem certeza que quer cancelar essa venda?")) {
        router.delete(route("sells.destroy", id));
    }
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
                                <th>Forma de Pagamento</th>
                                <th>Desconto</th>
                                <th>Subtotal</th>
                                <th>Total</th>
                                <th>Produtos</th>
                                <th v-if="user.role !== 'cashier'">Cancelar</th>
                            </tr>
                        </thead>
                        <tbody class="text-gray-700 font-bold text-md">
                            <tr v-for="sell in sells.data" :key="sell.id">
                                <td>{{ formatDate(sell.created_at) }}</td>
                                <td>
                                    {{ formatMoneyToBRL(sell.delivery_tax) }}
                                </td>
                                <td>{{ sell.payment_type.name }}</td>
                                <td>
                                    {{
                                        sell.discount
                                            ? formatMoneyToBRL(sell.discount)
                                            : "-"
                                    }}
                                </td>
                                <td>
                                    {{ formatMoneyToBRL(sell.subtotal) }}
                                </td>
                                <td>
                                    {{ formatMoneyToBRL(sell.total) }}
                                </td>
                                <td>
                                    <button
                                        class="btn btn-primary"
                                        @click="openProductsModal(sell.id)"
                                    >
                                        Ver Produtos
                                    </button>
                                </td>
                                <td v-if="user.role !== 'cashier'">
                                    <button
                                        class="btn btn-error btn-sm rounded-full"
                                        @click="destroy(sell.id)"
                                    >
                                        X
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
