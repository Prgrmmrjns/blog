import type { Locale } from "~/locales/en";

export default defineNuxtPlugin(() => {
  const cookie = useCookie<Locale>("locale", { default: () => "en" });
  const stored = localStorage.getItem("locale");

  if (stored === "en" || stored === "de") {
    cookie.value = stored;
    localStorage.removeItem("locale");
  }

  const locale = useState<Locale>("locale");
  const next = cookie.value === "de" ? "de" : "en";
  if (locale.value !== next) {
    locale.value = next;
  }
});
