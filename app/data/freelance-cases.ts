export type FreelanceCase = {
  id:
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
  image: string;
  href?: string;
};

export const freelanceCases: FreelanceCase[] = [
  {
    id: "belegcheck",
    image: "/freelancing/belegcheck.png",
    href: "https://belegcheck.vercel.app",
  },
  { id: "obsidian", image: "/freelancing/obsidian-vault.png" },
  { id: "website", image: "/freelancing/website.png" },
  { id: "excel", image: "/freelancing/excel.png" },
  { id: "images", image: "/freelancing/images.png" },
  { id: "inbox", image: "/freelancing/inbox.png" },
  { id: "meetings", image: "/freelancing/meetings.png" },
  { id: "chatbot", image: "/freelancing/chatbot.png" },
  { id: "search", image: "/freelancing/search.png" },
  { id: "papers", image: "/freelancing/papers.png" },
];

export type FreelanceCaseId = FreelanceCase["id"];
