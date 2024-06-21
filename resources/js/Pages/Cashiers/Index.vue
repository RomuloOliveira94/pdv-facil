<script setup>
import SectionContainer from "@/Components/SectionContainer.vue";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout.vue";
import { formatDate, formatMoneyToBRL } from "@/utils";
import { Head, Link, router } from "@inertiajs/vue3";

defineProps({
    cashiers: Object,
});

const handleCloseCashier = (cashier) => {
    router.patch(route("cashiers.update", cashier));
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
            <div class="overflow-x-auto">
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
                                    $page.props.auth.user.role !== 'cashier'
                                "
                            >
                                Fechar
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="cashier in cashiers" :key="cashier.id">
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
                                    $page.props.auth.user.role !== 'cashier'
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
                                    $page.props.auth.user.role !== 'cashier'
                                "
                            >
                                Fechar
                            </th>
                        </tr>
                    </tfoot>
                </table>
            </div>
        </SectionContainer>
    </AuthenticatedLayout>
</template>
