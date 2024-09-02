import { defineComponent, ref, useSSRContext } from "vue";
import { ssrRenderAttrs, ssrRenderAttr } from "vue/server-renderer";
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "DateInput",
  __ssrInlineRender: true,
  props: {
    d: String
  },
  emits: ["searchDate"],
  setup(__props, { emit: __emit }) {
    const props = __props;
    const date = ref(props.d);
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(_attrs)}><input type="date" class="input input-bordered focus:ring-0 focus:outline-none text-xl"${ssrRenderAttr("value", date.value)}></div>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Components/DateInput.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as _
};
