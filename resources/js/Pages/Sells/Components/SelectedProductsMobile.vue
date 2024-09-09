<script setup>
import { formatMoneyToBRL } from "@/utils";

const props = defineProps({
    selectedProducts: Array,
});
</script>

<template>
    <div v-if="selectedProducts.length" class="overflow-x-auto md:hidden my-4">
        <table class="table">
            <thead>
                <tr>
                    <th>Produto</th>
                    <th>Total</th>
                    <th></th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="(product, index) in selectedProducts" :key="index">
                    <td>
                        <div class="grid">
                            <p class="line-clamp-1 font-semibold">
                                {{ product.name }}
                            </p>
                            <p
                                class="line-clamp-1 flex items-center justify-center gap-2"
                            >
                                {{ formatMoneyToBRL(product.price) }} x{{
                                    product.quantity
                                }}
                            </p>
                        </div>
                    </td>
                    <td>
                        {{ formatMoneyToBRL(product.price * product.quantity) }}
                    </td>
                    <td>
                        <button
                            @click="$emit('remove-product', product)"
                            class="font-semibold bg-error rounded-full h-6 w-6 my-0.5 text-white cursor-pointer hover:bg-red-600 text-center"
                        >
                            X
                        </button>
                    </td>
                </tr>
            </tbody>
        </table>
    </div>
</template>
