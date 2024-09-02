import { defineComponent, ref, computed, watch, withCtx, createVNode, unref, createTextVNode, openBlock, createBlock, createCommentVNode, Fragment, renderList, withDirectives, toDisplayString, vShow, useSSRContext } from "vue";
import { ssrRenderComponent, ssrRenderList, ssrRenderStyle, ssrInterpolate, ssrRenderAttr } from "vue/server-renderer";
import { S as SectionContainer } from "./SectionContainer-0J7EYAY4.js";
import { T as ToastSuccess, a as ToastError } from "./ToastSuccess-Bwu8pRAO.js";
import { _ as _sfc_main$1, a as formatMoneyToBRL } from "./AuthenticatedLayout-D3YttXd4.js";
import { P as Pagination } from "./Pagination-rhuZjxLX.js";
import { _ as _sfc_main$2 } from "./SearchInput-CNPIwvk2.js";
import { Head, Link, router } from "@inertiajs/vue3";
import "./_plugin-vue_export-helper-1tPrXgE0.js";
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "Index",
  __ssrInlineRender: true,
  props: {
    products: {},
    flash: {},
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
    const showToast = ref(false);
    const destroy = (company_id) => {
      showToast.value = true;
      if (confirm("Tem certeza que quer deletar esse produto?")) {
        router.delete(route("products.destroy", company_id));
      }
    };
    watch(
      showToast,
      (value) => {
        if (value) {
          setTimeout(() => {
            showToast.value = false;
          }, 4e3);
        }
      },
      { immediate: true }
    );
    const searchProducts = (search) => {
      query.value = search;
      router.get(
        route("products.index", { product: query.value }),
        {},
        { preserveState: true, preserveScroll: true }
      );
    };
    return (_ctx, _push, _parent, _attrs) => {
      _push(ssrRenderComponent(_sfc_main$1, _attrs, {
        header: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<h2 class="font-semibold text-3xl text-gray-800 leading-tight"${_scopeId}> Produtos </h2>`);
          } else {
            return [
              createVNode("h2", { class: "font-semibold text-3xl text-gray-800 leading-tight" }, " Produtos ")
            ];
          }
        }),
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(unref(Head), { title: "Produtos" }, null, _parent2, _scopeId));
            _push2(`<div class="mb-3"${_scopeId}>`);
            _push2(ssrRenderComponent(unref(Link), {
              href: _ctx.route("products.create"),
              class: "btn btn-primary w-full text-lg mb-2"
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`Criar Novo Produto`);
                } else {
                  return [
                    createTextVNode("Criar Novo Produto")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(`</div>`);
            _push2(ssrRenderComponent(SectionContainer, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<h1 class="text-3xl font-bold mb-2 text-gray-800 text-center"${_scopeId2}> Produtos </h1>`);
                  _push3(ssrRenderComponent(_sfc_main$2, {
                    class: "my-4",
                    placeholder: "Pesquisar produtos",
                    onSearch: searchProducts,
                    q: query.value
                  }, null, _parent3, _scopeId2));
                  if (!_ctx.products.data.length) {
                    _push3(`<div class="text-center"${_scopeId2}><h1 class="text-2xl font-bold py-16"${_scopeId2}> Nenhum produto encontrado. </h1></div>`);
                  } else {
                    _push3(`<!---->`);
                  }
                  if (_ctx.products.data.length) {
                    _push3(`<div class="grid md:grid-cols-4 w-full gap-3"${_scopeId2}><!--[-->`);
                    ssrRenderList(_ctx.products.data, (product, index) => {
                      _push3(`<div class="card card-side border border-slate-100 items-center shadow-sm"${_scopeId2}><div class="p-2 w-full grid gap-3"${_scopeId2}><figure style="${ssrRenderStyle(product ? null : { display: "none" })}" class="w-full h-32 relative"${_scopeId2}><span style="${ssrRenderStyle(!product.imageUrl ? null : { display: "none" })}" class="text-2xl text-white font-bold absolute top-12 text-center z-10"${_scopeId2}>${ssrInterpolate(product.name)}</span><div style="${ssrRenderStyle(!product.imageUrl ? null : { display: "none" })}" class="absolute bg-black opacity-80 rounded-lg"${_scopeId2}></div><img${ssrRenderAttr(
                        "src",
                        product.imageUrl ? "/storage/" + product.imageUrl : "/storage/logos/pdvfacil.png"
                      )}${ssrRenderAttr("alt", product.name)} class="object-cover w-full h-full rounded-lg"${_scopeId2}></figure><div class="flex justify-between w-full items-center"${_scopeId2}><div class="w-36"${_scopeId2}><h2 class="text-wrap truncate ... font-semibold text-lg"${_scopeId2}>${ssrInterpolate(product.name)}</h2><p${_scopeId2}>${ssrInterpolate(unref(formatMoneyToBRL)(product.price))}</p></div><div class="card-actions justify-end flex-col"${_scopeId2}>`);
                      _push3(ssrRenderComponent(unref(Link), {
                        href: _ctx.route("products.edit", product.id),
                        class: "btn btn-primary btn-sm w-full"
                      }, {
                        default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                          if (_push4) {
                            _push4(`Editar`);
                          } else {
                            return [
                              createTextVNode("Editar")
                            ];
                          }
                        }),
                        _: 2
                      }, _parent3, _scopeId2));
                      _push3(`<button class="btn btn-error btn-sm w-full"${_scopeId2}> Deletar </button></div></div></div></div>`);
                    });
                    _push3(`<!--]--></div>`);
                  } else {
                    _push3(`<!---->`);
                  }
                  _push3(ssrRenderComponent(Pagination, {
                    class: "mt-6",
                    links: linksWithSearch.value
                  }, null, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode("h1", { class: "text-3xl font-bold mb-2 text-gray-800 text-center" }, " Produtos "),
                    createVNode(_sfc_main$2, {
                      class: "my-4",
                      placeholder: "Pesquisar produtos",
                      onSearch: searchProducts,
                      q: query.value
                    }, null, 8, ["q"]),
                    !_ctx.products.data.length ? (openBlock(), createBlock("div", {
                      key: 0,
                      class: "text-center"
                    }, [
                      createVNode("h1", { class: "text-2xl font-bold py-16" }, " Nenhum produto encontrado. ")
                    ])) : createCommentVNode("", true),
                    _ctx.products.data.length ? (openBlock(), createBlock("div", {
                      key: 1,
                      class: "grid md:grid-cols-4 w-full gap-3"
                    }, [
                      (openBlock(true), createBlock(Fragment, null, renderList(_ctx.products.data, (product, index) => {
                        return openBlock(), createBlock("div", {
                          key: index,
                          class: "card card-side border border-slate-100 items-center shadow-sm"
                        }, [
                          createVNode("div", { class: "p-2 w-full grid gap-3" }, [
                            withDirectives(createVNode("figure", { class: "w-full h-32 relative" }, [
                              withDirectives(createVNode("span", { class: "text-2xl text-white font-bold absolute top-12 text-center z-10" }, toDisplayString(product.name), 513), [
                                [vShow, !product.imageUrl]
                              ]),
                              withDirectives(createVNode("div", { class: "absolute bg-black opacity-80 rounded-lg" }, null, 512), [
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
                            createVNode("div", { class: "flex justify-between w-full items-center" }, [
                              createVNode("div", { class: "w-36" }, [
                                createVNode("h2", { class: "text-wrap truncate ... font-semibold text-lg" }, toDisplayString(product.name), 1),
                                createVNode("p", null, toDisplayString(unref(formatMoneyToBRL)(product.price)), 1)
                              ]),
                              createVNode("div", { class: "card-actions justify-end flex-col" }, [
                                createVNode(unref(Link), {
                                  href: _ctx.route("products.edit", product.id),
                                  class: "btn btn-primary btn-sm w-full"
                                }, {
                                  default: withCtx(() => [
                                    createTextVNode("Editar")
                                  ]),
                                  _: 2
                                }, 1032, ["href"]),
                                createVNode("button", {
                                  onClick: ($event) => destroy(product.id),
                                  class: "btn btn-error btn-sm w-full"
                                }, " Deletar ", 8, ["onClick"])
                              ])
                            ])
                          ])
                        ]);
                      }), 128))
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
            if (props.flash.success && showToast.value) {
              _push2(ssrRenderComponent(ToastSuccess, null, {
                default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(`${ssrInterpolate(props.flash.success)}`);
                  } else {
                    return [
                      createTextVNode(toDisplayString(props.flash.success), 1)
                    ];
                  }
                }),
                _: 1
              }, _parent2, _scopeId));
            } else {
              _push2(`<!---->`);
            }
            if (props.flash.error && showToast.value) {
              _push2(ssrRenderComponent(ToastError, null, {
                default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(`${ssrInterpolate(props.flash.error)}`);
                  } else {
                    return [
                      createTextVNode(toDisplayString(props.flash.error), 1)
                    ];
                  }
                }),
                _: 1
              }, _parent2, _scopeId));
            } else {
              _push2(`<!---->`);
            }
          } else {
            return [
              createVNode(unref(Head), { title: "Produtos" }),
              createVNode("div", { class: "mb-3" }, [
                createVNode(unref(Link), {
                  href: _ctx.route("products.create"),
                  class: "btn btn-primary w-full text-lg mb-2"
                }, {
                  default: withCtx(() => [
                    createTextVNode("Criar Novo Produto")
                  ]),
                  _: 1
                }, 8, ["href"])
              ]),
              createVNode(SectionContainer, null, {
                default: withCtx(() => [
                  createVNode("h1", { class: "text-3xl font-bold mb-2 text-gray-800 text-center" }, " Produtos "),
                  createVNode(_sfc_main$2, {
                    class: "my-4",
                    placeholder: "Pesquisar produtos",
                    onSearch: searchProducts,
                    q: query.value
                  }, null, 8, ["q"]),
                  !_ctx.products.data.length ? (openBlock(), createBlock("div", {
                    key: 0,
                    class: "text-center"
                  }, [
                    createVNode("h1", { class: "text-2xl font-bold py-16" }, " Nenhum produto encontrado. ")
                  ])) : createCommentVNode("", true),
                  _ctx.products.data.length ? (openBlock(), createBlock("div", {
                    key: 1,
                    class: "grid md:grid-cols-4 w-full gap-3"
                  }, [
                    (openBlock(true), createBlock(Fragment, null, renderList(_ctx.products.data, (product, index) => {
                      return openBlock(), createBlock("div", {
                        key: index,
                        class: "card card-side border border-slate-100 items-center shadow-sm"
                      }, [
                        createVNode("div", { class: "p-2 w-full grid gap-3" }, [
                          withDirectives(createVNode("figure", { class: "w-full h-32 relative" }, [
                            withDirectives(createVNode("span", { class: "text-2xl text-white font-bold absolute top-12 text-center z-10" }, toDisplayString(product.name), 513), [
                              [vShow, !product.imageUrl]
                            ]),
                            withDirectives(createVNode("div", { class: "absolute bg-black opacity-80 rounded-lg" }, null, 512), [
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
                          createVNode("div", { class: "flex justify-between w-full items-center" }, [
                            createVNode("div", { class: "w-36" }, [
                              createVNode("h2", { class: "text-wrap truncate ... font-semibold text-lg" }, toDisplayString(product.name), 1),
                              createVNode("p", null, toDisplayString(unref(formatMoneyToBRL)(product.price)), 1)
                            ]),
                            createVNode("div", { class: "card-actions justify-end flex-col" }, [
                              createVNode(unref(Link), {
                                href: _ctx.route("products.edit", product.id),
                                class: "btn btn-primary btn-sm w-full"
                              }, {
                                default: withCtx(() => [
                                  createTextVNode("Editar")
                                ]),
                                _: 2
                              }, 1032, ["href"]),
                              createVNode("button", {
                                onClick: ($event) => destroy(product.id),
                                class: "btn btn-error btn-sm w-full"
                              }, " Deletar ", 8, ["onClick"])
                            ])
                          ])
                        ])
                      ]);
                    }), 128))
                  ])) : createCommentVNode("", true),
                  createVNode(Pagination, {
                    class: "mt-6",
                    links: linksWithSearch.value
                  }, null, 8, ["links"])
                ]),
                _: 1
              }),
              props.flash.success && showToast.value ? (openBlock(), createBlock(ToastSuccess, { key: 0 }, {
                default: withCtx(() => [
                  createTextVNode(toDisplayString(props.flash.success), 1)
                ]),
                _: 1
              })) : createCommentVNode("", true),
              props.flash.error && showToast.value ? (openBlock(), createBlock(ToastError, { key: 1 }, {
                default: withCtx(() => [
                  createTextVNode(toDisplayString(props.flash.error), 1)
                ]),
                _: 1
              })) : createCommentVNode("", true)
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Pages/Products/Index.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as default
};
