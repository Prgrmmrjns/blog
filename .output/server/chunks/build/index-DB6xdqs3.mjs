import { _ as __nuxt_component_0$1 } from './server.mjs';
import { defineComponent, withAsyncContext, mergeProps, unref, withCtx, createVNode, openBlock, createBlock, Fragment, renderList, toDisplayString, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderList, ssrRenderComponent, ssrRenderAttr, ssrInterpolate } from 'vue/server-renderer';
import { u as useAsyncData, q as queryCollection } from './client-BWOkGfep.mjs';
import '../nitro/nitro.mjs';
import 'node:http';
import 'node:https';
import 'node:events';
import 'node:buffer';
import 'node:fs';
import 'node:path';
import 'node:crypto';
import 'node:url';
import 'better-sqlite3';
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
      const _component_NuxtLink = __nuxt_component_0$1;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "min-h-screen bg-[#f5f3eb] dark:bg-[#0e0e0e]" }, _attrs))}><header class="relative overflow-hidden py-24 px-6 text-center"><div class="absolute inset-0 bg-gradient-to-b from-teal/10 via-transparent to-transparent"></div><div class="relative z-10 mx-auto max-w-3xl"><p class="mb-4 text-sm font-medium tracking-[0.3em] uppercase text-teal dark:text-mint"> Science · AI · Programming · Medicine · Health &amp; Fitness </p><h1 class="text-5xl font-extrabold leading-tight tracking-tight text-gray-900 dark:text-cream sm:text-7xl"> Jonas Wolber </h1><p class="mt-6 text-lg font-light leading-relaxed text-gray-600 dark:text-cream/60"> Curiosity is all you need.<br> Doctoral student in Computational Biomedicine · RWTH Aachen </p><div class="mx-auto mt-8 h-px w-24 bg-gradient-to-r from-transparent via-gold to-transparent"></div></div></header><section class="mx-auto max-w-4xl px-6 py-16"><h2 class="mb-6 text-xl font-bold text-gold">About</h2><div class="space-y-3 text-[15px] leading-relaxed text-gray-800 dark:text-cream/80"><p> I&#39;m a doctoral student at University Hospital RWTH Aachen, affiliated with the Institute for Digitalization and General Medicine and the Institute for Computational Biomedicine Aachen. </p><p> My research focuses on metabolic diseases, diabetes, remote monitoring, machine learning, time series, LLMs, and hybrid modeling. I studied Biomedical Sciences at Maastricht and Cardiovascular Science at Göttingen. </p><p class="text-gray-600 dark:text-cream/60"><strong>p(doom):</strong> 5%. The world would be better if everyone were a bit more tolerant—and more concerned about restoring our beautiful nature. </p></div><div class="mt-8 flex flex-wrap gap-4"><a href="https://www.linkedin.com/in/jonas-wolber/" target="_blank" rel="noopener noreferrer" class="rounded-full border border-gray-300 px-4 py-2 text-sm font-medium text-gray-700 transition-colors hover:border-teal hover:text-teal dark:border-white/20 dark:text-cream/80 dark:hover:border-mint/50 dark:hover:text-mint"> LinkedIn </a><a href="https://github.com/Prgrmmrjns" target="_blank" rel="noopener noreferrer" class="rounded-full border border-gray-300 px-4 py-2 text-sm font-medium text-gray-700 transition-colors hover:border-teal hover:text-teal dark:border-white/20 dark:text-cream/80 dark:hover:border-mint/50 dark:hover:text-mint"> GitHub </a><a href="https://www.researchgate.net/profile/Jonas-Wolber-4" target="_blank" rel="noopener noreferrer" class="rounded-full border border-gray-300 px-4 py-2 text-sm font-medium text-gray-700 transition-colors hover:border-teal hover:text-teal dark:border-white/20 dark:text-cream/80 dark:hover:border-mint/50 dark:hover:text-mint"> ResearchGate </a></div></section><main class="mx-auto max-w-6xl px-6 pb-32"><h2 class="mb-10 text-xl font-bold text-gold">Latest posts</h2><div class="grid gap-10 sm:grid-cols-2 lg:grid-cols-3"><!--[-->`);
      ssrRenderList(unref(posts) ?? [], (post) => {
        _push(ssrRenderComponent(_component_NuxtLink, {
          key: post.path,
          to: post.path,
          class: "group relative overflow-hidden rounded-2xl bg-white shadow-lg transition-all duration-500 hover:scale-[1.02] hover:shadow-xl dark:bg-[#161616] dark:shadow-none dark:hover:shadow-[0_20px_60px_-10px_rgba(122,218,165,0.15)]"
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(`<div class="relative aspect-[4/3] overflow-hidden"${_scopeId}>`);
              if (post.image) {
                _push2(`<img${ssrRenderAttr("src", post.image)}${ssrRenderAttr("alt", post.title)} class="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110" loading="lazy"${_scopeId}>`);
              } else {
                _push2(`<div class="flex h-full w-full items-center justify-center bg-teal/10 text-4xl text-teal/40"${_scopeId}> # </div>`);
              }
              _push2(`<div class="absolute inset-0 bg-gradient-to-t from-[#f5f3eb] via-[#f5f3eb]/40 to-transparent dark:from-[#0e0e0e] dark:via-[#0e0e0e]/40"${_scopeId}></div><div class="absolute inset-0 shadow-[inset_0_-80px_60px_-30px_rgba(0,0,0,0.8)]"${_scopeId}></div></div><div class="relative -mt-16 z-10 p-6 pt-0"${_scopeId}><div class="mb-2 flex flex-wrap gap-2"${_scopeId}><!--[-->`);
              ssrRenderList((post.tags ?? []).slice(0, 2), (tag) => {
                _push2(`<span class="rounded-full bg-gold/20 px-2 py-0.5 text-xs font-semibold text-gold"${_scopeId}>${ssrInterpolate(tag)}</span>`);
              });
              _push2(`<!--]--></div><h3 class="mt-2 text-2xl font-bold text-gray-900 transition-colors duration-300 group-hover:text-teal dark:text-cream dark:group-hover:text-mint"${_scopeId}>${ssrInterpolate(post.title)}</h3><p class="mt-2 text-sm font-light text-gray-600 line-clamp-2 dark:text-cream/50"${_scopeId}>${ssrInterpolate(post.excerpt)}</p><p class="mt-4 text-xs text-gray-500 dark:text-cream/40"${_scopeId}>${ssrInterpolate(post.date)}</p></div>`);
            } else {
              return [
                createVNode("div", { class: "relative aspect-[4/3] overflow-hidden" }, [
                  post.image ? (openBlock(), createBlock("img", {
                    key: 0,
                    src: post.image,
                    alt: post.title,
                    class: "h-full w-full object-cover transition-transform duration-700 group-hover:scale-110",
                    loading: "lazy"
                  }, null, 8, ["src", "alt"])) : (openBlock(), createBlock("div", {
                    key: 1,
                    class: "flex h-full w-full items-center justify-center bg-teal/10 text-4xl text-teal/40"
                  }, " # ")),
                  createVNode("div", { class: "absolute inset-0 bg-gradient-to-t from-[#f5f3eb] via-[#f5f3eb]/40 to-transparent dark:from-[#0e0e0e] dark:via-[#0e0e0e]/40" }),
                  createVNode("div", { class: "absolute inset-0 shadow-[inset_0_-80px_60px_-30px_rgba(0,0,0,0.8)]" })
                ]),
                createVNode("div", { class: "relative -mt-16 z-10 p-6 pt-0" }, [
                  createVNode("div", { class: "mb-2 flex flex-wrap gap-2" }, [
                    (openBlock(true), createBlock(Fragment, null, renderList((post.tags ?? []).slice(0, 2), (tag) => {
                      return openBlock(), createBlock("span", {
                        key: tag,
                        class: "rounded-full bg-gold/20 px-2 py-0.5 text-xs font-semibold text-gold"
                      }, toDisplayString(tag), 1);
                    }), 128))
                  ]),
                  createVNode("h3", { class: "mt-2 text-2xl font-bold text-gray-900 transition-colors duration-300 group-hover:text-teal dark:text-cream dark:group-hover:text-mint" }, toDisplayString(post.title), 1),
                  createVNode("p", { class: "mt-2 text-sm font-light text-gray-600 line-clamp-2 dark:text-cream/50" }, toDisplayString(post.excerpt), 1),
                  createVNode("p", { class: "mt-4 text-xs text-gray-500 dark:text-cream/40" }, toDisplayString(post.date), 1)
                ])
              ];
            }
          }),
          _: 2
        }, _parent));
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
//# sourceMappingURL=index-DB6xdqs3.mjs.map
