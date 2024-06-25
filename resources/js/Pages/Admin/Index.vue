<script setup lang="ts">
import AdminLayout from "@/Layouts/AdminLayout.vue";
import UsersTable from "@/Components/Admin/UsersTable.vue";
import Cards from "./Components/Cards.vue";
import { Head } from "@inertiajs/vue3";
</script>
<template>
    <AdminLayout>
        <Head title="Dashboard" />
        <div class="container mx-auto px-6 py-8">
            <h3 class="text-gray-700 text-3xl font-medium">
                Painel Administrativo
            </h3>
            <Cards />
            <div class="mt-8"></div>
            <UsersTable />
        </div>
    </AdminLayout>
</template>

<style scoped></style>
