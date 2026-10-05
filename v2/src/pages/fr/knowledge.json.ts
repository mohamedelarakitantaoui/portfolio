import type { APIRoute } from 'astro';
import { corpus } from '../../data/knowledge';
export const GET: APIRoute = () => new Response(JSON.stringify({ lang: 'fr', chunks: corpus('fr') }), { headers: { 'Content-Type': 'application/json' } });
