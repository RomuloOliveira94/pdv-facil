import { defineComponent, reactive, computed, withCtx, createVNode, unref, createTextVNode, withKeys, withModifiers, openBlock, createBlock, createCommentVNode, withDirectives, vShow, Fragment, renderList, toDisplayString, useSSRContext } from "vue";
import { ssrRenderComponent, ssrRenderStyle, ssrRenderList, ssrInterpolate } from "vue/server-renderer";
import { S as SectionContainer } from "./SectionContainer-0J7EYAY4.js";
import { _ as _sfc_main$1, f as formatDate, a as formatMoneyToBRL, c as clearEmptyQuery } from "./AuthenticatedLayout-D3YttXd4.js";
import { _ as _sfc_main$2 } from "./DateInput-DuL6aQqv.js";
import { P as Pagination } from "./Pagination-rhuZjxLX.js";
import { Head, Link, router } from "@inertiajs/vue3";
import "./_plugin-vue_export-helper-1tPrXgE0.js";
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "Index",
  __ssrInlineRender: true,
  props: {
    cashiers: {},
    search: {}
  },
  setup(__props) {
    const props = __props;
    const query = reactive({
      page: 1,
      start_date: props.search.start_date ?? "",
      end_date: props.search.end_date ?? "",
      date: props.search.date ?? ""
    });
    const linksWithSearch = computed(() => {
      return props.cashiers.links.map((link) => {
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
    const handleSearch = () => {
      clearEmptyQuery(query);
      if (query.start_date && query.end_date) {
        query.date = "";
      }
      router.get(
        route("cashiers.index", { ...query }),
        {},
        {
          preserveState: true,
          preserveScroll: true
        }
      );
    };
    const clearSearch = () => {
      query.start_date = "";
      query.date = "";
      router.get(route("cashiers.index"), {}, { preserveScroll: true });
    };
    const searchSellsByDate = (date) => {
      query.date = date;
      handleSearch();
    };
    const searchSellsByPeriodFrom = (date) => {
      query.start_date = date;
    };
    const searchSellsByPeriodTo = (date) => {
      query.end_date = date;
    };
    const handleCloseCashier = (cashier) => {
      router.patch(
        route("cashiers.update", cashier),
        {},
        { preserveState: true }
      );
    };
    return (_ctx, _push, _parent, _attrs) => {
      _push(ssrRenderComponent(_sfc_main$1, _attrs, {
        header: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<h2 class="font-semibold text-xl text-gray-800 leading-tight"${_scopeId}> Caixas </h2>`);
          } else {
            return [
              createVNode("h2", { class: "font-semibold text-xl text-gray-800 leading-tight" }, " Caixas ")
            ];
          }
        }),
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(unref(Head), { title: "Caixa" }, null, _parent2, _scopeId));
            _push2(ssrRenderComponent(SectionContainer, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<div class="grid gap-2 justify-center items-center"${_scopeId2}><h2 class="text-3xl font-bold text-center"${_scopeId2}>Pesquisas</h2><div class="flex gap-6 flex-col lg:items-center lg:justify-center lg:flex-row"${_scopeId2}><div class="grid gap-2 my-2"${_scopeId2}><h3 class="text-lx font-semibold"${_scopeId2}>Pesquisa por Data</h3><div class="flex items-center gap-4"${_scopeId2}>`);
                  _push3(ssrRenderComponent(_sfc_main$2, {
                    onSearchDate: searchSellsByDate,
                    d: query.date
                  }, null, _parent3, _scopeId2));
                  _push3(`</div></div><div class="grid gap-2 my-2"${_scopeId2}><h3 class="text-lx font-semibold"${_scopeId2}> Pesquisa por Período </h3><div class="flex lg:items-center flex-col lg:flex-row gap-4"${_scopeId2}>`);
                  _push3(ssrRenderComponent(_sfc_main$2, {
                    onSearchDate: searchSellsByPeriodFrom,
                    d: query.start_date,
                    onKeyup: handleSearch
                  }, null, _parent3, _scopeId2));
                  _push3(` até `);
                  _push3(ssrRenderComponent(_sfc_main$2, {
                    onSearchDate: searchSellsByPeriodTo,
                    d: query.end_date,
                    onKeyup: handleSearch
                  }, null, _parent3, _scopeId2));
                  _push3(`</div></div></div><div class="grid lg:grid-cols-3 gap-6"${_scopeId2}><button type="button" class="btn btn-primary lg:col-span-2"${_scopeId2}> Pesquisar </button><button type="button" class="btn btn-secondary"${_scopeId2}> Limpar </button></div></div>`);
                  if (!_ctx.cashiers.data.length) {
                    _push3(`<div class="text-center"${_scopeId2}><h1 class="text-2xl font-bold py-16"${_scopeId2}> Nenhum caixa encontrado. </h1></div>`);
                  } else {
                    _push3(`<!---->`);
                  }
                  if (_ctx.cashiers.data.length) {
                    _push3(`<div class="overflow-x-auto"${_scopeId2}><table class="table table-xs"${_scopeId2}><thead${_scopeId2}><tr${_scopeId2}><th${_scopeId2}></th><th${_scopeId2}>Empresa</th><th${_scopeId2}>Responsável</th><th${_scopeId2}>Data</th><th${_scopeId2}>Total</th><th${_scopeId2}>Vendas</th><th${_scopeId2}>Status</th><th style="${ssrRenderStyle(_ctx.$page.props.auth.user.role !== "cashier" ? null : { display: "none" })}"${_scopeId2}> Fechar </th></tr></thead><tbody${_scopeId2}><!--[-->`);
                    ssrRenderList(_ctx.cashiers.data, (cashier) => {
                      _push3(`<tr${_scopeId2}><th${_scopeId2}>${ssrInterpolate(cashier.id)}</th><td${_scopeId2}>${ssrInterpolate(cashier.company.name)}</td><td${_scopeId2}>${ssrInterpolate(cashier.user.name)}</td><td${_scopeId2}>${ssrInterpolate(unref(formatDate)(cashier.created_at))}</td><td${_scopeId2}>${ssrInterpolate(unref(formatMoneyToBRL)(cashier.total))}</td><td${_scopeId2}>`);
                      _push3(ssrRenderComponent(unref(Link), {
                        href: _ctx.route("sells.index", {
                          date: cashier.created_at
                        }),
                        class: "btn btn-primary btn-xs"
                      }, {
                        default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                          if (_push4) {
                            _push4(`Vendas`);
                          } else {
                            return [
                              createTextVNode("Vendas")
                            ];
                          }
                        }),
                        _: 2
                      }, _parent3, _scopeId2));
                      _push3(`</td><td${_scopeId2}>${ssrInterpolate(cashier.active ? "Aberto" : "Fechado")}</td><td style="${ssrRenderStyle(_ctx.$page.props.auth.user.role !== "cashier" ? null : { display: "none" })}"${_scopeId2}><button${_scopeId2}><svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24"${_scopeId2}><path fill="currentColor" d="M4 22V8h3V6q0-2.075 1.463-3.537T12 1t3.538 1.463T17 6v2h3v14zm8-5q.825 0 1.413-.587T14 15t-.587-1.412T12 13t-1.412.588T10 15t.588 1.413T12 17M9 8h6V6q0-1.25-.875-2.125T12 3t-2.125.875T9 6z"${_scopeId2}></path></svg></button></td></tr>`);
                    });
                    _push3(`<!--]--></tbody><tfoot${_scopeId2}><tr${_scopeId2}><th${_scopeId2}></th><th${_scopeId2}>Empresa</th><th${_scopeId2}>Responsável</th><th${_scopeId2}>Data</th><th${_scopeId2}>Total</th><th${_scopeId2}>Vendas</th><th${_scopeId2}>Status</th><th style="${ssrRenderStyle(_ctx.$page.props.auth.user.role !== "cashier" ? null : { display: "none" })}"${_scopeId2}> Fechar </th></tr></tfoot></table></div>`);
                  } else {
                    _push3(`<!---->`);
                  }
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
                          createVNode("h3", { class: "text-lx font-semibold" }, "Pesquisa por Data"),
                          createVNode("div", { class: "flex items-center gap-4" }, [
                            createVNode(_sfc_main$2, {
                              onSearchDate: searchSellsByDate,
                              d: query.date
                            }, null, 8, ["d"])
                          ])
                        ]),
                        createVNode("div", { class: "grid gap-2 my-2" }, [
                          createVNode("h3", { class: "text-lx font-semibold" }, " Pesquisa por Período "),
                          createVNode("div", { class: "flex lg:items-center flex-col lg:flex-row gap-4" }, [
                            createVNode(_sfc_main$2, {
                              onSearchDate: searchSellsByPeriodFrom,
                              d: query.start_date,
                              onKeyup: withKeys(handleSearch, ["enter"])
                            }, null, 8, ["d"]),
                            createTextVNode(" até "),
                            createVNode(_sfc_main$2, {
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
                    !_ctx.cashiers.data.length ? (openBlock(), createBlock("div", {
                      key: 0,
                      class: "text-center"
                    }, [
                      createVNode("h1", { class: "text-2xl font-bold py-16" }, " Nenhum caixa encontrado. ")
                    ])) : createCommentVNode("", true),
                    _ctx.cashiers.data.length ? (openBlock(), createBlock("div", {
                      key: 1,
                      class: "overflow-x-auto"
                    }, [
                      createVNode("table", { class: "table table-xs" }, [
                        createVNode("thead", null, [
                          createVNode("tr", null, [
                            createVNode("th"),
                            createVNode("th", null, "Empresa"),
                            createVNode("th", null, "Responsável"),
                            createVNode("th", null, "Data"),
                            createVNode("th", null, "Total"),
                            createVNode("th", null, "Vendas"),
                            createVNode("th", null, "Status"),
                            withDirectives(createVNode("th", null, " Fechar ", 512), [
                              [
                                vShow,
                                _ctx.$page.props.auth.user.role !== "cashier"
                              ]
                            ])
                          ])
                        ]),
                        createVNode("tbody", null, [
                          (openBlock(true), createBlock(Fragment, null, renderList(_ctx.cashiers.data, (cashier) => {
                            return openBlock(), createBlock("tr", {
                              key: cashier.id
                            }, [
                              createVNode("th", null, toDisplayString(cashier.id), 1),
                              createVNode("td", null, toDisplayString(cashier.company.name), 1),
                              createVNode("td", null, toDisplayString(cashier.user.name), 1),
                              createVNode("td", null, toDisplayString(unref(formatDate)(cashier.created_at)), 1),
                              createVNode("td", null, toDisplayString(unref(formatMoneyToBRL)(cashier.total)), 1),
                              createVNode("td", null, [
                                createVNode(unref(Link), {
                                  href: _ctx.route("sells.index", {
                                    date: cashier.created_at
                                  }),
                                  class: "btn btn-primary btn-xs"
                                }, {
                                  default: withCtx(() => [
                                    createTextVNode("Vendas")
                                  ]),
                                  _: 2
                                }, 1032, ["href"])
                              ]),
                              createVNode("td", null, toDisplayString(cashier.active ? "Aberto" : "Fechado"), 1),
                              withDirectives(createVNode("td", null, [
                                createVNode("button", {
                                  onClick: ($event) => handleCloseCashier(cashier.id)
                                }, [
                                  (openBlock(), createBlock("svg", {
                                    xmlns: "http://www.w3.org/2000/svg",
                                    width: "22",
                                    height: "22",
                                    viewBox: "0 0 24 24"
                                  }, [
                                    createVNode("path", {
                                      fill: "currentColor",
                                      d: "M4 22V8h3V6q0-2.075 1.463-3.537T12 1t3.538 1.463T17 6v2h3v14zm8-5q.825 0 1.413-.587T14 15t-.587-1.412T12 13t-1.412.588T10 15t.588 1.413T12 17M9 8h6V6q0-1.25-.875-2.125T12 3t-2.125.875T9 6z"
                                    })
                                  ]))
                                ], 8, ["onClick"])
                              ], 512), [
                                [
                                  vShow,
                                  _ctx.$page.props.auth.user.role !== "cashier"
                                ]
                              ])
                            ]);
                          }), 128))
                        ]),
                        createVNode("tfoot", null, [
                          createVNode("tr", null, [
                            createVNode("th"),
                            createVNode("th", null, "Empresa"),
                            createVNode("th", null, "Responsável"),
                            createVNode("th", null, "Data"),
                            createVNode("th", null, "Total"),
                            createVNode("th", null, "Vendas"),
                            createVNode("th", null, "Status"),
                            withDirectives(createVNode("th", null, " Fechar ", 512), [
                              [
                                vShow,
                                _ctx.$page.props.auth.user.role !== "cashier"
                              ]
                            ])
                          ])
                        ])
                      ])
                    ])) : createCommentVNode("", true),
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
              createVNode(unref(Head), { title: "Caixa" }),
              createVNode(SectionContainer, null, {
                default: withCtx(() => [
                  createVNode("div", { class: "grid gap-2 justify-center items-center" }, [
                    createVNode("h2", { class: "text-3xl font-bold text-center" }, "Pesquisas"),
                    createVNode("div", { class: "flex gap-6 flex-col lg:items-center lg:justify-center lg:flex-row" }, [
                      createVNode("div", { class: "grid gap-2 my-2" }, [
                        createVNode("h3", { class: "text-lx font-semibold" }, "Pesquisa por Data"),
                        createVNode("div", { class: "flex items-center gap-4" }, [
                          createVNode(_sfc_main$2, {
                            onSearchDate: searchSellsByDate,
                            d: query.date
                          }, null, 8, ["d"])
                        ])
                      ]),
                      createVNode("div", { class: "grid gap-2 my-2" }, [
                        createVNode("h3", { class: "text-lx font-semibold" }, " Pesquisa por Período "),
                        createVNode("div", { class: "flex lg:items-center flex-col lg:flex-row gap-4" }, [
                          createVNode(_sfc_main$2, {
                            onSearchDate: searchSellsByPeriodFrom,
                            d: query.start_date,
                            onKeyup: withKeys(handleSearch, ["enter"])
                          }, null, 8, ["d"]),
                          createTextVNode(" até "),
                          createVNode(_sfc_main$2, {
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
                  !_ctx.cashiers.data.length ? (openBlock(), createBlock("div", {
                    key: 0,
                    class: "text-center"
                  }, [
                    createVNode("h1", { class: "text-2xl font-bold py-16" }, " Nenhum caixa encontrado. ")
                  ])) : createCommentVNode("", true),
                  _ctx.cashiers.data.length ? (openBlock(), createBlock("div", {
                    key: 1,
                    class: "overflow-x-auto"
                  }, [
                    createVNode("table", { class: "table table-xs" }, [
                      createVNode("thead", null, [
                        createVNode("tr", null, [
                          createVNode("th"),
                          createVNode("th", null, "Empresa"),
                          createVNode("th", null, "Responsável"),
                          createVNode("th", null, "Data"),
                          createVNode("th", null, "Total"),
                          createVNode("th", null, "Vendas"),
                          createVNode("th", null, "Status"),
                          withDirectives(createVNode("th", null, " Fechar ", 512), [
                            [
                              vShow,
                              _ctx.$page.props.auth.user.role !== "cashier"
                            ]
                          ])
                        ])
                      ]),
                      createVNode("tbody", null, [
                        (openBlock(true), createBlock(Fragment, null, renderList(_ctx.cashiers.data, (cashier) => {
                          return openBlock(), createBlock("tr", {
                            key: cashier.id
                          }, [
                            createVNode("th", null, toDisplayString(cashier.id), 1),
                            createVNode("td", null, toDisplayString(cashier.company.name), 1),
                            createVNode("td", null, toDisplayString(cashier.user.name), 1),
                            createVNode("td", null, toDisplayString(unref(formatDate)(cashier.created_at)), 1),
                            createVNode("td", null, toDisplayString(unref(formatMoneyToBRL)(cashier.total)), 1),
                            createVNode("td", null, [
                              createVNode(unref(Link), {
                                href: _ctx.route("sells.index", {
                                  date: cashier.created_at
                                }),
                                class: "btn btn-primary btn-xs"
                              }, {
                                default: withCtx(() => [
                                  createTextVNode("Vendas")
                                ]),
                                _: 2
                              }, 1032, ["href"])
                            ]),
                            createVNode("td", null, toDisplayString(cashier.active ? "Aberto" : "Fechado"), 1),
                            withDirectives(createVNode("td", null, [
                              createVNode("button", {
                                onClick: ($event) => handleCloseCashier(cashier.id)
                              }, [
                                (openBlock(), createBlock("svg", {
                                  xmlns: "http://www.w3.org/2000/svg",
                                  width: "22",
                                  height: "22",
                                  viewBox: "0 0 24 24"
                                }, [
                                  createVNode("path", {
                                    fill: "currentColor",
                                    d: "M4 22V8h3V6q0-2.075 1.463-3.537T12 1t3.538 1.463T17 6v2h3v14zm8-5q.825 0 1.413-.587T14 15t-.587-1.412T12 13t-1.412.588T10 15t.588 1.413T12 17M9 8h6V6q0-1.25-.875-2.125T12 3t-2.125.875T9 6z"
                                  })
                                ]))
                              ], 8, ["onClick"])
                            ], 512), [
                              [
                                vShow,
                                _ctx.$page.props.auth.user.role !== "cashier"
                              ]
                            ])
                          ]);
                        }), 128))
                      ]),
                      createVNode("tfoot", null, [
                        createVNode("tr", null, [
                          createVNode("th"),
                          createVNode("th", null, "Empresa"),
                          createVNode("th", null, "Responsável"),
                          createVNode("th", null, "Data"),
                          createVNode("th", null, "Total"),
                          createVNode("th", null, "Vendas"),
                          createVNode("th", null, "Status"),
                          withDirectives(createVNode("th", null, " Fechar ", 512), [
                            [
                              vShow,
                              _ctx.$page.props.auth.user.role !== "cashier"
                            ]
                          ])
                        ])
                      ])
                    ])
                  ])) : createCommentVNode("", true),
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Pages/Cashiers/Index.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as default
};
