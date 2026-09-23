# Belegcheck

Business product and website: **read invoice PDFs, check amounts, track line items (positions) and payments.**

Built for companies in Germany. Stack direction: Vercel, Supabase, language models for document understanding.

## What this repo is

- Marketing website (`src/app`) — Next.js
- Product home for the invoice workflow (extraction → checks → payment status)

## Local development

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Product focus (one workflow)

1. Upload an invoice PDF  
2. Extract vendor, dates, tax, totals, and each position  
3. Verify that line items match the total  
4. Track paid / partial / open per invoice and per position  

## Linear

Project: **Belegcheck** in the Jonas Wolber workspace.

## Note on GitHub

This code may temporarily live on a branch of another repository until the dedicated `belegcheck` GitHub repository exists. Prefer pushing to `Prgrmmrjns/belegcheck` once created.
