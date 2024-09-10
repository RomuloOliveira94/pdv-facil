<script setup>
import { formatMoneyToBRL, formatPaymentMethod, formatDatePure } from "@/utils";
import printJS from "print-js";

const props = defineProps({
    sell: Object,
    delivery: Number,
    discount: Number,
});

const emit = defineEmits(["close"]);

const print = () => {
    printJS({
        printable: "print",
        type: "html",
        targetStyles: ["*"],
    });
};

const close = () => {
    emit("close");
};
</script>
<template>
    <div class="grid place-content-center bg-white p-6">
        <h3 class="text-2xl font-bold text-center">
            Venda Realizada com sucesso!
        </h3>
        <p class="text-md text-center">Segue o recibo gerado para a venda.</p>
        <div
            id="print"
            class="grid gap-2 border border-gray-400 p-6 rounded-md my-6 max-w-[300px] mx-auto"
        >
            <div class="flex items-center justify-between">
                <h3>
                    <span class="font-bold mr-2">Venda:</span>
                    <span class="text-end">123</span>
                </h3>
                <h3>
                    <span class="font-bold mr-2">Data:</span>
                    <span class="text-end">{{
                        formatDatePure(new Date())
                    }}</span>
                </h3>
            </div>
            <h1 class="text-2xl font-bold text-center">RECIBO</h1>
            <div>
                <h2 class="text-xl font-semibold text-center">
                    {{ $page.props.auth.user.company.name }}
                </h2>
                <p class="text-center text-sm">
                    {{ $page.props.auth.user.company.address }} -
                    {{ $page.props.auth.user.company.address_number }}
                </p>
                <p class="text-center text-sm">
                    {{ $page.props.auth.user.company.city }} -
                    {{ $page.props.auth.user.company.state }}
                </p>
                <p class="text-center text-sm">
                    CEP: {{ $page.props.auth.user.company.zip_code }}
                </p>
                <p class="text-center text-sm">
                    CNPJ: {{ $page.props.auth.user.company.cnpj }}
                </p>
                <p class="text-center text-sm">
                    Telefone: {{ $page.props.auth.user.company.phone }}
                </p>
            </div>
            <table class="table w-full">
                <thead>
                    <tr>
                        <th>Produtos</th>
                        <th>Total</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="(product, index) in sell.products" :key="index">
                        <td>
                            <div class="grid gap-0.5">
                                <p class="font-semibold line-clamp-1">
                                    {{ product.name }}
                                </p>
                                <p>
                                    {{ formatMoneyToBRL(product.price) }} x{{
                                        product.quantity
                                    }}
                                </p>
                            </div>
                        </td>
                        <td class="font-semibold">
                            {{
                                formatMoneyToBRL(
                                    product.price * product.quantity
                                )
                            }}
                        </td>
                    </tr>
                </tbody>
            </table>
            <p class="flex justify-between items-center">
                <span class="font-bold">Subtotal:</span>
                <span class="text-end font-semibold">{{
                    formatMoneyToBRL(sell.subtotal)
                }}</span>
            </p>
            <p class="flex justify-between items-center">
                <span class="font-bold">Delivery:</span>
                <span class="text-end font-semibold">{{
                    formatMoneyToBRL(delivery)
                }}</span>
            </p>
            <p class="flex justify-between items-center">
                <span class="font-bold">Desconto:</span>
                <span class="text-end font-semibold">{{
                    formatMoneyToBRL(discount)
                }}</span>
            </p>
            <p class="flex justify-between items-center text-xl">
                <span class="font-bold">Total:</span>
                <span class="text-end font-semibold">{{
                    formatMoneyToBRL(sell.total)
                }}</span>
            </p>
            <p class="flex flex-col justify-center">
                <span class="font-bold">Forma de Pagamento:</span>
                <span class="text-start">{{
                    formatPaymentMethod(sell.paymentMethod)
                }}</span>
            </p>
            <p class="flex flex-col justify-center">
                <span class="font-bold">Observações:</span>
                <span class="text-sm"></span>
            </p>
        </div>
        <div class="grid gap-6">
            <button type="button" class="btn btn-primary" @click="print">
                Imprimir
            </button>
            <button type="button" class="btn btn-info">Baixar PDF</button>
            <button type="button" class="btn btn-success">
                Enviar via WhatsApp
            </button>

            <button
                type="button"
                class="btn btn-ghost w-full text-lg"
                @click="close()"
            >
                Fechar
            </button>
        </div>
    </div>
</template>
