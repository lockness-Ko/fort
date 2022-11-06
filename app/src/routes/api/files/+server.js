import { writeFile } from 'fs/promises';
import { readdirSync, statSync } from 'fs';
import { STORAGE_PATH } from "$env/static/private";
import sharp from 'sharp';

export async function POST ({ request }) {
  const data = await request.formData();
  const file = data.get('image');
  await writeFile(`${STORAGE_PATH}/static/download/${file.name}`, file.stream());

  let name = file.name.toLowerCase();
  
  let f = Buffer.from(await file.arrayBuffer());
  
  if (name.endsWith('.png') || name.endsWith('.jpg')) {
    await sharp(f)
      .webp({ quality: 20 })
      .toFile(`${STORAGE_PATH}/static/thumb/${file.name.split('.')[0]}.webp`);
  }

  return new Response(`/files/${file.name}`);
};

export async function GET({ url }) {
  let files = readdirSync(`${STORAGE_PATH}/static/download`);
  
  files = files.map((file) => {
    let date = new Date(statSync(`${STORAGE_PATH}/static/download/${file}`).ctimeMs);
    return { "name": file, "date": date }
  });
  
  let glob = JSON.stringify(files);
  return new Response(String(glob));
}
