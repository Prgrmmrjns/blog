import { defineCollection, defineContentConfig } from "@nuxt/content";
import { z } from "zod";

const postSchema = z.object({
  title: z.string(),
  excerpt: z.string(),
  image: z.string().optional(),
  date: z.string(),
  tags: z.array(z.string()).default([]),
});

export default defineContentConfig({
  collections: {
    posts: defineCollection({
      type: "page",
      source: "blog/*.md",
      schema: postSchema,
    }),
  },
});
