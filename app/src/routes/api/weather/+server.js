import { LAT, LON } from "$env/static/private";

export async function GET({ url }) {
  let weather = await fetch(`https://api.open-meteo.com/v1/forecast?latitude=${LAT}&longitude=${LON}&current_weather=true`);
  weather = await weather.json();

  return new Response(JSON.stringify(weather));
}
