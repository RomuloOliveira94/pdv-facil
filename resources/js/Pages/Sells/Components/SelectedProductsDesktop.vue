<script setup>
import { formatMoneyToBRL } from "@/utils";

const props = defineProps({
    selectedProducts: Array,
});
</script>

<template>
    <div v-if="selectedProducts.length" class="overflow-x-auto hidden md:block">
        <table class="table table-lg">
            <!-- head -->
            <thead>
                <tr>
                    <th>Produto</th>
                    <th>Preço</th>
                    <th>Quantidade</th>
                    <th>Total</th>
                    <th></th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="(product, index) in selectedProducts" :key="index">
                    <td>{{ product.name }}</td>
                    <td>{{ formatMoneyToBRL(product.price) }}</td>
                    <td>x{{ product.quantity }}</td>
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
