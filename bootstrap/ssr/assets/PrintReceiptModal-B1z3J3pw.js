import { defineComponent, mergeProps, useSSRContext } from "vue";
import { ssrRenderAttrs } from "vue/server-renderer";
import "print-js";
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "PrintReceiptModal",
  __ssrInlineRender: true,
  setup(__props) {
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<dialog${ssrRenderAttrs(mergeProps({
        id: "receipt",
        class: "modal h-full"
      }, _attrs))}><div class="modal-box bg-white w-full"><form method="dialog"><button class="btn btn-md btn-circle btn-ghost absolute right-2 top-2">✕</button></form><h3 class="text-2xl font-bold text-center">Venda Realizada com sucesso!</h3><p class="text-md text-center">Segue o recibo gerado para a venda.</p><div id="print" class="grid gap-2 border border-gray-400 p-6 rounded-md my-6 max-w-[600px]"><div class="flex items-center justify-between"><h3><span class="font-bold">Venda:</span><span class="text-end">123</span></h3><h3><span class="font-bold">Data:</span><span class="text-end">12/12/12</span></h3></div><h1 class="text-2xl font-bold text-center">RECIBO</h1><div class="p-4"><h2 class="text-xl font-semibold text-center"> Venda do fuleko </h2><p class="text-center text-sm">Rua do Fuleko, 123</p><p class="text-center text-sm">Fuleko - SP</p><p class="text-center text-sm">CEP: 12345-678</p><p class="text-center text-sm">CNPJ: 12.345.678/0001-12</p><p class="text-center text-sm">Telefone: (12) 3456-7890</p></div><ul><li class="flex justify-between items-center gap-2"><p class="text-wrap w-2/3">Bolo de Fubá</p><div class="flex items-center gap-2"><span class="font-bold">1x</span><span>R$ 50,00</span></div></li><hr class="my-2"><li class="flex justify-between items-center gap-2"><p class="text-wrap w-2/3">Bolo de Fubá</p><div class="flex items-center gap-2"><span class="font-bold">1x</span><span>R$ 50,00</span></div></li><hr class="my-2"><li class="flex justify-between items-center gap-2"><p class="text-wrap w-2/3">CARFA DE CHIBATAd asda dasdas das dasd </p><div class="flex items-center gap-2"><span class="font-bold">1x</span><span>R$ 5022,433</span></div></li><hr class="my-2"><li class="flex justify-between items-center gap-2"><p class="text-wrap w-2/3">Ajuste4 de tela</p><div class="flex items-center gap-2"><span class="font-bold">1x</span><span>R$ 50,00</span></div></li><hr class="my-2"></ul><p class="flex justify-between items-center"><span class="font-bold text-lg">Total:</span><span class="text-end text-lg font-semibold">R$ 200,00</span></p><p class="flex justify-between items-center"><span class="font-bold">Forma de Pagamento:</span><span class="text-end">Dinheiro</span></p><p class="mt-2"><span class="font-bold">Observações:</span><p>Garantia de 30 dias.</p></p></div><div class="grid gap-6"><button class="btn btn-primary">Imprimir</button><button class="btn btn-info">Baixar PDF</button><button class="btn btn-success">Enviar via WhatsApp</button><form method="dialog" class="grid"><button class="btn btn-ghost w-full text-lg">Fechar</button></form></div></div></dialog>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Pages/Sells/Components/PrintReceiptModal.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as default
};
