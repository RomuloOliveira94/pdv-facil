import { defineComponent, withCtx, createVNode, unref, mergeProps, createTextVNode, withModifiers, withDirectives, openBlock, createBlock, toDisplayString, createCommentVNode, useSSRContext } from "vue";
import { ssrRenderComponent, ssrGetDirectiveProps, ssrRenderAttr, ssrInterpolate, ssrRenderClass, ssrIncludeBooleanAttr } from "vue/server-renderer";
import { useForm, Head, Link, router } from "@inertiajs/vue3";
import { vMaska } from "maska";
import { S as SectionContainer } from "./SectionContainer-0J7EYAY4.js";
import { _ as _sfc_main$1 } from "./AuthenticatedLayout-D3YttXd4.js";
import { I as InputError } from "./InputError-DzpKvWT9.js";
import { I as InputLabel, T as TextInput } from "./TextInput-DFrpu0bn.js";
import "./_plugin-vue_export-helper-1tPrXgE0.js";
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "Edit",
  __ssrInlineRender: true,
  props: {
    product: {}
  },
  setup(__props) {
    const props = __props;
    const form = useForm({
      name: props.product.name,
      price: String(props.product.price),
      category: props.product.category,
      image: null,
      imageUrl: props.product.imageUrl
    });
    const submit = () => {
      router.post(route("products.update", props.product.id), {
        _method: "put",
        name: form.name,
        price: form.price,
        category: form.category,
        image: form.image,
        imageUrl: form.imageUrl
      });
    };
    return (_ctx, _push, _parent, _attrs) => {
      _push(ssrRenderComponent(_sfc_main$1, _attrs, {
        header: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div class="flex items-center justify-between"${_scopeId}><h2 class="font-semibold text-xl text-gray-800 leading-tight"${_scopeId}> Editar produto </h2></div>`);
          } else {
            return [
              createVNode("div", { class: "flex items-center justify-between" }, [
                createVNode("h2", { class: "font-semibold text-xl text-gray-800 leading-tight" }, " Editar produto ")
              ])
            ];
          }
        }),
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(unref(Head), { title: "Criar produto" }, null, _parent2, _scopeId));
            _push2(ssrRenderComponent(SectionContainer, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<form${_scopeId2}><div${_scopeId2}>`);
                  _push3(ssrRenderComponent(InputLabel, {
                    for: "name",
                    value: "Nome"
                  }, null, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(TextInput, {
                    id: "name",
                    type: "text",
                    class: "mt-1 block w-full",
                    modelValue: unref(form).name,
                    "onUpdate:modelValue": ($event) => unref(form).name = $event,
                    autofocus: "",
                    autocomplete: "name"
                  }, null, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(InputError, {
                    class: "mt-2",
                    message: unref(form).errors.name
                  }, null, _parent3, _scopeId2));
                  _push3(`</div><div class="mt-4"${_scopeId2}>`);
                  _push3(ssrRenderComponent(InputLabel, {
                    for: "price",
                    value: "Preço"
                  }, null, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(TextInput, mergeProps({
                    id: "price",
                    type: "text",
                    class: "mt-1 block w-full",
                    modelValue: unref(form).price,
                    "onUpdate:modelValue": ($event) => unref(form).price = $event,
                    autocomplete: "price",
                    "data-maska": "R$ 0.99",
                    "data-maska-tokens": "0:\\d:multiple|9:\\d:optional",
                    placeholder: "R$ 00.00"
                  }, ssrGetDirectiveProps(_ctx, unref(vMaska))), null, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(InputError, {
                    class: "mt-2",
                    message: unref(form).errors.price
                  }, null, _parent3, _scopeId2));
                  _push3(`</div><div class="mt-4"${_scopeId2}>`);
                  _push3(ssrRenderComponent(InputLabel, {
                    for: "category",
                    value: "Categoria"
                  }, null, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(TextInput, {
                    id: "category",
                    type: "text",
                    class: "mt-1 block w-full",
                    modelValue: unref(form).category,
                    "onUpdate:modelValue": ($event) => unref(form).category = $event,
                    autocomplete: "new-category"
                  }, null, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(InputError, {
                    class: "mt-2",
                    message: unref(form).errors.category
                  }, null, _parent3, _scopeId2));
                  _push3(`</div><div class="mt-4"${_scopeId2}>`);
                  _push3(ssrRenderComponent(InputLabel, {
                    for: "image",
                    value: "Imagem"
                  }, null, _parent3, _scopeId2));
                  _push3(`<input type="file" class="file-input w-full bg-inherit mt-1 block"${_scopeId2}>`);
                  if (unref(form).progress) {
                    _push3(`<progress class="progress w-56"${ssrRenderAttr("value", unref(form).progress.percentage)} max="100"${_scopeId2}>${ssrInterpolate(unref(form).progress.percentage)}% </progress>`);
                  } else {
                    _push3(`<!---->`);
                  }
                  _push3(ssrRenderComponent(InputError, {
                    class: "mt-2",
                    message: unref(form).errors.image
                  }, null, _parent3, _scopeId2));
                  _push3(`</div><div class="flex items-center justify-between mt-4 gap-6"${_scopeId2}><button class="${ssrRenderClass([{ "opacity-25": unref(form).processing }, "btn btn-success"])}"${ssrIncludeBooleanAttr(unref(form).processing) ? " disabled" : ""} type="submit"${_scopeId2}> Editar </button>`);
                  _push3(ssrRenderComponent(unref(Link), {
                    href: _ctx.route("products.index"),
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
                    createVNode("form", {
                      onSubmit: withModifiers(submit, ["prevent"])
                    }, [
                      createVNode("div", null, [
                        createVNode(InputLabel, {
                          for: "name",
                          value: "Nome"
                        }),
                        createVNode(TextInput, {
                          id: "name",
                          type: "text",
                          class: "mt-1 block w-full",
                          modelValue: unref(form).name,
                          "onUpdate:modelValue": ($event) => unref(form).name = $event,
                          autofocus: "",
                          autocomplete: "name"
                        }, null, 8, ["modelValue", "onUpdate:modelValue"]),
                        createVNode(InputError, {
                          class: "mt-2",
                          message: unref(form).errors.name
                        }, null, 8, ["message"])
                      ]),
                      createVNode("div", { class: "mt-4" }, [
                        createVNode(InputLabel, {
                          for: "price",
                          value: "Preço"
                        }),
                        withDirectives(createVNode(TextInput, {
                          id: "price",
                          type: "text",
                          class: "mt-1 block w-full",
                          modelValue: unref(form).price,
                          "onUpdate:modelValue": ($event) => unref(form).price = $event,
                          autocomplete: "price",
                          "data-maska": "R$ 0.99",
                          "data-maska-tokens": "0:\\d:multiple|9:\\d:optional",
                          placeholder: "R$ 00.00"
                        }, null, 8, ["modelValue", "onUpdate:modelValue"]), [
                          [unref(vMaska)]
                        ]),
                        createVNode(InputError, {
                          class: "mt-2",
                          message: unref(form).errors.price
                        }, null, 8, ["message"])
                      ]),
                      createVNode("div", { class: "mt-4" }, [
                        createVNode(InputLabel, {
                          for: "category",
                          value: "Categoria"
                        }),
                        createVNode(TextInput, {
                          id: "category",
                          type: "text",
                          class: "mt-1 block w-full",
                          modelValue: unref(form).category,
                          "onUpdate:modelValue": ($event) => unref(form).category = $event,
                          autocomplete: "new-category"
                        }, null, 8, ["modelValue", "onUpdate:modelValue"]),
                        createVNode(InputError, {
                          class: "mt-2",
                          message: unref(form).errors.category
                        }, null, 8, ["message"])
                      ]),
                      createVNode("div", { class: "mt-4" }, [
                        createVNode(InputLabel, {
                          for: "image",
                          value: "Imagem"
                        }),
                        createVNode("input", {
                          type: "file",
                          class: "file-input w-full bg-inherit mt-1 block",
                          onInput: ($event) => unref(form).image = $event.target.files[0]
                        }, null, 40, ["onInput"]),
                        unref(form).progress ? (openBlock(), createBlock("progress", {
                          key: 0,
                          class: "progress w-56",
                          value: unref(form).progress.percentage,
                          max: "100"
                        }, toDisplayString(unref(form).progress.percentage) + "% ", 9, ["value"])) : createCommentVNode("", true),
                        createVNode(InputError, {
                          class: "mt-2",
                          message: unref(form).errors.image
                        }, null, 8, ["message"])
                      ]),
                      createVNode("div", { class: "flex items-center justify-between mt-4 gap-6" }, [
                        createVNode("button", {
                          class: ["btn btn-success", { "opacity-25": unref(form).processing }],
                          disabled: unref(form).processing,
                          type: "submit"
                        }, " Editar ", 10, ["disabled"]),
                        createVNode(unref(Link), {
                          href: _ctx.route("products.index"),
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
              createVNode(unref(Head), { title: "Criar produto" }),
              createVNode(SectionContainer, null, {
                default: withCtx(() => [
                  createVNode("form", {
                    onSubmit: withModifiers(submit, ["prevent"])
                  }, [
                    createVNode("div", null, [
                      createVNode(InputLabel, {
                        for: "name",
                        value: "Nome"
                      }),
                      createVNode(TextInput, {
                        id: "name",
                        type: "text",
                        class: "mt-1 block w-full",
                        modelValue: unref(form).name,
                        "onUpdate:modelValue": ($event) => unref(form).name = $event,
                        autofocus: "",
                        autocomplete: "name"
                      }, null, 8, ["modelValue", "onUpdate:modelValue"]),
                      createVNode(InputError, {
                        class: "mt-2",
                        message: unref(form).errors.name
                      }, null, 8, ["message"])
                    ]),
                    createVNode("div", { class: "mt-4" }, [
                      createVNode(InputLabel, {
                        for: "price",
                        value: "Preço"
                      }),
                      withDirectives(createVNode(TextInput, {
                        id: "price",
                        type: "text",
                        class: "mt-1 block w-full",
                        modelValue: unref(form).price,
                        "onUpdate:modelValue": ($event) => unref(form).price = $event,
                        autocomplete: "price",
                        "data-maska": "R$ 0.99",
                        "data-maska-tokens": "0:\\d:multiple|9:\\d:optional",
                        placeholder: "R$ 00.00"
                      }, null, 8, ["modelValue", "onUpdate:modelValue"]), [
                        [unref(vMaska)]
                      ]),
                      createVNode(InputError, {
                        class: "mt-2",
                        message: unref(form).errors.price
                      }, null, 8, ["message"])
                    ]),
                    createVNode("div", { class: "mt-4" }, [
                      createVNode(InputLabel, {
                        for: "category",
                        value: "Categoria"
                      }),
                      createVNode(TextInput, {
                        id: "category",
                        type: "text",
                        class: "mt-1 block w-full",
                        modelValue: unref(form).category,
                        "onUpdate:modelValue": ($event) => unref(form).category = $event,
                        autocomplete: "new-category"
                      }, null, 8, ["modelValue", "onUpdate:modelValue"]),
                      createVNode(InputError, {
                        class: "mt-2",
                        message: unref(form).errors.category
                      }, null, 8, ["message"])
                    ]),
                    createVNode("div", { class: "mt-4" }, [
                      createVNode(InputLabel, {
                        for: "image",
                        value: "Imagem"
                      }),
                      createVNode("input", {
                        type: "file",
                        class: "file-input w-full bg-inherit mt-1 block",
                        onInput: ($event) => unref(form).image = $event.target.files[0]
                      }, null, 40, ["onInput"]),
                      unref(form).progress ? (openBlock(), createBlock("progress", {
                        key: 0,
                        class: "progress w-56",
                        value: unref(form).progress.percentage,
                        max: "100"
                      }, toDisplayString(unref(form).progress.percentage) + "% ", 9, ["value"])) : createCommentVNode("", true),
                      createVNode(InputError, {
                        class: "mt-2",
                        message: unref(form).errors.image
                      }, null, 8, ["message"])
                    ]),
                    createVNode("div", { class: "flex items-center justify-between mt-4 gap-6" }, [
                      createVNode("button", {
                        class: ["btn btn-success", { "opacity-25": unref(form).processing }],
                        disabled: unref(form).processing,
                        type: "submit"
                      }, " Editar ", 10, ["disabled"]),
                      createVNode(unref(Link), {
                        href: _ctx.route("products.index"),
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Pages/Products/Edit.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as default
};
