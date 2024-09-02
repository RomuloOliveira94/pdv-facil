import { mergeProps, useSSRContext, defineComponent, withCtx, unref, createVNode } from "vue";
import { ssrRenderAttrs, ssrRenderComponent } from "vue/server-renderer";
import { A as AdminLayout } from "./AdminLayout-DwLQ6T7z.js";
import { _ as _export_sfc } from "./_plugin-vue_export-helper-1tPrXgE0.js";
import Cards from "./Cards-aF6FJT63.js";
import { Head } from "@inertiajs/vue3";
import "./EasyPdvLogo-DLch-3A5.js";
const _sfc_main$1 = {};
function _sfc_ssrRender(_ctx, _push, _parent, _attrs) {
  _push(`<div${ssrRenderAttrs(mergeProps({ class: "flex flex-col mt-8" }, _attrs))}><div class="-my-2 py-2 overflow-x-auto sm:-mx-6 sm:px-6 lg:-mx-8 lg:px-8"><div class="align-middle inline-block min-w-full shadow overflow-hidden sm:rounded-lg border-b border-gray-200"><table class="min-w-full"><thead><tr><th class="px-6 py-3 border-b border-gray-200 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider"> Nome </th><th class="px-6 py-3 border-b border-gray-200 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider"> Cargo </th><th class="px-6 py-3 border-b border-gray-200 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider"> Status </th><th class="px-6 py-3 border-b border-gray-200 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider"> Role </th><th class="px-6 py-3 border-b border-gray-200 bg-gray-50"></th></tr></thead><tbody class="bg-white"><tr><td class="px-6 py-4 whitespace-no-wrap border-b border-gray-200"><div class="flex items-center"><div class="flex-shrink-0 h-10 w-10"><img class="h-10 w-10 rounded-full" src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&amp;ixid=eyJhcHBfaWQiOjEyMDd9&amp;auto=format&amp;fit=facearea&amp;facepad=2&amp;w=256&amp;h=256&amp;q=80" alt=""></div><div class="ml-4"><div class="text-sm leading-5 font-medium text-gray-900"> John Doe </div><div class="text-sm leading-5 text-gray-500"> john@example.com </div></div></div></td><td class="px-6 py-4 whitespace-no-wrap border-b border-gray-200"><div class="text-sm leading-5 text-gray-900"> Software Engineer </div><div class="text-sm leading-5 text-gray-500"> Web dev </div></td><td class="px-6 py-4 whitespace-no-wrap border-b border-gray-200"><span class="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">Ativo</span></td><td class="px-6 py-4 whitespace-no-wrap border-b border-gray-200 text-sm leading-5 text-gray-500"> Gerente </td><td class="px-6 py-4 whitespace-no-wrap text-right border-b border-gray-200 text-sm leading-5 font-medium"><a href="#" class="text-indigo-600 hover:text-indigo-900">Editar</a></td></tr></tbody></table></div></div></div>`);
}
const _sfc_setup$1 = _sfc_main$1.setup;
_sfc_main$1.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Components/Admin/UsersTable.vue");
  return _sfc_setup$1 ? _sfc_setup$1(props, ctx) : void 0;
};
const UsersTable = /* @__PURE__ */ _export_sfc(_sfc_main$1, [["ssrRender", _sfc_ssrRender]]);
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "Index",
  __ssrInlineRender: true,
  setup(__props) {
    return (_ctx, _push, _parent, _attrs) => {
      _push(ssrRenderComponent(AdminLayout, _attrs, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(unref(Head), { title: "Dashboard" }, null, _parent2, _scopeId));
            _push2(`<div class="container mx-auto px-6 py-8"${_scopeId}><h3 class="text-gray-700 text-3xl font-medium"${_scopeId}> Painel Administrativo </h3>`);
            _push2(ssrRenderComponent(Cards, null, null, _parent2, _scopeId));
            _push2(`<div class="mt-8"${_scopeId}></div>`);
            _push2(ssrRenderComponent(UsersTable, null, null, _parent2, _scopeId));
            _push2(`</div>`);
          } else {
            return [
              createVNode(unref(Head), { title: "Dashboard" }),
              createVNode("div", { class: "container mx-auto px-6 py-8" }, [
                createVNode("h3", { class: "text-gray-700 text-3xl font-medium" }, " Painel Administrativo "),
                createVNode(Cards),
                createVNode("div", { class: "mt-8" }),
                createVNode(UsersTable)
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Pages/Admin/Index.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as default
};
