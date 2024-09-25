<script setup lang="ts">
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout.vue";
import GuestLayout from "@/Layouts/GuestLayout.vue";
import SectionContainer from "@/Components/SectionContainer.vue";
import InputError from "@/Components/InputError.vue";
import { Link, router, useForm, Head } from "@inertiajs/vue3";
import { vMaska } from "maska";

const props = defineProps<{
    errors: Record<string, string>;
}>();

const form = useForm({
    name: "",
    cnpj: "",
    phone: "",
    address: "",
    address_number: "",
    address_complement: "",
    neighborhood: "",
    zip_code: "",
    city: "",
    state: "",
    email: "",
    logo: "",
    pix_key: "",
    credit_cart: null,
    debit_cart: null,
    money: null,
    pix: null,
    image: null,
});

const submit = () => {
    router.post(route("company.store"), {
        _method: "post",
        name: form.name,
        cnpj: form.cnpj,
        phone: form.phone,
        address: form.address,
        address_number: form.address_number,
        address_complement: form.address_complement,
        neighborhood: form.neighborhood,
        zip_code: form.zip_code,
        city: form.city,
        state: form.state,
        email: form.email,
        // logo: form.logo,
        pix_key: form.pix_key,
        // image: form.image,
        payment_types: [
            form.credit_cart ? "1" : "",
            form.debit_cart ? "2" : "",
            form.money ? "3" : "",
            form.pix ? "4" : "",
        ],
    });
};
</script>

<template>
    <GuestLayout size="max-w-5xl">
        <Head title="Criar Empresa" />
        <template #header>
            <h2 class="font-semibold text-xl text-gray-800 leading-tight">
                Cadastre sua Empresa:
            </h2>
        </template>
        <SectionContainer>
            <div class="grid gap-2 mb-4">
                <h1 class="text-2xl font-bold text-center">
                    Seja vem Vindo(a) ao PDV FÁCIL!
                </h1>
                <p class="text-center">
                    Agora faça o cadastro da sua empresa para utilizar o
                    sistema.
                </p>
                <small>Campos Obrigatórios: *</small>
            </div>
            <form @submit.prevent="submit">
                <div class="grid lg:grid-cols-2 gap-3">
                    <label class="form-control w-full">
                        <div class="label">
                            <span class="label-text">Nome*</span>
                        </div>
                        <input
                            type="text"
                            placeholder="Nome da empresa"
                            class="input input-bordered bg-inherit w-full"
                            v-model="form.name"
                        />

                        <InputError class="mt-2" :message="errors.name" />
                    </label>

                    <label class="form-control w-full">
                        <div class="label">
                            <span class="label-text">CNPJ</span>
                        </div>
                        <input
                            type="text"
                            placeholder="cnpj"
                            class="input input-bordered bg-inherit w-full"
                            v-model="form.cnpj"
                            v-maska
                            data-maska="[
                              '##.###.###/####-##'
                            ]"
                        />
                        <InputError class="mt-2" :message="errors.cnpj" />
                    </label>

                    <label class="form-control w-full">
                        <div class="label">
                            <span class="label-text">Email</span>
                        </div>
                        <input
                            type="text"
                            placeholder="Email"
                            class="input input-bordered bg-inherit w-full"
                            v-model="form.email"
                        />
                        <InputError class="mt-2" :message="errors.email" />
                    </label>

                    <label class="form-control w-full">
                        <div class="label">
                            <span class="label-text">Telefone*</span>
                        </div>
                        <input
                            type="text"
                            placeholder="Phone"
                            class="input input-bordered bg-inherit w-full"
                            v-model="form.phone"
                            v-maska
                            data-maska="[
                              '(##) #####-####',
                              '(##) ####-####'
                            ]"
                        />
                        <InputError class="mt-2" :message="errors.phone" />
                    </label>
                </div>

                <div class="grid lg:grid-cols-2 gap-3">
                    <div class="flex gap-3">
                        <label class="form-control w-full">
                            <div class="label">
                                <span class="label-text">Endereço*</span>
                            </div>
                            <input
                                type="text"
                                placeholder="Endereço"
                                class="input input-bordered bg-inherit w-full"
                                v-model="form.address"
                            />
                            <InputError
                                class="mt-2"
                                :message="errors.address"
                            />
                        </label>

                        <label class="form-control w-24">
                            <div class="label">
                                <span class="label-text">Nº*</span>
                            </div>
                            <input
                                type="text"
                                placeholder="Número"
                                class="input input-bordered bg-inherit w-24"
                                v-model="form.address_number"
                                v-maska
                                data-maska="######"
                            />
                            <InputError
                                class="mt-2"
                                :message="errors.address_number"
                            />
                        </label>
                    </div>

                    <label class="form-control w-full">
                        <div class="label">
                            <span class="label-text">Complemento</span>
                        </div>
                        <input
                            type="text"
                            placeholder="Complemento"
                            class="input input-bordered bg-inherit w-full"
                            v-model="form.address_complement"
                        />
                    </label>
                </div>

                <div class="grid lg:grid-cols-2 gap-3">
                    <label class="form-control w-full">
                        <div class="label">
                            <span class="label-text">Bairro*</span>
                        </div>
                        <input
                            type="text"
                            placeholder="Bairro"
                            class="input input-bordered bg-inherit w-full"
                            v-model="form.neighborhood"
                        />
                        <InputError
                            class="mt-2"
                            :message="errors.neighborhood"
                        />
                    </label>

                    <label class="form-control w-full">
                        <div class="label">
                            <span class="label-text">CEP*</span>
                        </div>
                        <input
                            type="text"
                            placeholder="00000-000"
                            class="input input-bordered bg-inherit w-full"
                            v-model="form.zip_code"
                            v-maska
                            data-maska="#####-###"
                        />
                        <InputError class="mt-2" :message="errors.zip_code" />
                    </label>

                    <label class="form-control w-full">
                        <div class="label">
                            <span class="label-text">Cidade*</span>
                        </div>
                        <input
                            type="text"
                            placeholder="Cidade"
                            class="input input-bordered bg-inherit w-full"
                            v-model="form.city"
                        />
                        <InputError class="mt-2" :message="errors.city" />
                    </label>

                    <label class="form-control w-full">
                        <div class="label">
                            <span class="label-text">Estado*</span>
                        </div>
                        <input
                            type="text"
                            placeholder="Estado"
                            class="input input-bordered bg-inherit w-full"
                            v-model="form.state"
                        />
                        <InputError class="mt-2" :message="errors.state" />
                    </label>
                </div>

                <div class="grid lg:grid-cols-2 gap-3">
                    <label class="form-control w-full">
                        <div class="label">
                            <span class="label-text">Chave Pix</span>
                        </div>
                        <input
                            type="text"
                            placeholder="Chave pix"
                            class="input input-bordered bg-inherit w-full"
                            v-model="form.pix_key"
                        />
                    </label>

                    <!-- <label class="form-control w-full flex items-center">
                        <div class="label grid gap-2">
                            <span class="label-text">Logo</span>
                            <img
                                :src="form.image"
                                :alt="form.name"
                                width="100"
                                height="100"
                                class="rounded-lg object-cover"
                            />
                        </div>

                        <input
                            type="file"
                            class="file-input w-full bg-inherit mt-1 block"
                            @input="
                                form.image = (
                                    $event.target as HTMLInputElement
                                ).files[0]
                            "
                        />

                        <InputError class="mt-2" :message="errors.logo" />
                    </label>-->
                </div>

                <div class="mt-4">
                    <h1>Formas de Pagamento</h1>
                    <div class="flex justify-between items-center">
                        <label
                            class="label cursor-pointer flex justify-center gap-2 lg:gap-4"
                        >
                            <span class="label-text text-gray-700"
                                >Cartão de Crédito</span
                            >
                            <input
                                type="checkbox"
                                :checked="form.credit_cart"
                                class="checkbox"
                                @change="form.credit_cart = !form.credit_cart"
                            />
                        </label>

                        <label
                            class="label cursor-pointer flex justify-center gap-4"
                        >
                            <span class="label-text text-gray-700"
                                >Cartão de Débito</span
                            >
                            <input
                                type="checkbox"
                                :checked="form.debit_cart"
                                class="checkbox"
                                @change="form.debit_cart = !form.debit_cart"
                            />
                        </label>

                        <label
                            class="label cursor-pointer flex justify-center gap-4"
                        >
                            <span class="label-text text-gray-700"
                                >Dinheiro</span
                            >
                            <input
                                type="checkbox"
                                :checked="form.money"
                                class="checkbox"
                                @change="form.money = !form.money"
                            />
                        </label>

                        <label
                            class="label cursor-pointer flex justify-center gap-4"
                        >
                            <span class="label-text text-gray-700">Pix</span>
                            <input
                                type="checkbox"
                                class="checkbox"
                                :checked="form.pix"
                                @change="form.pix = !form.pix"
                            />
                        </label>
                    </div>
                </div>

                <div class="flex items-center justify-center mt-8 gap-6">
                    <button
                        class="btn btn-success btn-lg w-72 text-xl"
                        :class="{ 'opacity-25': form.processing }"
                        :disabled="form.processing"
                        type="submit"
                    >
                        Cadastrar
                    </button>
                </div>
            </form>
        </SectionContainer>
    </GuestLayout>
</template>
