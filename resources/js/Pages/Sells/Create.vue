<script setup lang="ts">
import InputLabel from "@/Components/InputLabel.vue";
import SectionContainer from "@/Components/SectionContainer.vue";
import TextInput from "@/Components/TextInput.vue";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout.vue";
import ToastSuccess from "@/Components/ToastSuccess.vue";
import ToastError from "@/Components/ToastError.vue";
import SearchInput from "@/Components/SearchInput.vue";
import { vMaska } from "maska";
import { Head, router } from "@inertiajs/vue3";
import { reactive, computed, ref } from "vue";
import { formatMoneyToBRL, formatRoles } from "@/utils";
import { Cashier } from "../Cashiers/types";
import Pagination from "@/Components/Pagination.vue";
import { PaymentMethods, ProductWithPaginate } from "./types";
import PrintReceiptModal from "./Components/PrintReceiptModal.vue";

const props = defineProps<{
    cashier: Cashier;
    products: ProductWithPaginate;
    paymentMethods: PaymentMethods[];
    search?: string;
}>();

const query = ref(props.search);

const linksWithSearch = computed(() => {
    return props.products.links.map((link) => {
        if (link.url === null) return link;

        let url = new URL(link.url);

        if (query.value) {
            url.searchParams.set("product", query.value);
        }

        return {
            ...link,
            url: `${url}`,
        };
    });
});

const showDiscount = ref(false);
const showSuccessToast = ref(false);
const showErrorToast = ref(false);

const sell = reactive({
    products: [],
    delivery: "",
    discount: "",
    paymentMethod: 3,
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
    if (!props.cashier || props.cashier.active === false) {
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
    if (sell.products.length === 0) {
        alert("Adicione produtos para realizar a venda.");
        return;
    }

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
    receipt.showModal();
    router.post(route("sells.store"), data);

    router.on("success", () => {
        showSuccessToast.value = true;
        receipt.showModal(); //erro impossivel de desativar ò.ó
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

const searchProducts = (search) => {
    query.value = search;
    router.get(
        route("sells.create", { product: query.value }),
        {},
        { preserveState: true, preserveScroll: true }
    );
};
</script>

<template>
    <Head title="Venda" />

    <AuthenticatedLayout>
        <template #header>
            <div class="flex gap-6 items-center justify-center">
                <h2 class="font-semibold text-xl text-gray-800 leading-tight">
                    Registar Venda
                </h2>
                <span class="text-gray-800">|</span>
                <div class="flex items-center flex-col md:flex-row md:gap-2">
                    <h3 class="text-lg font-bold text-gray-800">
                        Caixa: {{ $page.props.auth.user.name }}
                    </h3>
                    <small class="font-semibold text-xs pt-0.5">
                        ({{ formatRoles(($page.props.auth.user as any).role) }})
                    </small>
                </div>
            </div>
        </template>

        <div class="flex items-center justify-center my-4">
            <button
                v-if="!cashier || !cashier?.active"
                class="btn btn-primary btn-lg w-52"
                @click="openCashier"
            >
                Abrir Caixa 💰
            </button>

            <button
                v-if="cashier && cashier?.active"
                class="btn btn-error btn-lg w-52"
                @click="closeCashier"
            >
                Fechar Caixa 🔐
            </button>
        </div>

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
                    class="link mt-6 mb-2 w-full self-center"
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
                    <div class="w-full">
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

                    <div v-show="showDiscount" class="w-full">
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
                    <div class="w-full">
                        <InputLabel for="discount" value="Forma de pagamento" />
                        <select
                            class="border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 rounded-md shadow-sm md:self-end w-full"
                            v-model="sell.paymentMethod"
                        >
                            <option
                                v-for="(payment, index) in paymentMethods"
                                :key="index"
                                :value="payment.id"
                            >
                                {{ payment.name }}
                            </option>
                        </select>
                    </div>
                </div>
                <div class="flex items-center justify-center mt-6 gap-8">
                    <h2 class="font-semibold text-xl text-gray-800">
                        Subtotal: {{ formatMoneyToBRL(sellSubTotal) }}
                    </h2>

                    <h2 class="font-semibold text-2xl text-gray-800">
                        Total:
                        {{ formatMoneyToBRL(sellTotal) }}
                    </h2>
                </div>
                <button
                    v-if="sell.products.length > 0"
                    @click="createSell"
                    class="btn btn-primary mt-6 w-72 text-xl mx-auto"
                >
                    Criar venda
                </button>
                <div class="my-4" v-if="sell.products.length <= 0">
                    <p class="text-center text-lg font-semibold">
                        Adicione produtos para realizar a venda. 👇
                    </p>
                </div>
            </div>
        </SectionContainer>

        <div class="mt-6 bg-white p-6 rounded-md">
            <h1 class="text-3xl font-bold mb-2 text-gray-800 text-center">
                Produtos
            </h1>
            <SearchInput
                class="my-4"
                placeholder="Pesquisar produtos"
                @search="searchProducts"
                :q="query"
            />
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
                                        : '/images/pdvfacil.png'
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
            <pagination class="mt-6" :links="linksWithSearch" />
        </div>

        <ToastSuccess v-if="showSuccessToast">
            Venda criada com sucesso!
        </ToastSuccess>

        <ToastError v-if="showErrorToast"> Erro ao criar venda! </ToastError>
        <PrintReceiptModal />
    </AuthenticatedLayout>
</template>
