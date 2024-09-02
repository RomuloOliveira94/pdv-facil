import { mergeProps, useSSRContext } from "vue";
import { ssrRenderAttrs } from "vue/server-renderer";
import { _ as _export_sfc } from "./_plugin-vue_export-helper-1tPrXgE0.js";
const _sfc_main = {};
function _sfc_ssrRender(_ctx, _push, _parent, _attrs) {
  _push(`<img${ssrRenderAttrs(mergeProps({
    src: "/storage/logos/pdvfacil.png",
    alt: "pdv-fácil",
    class: "w-20 h-20 rounded-full object-cover"
  }, _attrs))}>`);
}
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Components/EasyPdvLogo.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const EasyPdvLogo = /* @__PURE__ */ _export_sfc(_sfc_main, [["ssrRender", _sfc_ssrRender]]);
export {
  EasyPdvLogo as E
};
