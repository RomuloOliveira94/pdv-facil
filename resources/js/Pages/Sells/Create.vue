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
import { formatMoneyToBRL, formatRoles } from "@/utils";
import { Cashier } from "../Cashiers/types";
import Pagination from "@/Components/Pagination.vue";
import { PaymentMethods, ProductWithPaginate } from "./types";

const props = defineProps<{
    cashier: Cashier;
    products: ProductWithPaginate;
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
    return sell.products.reduce(
        (acc, product) => acc + product.price * product.quantity,
        0
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

    return totalWithPercentage;
});

const addProduct = (product) => {
    if (!props.cashier.active) {
        alert("Caixa fechado, abra o caixa para realizar vendas.");
        return;
    }

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

    sell.total = sellTotal.value;
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
        subtotal: sellSubTotal.value,
        total: sellTotal.value,
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
            <div class="flex gap-2 items-center">
                <h2 class="font-semibold text-xl text-gray-800 leading-tight">
                    Registar Venda
                </h2>
                <span class="text-gray-800">|</span>
                <h3 class="text-lg font-bold text-gray-800">
                    Caixa: {{ $page.props.auth.user.name }} -
                    {{ formatRoles(($page.props.auth.user as any).role) }}
                </h3>
            </div>
        </template>
        <div class="mb-6 bg-white p-6 rounded-md">
            <h1 class="text-xl font-bold mb-2 text-gray-800 text-center">
                Produtos
            </h1>
            <div class="grid lg:grid-cols-4 mx-auto gap-3 text-gray-800 w-full">
                <div
                    v-for="(product, index) in products.data"
                    :key="index"
                    class="card card-side border border-slate-50 items-center shadow-sm"
                >
                    <div class="grid p-2 gap-3 w-full">
                        <figure v-show="product" class="h-32 relative">
                            <span
                                v-show="!product.imageUrl"
                                class="text-2xl text-white font-bold absolute top-12 text-center z-10"
                                >{{ product.name }}</span
                            >
                            <div
                                v-show="!product.imageUrl"
                                class="absolute bg-black opacity-80 rounded-lg w-full"
                            ></div>
                            <img
                                :src="
                                    product.imageUrl
                                        ? '/storage/' + product.imageUrl
                                        : '/storage/logos/pdvfacil.png'
                                "
                                :alt="product.name"
                                class="object-cover w-full h-full rounded-lg"
                            />
                        </figure>
                        <div class="flex justify-between items-center w-full">
                            <div>
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
            <pagination class="mt-6" :links="products.links" />
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
            <div class="grid">
                <h1 class="text-xl font-semibold mb-6">Venda</h1>
                <div class="overflow-x-auto">
                    <ul
                        class="overflow-x-auto flex justify-between md:grid md:grid-cols-1 min-w-full gap-12 md:gap-2"
                    >
                        <li>
                            <div class="grid md:grid-cols-5 gap-1">
                                <span class="font-semibold">Produto</span>
                                <span class="font-semibold">Preço</span>
                                <span class="font-semibold">Quantidade</span>
                                <span class="font-semibold">Total</span>
                                <span class="md:text-end font-semibold"
                                    >Remover</span
                                >
                            </div>
                        </li>
                        <li
                            v-for="(product, index) in sell.products"
                            :key="index"
                        >
                            <div
                                class="grid md:grid-cols-5 text-end md:text-start min-w-full gap-1"
                            >
                                <p class="block w-full whitespace-nowrap">
                                    {{ product.name }}
                                </p>
                                <span>
                                    {{ formatMoneyToBRL(product.price) }}
                                </span>
                                <span class="ml-10">{{
                                    product.quantity
                                }}</span>
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
                    class="btn btn-link mt-6 w-full self-center"
                    @click="showDiscount = !showDiscount"
                >
                    {{
                        !showDiscount
                            ? "Adicionar desconto?"
                            : "Remover desconto."
                    }}
                </button>
                <div
                    v-if="sell.total > 0"
                    class="flex justify-center gap-3 items-center flex-col md:flex-row"
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
                        class="border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 rounded-md shadow-sm md:self-end"
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
                    <div class="md:self-end">
                        <h2 class="font-semibold text-lg text-gray-800">
                            Subtotal: {{ formatMoneyToBRL(sellSubTotal) }}
                        </h2>

                        <h2 class="font-semibold text-lg text-gray-800">
                            Total:
                            {{ formatMoneyToBRL(sellTotal) }}
                        </h2>
                    </div>
                </div>
                <button
                    @click="createSell"
                    class="btn btn-primary mt-6 w-full text-xl"
                >
                    Criar venda
                </button>
            </div>
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
