import { defineComponent, ref, mergeProps, useSSRContext, computed, unref, withCtx, renderSlot, openBlock, createBlock, createVNode } from "vue";
import { ssrRenderAttrs, ssrRenderStyle, ssrRenderComponent, ssrRenderSlot, ssrRenderClass } from "vue/server-renderer";
import { E as EasyPdvLogo } from "./EasyPdvLogo-DLch-3A5.js";
import { Link } from "@inertiajs/vue3";
const _sfc_main$3 = /* @__PURE__ */ defineComponent({
  __name: "Header",
  __ssrInlineRender: true,
  props: {
    open: { type: Boolean }
  },
  emits: ["sidebar-open"],
  setup(__props, { emit: __emit }) {
    const dropdownOpen = ref(false);
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<header${ssrRenderAttrs(mergeProps({ class: "flex items-center justify-between px-6 py-4 bg-white border-b-4 border-primary" }, _attrs))}><div class="flex items-center"><button class="text-gray-500 focus:outline-none lg:hidden"><svg class="w-6 h-6" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M4 6H20M4 12H20M4 18H11" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path></svg></button><h1 class="font-bold text-2xl">PDV - Fácil</h1></div><div class="flex items-center"><div class="relative"><button class="relative block w-8 h-8 overflow-hidden rounded-full shadow focus:outline-none"><img class="object-cover w-full h-full" src="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIxZW0iIGhlaWdodD0iMWVtIiB2aWV3Qm94PSIwIDAgMTIwMCAxMjAwIj48cGF0aCBmaWxsPSJjdXJyZW50Q29sb3IiIGQ9Ik05MzkuNTc0IDg1OC4zODNjLTE1Ny4zNDEtNTcuMzE4LTIwNy42NC0xMDUuNzAyLTIwNy42NC0yMDkuMjk4YzAtNjIuMTcgNTEuNTU1LTEwMi40NjIgNjkuMTI4LTE1NS43NDRjMTcuNTc1LTUzLjI4MyAyNy43NDEtMTE2LjM2NyAzNi4xOTEtMTYyLjI1NmM4LjQ1MS00NS44ODkgMTEuODA5LTYzLjYzOCAxNi40MDQtMTEyLjUzMkM4NTkuMjc2IDE1Ny41MzIgODE4LjQyNiAwIDYwMCAwQzM4MS42MzkgMCAzNDAuNjU5IDE1Ny41MzIgMzQ2LjQwNCAyMTguNTUzYzQuNTk2IDQ4Ljg5NCA3Ljk3MiA2Ni42NDUgMTYuNDA0IDExMi41MzJjOC40MzMgNDUuODg4IDE4LjUgMTA4Ljk2OSAzNi4wNjMgMTYyLjI1NmMxNy41NjIgNTMuMjg2IDY5LjE5IDkzLjU3NCA2OS4xOSAxNTUuNzQ0YzAgMTAzLjU5Ni01MC4yOTggMTUxLjk3OS0yMDcuNjM4IDIwOS4yOThDMTAyLjUxMSA5MTUuODMgMCA5NzIuNDc5IDAgMTAxMi41VjEyMDBoMTIwMHYtMTg3LjVjMC0zOS45NTctMTAyLjU3NC05Ni42MDYtMjYwLjQyNi0xNTQuMTE3Ii8+PC9zdmc+" alt="Your avatar"></button><div style="${ssrRenderStyle(dropdownOpen.value ? null : { display: "none" })}" class="fixed inset-0 z-10 w-full h-full"></div><div style="${ssrRenderStyle(dropdownOpen.value ? null : { display: "none" })}" class="absolute right-0 z-10 w-48 mt-2 overflow-hidden bg-white rounded-md shadow-xl"><a href="#" class="block px-4 py-2 text-sm text-gray-700 hover:bg-secondary hover:text-white">Configurações</a><a href="/login" class="block px-4 py-2 text-sm text-gray-700 hover:bg-secondary hover:text-white">Logout</a></div></div></div></header>`);
    };
  }
});
const _sfc_setup$3 = _sfc_main$3.setup;
_sfc_main$3.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Components/Admin/Header.vue");
  return _sfc_setup$3 ? _sfc_setup$3(props, ctx) : void 0;
};
const _sfc_main$2 = {
  __name: "AdminSideBarNavLink",
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
      () => props.active ? "flex items-center px-6 py-2 mt-4 text-gray-700 bg-secondary text-gray-100" : "flex items-center px-6 py-2 mt-4 text-gray-700 hover:bg-secondary hover:text-gray-100"
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Components/Admin/AdminSideBarNavLink.vue");
  return _sfc_setup$2 ? _sfc_setup$2(props, ctx) : void 0;
};
const _sfc_main$1 = /* @__PURE__ */ defineComponent({
  __name: "SideBar",
  __ssrInlineRender: true,
  props: {
    open: { type: Boolean }
  },
  setup(__props) {
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<!--[--><div class="${ssrRenderClass([_ctx.open ? "block" : "hidden", "fixed inset-0 z-20 transition-opacity bg-black opacity-50 lg:hidden"])}"></div><div class="${ssrRenderClass([_ctx.open ? "translate-x-0 ease-out" : "-translate-x-full ease-in", "fixed inset-y-0 left-0 z-30 w-64 overflow-y-auto transition duration-300 transform bg-primary lg:translate-x-0 lg:static lg:inset-0"])}"><div class="flex items-center justify-center mt-8"><div class="flex items-center flex-col justify-center gap-4">`);
      _push(ssrRenderComponent(EasyPdvLogo, null, null, _parent));
      _push(`<span class="mx-2 text-2xl font-semibold text-gray-700">Administração</span></div></div><nav class="mt-10">`);
      _push(ssrRenderComponent(_sfc_main$2, {
        active: _ctx.route().current("admin.index"),
        href: _ctx.route("admin.index")
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<svg xmlns="http://www.w3.org/2000/svg" class="w-6 h-6" viewBox="0 0 24 24"${_scopeId}><path fill="currentColor" d="M13 9V3h8v6zM3 13V3h8v10zm10 8V11h8v10zM3 21v-6h8v6z"${_scopeId}></path></svg><span class="mx-3"${_scopeId}>Inicio</span>`);
          } else {
            return [
              (openBlock(), createBlock("svg", {
                xmlns: "http://www.w3.org/2000/svg",
                class: "w-6 h-6",
                viewBox: "0 0 24 24"
              }, [
                createVNode("path", {
                  fill: "currentColor",
                  d: "M13 9V3h8v6zM3 13V3h8v10zm10 8V11h8v10zM3 21v-6h8v6z"
                })
              ])),
              createVNode("span", { class: "mx-3" }, "Inicio")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(_sfc_main$2, {
        active: _ctx.route().current("admin.users.index"),
        href: _ctx.route("admin.users.index")
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<svg xmlns="http://www.w3.org/2000/svg" class="w-6 h-6" viewBox="0 0 24 24"${_scopeId}><path fill="currentColor" d="M13.07 10.41a5 5 0 0 0 0-5.82A3.4 3.4 0 0 1 15 4a3.5 3.5 0 0 1 0 7a3.4 3.4 0 0 1-1.93-.59M5.5 7.5A3.5 3.5 0 1 1 9 11a3.5 3.5 0 0 1-3.5-3.5m2 0A1.5 1.5 0 1 0 9 6a1.5 1.5 0 0 0-1.5 1.5M16 17v2H2v-2s0-4 7-4s7 4 7 4m-2 0c-.14-.78-1.33-2-5-2s-4.93 1.31-5 2m11.95-4A5.32 5.32 0 0 1 18 17v2h4v-2s0-3.63-6.06-4Z"${_scopeId}></path></svg><span class="mx-3"${_scopeId}>Usuários</span>`);
          } else {
            return [
              (openBlock(), createBlock("svg", {
                xmlns: "http://www.w3.org/2000/svg",
                class: "w-6 h-6",
                viewBox: "0 0 24 24"
              }, [
                createVNode("path", {
                  fill: "currentColor",
                  d: "M13.07 10.41a5 5 0 0 0 0-5.82A3.4 3.4 0 0 1 15 4a3.5 3.5 0 0 1 0 7a3.4 3.4 0 0 1-1.93-.59M5.5 7.5A3.5 3.5 0 1 1 9 11a3.5 3.5 0 0 1-3.5-3.5m2 0A1.5 1.5 0 1 0 9 6a1.5 1.5 0 0 0-1.5 1.5M16 17v2H2v-2s0-4 7-4s7 4 7 4m-2 0c-.14-.78-1.33-2-5-2s-4.93 1.31-5 2m11.95-4A5.32 5.32 0 0 1 18 17v2h4v-2s0-3.63-6.06-4Z"
                })
              ])),
              createVNode("span", { class: "mx-3" }, "Usuários")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(_sfc_main$2, {
        active: _ctx.route().current("admin.companies.index"),
        href: _ctx.route("admin.companies.index")
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<svg xmlns="http://www.w3.org/2000/svg" class="w-6 h-6" viewBox="0 0 24 24"${_scopeId}><path fill="currentColor" d="M18 23v-3h-3v-2h3v-3h2v3h3v2h-3v3zM2 20v-6H1v-2l1-5h15l1 5v2h-1v3h-2v-3h-4v6zm2-2h5v-4H4zm-.95-6h12.9zM2 6V4h15v2zm1.05 6h12.9l-.6-3H3.65z"${_scopeId}></path></svg><span class="mx-3"${_scopeId}>Empresas</span>`);
          } else {
            return [
              (openBlock(), createBlock("svg", {
                xmlns: "http://www.w3.org/2000/svg",
                class: "w-6 h-6",
                viewBox: "0 0 24 24"
              }, [
                createVNode("path", {
                  fill: "currentColor",
                  d: "M18 23v-3h-3v-2h3v-3h2v3h3v2h-3v3zM2 20v-6H1v-2l1-5h15l1 5v2h-1v3h-2v-3h-4v6zm2-2h5v-4H4zm-.95-6h12.9zM2 6V4h15v2zm1.05 6h12.9l-.6-3H3.65z"
                })
              ])),
              createVNode("span", { class: "mx-3" }, "Empresas")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(_sfc_main$2, {
        active: _ctx.route().current("dashboard"),
        href: "/"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<svg xmlns="http://www.w3.org/2000/svg" class="w-6 h-6" viewBox="0 0 24 24"${_scopeId}><path fill="currentColor" d="M19.9 12.66a1 1 0 0 1 0-1.32l1.28-1.44a1 1 0 0 0 .12-1.17l-2-3.46a1 1 0 0 0-1.07-.48l-1.88.38a1 1 0 0 1-1.15-.66l-.61-1.83a1 1 0 0 0-.95-.68h-4a1 1 0 0 0-1 .68l-.56 1.83a1 1 0 0 1-1.15.66L5 4.79a1 1 0 0 0-1 .48L2 8.73a1 1 0 0 0 .1 1.17l1.27 1.44a1 1 0 0 1 0 1.32L2.1 14.1a1 1 0 0 0-.1 1.17l2 3.46a1 1 0 0 0 1.07.48l1.88-.38a1 1 0 0 1 1.15.66l.61 1.83a1 1 0 0 0 1 .68h4a1 1 0 0 0 .95-.68l.61-1.83a1 1 0 0 1 1.15-.66l1.88.38a1 1 0 0 0 1.07-.48l2-3.46a1 1 0 0 0-.12-1.17ZM18.41 14l.8.9l-1.28 2.22l-1.18-.24a3 3 0 0 0-3.45 2L12.92 20h-2.56L10 18.86a3 3 0 0 0-3.45-2l-1.18.24l-1.3-2.21l.8-.9a3 3 0 0 0 0-4l-.8-.9l1.28-2.2l1.18.24a3 3 0 0 0 3.45-2L10.36 4h2.56l.38 1.14a3 3 0 0 0 3.45 2l1.18-.24l1.28 2.22l-.8.9a3 3 0 0 0 0 3.98m-6.77-6a4 4 0 1 0 4 4a4 4 0 0 0-4-4m0 6a2 2 0 1 1 2-2a2 2 0 0 1-2 2"${_scopeId}></path></svg><span class="mx-3"${_scopeId}>Configurações</span>`);
          } else {
            return [
              (openBlock(), createBlock("svg", {
                xmlns: "http://www.w3.org/2000/svg",
                class: "w-6 h-6",
                viewBox: "0 0 24 24"
              }, [
                createVNode("path", {
                  fill: "currentColor",
                  d: "M19.9 12.66a1 1 0 0 1 0-1.32l1.28-1.44a1 1 0 0 0 .12-1.17l-2-3.46a1 1 0 0 0-1.07-.48l-1.88.38a1 1 0 0 1-1.15-.66l-.61-1.83a1 1 0 0 0-.95-.68h-4a1 1 0 0 0-1 .68l-.56 1.83a1 1 0 0 1-1.15.66L5 4.79a1 1 0 0 0-1 .48L2 8.73a1 1 0 0 0 .1 1.17l1.27 1.44a1 1 0 0 1 0 1.32L2.1 14.1a1 1 0 0 0-.1 1.17l2 3.46a1 1 0 0 0 1.07.48l1.88-.38a1 1 0 0 1 1.15.66l.61 1.83a1 1 0 0 0 1 .68h4a1 1 0 0 0 .95-.68l.61-1.83a1 1 0 0 1 1.15-.66l1.88.38a1 1 0 0 0 1.07-.48l2-3.46a1 1 0 0 0-.12-1.17ZM18.41 14l.8.9l-1.28 2.22l-1.18-.24a3 3 0 0 0-3.45 2L12.92 20h-2.56L10 18.86a3 3 0 0 0-3.45-2l-1.18.24l-1.3-2.21l.8-.9a3 3 0 0 0 0-4l-.8-.9l1.28-2.2l1.18.24a3 3 0 0 0 3.45-2L10.36 4h2.56l.38 1.14a3 3 0 0 0 3.45 2l1.18-.24l1.28 2.22l-.8.9a3 3 0 0 0 0 3.98m-6.77-6a4 4 0 1 0 4 4a4 4 0 0 0-4-4m0 6a2 2 0 1 1 2-2a2 2 0 0 1-2 2"
                })
              ])),
              createVNode("span", { class: "mx-3" }, "Configurações")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</nav></div><!--]-->`);
    };
  }
});
const _sfc_setup$1 = _sfc_main$1.setup;
_sfc_main$1.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Components/Admin/SideBar.vue");
  return _sfc_setup$1 ? _sfc_setup$1(props, ctx) : void 0;
};
const _sfc_main = {
  __name: "AdminLayout",
  __ssrInlineRender: true,
  setup(__props) {
    const sidebarOpen = ref(false);
    const handleSideBar = (value) => {
      sidebarOpen.value = value;
    };
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "flex h-screen bg-gray-200 font-roboto" }, _attrs))}>`);
      _push(ssrRenderComponent(_sfc_main$1, {
        onSidebarOpen: handleSideBar,
        open: sidebarOpen.value
      }, null, _parent));
      _push(`<div class="flex-1 flex flex-col overflow-hidden">`);
      _push(ssrRenderComponent(_sfc_main$3, {
        onSidebarOpen: handleSideBar,
        open: sidebarOpen.value
      }, null, _parent));
      _push(`<main class="flex-1 overflow-x-hidden overflow-y-auto bg-gray-200">`);
      ssrRenderSlot(_ctx.$slots, "default", {}, null, _push, _parent);
      _push(`</main></div></div>`);
    };
  }
};
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Layouts/AdminLayout.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const AdminLayout = _sfc_main;
export {
  AdminLayout as A
};
