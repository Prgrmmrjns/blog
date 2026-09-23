export default function InvoicePreview() {
  const rows = [
    {
      pos: "01",
      text: "Beratung Q3 — Workshop",
      qty: "2",
      amount: "1.800,00",
      status: "ok" as const,
    },
    {
      pos: "02",
      text: "Lizenz Cloud Seat",
      qty: "12",
      amount: "948,00",
      status: "ok" as const,
    },
    {
      pos: "03",
      text: "Support Retainer",
      qty: "1",
      amount: "650,00",
      status: "warn" as const,
    },
    {
      pos: "04",
      text: "Anfahrt pauschal",
      qty: "1",
      amount: "85,00",
      status: "ok" as const,
    },
  ];

  return (
    <div className="relative w-full max-w-lg">
      <div
        aria-hidden
        className="absolute -inset-4 rounded-[2rem] bg-teal/10 blur-2xl"
      />
      <article className="relative overflow-hidden rounded-sm border border-rule bg-paper shadow-[0_30px_60px_-28px_rgba(12,22,18,0.45)]">
        <div className="flex items-start justify-between border-b border-rule px-6 py-5">
          <div>
            <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-muted">
              Rechnung 2026-0842
            </p>
            <p className="mt-1 font-[family-name:var(--font-display)] text-xl text-ink">
              Nordwerk GmbH
            </p>
          </div>
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-ok/15 text-ok">
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              aria-hidden
            >
              <path
                className="check-path"
                d="M5 13l4 4L19 7"
                stroke="currentColor"
                strokeWidth="2.4"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>
        </div>

        <div className="ledger-lines px-6 py-4">
          <div className="mb-2 grid grid-cols-[40px_1fr_48px_88px_72px] gap-2 font-mono text-[10px] uppercase tracking-wider text-muted">
            <span>Pos</span>
            <span>Leistung</span>
            <span className="text-right">Menge</span>
            <span className="text-right">Betrag</span>
            <span className="text-right">Status</span>
          </div>
          {rows.map((row) => (
            <div
              key={row.pos}
              className="invoice-row grid grid-cols-[40px_1fr_48px_88px_72px] items-center gap-2 border-t border-rule/60 py-2.5 text-sm"
            >
              <span className="font-mono text-muted">{row.pos}</span>
              <span className="truncate text-ink-soft">{row.text}</span>
              <span className="text-right font-mono text-muted">{row.qty}</span>
              <span className="text-right font-mono">{row.amount}</span>
              <span
                className={`text-right font-mono text-[11px] uppercase tracking-wide ${
                  row.status === "ok" ? "text-ok" : "text-copper"
                }`}
              >
                {row.status === "ok" ? "geprüft" : "offen"}
              </span>
            </div>
          ))}
        </div>

        <div className="flex items-end justify-between border-t border-rule bg-paper-deep/60 px-6 py-4">
          <div>
            <p className="font-mono text-[10px] uppercase tracking-[0.16em] text-muted">
              Summe brutto
            </p>
            <p className="font-[family-name:var(--font-display)] text-2xl tabular-nums text-ink">
              3.483,00 €
            </p>
          </div>
          <div className="text-right">
            <p className="font-mono text-[10px] uppercase tracking-[0.16em] text-muted">
              Zahlung
            </p>
            <p className="text-sm font-medium text-copper">
              Teilweise · 2.748,00 €
            </p>
          </div>
        </div>
      </article>
    </div>
  );
}
