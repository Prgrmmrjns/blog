import { mergeProps, useSSRContext } from "vue";
import { ssrRenderAttrs } from "vue/server-renderer";
import { _ as _export_sfc } from "../server.mjs";
const _sfc_main$1 = {};
function _sfc_ssrRender$1(_ctx, _push, _parent, _attrs) {
  _push(`<svg${ssrRenderAttrs(mergeProps({
    fill: "none",
    viewBox: "0 0 24 24",
    stroke: "currentColor",
    "stroke-width": "2"
  }, _attrs))}><circle cx="12" cy="12" r="10"></circle><polyline points="12 6 12 12 16 14"></polyline></svg>`);
}
const _sfc_setup$1 = _sfc_main$1.setup;
_sfc_main$1.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/IconClock.vue");
  return _sfc_setup$1 ? _sfc_setup$1(props, ctx) : void 0;
};
const __nuxt_component_3 = /* @__PURE__ */ Object.assign(_export_sfc(_sfc_main$1, [["ssrRender", _sfc_ssrRender$1]]), { __name: "IconClock" });
const _sfc_main = {};
function _sfc_ssrRender(_ctx, _push, _parent, _attrs) {
  _push(`<svg${ssrRenderAttrs(mergeProps({
    fill: "none",
    viewBox: "0 0 24 24",
    stroke: "currentColor",
    "stroke-width": "2"
  }, _attrs))}><path d="M12 12c2-2.96 0-7-1-8 0 3.038-1.773 4.741-3 6-1.226 1.26-2 3.24-2 5a6 6 0 1 0 12 0c0-1.532-1.056-3.94-2-5-1.786 3-2.791 3-4 2z"></path></svg>`);
}
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/IconFlame.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const __nuxt_component_4 = /* @__PURE__ */ Object.assign(_export_sfc(_sfc_main, [["ssrRender", _sfc_ssrRender]]), { __name: "IconFlame" });
const recipes = [
  {
    slug: "thai-coconut-curry",
    title: "Thai Coconut Curry",
    tagline: "A fragrant, creamy bowl of pure comfort",
    image: "https://images.unsplash.com/photo-1455619452474-d2be8b1e70cd?w=1200&q=80",
    prepTime: "15 min",
    cookTime: "25 min",
    difficulty: "Easy",
    ingredients: [
      "400ml coconut milk",
      "2 tbsp Thai red curry paste",
      "1 block firm tofu, cubed",
      "1 red bell pepper, sliced",
      "150g green beans, trimmed",
      "1 small aubergine, diced",
      "2 tbsp soy sauce",
      "1 tbsp maple syrup",
      "Juice of 1 lime",
      "Fresh Thai basil leaves",
      "Jasmine rice, to serve"
    ],
    steps: [
      "Press tofu for 15 minutes, then cut into bite-sized cubes. Pat dry with a kitchen towel.",
      "Heat a splash of oil in a large wok or pan over medium-high heat. Fry the tofu cubes until golden on all sides, about 5–6 minutes. Remove and set aside.",
      "In the same pan, toast the curry paste for 1 minute until fragrant. Pour in the coconut milk and stir to combine.",
      "Add the bell pepper, green beans, and aubergine. Simmer for 12–15 minutes until the vegetables are tender.",
      "Stir in soy sauce, maple syrup, and lime juice. Return the tofu to the pan and warm through for 2 minutes.",
      "Serve over steamed jasmine rice, topped with fresh Thai basil leaves."
    ]
  },
  {
    slug: "banana-bread",
    title: "Banana Bread",
    tagline: "Impossibly moist, perfectly spiced, totally plant-based",
    image: "https://images.unsplash.com/photo-1605090930601-72d6bc398fa0?w=1200&q=80",
    prepTime: "10 min",
    cookTime: "55 min",
    difficulty: "Easy",
    ingredients: [
      "3 ripe bananas, mashed",
      "80ml coconut oil, melted",
      "150g light brown sugar",
      "1 tsp vanilla extract",
      "280g plain flour",
      "1 tsp baking soda",
      "½ tsp cinnamon",
      "¼ tsp nutmeg",
      "Pinch of salt",
      "60g walnuts, roughly chopped"
    ],
    steps: [
      "Preheat your oven to 175°C (350°F). Grease a loaf tin and line with parchment paper.",
      "In a large bowl, mash the bananas until mostly smooth. Stir in melted coconut oil, brown sugar, and vanilla extract.",
      "In a separate bowl, whisk together the flour, baking soda, cinnamon, nutmeg, and salt.",
      "Fold the dry ingredients into the wet mixture until just combined — do not overmix. Gently fold in the chopped walnuts.",
      "Pour the batter into the prepared tin and smooth the top. Optionally, slice half a banana and lay it on top.",
      "Bake for 50–55 minutes until a skewer inserted into the centre comes out clean. Let it cool in the tin for 10 minutes before transferring to a wire rack."
    ]
  },
  {
    slug: "loaded-black-bean-burrito",
    title: "Loaded Black Bean Burrito",
    tagline: "Packed, rolled, and ready to devour",
    image: "https://images.unsplash.com/photo-1626700051175-6818013e1d4f?w=1200&q=80",
    prepTime: "20 min",
    cookTime: "15 min",
    difficulty: "Medium",
    ingredients: [
      "4 large flour tortillas",
      "400g black beans, drained and rinsed",
      "200g cooked rice",
      "1 avocado, sliced",
      "1 large tomato, diced",
      "½ red onion, finely diced",
      "1 jalapeño, sliced",
      "Juice of 1 lime",
      "1 tsp smoked paprika",
      "1 tsp cumin",
      "Fresh coriander, chopped",
      "Hot sauce of your choice"
    ],
    steps: [
      "Heat the black beans in a small pan with smoked paprika, cumin, and a splash of water. Mash roughly with a fork, leaving some beans whole for texture. Season to taste.",
      "Warm the tortillas in a dry pan for about 30 seconds on each side until pliable.",
      "In a small bowl, combine diced tomato, red onion, jalapeño, lime juice, and coriander to make a quick pico de gallo.",
      "Lay each tortilla flat. Spread a generous layer of smashed black beans down the centre, followed by rice, avocado slices, and pico de gallo.",
      "Fold the sides inward, then roll tightly from the bottom. For a crispy finish, sear the burrito seam-side down in a hot pan for 1–2 minutes.",
      "Serve with hot sauce and extra lime wedges on the side."
    ]
  }
];
export {
  __nuxt_component_3 as _,
  __nuxt_component_4 as a,
  recipes as r
};
//# sourceMappingURL=recipes-Bll5D7OB.js.map
