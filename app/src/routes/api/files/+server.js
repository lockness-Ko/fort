import { writeFile, readFile, mkdir, rename } from 'fs/promises';
import { readdirSync, statSync, lstatSync } from 'fs';
import { STORAGE_PATH } from "$env/static/private";
import url from 'url';
import jwt from 'jsonwebtoken';
import cookie from 'cookie';
import { applyPatch, parsePatch } from 'diff';
// import sharp from 'sharp';

export async function PATCH ({ request }) {
  let cookies = cookie.parse(request.headers.get('cookie'));
  let sid = cookies['sid'];
  let user = jwt.decode(sid)['user'];

  let filename = decodeURI(new url.URL(request.url).searchParams.get('filename'));
  let pwd = decodeURI(new url.URL(request.url).searchParams.get('pwd'));

  if (filename.includes('..') || pwd.includes('..')) {
    return new Response(400);
  }

  let contents = await readFile(`${STORAGE_PATH}/static/download/${user}${pwd}${filename}`);
  contents = contents.toString();
  let patch = await request.text();
  
  let patchName = parsePatch(patch)[0];
  if (patchName.newFileName.includes('..')) {
    return new Response(400);
  }

  if (patchName.newFileName != patchName.oldFileName) {
    rename(`${STORAGE_PATH}/static/download/${user}${pwd}${filename}`, `${STORAGE_PATH}/static/download/${user}${pwd}${patchName.newFileName}`)
    return new Response('ok!');
  }
  let result = applyPatch(contents, patch);

  await writeFile(`${STORAGE_PATH}/static/download/${user}${pwd}${filename}`, result);
  
  return new Response('ok!');
};

export async function POST ({ request }) {
  let cookies = cookie.parse(request.headers.get('cookie'));
  let sid = cookies['sid'];
  let user = jwt.decode(sid)['user'];

  let pwd = new url.URL(request.url).searchParams.get('pwd');
  
  if (pwd.includes('..')) {
    return new Response(400);
  }
  
  const data = await request.formData();
  const file = data.get('image');
  await writeFile(`${STORAGE_PATH}/static/download/${user}${pwd}${file.name}`, file.stream());

  // let name = file.name.toLowerCase();
  
  // let f = Buffer.from(await file.arrayBuffer());
  
  // if (name.endsWith('.png') || name.endsWith('.jpg')) {
  //   await sharp(f)
  //     .webp({ quality: 20 })
  //     .toFile(`${STORAGE_PATH}/static/thumb/${pwd}${file.name.split('.')[0]}.webp`);
  // }

  return new Response(`/files/${file.name}?pwd=${pwd}`);
};

export async function GET({ url, request }) {
  let cookies = cookie.parse(request.headers.get('cookie'));
  let sid = cookies['sid'];
  let user = jwt.decode(sid)['user'];
  
  let folder = url.searchParams.get('folder_name');
  let file = url.searchParams.get('name');
  
  if (folder != null) {
    if (folder.includes('..')) {
      return new Response(400);
    }
    mkdir(`${STORAGE_PATH}/static/download/${user}${folder}`, { recursive: true });
    mkdir(`${STORAGE_PATH}/static/thumb/${user}${folder}`, { recursive: true });
    return new Response("ok!");
  } else if (file != null) {
    if (file.includes('..')) {
      return new Response(400);
    }
    await writeFile(`${STORAGE_PATH}/static/download/${user}${file}`, "");
    return new Response("ok!");
  }
  
  let pwd = url.searchParams.get('pwd');
  if (pwd.includes('..')) {
    return new Response(400);
  }
  let files = readdirSync(`${STORAGE_PATH}/static/download/${user}${pwd}`);
  
  files = files.map((file) => {
    let stat = statSync(`${STORAGE_PATH}/static/download/${user}${pwd}/${file}`);
    let lstat = lstatSync(`${STORAGE_PATH}/static/download/${user}${pwd}/${file}`).isDirectory();
    let date = new Date(stat.ctimeMs);
    return { "name": file, "date": date, "type": lstat ? "dir" : "file" }
  });
  
  let glob = JSON.stringify(files);
  return new Response(String(glob));
}
