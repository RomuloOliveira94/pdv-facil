<script setup lang="ts">
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout.vue";
import SectionContainer from "@/Components/SectionContainer.vue";
import InputError from "@/Components/InputError.vue";
import { Link, router, useForm } from "@inertiajs/vue3";
import { vMaska } from "maska";
import { Company } from "./types";

const props = defineProps<{
    company: Company;
}>();

const form = useForm({
    name: props.company.name,
    cnpj: props.company.cnpj,
    phone: props.company.phone,
    address: props.company.address,
    address_number: props.company.address_number,
    address_complement: props.company.address_complement,
    neighborhood: props.company.neighborhood,
    zip_code: props.company.zip_code,
    city: props.company.city,
    state: props.company.state,
    email: props.company.email,
    logo: props.company.logo,
    pix_key: props.company.pix_key,
    credit_cart: props.company.payment_types.some(
        (payment) => payment.code == "1"
    ),
    debit_cart: props.company.payment_types.some(
        (payment) => payment.code == "2"
    ),
    money: props.company.payment_types.some((payment) => payment.code == "3"),
    pix: props.company.payment_types.some((payment) => payment.code == "4"),
    image: null,
});

const submit = () => {
    router.post(route("company.update", props.company.id), {
        _method: "put",
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
        logo: form.logo,
        pix_key: form.pix_key,
        image: form.image,
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
    <AuthenticatedLayout>
        <template #header>
            <h2 class="font-semibold text-xl text-gray-800 leading-tight">
                Editar Empresa: {{ company.name }}
            </h2>
        </template>
        <SectionContainer>
            <form @submit.prevent="submit">
                <div class="grid lg:grid-cols-2 gap-3">
                    <label class="form-control w-full">
                        <div class="label">
                            <span class="label-text">Nome</span>
                        </div>
                        <input
                            type="text"
                            placeholder="Nome da empresa"
                            class="input input-bordered bg-inherit w-full"
                            v-model="form.name"
                        />

                        <InputError class="mt-2" :message="form.errors.name" />
                    </label>

                    <label class="form-control w-full">
                        <div class="label">
                            <span class="label-text">Cnpj</span>
                        </div>
                        <input
                            type="text"
                            placeholder="Type here"
                            class="input input-bordered bg-inherit w-full"
                            v-model="form.cnpj"
                            v-maska
                            data-maska="[
                              '##.###.###/####-##'
                            ]"
                        />
                        <InputError class="mt-2" :message="form.errors.cnpj" />
                    </label>

                    <label class="form-control w-full">
                        <div class="label">
                            <span class="label-text">Email</span>
                        </div>
                        <input
                            type="text"
                            placeholder="Type here"
                            class="input input-bordered bg-inherit w-full"
                            v-model="form.email"
                        />
                        <InputError class="mt-2" :message="form.errors.email" />
                    </label>

                    <label class="form-control w-full">
                        <div class="label">
                            <span class="label-text">Telefone</span>
                        </div>
                        <input
                            type="text"
                            placeholder="Type here"
                            class="input input-bordered bg-inherit w-full"
                            v-model="form.phone"
                            v-maska
                            data-maska="[
                              '(##) #####-####',
                              '(##) ####-####'
                            ]"
                        />
                        <InputError class="mt-2" :message="form.errors.phone" />
                    </label>
                </div>

                <div class="grid lg:grid-cols-2 gap-3">
                    <div class="flex gap-3">
                        <label class="form-control w-full">
                            <div class="label">
                                <span class="label-text">Endereço</span>
                            </div>
                            <input
                                type="text"
                                placeholder="Type here"
                                class="input input-bordered bg-inherit w-full"
                                v-model="form.address"
                            />
                            <InputError
                                class="mt-2"
                                :message="form.errors.address"
                            />
                        </label>

                        <label class="form-control w-24">
                            <div class="label">
                                <span class="label-text">Nº</span>
                            </div>
                            <input
                                type="text"
                                placeholder="Type here"
                                class="input input-bordered bg-inherit w-24"
                                v-model="form.address_number"
                                v-maska
                                data-maska="######"
                            />
                            <InputError
                                class="mt-2"
                                :message="form.errors.address_number"
                            />
                        </label>
                    </div>

                    <label class="form-control w-full">
                        <div class="label">
                            <span class="label-text">Complemento</span>
                        </div>
                        <input
                            type="text"
                            placeholder="Type here"
                            class="input input-bordered bg-inherit w-full"
                            v-model="form.address_complement"
                        />
                    </label>
                </div>

                <div class="grid lg:grid-cols-2 gap-3">
                    <label class="form-control w-full">
                        <div class="label">
                            <span class="label-text">Bairro</span>
                        </div>
                        <input
                            type="text"
                            placeholder="Type here"
                            class="input input-bordered bg-inherit w-full"
                            v-model="form.neighborhood"
                        />
                        <InputError
                            class="mt-2"
                            :message="form.errors.neighborhood"
                        />
                        <InputError
                            class="mt-2"
                            :message="form.errors.neighborhood"
                        />
                    </label>

                    <label class="form-control w-full">
                        <div class="label">
                            <span class="label-text">CEP</span>
                        </div>
                        <input
                            type="text"
                            placeholder="Type here"
                            class="input input-bordered bg-inherit w-full"
                            v-model="form.zip_code"
                            v-maska
                            data-maska="#####-###"
                        />
                        <InputError
                            class="mt-2"
                            :message="form.errors.zip_code"
                        />
                    </label>

                    <label class="form-control w-full">
                        <div class="label">
                            <span class="label-text">Cidade</span>
                        </div>
                        <input
                            type="text"
                            placeholder="Type here"
                            class="input input-bordered bg-inherit w-full"
                            v-model="form.city"
                        />
                        <InputError class="mt-2" :message="form.errors.city" />
                    </label>

                    <label class="form-control w-full">
                        <div class="label">
                            <span class="label-text">Estado</span>
                        </div>
                        <input
                            type="text"
                            placeholder="Type here"
                            class="input input-bordered bg-inherit w-full"
                            v-model="form.state"
                        />
                        <InputError class="mt-2" :message="form.errors.state" />
                    </label>
                </div>

                <div class="grid lg:grid-cols-2 gap-3">
                    <label class="form-control w-full">
                        <div class="label">
                            <span class="label-text">Chave Pix</span>
                        </div>
                        <input
                            type="text"
                            placeholder="Type here"
                            class="input input-bordered bg-inherit w-full"
                            v-model="form.pix_key"
                        />
                    </label>

                    <label class="form-control w-full">
                        <div class="label">
                            <span class="label-text">Logo</span>
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

                        <InputError class="mt-2" :message="form.errors.logo" />
                    </label>
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

                <div class="flex items-center justify-between mt-4 gap-6">
                    <button
                        class="btn btn-success"
                        :class="{ 'opacity-25': form.processing }"
                        :disabled="form.processing"
                        type="submit"
                    >
                        Editar
                    </button>
                    <Link
                        :href="route('company.index')"
                        class="btn btn-error text-sm text-gray-600 hover:text-gray-900"
                    >
                        Cancelar
                    </Link>
                </div>
            </form>
        </SectionContainer>
    </AuthenticatedLayout>
</template>
