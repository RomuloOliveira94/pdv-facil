<script setup>
import SectionContainer from "@/Components/SectionContainer.vue";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout.vue";
import { Head, Link } from "@inertiajs/vue3";
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
            <Link :href="route('products.create')"  class="btn btn-primary">Criar Novo Produto</Link>
        </div>
        <SectionContainer>
            <div class="card card-side bg-base-100 shadow-xl">
                <figure>
                    <img
                        src="https://img.daisyui.com/images/stock/photo-1635805737707-575885ab0820.jpg"
                        alt="Movie"
                    />
                </figure>
                <div class="card-body">
                    <h2 class="card-title">New movie is released!</h2>
                    <p>Click the button to watch on Jetflix app.</p>
                    <div class="card-actions justify-end">
                        <button class="btn btn-primary">Watch</button>
                    </div>
                </div>
            </div>
        </SectionContainer>
    </AuthenticatedLayout>
</template>
