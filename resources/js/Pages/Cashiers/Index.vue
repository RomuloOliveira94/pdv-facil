<script setup>
import SectionContainer from "@/Components/SectionContainer.vue";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout.vue";
import { formatDate } from "@/utils";
import { Head, Link } from "@inertiajs/vue3";

defineProps({
    cashiers: Object,
});
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
                            <th>Data</th>
                            <th>Total</th>
                            <th>Vendas</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="cashier in cashiers" :key="cashier.id">
                            <th>{{ cashier.id }}</th>
                            <td>{{ cashier.company.name }}</td>
                            <td>{{ formatDate(cashier.created_at) }}</td>
                            <td>{{ cashier.total }}</td>
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
                        </tr>
                    </tbody>
                    <tfoot>
                        <tr>
                            <th></th>
                            <th>Empresa</th>
                            <th>Data</th>
                            <th>Total</th>
                            <th>Vendas</th>
                        </tr>
                    </tfoot>
                </table>
            </div>
        </SectionContainer>
    </AuthenticatedLayout>
</template>
