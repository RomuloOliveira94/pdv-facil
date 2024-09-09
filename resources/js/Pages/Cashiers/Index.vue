<script setup lang="ts">
import SectionContainer from "@/Components/SectionContainer.vue";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout.vue";
import DateInput from "@/Components/DateInput.vue";
import Pagination from "@/Components/Pagination.vue";
import { clearEmptyQuery, formatDate, formatMoneyToBRL } from "@/utils";
import { Head, Link, router } from "@inertiajs/vue3";
import { CashierWithPagination } from "./types";
import { reactive, computed } from "vue";

const props = defineProps<{
    cashiers: CashierWithPagination;
    search: {
        start_date: string;
        end_date: string;
        date: string;
    };
}>();

const query = reactive({
    page: 1,
    start_date: props.search.start_date ?? "",
    end_date: props.search.end_date ?? "",
    date: props.search.date ?? "",
});

const linksWithSearch = computed(() => {
    return props.cashiers.links.map((link) => {
        if (link.url === null) return link;

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

const handleSearch = () => {
    clearEmptyQuery(query);

    if (query.start_date && query.end_date) {
        query.date = "";
    }

    router.get(
        route("cashiers.index", { ...query }),
        {},
        {
            preserveState: true,
            preserveScroll: true,
        }
    );
};

const clearSearch = () => {
    query.start_date = "";
    query.date = "";
    router.get(route("cashiers.index"), {}, { preserveScroll: true });
};

const searchSellsByDate = (date) => {
    query.date = date;
    handleSearch();
};

const searchSellsByPeriodFrom = (date) => {
    query.start_date = date;
};

const searchSellsByPeriodTo = (date) => {
    query.end_date = date;
};

const handleCloseCashier = (cashier) => {
    router.patch(
        route("cashiers.update", cashier),
        {},
        { preserveState: true }
    );
};
</script>

<template>
    <AuthenticatedLayout>
        <Head title="Caixa" />
        <template #header>
            <h2 class="font-semibold text-xl text-gray-800 leading-tight">
                Caixas
            </h2>
        </template>
        <SectionContainer>
            <div v-if="cashiers.data.length" class="grid gap-2 justify-center items-center mb-6">
                <h2 class="text-3xl font-bold text-center">Pesquisas</h2>
                <div
                    class="flex gap-6 flex-col lg:items-center lg:justify-center lg:flex-row"
                >
                    <div class="grid gap-2 my-2">
                        <h3 class="text-lx font-semibold">Pesquisa por Data</h3>
                        <div class="flex items-center gap-4">
                            <DateInput
                                @searchDate="searchSellsByDate"
                                :d="query.date"
                            />
                        </div>
                    </div>

                    <div class="grid gap-2 my-2">
                        <h3 class="text-lx font-semibold">
                            Pesquisa por Período
                        </h3>
                        <div
                            class="flex lg:items-center flex-col lg:flex-row gap-4"
                        >
                            <DateInput
                                @searchDate="searchSellsByPeriodFrom"
                                :d="query.start_date"
                                @keyup.enter="handleSearch"
                            />
                            até
                            <DateInput
                                @searchDate="searchSellsByPeriodTo"
                                :d="query.end_date"
                                @keyup.enter="handleSearch"
                            />
                        </div>
                    </div>
                </div>
                <div class="grid lg:grid-cols-3 gap-6">
                    <button
                        type="button"
                        class="btn btn-primary lg:col-span-2"
                        @click.prevent="handleSearch"
                    >
                        Pesquisar
                    </button>
                    <button
                        type="button"
                        class="btn btn-secondary"
                        @click.prevent="clearSearch"
                    >
                        Limpar
                    </button>
                </div>
            </div>
            <div v-if="!cashiers.data.length" class="text-center">
                <h1 class="text-2xl font-bold py-16">
                    Nenhum caixa encontrado.
                </h1>
            </div>
            <div class="overflow-x-auto" v-if="cashiers.data.length">
                <table class="table table-xs">
                    <thead>
                        <tr>
                            <th></th>
                            <th>Empresa</th>
                            <th>Responsável</th>
                            <th>Data</th>
                            <th>Total</th>
                            <th>Vendas</th>
                            <th>Status</th>
                            <th
                                v-show="
                                ($page.props.auth.user as any).role !== 'cashier'
                                "
                            >
                                Fechar
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="cashier in cashiers.data" :key="cashier.id">
                            <th>{{ cashier.id }}</th>
                            <td>{{ cashier.company.name }}</td>
                            <td>{{ cashier.user.name }}</td>
                            <td>{{ formatDate(cashier.created_at) }}</td>
                            <td>{{ formatMoneyToBRL(cashier.total) }}</td>
                            <td>
                                <Link
                                    :href="
                                        route('sells.index', {
                                            date: cashier.created_at,
                                        })
                                    "
                                    class="btn btn-primary btn-xs"
                                    >Vendas</Link
                                >
                            </td>
                            <td>{{ cashier.active ? "Aberto" : "Fechado" }}</td>
                            <td
                                v-show="
                                    ($page.props.auth.user as any).role !== 'cashier'
                                "
                            >
                                <button @click="handleCloseCashier(cashier.id)">
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        width="22"
                                        height="22"
                                        viewBox="0 0 24 24"
                                    >
                                        <path
                                            fill="currentColor"
                                            d="M4 22V8h3V6q0-2.075 1.463-3.537T12 1t3.538 1.463T17 6v2h3v14zm8-5q.825 0 1.413-.587T14 15t-.587-1.412T12 13t-1.412.588T10 15t.588 1.413T12 17M9 8h6V6q0-1.25-.875-2.125T12 3t-2.125.875T9 6z"
                                        />
                                    </svg>
                                </button>
                            </td>
                        </tr>
                    </tbody>
                    <tfoot>
                        <tr>
                            <th></th>
                            <th>Empresa</th>
                            <th>Responsável</th>
                            <th>Data</th>
                            <th>Total</th>
                            <th>Vendas</th>
                            <th>Status</th>
                            <th
                                v-show="
                                    ($page.props.auth.user as any).role !== 'cashier'
                                "
                            >
                                Fechar
                            </th>
                        </tr>
                    </tfoot>
                </table>
            </div>
            <pagination class="mt-6" :links="linksWithSearch" />
        </SectionContainer>
    </AuthenticatedLayout>
</template>
