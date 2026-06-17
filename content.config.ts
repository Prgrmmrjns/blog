import { defineCollection, defineContentConfig } from "@nuxt/content";
import { z } from "zod";

const postSchema = z.object({
  title: z.string(),
  excerpt: z.string(),
  date: z.string(),
  tags: z.array(z.string()).default([]),
  topics: z.array(z.string()).default([]),
  locale: z.enum(["en", "de"]),
  slug: z.string(),
});

export default defineContentConfig({
  collections: {
    posts: defineCollection({
      type: "page",
      source: "blog/**/*.md",
      schema: postSchema,
    }),
  },
});
