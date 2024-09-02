import { unref, useSSRContext, defineComponent, ref, reactive, computed, withCtx, createVNode, createTextVNode, withKeys, withModifiers, openBlock, createBlock, createCommentVNode, Fragment, renderList, toDisplayString } from "vue";
import { ssrRenderAttrs, ssrRenderList, ssrInterpolate, ssrRenderComponent } from "vue/server-renderer";
import { a as formatMoneyToBRL, _ as _sfc_main$2, f as formatDate, c as clearEmptyQuery } from "./AuthenticatedLayout-D3YttXd4.js";
import { S as SectionContainer } from "./SectionContainer-0J7EYAY4.js";
import { P as Pagination } from "./Pagination-rhuZjxLX.js";
import { _ as _sfc_main$4 } from "./DateInput-DuL6aQqv.js";
import { _ as _sfc_main$3 } from "./SearchInput-CNPIwvk2.js";
import { sameDay } from "@formkit/tempo";
import { Head, Link, router } from "@inertiajs/vue3";
import "./_plugin-vue_export-helper-1tPrXgE0.js";
const _sfc_main$1 = {
  __name: "SellProductsModal",
  __ssrInlineRender: true,
  props: {
    products: Object
  },
  setup(__props) {
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(_attrs)}><dialog id="productModal" class="modal w-full"><div class="modal-box bg-white"><form method="dialog"><button class="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"> ✕ </button></form><div class="w-full"><table class="table"><thead class="text-black font-bold text-lg"><tr><th>Produto</th><th>Valor</th><th>Quantidade</th><th>Total</th></tr></thead><tbody><!--[-->`);
      ssrRenderList(__props.products, (product) => {
        _push(`<tr><td><p class="w-36 truncate ...">${ssrInterpolate(product.name)}</p></td><td>${ssrInterpolate(unref(formatMoneyToBRL)(product.price))}</td><td>${ssrInterpolate(product.pivot.quantity)}</td><td>${ssrInterpolate(unref(formatMoneyToBRL)(product.pivot.price))}</td></tr>`);
      });
      _push(`<!--]--></tbody></table></div></div></dialog></div>`);
    };
  }
};
const _sfc_setup$1 = _sfc_main$1.setup;
_sfc_main$1.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Components/SellProductsModal.vue");
  return _sfc_setup$1 ? _sfc_setup$1(props, ctx) : void 0;
};
const SellProductsModal = _sfc_main$1;
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "Index",
  __ssrInlineRender: true,
  props: {
    sells: {},
    user: {},
    search: {}
  },
  setup(__props) {
    const selectedProduct = ref([]);
    const props = __props;
    const query = reactive({
      page: 1,
      start_date: props.search.start_date ?? "",
      end_date: props.search.end_date ?? "",
      product: props.search.product ?? "",
      date: props.search.date ?? ""
    });
    const linksWithSearch = computed(() => {
      return props.sells.links.map((link) => {
        if (link.url === null)
          return link;
        let url = new URL(link.url);
        for (const key in query) {
          if (key === "page")
            continue;
          if (query[key] === "")
            continue;
          url.searchParams.set(key, query[key]);
        }
        return {
          ...link,
          url: `${url}`
        };
      });
    });
    const openProductsModal = (id) => {
      document.getElementById("productModal").showModal();
      selectedProduct.value = props.sells.data.find(
        (sell) => sell.id === id
      ).products;
    };
    const destroy = (id) => {
      if (confirm("Tem certeza que quer cancelar essa venda?")) {
        router.delete(route("sells.destroy", id));
      }
    };
    const handleSearch = () => {
      clearEmptyQuery(query);
      router.get(
        route("sells.index", { ...query }),
        {},
        {
          preserveState: true,
          preserveScroll: true
        }
      );
    };
    const clearSearch = () => {
      query.start_date = "";
      query.end_date = "";
      query.product = "";
      query.date = "";
      router.get(route("sells.index"), {}, { preserveScroll: true });
    };
    const searchSellsByDate = (date) => {
      query.date = date;
      handleSearch();
    };
    const searchSellsByProducts = (search) => {
      query.product = search;
      handleSearch();
    };
    const searchSellsByPeriodFrom = (date) => {
      query.start_date = date;
    };
    const searchSellsByPeriodTo = (date) => {
      query.end_date = date;
    };
    return (_ctx, _push, _parent, _attrs) => {
      _push(ssrRenderComponent(_sfc_main$2, _attrs, {
        header: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<h2 class="font-semibold text-xl text-gray-800 leading-tight"${_scopeId}> Vendas </h2>`);
          } else {
            return [
              createVNode("h2", { class: "font-semibold text-xl text-gray-800 leading-tight" }, " Vendas ")
            ];
          }
        }),
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(unref(Head), { title: "Vendas" }, null, _parent2, _scopeId));
            _push2(ssrRenderComponent(unref(Link), {
              href: _ctx.route("sells.create"),
              class: "btn btn-primary mb-6"
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`Criar Nova Venda`);
                } else {
                  return [
                    createTextVNode("Criar Nova Venda")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(SectionContainer, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<div class="grid gap-2 justify-center items-center"${_scopeId2}><h2 class="text-3xl font-bold text-center"${_scopeId2}>Pesquisas</h2><div class="flex gap-6 flex-col lg:items-center lg:justify-center lg:flex-row"${_scopeId2}><div class="grid gap-2 my-2"${_scopeId2}><h3 class="text-lx font-semibold"${_scopeId2}> Pesquisa por Produto </h3><div class="flex items-center gap-4"${_scopeId2}>`);
                  _push3(ssrRenderComponent(_sfc_main$3, {
                    onSearch: searchSellsByProducts,
                    q: query.product
                  }, null, _parent3, _scopeId2));
                  _push3(`</div></div><div class="grid gap-2 my-2"${_scopeId2}><h3 class="text-lx font-semibold"${_scopeId2}>Pesquisa por Data</h3><div class="flex items-center gap-4"${_scopeId2}>`);
                  _push3(ssrRenderComponent(_sfc_main$4, {
                    onSearchDate: searchSellsByDate,
                    d: query.date
                  }, null, _parent3, _scopeId2));
                  _push3(`</div></div><div class="grid gap-2 my-2"${_scopeId2}><h3 class="text-lx font-semibold"${_scopeId2}> Pesquisa por Período </h3><div class="flex lg:items-center flex-col lg:flex-row gap-4"${_scopeId2}>`);
                  _push3(ssrRenderComponent(_sfc_main$4, {
                    onSearchDate: searchSellsByPeriodFrom,
                    d: query.start_date,
                    onKeyup: handleSearch
                  }, null, _parent3, _scopeId2));
                  _push3(` até `);
                  _push3(ssrRenderComponent(_sfc_main$4, {
                    onSearchDate: searchSellsByPeriodTo,
                    d: query.end_date,
                    onKeyup: handleSearch
                  }, null, _parent3, _scopeId2));
                  _push3(`</div></div></div><div class="grid lg:grid-cols-3 gap-6"${_scopeId2}><button type="button" class="btn btn-primary lg:col-span-2"${_scopeId2}> Pesquisar </button><button type="button" class="btn btn-secondary"${_scopeId2}> Limpar </button></div></div>`);
                  if (!_ctx.sells.data.length) {
                    _push3(`<div class="text-center"${_scopeId2}><h1 class="text-2xl font-bold py-16"${_scopeId2}> Nenhuma venda encontrado. </h1></div>`);
                  } else {
                    _push3(`<!---->`);
                  }
                  if (_ctx.sells.data.length) {
                    _push3(`<div class="min-h-[20vh] flex flex-col mt-6"${_scopeId2}><div class="overflow-x-auto"${_scopeId2}><table class="table"${_scopeId2}><thead class="text-black font-bold text-lg"${_scopeId2}><tr${_scopeId2}><th${_scopeId2}>Data</th><th${_scopeId2}>Entrega</th><th${_scopeId2}>Forma de Pagamento</th><th${_scopeId2}>Desconto</th><th${_scopeId2}>Subtotal</th><th${_scopeId2}>Total</th><th${_scopeId2}>Produtos</th>`);
                    if (_ctx.user.role !== "cashier") {
                      _push3(`<th${_scopeId2}>Cancelar</th>`);
                    } else {
                      _push3(`<!---->`);
                    }
                    _push3(`</tr></thead><tbody class="text-gray-700 font-bold text-md"${_scopeId2}><!--[-->`);
                    ssrRenderList(_ctx.sells.data, (sell) => {
                      _push3(`<tr${_scopeId2}><td${_scopeId2}>${ssrInterpolate(unref(formatDate)(sell.created_at))}</td><td${_scopeId2}>${ssrInterpolate(unref(formatMoneyToBRL)(sell.delivery_tax))}</td><td${_scopeId2}>${ssrInterpolate(sell.payment_type.name)}</td><td${_scopeId2}>${ssrInterpolate(sell.discount ? unref(formatMoneyToBRL)(sell.discount) : "-")}</td><td${_scopeId2}>${ssrInterpolate(unref(formatMoneyToBRL)(sell.subtotal))}</td><td${_scopeId2}>${ssrInterpolate(unref(formatMoneyToBRL)(sell.total))}</td><td${_scopeId2}><button class="btn btn-primary"${_scopeId2}> Ver Produtos </button></td>`);
                      if (_ctx.user.role !== "cashier" && unref(sameDay)(
                        sell.cashier.created_at,
                        /* @__PURE__ */ new Date()
                      )) {
                        _push3(`<td${_scopeId2}><button class="btn btn-error btn-sm rounded-full"${_scopeId2}> X </button></td>`);
                      } else {
                        _push3(`<!---->`);
                      }
                      _push3(`</tr>`);
                    });
                    _push3(`<!--]--></tbody></table></div></div>`);
                  } else {
                    _push3(`<!---->`);
                  }
                  _push3(ssrRenderComponent(SellProductsModal, { products: selectedProduct.value }, null, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(Pagination, {
                    class: "mt-6",
                    links: linksWithSearch.value
                  }, null, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode("div", { class: "grid gap-2 justify-center items-center" }, [
                      createVNode("h2", { class: "text-3xl font-bold text-center" }, "Pesquisas"),
                      createVNode("div", { class: "flex gap-6 flex-col lg:items-center lg:justify-center lg:flex-row" }, [
                        createVNode("div", { class: "grid gap-2 my-2" }, [
                          createVNode("h3", { class: "text-lx font-semibold" }, " Pesquisa por Produto "),
                          createVNode("div", { class: "flex items-center gap-4" }, [
                            createVNode(_sfc_main$3, {
                              onSearch: searchSellsByProducts,
                              q: query.product
                            }, null, 8, ["q"])
                          ])
                        ]),
                        createVNode("div", { class: "grid gap-2 my-2" }, [
                          createVNode("h3", { class: "text-lx font-semibold" }, "Pesquisa por Data"),
                          createVNode("div", { class: "flex items-center gap-4" }, [
                            createVNode(_sfc_main$4, {
                              onSearchDate: searchSellsByDate,
                              d: query.date
                            }, null, 8, ["d"])
                          ])
                        ]),
                        createVNode("div", { class: "grid gap-2 my-2" }, [
                          createVNode("h3", { class: "text-lx font-semibold" }, " Pesquisa por Período "),
                          createVNode("div", { class: "flex lg:items-center flex-col lg:flex-row gap-4" }, [
                            createVNode(_sfc_main$4, {
                              onSearchDate: searchSellsByPeriodFrom,
                              d: query.start_date,
                              onKeyup: withKeys(handleSearch, ["enter"])
                            }, null, 8, ["d"]),
                            createTextVNode(" até "),
                            createVNode(_sfc_main$4, {
                              onSearchDate: searchSellsByPeriodTo,
                              d: query.end_date,
                              onKeyup: withKeys(handleSearch, ["enter"])
                            }, null, 8, ["d"])
                          ])
                        ])
                      ]),
                      createVNode("div", { class: "grid lg:grid-cols-3 gap-6" }, [
                        createVNode("button", {
                          type: "button",
                          class: "btn btn-primary lg:col-span-2",
                          onClick: withModifiers(handleSearch, ["prevent"])
                        }, " Pesquisar "),
                        createVNode("button", {
                          type: "button",
                          class: "btn btn-secondary",
                          onClick: withModifiers(clearSearch, ["prevent"])
                        }, " Limpar ")
                      ])
                    ]),
                    !_ctx.sells.data.length ? (openBlock(), createBlock("div", {
                      key: 0,
                      class: "text-center"
                    }, [
                      createVNode("h1", { class: "text-2xl font-bold py-16" }, " Nenhuma venda encontrado. ")
                    ])) : createCommentVNode("", true),
                    _ctx.sells.data.length ? (openBlock(), createBlock("div", {
                      key: 1,
                      class: "min-h-[20vh] flex flex-col mt-6"
                    }, [
                      createVNode("div", { class: "overflow-x-auto" }, [
                        createVNode("table", { class: "table" }, [
                          createVNode("thead", { class: "text-black font-bold text-lg" }, [
                            createVNode("tr", null, [
                              createVNode("th", null, "Data"),
                              createVNode("th", null, "Entrega"),
                              createVNode("th", null, "Forma de Pagamento"),
                              createVNode("th", null, "Desconto"),
                              createVNode("th", null, "Subtotal"),
                              createVNode("th", null, "Total"),
                              createVNode("th", null, "Produtos"),
                              _ctx.user.role !== "cashier" ? (openBlock(), createBlock("th", { key: 0 }, "Cancelar")) : createCommentVNode("", true)
                            ])
                          ]),
                          createVNode("tbody", { class: "text-gray-700 font-bold text-md" }, [
                            (openBlock(true), createBlock(Fragment, null, renderList(_ctx.sells.data, (sell) => {
                              return openBlock(), createBlock("tr", {
                                key: sell.id
                              }, [
                                createVNode("td", null, toDisplayString(unref(formatDate)(sell.created_at)), 1),
                                createVNode("td", null, toDisplayString(unref(formatMoneyToBRL)(sell.delivery_tax)), 1),
                                createVNode("td", null, toDisplayString(sell.payment_type.name), 1),
                                createVNode("td", null, toDisplayString(sell.discount ? unref(formatMoneyToBRL)(sell.discount) : "-"), 1),
                                createVNode("td", null, toDisplayString(unref(formatMoneyToBRL)(sell.subtotal)), 1),
                                createVNode("td", null, toDisplayString(unref(formatMoneyToBRL)(sell.total)), 1),
                                createVNode("td", null, [
                                  createVNode("button", {
                                    class: "btn btn-primary",
                                    onClick: ($event) => openProductsModal(sell.id)
                                  }, " Ver Produtos ", 8, ["onClick"])
                                ]),
                                _ctx.user.role !== "cashier" && unref(sameDay)(
                                  sell.cashier.created_at,
                                  /* @__PURE__ */ new Date()
                                ) ? (openBlock(), createBlock("td", { key: 0 }, [
                                  createVNode("button", {
                                    class: "btn btn-error btn-sm rounded-full",
                                    onClick: ($event) => destroy(sell.id)
                                  }, " X ", 8, ["onClick"])
                                ])) : createCommentVNode("", true)
                              ]);
                            }), 128))
                          ])
                        ])
                      ])
                    ])) : createCommentVNode("", true),
                    createVNode(SellProductsModal, { products: selectedProduct.value }, null, 8, ["products"]),
                    createVNode(Pagination, {
                      class: "mt-6",
                      links: linksWithSearch.value
                    }, null, 8, ["links"])
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
          } else {
            return [
              createVNode(unref(Head), { title: "Vendas" }),
              createVNode(unref(Link), {
                href: _ctx.route("sells.create"),
                class: "btn btn-primary mb-6"
              }, {
                default: withCtx(() => [
                  createTextVNode("Criar Nova Venda")
                ]),
                _: 1
              }, 8, ["href"]),
              createVNode(SectionContainer, null, {
                default: withCtx(() => [
                  createVNode("div", { class: "grid gap-2 justify-center items-center" }, [
                    createVNode("h2", { class: "text-3xl font-bold text-center" }, "Pesquisas"),
                    createVNode("div", { class: "flex gap-6 flex-col lg:items-center lg:justify-center lg:flex-row" }, [
                      createVNode("div", { class: "grid gap-2 my-2" }, [
                        createVNode("h3", { class: "text-lx font-semibold" }, " Pesquisa por Produto "),
                        createVNode("div", { class: "flex items-center gap-4" }, [
                          createVNode(_sfc_main$3, {
                            onSearch: searchSellsByProducts,
                            q: query.product
                          }, null, 8, ["q"])
                        ])
                      ]),
                      createVNode("div", { class: "grid gap-2 my-2" }, [
                        createVNode("h3", { class: "text-lx font-semibold" }, "Pesquisa por Data"),
                        createVNode("div", { class: "flex items-center gap-4" }, [
                          createVNode(_sfc_main$4, {
                            onSearchDate: searchSellsByDate,
                            d: query.date
                          }, null, 8, ["d"])
                        ])
                      ]),
                      createVNode("div", { class: "grid gap-2 my-2" }, [
                        createVNode("h3", { class: "text-lx font-semibold" }, " Pesquisa por Período "),
                        createVNode("div", { class: "flex lg:items-center flex-col lg:flex-row gap-4" }, [
                          createVNode(_sfc_main$4, {
                            onSearchDate: searchSellsByPeriodFrom,
                            d: query.start_date,
                            onKeyup: withKeys(handleSearch, ["enter"])
                          }, null, 8, ["d"]),
                          createTextVNode(" até "),
                          createVNode(_sfc_main$4, {
                            onSearchDate: searchSellsByPeriodTo,
                            d: query.end_date,
                            onKeyup: withKeys(handleSearch, ["enter"])
                          }, null, 8, ["d"])
                        ])
                      ])
                    ]),
                    createVNode("div", { class: "grid lg:grid-cols-3 gap-6" }, [
                      createVNode("button", {
                        type: "button",
                        class: "btn btn-primary lg:col-span-2",
                        onClick: withModifiers(handleSearch, ["prevent"])
                      }, " Pesquisar "),
                      createVNode("button", {
                        type: "button",
                        class: "btn btn-secondary",
                        onClick: withModifiers(clearSearch, ["prevent"])
                      }, " Limpar ")
                    ])
                  ]),
                  !_ctx.sells.data.length ? (openBlock(), createBlock("div", {
                    key: 0,
                    class: "text-center"
                  }, [
                    createVNode("h1", { class: "text-2xl font-bold py-16" }, " Nenhuma venda encontrado. ")
                  ])) : createCommentVNode("", true),
                  _ctx.sells.data.length ? (openBlock(), createBlock("div", {
                    key: 1,
                    class: "min-h-[20vh] flex flex-col mt-6"
                  }, [
                    createVNode("div", { class: "overflow-x-auto" }, [
                      createVNode("table", { class: "table" }, [
                        createVNode("thead", { class: "text-black font-bold text-lg" }, [
                          createVNode("tr", null, [
                            createVNode("th", null, "Data"),
                            createVNode("th", null, "Entrega"),
                            createVNode("th", null, "Forma de Pagamento"),
                            createVNode("th", null, "Desconto"),
                            createVNode("th", null, "Subtotal"),
                            createVNode("th", null, "Total"),
                            createVNode("th", null, "Produtos"),
                            _ctx.user.role !== "cashier" ? (openBlock(), createBlock("th", { key: 0 }, "Cancelar")) : createCommentVNode("", true)
                          ])
                        ]),
                        createVNode("tbody", { class: "text-gray-700 font-bold text-md" }, [
                          (openBlock(true), createBlock(Fragment, null, renderList(_ctx.sells.data, (sell) => {
                            return openBlock(), createBlock("tr", {
                              key: sell.id
                            }, [
                              createVNode("td", null, toDisplayString(unref(formatDate)(sell.created_at)), 1),
                              createVNode("td", null, toDisplayString(unref(formatMoneyToBRL)(sell.delivery_tax)), 1),
                              createVNode("td", null, toDisplayString(sell.payment_type.name), 1),
                              createVNode("td", null, toDisplayString(sell.discount ? unref(formatMoneyToBRL)(sell.discount) : "-"), 1),
                              createVNode("td", null, toDisplayString(unref(formatMoneyToBRL)(sell.subtotal)), 1),
                              createVNode("td", null, toDisplayString(unref(formatMoneyToBRL)(sell.total)), 1),
                              createVNode("td", null, [
                                createVNode("button", {
                                  class: "btn btn-primary",
                                  onClick: ($event) => openProductsModal(sell.id)
                                }, " Ver Produtos ", 8, ["onClick"])
                              ]),
                              _ctx.user.role !== "cashier" && unref(sameDay)(
                                sell.cashier.created_at,
                                /* @__PURE__ */ new Date()
                              ) ? (openBlock(), createBlock("td", { key: 0 }, [
                                createVNode("button", {
                                  class: "btn btn-error btn-sm rounded-full",
                                  onClick: ($event) => destroy(sell.id)
                                }, " X ", 8, ["onClick"])
                              ])) : createCommentVNode("", true)
                            ]);
                          }), 128))
                        ])
                      ])
                    ])
                  ])) : createCommentVNode("", true),
                  createVNode(SellProductsModal, { products: selectedProduct.value }, null, 8, ["products"]),
                  createVNode(Pagination, {
                    class: "mt-6",
                    links: linksWithSearch.value
                  }, null, 8, ["links"])
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Pages/Sells/Index.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as default
};
