import { defineComponent, withCtx, createVNode, toDisplayString, unref, mergeProps, createTextVNode, withModifiers, withDirectives, vModelText, useSSRContext } from "vue";
import { ssrRenderComponent, ssrInterpolate, ssrRenderAttr, ssrRenderAttrs, ssrGetDirectiveProps, ssrGetDynamicModelProps, ssrIncludeBooleanAttr, ssrRenderClass } from "vue/server-renderer";
import { _ as _sfc_main$1 } from "./AuthenticatedLayout-D3YttXd4.js";
import { S as SectionContainer } from "./SectionContainer-0J7EYAY4.js";
import { I as InputError } from "./InputError-DzpKvWT9.js";
import { useForm, Link, router } from "@inertiajs/vue3";
import { vMaska } from "maska";
import "./_plugin-vue_export-helper-1tPrXgE0.js";
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "Edit",
  __ssrInlineRender: true,
  props: {
    company: {}
  },
  setup(__props) {
    const props = __props;
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
      image: null
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
          form.pix ? "4" : ""
        ]
      });
    };
    return (_ctx, _push, _parent, _attrs) => {
      let _temp0, _temp1, _temp2, _temp3;
      _push(ssrRenderComponent(_sfc_main$1, _attrs, {
        header: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<h2 class="font-semibold text-xl text-gray-800 leading-tight"${_scopeId}> Editar Empresa: ${ssrInterpolate(_ctx.company.name)}</h2>`);
          } else {
            return [
              createVNode("h2", { class: "font-semibold text-xl text-gray-800 leading-tight" }, " Editar Empresa: " + toDisplayString(_ctx.company.name), 1)
            ];
          }
        }),
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(SectionContainer, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`${ssrInterpolate(unref(form).credit_cart)} <form${_scopeId2}><div class="grid lg:grid-cols-2 gap-3"${_scopeId2}><label class="form-control w-full"${_scopeId2}><div class="label"${_scopeId2}><span class="label-text"${_scopeId2}>Nome</span></div><input type="text" placeholder="Nome da empresa" class="input input-bordered bg-inherit w-full"${ssrRenderAttr("value", unref(form).name)}${_scopeId2}>`);
                  _push3(ssrRenderComponent(InputError, {
                    class: "mt-2",
                    message: unref(form).errors.name
                  }, null, _parent3, _scopeId2));
                  _push3(`</label><label class="form-control w-full"${_scopeId2}><div class="label"${_scopeId2}><span class="label-text"${_scopeId2}>Cnpj</span></div><input${ssrRenderAttrs((_temp0 = mergeProps({
                    type: "text",
                    placeholder: "Type here",
                    class: "input input-bordered bg-inherit w-full",
                    value: unref(form).cnpj,
                    "data-maska": "[\n                              '##.###.###/####-##'\n                            ]"
                  }, ssrGetDirectiveProps(_ctx, unref(vMaska))), mergeProps(_temp0, ssrGetDynamicModelProps(_temp0, unref(form).cnpj))))}${_scopeId2}>`);
                  _push3(ssrRenderComponent(InputError, {
                    class: "mt-2",
                    message: unref(form).errors.cnpj
                  }, null, _parent3, _scopeId2));
                  _push3(`</label><label class="form-control w-full"${_scopeId2}><div class="label"${_scopeId2}><span class="label-text"${_scopeId2}>Email</span></div><input type="text" placeholder="Type here" class="input input-bordered bg-inherit w-full"${ssrRenderAttr("value", unref(form).email)}${_scopeId2}>`);
                  _push3(ssrRenderComponent(InputError, {
                    class: "mt-2",
                    message: unref(form).errors.email
                  }, null, _parent3, _scopeId2));
                  _push3(`</label><label class="form-control w-full"${_scopeId2}><div class="label"${_scopeId2}><span class="label-text"${_scopeId2}>Telefone</span></div><input${ssrRenderAttrs((_temp1 = mergeProps({
                    type: "text",
                    placeholder: "Type here",
                    class: "input input-bordered bg-inherit w-full",
                    value: unref(form).phone,
                    "data-maska": "[\n                              '(##) #####-####',\n                              '(##) ####-####'\n                            ]"
                  }, ssrGetDirectiveProps(_ctx, unref(vMaska))), mergeProps(_temp1, ssrGetDynamicModelProps(_temp1, unref(form).phone))))}${_scopeId2}>`);
                  _push3(ssrRenderComponent(InputError, {
                    class: "mt-2",
                    message: unref(form).errors.phone
                  }, null, _parent3, _scopeId2));
                  _push3(`</label></div><div class="grid lg:grid-cols-2 gap-3"${_scopeId2}><div class="flex gap-3"${_scopeId2}><label class="form-control w-full"${_scopeId2}><div class="label"${_scopeId2}><span class="label-text"${_scopeId2}>Endereço</span></div><input type="text" placeholder="Type here" class="input input-bordered bg-inherit w-full"${ssrRenderAttr("value", unref(form).address)}${_scopeId2}>`);
                  _push3(ssrRenderComponent(InputError, {
                    class: "mt-2",
                    message: unref(form).errors.address
                  }, null, _parent3, _scopeId2));
                  _push3(`</label><label class="form-control w-24"${_scopeId2}><div class="label"${_scopeId2}><span class="label-text"${_scopeId2}>Nº</span></div><input${ssrRenderAttrs((_temp2 = mergeProps({
                    type: "text",
                    placeholder: "Type here",
                    class: "input input-bordered bg-inherit w-24",
                    value: unref(form).address_number,
                    "data-maska": "######"
                  }, ssrGetDirectiveProps(_ctx, unref(vMaska))), mergeProps(_temp2, ssrGetDynamicModelProps(_temp2, unref(form).address_number))))}${_scopeId2}>`);
                  _push3(ssrRenderComponent(InputError, {
                    class: "mt-2",
                    message: unref(form).errors.address_number
                  }, null, _parent3, _scopeId2));
                  _push3(`</label></div><label class="form-control w-full"${_scopeId2}><div class="label"${_scopeId2}><span class="label-text"${_scopeId2}>Complemento</span></div><input type="text" placeholder="Type here" class="input input-bordered bg-inherit w-full"${ssrRenderAttr("value", unref(form).address_complement)}${_scopeId2}></label></div><div class="grid lg:grid-cols-2 gap-3"${_scopeId2}><label class="form-control w-full"${_scopeId2}><div class="label"${_scopeId2}><span class="label-text"${_scopeId2}>Bairro</span></div><input type="text" placeholder="Type here" class="input input-bordered bg-inherit w-full"${ssrRenderAttr("value", unref(form).neighborhood)}${_scopeId2}>`);
                  _push3(ssrRenderComponent(InputError, {
                    class: "mt-2",
                    message: unref(form).errors.neighborhood
                  }, null, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(InputError, {
                    class: "mt-2",
                    message: unref(form).errors.neighborhood
                  }, null, _parent3, _scopeId2));
                  _push3(`</label><label class="form-control w-full"${_scopeId2}><div class="label"${_scopeId2}><span class="label-text"${_scopeId2}>CEP</span></div><input${ssrRenderAttrs((_temp3 = mergeProps({
                    type: "text",
                    placeholder: "Type here",
                    class: "input input-bordered bg-inherit w-full",
                    value: unref(form).zip_code,
                    "data-maska": "#####-###"
                  }, ssrGetDirectiveProps(_ctx, unref(vMaska))), mergeProps(_temp3, ssrGetDynamicModelProps(_temp3, unref(form).zip_code))))}${_scopeId2}>`);
                  _push3(ssrRenderComponent(InputError, {
                    class: "mt-2",
                    message: unref(form).errors.zip_code
                  }, null, _parent3, _scopeId2));
                  _push3(`</label><label class="form-control w-full"${_scopeId2}><div class="label"${_scopeId2}><span class="label-text"${_scopeId2}>Cidade</span></div><input type="text" placeholder="Type here" class="input input-bordered bg-inherit w-full"${ssrRenderAttr("value", unref(form).city)}${_scopeId2}>`);
                  _push3(ssrRenderComponent(InputError, {
                    class: "mt-2",
                    message: unref(form).errors.city
                  }, null, _parent3, _scopeId2));
                  _push3(`</label><label class="form-control w-full"${_scopeId2}><div class="label"${_scopeId2}><span class="label-text"${_scopeId2}>Estado</span></div><input type="text" placeholder="Type here" class="input input-bordered bg-inherit w-full"${ssrRenderAttr("value", unref(form).state)}${_scopeId2}>`);
                  _push3(ssrRenderComponent(InputError, {
                    class: "mt-2",
                    message: unref(form).errors.state
                  }, null, _parent3, _scopeId2));
                  _push3(`</label></div><div class="grid lg:grid-cols-2 gap-3"${_scopeId2}><label class="form-control w-full"${_scopeId2}><div class="label"${_scopeId2}><span class="label-text"${_scopeId2}>Chave Pix</span></div><input type="text" placeholder="Type here" class="input input-bordered bg-inherit w-full"${ssrRenderAttr("value", unref(form).pix_key)}${_scopeId2}></label><label class="form-control w-full"${_scopeId2}><div class="label"${_scopeId2}><span class="label-text"${_scopeId2}>Logo</span></div><input type="file" class="file-input w-full bg-inherit mt-1 block"${_scopeId2}>`);
                  _push3(ssrRenderComponent(InputError, {
                    class: "mt-2",
                    message: unref(form).errors.logo
                  }, null, _parent3, _scopeId2));
                  _push3(`</label></div><div class="mt-4"${_scopeId2}><h1${_scopeId2}>Formas de Pagamento</h1><div class="flex justify-between items-center"${_scopeId2}><label class="label cursor-pointer flex justify-center gap-2 lg:gap-4"${_scopeId2}><span class="label-text text-gray-700"${_scopeId2}>Cartão de Crédito</span><input type="checkbox"${ssrIncludeBooleanAttr(unref(form).credit_cart) ? " checked" : ""} class="checkbox"${_scopeId2}></label><label class="label cursor-pointer flex justify-center gap-4"${_scopeId2}><span class="label-text text-gray-700"${_scopeId2}>Cartão de Débito</span><input type="checkbox"${ssrIncludeBooleanAttr(unref(form).debit_cart) ? " checked" : ""} class="checkbox"${_scopeId2}></label><label class="label cursor-pointer flex justify-center gap-4"${_scopeId2}><span class="label-text text-gray-700"${_scopeId2}>Dinheiro</span><input type="checkbox"${ssrIncludeBooleanAttr(unref(form).money) ? " checked" : ""} class="checkbox"${_scopeId2}></label><label class="label cursor-pointer flex justify-center gap-4"${_scopeId2}><span class="label-text text-gray-700"${_scopeId2}>Pix</span><input type="checkbox" class="checkbox"${ssrIncludeBooleanAttr(unref(form).pix) ? " checked" : ""}${_scopeId2}></label></div></div><div class="flex items-center justify-between mt-4 gap-6"${_scopeId2}><button class="${ssrRenderClass([{ "opacity-25": unref(form).processing }, "btn btn-success"])}"${ssrIncludeBooleanAttr(unref(form).processing) ? " disabled" : ""} type="submit"${_scopeId2}> Editar </button>`);
                  _push3(ssrRenderComponent(unref(Link), {
                    href: _ctx.route("company.index"),
                    class: "btn btn-error text-sm text-gray-600 hover:text-gray-900"
                  }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(` Cancelar `);
                      } else {
                        return [
                          createTextVNode(" Cancelar ")
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(`</div></form>`);
                } else {
                  return [
                    createTextVNode(toDisplayString(unref(form).credit_cart) + " ", 1),
                    createVNode("form", {
                      onSubmit: withModifiers(submit, ["prevent"])
                    }, [
                      createVNode("div", { class: "grid lg:grid-cols-2 gap-3" }, [
                        createVNode("label", { class: "form-control w-full" }, [
                          createVNode("div", { class: "label" }, [
                            createVNode("span", { class: "label-text" }, "Nome")
                          ]),
                          withDirectives(createVNode("input", {
                            type: "text",
                            placeholder: "Nome da empresa",
                            class: "input input-bordered bg-inherit w-full",
                            "onUpdate:modelValue": ($event) => unref(form).name = $event
                          }, null, 8, ["onUpdate:modelValue"]), [
                            [vModelText, unref(form).name]
                          ]),
                          createVNode(InputError, {
                            class: "mt-2",
                            message: unref(form).errors.name
                          }, null, 8, ["message"])
                        ]),
                        createVNode("label", { class: "form-control w-full" }, [
                          createVNode("div", { class: "label" }, [
                            createVNode("span", { class: "label-text" }, "Cnpj")
                          ]),
                          withDirectives(createVNode("input", {
                            type: "text",
                            placeholder: "Type here",
                            class: "input input-bordered bg-inherit w-full",
                            "onUpdate:modelValue": ($event) => unref(form).cnpj = $event,
                            "data-maska": "[\n                              '##.###.###/####-##'\n                            ]"
                          }, null, 8, ["onUpdate:modelValue"]), [
                            [vModelText, unref(form).cnpj],
                            [unref(vMaska)]
                          ]),
                          createVNode(InputError, {
                            class: "mt-2",
                            message: unref(form).errors.cnpj
                          }, null, 8, ["message"])
                        ]),
                        createVNode("label", { class: "form-control w-full" }, [
                          createVNode("div", { class: "label" }, [
                            createVNode("span", { class: "label-text" }, "Email")
                          ]),
                          withDirectives(createVNode("input", {
                            type: "text",
                            placeholder: "Type here",
                            class: "input input-bordered bg-inherit w-full",
                            "onUpdate:modelValue": ($event) => unref(form).email = $event
                          }, null, 8, ["onUpdate:modelValue"]), [
                            [vModelText, unref(form).email]
                          ]),
                          createVNode(InputError, {
                            class: "mt-2",
                            message: unref(form).errors.email
                          }, null, 8, ["message"])
                        ]),
                        createVNode("label", { class: "form-control w-full" }, [
                          createVNode("div", { class: "label" }, [
                            createVNode("span", { class: "label-text" }, "Telefone")
                          ]),
                          withDirectives(createVNode("input", {
                            type: "text",
                            placeholder: "Type here",
                            class: "input input-bordered bg-inherit w-full",
                            "onUpdate:modelValue": ($event) => unref(form).phone = $event,
                            "data-maska": "[\n                              '(##) #####-####',\n                              '(##) ####-####'\n                            ]"
                          }, null, 8, ["onUpdate:modelValue"]), [
                            [vModelText, unref(form).phone],
                            [unref(vMaska)]
                          ]),
                          createVNode(InputError, {
                            class: "mt-2",
                            message: unref(form).errors.phone
                          }, null, 8, ["message"])
                        ])
                      ]),
                      createVNode("div", { class: "grid lg:grid-cols-2 gap-3" }, [
                        createVNode("div", { class: "flex gap-3" }, [
                          createVNode("label", { class: "form-control w-full" }, [
                            createVNode("div", { class: "label" }, [
                              createVNode("span", { class: "label-text" }, "Endereço")
                            ]),
                            withDirectives(createVNode("input", {
                              type: "text",
                              placeholder: "Type here",
                              class: "input input-bordered bg-inherit w-full",
                              "onUpdate:modelValue": ($event) => unref(form).address = $event
                            }, null, 8, ["onUpdate:modelValue"]), [
                              [vModelText, unref(form).address]
                            ]),
                            createVNode(InputError, {
                              class: "mt-2",
                              message: unref(form).errors.address
                            }, null, 8, ["message"])
                          ]),
                          createVNode("label", { class: "form-control w-24" }, [
                            createVNode("div", { class: "label" }, [
                              createVNode("span", { class: "label-text" }, "Nº")
                            ]),
                            withDirectives(createVNode("input", {
                              type: "text",
                              placeholder: "Type here",
                              class: "input input-bordered bg-inherit w-24",
                              "onUpdate:modelValue": ($event) => unref(form).address_number = $event,
                              "data-maska": "######"
                            }, null, 8, ["onUpdate:modelValue"]), [
                              [vModelText, unref(form).address_number],
                              [unref(vMaska)]
                            ]),
                            createVNode(InputError, {
                              class: "mt-2",
                              message: unref(form).errors.address_number
                            }, null, 8, ["message"])
                          ])
                        ]),
                        createVNode("label", { class: "form-control w-full" }, [
                          createVNode("div", { class: "label" }, [
                            createVNode("span", { class: "label-text" }, "Complemento")
                          ]),
                          withDirectives(createVNode("input", {
                            type: "text",
                            placeholder: "Type here",
                            class: "input input-bordered bg-inherit w-full",
                            "onUpdate:modelValue": ($event) => unref(form).address_complement = $event
                          }, null, 8, ["onUpdate:modelValue"]), [
                            [vModelText, unref(form).address_complement]
                          ])
                        ])
                      ]),
                      createVNode("div", { class: "grid lg:grid-cols-2 gap-3" }, [
                        createVNode("label", { class: "form-control w-full" }, [
                          createVNode("div", { class: "label" }, [
                            createVNode("span", { class: "label-text" }, "Bairro")
                          ]),
                          withDirectives(createVNode("input", {
                            type: "text",
                            placeholder: "Type here",
                            class: "input input-bordered bg-inherit w-full",
                            "onUpdate:modelValue": ($event) => unref(form).neighborhood = $event
                          }, null, 8, ["onUpdate:modelValue"]), [
                            [vModelText, unref(form).neighborhood]
                          ]),
                          createVNode(InputError, {
                            class: "mt-2",
                            message: unref(form).errors.neighborhood
                          }, null, 8, ["message"]),
                          createVNode(InputError, {
                            class: "mt-2",
                            message: unref(form).errors.neighborhood
                          }, null, 8, ["message"])
                        ]),
                        createVNode("label", { class: "form-control w-full" }, [
                          createVNode("div", { class: "label" }, [
                            createVNode("span", { class: "label-text" }, "CEP")
                          ]),
                          withDirectives(createVNode("input", {
                            type: "text",
                            placeholder: "Type here",
                            class: "input input-bordered bg-inherit w-full",
                            "onUpdate:modelValue": ($event) => unref(form).zip_code = $event,
                            "data-maska": "#####-###"
                          }, null, 8, ["onUpdate:modelValue"]), [
                            [vModelText, unref(form).zip_code],
                            [unref(vMaska)]
                          ]),
                          createVNode(InputError, {
                            class: "mt-2",
                            message: unref(form).errors.zip_code
                          }, null, 8, ["message"])
                        ]),
                        createVNode("label", { class: "form-control w-full" }, [
                          createVNode("div", { class: "label" }, [
                            createVNode("span", { class: "label-text" }, "Cidade")
                          ]),
                          withDirectives(createVNode("input", {
                            type: "text",
                            placeholder: "Type here",
                            class: "input input-bordered bg-inherit w-full",
                            "onUpdate:modelValue": ($event) => unref(form).city = $event
                          }, null, 8, ["onUpdate:modelValue"]), [
                            [vModelText, unref(form).city]
                          ]),
                          createVNode(InputError, {
                            class: "mt-2",
                            message: unref(form).errors.city
                          }, null, 8, ["message"])
                        ]),
                        createVNode("label", { class: "form-control w-full" }, [
                          createVNode("div", { class: "label" }, [
                            createVNode("span", { class: "label-text" }, "Estado")
                          ]),
                          withDirectives(createVNode("input", {
                            type: "text",
                            placeholder: "Type here",
                            class: "input input-bordered bg-inherit w-full",
                            "onUpdate:modelValue": ($event) => unref(form).state = $event
                          }, null, 8, ["onUpdate:modelValue"]), [
                            [vModelText, unref(form).state]
                          ]),
                          createVNode(InputError, {
                            class: "mt-2",
                            message: unref(form).errors.state
                          }, null, 8, ["message"])
                        ])
                      ]),
                      createVNode("div", { class: "grid lg:grid-cols-2 gap-3" }, [
                        createVNode("label", { class: "form-control w-full" }, [
                          createVNode("div", { class: "label" }, [
                            createVNode("span", { class: "label-text" }, "Chave Pix")
                          ]),
                          withDirectives(createVNode("input", {
                            type: "text",
                            placeholder: "Type here",
                            class: "input input-bordered bg-inherit w-full",
                            "onUpdate:modelValue": ($event) => unref(form).pix_key = $event
                          }, null, 8, ["onUpdate:modelValue"]), [
                            [vModelText, unref(form).pix_key]
                          ])
                        ]),
                        createVNode("label", { class: "form-control w-full" }, [
                          createVNode("div", { class: "label" }, [
                            createVNode("span", { class: "label-text" }, "Logo")
                          ]),
                          createVNode("input", {
                            type: "file",
                            class: "file-input w-full bg-inherit mt-1 block",
                            onInput: ($event) => unref(form).image = $event.target.files[0]
                          }, null, 40, ["onInput"]),
                          createVNode(InputError, {
                            class: "mt-2",
                            message: unref(form).errors.logo
                          }, null, 8, ["message"])
                        ])
                      ]),
                      createVNode("div", { class: "mt-4" }, [
                        createVNode("h1", null, "Formas de Pagamento"),
                        createVNode("div", { class: "flex justify-between items-center" }, [
                          createVNode("label", { class: "label cursor-pointer flex justify-center gap-2 lg:gap-4" }, [
                            createVNode("span", { class: "label-text text-gray-700" }, "Cartão de Crédito"),
                            createVNode("input", {
                              type: "checkbox",
                              checked: unref(form).credit_cart,
                              class: "checkbox",
                              onChange: ($event) => unref(form).credit_cart = !unref(form).credit_cart
                            }, null, 40, ["checked", "onChange"])
                          ]),
                          createVNode("label", { class: "label cursor-pointer flex justify-center gap-4" }, [
                            createVNode("span", { class: "label-text text-gray-700" }, "Cartão de Débito"),
                            createVNode("input", {
                              type: "checkbox",
                              checked: unref(form).debit_cart,
                              class: "checkbox",
                              onChange: ($event) => unref(form).debit_cart = !unref(form).debit_cart
                            }, null, 40, ["checked", "onChange"])
                          ]),
                          createVNode("label", { class: "label cursor-pointer flex justify-center gap-4" }, [
                            createVNode("span", { class: "label-text text-gray-700" }, "Dinheiro"),
                            createVNode("input", {
                              type: "checkbox",
                              checked: unref(form).money,
                              class: "checkbox",
                              onChange: ($event) => unref(form).money = !unref(form).money
                            }, null, 40, ["checked", "onChange"])
                          ]),
                          createVNode("label", { class: "label cursor-pointer flex justify-center gap-4" }, [
                            createVNode("span", { class: "label-text text-gray-700" }, "Pix"),
                            createVNode("input", {
                              type: "checkbox",
                              class: "checkbox",
                              checked: unref(form).pix,
                              onChange: ($event) => unref(form).pix = !unref(form).pix
                            }, null, 40, ["checked", "onChange"])
                          ])
                        ])
                      ]),
                      createVNode("div", { class: "flex items-center justify-between mt-4 gap-6" }, [
                        createVNode("button", {
                          class: ["btn btn-success", { "opacity-25": unref(form).processing }],
                          disabled: unref(form).processing,
                          type: "submit"
                        }, " Editar ", 10, ["disabled"]),
                        createVNode(unref(Link), {
                          href: _ctx.route("company.index"),
                          class: "btn btn-error text-sm text-gray-600 hover:text-gray-900"
                        }, {
                          default: withCtx(() => [
                            createTextVNode(" Cancelar ")
                          ]),
                          _: 1
                        }, 8, ["href"])
                      ])
                    ], 32)
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
          } else {
            return [
              createVNode(SectionContainer, null, {
                default: withCtx(() => [
                  createTextVNode(toDisplayString(unref(form).credit_cart) + " ", 1),
                  createVNode("form", {
                    onSubmit: withModifiers(submit, ["prevent"])
                  }, [
                    createVNode("div", { class: "grid lg:grid-cols-2 gap-3" }, [
                      createVNode("label", { class: "form-control w-full" }, [
                        createVNode("div", { class: "label" }, [
                          createVNode("span", { class: "label-text" }, "Nome")
                        ]),
                        withDirectives(createVNode("input", {
                          type: "text",
                          placeholder: "Nome da empresa",
                          class: "input input-bordered bg-inherit w-full",
                          "onUpdate:modelValue": ($event) => unref(form).name = $event
                        }, null, 8, ["onUpdate:modelValue"]), [
                          [vModelText, unref(form).name]
                        ]),
                        createVNode(InputError, {
                          class: "mt-2",
                          message: unref(form).errors.name
                        }, null, 8, ["message"])
                      ]),
                      createVNode("label", { class: "form-control w-full" }, [
                        createVNode("div", { class: "label" }, [
                          createVNode("span", { class: "label-text" }, "Cnpj")
                        ]),
                        withDirectives(createVNode("input", {
                          type: "text",
                          placeholder: "Type here",
                          class: "input input-bordered bg-inherit w-full",
                          "onUpdate:modelValue": ($event) => unref(form).cnpj = $event,
                          "data-maska": "[\n                              '##.###.###/####-##'\n                            ]"
                        }, null, 8, ["onUpdate:modelValue"]), [
                          [vModelText, unref(form).cnpj],
                          [unref(vMaska)]
                        ]),
                        createVNode(InputError, {
                          class: "mt-2",
                          message: unref(form).errors.cnpj
                        }, null, 8, ["message"])
                      ]),
                      createVNode("label", { class: "form-control w-full" }, [
                        createVNode("div", { class: "label" }, [
                          createVNode("span", { class: "label-text" }, "Email")
                        ]),
                        withDirectives(createVNode("input", {
                          type: "text",
                          placeholder: "Type here",
                          class: "input input-bordered bg-inherit w-full",
                          "onUpdate:modelValue": ($event) => unref(form).email = $event
                        }, null, 8, ["onUpdate:modelValue"]), [
                          [vModelText, unref(form).email]
                        ]),
                        createVNode(InputError, {
                          class: "mt-2",
                          message: unref(form).errors.email
                        }, null, 8, ["message"])
                      ]),
                      createVNode("label", { class: "form-control w-full" }, [
                        createVNode("div", { class: "label" }, [
                          createVNode("span", { class: "label-text" }, "Telefone")
                        ]),
                        withDirectives(createVNode("input", {
                          type: "text",
                          placeholder: "Type here",
                          class: "input input-bordered bg-inherit w-full",
                          "onUpdate:modelValue": ($event) => unref(form).phone = $event,
                          "data-maska": "[\n                              '(##) #####-####',\n                              '(##) ####-####'\n                            ]"
                        }, null, 8, ["onUpdate:modelValue"]), [
                          [vModelText, unref(form).phone],
                          [unref(vMaska)]
                        ]),
                        createVNode(InputError, {
                          class: "mt-2",
                          message: unref(form).errors.phone
                        }, null, 8, ["message"])
                      ])
                    ]),
                    createVNode("div", { class: "grid lg:grid-cols-2 gap-3" }, [
                      createVNode("div", { class: "flex gap-3" }, [
                        createVNode("label", { class: "form-control w-full" }, [
                          createVNode("div", { class: "label" }, [
                            createVNode("span", { class: "label-text" }, "Endereço")
                          ]),
                          withDirectives(createVNode("input", {
                            type: "text",
                            placeholder: "Type here",
                            class: "input input-bordered bg-inherit w-full",
                            "onUpdate:modelValue": ($event) => unref(form).address = $event
                          }, null, 8, ["onUpdate:modelValue"]), [
                            [vModelText, unref(form).address]
                          ]),
                          createVNode(InputError, {
                            class: "mt-2",
                            message: unref(form).errors.address
                          }, null, 8, ["message"])
                        ]),
                        createVNode("label", { class: "form-control w-24" }, [
                          createVNode("div", { class: "label" }, [
                            createVNode("span", { class: "label-text" }, "Nº")
                          ]),
                          withDirectives(createVNode("input", {
                            type: "text",
                            placeholder: "Type here",
                            class: "input input-bordered bg-inherit w-24",
                            "onUpdate:modelValue": ($event) => unref(form).address_number = $event,
                            "data-maska": "######"
                          }, null, 8, ["onUpdate:modelValue"]), [
                            [vModelText, unref(form).address_number],
                            [unref(vMaska)]
                          ]),
                          createVNode(InputError, {
                            class: "mt-2",
                            message: unref(form).errors.address_number
                          }, null, 8, ["message"])
                        ])
                      ]),
                      createVNode("label", { class: "form-control w-full" }, [
                        createVNode("div", { class: "label" }, [
                          createVNode("span", { class: "label-text" }, "Complemento")
                        ]),
                        withDirectives(createVNode("input", {
                          type: "text",
                          placeholder: "Type here",
                          class: "input input-bordered bg-inherit w-full",
                          "onUpdate:modelValue": ($event) => unref(form).address_complement = $event
                        }, null, 8, ["onUpdate:modelValue"]), [
                          [vModelText, unref(form).address_complement]
                        ])
                      ])
                    ]),
                    createVNode("div", { class: "grid lg:grid-cols-2 gap-3" }, [
                      createVNode("label", { class: "form-control w-full" }, [
                        createVNode("div", { class: "label" }, [
                          createVNode("span", { class: "label-text" }, "Bairro")
                        ]),
                        withDirectives(createVNode("input", {
                          type: "text",
                          placeholder: "Type here",
                          class: "input input-bordered bg-inherit w-full",
                          "onUpdate:modelValue": ($event) => unref(form).neighborhood = $event
                        }, null, 8, ["onUpdate:modelValue"]), [
                          [vModelText, unref(form).neighborhood]
                        ]),
                        createVNode(InputError, {
                          class: "mt-2",
                          message: unref(form).errors.neighborhood
                        }, null, 8, ["message"]),
                        createVNode(InputError, {
                          class: "mt-2",
                          message: unref(form).errors.neighborhood
                        }, null, 8, ["message"])
                      ]),
                      createVNode("label", { class: "form-control w-full" }, [
                        createVNode("div", { class: "label" }, [
                          createVNode("span", { class: "label-text" }, "CEP")
                        ]),
                        withDirectives(createVNode("input", {
                          type: "text",
                          placeholder: "Type here",
                          class: "input input-bordered bg-inherit w-full",
                          "onUpdate:modelValue": ($event) => unref(form).zip_code = $event,
                          "data-maska": "#####-###"
                        }, null, 8, ["onUpdate:modelValue"]), [
                          [vModelText, unref(form).zip_code],
                          [unref(vMaska)]
                        ]),
                        createVNode(InputError, {
                          class: "mt-2",
                          message: unref(form).errors.zip_code
                        }, null, 8, ["message"])
                      ]),
                      createVNode("label", { class: "form-control w-full" }, [
                        createVNode("div", { class: "label" }, [
                          createVNode("span", { class: "label-text" }, "Cidade")
                        ]),
                        withDirectives(createVNode("input", {
                          type: "text",
                          placeholder: "Type here",
                          class: "input input-bordered bg-inherit w-full",
                          "onUpdate:modelValue": ($event) => unref(form).city = $event
                        }, null, 8, ["onUpdate:modelValue"]), [
                          [vModelText, unref(form).city]
                        ]),
                        createVNode(InputError, {
                          class: "mt-2",
                          message: unref(form).errors.city
                        }, null, 8, ["message"])
                      ]),
                      createVNode("label", { class: "form-control w-full" }, [
                        createVNode("div", { class: "label" }, [
                          createVNode("span", { class: "label-text" }, "Estado")
                        ]),
                        withDirectives(createVNode("input", {
                          type: "text",
                          placeholder: "Type here",
                          class: "input input-bordered bg-inherit w-full",
                          "onUpdate:modelValue": ($event) => unref(form).state = $event
                        }, null, 8, ["onUpdate:modelValue"]), [
                          [vModelText, unref(form).state]
                        ]),
                        createVNode(InputError, {
                          class: "mt-2",
                          message: unref(form).errors.state
                        }, null, 8, ["message"])
                      ])
                    ]),
                    createVNode("div", { class: "grid lg:grid-cols-2 gap-3" }, [
                      createVNode("label", { class: "form-control w-full" }, [
                        createVNode("div", { class: "label" }, [
                          createVNode("span", { class: "label-text" }, "Chave Pix")
                        ]),
                        withDirectives(createVNode("input", {
                          type: "text",
                          placeholder: "Type here",
                          class: "input input-bordered bg-inherit w-full",
                          "onUpdate:modelValue": ($event) => unref(form).pix_key = $event
                        }, null, 8, ["onUpdate:modelValue"]), [
                          [vModelText, unref(form).pix_key]
                        ])
                      ]),
                      createVNode("label", { class: "form-control w-full" }, [
                        createVNode("div", { class: "label" }, [
                          createVNode("span", { class: "label-text" }, "Logo")
                        ]),
                        createVNode("input", {
                          type: "file",
                          class: "file-input w-full bg-inherit mt-1 block",
                          onInput: ($event) => unref(form).image = $event.target.files[0]
                        }, null, 40, ["onInput"]),
                        createVNode(InputError, {
                          class: "mt-2",
                          message: unref(form).errors.logo
                        }, null, 8, ["message"])
                      ])
                    ]),
                    createVNode("div", { class: "mt-4" }, [
                      createVNode("h1", null, "Formas de Pagamento"),
                      createVNode("div", { class: "flex justify-between items-center" }, [
                        createVNode("label", { class: "label cursor-pointer flex justify-center gap-2 lg:gap-4" }, [
                          createVNode("span", { class: "label-text text-gray-700" }, "Cartão de Crédito"),
                          createVNode("input", {
                            type: "checkbox",
                            checked: unref(form).credit_cart,
                            class: "checkbox",
                            onChange: ($event) => unref(form).credit_cart = !unref(form).credit_cart
                          }, null, 40, ["checked", "onChange"])
                        ]),
                        createVNode("label", { class: "label cursor-pointer flex justify-center gap-4" }, [
                          createVNode("span", { class: "label-text text-gray-700" }, "Cartão de Débito"),
                          createVNode("input", {
                            type: "checkbox",
                            checked: unref(form).debit_cart,
                            class: "checkbox",
                            onChange: ($event) => unref(form).debit_cart = !unref(form).debit_cart
                          }, null, 40, ["checked", "onChange"])
                        ]),
                        createVNode("label", { class: "label cursor-pointer flex justify-center gap-4" }, [
                          createVNode("span", { class: "label-text text-gray-700" }, "Dinheiro"),
                          createVNode("input", {
                            type: "checkbox",
                            checked: unref(form).money,
                            class: "checkbox",
                            onChange: ($event) => unref(form).money = !unref(form).money
                          }, null, 40, ["checked", "onChange"])
                        ]),
                        createVNode("label", { class: "label cursor-pointer flex justify-center gap-4" }, [
                          createVNode("span", { class: "label-text text-gray-700" }, "Pix"),
                          createVNode("input", {
                            type: "checkbox",
                            class: "checkbox",
                            checked: unref(form).pix,
                            onChange: ($event) => unref(form).pix = !unref(form).pix
                          }, null, 40, ["checked", "onChange"])
                        ])
                      ])
                    ]),
                    createVNode("div", { class: "flex items-center justify-between mt-4 gap-6" }, [
                      createVNode("button", {
                        class: ["btn btn-success", { "opacity-25": unref(form).processing }],
                        disabled: unref(form).processing,
                        type: "submit"
                      }, " Editar ", 10, ["disabled"]),
                      createVNode(unref(Link), {
                        href: _ctx.route("company.index"),
                        class: "btn btn-error text-sm text-gray-600 hover:text-gray-900"
                      }, {
                        default: withCtx(() => [
                          createTextVNode(" Cancelar ")
                        ]),
                        _: 1
                      }, 8, ["href"])
                    ])
                  ], 32)
                ]),
                _: 1
              })
            ];
          }
        }),
        _: 1
      }, _parent));
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Pages/Company/Edit.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as default
};
