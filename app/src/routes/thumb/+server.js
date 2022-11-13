import { readFileSync } from 'fs';
import jwt from 'jsonwebtoken';
import cookie from 'cookie';
import { STORAGE_PATH } from "$env/static/private";

export async function GET({ url, request }) {
  let cookies = cookie.parse(request.headers.get('cookie'));
  let sid = cookies['sid'];
  let user = jwt.decode(sid)['user'];

  let filename = decodeURI(url.search.replaceAll('?', ''));
  if (filename.includes('..')) {
    return new Response(400);
  }
  return new Response(readFileSync(`${STORAGE_PATH}/static/thumb/${user}${filename}`));
}
