import { mergeProps, useSSRContext, onMounted, onUnmounted, computed, ref, unref, withCtx, renderSlot, defineComponent, createVNode, createTextVNode, toDisplayString, openBlock, createBlock } from "vue";
import { ssrRenderAttrs, ssrRenderSlot, ssrRenderStyle, ssrRenderClass, ssrRenderComponent, ssrInterpolate } from "vue/server-renderer";
import { _ as _export_sfc } from "./_plugin-vue_export-helper-1tPrXgE0.js";
import { Link } from "@inertiajs/vue3";
const _sfc_main$5 = {};
function _sfc_ssrRender(_ctx, _push, _parent, _attrs) {
  _push(`<img${ssrRenderAttrs(mergeProps({
    src: "/storage/" + _ctx.$page.props.logo.url,
    alt: "pdv-fácil",
    class: "w-16 h-16 rounded-full object-cover"
  }, _attrs))}>`);
}
const _sfc_setup$5 = _sfc_main$5.setup;
_sfc_main$5.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Components/ApplicationLogo.vue");
  return _sfc_setup$5 ? _sfc_setup$5(props, ctx) : void 0;
};
const ApplicationLogo = /* @__PURE__ */ _export_sfc(_sfc_main$5, [["ssrRender", _sfc_ssrRender]]);
const _sfc_main$4 = {
  __name: "Dropdown",
  __ssrInlineRender: true,
  props: {
    align: {
      type: String,
      default: "right"
    },
    width: {
      type: String,
      default: "48"
    },
    contentClasses: {
      type: String,
      default: "py-1 bg-white"
    }
  },
  setup(__props) {
    const props = __props;
    const closeOnEscape = (e) => {
      if (open.value && e.key === "Escape") {
        open.value = false;
      }
    };
    onMounted(() => document.addEventListener("keydown", closeOnEscape));
    onUnmounted(() => document.removeEventListener("keydown", closeOnEscape));
    const widthClass = computed(() => {
      return {
        48: "w-48"
      }[props.width.toString()];
    });
    const alignmentClasses = computed(() => {
      if (props.align === "left") {
        return "ltr:origin-top-left rtl:origin-top-right start-0";
      } else if (props.align === "right") {
        return "ltr:origin-top-right rtl:origin-top-left end-0";
      } else {
        return "origin-top";
      }
    });
    const open = ref(false);
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "relative" }, _attrs))}><div class="flex gap-2 items-center justify-center">`);
      ssrRenderSlot(_ctx.$slots, "trigger", {}, null, _push, _parent);
      _push(`</div><div style="${ssrRenderStyle(open.value ? null : { display: "none" })}" class="fixed inset-0 z-40"></div><div style="${ssrRenderStyle([
        open.value ? null : { display: "none" },
        { "display": "none" }
      ])}" class="${ssrRenderClass([[widthClass.value, alignmentClasses.value], "absolute z-50 mt-2 rounded-md shadow-lg"])}"><div class="${ssrRenderClass([__props.contentClasses, "rounded-md ring-1 ring-black ring-opacity-5"])}">`);
      ssrRenderSlot(_ctx.$slots, "content", {}, null, _push, _parent);
      _push(`</div></div></div>`);
    };
  }
};
const _sfc_setup$4 = _sfc_main$4.setup;
_sfc_main$4.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Components/Dropdown.vue");
  return _sfc_setup$4 ? _sfc_setup$4(props, ctx) : void 0;
};
const Dropdown = _sfc_main$4;
const _sfc_main$3 = {
  __name: "DropdownLink",
  __ssrInlineRender: true,
  props: {
    href: {
      type: String,
      required: true
    }
  },
  setup(__props) {
    return (_ctx, _push, _parent, _attrs) => {
      _push(ssrRenderComponent(unref(Link), mergeProps({
        href: __props.href,
        class: "block w-full px-4 py-2 text-start text-sm leading-5 text-gray-700 hover:bg-gray-100 focus:outline-none focus:bg-gray-100 transition duration-150 ease-in-out"
      }, _attrs), {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            ssrRenderSlot(_ctx.$slots, "default", {}, null, _push2, _parent2, _scopeId);
          } else {
            return [
              renderSlot(_ctx.$slots, "default")
            ];
          }
        }),
        _: 3
      }, _parent));
    };
  }
};
const _sfc_setup$3 = _sfc_main$3.setup;
_sfc_main$3.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Components/DropdownLink.vue");
  return _sfc_setup$3 ? _sfc_setup$3(props, ctx) : void 0;
};
const DropdownLink = _sfc_main$3;
const _sfc_main$2 = {
  __name: "NavLink",
  __ssrInlineRender: true,
  props: {
    href: {
      type: String,
      required: true
    },
    active: {
      type: Boolean
    }
  },
  setup(__props) {
    const props = __props;
    const classes = computed(
      () => props.active ? "inline-flex items-center px-1 pt-1 border-b-2 border-primary text-sm font-medium leading-5 text-gray-900 focus:outline-none focus:border-primary transition duration-150 ease-in-out" : "inline-flex items-center px-1 pt-1 border-b-2 border-transparent text-sm font-medium leading-5 text-gray-500 hover:text-gray-700 hover:border-gray-300 focus:outline-none focus:text-gray-700 focus:border-gray-300 transition duration-150 ease-in-out"
    );
    return (_ctx, _push, _parent, _attrs) => {
      _push(ssrRenderComponent(unref(Link), mergeProps({
        href: __props.href,
        class: classes.value
      }, _attrs), {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            ssrRenderSlot(_ctx.$slots, "default", {}, null, _push2, _parent2, _scopeId);
          } else {
            return [
              renderSlot(_ctx.$slots, "default")
            ];
          }
        }),
        _: 3
      }, _parent));
    };
  }
};
const _sfc_setup$2 = _sfc_main$2.setup;
_sfc_main$2.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Components/NavLink.vue");
  return _sfc_setup$2 ? _sfc_setup$2(props, ctx) : void 0;
};
const NavLink = _sfc_main$2;
const _sfc_main$1 = {
  __name: "ResponsiveNavLink",
  __ssrInlineRender: true,
  props: {
    href: {
      type: String,
      required: true
    },
    active: {
      type: Boolean
    }
  },
  setup(__props) {
    const props = __props;
    const classes = computed(
      () => props.active ? "block w-full ps-3 pe-4 py-2 border-l-4 border-primary text-start text-base font-medium text-gray-600 bg-primary focus:outline-none focus:text-indigo-800 focus:bg-primary focus:border-primary transition duration-150 ease-in-out" : "block w-full ps-3 pe-4 py-2 border-l-4 border-transparent text-start text-base font-medium text-gray-600 hover:text-gray-800 hover:bg-gray-50 hover:border-gray-300 focus:outline-none focus:text-gray-800 focus:bg-gray-50 focus:border-gray-300 transition duration-150 ease-in-out"
    );
    return (_ctx, _push, _parent, _attrs) => {
      _push(ssrRenderComponent(unref(Link), mergeProps({
        href: __props.href,
        class: classes.value
      }, _attrs), {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            ssrRenderSlot(_ctx.$slots, "default", {}, null, _push2, _parent2, _scopeId);
          } else {
            return [
              renderSlot(_ctx.$slots, "default")
            ];
          }
        }),
        _: 3
      }, _parent));
    };
  }
};
const _sfc_setup$1 = _sfc_main$1.setup;
_sfc_main$1.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Components/ResponsiveNavLink.vue");
  return _sfc_setup$1 ? _sfc_setup$1(props, ctx) : void 0;
};
const ResponsiveNavLink = _sfc_main$1;
const formatDate = (dateString) => {
  const options = { year: "numeric", month: "long", day: "numeric" };
  return new Date(dateString).toLocaleDateString(void 0, options);
};
const formatMoneyToBRL = (value) => {
  return value.toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL",
    maximumFractionDigits: 2
  });
};
const formatRoles = (roles) => {
  switch (roles) {
    case "admin":
      return "Administrador";
    case "cashier":
      return "Caixa";
    case "manager":
      return "Gerente";
    default:
      return "Não definido";
  }
};
const clearEmptyQuery = (query) => {
  for (const key in query) {
    if (query[key] === "") {
      delete query[key];
    }
  }
};
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "AuthenticatedLayout",
  __ssrInlineRender: true,
  setup(__props) {
    const showingNavigationDropdown = ref(false);
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(_attrs)}><div class="min-h-screen bg-gray-100"><nav class="bg-[#FFF6E6] border-b border-gray-100"><div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"><div class="flex justify-between h-16"><div class="flex"><div class="shrink-0 flex items-center">`);
      _push(ssrRenderComponent(unref(Link), {
        href: _ctx.route("sells.create")
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(ApplicationLogo, { class: "block h-18 w-18 fill-current text-gray-800" }, null, _parent2, _scopeId));
          } else {
            return [
              createVNode(ApplicationLogo, { class: "block h-18 w-18 fill-current text-gray-800" })
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</div><div class="hidden space-x-8 sm:-my-px sm:ms-10 sm:flex">`);
      _push(ssrRenderComponent(NavLink, {
        href: _ctx.route("inicio"),
        active: _ctx.route().current("inicio")
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(` Inicio `);
          } else {
            return [
              createTextVNode(" Inicio ")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(NavLink, {
        href: _ctx.route("sells.create"),
        active: _ctx.route().current("sells.create")
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(` Registro de Venda `);
          } else {
            return [
              createTextVNode(" Registro de Venda ")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(NavLink, {
        href: _ctx.route("products.index"),
        active: _ctx.route().current("products.index")
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(` Produtos `);
          } else {
            return [
              createTextVNode(" Produtos ")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(NavLink, {
        href: _ctx.route("sells.index"),
        active: _ctx.route().current("sells.index")
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(` Vendas `);
          } else {
            return [
              createTextVNode(" Vendas ")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(NavLink, {
        href: _ctx.route("cashiers.index"),
        active: _ctx.route().current("cashiers.index")
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(` Caixas `);
          } else {
            return [
              createTextVNode(" Caixas ")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(NavLink, {
        href: _ctx.route("company.index"),
        active: _ctx.route().current("company.index")
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(` Empresa `);
          } else {
            return [
              createTextVNode(" Empresa ")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</div></div><div class="hidden sm:flex sm:items-center sm:ms-6"><div class="ms-3 relative">`);
      _push(ssrRenderComponent(Dropdown, {
        align: "right",
        width: "48"
      }, {
        trigger: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<span class="inline-flex rounded-md"${_scopeId}><button type="button" class="inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md text-gray-500 bg-white hover:text-gray-700 focus:outline-none transition ease-in-out duration-150"${_scopeId}>${ssrInterpolate(_ctx.$page.props.auth.user.name)} <svg class="ms-2 -me-0.5 h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor"${_scopeId}><path fill-rule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clip-rule="evenodd"${_scopeId}></path></svg></button></span><span class="text-gray-800"${_scopeId}>|</span><span class="text-gray-800"${_scopeId}> Cargo: ${ssrInterpolate(unref(formatRoles)(
              _ctx.$page.props.auth.user.role
            ))}</span>`);
          } else {
            return [
              createVNode("span", { class: "inline-flex rounded-md" }, [
                createVNode("button", {
                  type: "button",
                  class: "inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md text-gray-500 bg-white hover:text-gray-700 focus:outline-none transition ease-in-out duration-150"
                }, [
                  createTextVNode(toDisplayString(_ctx.$page.props.auth.user.name) + " ", 1),
                  (openBlock(), createBlock("svg", {
                    class: "ms-2 -me-0.5 h-4 w-4",
                    xmlns: "http://www.w3.org/2000/svg",
                    viewBox: "0 0 20 20",
                    fill: "currentColor"
                  }, [
                    createVNode("path", {
                      "fill-rule": "evenodd",
                      d: "M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z",
                      "clip-rule": "evenodd"
                    })
                  ]))
                ])
              ]),
              createVNode("span", { class: "text-gray-800" }, "|"),
              createVNode("span", { class: "text-gray-800" }, " Cargo: " + toDisplayString(unref(formatRoles)(
                _ctx.$page.props.auth.user.role
              )), 1)
            ];
          }
        }),
        content: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(DropdownLink, {
              href: _ctx.route("profile.edit")
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(` Perfil `);
                } else {
                  return [
                    createTextVNode(" Perfil ")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(DropdownLink, {
              href: _ctx.route("logout"),
              method: "post",
              as: "button"
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(` Sair `);
                } else {
                  return [
                    createTextVNode(" Sair ")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
          } else {
            return [
              createVNode(DropdownLink, {
                href: _ctx.route("profile.edit")
              }, {
                default: withCtx(() => [
                  createTextVNode(" Perfil ")
                ]),
                _: 1
              }, 8, ["href"]),
              createVNode(DropdownLink, {
                href: _ctx.route("logout"),
                method: "post",
                as: "button"
              }, {
                default: withCtx(() => [
                  createTextVNode(" Sair ")
                ]),
                _: 1
              }, 8, ["href"])
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</div></div><div class="-me-2 flex items-center sm:hidden"><button class="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:bg-gray-100 focus:text-gray-500 transition duration-150 ease-in-out"><svg class="h-6 w-6" stroke="currentColor" fill="none" viewBox="0 0 24 24"><path class="${ssrRenderClass({
        hidden: showingNavigationDropdown.value,
        "inline-flex": !showingNavigationDropdown.value
      })}" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"></path><path class="${ssrRenderClass({
        hidden: !showingNavigationDropdown.value,
        "inline-flex": showingNavigationDropdown.value
      })}" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path></svg></button></div></div></div><div class="${ssrRenderClass([{
        block: showingNavigationDropdown.value,
        hidden: !showingNavigationDropdown.value
      }, "sm:hidden"])}"><div class="pt-2 pb-3 space-y-1">`);
      _push(ssrRenderComponent(ResponsiveNavLink, {
        href: _ctx.route("inicio"),
        active: _ctx.route().current("inicio")
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(` Inicio `);
          } else {
            return [
              createTextVNode(" Inicio ")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(ResponsiveNavLink, {
        href: _ctx.route("sells.create"),
        active: _ctx.route().current("sells.create")
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(` Registro de Venda `);
          } else {
            return [
              createTextVNode(" Registro de Venda ")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(ResponsiveNavLink, {
        href: _ctx.route("products.index"),
        active: _ctx.route().current("products.index")
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(` Produtos `);
          } else {
            return [
              createTextVNode(" Produtos ")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(ResponsiveNavLink, {
        href: _ctx.route("sells.index"),
        active: _ctx.route().current("sells.index")
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(` Vendas `);
          } else {
            return [
              createTextVNode(" Vendas ")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(ResponsiveNavLink, {
        href: _ctx.route("cashiers.index"),
        active: _ctx.route().current("cashiers.index")
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(` Caixas `);
          } else {
            return [
              createTextVNode(" Caixas ")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(ResponsiveNavLink, {
        href: _ctx.route("company.index"),
        active: _ctx.route().current("company.index")
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(` Empresa `);
          } else {
            return [
              createTextVNode(" Empresa ")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</div><div class="pt-4 pb-1 border-t border-gray-200"><div class="px-4"><div class="font-medium text-base text-gray-800">${ssrInterpolate(_ctx.$page.props.auth.user.name)}</div><div class="font-medium text-sm text-gray-500">${ssrInterpolate(_ctx.$page.props.auth.user.email)}</div></div><div class="mt-3 space-y-1">`);
      _push(ssrRenderComponent(ResponsiveNavLink, {
        href: _ctx.route("profile.edit")
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(` Perfil `);
          } else {
            return [
              createTextVNode(" Perfil ")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(ResponsiveNavLink, {
        href: _ctx.route("logout"),
        method: "post",
        as: "button"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(` Sair `);
          } else {
            return [
              createTextVNode(" Sair ")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</div></div></div></nav>`);
      if (_ctx.$slots.header) {
        _push(`<header class="bg-[#FFF6E6] shadow"><div class="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">`);
        ssrRenderSlot(_ctx.$slots, "header", {}, null, _push, _parent);
        _push(`</div></header>`);
      } else {
        _push(`<!---->`);
      }
      _push(`<main><div class="py-4 px-2 bg-[#FFF6E6]"><div class="max-w-7xl mx-auto sm:px-6 lg:px-8 min-h-screen">`);
      ssrRenderSlot(_ctx.$slots, "default", {}, null, _push, _parent);
      _push(`</div></div></main></div></div>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Layouts/AuthenticatedLayout.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as _,
  formatMoneyToBRL as a,
  formatRoles as b,
  clearEmptyQuery as c,
  formatDate as f
};
