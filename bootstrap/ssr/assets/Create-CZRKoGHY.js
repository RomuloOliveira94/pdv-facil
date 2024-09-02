import { defineComponent, ref, computed, reactive, unref, withCtx, createVNode, toDisplayString, mergeProps, openBlock, createBlock, Fragment, renderList, createCommentVNode, withDirectives, vShow, vModelSelect, createTextVNode, useSSRContext } from "vue";
import { ssrRenderComponent, ssrInterpolate, ssrRenderList, ssrGetDirectiveProps, ssrRenderStyle, ssrRenderAttr } from "vue/server-renderer";
import { I as InputLabel, T as TextInput } from "./TextInput-DFrpu0bn.js";
import { S as SectionContainer } from "./SectionContainer-0J7EYAY4.js";
import { _ as _sfc_main$1, b as formatRoles, a as formatMoneyToBRL } from "./AuthenticatedLayout-D3YttXd4.js";
import { T as ToastSuccess, a as ToastError } from "./ToastSuccess-Bwu8pRAO.js";
import { _ as _sfc_main$2 } from "./SearchInput-CNPIwvk2.js";
import { vMaska } from "maska";
import { Head, router } from "@inertiajs/vue3";
import { P as Pagination } from "./Pagination-rhuZjxLX.js";
import _sfc_main$3 from "./PrintReceiptModal-B1z3J3pw.js";
import "./_plugin-vue_export-helper-1tPrXgE0.js";
import "print-js";
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "Create",
  __ssrInlineRender: true,
  props: {
    cashier: {},
    products: {},
    paymentMethods: {},
    search: {}
  },
  setup(__props) {
    const props = __props;
    const query = ref(props.search);
    const linksWithSearch = computed(() => {
      return props.products.links.map((link) => {
        if (link.url === null)
          return link;
        let url = new URL(link.url);
        if (query.value) {
          url.searchParams.set("product", query.value);
        }
        return {
          ...link,
          url: `${url}`
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
      paymentMethod: null,
      total: 0
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
      const totalWithPercentage = total + total * (paymentMethodTaxIfCredit / 100);
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
          quantity: 1
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
          price: product.quantity * product.price
        })),
        cashier_id: props.cashier.id,
        delivery_tax: deliveryTax.value,
        discount: discount.value,
        payment_type_id: sell.paymentMethod,
        subtotal: sellSubTotal.value,
        total: sellTotal.value
      };
      sell.products = [];
      sell.delivery = "";
      sell.discount = "";
      sell.paymentMethod = null;
      sell.total = 0;
      receipt.showModal();
      router.post(route("sells.store"), data);
      router.on("success", () => {
        showSuccessToast.value = true;
        receipt.showModal();
        setTimeout(() => {
          showSuccessToast.value = false;
        }, 4e3);
      });
      router.on("error", () => {
        showErrorToast.value = true;
        setTimeout(() => {
          showErrorToast.value = false;
        }, 4e3);
      });
    };
    const openCashier = () => {
      router.post(route("cashiers.store"));
    };
    const closeCashier = (id) => {
      confirm("Deseja realmente fechar o caixa?") && router.put(route("cashiers.update", props.cashier.id));
    };
    const searchProducts = (search) => {
      query.value = search;
      router.get(
        route("sells.create", { product: query.value }),
        {},
        { preserveState: true, preserveScroll: true }
      );
    };
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<!--[-->`);
      _push(ssrRenderComponent(unref(Head), { title: "Venda" }, null, _parent));
      _push(ssrRenderComponent(_sfc_main$1, null, {
        header: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div class="flex gap-6 items-center justify-center"${_scopeId}><h2 class="font-semibold text-xl text-gray-800 leading-tight"${_scopeId}> Registar Venda </h2><span class="text-gray-800"${_scopeId}>|</span><div class="flex items-center flex-col md:flex-row md:gap-2"${_scopeId}><h3 class="text-lg font-bold text-gray-800"${_scopeId}> Caixa: ${ssrInterpolate(_ctx.$page.props.auth.user.name)}</h3><small class="font-semibold text-xs pt-0.5"${_scopeId}> (${ssrInterpolate(unref(formatRoles)(_ctx.$page.props.auth.user.role))}) </small></div></div>`);
          } else {
            return [
              createVNode("div", { class: "flex gap-6 items-center justify-center" }, [
                createVNode("h2", { class: "font-semibold text-xl text-gray-800 leading-tight" }, " Registar Venda "),
                createVNode("span", { class: "text-gray-800" }, "|"),
                createVNode("div", { class: "flex items-center flex-col md:flex-row md:gap-2" }, [
                  createVNode("h3", { class: "text-lg font-bold text-gray-800" }, " Caixa: " + toDisplayString(_ctx.$page.props.auth.user.name), 1),
                  createVNode("small", { class: "font-semibold text-xs pt-0.5" }, " (" + toDisplayString(unref(formatRoles)(_ctx.$page.props.auth.user.role)) + ") ", 1)
                ])
              ])
            ];
          }
        }),
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          var _a, _b, _c, _d, _e, _f;
          if (_push2) {
            if (!_ctx.cashier || !((_a = _ctx.cashier) == null ? void 0 : _a.active)) {
              _push2(`<button class="btn btn-primary btn-lg w-full"${_scopeId}> Abrir Caixa </button>`);
            } else {
              _push2(`<!---->`);
            }
            if (_ctx.cashier && ((_b = _ctx.cashier) == null ? void 0 : _b.active)) {
              _push2(ssrRenderComponent(SectionContainer, { class: "min-h-[20vh] flex flex-col" }, {
                default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(`<div class="grid"${_scopeId2}><h1 class="text-xl font-semibold mb-6"${_scopeId2}>Venda</h1><div class="overflow-x-auto"${_scopeId2}><ul class="overflow-x-auto flex justify-between md:grid md:grid-cols-1 min-w-full gap-12 md:gap-2"${_scopeId2}><li${_scopeId2}><div class="grid md:grid-cols-5 gap-1"${_scopeId2}><span class="font-semibold"${_scopeId2}>Produto</span><span class="font-semibold"${_scopeId2}>Preço</span><span class="font-semibold"${_scopeId2}>Quantidade</span><span class="font-semibold"${_scopeId2}>Total</span><span class="md:text-end font-semibold"${_scopeId2}>Remover</span></div></li><!--[-->`);
                    ssrRenderList(sell.products, (product, index) => {
                      _push3(`<li${_scopeId2}><div class="grid md:grid-cols-5 text-end md:text-start min-w-full gap-1"${_scopeId2}><p class="block w-full whitespace-nowrap"${_scopeId2}>${ssrInterpolate(product.name)}</p><span${_scopeId2}>${ssrInterpolate(unref(formatMoneyToBRL)(product.price))}</span><span class="ml-10"${_scopeId2}>${ssrInterpolate(product.quantity)}</span><span${_scopeId2}>${ssrInterpolate(unref(formatMoneyToBRL)(
                        product.price * product.quantity
                      ))}</span><div class="flex items-center justify-end w-full h-full"${_scopeId2}><button class="font-semibold bg-error rounded-full h-6 w-6 my-0.5 text-white cursor-pointer hover:bg-red-600 text-center"${_scopeId2}> X </button></div></div></li>`);
                    });
                    _push3(`<!--]--></ul></div><hr class="my-6"${_scopeId2}>`);
                    if (sell.total > 0) {
                      _push3(`<button class="link mt-6 w-full self-center"${_scopeId2}>${ssrInterpolate(!showDiscount.value ? "Adicionar desconto?" : "Remover desconto.")}</button>`);
                    } else {
                      _push3(`<!---->`);
                    }
                    if (sell.total > 0) {
                      _push3(`<div class="flex justify-center gap-3 items-center flex-col md:flex-row"${_scopeId2}><div${_scopeId2}>`);
                      _push3(ssrRenderComponent(InputLabel, {
                        for: "delivery",
                        value: "Taxa de entrega"
                      }, null, _parent3, _scopeId2));
                      _push3(ssrRenderComponent(TextInput, mergeProps({
                        id: "delivery",
                        type: "text",
                        class: "block w-full",
                        modelValue: sell.delivery,
                        "onUpdate:modelValue": ($event) => sell.delivery = $event,
                        autofocus: "",
                        autocomplete: "delivery",
                        "data-maska": "0.99",
                        "data-maska-tokens": "0:\\d:multiple|9:\\d:optional",
                        placeholder: "R$ 00.00"
                      }, ssrGetDirectiveProps(_ctx, unref(vMaska))), null, _parent3, _scopeId2));
                      _push3(`</div><div style="${ssrRenderStyle(showDiscount.value ? null : { display: "none" })}"${_scopeId2}>`);
                      _push3(ssrRenderComponent(InputLabel, {
                        for: "discount",
                        value: "Desconto"
                      }, null, _parent3, _scopeId2));
                      _push3(ssrRenderComponent(TextInput, mergeProps({
                        id: "discount",
                        type: "text",
                        class: "block w-full",
                        modelValue: sell.discount,
                        "onUpdate:modelValue": ($event) => sell.discount = $event,
                        autofocus: "",
                        autocomplete: "discount",
                        "data-maska": "0.99",
                        "data-maska-tokens": "0:\\d:multiple|9:\\d:optional",
                        placeholder: "R$ 00.00"
                      }, ssrGetDirectiveProps(_ctx, unref(vMaska))), null, _parent3, _scopeId2));
                      _push3(`</div><select class="border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 rounded-md shadow-sm md:self-end"${_scopeId2}><option disabled selected${_scopeId2}>Pagamento</option><!--[-->`);
                      ssrRenderList(_ctx.paymentMethods, (payment, index) => {
                        _push3(`<option${ssrRenderAttr("value", payment.id)}${_scopeId2}>${ssrInterpolate(payment.name)}</option>`);
                      });
                      _push3(`<!--]--></select><div class="md:self-end"${_scopeId2}><h2 class="font-semibold text-lg text-gray-800"${_scopeId2}> Subtotal: ${ssrInterpolate(unref(formatMoneyToBRL)(sellSubTotal.value))}</h2><h2 class="font-semibold text-lg text-gray-800"${_scopeId2}> Total: ${ssrInterpolate(unref(formatMoneyToBRL)(sellTotal.value))}</h2></div></div>`);
                    } else {
                      _push3(`<!---->`);
                    }
                    _push3(`<button class="btn btn-primary mt-6 w-full text-xl"${_scopeId2}> Criar venda </button></div>`);
                  } else {
                    return [
                      createVNode("div", { class: "grid" }, [
                        createVNode("h1", { class: "text-xl font-semibold mb-6" }, "Venda"),
                        createVNode("div", { class: "overflow-x-auto" }, [
                          createVNode("ul", { class: "overflow-x-auto flex justify-between md:grid md:grid-cols-1 min-w-full gap-12 md:gap-2" }, [
                            createVNode("li", null, [
                              createVNode("div", { class: "grid md:grid-cols-5 gap-1" }, [
                                createVNode("span", { class: "font-semibold" }, "Produto"),
                                createVNode("span", { class: "font-semibold" }, "Preço"),
                                createVNode("span", { class: "font-semibold" }, "Quantidade"),
                                createVNode("span", { class: "font-semibold" }, "Total"),
                                createVNode("span", { class: "md:text-end font-semibold" }, "Remover")
                              ])
                            ]),
                            (openBlock(true), createBlock(Fragment, null, renderList(sell.products, (product, index) => {
                              return openBlock(), createBlock("li", { key: index }, [
                                createVNode("div", { class: "grid md:grid-cols-5 text-end md:text-start min-w-full gap-1" }, [
                                  createVNode("p", { class: "block w-full whitespace-nowrap" }, toDisplayString(product.name), 1),
                                  createVNode("span", null, toDisplayString(unref(formatMoneyToBRL)(product.price)), 1),
                                  createVNode("span", { class: "ml-10" }, toDisplayString(product.quantity), 1),
                                  createVNode("span", null, toDisplayString(unref(formatMoneyToBRL)(
                                    product.price * product.quantity
                                  )), 1),
                                  createVNode("div", { class: "flex items-center justify-end w-full h-full" }, [
                                    createVNode("button", {
                                      onClick: ($event) => removeProduct(product),
                                      class: "font-semibold bg-error rounded-full h-6 w-6 my-0.5 text-white cursor-pointer hover:bg-red-600 text-center"
                                    }, " X ", 8, ["onClick"])
                                  ])
                                ])
                              ]);
                            }), 128))
                          ])
                        ]),
                        createVNode("hr", { class: "my-6" }),
                        sell.total > 0 ? (openBlock(), createBlock("button", {
                          key: 0,
                          class: "link mt-6 w-full self-center",
                          onClick: ($event) => showDiscount.value = !showDiscount.value
                        }, toDisplayString(!showDiscount.value ? "Adicionar desconto?" : "Remover desconto."), 9, ["onClick"])) : createCommentVNode("", true),
                        sell.total > 0 ? (openBlock(), createBlock("div", {
                          key: 1,
                          class: "flex justify-center gap-3 items-center flex-col md:flex-row"
                        }, [
                          createVNode("div", null, [
                            createVNode(InputLabel, {
                              for: "delivery",
                              value: "Taxa de entrega"
                            }),
                            withDirectives(createVNode(TextInput, {
                              id: "delivery",
                              type: "text",
                              class: "block w-full",
                              modelValue: sell.delivery,
                              "onUpdate:modelValue": ($event) => sell.delivery = $event,
                              autofocus: "",
                              autocomplete: "delivery",
                              "data-maska": "0.99",
                              "data-maska-tokens": "0:\\d:multiple|9:\\d:optional",
                              placeholder: "R$ 00.00"
                            }, null, 8, ["modelValue", "onUpdate:modelValue"]), [
                              [unref(vMaska)]
                            ])
                          ]),
                          withDirectives(createVNode("div", null, [
                            createVNode(InputLabel, {
                              for: "discount",
                              value: "Desconto"
                            }),
                            withDirectives(createVNode(TextInput, {
                              id: "discount",
                              type: "text",
                              class: "block w-full",
                              modelValue: sell.discount,
                              "onUpdate:modelValue": ($event) => sell.discount = $event,
                              autofocus: "",
                              autocomplete: "discount",
                              "data-maska": "0.99",
                              "data-maska-tokens": "0:\\d:multiple|9:\\d:optional",
                              placeholder: "R$ 00.00"
                            }, null, 8, ["modelValue", "onUpdate:modelValue"]), [
                              [unref(vMaska)]
                            ])
                          ], 512), [
                            [vShow, showDiscount.value]
                          ]),
                          withDirectives(createVNode("select", {
                            class: "border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 rounded-md shadow-sm md:self-end",
                            "onUpdate:modelValue": ($event) => sell.paymentMethod = $event
                          }, [
                            createVNode("option", {
                              disabled: "",
                              selected: ""
                            }, "Pagamento"),
                            (openBlock(true), createBlock(Fragment, null, renderList(_ctx.paymentMethods, (payment, index) => {
                              return openBlock(), createBlock("option", {
                                key: index,
                                value: payment.id
                              }, toDisplayString(payment.name), 9, ["value"]);
                            }), 128))
                          ], 8, ["onUpdate:modelValue"]), [
                            [vModelSelect, sell.paymentMethod]
                          ]),
                          createVNode("div", { class: "md:self-end" }, [
                            createVNode("h2", { class: "font-semibold text-lg text-gray-800" }, " Subtotal: " + toDisplayString(unref(formatMoneyToBRL)(sellSubTotal.value)), 1),
                            createVNode("h2", { class: "font-semibold text-lg text-gray-800" }, " Total: " + toDisplayString(unref(formatMoneyToBRL)(sellTotal.value)), 1)
                          ])
                        ])) : createCommentVNode("", true),
                        createVNode("button", {
                          onClick: createSell,
                          class: "btn btn-primary mt-6 w-full text-xl"
                        }, " Criar venda ")
                      ])
                    ];
                  }
                }),
                _: 1
              }, _parent2, _scopeId));
            } else {
              _push2(`<!---->`);
            }
            if (_ctx.cashier && ((_c = _ctx.cashier) == null ? void 0 : _c.active)) {
              _push2(`<button class="btn btn-error btn-lg w-full mt-6"${_scopeId}> Fechar Caixa </button>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`<div class="mt-6 bg-white p-6 rounded-md"${_scopeId}><h1 class="text-3xl font-bold mb-2 text-gray-800 text-center"${_scopeId}> Produtos </h1>`);
            _push2(ssrRenderComponent(_sfc_main$2, {
              class: "my-4",
              placeholder: "Pesquisar produtos",
              onSearch: searchProducts,
              q: query.value
            }, null, _parent2, _scopeId));
            _push2(`<div class="grid lg:grid-cols-4 mx-auto gap-3 text-gray-800 w-full"${_scopeId}><!--[-->`);
            ssrRenderList(_ctx.products.data, (product, index) => {
              _push2(`<div class="card card-side border border-slate-50 items-center shadow-sm"${_scopeId}><div class="grid p-2 gap-3 w-full"${_scopeId}><figure style="${ssrRenderStyle(product ? null : { display: "none" })}" class="h-32 relative"${_scopeId}><span style="${ssrRenderStyle(!product.imageUrl ? null : { display: "none" })}" class="text-2xl text-white font-bold absolute top-12 text-center z-10"${_scopeId}>${ssrInterpolate(product.name)}</span><div style="${ssrRenderStyle(!product.imageUrl ? null : { display: "none" })}" class="absolute bg-black opacity-80 rounded-lg w-full"${_scopeId}></div><img${ssrRenderAttr(
                "src",
                product.imageUrl ? "/storage/" + product.imageUrl : "/storage/logos/pdvfacil.png"
              )}${ssrRenderAttr("alt", product.name)} class="object-cover w-full h-full rounded-lg"${_scopeId}></figure><div class="flex justify-between items-center w-full"${_scopeId}><div${_scopeId}><h2 class="text-wrap truncate ... font-semibold text-lg"${_scopeId}>${ssrInterpolate(product.name)}</h2><p${_scopeId}>${ssrInterpolate(unref(formatMoneyToBRL)(product.price))}</p></div><div class="card-actions justify-end flex-col"${_scopeId}><button class="btn btn-info btn-sm w-full"${_scopeId}> Adicionar </button></div></div></div></div>`);
            });
            _push2(`<!--]--></div>`);
            _push2(ssrRenderComponent(Pagination, {
              class: "mt-6",
              links: linksWithSearch.value
            }, null, _parent2, _scopeId));
            _push2(`</div>`);
            if (showSuccessToast.value) {
              _push2(ssrRenderComponent(ToastSuccess, null, {
                default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(` Venda criada com sucesso! `);
                  } else {
                    return [
                      createTextVNode(" Venda criada com sucesso! ")
                    ];
                  }
                }),
                _: 1
              }, _parent2, _scopeId));
            } else {
              _push2(`<!---->`);
            }
            if (showErrorToast.value) {
              _push2(ssrRenderComponent(ToastError, null, {
                default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(` Erro ao criar venda! `);
                  } else {
                    return [
                      createTextVNode(" Erro ao criar venda! ")
                    ];
                  }
                }),
                _: 1
              }, _parent2, _scopeId));
            } else {
              _push2(`<!---->`);
            }
            _push2(ssrRenderComponent(_sfc_main$3, null, null, _parent2, _scopeId));
          } else {
            return [
              !_ctx.cashier || !((_d = _ctx.cashier) == null ? void 0 : _d.active) ? (openBlock(), createBlock("button", {
                key: 0,
                class: "btn btn-primary btn-lg w-full",
                onClick: openCashier
              }, " Abrir Caixa ")) : createCommentVNode("", true),
              _ctx.cashier && ((_e = _ctx.cashier) == null ? void 0 : _e.active) ? (openBlock(), createBlock(SectionContainer, {
                key: 1,
                class: "min-h-[20vh] flex flex-col"
              }, {
                default: withCtx(() => [
                  createVNode("div", { class: "grid" }, [
                    createVNode("h1", { class: "text-xl font-semibold mb-6" }, "Venda"),
                    createVNode("div", { class: "overflow-x-auto" }, [
                      createVNode("ul", { class: "overflow-x-auto flex justify-between md:grid md:grid-cols-1 min-w-full gap-12 md:gap-2" }, [
                        createVNode("li", null, [
                          createVNode("div", { class: "grid md:grid-cols-5 gap-1" }, [
                            createVNode("span", { class: "font-semibold" }, "Produto"),
                            createVNode("span", { class: "font-semibold" }, "Preço"),
                            createVNode("span", { class: "font-semibold" }, "Quantidade"),
                            createVNode("span", { class: "font-semibold" }, "Total"),
                            createVNode("span", { class: "md:text-end font-semibold" }, "Remover")
                          ])
                        ]),
                        (openBlock(true), createBlock(Fragment, null, renderList(sell.products, (product, index) => {
                          return openBlock(), createBlock("li", { key: index }, [
                            createVNode("div", { class: "grid md:grid-cols-5 text-end md:text-start min-w-full gap-1" }, [
                              createVNode("p", { class: "block w-full whitespace-nowrap" }, toDisplayString(product.name), 1),
                              createVNode("span", null, toDisplayString(unref(formatMoneyToBRL)(product.price)), 1),
                              createVNode("span", { class: "ml-10" }, toDisplayString(product.quantity), 1),
                              createVNode("span", null, toDisplayString(unref(formatMoneyToBRL)(
                                product.price * product.quantity
                              )), 1),
                              createVNode("div", { class: "flex items-center justify-end w-full h-full" }, [
                                createVNode("button", {
                                  onClick: ($event) => removeProduct(product),
                                  class: "font-semibold bg-error rounded-full h-6 w-6 my-0.5 text-white cursor-pointer hover:bg-red-600 text-center"
                                }, " X ", 8, ["onClick"])
                              ])
                            ])
                          ]);
                        }), 128))
                      ])
                    ]),
                    createVNode("hr", { class: "my-6" }),
                    sell.total > 0 ? (openBlock(), createBlock("button", {
                      key: 0,
                      class: "link mt-6 w-full self-center",
                      onClick: ($event) => showDiscount.value = !showDiscount.value
                    }, toDisplayString(!showDiscount.value ? "Adicionar desconto?" : "Remover desconto."), 9, ["onClick"])) : createCommentVNode("", true),
                    sell.total > 0 ? (openBlock(), createBlock("div", {
                      key: 1,
                      class: "flex justify-center gap-3 items-center flex-col md:flex-row"
                    }, [
                      createVNode("div", null, [
                        createVNode(InputLabel, {
                          for: "delivery",
                          value: "Taxa de entrega"
                        }),
                        withDirectives(createVNode(TextInput, {
                          id: "delivery",
                          type: "text",
                          class: "block w-full",
                          modelValue: sell.delivery,
                          "onUpdate:modelValue": ($event) => sell.delivery = $event,
                          autofocus: "",
                          autocomplete: "delivery",
                          "data-maska": "0.99",
                          "data-maska-tokens": "0:\\d:multiple|9:\\d:optional",
                          placeholder: "R$ 00.00"
                        }, null, 8, ["modelValue", "onUpdate:modelValue"]), [
                          [unref(vMaska)]
                        ])
                      ]),
                      withDirectives(createVNode("div", null, [
                        createVNode(InputLabel, {
                          for: "discount",
                          value: "Desconto"
                        }),
                        withDirectives(createVNode(TextInput, {
                          id: "discount",
                          type: "text",
                          class: "block w-full",
                          modelValue: sell.discount,
                          "onUpdate:modelValue": ($event) => sell.discount = $event,
                          autofocus: "",
                          autocomplete: "discount",
                          "data-maska": "0.99",
                          "data-maska-tokens": "0:\\d:multiple|9:\\d:optional",
                          placeholder: "R$ 00.00"
                        }, null, 8, ["modelValue", "onUpdate:modelValue"]), [
                          [unref(vMaska)]
                        ])
                      ], 512), [
                        [vShow, showDiscount.value]
                      ]),
                      withDirectives(createVNode("select", {
                        class: "border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 rounded-md shadow-sm md:self-end",
                        "onUpdate:modelValue": ($event) => sell.paymentMethod = $event
                      }, [
                        createVNode("option", {
                          disabled: "",
                          selected: ""
                        }, "Pagamento"),
                        (openBlock(true), createBlock(Fragment, null, renderList(_ctx.paymentMethods, (payment, index) => {
                          return openBlock(), createBlock("option", {
                            key: index,
                            value: payment.id
                          }, toDisplayString(payment.name), 9, ["value"]);
                        }), 128))
                      ], 8, ["onUpdate:modelValue"]), [
                        [vModelSelect, sell.paymentMethod]
                      ]),
                      createVNode("div", { class: "md:self-end" }, [
                        createVNode("h2", { class: "font-semibold text-lg text-gray-800" }, " Subtotal: " + toDisplayString(unref(formatMoneyToBRL)(sellSubTotal.value)), 1),
                        createVNode("h2", { class: "font-semibold text-lg text-gray-800" }, " Total: " + toDisplayString(unref(formatMoneyToBRL)(sellTotal.value)), 1)
                      ])
                    ])) : createCommentVNode("", true),
                    createVNode("button", {
                      onClick: createSell,
                      class: "btn btn-primary mt-6 w-full text-xl"
                    }, " Criar venda ")
                  ])
                ]),
                _: 1
              })) : createCommentVNode("", true),
              _ctx.cashier && ((_f = _ctx.cashier) == null ? void 0 : _f.active) ? (openBlock(), createBlock("button", {
                key: 2,
                class: "btn btn-error btn-lg w-full mt-6",
                onClick: closeCashier
              }, " Fechar Caixa ")) : createCommentVNode("", true),
              createVNode("div", { class: "mt-6 bg-white p-6 rounded-md" }, [
                createVNode("h1", { class: "text-3xl font-bold mb-2 text-gray-800 text-center" }, " Produtos "),
                createVNode(_sfc_main$2, {
                  class: "my-4",
                  placeholder: "Pesquisar produtos",
                  onSearch: searchProducts,
                  q: query.value
                }, null, 8, ["q"]),
                createVNode("div", { class: "grid lg:grid-cols-4 mx-auto gap-3 text-gray-800 w-full" }, [
                  (openBlock(true), createBlock(Fragment, null, renderList(_ctx.products.data, (product, index) => {
                    return openBlock(), createBlock("div", {
                      key: index,
                      class: "card card-side border border-slate-50 items-center shadow-sm"
                    }, [
                      createVNode("div", { class: "grid p-2 gap-3 w-full" }, [
                        withDirectives(createVNode("figure", { class: "h-32 relative" }, [
                          withDirectives(createVNode("span", { class: "text-2xl text-white font-bold absolute top-12 text-center z-10" }, toDisplayString(product.name), 513), [
                            [vShow, !product.imageUrl]
                          ]),
                          withDirectives(createVNode("div", { class: "absolute bg-black opacity-80 rounded-lg w-full" }, null, 512), [
                            [vShow, !product.imageUrl]
                          ]),
                          createVNode("img", {
                            src: product.imageUrl ? "/storage/" + product.imageUrl : "/storage/logos/pdvfacil.png",
                            alt: product.name,
                            class: "object-cover w-full h-full rounded-lg"
                          }, null, 8, ["src", "alt"])
                        ], 512), [
                          [vShow, product]
                        ]),
                        createVNode("div", { class: "flex justify-between items-center w-full" }, [
                          createVNode("div", null, [
                            createVNode("h2", { class: "text-wrap truncate ... font-semibold text-lg" }, toDisplayString(product.name), 1),
                            createVNode("p", null, toDisplayString(unref(formatMoneyToBRL)(product.price)), 1)
                          ]),
                          createVNode("div", { class: "card-actions justify-end flex-col" }, [
                            createVNode("button", {
                              onClick: ($event) => addProduct(product),
                              class: "btn btn-info btn-sm w-full"
                            }, " Adicionar ", 8, ["onClick"])
                          ])
                        ])
                      ])
                    ]);
                  }), 128))
                ]),
                createVNode(Pagination, {
                  class: "mt-6",
                  links: linksWithSearch.value
                }, null, 8, ["links"])
              ]),
              showSuccessToast.value ? (openBlock(), createBlock(ToastSuccess, { key: 3 }, {
                default: withCtx(() => [
                  createTextVNode(" Venda criada com sucesso! ")
                ]),
                _: 1
              })) : createCommentVNode("", true),
              showErrorToast.value ? (openBlock(), createBlock(ToastError, { key: 4 }, {
                default: withCtx(() => [
                  createTextVNode(" Erro ao criar venda! ")
                ]),
                _: 1
              })) : createCommentVNode("", true),
              createVNode(_sfc_main$3)
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`<!--]-->`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Pages/Sells/Create.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as default
};
