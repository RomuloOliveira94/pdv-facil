<script setup>
import { formatMoneyToBRL } from "@/utils";

const props = defineProps({
    products: Object,
});
</script>
<template>
    <div>
        <dialog id="productModal" class="modal w-full">
            <div class="modal-box bg-white">
                <form method="dialog">
                    <button
                        class="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
                    >
                        ✕
                    </button>
                </form>
                <div class="w-full">
                    <table class="table">
                        <thead class="text-black font-bold text-lg">
                            <tr>
                                <th>Produto</th>
                                <th>Valor</th>
                                <th>Quantidade</th>
                                <th>Total</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="product in products" :key="product.id">
                                <td>
                                    <p class="w-36 truncate ...">
                                        {{ product.name }}
                                    </p>
                                </td>
                                <td>
                                    {{ formatMoneyToBRL(product.price) }}
                                </td>
                                <td>{{ product.pivot.quantity }}</td>
                                <td>
                                    {{ formatMoneyToBRL(product.pivot.price) }}
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </dialog>
    </div>
</template>
