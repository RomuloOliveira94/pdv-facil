import { defineComponent, resolveComponent, withCtx, createVNode, useSSRContext } from "vue";
import { ssrRenderComponent } from "vue/server-renderer";
import { A as AdminLayout } from "./AdminLayout-DwLQ6T7z.js";
import "./EasyPdvLogo-DLch-3A5.js";
import "./_plugin-vue_export-helper-1tPrXgE0.js";
import "@inertiajs/vue3";
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "Create",
  __ssrInlineRender: true,
  setup(__props) {
    return (_ctx, _push, _parent, _attrs) => {
      const _component_Head = resolveComponent("Head");
      _push(ssrRenderComponent(AdminLayout, _attrs, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_Head, { title: "Empresas" }, null, _parent2, _scopeId));
            _push2(`<div class="container mx-auto px-6 py-8"${_scopeId}><h1${_scopeId}>Pegou as companies</h1></div>`);
          } else {
            return [
              createVNode(_component_Head, { title: "Empresas" }),
              createVNode("div", { class: "container mx-auto px-6 py-8" }, [
                createVNode("h1", null, "Pegou as companies")
              ])
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Pages/Admin/Companies/Create.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as default
};
