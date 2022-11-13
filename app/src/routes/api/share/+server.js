import { copyFile, readFile } from 'fs/promises';
import { STORAGE_PATH } from "$env/static/private";
import { jwt_sig_store } from '$lib/components/stores.js';
import url from 'url';
import jwt from 'jsonwebtoken';
import cookie from 'cookie';

let jwt_sig

jwt_sig_store.subscribe(value => {
  jwt_sig = value;
})

function makeid(length) {
  var result           = '';
  var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  var charactersLength = characters.length;
  for ( var i = 0; i < length; i++ ) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
}

export async function POST({ request }) {
  let cookies = cookie.parse(request.headers.get('cookie'));
  let sid = cookies['sid'];
  let user = jwt.decode(sid)['user'];
  
  if (!jwt.verify(sid, jwt_sig)) {
    return Response.redirect(`${event.url.origin}/login`, 302);
  }

  let filename = new url.URL(request.url).searchParams.get('filename');
  let ext = filename.split('.')[filename.split('.').length - 1]
  
  if (filename.includes('..')) {
    return new Response(400);
  }
  
  let path = makeid(5);
  
  await copyFile(`${STORAGE_PATH}/static/download/${user}/${filename}`, `${STORAGE_PATH}/static/share/${path}.${ext}`);

  return new Response(`/share/${path}.${ext}`);
};

export async function GET({ url }) {
  let path = url.searchParams.keys().next().value;
  
  return new Response(await readFile(`${STORAGE_PATH}/static/share/${path}`));
}