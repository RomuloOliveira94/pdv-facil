<script setup>
import EasyPdvLogo from "@/Components/EasyPdvLogo.vue";
import PrimaryButton from "@/Components/PrimaryButton.vue";
import { Link } from "@inertiajs/vue3";
</script>

<template>
    <div
        class="min-h-screen flex flex-col sm:justify-center items-center p-6 sm:pt-0 bg-[#FFF6E6]"
    >
        <header>
            <h1 class="text-4xl font-bold text-gray-800">
                Crie sua conta ou faça login.
            </h1>
            <nav class="flex items-center gap-4 mt-4">
                <Link
                    :href="route('login')"
                    class="underline text-lg text-gray-600 hover:text-gray-900"
                >
                    <PrimaryButton class="bg-white hover:bg-[#FFF6E6]"> Entrar </PrimaryButton>
                </Link>
                <Link>
                    <Link
                        :href="route('register')"
                        class="underline text-lg text-gray-600 hover:text-gray-900"
                    >
                        <PrimaryButton class="bg-white hover:bg-[#FFF6E6]">
                            Criar uma conta
                        </PrimaryButton>
                    </Link>
                </Link>
            </nav>
        </header>
        <div>
            <Link href="/">
                <EasyPdvLogo class="w-60 h-60 fill-current text-gray-500" />
            </Link>
        </div>

        <div
            class="w-full sm:max-w-md mt-6 px-6 py-4 bg-white shadow-md overflow-hidden sm:rounded-lg"
        >
            <slot />
        </div>
    </div>
</template>
