import { STORAGE_PATH } from '$env/static/private'
import { unlink } from 'fs/promises';
import { redirect } from '@sveltejs/kit';
import url from 'url';

export async function GET ({ request }) {
  let cookies = cookie.parse(request.headers.get('cookie'));
  let sid = cookies['sid'];
  let user = jwt.decode(sid)['user'];
  
  let filename = decodeURI(new url.URL(request.url).search.split('?')[1]);
  if (filename.includes('..')) {
    return new Response(400);
  }

  await unlink(`${STORAGE_PATH}/static/download/${user}${filename}`);
  
  throw redirect(307, "/")
}
