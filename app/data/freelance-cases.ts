export type FreelanceCaseId =
  | "belegcheck"
  | "obsidian"
  | "website"
  | "excel"
  | "images"
  | "inbox"
  | "meetings"
  | "chatbot"
  | "search"
  | "papers";

export type FreelanceLink = {
  href: string;
  kind: "github" | "live";
};

export type FreelanceCase = {
  id: FreelanceCaseId;
  image: string;
  links?: FreelanceLink[];
};

export const freelanceCases: FreelanceCase[] = [
  {
    id: "belegcheck",
    image: "/freelancing/belegcheck.png",
    links: [
      { href: "https://github.com/Prgrmmrjns/belegcheck", kind: "github" },
      { href: "https://belegcheck.vercel.app", kind: "live" },
    ],
  },
  {
    id: "obsidian",
    image: "/freelancing/obsidian-vault.png",
    links: [{ href: "https://github.com/Prgrmmrjns/vault-talk", kind: "github" }],
  },
  { id: "website", image: "/freelancing/website.png" },
  { id: "excel", image: "/freelancing/excel.png" },
  { id: "images", image: "/freelancing/images.png" },
  { id: "inbox", image: "/freelancing/inbox.png" },
  { id: "meetings", image: "/freelancing/meetings.png" },
  { id: "chatbot", image: "/freelancing/chatbot.png" },
  { id: "search", image: "/freelancing/search.png" },
  { id: "papers", image: "/freelancing/papers.png" },
];

export function freelanceCaseById(id: string) {
  return freelanceCases.find((item) => item.id === id);
}
