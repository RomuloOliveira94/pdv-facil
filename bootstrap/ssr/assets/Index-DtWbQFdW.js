import { defineComponent, withCtx, openBlock, createBlock, createTextVNode, toDisplayString, withDirectives, createVNode, vShow, createCommentVNode, unref, useSSRContext } from "vue";
import { ssrRenderComponent, ssrInterpolate, ssrRenderStyle, ssrRenderAttr } from "vue/server-renderer";
import { _ as _sfc_main$1 } from "./AuthenticatedLayout-D3YttXd4.js";
import { S as SectionContainer } from "./SectionContainer-0J7EYAY4.js";
import { Head, Link } from "@inertiajs/vue3";
import "./_plugin-vue_export-helper-1tPrXgE0.js";
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "Index",
  __ssrInlineRender: true,
  props: {
    company: {}
  },
  setup(__props) {
    return (_ctx, _push, _parent, _attrs) => {
      _push(ssrRenderComponent(_sfc_main$1, _attrs, {
        header: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            if (_ctx.company !== null) {
              _push2(`<h2 class="font-semibold text-xl text-gray-800 leading-tight"${_scopeId}> Dados da Empresa: ${ssrInterpolate(_ctx.company.name)} <span style="${ssrRenderStyle(_ctx.company.cnpj ? null : { display: "none" })}"${_scopeId}>- ${ssrInterpolate(_ctx.company.cnpj)}</span></h2>`);
            } else {
              _push2(`<!---->`);
            }
          } else {
            return [
              _ctx.company !== null ? (openBlock(), createBlock("h2", {
                key: 0,
                class: "font-semibold text-xl text-gray-800 leading-tight"
              }, [
                createTextVNode(" Dados da Empresa: " + toDisplayString(_ctx.company.name) + " ", 1),
                withDirectives(createVNode("span", null, "- " + toDisplayString(_ctx.company.cnpj), 513), [
                  [vShow, _ctx.company.cnpj]
                ])
              ])) : createCommentVNode("", true)
            ];
          }
        }),
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(unref(Head), { title: "Empresa" }, null, _parent2, _scopeId));
            if (_ctx.company !== null) {
              _push2(ssrRenderComponent(SectionContainer, null, {
                default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(`<div class="flex gap-3 justify-between items-center w-full"${_scopeId2}><div class="grid gap-1"${_scopeId2}><h1${_scopeId2}>${ssrInterpolate(_ctx.company.name)}</h1><h2${_scopeId2}>${ssrInterpolate(_ctx.company.email)}</h2><h2${_scopeId2}>${ssrInterpolate(_ctx.company.address)}, ${ssrInterpolate(_ctx.company.address_number)} - ${ssrInterpolate(_ctx.company.zip_code)}</h2><h2${_scopeId2}>${ssrInterpolate(_ctx.company.city)} - ${ssrInterpolate(_ctx.company.state)}</h2><h2${_scopeId2}>${ssrInterpolate(_ctx.company.phone)}</h2></div><img${ssrRenderAttr("src", "/storage/" + _ctx.company.logo)}${ssrRenderAttr("alt", _ctx.company.name)} class="w-40 h-40 object-cover rounded-lg"${_scopeId2}></div>`);
                  } else {
                    return [
                      createVNode("div", { class: "flex gap-3 justify-between items-center w-full" }, [
                        createVNode("div", { class: "grid gap-1" }, [
                          createVNode("h1", null, toDisplayString(_ctx.company.name), 1),
                          createVNode("h2", null, toDisplayString(_ctx.company.email), 1),
                          createVNode("h2", null, toDisplayString(_ctx.company.address) + ", " + toDisplayString(_ctx.company.address_number) + " - " + toDisplayString(_ctx.company.zip_code), 1),
                          createVNode("h2", null, toDisplayString(_ctx.company.city) + " - " + toDisplayString(_ctx.company.state), 1),
                          createVNode("h2", null, toDisplayString(_ctx.company.phone), 1)
                        ]),
                        createVNode("img", {
                          src: "/storage/" + _ctx.company.logo,
                          alt: _ctx.company.name,
                          class: "w-40 h-40 object-cover rounded-lg"
                        }, null, 8, ["src", "alt"])
                      ])
                    ];
                  }
                }),
                _: 1
              }, _parent2, _scopeId));
            } else {
              _push2(`<!---->`);
            }
            if (_ctx.company !== null) {
              _push2(ssrRenderComponent(unref(Link), {
                href: _ctx.route("company.edit", _ctx.company.id),
                class: "btn btn-primary w-32 mt-6 self-end"
              }, {
                default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(`Editar`);
                  } else {
                    return [
                      createTextVNode("Editar")
                    ];
                  }
                }),
                _: 1
              }, _parent2, _scopeId));
            } else {
              _push2(`<div${_scopeId}><p${_scopeId}>Empresa não encontrada.</p></div>`);
            }
          } else {
            return [
              createVNode(unref(Head), { title: "Empresa" }),
              _ctx.company !== null ? (openBlock(), createBlock(SectionContainer, { key: 0 }, {
                default: withCtx(() => [
                  createVNode("div", { class: "flex gap-3 justify-between items-center w-full" }, [
                    createVNode("div", { class: "grid gap-1" }, [
                      createVNode("h1", null, toDisplayString(_ctx.company.name), 1),
                      createVNode("h2", null, toDisplayString(_ctx.company.email), 1),
                      createVNode("h2", null, toDisplayString(_ctx.company.address) + ", " + toDisplayString(_ctx.company.address_number) + " - " + toDisplayString(_ctx.company.zip_code), 1),
                      createVNode("h2", null, toDisplayString(_ctx.company.city) + " - " + toDisplayString(_ctx.company.state), 1),
                      createVNode("h2", null, toDisplayString(_ctx.company.phone), 1)
                    ]),
                    createVNode("img", {
                      src: "/storage/" + _ctx.company.logo,
                      alt: _ctx.company.name,
                      class: "w-40 h-40 object-cover rounded-lg"
                    }, null, 8, ["src", "alt"])
                  ])
                ]),
                _: 1
              })) : createCommentVNode("", true),
              _ctx.company !== null ? (openBlock(), createBlock(unref(Link), {
                key: 1,
                href: _ctx.route("company.edit", _ctx.company.id),
                class: "btn btn-primary w-32 mt-6 self-end"
              }, {
                default: withCtx(() => [
                  createTextVNode("Editar")
                ]),
                _: 1
              }, 8, ["href"])) : (openBlock(), createBlock("div", { key: 2 }, [
                createVNode("p", null, "Empresa não encontrada.")
              ]))
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Pages/Company/Index.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as default
};
