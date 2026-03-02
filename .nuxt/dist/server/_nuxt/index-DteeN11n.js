import { _ as __nuxt_component_0 } from "./nuxt-link-hvo_FUqM.js";
import { r as recipes, _ as __nuxt_component_3, a as __nuxt_component_4 } from "./recipes-Bll5D7OB.js";
import { defineComponent, mergeProps, unref, withCtx, createVNode, toDisplayString, createTextVNode, useSSRContext } from "vue";
import { ssrRenderAttrs, ssrRenderList, ssrRenderComponent, ssrRenderAttr, ssrInterpolate } from "vue/server-renderer";
import "/Users/jwolber/Documents/recipes_blog/node_modules/ufo/dist/index.mjs";
import "../server.mjs";
import "/Users/jwolber/Documents/recipes_blog/node_modules/ofetch/dist/node.mjs";
import "#internal/nuxt/paths";
import "/Users/jwolber/Documents/recipes_blog/node_modules/hookable/dist/index.mjs";
import "/Users/jwolber/Documents/recipes_blog/node_modules/unctx/dist/index.mjs";
import "/Users/jwolber/Documents/recipes_blog/node_modules/h3/dist/index.mjs";
import "vue-router";
import "/Users/jwolber/Documents/recipes_blog/node_modules/defu/dist/defu.mjs";
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "index",
  __ssrInlineRender: true,
  setup(__props) {
    return (_ctx, _push, _parent, _attrs) => {
      const _component_NuxtLink = __nuxt_component_0;
      const _component_IconClock = __nuxt_component_3;
      const _component_IconFlame = __nuxt_component_4;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "min-h-screen bg-[#0e0e0e]" }, _attrs))}><header class="relative overflow-hidden py-24 px-6 text-center"><div class="absolute inset-0 bg-gradient-to-b from-teal/10 via-transparent to-transparent"></div><div class="relative z-10 mx-auto max-w-3xl"><p class="mb-4 text-sm font-medium tracking-[0.3em] uppercase text-mint"> 100% Plant-Based </p><h1 class="text-5xl font-extrabold leading-tight tracking-tight text-cream sm:text-7xl"> Verdant Kitchen </h1><p class="mt-6 text-lg font-light leading-relaxed text-cream/60"> Cinematic vegan recipes crafted with love.<br> Dishes that look as stunning as they taste. </p><div class="mx-auto mt-8 h-px w-24 bg-gradient-to-r from-transparent via-gold to-transparent"></div></div></header><main class="mx-auto max-w-6xl px-6 pb-32"><div class="grid gap-10 sm:grid-cols-2 lg:grid-cols-3"><!--[-->`);
      ssrRenderList(unref(recipes), (recipe) => {
        _push(ssrRenderComponent(_component_NuxtLink, {
          key: recipe.slug,
          to: `/recipe/${recipe.slug}`,
          class: "group relative overflow-hidden rounded-2xl bg-[#161616] transition-all duration-500 hover:scale-[1.02] hover:shadow-[0_20px_60px_-10px_rgba(122,218,165,0.15)]"
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(`<div class="relative aspect-[4/3] overflow-hidden"${_scopeId}><img${ssrRenderAttr("src", recipe.image)}${ssrRenderAttr("alt", recipe.title)} class="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110" loading="lazy"${_scopeId}><div class="absolute inset-0 bg-gradient-to-t from-[#0e0e0e] via-[#0e0e0e]/40 to-transparent"${_scopeId}></div><div class="absolute inset-0 shadow-[inset_0_-80px_60px_-30px_rgba(0,0,0,0.8)]"${_scopeId}></div></div><div class="relative -mt-16 z-10 p-6 pt-0"${_scopeId}><span class="mb-2 inline-block rounded-full bg-gold/20 px-3 py-1 text-xs font-semibold tracking-wider uppercase text-gold"${_scopeId}>${ssrInterpolate(recipe.difficulty)}</span><h2 class="mt-2 text-2xl font-bold text-cream transition-colors duration-300 group-hover:text-mint"${_scopeId}>${ssrInterpolate(recipe.title)}</h2><p class="mt-2 text-sm font-light text-cream/50"${_scopeId}>${ssrInterpolate(recipe.tagline)}</p><div class="mt-4 flex items-center gap-4 text-xs text-cream/40"${_scopeId}><span class="flex items-center gap-1"${_scopeId}>`);
              _push2(ssrRenderComponent(_component_IconClock, { class: "h-3.5 w-3.5" }, null, _parent2, _scopeId));
              _push2(` ${ssrInterpolate(recipe.prepTime)} prep </span><span class="flex items-center gap-1"${_scopeId}>`);
              _push2(ssrRenderComponent(_component_IconFlame, { class: "h-3.5 w-3.5" }, null, _parent2, _scopeId));
              _push2(` ${ssrInterpolate(recipe.cookTime)} cook </span></div></div>`);
            } else {
              return [
                createVNode("div", { class: "relative aspect-[4/3] overflow-hidden" }, [
                  createVNode("img", {
                    src: recipe.image,
                    alt: recipe.title,
                    class: "h-full w-full object-cover transition-transform duration-700 group-hover:scale-110",
                    loading: "lazy"
                  }, null, 8, ["src", "alt"]),
                  createVNode("div", { class: "absolute inset-0 bg-gradient-to-t from-[#0e0e0e] via-[#0e0e0e]/40 to-transparent" }),
                  createVNode("div", { class: "absolute inset-0 shadow-[inset_0_-80px_60px_-30px_rgba(0,0,0,0.8)]" })
                ]),
                createVNode("div", { class: "relative -mt-16 z-10 p-6 pt-0" }, [
                  createVNode("span", { class: "mb-2 inline-block rounded-full bg-gold/20 px-3 py-1 text-xs font-semibold tracking-wider uppercase text-gold" }, toDisplayString(recipe.difficulty), 1),
                  createVNode("h2", { class: "mt-2 text-2xl font-bold text-cream transition-colors duration-300 group-hover:text-mint" }, toDisplayString(recipe.title), 1),
                  createVNode("p", { class: "mt-2 text-sm font-light text-cream/50" }, toDisplayString(recipe.tagline), 1),
                  createVNode("div", { class: "mt-4 flex items-center gap-4 text-xs text-cream/40" }, [
                    createVNode("span", { class: "flex items-center gap-1" }, [
                      createVNode(_component_IconClock, { class: "h-3.5 w-3.5" }),
                      createTextVNode(" " + toDisplayString(recipe.prepTime) + " prep ", 1)
                    ]),
                    createVNode("span", { class: "flex items-center gap-1" }, [
                      createVNode(_component_IconFlame, { class: "h-3.5 w-3.5" }),
                      createTextVNode(" " + toDisplayString(recipe.cookTime) + " cook ", 1)
                    ])
                  ])
                ])
              ];
            }
          }),
          _: 2
        }, _parent));
      });
      _push(`<!--]--></div></main><footer class="border-t border-white/5 py-12 text-center text-xs text-cream/30"> Verdant Kitchen — Plant-Powered Cooking </footer></div>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/index.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as default
};
//# sourceMappingURL=index-DteeN11n.js.map
