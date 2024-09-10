<script setup lang="ts">
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout.vue";
import InputLabel from "@/Components/InputLabel.vue";
import SectionContainer from "@/Components/SectionContainer.vue";
import TextInput from "@/Components/TextInput.vue";
import ToastSuccess from "@/Components/ToastSuccess.vue";
import ToastError from "@/Components/ToastError.vue";
import SearchInput from "@/Components/SearchInput.vue";
import { vMaska } from "maska";
import { Head, router, Link } from "@inertiajs/vue3";
import { reactive, computed, ref } from "vue";
import { formatMoneyToBRL, formatRoles } from "@/utils";
import { Cashier } from "../Cashiers/types";
import Pagination from "@/Components/Pagination.vue";
import { PaymentMethods, ProductWithPaginate } from "./types";
import PrintReceipt from "./Components/PrintReceipt.vue";
import SelectedProductsDesktop from "./Components/SelectedProductsDesktop.vue";
import SelectedProductsMobile from "./Components/SelectedProductsMobile.vue";
import { Flash } from "@/types";
import Modal from "@/Components/Modal.vue";

const props = defineProps<{
    cashier: Cashier;
    products: ProductWithPaginate;
    paymentMethods: PaymentMethods[];
    flash: Flash;
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
const showSuccessModal = ref(false);
const showReceipt = ref(false);

const sell = reactive({
    products: [],
    observations: "",
    delivery: "",
    discount: "",
    paymentMethod: 3,
    subtotal: 0,
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
    sell.subtotal = sellSubTotal.value;
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
        observations: sell.observations,
        subtotal: sellSubTotal.value,
        total: sellTotal.value,
    };

    router.post(route("sells.store"), data);

    router.on("success", (e) => {
        console.log(e);
        showSuccessModal.value = true;
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

const handleShowReceipt = () => {
    showSuccessModal.value = false;
    showReceipt.value = true;
};

const clearSell = () => {
    sell.products = [];
    sell.delivery = "";
    sell.discount = "";
    sell.paymentMethod = 3;
    sell.total = 0;
};
</script>

<template>
    <AuthenticatedLayout>
        <Head title="Venda" />
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
                <h1 class="text-2xl font-semibold mb-6">Venda</h1>
                <SelectedProductsDesktop
                    :selectedProducts="sell.products"
                    @remove-product="removeProduct"
                />
                <SelectedProductsMobile
                    :selectedProducts="sell.products"
                    @remove-product="removeProduct"
                />
                <button
                    v-if="sell.products.length > 0"
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
                    v-if="sell.products.length > 0"
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
                            data-maska="0,99"
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
                            data-maska="0,99"
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
                <div
                    v-if="sell.products.length > 0"
                    class="w-full mt-6 flex justify-end"
                >
                    <textarea
                        class="textarea textarea-bordered w-full"
                        placeholder="Observações"
                        v-model="sell.observations"
                        rows="2"
                    ></textarea>
                </div>
                <div
                    v-if="sell.products.length > 0"
                    class="flex items-center justify-end mt-6 gap-8"
                >
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
            <div v-if="products.data.length">
                <SearchInput
                    class="my-4"
                    placeholder="Pesquisar produtos"
                    @search="searchProducts"
                    :q="query"
                />
                <div
                    class="grid lg:grid-cols-4 mx-auto gap-3 text-gray-800 w-full"
                >
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
                            <div
                                class="flex justify-between items-center w-full"
                            >
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
            <div v-else>
                <p class="text-center text-lg font-semibold">
                    Nenhum produto encontrado...
                </p>
                <Link
                    class="block text-center mt-4"
                    :href="route('products.create')"
                    >Adicione novos produtos para começar a vender! ➕</Link
                >
            </div>
        </div>

        <Modal
            :show="showSuccessModal"
            max-width="sm"
            :closeable="true"
            @close="
                showSuccessModal = false;
                clearSell();
            "
        >
            <div class="p-6">
                <h2 class="text-2xl font-semibold text-gray-800">
                    Venda criada com sucesso!
                </h2>
                <p>Deseja imprimir o recibo?</p>
                <div class="flex justify-between gap-4 mt-6">
                    <button
                        type="button"
                        @click="
                            showSuccessModal = false;
                            clearSell();
                        "
                        class="btn w-32 btn-error"
                    >
                        Não
                    </button>
                    <button
                        type="button"
                        @click="handleShowReceipt"
                        class="btn w-32 btn-primary"
                    >
                        Sim
                    </button>
                </div>
            </div>
        </Modal>

        <Modal
            :show="showReceipt"
            max-width="lg"
            :closeable="true"
            @close="
                showReceipt = false;
                clearSell();
            "
        >
            <PrintReceipt
                :sell="sell"
                :delivery="deliveryTax"
                :discount="discount"
                @close="
                    showReceipt = false;
                    clearSell();
                "
            />
        </Modal>
        <ToastSuccess v-if="showSuccessToast">
            Venda criada com sucesso!
        </ToastSuccess>
        <ToastError v-if="showErrorToast"> Erro ao criar venda! </ToastError>
    </AuthenticatedLayout>
</template>
