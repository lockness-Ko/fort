import { writeFile } from 'fs/promises';
import { readdirSync, statSync } from 'fs';

export async function POST ({ request }) {
    const data = await request.formData();
    const file = data.get('image');
    await writeFile(`static/download/${file.name}`, file.stream());

    return new Response(`/files/${file.name}`);
};

export async function GET({ url }) {
  let files = readdirSync("static/download");
  
  files = files.map((file) => {
    let date = new Date(statSync(`static/download/${file}`).ctimeMs);
    return { "name": file, "date": date }
  });
  
  let glob = JSON.stringify(files);
  return new Response(String(glob));
}
