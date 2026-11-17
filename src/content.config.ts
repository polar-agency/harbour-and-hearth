import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

// Images are optional: with no `src`, a placeholder is drawn. `alt` is always required.
const image = z.object({
  src: z.string().startsWith('/images/').optional(),
  alt: z.string().min(1),
});

const link = z.object({ label: z.string(), href: z.string() });

const openingHours = z.array(z.object({ days: z.string(), hours: z.string() })).min(1);

const page = (file: string) => glob({ pattern: file, base: './src/content/pages' });

const site = defineCollection({
  loader: glob({ pattern: 'site.json', base: './src/content/site' }),
  schema: z.object({
    name: z.string(),
    description: z.string(),
    nav: z.array(link).min(1),
    address: z.array(z.string()).min(1),
    phone: z.string(),
    email: z.string().email(),
    openingHours,
    footerNote: z.string(),
  }),
});

const home = defineCollection({
  loader: page('home.json'),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    hero: z.object({
      heading: z.string(),
      text: z.string(),
      image,
      primaryCta: link,
      secondaryCta: link.optional(),
    }),
    highlights: z.array(z.object({ title: z.string(), text: z.string() })).length(3),
    hoursHeading: z.string(),
    findUs: z.object({ heading: z.string(), text: z.string(), mapAlt: z.string() }),
  }),
});

const menuPage = defineCollection({
  loader: page('menu.json'),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    heading: z.string(),
    intro: z.string(),
    // Brand rule: the allergens note must stay on the Menu page.
    allergensNote: z.string().min(20),
  }),
});

const menu = defineCollection({
  loader: glob({ pattern: '*.json', base: './src/content/menu' }),
  schema: z.object({
    title: z.string(),
    order: z.number().int(),
    note: z.string().optional(),
    items: z
      .array(
        z.object({
          name: z.string(),
          description: z.string(),
          // GBP, e.g. 3.2 renders as "£3.20"
          price: z.number().positive(),
          tags: z.array(z.enum(['v', 'vg', 'gf'])).optional(),
        }),
      )
      .min(1),
  }),
});

const about = defineCollection({
  loader: page('about.json'),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    heading: z.string(),
    intro: z.string(),
    image,
    story: z.array(z.string()).min(1),
    teamHeading: z.string(),
    team: z.array(z.object({ name: z.string(), role: z.string(), bio: z.string(), image })),
    suppliersHeading: z.string(),
    suppliersIntro: z.string(),
    suppliers: z.array(z.object({ name: z.string(), what: z.string(), where: z.string() })),
  }),
});

const contact = defineCollection({
  loader: page('contact.json'),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    heading: z.string(),
    intro: z.string(),
    hoursHeading: z.string(),
    form: z.object({
      heading: z.string(),
      nameLabel: z.string(),
      emailLabel: z.string(),
      messageLabel: z.string(),
      submitLabel: z.string(),
      successMessage: z.string(),
    }),
  }),
});

export const collections = { site, home, menuPage, menu, about, contact };
