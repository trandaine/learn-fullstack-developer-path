import OpenAI from 'openai';
import { createClient } from "@supabase/supabase-js";

// console.log("Env variables loaded:", Boolean(import.meta.env.OPENAI_API_KEY), Boolean(import.meta.env.SUPABASE_API_KEY), Boolean(import.meta.env.SUPABASE_URL));

/** OpenAI config */
if (!import.meta.env.VITE_OPENAI_API_KEY) throw new Error("OpenAI API key is missing or invalid.");
export const openai = new OpenAI({
  apiKey: import.meta.env.VITE_OPENAI_API_KEY,
  baseURL: import.meta.env.VITE_AI_URL,
  dangerouslyAllowBrowser: true
});

/** Supabase config */
const privateKey = import.meta.env.VITE_SUPABASE_API_KEY;
if (!privateKey) throw new Error(`Expected env var VITE_SUPABASE_API_KEY`);
const url = import.meta.env.VITE_SUPABASE_URL;
if (!url) throw new Error(`Expected env var VITE_SUPABASE_URL`);
export const supabase = createClient(url, privateKey);