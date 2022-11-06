import { readFileSync } from 'fs';
import { STORAGE_PATH } from "$env/static/private";

export async function GET({ url }) {
  let filename = url.search.replaceAll('?', '');
  return new Response(readFileSync(`${STORAGE_PATH}/static/download/${filename}`));
}
