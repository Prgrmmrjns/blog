import type { Locale } from "~/locales/en";
import de from "~/locales/de";
import en from "~/locales/en";

const catalogs = { en, de } as const;

type Catalog = typeof en;
type Path = string;

function resolvePath(obj: Record<string, unknown>, path: string): string | undefined {
  const value = path.split(".").reduce<unknown>((current, key) => {
    if (current && typeof current === "object" && key in current) {
      return (current as Record<string, unknown>)[key];
    }
    return undefined;
  }, obj);

  return typeof value === "string" ? value : undefined;
}

export function useLocale() {
  const locale = useState<Locale>("locale", () => "en");

  const messages = computed<Catalog>(() => catalogs[locale.value]);

  function t(path: Path): string {
    return resolvePath(messages.value as unknown as Record<string, unknown>, path) ?? path;
  }

  function tm<T>(path: Path): T {
    const value = path.split(".").reduce<unknown>((current, key) => {
      if (current && typeof current === "object" && key in current) {
        return (current as Record<string, unknown>)[key];
      }
      return undefined;
    }, messages.value as unknown as Record<string, unknown>);
    return value as T;
  }

  function setLocale(next: Locale) {
    locale.value = next;
    if (import.meta.client) {
      localStorage.setItem("locale", next);
      document.documentElement.lang = next;
    }
  }

  onMounted(() => {
    const stored = localStorage.getItem("locale") as Locale | null;
    if (stored === "en" || stored === "de") {
      locale.value = stored;
    }
    document.documentElement.lang = locale.value;
  });

  return { locale, setLocale, t, tm, messages };
}
