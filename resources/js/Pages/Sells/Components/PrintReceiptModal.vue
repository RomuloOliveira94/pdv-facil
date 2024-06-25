<script setup lang="ts"></script>
<template>
    <div class="toast toast-center">
        <div class="modal-box min-w-[500px] bg-white h-full">
            <button
                class="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
            >
                ✕
            </button>
            <h3 class="text-2xl font-bold text-center">Venda Realizada com sucesso!</h3>
            <p class="text-md text-center">Segue o recibo gerado para a venda.</p>
            <div class="grid gap-2 border border-gray-400 p-6 rounded-md my-6">
                <div class="flex items-center justify-between">
                    <h3>
                        <span class="font-bold">Venda:</span>
                        <span class="text-end">123</span>
                    </h3>
                    <h3>
                        <span class="font-bold">Data:</span>
                        <span class="text-end">12/12/12</span>
                    </h3>
                </div>
                <h1 class="text-2xl font-bold text-center">RECIBO</h1>
                <div class="w-fit mx-auto p-4">
                    <h2 class="text-xl font-semibold text-center">
                        Venda do fuleko
                    </h2>
                    <p class="text-center text-sm">Rua do Fuleko, 123</p>
                    <p class="text-center text-sm">Fuleko - SP</p>
                    <p class="text-center text-sm">CEP: 12345-678</p>
                    <p class="text-center text-sm">CNPJ: 12.345.678/0001-12</p>
                    <p class="text-center text-sm">Telefone: (12) 3456-7890</p>
                </div>
                <ul>
                    <li class="flex justify-between items-center gap-2">
                        <p class="text-wrap">Bolo de Fubá</p>
                        <div class="flex items-center gap-2">
                            <span class="font-bold">1x</span>
                            <span>R$ 50,00</span>
                        </div>
                    </li>
                    <hr class="my-2">
                    <li class="flex justify-between items-center gap-2">
                        <p class="text-wrap">Bolo de Fubá</p>
                        <div class="flex items-center gap-2">
                            <span class="font-bold">1x</span>
                            <span>R$ 50,00</span>
                        </div>
                    </li>
                    <hr class="my-2">
                    <li class="flex justify-between items-center gap-2">
                        <p class="text-wrap">CARFA DE CHIBATAd  asda dasdas das dasd as</p>
                        <div class="flex items-center gap-2">
                            <span class="font-bold">1x</span>
                            <span>R$ 50,00</span>
                        </div>
                    </li>
                    <hr class="my-2">
                    <li class="flex justify-between items-center gap-2">
                        <p class="text-wrap">Ajuste4 de tela</p>
                        <div class="flex items-center gap-2">
                            <span class="font-bold">1x</span>
                            <span>R$ 50,00</span>
                        </div>
                    </li>
                    <hr class="my-2">
                </ul>
                <p class="flex justify-between items-center">
                    <span class="font-bold">Total:</span>
                    <span class="text-end">R$ 200,00</span>
                </p>
                <p class="flex justify-between items-center">
                    <span class="font-bold">Forma de Pagamento:</span>
                    <span class="text-end">Dinheiro</span>
                </p>
                <p>
                    <span class="font-bold">Observações:</span>
                    <p>Garantia de 30 dias.</p>
                </p>
            </div>
            <div class="grid gap-6">
                <button class="btn btn-primary">Imprimir</button>
                <button class="btn btn-secondary">Enviar por e-mail</button>
                <button class="btn btn-info">Baixar PDF</button>
                <button class="btn btn-success">Enviar via WhatsApp</button>
            </div>
        </div>
    </div>
</template>
