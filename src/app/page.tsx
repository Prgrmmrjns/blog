import InvoicePreview from "@/components/InvoicePreview";

const contactMail = "hallo@belegcheck.de";

export default function Home() {
  return (
    <div className="paper-grain min-h-screen text-ink">
      <header className="mx-auto flex w-full max-w-6xl items-center justify-between px-6 py-6 md:px-10">
        <a href="#top" className="group flex items-baseline gap-2">
          <span className="font-[family-name:var(--font-display)] text-2xl tracking-tight text-ink md:text-[1.75rem]">
            Belegcheck
          </span>
          <span className="hidden font-mono text-[10px] uppercase tracking-[0.2em] text-muted sm:inline">
            Rechnungen
          </span>
        </a>
        <nav className="flex items-center gap-5 text-sm text-ink-soft sm:gap-6">
          <a
            href="#ablauf"
            className="hidden hover:text-teal transition-colors sm:inline"
          >
            Ablauf
          </a>
          <a
            href="#nutzen"
            className="hidden hover:text-teal transition-colors md:inline"
          >
            Nutzen
          </a>
          <a
            href="#kontakt"
            className="rounded-full bg-ink px-4 py-2 text-paper transition hover:bg-ink-soft"
          >
            Gespräch anfragen
          </a>
        </nav>
      </header>

      <main id="top">
        {/* Hero: brand + one headline + one sentence + CTA + dominant visual */}
        <section className="relative mx-auto grid w-full max-w-6xl items-center gap-12 px-6 pb-20 pt-8 md:grid-cols-[1.05fr_0.95fr] md:gap-10 md:px-10 md:pb-28 md:pt-14">
          <div>
            <p className="animate-rise font-mono text-[11px] uppercase tracking-[0.22em] text-teal">
              PDF-Verständnis für Rechnungen
            </p>
            <h1 className="animate-rise-delay-1 mt-4 font-[family-name:var(--font-display)] text-[2.75rem] leading-[1.05] tracking-[-0.02em] text-ink sm:text-5xl md:text-[3.5rem]">
              Belegcheck
            </h1>
            <p className="animate-rise-delay-2 mt-5 max-w-md text-lg leading-relaxed text-ink-soft md:text-xl">
              Liest Rechnungs-PDFs, prüft Beträge und Positionen und behält,
              was schon bezahlt ist — und was noch offen ist.
            </p>
            <div className="animate-rise-delay-3 mt-8 flex flex-wrap items-center gap-4">
              <a
                href="#kontakt"
                className="rounded-full bg-teal px-6 py-3 text-sm font-medium text-paper shadow-[0_12px_30px_-12px_rgba(15,107,92,0.7)] transition hover:bg-teal-bright"
              >
                Referenzkunden-Pilot starten
              </a>
              <a
                href="#ablauf"
                className="text-sm font-medium text-ink-soft underline decoration-rule underline-offset-4 transition hover:text-teal"
              >
                So funktioniert es
              </a>
            </div>
          </div>

          <div className="animate-rise-delay-2 justify-self-center md:justify-self-end">
            <InvoicePreview />
          </div>
        </section>

        {/* One job: how the workflow works */}
        <section
          id="ablauf"
          className="border-y border-rule bg-paper-deep/50"
        >
          <div className="mx-auto max-w-6xl px-6 py-20 md:px-10 md:py-24">
            <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-muted">
              Ein Workflow
            </p>
            <h2 className="mt-3 max-w-2xl font-[family-name:var(--font-display)] text-3xl tracking-tight text-ink md:text-4xl">
              Von der PDF zur geprüften Positionsliste
            </h2>
            <p className="mt-4 max-w-xl text-ink-soft">
              Kein allgemeines „KI-Tool“. Ein klarer Ablauf für Rechnungen —
              gebaut, damit Buchhaltung und Einkauf schneller entscheiden können.
            </p>

            <ol className="mt-14 grid gap-10 md:grid-cols-3 md:gap-8">
              {[
                {
                  step: "01",
                  title: "PDF lesen",
                  body: "Rechnung hochladen. Belegcheck erkennt Lieferant, Daten, Steuern, Summen und jede Position.",
                },
                {
                  step: "02",
                  title: "Beträge prüfen",
                  body: "Zeilen und Gesamtsumme werden gegengerechnet. Abweichungen und merkwürdige Felder werden markiert.",
                },
                {
                  step: "03",
                  title: "Zahlung verfolgen",
                  body: "Pro Rechnung und pro Position: bezahlt, teilweise bezahlt oder offen — immer nachvollziehbar.",
                },
              ].map((item) => (
                <li key={item.step} className="relative">
                  <span className="font-mono text-sm text-teal">{item.step}</span>
                  <h3 className="mt-3 font-[family-name:var(--font-display)] text-2xl text-ink">
                    {item.title}
                  </h3>
                  <p className="mt-3 text-[15px] leading-relaxed text-ink-soft">
                    {item.body}
                  </p>
                </li>
              ))}
            </ol>
          </div>
        </section>

        {/* One job: what you keep track of */}
        <section id="nutzen" className="mx-auto max-w-6xl px-6 py-20 md:px-10 md:py-24">
          <div className="grid gap-12 md:grid-cols-[0.9fr_1.1fr] md:items-end">
            <div>
              <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-muted">
                Was Sie behalten
              </p>
              <h2 className="mt-3 font-[family-name:var(--font-display)] text-3xl tracking-tight md:text-4xl">
                Positionen und Zahlungen — nicht nur eine Datei im Postfach
              </h2>
            </div>
            <p className="max-w-lg text-ink-soft md:justify-self-end">
              Viele Teams speichern PDFs ab und tippen Beträge danach von Hand
              ab. Belegcheck macht aus dem Dokument eine strukturierte Liste,
              die Sie prüfen und über den Zahlungsverlauf hinweg führen können.
            </p>
          </div>

          <div className="mt-14 grid gap-px overflow-hidden rounded-sm border border-rule bg-rule md:grid-cols-2">
            {[
              {
                title: "Positionen",
                body: "Jede Zeile mit Menge, Einzelpreis und Summe — bereit für Abgleich mit Bestellung oder Wareneingang.",
              },
              {
                title: "Zahlungsstatus",
                body: "Offen, teilweise, bezahlt. Sie sehen sofort, welche Rechnung und welche Position noch hängt.",
              },
              {
                title: "Prüfhinweise",
                body: "Wenn Summe und Positionen nicht zusammenpassen, markiert Belegcheck die Stelle — bevor Geld fließt.",
              },
              {
                title: "Deutschland-tauglich",
                body: "Hosting und Datenfluss so geplant, dass Sie Datenschutz und Auftragsverarbeitung ernst nehmen können.",
              },
            ].map((block) => (
              <div key={block.title} className="bg-paper p-8 md:p-10">
                <h3 className="font-[family-name:var(--font-display)] text-xl text-ink">
                  {block.title}
                </h3>
                <p className="mt-3 text-[15px] leading-relaxed text-ink-soft">
                  {block.body}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* Contact / reference clients */}
        <section
          id="kontakt"
          className="border-t border-rule bg-ink text-paper"
        >
          <div className="mx-auto grid max-w-6xl gap-10 px-6 py-20 md:grid-cols-[1.2fr_0.8fr] md:px-10 md:py-24">
            <div>
              <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-teal-bright">
                Erste Referenzkunden
              </p>
              <h2 className="mt-3 font-[family-name:var(--font-display)] text-3xl tracking-tight md:text-4xl">
                Wir holen gerade die ersten Unternehmen an Bord
              </h2>
              <p className="mt-5 max-w-xl text-base leading-relaxed text-paper/75">
                Solo gebaut, klar skalierbar. Wenn Sie Rechnungen in größeren
                Mengen prüfen und Zahlungen nachverfolgen: schreiben Sie uns.
                Wir richten einen Pilot mit messbarem Vorher/Nachher ein.
              </p>
            </div>
            <div className="flex flex-col justify-end gap-4">
              <a
                href={`mailto:${contactMail}?subject=Belegcheck%20Pilot`}
                className="inline-flex items-center justify-center rounded-full bg-paper px-6 py-3 text-center text-sm font-medium text-ink transition hover:bg-paper-deep"
              >
                {contactMail}
              </a>
              <p className="font-mono text-[11px] leading-relaxed text-paper/50">
                Betreff „Pilot“ reicht. Wir melden uns mit Ablauf, Umfang und
                Preisrahmen für den Referenzkunden-Sprint.
              </p>
            </div>
          </div>
        </section>
      </main>

      <footer className="border-t border-rule/40 bg-ink-soft px-6 py-8 text-paper/50 md:px-10">
        <div className="mx-auto flex max-w-6xl flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <p className="font-[family-name:var(--font-display)] text-lg text-paper/80">
            Belegcheck
          </p>
          <p className="font-mono text-[11px] uppercase tracking-[0.16em]">
            Rechnungs-PDFs · Positionen · Zahlungen · Deutschland
          </p>
        </div>
      </footer>
    </div>
  );
}
