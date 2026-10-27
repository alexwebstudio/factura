import type { MetadataRoute } from "next";
import { materials } from "@/content/materials";
import { projects } from "@/content/projects";
import { absoluteUrl } from "@/lib/seo";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  const staticPages = [
    { path: "/", priority: 1 },
    { path: "/materials", priority: 0.9 },
    { path: "/projects", priority: 0.9 },
    { path: "/production", priority: 0.7 },
    { path: "/about", priority: 0.7 },
    { path: "/contacts", priority: 0.8 },
    { path: "/privacy", priority: 0.2 },
  ];
  return [
    ...staticPages.map((p) => ({ url: absoluteUrl(p.path), lastModified: now, priority: p.priority })),
    ...materials.map((m) => ({
      url: absoluteUrl(`/materials/${m.slug}`),
      lastModified: now,
      priority: 0.8,
      images: [absoluteUrl(m.image)],
    })),
    ...projects.map((p) => ({
      url: absoluteUrl(`/projects/${p.slug}`),
      lastModified: now,
      priority: 0.7,
      images: [absoluteUrl(p.image)],
    })),
  ];
}
