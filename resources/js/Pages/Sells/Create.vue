<script setup lang="ts">
import InputLabel from "@/Components/InputLabel.vue";
import SectionContainer from "@/Components/SectionContainer.vue";
import TextInput from "@/Components/TextInput.vue";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout.vue";
import ToastSuccess from "@/Components/ToastSuccess.vue";
import ToastError from "@/Components/ToastError.vue";
import { vMaska } from "maska";
import { Head, router } from "@inertiajs/vue3";
import { reactive, computed, ref } from "vue";
import { formatMoneyToBRL } from "@/utils";
import { Cashier } from "../Cashiers/types";
import { Product } from "../Products/types";
import { PaymentMethods } from "./types";

const props = defineProps<{
    cashier: Cashier;
    products: Product[];
    paymentMethods: PaymentMethods[];
}>();

const showDiscount = ref(false);
const showSuccessToast = ref(false);
const showErrorToast = ref(false);

const sell = reactive({
    products: [],
    delivery: "",
    discount: "",
    paymentMethod: null,
    total: 0,
});

const sellSubTotal = computed(() => {
    return formatMoneyToBRL(
        sell.products.reduce(
            (acc, product) => acc + product.price * product.quantity,
            0
        )
    );
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

    return formatMoneyToBRL(totalWithPercentage);
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
            price: product.quantity * product.price,
        })),
        cashier_id: props.cashier.id,
        delivery_tax: deliveryTax.value,
        discount: discount.value,
        payment_type_id: sell.paymentMethod,
        subtotal: sell.total,
        total: sell.total + deliveryTax.value - discount.value,
    };

    //clear sell
    sell.products = [];
    sell.delivery = "";
    sell.discount = "";
    sell.paymentMethod = null;
    sell.total = 0;

    router.post(route("sells.store"), data);

    router.on("success", () => {
        showSuccessToast.value = true;
        setTimeout(() => {
            showSuccessToast.value = false;
        }, 4000);
    });

    router.on("error", () => {
        showErrorToast.value = true;
        setTimeout(() => {
            showErrorToast.value = false;
        }, 4000);
    });
};

const openCashier = () => {
    router.post(route("cashiers.store"));
};

const closeCashier = (id) => {
    confirm("Deseja realmente fechar o caixa?") &&
        router.put(route("cashiers.update", props.cashier.id));
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
            <div class="grid md:grid-cols-4 mx-auto gap-3 text-gray-800 w-fit">
                <div
                    v-for="(product, index) in products"
                    :key="index"
                    class="card card-side border border-slate-50 items-center shadow-sm"
                >
                    <div class="p-2 grid gap-3 w-full">
                        <figure v-show="product.imageUrl" class="w-full h-32">
                            <img
                                :src="'/storage/' + product.imageUrl"
                                :alt="product.name"
                                class="object-cover w-full h-full rounded-lg"
                            />
                        </figure>
                        <div class="flex justify-between items-center">
                            <div class="w-48">
                                <h2
                                    class="text-wrap truncate ... font-semibold text-lg"
                                >
                                    {{ product.name }}
                                </h2>
                                <p>
                                    {{ formatMoneyToBRL(product.price) }}
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

        <button
            v-if="!cashier || !cashier?.active"
            class="btn btn-primary btn-lg w-full"
            @click="openCashier"
        >
            Abrir Caixa
        </button>

        <SectionContainer
            class="min-h-[20vh] flex flex-col"
            v-if="cashier && cashier?.active"
        >
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
                                {{ formatMoneyToBRL(product.price) }}
                            </span>
                            <span class="ml-10">{{ product.quantity }}</span>
                            <span>
                                {{
                                    formatMoneyToBRL(
                                        product.price * product.quantity
                                    )
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

        <button
            v-if="cashier && cashier?.active"
            class="btn btn-error btn-lg w-full mt-6"
            @click="closeCashier"
        >
            Fechar Caixa
        </button>
        <ToastSuccess v-if="showSuccessToast">
            Venda criada com sucesso!
        </ToastSuccess>

        <ToastError v-if="showErrorToast"> Erro ao criar venda! </ToastError>
    </AuthenticatedLayout>
</template>
