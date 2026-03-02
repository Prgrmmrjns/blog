import { _ as __nuxt_component_0 } from "./nuxt-link-hvo_FUqM.js";
import { mergeProps, useSSRContext, defineComponent, computed, unref, withCtx, createVNode, createTextVNode } from "vue";
import { ssrRenderAttrs, ssrRenderSlot, ssrInterpolate, ssrRenderAttr, ssrRenderComponent, ssrRenderClass, ssrRenderList } from "vue/server-renderer";
import { _ as _export_sfc, u as useRoute, c as createError } from "../server.mjs";
import { r as recipes, _ as __nuxt_component_3, a as __nuxt_component_4 } from "./recipes-Bll5D7OB.js";
import { u as useHead } from "./composables-7bH8h6bK.js";
import "/Users/jwolber/Documents/recipes_blog/node_modules/ufo/dist/index.mjs";
import "/Users/jwolber/Documents/recipes_blog/node_modules/ofetch/dist/node.mjs";
import "#internal/nuxt/paths";
import "/Users/jwolber/Documents/recipes_blog/node_modules/hookable/dist/index.mjs";
import "/Users/jwolber/Documents/recipes_blog/node_modules/unctx/dist/index.mjs";
import "/Users/jwolber/Documents/recipes_blog/node_modules/h3/dist/index.mjs";
import "vue-router";
import "/Users/jwolber/Documents/recipes_blog/node_modules/defu/dist/defu.mjs";
import "/Users/jwolber/Documents/recipes_blog/node_modules/@unhead/vue/dist/index.mjs";
const _sfc_main$2 = {};
function _sfc_ssrRender(_ctx, _push, _parent, _attrs) {
  _push(`<svg${ssrRenderAttrs(mergeProps({
    fill: "none",
    viewBox: "0 0 24 24",
    stroke: "currentColor",
    "stroke-width": "2"
  }, _attrs))}><path d="M19 12H5M12 19l-7-7 7-7"></path></svg>`);
}
const _sfc_setup$2 = _sfc_main$2.setup;
_sfc_main$2.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/IconArrowLeft.vue");
  return _sfc_setup$2 ? _sfc_setup$2(props, ctx) : void 0;
};
const __nuxt_component_1 = /* @__PURE__ */ Object.assign(_export_sfc(_sfc_main$2, [["ssrRender", _sfc_ssrRender]]), { __name: "IconArrowLeft" });
const _sfc_main$1 = /* @__PURE__ */ defineComponent({
  __name: "MetaPill",
  __ssrInlineRender: true,
  props: {
    label: {},
    value: {}
  },
  setup(__props) {
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "flex items-center gap-2 text-sm text-cream/60" }, _attrs))}><span class="text-teal">`);
      ssrRenderSlot(_ctx.$slots, "default", {}, null, _push, _parent);
      _push(`</span><span class="font-light">${ssrInterpolate(__props.label)}:</span><span class="font-semibold text-cream">${ssrInterpolate(__props.value)}</span></div>`);
    };
  }
});
const _sfc_setup$1 = _sfc_main$1.setup;
_sfc_main$1.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/MetaPill.vue");
  return _sfc_setup$1 ? _sfc_setup$1(props, ctx) : void 0;
};
const __nuxt_component_2 = Object.assign(_sfc_main$1, { __name: "MetaPill" });
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "[slug]",
  __ssrInlineRender: true,
  setup(__props) {
    const route = useRoute();
    const recipe = computed(() => recipes.find((r) => r.slug === route.params.slug));
    if (!recipe.value) {
      throw createError({ statusCode: 404, statusMessage: "Recipe not found" });
    }
    useHead({
      title: `${recipe.value.title} — Verdant Kitchen`,
      meta: [{ name: "description", content: recipe.value.tagline }]
    });
    const difficultyColor = computed(() => {
      switch (recipe.value?.difficulty) {
        case "Easy":
          return "text-mint bg-mint/15";
        case "Medium":
          return "text-gold bg-gold/15";
        case "Hard":
          return "text-red-400 bg-red-400/15";
        default:
          return "";
      }
    });
    return (_ctx, _push, _parent, _attrs) => {
      const _component_NuxtLink = __nuxt_component_0;
      const _component_IconArrowLeft = __nuxt_component_1;
      const _component_MetaPill = __nuxt_component_2;
      const _component_IconClock = __nuxt_component_3;
      const _component_IconFlame = __nuxt_component_4;
      if (unref(recipe)) {
        _push(`<div${ssrRenderAttrs(mergeProps({ class: "min-h-screen bg-[#0e0e0e]" }, _attrs))}><div class="relative h-[60vh] min-h-[420px] w-full overflow-hidden"><img${ssrRenderAttr("src", unref(recipe).image)}${ssrRenderAttr("alt", unref(recipe).title)} class="h-full w-full object-cover"><div class="absolute inset-0 bg-gradient-to-t from-[#0e0e0e] via-[#0e0e0e]/60 to-transparent"></div><div class="absolute inset-0 shadow-[inset_0_-120px_100px_-40px_rgba(0,0,0,0.9)]"></div><div class="absolute bottom-0 left-0 right-0 p-8 sm:p-12"><div class="mx-auto max-w-4xl">`);
        _push(ssrRenderComponent(_component_NuxtLink, {
          to: "/",
          class: "mb-6 inline-flex items-center gap-2 text-sm font-medium text-cream/50 transition-colors hover:text-mint"
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(ssrRenderComponent(_component_IconArrowLeft, { class: "h-4 w-4" }, null, _parent2, _scopeId));
              _push2(` Back to recipes `);
            } else {
              return [
                createVNode(_component_IconArrowLeft, { class: "h-4 w-4" }),
                createTextVNode(" Back to recipes ")
              ];
            }
          }),
          _: 1
        }, _parent));
        _push(`<h1 class="text-4xl font-extrabold leading-tight text-cream sm:text-6xl">${ssrInterpolate(unref(recipe).title)}</h1><p class="mt-3 text-lg font-light text-cream/60">${ssrInterpolate(unref(recipe).tagline)}</p></div></div></div><div class="border-b border-white/5"><div class="mx-auto flex max-w-4xl flex-wrap items-center gap-6 px-8 py-6 sm:px-12">`);
        _push(ssrRenderComponent(_component_MetaPill, {
          label: "Prep",
          value: unref(recipe).prepTime
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(ssrRenderComponent(_component_IconClock, { class: "h-4 w-4" }, null, _parent2, _scopeId));
            } else {
              return [
                createVNode(_component_IconClock, { class: "h-4 w-4" })
              ];
            }
          }),
          _: 1
        }, _parent));
        _push(ssrRenderComponent(_component_MetaPill, {
          label: "Cook",
          value: unref(recipe).cookTime
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(ssrRenderComponent(_component_IconFlame, { class: "h-4 w-4" }, null, _parent2, _scopeId));
            } else {
              return [
                createVNode(_component_IconFlame, { class: "h-4 w-4" })
              ];
            }
          }),
          _: 1
        }, _parent));
        _push(`<span class="${ssrRenderClass([unref(difficultyColor), "rounded-full px-3 py-1 text-xs font-bold tracking-wider uppercase"])}">${ssrInterpolate(unref(recipe).difficulty)}</span></div></div><div class="mx-auto max-w-4xl px-8 py-16 sm:px-12"><div class="grid gap-16 lg:grid-cols-[1fr_1.8fr]"><div><h2 class="mb-6 text-2xl font-bold text-gold">Ingredients</h2><ul class="space-y-3"><!--[-->`);
        ssrRenderList(unref(recipe).ingredients, (item, i) => {
          _push(`<li class="flex items-start gap-3 text-[15px] leading-relaxed text-cream/80"><span class="mt-1.5 h-2 w-2 shrink-0 rounded-full bg-mint/60"></span> ${ssrInterpolate(item)}</li>`);
        });
        _push(`<!--]--></ul></div><div><h2 class="mb-6 text-2xl font-bold text-gold">Preparation</h2><ol class="space-y-8"><!--[-->`);
        ssrRenderList(unref(recipe).steps, (step, i) => {
          _push(`<li class="flex gap-5"><span class="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-teal/20 text-sm font-bold text-teal">${ssrInterpolate(i + 1)}</span><p class="pt-1 text-[15px] leading-relaxed text-cream/80">${ssrInterpolate(step)}</p></li>`);
        });
        _push(`<!--]--></ol></div></div></div><footer class="border-t border-white/5 py-12 text-center text-xs text-cream/30"> Verdant Kitchen — Plant-Powered Cooking </footer></div>`);
      } else {
        _push(`<!---->`);
      }
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/recipe/[slug].vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as default
};
//# sourceMappingURL=_slug_-DsWAW_Vd.js.map
