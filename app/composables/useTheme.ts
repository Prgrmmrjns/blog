export function useTheme() {
  const isDark = useState<boolean>("theme-dark", () => true);

  function setTheme(dark: boolean) {
    isDark.value = dark;
    applyTheme(dark);
    if (import.meta.client) {
      localStorage.setItem("theme", dark ? "dark" : "light");
    }
  }

  function toggle() {
    setTheme(!isDark.value);
  }

  function applyTheme(dark: boolean) {
    if (import.meta.client) {
      if (dark) {
        document.documentElement.classList.add("dark");
      } else {
        document.documentElement.classList.remove("dark");
      }
    }
  }

  onMounted(() => {
    const stored = localStorage.getItem("theme") as "dark" | "light" | null;
    const prefersDark =
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-color-scheme: dark)").matches;

    if (stored === "light" || stored === "dark") {
      isDark.value = stored === "dark";
    } else {
      isDark.value = prefersDark;
    }
    applyTheme(isDark.value);
  });

  return { isDark, toggle, setTheme };
}
