<script setup>
import InputLabel from "@/Components/InputLabel.vue";
import SectionContainer from "@/Components/SectionContainer.vue";
import TextInput from "@/Components/TextInput.vue";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout.vue";
import { vMaska } from "maska";
import { Head, router } from "@inertiajs/vue3";
import { defineProps, reactive, computed, ref } from "vue";

defineProps({
    products: Object,
    paymentMethods: Object,
});

const showDiscount = ref(false);

const sell = reactive({
    products: [],
    delivery: "",
    discount: "",
    paymentMethod: null,
    total: 0,
});

const sellSubTotal = computed(() => {
    return sell.products
        .reduce((acc, product) => acc + product.price * product.quantity, 0)
        .toLocaleString("pt-BR", {
            minimumFractionDigits: 2,
            style: "currency",
            currency: "BRL",
        });
});

const deliveryTax = computed(() => {
    return sell.delivery ? parseFloat(sell.delivery.replace(",", ".")) : 0;
});

const discount = computed(() => {
    return sell.discount ? parseFloat(sell.discount.replace(",", ".")) : 0;
});

const sellTotal = computed(() => {
    const paymentMethodTaxIfCredit = sell.paymentMethod === 1 ? 5 : 0;
    const subtotal = sell.products.reduce(
        (acc, product) => acc + product.price * product.quantity,
        0
    );

    const total = subtotal + deliveryTax.value - discount.value;

    const totalWithPercentage =
        total + total * (paymentMethodTaxIfCredit / 100);

    return totalWithPercentage.toLocaleString("pt-BR", {
        minimumFractionDigits: 2,
        style: "currency",
        currency: "BRL",
    });
});

const addProduct = (product) => {
    const productIndex = sell.products.findIndex((p) => p.id === product.id);

    if (productIndex === -1) {
        sell.products.push({
            id: product.id,
            name: product.name,
            price: product.price,
            quantity: 1,
        });
    } else {
        sell.products[productIndex].quantity++;
    }

    sell.total = sell.products.reduce(
        (acc, product) => acc + product.price * product.quantity,
        0
    );
};

const removeProduct = (product) => {
    const productIndex = sell.products.findIndex((p) => p.id === product.id);

    if (productIndex !== -1) {
        if (sell.products[productIndex].quantity > 1) {
            sell.products[productIndex].quantity--;
        } else {
            sell.products.splice(productIndex, 1);
        }
    }

    sell.total = sell.products.reduce(
        (acc, product) => acc + product.price * product.quantity,
        0
    );
};

const createSell = () => {
    const data = {
        products: sell.products.map((product) => ({
            id: product.id,
            quantity: product.quantity,
        })),
        delivery_tax: deliveryTax.value,
        discount: discount.value,
        payment_type_id: sell.paymentMethod,
        subtotal: sell.total,
        total: sell.total + deliveryTax.value - discount.value,
    };

    router.post(route("sells.store"), data);
};
</script>

<template>
    <Head title="Venda" />

    <AuthenticatedLayout>
        <template #header>
            <h2 class="font-semibold text-xl text-gray-800 leading-tight">
                Registar Venda
            </h2>
        </template>
        <div class="mb-6">
            <h1 class="text-xl font-bold mb-2 text-gray-800 text-center">
                Produtos
            </h1>
            <div class="grid grid-cols-4 w-full gap-3 text-gray-800">
                <div
                    v-for="(product, index) in products"
                    :key="index"
                    class="card card-side border border-slate-100 items-center"
                >
                    <div class="p-2 w-full grid gap-3">
                        <figure v-show="product.imageUrl" class="w-full h-32">
                            <img
                                :src="product.imageUrl"
                                :alt="product.name"
                                class="object-cover w-full h-full rounded-lg"
                            />
                        </figure>
                        <div class="flex justify-between w-full items-center">
                            <div>
                                <h2 class="card-title">{{ product.name }}</h2>
                                <p>
                                    {{
                                        product.price.toLocaleString("pt-BR", {
                                            minimumFractionDigits: 2,
                                            style: "currency",
                                            currency: "BRL",
                                        })
                                    }}
                                </p>
                            </div>
                            <div class="card-actions justify-end flex-col">
                                <button
                                    @click="addProduct(product)"
                                    class="btn btn-info btn-sm w-full"
                                >
                                    Adicionar
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <SectionContainer class="min-h-[20vh] flex flex-col">
            <h1 class="text-xl font-semibold mb-6">Venda</h1>
            <div class="">
                <ul>
                    <li>
                        <div class="grid grid-cols-5">
                            <span class="font-semibold">Produto</span>
                            <span class="font-semibold">Preço</span>
                            <span class="font-semibold">Quantidade</span>
                            <span class="font-semibold">Total</span>
                            <span class="text-end font-semibold">Remover</span>
                        </div>
                    </li>
                    <li v-for="(product, index) in sell.products" :key="index">
                        <div class="grid grid-cols-5">
                            <span>{{ product.name }}</span>
                            <span>
                                {{
                                    product.price.toLocaleString("pt-BR", {
                                        minimumFractionDigits: 2,
                                        style: "currency",
                                        currency: "BRL",
                                    })
                                }}
                            </span>
                            <span class="ml-10">{{ product.quantity }}</span>
                            <span>
                                {{
                                    (
                                        product.price * product.quantity
                                    ).toLocaleString("pt-BR", {
                                        minimumFractionDigits: 2,
                                        style: "currency",
                                        currency: "BRL",
                                    })
                                }}
                            </span>
                            <div
                                class="flex items-center justify-end w-full h-full"
                            >
                                <button
                                    @click="removeProduct(product)"
                                    class="font-semibold bg-error rounded-full h-6 w-6 my-0.5 text-white cursor-pointer hover:bg-red-600 text-center"
                                >
                                    X
                                </button>
                            </div>
                        </div>
                    </li>
                </ul>
            </div>
            <hr class="my-6" />
            <button
                v-if="sell.total > 0"
                class="btn btn-link"
                @click="showDiscount = !showDiscount"
            >
                {{
                    !showDiscount ? "Adicionar desconto?" : "Remover desconto."
                }}
            </button>
            <div
                v-if="sell.total > 0"
                class="flex justify-center gap-3 h-full w-full items-center"
            >
                <div>
                    <InputLabel for="delivery" value="Taxa de entrega" />

                    <TextInput
                        id="delivery"
                        type="text"
                        class="block w-full"
                        v-model="sell.delivery"
                        autofocus
                        autocomplete="delivery"
                        v-maska
                        data-maska="0.99"
                        data-maska-tokens="0:\d:multiple|9:\d:optional"
                        placeholder="R$ 00.00"
                    />
                </div>

                <div v-show="showDiscount">
                    <InputLabel for="discount" value="Desconto" />

                    <TextInput
                        id="discount"
                        type="text"
                        class="block w-full"
                        v-model="sell.discount"
                        autofocus
                        autocomplete="discount"
                        v-maska
                        data-maska="0.99"
                        data-maska-tokens="0:\d:multiple|9:\d:optional"
                        placeholder="R$ 00.00"
                    />
                </div>

                <select
                    class="border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 rounded-md shadow-sm self-end"
                    @input="teste"
                    v-model="sell.paymentMethod"
                >
                    <option disabled selected>Pagamento</option>
                    <option
                        v-for="(payment, index) in paymentMethods"
                        :key="index"
                        :value="payment.id"
                    >
                        {{ payment.name }}
                    </option>
                </select>
                <div class="self-end">
                    <h2 class="font-semibold text-lg text-gray-800">
                        Subtotal: {{ sellSubTotal }}
                    </h2>

                    <h2 class="font-semibold text-lg text-gray-800">
                        Total:
                        {{ sellTotal }}
                    </h2>
                </div>
            </div>
            <button
                @click="createSell"
                class="btn btn-primary self-center mt-6 w-1/2 text-xl"
            >
                Criar venda
            </button>
        </SectionContainer>
    </AuthenticatedLayout>
</template>
