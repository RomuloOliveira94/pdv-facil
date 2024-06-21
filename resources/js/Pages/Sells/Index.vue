<script setup lang="ts">
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout.vue";
import SellProductsModal from "@/Components/SellProductsModal.vue";
import SectionContainer from "@/Components/SectionContainer.vue";
import Pagination from "@/Components/Pagination.vue";
import DateInput from "@/Components/DateInput.vue";
import SearchInput from "@/Components/SearchInput.vue";
import { sameDay } from "@formkit/tempo";
import { Head, Link, router } from "@inertiajs/vue3";
import { ref, reactive, computed } from "vue";
import { formatDate, formatMoneyToBRL } from "@/utils";
import { SellWithPaginate } from "./types";
import { User } from "@/types";

const selectedProduct = ref([]);
const props = defineProps<{
    sells: SellWithPaginate;
    user: User;
    search: {
        start_date: string;
        end_date: string;
        product: string;
        date: string;
    };
}>();

const query = reactive({
    page: 1,
    start_date: props.search.start_date ?? "",
    end_date: props.search.end_date ?? "",
    product: props.search.product ?? "",
    date: props.search.date ?? "",
});

const clearEmptyQuery = () => {
    for (const key in query) {
        if (query[key] === "") {
            delete query[key];
        }
    }
};

const linksWithSearch = computed(() => {
    return props.sells.links.map((link) => {
        if (link.url === null) return link

        let url = new URL(link.url);

        for (const key in query) {
            if (key === "page") continue;
            if (query[key] === "") continue;
            url.searchParams.set(key, query[key]);
        }

        return {
            ...link,
            url: `${url}`,
        };
    });
});

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

const handleSearch = () => {
    clearEmptyQuery();

    router.get(
        route("sells.index", { ...query }),
        {},
        {
            preserveState: true,
        }
    );
};

const searchSellsByDate = (date) => {
    query.date = date;
    handleSearch();
};

const clearSearch = () => {
    router.get(route("sells.index"));
};

const searchSellsByProducts = (search) => {
    query.product = search;
    handleSearch();
};

const searchSellsByPeriodFrom = (date) => {
    query.start_date = date;
};

const searchSellsByPeriodTo = (date) => {
    query.end_date = date;
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
            <div class="grid gap-2 justify-center items-center">
                <h2 class="text-xl font-bold text-center">Pesquisas</h2>
                <div class="flex gap-6 flex-col lg:items-center lg:justify-center lg:flex-row">
                    <div class="grid gap-2 my-2">
                        <h3 class="text-lx font-semibold">
                            Pesquisa por Produto
                        </h3>
                        <div class="flex items-center gap-4">
                            <SearchInput
                                @search="searchSellsByProducts"
                                :q="search.product"
                            />
                        </div>
                    </div>
                    <div class="grid gap-2 my-2">
                        <h3 class="text-lx font-semibold">Pesquisa por Data</h3>
                        <div class="flex items-center gap-4">
                            <DateInput
                                @searchDate="searchSellsByDate"
                                :d="search.date"
                            />
                        </div>
                    </div>

                    <div class="grid gap-2 my-2">
                        <h3 class="text-lx font-semibold">
                            Pesquisa por Período
                        </h3>
                        <div class="flex lg:items-center flex-col lg:flex-row gap-4">
                            <DateInput
                                @searchDate="searchSellsByPeriodFrom"
                                :d="search.start_date"
                            />
                            até
                            <DateInput
                                @searchDate="searchSellsByPeriodTo"
                                :d="search.end_date"
                            />
                        </div>
                    </div>
                </div>
                <div class="grid lg:grid-cols-3 gap-6">
                    <button class="btn btn-primary lg:col-span-2" @click="handleSearch">
                        Pesquisar
                    </button>
                    <button class="btn btn-secondary" @click="clearSearch">
                        Limpar
                    </button>
                </div>
            </div>
            <div class="min-h-[20vh] flex flex-col mt-6">
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
                                <td
                                    v-if="
                                        user.role !== 'cashier' &&
                                        sameDay(
                                            sell.cashier.created_at,
                                            new Date()
                                        )
                                    "
                                >
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
            <pagination class="mt-6" :links="linksWithSearch" />
        </SectionContainer>
    </AuthenticatedLayout>
</template>
