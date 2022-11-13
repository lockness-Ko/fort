import { Handle } from "@sveltejs/kit";
import jwt from 'jsonwebtoken';
import cookie from 'cookie';
import { jwt_sig_store } from '$lib/components/stores.js';
import { ADMIN_LOGIN } from "$env/static/private";

let jwt_sig

jwt_sig_store.subscribe(value => {
  jwt_sig = value;
})

export const handle = async ({ event, resolve }) => {
  const url = new URL(event.request.url);
  let whitelistedUrl = !url.pathname.startsWith('/share') && !url.pathname.startsWith('/login') && !url.pathname.startsWith('/api/login');

  const auth = event.request.headers.get("Cookie");
  
  if (whitelistedUrl) {
    let token
    try {
      let cookies = cookie.parse(auth);
      token = cookies['sid'];
      if (!jwt.verify(token, jwt_sig)) {
        return Response.redirect(`${event.url.origin}/login`, 302);
      } else {
        return resolve(event);
      }
    } catch {
      return Response.redirect(`${event.url.origin}/login`, 302);
    }
  } else {
    return resolve(event);
  }
};
