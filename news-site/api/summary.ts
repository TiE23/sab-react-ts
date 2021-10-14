import fetch from "node-fetch";
import { Post, Category } from "../shared/types";
import { config } from "./config";

export async function fetchPosts(): Promise<Post[]> {
  const res = await fetch(`${config.baseUrl}/posts`);
  return await res.json() as Post[];
}

export async function fetchCategories(): Promise<Category[]> {
  const res = await fetch(`${config.baseUrl}/categories`);
  return await res.json() as Category[];
}

/**
 * I cannot claim to know exactly why, but node-fetch v3 is more specific about
 * the value returned from its fetch function. In the sample code uses
 * node-fetch "^2.6.1". At the time of writing node-fetch is up to v3.0.0, which
 * was the version that was installed for me.
 *
 * If you run into the same problem I did with v3 try using type assertion with
 * the "as" keyword.
 *
 * `return await res.json() as Post[]`
 * `return await res.json() as Category[]`
 *
 * Asserting types like this without any method to handle
 * errors is what we'd call in the professional word "bad programming" but we're
 * learning right now. Just don't do this at your job or your reviewer will yell
 * at you.
 */