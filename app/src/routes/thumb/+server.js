import { readFileSync } from 'fs';
import { STORAGE_PATH } from "$env/static/private";

export async function GET({ url }) {
  let filename = decodeURI(url.search.replaceAll('?', ''));
  if (filename.includes('..')) {
    return new Response(400);
  }
  return new Response(readFileSync(`${STORAGE_PATH}/static/thumb/${filename}`));
}
