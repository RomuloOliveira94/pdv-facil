<script setup lang="ts">
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout.vue";
import { Head, Link, router } from "@inertiajs/vue3";
</script>

<template>
    <AuthenticatedLayout>
        <Head title="Inicio" />
        <template #header>
            <h2
                class="font-semibold text-2xl text-gray-800 leading-tight text-center"
            >
                Bem vindo {{ $page.props.auth.user.name }}
            </h2>
        </template>

        <section>
            <div class="mb-6">
                <h3 class="text-gray-700 text-3xl font-medium mt-6">
                    Ações Rápidas
                </h3>
            </div>
            <div class="flex flex-wrap -mx-6">
                <Link
                    class="w-full mt-6 px-6 sm:w-1/2 xl:w-1/3 xl:mt-0"
                    :href="route('sells.create')"
                >
                    <div
                        class="flex items-center px-5 py-6 shadow-sm rounded-md bg-white"
                    >
                        <div
                            class="p-3 rounded-full bg-secondary bg-opacity-75"
                        >
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                class="h-8 w-8 text-white"
                                viewBox="0 0 24 24"
                            >
                                <path
                                    fill="currentColor"
                                    d="M6.25 2A2.25 2.25 0 0 0 4 4.25v15.5A2.25 2.25 0 0 0 6.25 22h7.5A2.25 2.25 0 0 0 16 19.771v-1.52a.75.75 0 0 0-.75-.75c-.453 0-.739-.123-.936-.282c-.208-.167-.38-.425-.511-.789c-.273-.755-.302-1.75-.302-2.68a.75.75 0 0 0-.202-.512l-.165-.177a3 3 0 0 0-.17-.173c-.074-.07-.3-.285-1.183-1.168c-.469-.469-.728-.865-.813-1.168a.6.6 0 0 1-.016-.325a.7.7 0 0 1 .205-.323a.7.7 0 0 1 .322-.204a.6.6 0 0 1 .324.016c.302.085.698.346 1.167.815c.54.54 1.053 1.047 1.512 1.5c.76.752 1.373 1.36 1.72 1.73a.75.75 0 0 0 1.097-1.023A55 55 0 0 0 16 11.424V8.06l2.842 2.842c.421.422.659.994.659 1.59v8.758a.75.75 0 0 0 1.5 0v-8.757a3.75 3.75 0 0 0-1.099-2.652L16 5.939v-1.69A2.25 2.25 0 0 0 13.75 2zm6.142 14.94c.097.268.222.534.384.782A2.25 2.25 0 0 0 11.5 19.75v.75h-3v-.75a2.25 2.25 0 0 0-2.25-2.25H5.5v-11h.75A2.25 2.25 0 0 0 8.5 4.25V3.5h3v.75a2.25 2.25 0 0 0 2.25 2.25h.75v3.438l-.469-.468c-.531-.531-1.148-1.008-1.821-1.198a2.1 2.1 0 0 0-1.104-.025a2 2 0 0 0-.632.285a3.5 3.5 0 1 0 1.55 6.324c.037.684.13 1.427.368 2.084M8 12a2 2 0 0 1 1.456-1.925a2.2 2.2 0 0 0 .068.883c.189.673.665 1.291 1.197 1.823l.665.662A2 2 0 0 1 8 12M5.5 4.25a.75.75 0 0 1 .75-.75H7v.75a.75.75 0 0 1-.75.75H5.5zM13 3.5h.75a.75.75 0 0 1 .75.75V5h-.75a.75.75 0 0 1-.75-.75zM14.5 19v.75a.75.75 0 0 1-.75.75H13v-.75a.75.75 0 0 1 .75-.75zM7 20.5h-.75a.75.75 0 0 1-.75-.75V19h.75a.75.75 0 0 1 .75.75z"
                                />
                            </svg>
                        </div>
                        <div class="mx-5">
                            <h4 class="text-2xl font-semibold text-gray-700">
                                Fazer uma venda.
                            </h4>
                            <div class="text-gray-500">
                                Clique aqui para vender!
                            </div>
                        </div>
                    </div>
                </Link>

                <Link
                    class="w-full mt-6 px-6 sm:w-1/2 xl:w-1/3 xl:mt-0"
                    :href="route('sells.index')"
                >
                    <div
                        class="flex items-center px-5 py-6 shadow-sm rounded-md bg-white"
                    >
                        <div
                            class="p-3 rounded-full bg-green-500 bg-opacity-75"
                        >
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                class="h-8 w-8 text-white"
                                viewBox="0 0 24 24"
                            >
                                <path
                                    fill="currentColor"
                                    d="M3 22V3h18v19l-3-2l-3 2l-3-2l-3 2l-3-2zM17 9V7h-2v2zm-4 0V7H7v2zm0 2H7v2h6zm2 2h2v-2h-2z"
                                />
                            </svg>
                        </div>
                        <div class="mx-5">
                            <h4 class="text-2xl font-semibold text-gray-700">
                                Ver vendas.
                            </h4>
                            <div class="text-gray-500">
                                Clique aqui ver suas vendas.
                            </div>
                        </div>
                    </div>
                </Link>

                <Link
                    class="w-full mt-6 px-6 sm:w-1/2 xl:w-1/3 xl:mt-0"
                    :href="route('cashiers.index')"
                >
                    <div
                        class="flex items-center px-5 py-6 shadow-sm rounded-md bg-white"
                    >
                        <div class="p-3 rounded-full bg-pink-600 bg-opacity-75">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                class="h-8 w-8 text-white"
                                viewBox="0 0 24 24"
                            >
                                <g
                                    fill="none"
                                    stroke="currentColor"
                                    stroke-linecap="round"
                                    stroke-linejoin="round"
                                    stroke-width="1.5"
                                    color="currentColor"
                                >
                                    <path
                                        d="M16.667 14H7.333c-2.186 0-3.279 0-4.054.543c-.286.2-.536.45-.736.736C2 16.054 2 17.147 2 19.333c0 1.093 0 1.64.271 2.027q.151.217.369.369c.387.271.934.271 2.027.271h14.666c1.093 0 1.64 0 2.027-.271q.217-.152.369-.369c.271-.387.271-.934.271-2.027c0-2.186 0-3.279-.543-4.054c-.2-.286-.45-.536-.736-.736C19.946 14 18.853 14 16.667 14M20 14l-.407-3.663c-.282-2.538-.423-3.808-1.277-4.572C17.46 5 16.184 5 13.63 5h-3.26c-2.554 0-3.831 0-4.686.765c-.854.764-.995 2.034-1.277 4.572L4 14m7.5-12H14m2.5 0H14m0 0v3"
                                    />
                                    <path
                                        d="m9 17.5l.996.664a2 2 0 0 0 1.11.336h1.788a2 2 0 0 0 1.11-.336L15 17.5M8 8h2"
                                    />
                                </g>
                            </svg>
                        </div>
                        <div class="mx-5">
                            <h4 class="text-2xl font-semibold text-gray-700">
                                Ver Caixas.
                            </h4>
                            <div class="text-gray-500">
                                Clique aqui para ver
                            </div>
                        </div>
                    </div>
                </Link>
            </div>
        </section>

        <section class="mt-6">
            <h3 class="text-gray-700 text-3xl font-medium mb-4">
                Informações sobre seu Negócio
            </h3>
            <div class="mb-4">
                <div class="flex flex-wrap -mx-6">
                    <div class="w-full px-6 sm:w-1/2 xl:w-1/3">
                        <div
                            class="flex items-center px-5 py-6 shadow-sm rounded-md bg-white"
                        >
                            <div
                                class="p-3 rounded-full bg-secondary bg-opacity-75"
                            >
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="36"
                                    height="36"
                                    class="h-8 w-8 text-white"
                                    viewBox="0 0 24 24"
                                >
                                    <path
                                        fill="currentColor"
                                        d="m21.41 11.41l-8.83-8.83c-.37-.37-.88-.58-1.41-.58H4c-1.1 0-2 .9-2 2v7.17c0 .53.21 1.04.59 1.41l8.83 8.83c.78.78 2.05.78 2.83 0l7.17-7.17c.78-.78.78-2.04-.01-2.83M6.5 8C5.67 8 5 7.33 5 6.5S5.67 5 6.5 5S8 5.67 8 6.5S7.33 8 6.5 8"
                                    />
                                </svg>
                            </div>

                            <div class="mx-5">
                                <h4
                                    class="text-2xl font-semibold text-gray-700"
                                >
                                    158
                                </h4>
                                <div class="text-gray-500">Vendas este Mês</div>
                            </div>
                        </div>
                    </div>

                    <div class="w-full mt-6 px-6 sm:w-1/2 xl:w-1/3 sm:mt-0">
                        <div
                            class="flex items-center px-5 py-6 shadow-sm rounded-md bg-white"
                        >
                            <div
                                class="p-3 rounded-full bg-lime-600 bg-opacity-75"
                            >
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    class="h-8 w-8 text-white"
                                    viewBox="0 0 20 20"
                                >
                                    <path
                                        fill="currentColor"
                                        d="M10.6 9c-.4-.1-.8-.3-1.1-.6c-.3-.1-.4-.4-.4-.6s.1-.5.3-.6c.3-.2.6-.4.9-.3c.6 0 1.1.3 1.4.7l.9-1.2c-.3-.3-.6-.5-.9-.7s-.7-.3-1.1-.3V4H9.4v1.4c-.5.1-1 .4-1.4.8c-.4.5-.7 1.1-.6 1.7c0 .6.2 1.2.6 1.6c.5.5 1.2.8 1.8 1.1c.3.1.7.3 1 .5c.2.2.3.5.3.8q0 .45-.3.9c-.3.3-.7.4-1 .4c-.4 0-.9-.1-1.2-.4c-.3-.2-.6-.5-.8-.8l-1 1.1c.3.4.6.7 1 1c.5.3 1.1.6 1.7.6V16h1.1v-1.5c.6-.1 1.1-.4 1.5-.8c.5-.5.8-1.3.8-2c0-.6-.2-1.3-.7-1.7c-.5-.5-1-.8-1.6-1M10 2c-4.4 0-8 3.6-8 8s3.6 8 8 8s8-3.6 8-8s-3.6-8-8-8m0 14.9c-3.8 0-6.9-3.1-6.9-6.9S6.2 3.1 10 3.1s6.9 3.1 6.9 6.9s-3.1 6.9-6.9 6.9"
                                    />
                                </svg>
                            </div>

                            <div class="mx-5">
                                <h4
                                    class="text-2xl font-semibold text-gray-700"
                                >
                                    R$ 1.900,00
                                </h4>
                                <div class="text-gray-500">
                                    Em dinheiro recebido este mês
                                </div>
                            </div>
                        </div>
                    </div>

                    <div class="w-full mt-6 px-6 sm:w-1/2 xl:w-1/3 xl:mt-0">
                        <div
                            class="flex items-center px-5 py-6 shadow-sm rounded-md bg-white"
                        >
                            <div
                                class="p-3 rounded-full bg-pink-600 bg-opacity-75"
                            >
                                <svg
                                    class="h-8 w-8 text-white"
                                    viewBox="0 0 28 28"
                                    fill="none"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <path
                                        d="M6.99998 11.2H21L22.4 23.8H5.59998L6.99998 11.2Z"
                                        fill="currentColor"
                                        stroke="currentColor"
                                        stroke-width="2"
                                        stroke-linejoin="round"
                                    />
                                    <path
                                        d="M9.79999 8.4C9.79999 6.08041 11.6804 4.2 14 4.2C16.3196 4.2 18.2 6.08041 18.2 8.4V12.6C18.2 14.9197 16.3196 16.8 14 16.8C11.6804 16.8 9.79999 14.9197 9.79999 12.6V8.4Z"
                                        stroke="currentColor"
                                        stroke-width="2"
                                    />
                                </svg>
                            </div>

                            <div class="mx-5">
                                <h4
                                    class="text-2xl font-semibold text-gray-700"
                                >
                                    16
                                </h4>
                                <div class="text-gray-500">
                                    Produtos Cadastrados
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    </AuthenticatedLayout>
</template>
