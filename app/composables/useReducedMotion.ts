export function useReducedMotion() {
  const reducedMotion = ref(false);

  onMounted(() => {
    reducedMotion.value = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  });

  return { reducedMotion };
}
