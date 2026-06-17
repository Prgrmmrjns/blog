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
  const localeCookie = useCookie<Locale>("locale", {
    default: () => "en",
    maxAge: 60 * 60 * 24 * 365,
  });

  const locale = useState<Locale>("locale", () => (localeCookie.value === "de" ? "de" : "en"));

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
    localeCookie.value = next;
    if (import.meta.client) {
      document.documentElement.lang = next;
    }
  }

  watch(
    locale,
    (next) => {
      if (localeCookie.value !== next) {
        localeCookie.value = next;
      }
      if (import.meta.client) {
        document.documentElement.lang = next;
      }
    },
    { immediate: true },
  );

  return { locale, setLocale, t, tm, messages };
}
