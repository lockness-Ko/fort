import bcrypt from 'bcrypt';
import Redis from 'ioredis';
import jwt from 'jsonwebtoken';
import { jwt_sig_store } from '$lib/components/stores.js';
import { redirect, error } from '@sveltejs/kit';

const saltRounds = 10;
let jwt_sig;

jwt_sig_store.subscribe(value => {
	jwt_sig = value;
});

export async function POST ({ request }) {
  const client = new Redis({
    host: 'redis',
    port: 6379
  });
  
  const data = await request.formData();
  let user = data.get('user');
  let pass = data.get('pass');
    
  //let hash = await bcrypt.hash(pass, saltRounds);
  let hash;
  try {
    hash = await client.get(user);
    let result = await bcrypt.compare(pass, hash);
    if (!result) {
      throw new Error();
    }
  } catch {
    throw error(401);
  }
  
  let token = jwt.sign({ user: user }, jwt_sig);
  
  let heads = new Headers();
  heads.append('Set-Cookie', `sid=${token}; Max-Age=1200; Path=/; SameSite=Strict`)
  heads.append('Content-Type', 'text/html')
  return new Response('<script>window.location="/"</script>', { headers: heads });
};
