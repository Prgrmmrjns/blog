import { _ as __nuxt_component_0$1 } from './server.mjs';
import { defineComponent, mergeProps, withCtx, createVNode, openBlock, createBlock, Fragment, renderList, toDisplayString, useSSRContext } from 'vue';
import { ssrRenderComponent, ssrRenderAttr, ssrRenderList, ssrInterpolate } from 'vue/server-renderer';

const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "BlogCard",
  __ssrInlineRender: true,
  props: {
    title: {},
    excerpt: {},
    date: {},
    tags: {},
    image: {},
    to: {}
  },
  setup(__props) {
    return (_ctx, _push, _parent, _attrs) => {
      const _component_NuxtLink = __nuxt_component_0$1;
      _push(ssrRenderComponent(_component_NuxtLink, mergeProps({
        to: __props.to,
        class: "group flex flex-col overflow-hidden rounded-2xl bg-white shadow-lg transition-all duration-500 hover:scale-[1.01] hover:shadow-xl dark:bg-[#161616] dark:shadow-none dark:hover:shadow-[0_20px_60px_-10px_rgba(122,218,165,0.15)]"
      }, _attrs), {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div class="relative aspect-[16/9] shrink-0 overflow-hidden"${_scopeId}>`);
            if (__props.image) {
              _push2(`<img${ssrRenderAttr("src", __props.image)}${ssrRenderAttr("alt", __props.title)} class="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105" loading="lazy"${_scopeId}>`);
            } else {
              _push2(`<div class="flex h-full w-full items-center justify-center bg-teal/10 text-4xl text-teal/40"${_scopeId}> # </div>`);
            }
            _push2(`</div><div class="flex flex-1 flex-col p-6"${_scopeId}><div class="mb-2 flex flex-wrap gap-2"${_scopeId}><!--[-->`);
            ssrRenderList((__props.tags ?? []).slice(0, 2), (tag) => {
              _push2(`<span class="rounded-full bg-gold/20 px-2 py-0.5 text-xs font-semibold text-gold"${_scopeId}>${ssrInterpolate(tag)}</span>`);
            });
            _push2(`<!--]--></div><h3 class="text-xl font-bold text-gray-900 transition-colors duration-300 group-hover:text-teal dark:text-cream dark:group-hover:text-mint sm:text-2xl"${_scopeId}>${ssrInterpolate(__props.title)}</h3><p class="mt-2 flex-1 text-sm font-light leading-relaxed text-gray-600 line-clamp-2 dark:text-cream/50"${_scopeId}>${ssrInterpolate(__props.excerpt)}</p><p class="mt-4 text-xs text-gray-500 dark:text-cream/40"${_scopeId}>${ssrInterpolate(__props.date)}</p></div>`);
          } else {
            return [
              createVNode("div", { class: "relative aspect-[16/9] shrink-0 overflow-hidden" }, [
                __props.image ? (openBlock(), createBlock("img", {
                  key: 0,
                  src: __props.image,
                  alt: __props.title,
                  class: "h-full w-full object-cover transition-transform duration-700 group-hover:scale-105",
                  loading: "lazy"
                }, null, 8, ["src", "alt"])) : (openBlock(), createBlock("div", {
                  key: 1,
                  class: "flex h-full w-full items-center justify-center bg-teal/10 text-4xl text-teal/40"
                }, " # "))
              ]),
              createVNode("div", { class: "flex flex-1 flex-col p-6" }, [
                createVNode("div", { class: "mb-2 flex flex-wrap gap-2" }, [
                  (openBlock(true), createBlock(Fragment, null, renderList((__props.tags ?? []).slice(0, 2), (tag) => {
                    return openBlock(), createBlock("span", {
                      key: tag,
                      class: "rounded-full bg-gold/20 px-2 py-0.5 text-xs font-semibold text-gold"
                    }, toDisplayString(tag), 1);
                  }), 128))
                ]),
                createVNode("h3", { class: "text-xl font-bold text-gray-900 transition-colors duration-300 group-hover:text-teal dark:text-cream dark:group-hover:text-mint sm:text-2xl" }, toDisplayString(__props.title), 1),
                createVNode("p", { class: "mt-2 flex-1 text-sm font-light leading-relaxed text-gray-600 line-clamp-2 dark:text-cream/50" }, toDisplayString(__props.excerpt), 1),
                createVNode("p", { class: "mt-4 text-xs text-gray-500 dark:text-cream/40" }, toDisplayString(__props.date), 1)
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/BlogCard.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const __nuxt_component_0 = Object.assign(_sfc_main, { __name: "BlogCard" });

export { __nuxt_component_0 as _ };
//# sourceMappingURL=BlogCard-CAMSNZmx.mjs.map
