<script setup lang="ts">
import EasyPdvLogo from "../EasyPdvLogo.vue";
import AdminSideBarNavLink from "./AdminSideBarNavLink.vue";

defineProps<{
    open: boolean;
}>();
</script>
<template>
    <div
        :class="open ? 'block' : 'hidden'"
        @click="$emit('sidebar-open', !open)"
        class="fixed inset-0 z-20 transition-opacity bg-black opacity-50 lg:hidden"
    ></div>

    <div
        :class="open ? 'translate-x-0 ease-out' : '-translate-x-full ease-in'"
        class="fixed inset-y-0 left-0 z-30 w-64 overflow-y-auto transition duration-300 transform bg-primary lg:translate-x-0 lg:static lg:inset-0"
    >
        <div class="flex items-center justify-center mt-8">
            <div class="flex items-center flex-col justify-center gap-4">
                <EasyPdvLogo />

                <span class="mx-2 text-2xl font-semibold text-gray-700"
                    >Administração</span
                >
            </div>
        </div>

        <nav class="mt-10">
            <AdminSideBarNavLink
                :active="route().current('admin.index')"
                :href="route('admin.index')"
            >
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    class="w-6 h-6"
                    viewBox="0 0 24 24"
                >
                    <path
                        fill="currentColor"
                        d="M13 9V3h8v6zM3 13V3h8v10zm10 8V11h8v10zM3 21v-6h8v6z"
                    />
                </svg>

                <span class="mx-3">Inicio</span>
            </AdminSideBarNavLink>

            <AdminSideBarNavLink
                :active="route().current('dashboard')"
                :href="'/'"
            >
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    class="w-6 h-6"
                    viewBox="0 0 24 24"
                >
                    <path
                        fill="currentColor"
                        d="M13.07 10.41a5 5 0 0 0 0-5.82A3.4 3.4 0 0 1 15 4a3.5 3.5 0 0 1 0 7a3.4 3.4 0 0 1-1.93-.59M5.5 7.5A3.5 3.5 0 1 1 9 11a3.5 3.5 0 0 1-3.5-3.5m2 0A1.5 1.5 0 1 0 9 6a1.5 1.5 0 0 0-1.5 1.5M16 17v2H2v-2s0-4 7-4s7 4 7 4m-2 0c-.14-.78-1.33-2-5-2s-4.93 1.31-5 2m11.95-4A5.32 5.32 0 0 1 18 17v2h4v-2s0-3.63-6.06-4Z"
                    />
                </svg>

                <span class="mx-3">Usuários</span>
            </AdminSideBarNavLink>

            <AdminSideBarNavLink
                :active="route().current('dashboard')"
                :href="'/'"
            >
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    class="w-6 h-6"
                    viewBox="0 0 24 24"
                >
                    <path
                        fill="currentColor"
                        d="M18 23v-3h-3v-2h3v-3h2v3h3v2h-3v3zM2 20v-6H1v-2l1-5h15l1 5v2h-1v3h-2v-3h-4v6zm2-2h5v-4H4zm-.95-6h12.9zM2 6V4h15v2zm1.05 6h12.9l-.6-3H3.65z"
                    />
                </svg>

                <span class="mx-3">Empresas</span>
            </AdminSideBarNavLink>

            <AdminSideBarNavLink
                :active="route().current('dashboard')"
                :href="'/'"
            >
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    class="w-6 h-6"
                    viewBox="0 0 24 24"
                >
                    <path
                        fill="currentColor"
                        d="M19.9 12.66a1 1 0 0 1 0-1.32l1.28-1.44a1 1 0 0 0 .12-1.17l-2-3.46a1 1 0 0 0-1.07-.48l-1.88.38a1 1 0 0 1-1.15-.66l-.61-1.83a1 1 0 0 0-.95-.68h-4a1 1 0 0 0-1 .68l-.56 1.83a1 1 0 0 1-1.15.66L5 4.79a1 1 0 0 0-1 .48L2 8.73a1 1 0 0 0 .1 1.17l1.27 1.44a1 1 0 0 1 0 1.32L2.1 14.1a1 1 0 0 0-.1 1.17l2 3.46a1 1 0 0 0 1.07.48l1.88-.38a1 1 0 0 1 1.15.66l.61 1.83a1 1 0 0 0 1 .68h4a1 1 0 0 0 .95-.68l.61-1.83a1 1 0 0 1 1.15-.66l1.88.38a1 1 0 0 0 1.07-.48l2-3.46a1 1 0 0 0-.12-1.17ZM18.41 14l.8.9l-1.28 2.22l-1.18-.24a3 3 0 0 0-3.45 2L12.92 20h-2.56L10 18.86a3 3 0 0 0-3.45-2l-1.18.24l-1.3-2.21l.8-.9a3 3 0 0 0 0-4l-.8-.9l1.28-2.2l1.18.24a3 3 0 0 0 3.45-2L10.36 4h2.56l.38 1.14a3 3 0 0 0 3.45 2l1.18-.24l1.28 2.22l-.8.9a3 3 0 0 0 0 3.98m-6.77-6a4 4 0 1 0 4 4a4 4 0 0 0-4-4m0 6a2 2 0 1 1 2-2a2 2 0 0 1-2 2"
                    />
                </svg>

                <span class="mx-3">Configurações</span>
            </AdminSideBarNavLink>
        </nav>
    </div>
</template>
