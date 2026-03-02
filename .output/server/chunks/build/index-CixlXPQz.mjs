import { _ as __nuxt_component_0 } from './BlogCard-CAMSNZmx.mjs';
import { defineComponent, withAsyncContext, mergeProps, unref, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderList, ssrRenderComponent } from 'vue/server-renderer';
import { u as useAsyncData, q as queryCollection } from './client-Nrfvk3Xj.mjs';
import './server.mjs';
import '../nitro/nitro.mjs';
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
import 'perfect-debounce';

const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "index",
  __ssrInlineRender: true,
  async setup(__props) {
    let __temp, __restore;
    const { data: posts } = ([__temp, __restore] = withAsyncContext(() => useAsyncData(
      "posts-list",
      () => queryCollection("posts").order("date", "DESC").all()
    )), __temp = await __temp, __restore(), __temp);
    return (_ctx, _push, _parent, _attrs) => {
      const _component_BlogCard = __nuxt_component_0;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "min-h-screen bg-[#f5f3eb] dark:bg-[#0e0e0e]" }, _attrs))}><header class="relative overflow-hidden py-24 px-6 text-center"><div class="absolute inset-0 bg-gradient-to-b from-teal/10 via-transparent to-transparent"></div><div class="relative z-10 mx-auto max-w-3xl"><p class="mb-4 text-sm font-medium tracking-[0.3em] uppercase text-teal dark:text-mint"> Science · AI · Programming · Medicine · Health &amp; Fitness </p><h1 class="text-5xl font-extrabold leading-tight tracking-tight text-gray-900 dark:text-cream sm:text-7xl"> Jonas Wolber </h1><p class="mt-6 text-lg font-light leading-relaxed text-gray-600 dark:text-cream/60"> Curiosity is all you need.<br> Doctoral student in Computational Biomedicine · RWTH Aachen </p><div class="mx-auto mt-8 h-px w-24 bg-gradient-to-r from-transparent via-gold to-transparent"></div></div></header><main class="mx-auto max-w-7xl px-6 pb-32"><h2 class="mb-10 text-xl font-bold text-gold">Latest posts</h2><div class="grid gap-10 sm:grid-cols-2"><!--[-->`);
      ssrRenderList(unref(posts) ?? [], (post) => {
        _push(ssrRenderComponent(_component_BlogCard, {
          key: post.path,
          to: post.path,
          title: post.title,
          excerpt: post.excerpt,
          date: post.date,
          tags: post.tags,
          image: post.image
        }, null, _parent));
      });
      _push(`<!--]--></div></main><footer class="border-t border-gray-200 py-12 text-center text-xs text-gray-500 dark:border-white/5 dark:text-cream/30"> Jonas Wolber · Curiosity is all you need. </footer></div>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/index.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
//# sourceMappingURL=index-CixlXPQz.mjs.map
