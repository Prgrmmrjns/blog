export type Locale = "en" | "de";

export const locales: { code: Locale; label: string; flag: string }[] = [
  { code: "en", label: "English", flag: "🇬🇧" },
  { code: "de", label: "Deutsch", flag: "🇩🇪" },
];

export default {
  meta: {
    siteTitle: "Jonas Wolber — Science, AI, Programming, Medicine, Health & Fitness",
    siteDescription:
      "Curiosity is all you need. Personal blog on science, AI, programming, medicine, health and fitness. Doctoral student in Computational Biomedicine at RWTH Aachen.",
    footer: "Jonas Wolber · Curiosity is all you need.",
    homeAria: "Jonas Wolber home",
    toggleDark: "Toggle dark mode",
    lightMode: "Light mode",
    darkMode: "Dark mode",
    selectTheme: "Select theme",
    selectLanguage: "Select language",
  },
  nav: {
    blog: "Blog",
    about: "About",
    contact: "Contact",
  },
  home: {
    tagline: "Science · AI · Programming · Medicine · Health & Fitness",
    motto: "Curiosity is all you need.",
    subtitle: "Doctoral student in Computational Biomedicine · RWTH Aachen",
    latestPosts: "Latest posts",
  },
  blog: {
    title: "Blog",
    subtitle: "Science · AI · Programming · Medicine · Health & Fitness",
    metaDescription: "Latest posts on science, AI, programming, medicine, health and fitness.",
    back: "Back",
    postNotFound: "Post not found",
    filterAll: "All",
    filterByTopic: "Filter by topic",
    noPostsForTopic: "No posts match this topic yet.",
  },
  about: {
    title: "About — Jonas Wolber",
    metaDescription:
      "Doctoral student in Computational Biomedicine at RWTH Aachen. Research in metabolic diseases, diabetes, machine learning, and digital medicine.",
    label: "About",
    role: "PhD · Computational Biomedicine · RWTH Aachen",
    intro:
      "I research metabolic disease — especially type 1 diabetes — and how continuous monitoring, wearables, and AI can turn messy real-world data into tools clinicians and patients can use. My work mixes time series, gradient boosting, multimodal LLMs, and hybrid models that respect physiology.",
    focusAreas: [
      "Type 1 diabetes",
      "Remote monitoring",
      "Machine learning",
      "Time series",
      "LLMs",
      "Hybrid modeling",
    ],
    now: "Now",
    nowRole: "Doctoral researcher",
    nowPlace: "RWTH · Digital GP & Comp. Biomedicine",
    msc: "M.Sc.",
    mscField: "Cardiovascular Science",
    mscPlace: "University of Göttingen",
    bsc: "B.Sc.",
    bscField: "Biomedical Sciences",
    bscPlace: "Maastricht University",
    drivesMe: "What drives me",
    drivesMeText: "Impact where everyone benefits — cancer, heart disease, dementia would be a good start.",
    beyond: "Beyond research",
    beyondP1:
      "Away from the lab I stay active with football, running, and chess. I live a vegan lifestyle and my Christian faith shapes how I see the world and treat others. I love traveling and am always learning languages.",
    beyondP2:
      "Charity matters deeply to me — doing good for other people, including people I will never meet. I try to show up with generosity in everyday life, not only through research. I also have some very cool startup ideas in the back of my mind; maybe one day I will actually found one.",
    hobbies: ["Football", "Running", "Chess", "Vegan", "Christian", "Charity", "Travel", "Languages"],
  },
  contact: {
    title: "Contact — Jonas Wolber",
    metaDescription:
      "Reach Jonas Wolber for research collaboration, questions about digital medicine and machine learning, or just to say hello.",
    label: "Contact",
    heading: "Let's talk",
    subtitle: "Research collaboration, paper questions, speaking — pick a channel below.",
    links: [
      {
        label: "LinkedIn",
        desc: "Professional messages & collaboration",
        tag: "Professional",
      },
      {
        label: "GitHub",
        desc: "Code, repos & projects",
        tag: "Code",
      },
      {
        label: "ResearchGate",
        desc: "Papers & publications",
        tag: "Publications",
      },
      {
        label: "Uniklinikum RWTH",
        desc: "Official institute profile",
        tag: "Institute",
      },
    ],
  },
  comments: {
    title: "Comments",
    nameLabel: "Name (optional)",
    namePlaceholder: "Your name",
    commentLabel: "Comment *",
    commentPlaceholder: "Write a comment...",
    post: "Post comment",
    posting: "Posting...",
    loading: "Loading comments...",
    empty: "No comments yet. Be the first to comment!",
    anonymous: "Anonymous",
    loadError: "Failed to load comments",
    submitError: "Failed to post comment",
  },
  heroes: {
    coffeeHint: "hover the cup ☕",
    coffeeActive: "research happens",
    boostHint: "hover to boost",
    boostActive: "ensemble grows stronger",
    healthHint: "hover the meal photo",
    healthActive: "glucose forecast updates",
    booksHint: "hover the stack",
    booksActive: "imagination unlocked",
  },
} as const;
