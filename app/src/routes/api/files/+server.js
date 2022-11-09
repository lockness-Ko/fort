import { writeFile, readFile, mkdir } from 'fs/promises';
import { readdirSync, statSync, lstatSync } from 'fs';
import { STORAGE_PATH } from "$env/static/private";
import url from 'url';
import { applyPatch } from 'diff';
// import sharp from 'sharp';

export async function DELETE ({ request }) {
  return new Response('ok!');
}

export async function PATCH ({ request }) {
  let filename = decodeURI(new url.URL(request.url).search.split('?')[1]);
  if (filename.includes('..')) {
    return new Response(400);
  }
  let contents = await readFile(`${STORAGE_PATH}/static/download${filename}`);
  contents = contents.toString();
  let patch = await request.text();
  
  let result = applyPatch(contents, patch);

  await writeFile(`${STORAGE_PATH}/static/download/${filename}`, result);
  // console.log(String(contents));
  
  return new Response('ok!');
};

export async function POST ({ request }) {
  let pwd = new url.URL(request.url).searchParams.get('pwd');
  
  if (pwd.includes('..')) {
    return new Response(400);
  }
  
  const data = await request.formData();
  const file = data.get('image');
  await writeFile(`${STORAGE_PATH}/static/download/${pwd}${file.name}`, file.stream());

  // let name = file.name.toLowerCase();
  
  // let f = Buffer.from(await file.arrayBuffer());
  
  // if (name.endsWith('.png') || name.endsWith('.jpg')) {
  //   await sharp(f)
  //     .webp({ quality: 20 })
  //     .toFile(`${STORAGE_PATH}/static/thumb/${pwd}${file.name.split('.')[0]}.webp`);
  // }

  return new Response(`/files/${file.name}?pwd=${pwd}`);
};

export async function GET({ url }) {
  let folder = url.searchParams.get('folder_name');
  let file = url.searchParams.get('name');
  
  if (folder != null) {
    if (folder.includes('..')) {
      return new Response(400);
    }
    mkdir(`${STORAGE_PATH}/static/download/${folder}`, { recursive: true });
    mkdir(`${STORAGE_PATH}/static/thumb/${folder}`, { recursive: true });
    return new Response("ok!");
  } else if (file != null) {
    if (file.includes('..')) {
      return new Response(400);
    }
    await writeFile(`${STORAGE_PATH}/static/download/${file}`, "");
    return new Response("ok!");
  }
  
  let pwd = url.searchParams.get('pwd');
  if (pwd.includes('..')) {
    return new Response(400);
  }
  let files = readdirSync(`${STORAGE_PATH}/static/download${pwd}`);
  
  files = files.map((file) => {
    let stat = statSync(`${STORAGE_PATH}/static/download/${pwd}/${file}`);
    let lstat = lstatSync(`${STORAGE_PATH}/static/download/${pwd}/${file}`).isDirectory();
    let date = new Date(stat.ctimeMs);
    return { "name": file, "date": date, "type": lstat ? "dir" : "file" }
  });
  
  let glob = JSON.stringify(files);
  return new Response(String(glob));
}
