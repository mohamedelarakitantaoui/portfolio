import type { APIRoute } from 'astro';
import { withBase } from '../lib/base';
export const GET: APIRoute = ({ site }) =>
  new Response(`User-agent: *\nAllow: ${withBase('/')}\nDisallow: ${withBase('/contact/sent')}\nDisallow: ${withBase('/fr/contact/sent')}\n\nSitemap: ${new URL(withBase('/sitemap-index.xml'), site).href}\n`, { headers: { 'Content-Type': 'text/plain' } });
