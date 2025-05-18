import { defineCollection, z } from 'astro:content'
import { glob } from 'astro/loaders'

const blog = defineCollection({
  // Load Markdown and MDX files in the `content` directory.
  loader: glob({ base: './content/imported', pattern: '**/*.{md,mdx}' }),
  // Type-check frontmatter using a schema
  schema: ({ image }) =>
    z.object({
      heroImage: image().optional(), // Use image() helper
    }),
})

export const collections = { blog }
