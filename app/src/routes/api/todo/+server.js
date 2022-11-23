import { writeFile, readFile } from 'fs/promises';
import { STORAGE_PATH } from "$env/static/private";
import jwt from 'jsonwebtoken';
import cookie from 'cookie';

export async function POST ({ request }) {
  let cookies = cookie.parse(request.headers.get('cookie'));
  let sid = cookies['sid'];
  let user = jwt.decode(sid)['user'];
  
  let stream = await request.text();
  
  await writeFile(`${STORAGE_PATH}/static/${user}.json`, stream);
  
  return new Response('ok!');
}

export async function GET ({ request }) {
  let cookies = cookie.parse(request.headers.get('cookie'));
  let sid = cookies['sid'];
  let user = jwt.decode(sid)['user'];

  let todos_json = await readFile(`${STORAGE_PATH}/static/${user}.json`);
  todos_json = todos_json.toString();
  
  return new Response(todos_json);
}
