import type { APIRoute } from 'astro';
import { corpus } from '../data/knowledge';
export const GET: APIRoute = () => new Response(JSON.stringify({ lang: 'en', chunks: corpus('en') }), { headers: { 'Content-Type': 'application/json' } });
