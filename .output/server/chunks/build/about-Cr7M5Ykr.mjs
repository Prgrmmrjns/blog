import { defineComponent, mergeProps, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderAttr } from 'vue/server-renderer';
import { p as publicAssetsURL } from '../nitro/nitro.mjs';
import { u as useHead } from './server.mjs';
import 'node:http';
import 'node:https';
import 'node:events';
import 'node:buffer';
import 'node:fs';
import 'node:path';
import 'node:crypto';
import 'node:url';
import 'vue-router';
import '@supabase/ssr';
import '../routes/renderer.mjs';
import 'vue-bundle-renderer/runtime';
import 'unhead/server';
import 'devalue';
import 'unhead/utils';

const _imports_0 = publicAssetsURL("/profile.jpg");
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "about",
  __ssrInlineRender: true,
  setup(__props) {
    useHead({
      title: "About — Jonas Wolber",
      meta: [{ name: "description", content: "Doctoral student in Computational Biomedicine at RWTH Aachen. Research in metabolic diseases, diabetes, machine learning, and AI." }]
    });
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "min-h-screen bg-[#f5f3eb] dark:bg-[#0e0e0e]" }, _attrs))}><header class="py-24 px-6 text-center"><img${ssrRenderAttr("src", _imports_0)} alt="Jonas Wolber" class="mx-auto h-40 w-40 rounded-full object-cover shadow-[0_0_40px_rgba(122,218,165,0.2)]"><h1 class="mt-8 text-4xl font-extrabold text-gray-900 dark:text-cream sm:text-5xl"> About </h1><p class="mt-4 text-lg text-gray-600 dark:text-cream/60"> Curiosity is all you need. </p></header><main class="mx-auto max-w-2xl px-6 pb-32"><div class="space-y-6 text-[15px] leading-relaxed text-gray-800 dark:text-cream/80"><p> I&#39;m a doctoral student at University Hospital RWTH Aachen, affiliated with the Institute for Digitalization and General Medicine and the Institute for Computational Biomedicine Aachen. </p><p> My research focuses on metabolic diseases, diabetes, remote monitoring, machine learning, time series, LLMs, and hybrid modeling. I studied Biomedical Sciences at Maastricht and Cardiovascular Science at Göttingen. </p><p class="text-gray-600 dark:text-cream/60"><strong>p(doom):</strong> 5%. The world would be better if everyone were a bit more tolerant—and more concerned about restoring our beautiful nature. </p><p><strong>Goals:</strong> Leave an impact on society where everyone benefits—maybe curing cancer, heart disease and dementia would be a good start. </p></div></main><footer class="border-t border-gray-200 py-12 text-center text-xs text-gray-500 dark:border-white/5 dark:text-cream/30"> Jonas Wolber · Curiosity is all you need. </footer></div>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/about.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
//# sourceMappingURL=about-Cr7M5Ykr.mjs.map
