import { LAT, LON } from "$env/static/private";

export async function GET({ url }) {
  let weather = await fetch(`https://api.open-meteo.com/v1/forecast?latitude=${LAT}&longitude=${LON}&timezone=GMT&current_weather=true&hourly=temperature_2m,relativehumidity_2m,cloudcover,precipitation&daily=weathercode,temperature_2m_max,temperature_2m_min`);
  weather = await weather.json();

  // the json api uses a weird key for time
  // let currTime = new Date().toISOString().replace("Z", "").split(".")[0].replace(/(.){3}$/,"").replace(/(.){2}$/,"00");
  let currTime = weather.current_weather.time;
  let idx = weather.hourly.time.indexOf(currTime);
  
  let emojis = {
    "cls": "🌞",
    "cld": "☁️",
    "ovc": "☁️",
    "fog": "🌫️",
    "pcp": "🌧",
    "snw": "🌨⛄",
    "thd": "⛈️"
  }
  
  // cls = clear sky
  // cld = cloud
  // ovc = overcast
  // fog = fog
  // pcp = precipitation
  // snw = snow
  // thd = thunderstorm
  // https://open-meteo.com/en/docs
  let codes = {
    0: "cls",
    1: "cls",
    2: "cld",
    3: "ovc",
    45: "fog",
    48: "fog",
    51: "pcp",
    53: "pcp",
    55: "pcp",
    56: "pcp",
    57: "pcp",
    61: "pcp",
    63: "pcp",
    65: "pcp",
    66: "pcp",
    67: "pcp",
    71: "snw",
    73: "snw",
    75: "snw",
    77: "snw",
    80: "pcp",
    81: "pcp",
    82: "pcp",
    85: "snw",
    86: "snw",
    95: "thd",
    96: "thd",
    99: "thd"
  };
  let weather_code = weather.current_weather.weathercode;
  let code = codes[weather_code];
  let emoji = emojis[code];
  
  let forecast = [];
  for (let i = 0; i < 5; i ++) {
    forecast.push([emojis[codes[weather.daily.weathercode[i+1]]], weather.daily.temperature_2m_max[i+1], weather.daily.temperature_2m_min[i+1]]);
  }
  
  let temp = weather.current_weather.temperature;
  let wind_speed = weather.current_weather.windspeed;
  let wind_direction = weather.current_weather.winddirection;
  
  let humidity = weather.hourly.relativehumidity_2m[idx];
  let cloudcover = weather.hourly.cloudcover[idx];
  let precipitation = weather.hourly.precipitation[idx];
  
  let temp_unit = weather.hourly_units.temperature_2m;
  let humidity_unit = weather.hourly_units.relativehumidity_2m;
  let cloudcover_unit = weather.hourly_units.cloudcover;
  let precipitation_unit = weather.hourly_units.precipitation;
  
  let out_data = {
    "emoji": emoji,
    "temperature": temp,
    "temperature_unit": temp_unit,
    "wind_speed": wind_speed,
    "wind_direction": wind_direction,
    "humidity": humidity,
    "humidity_unit": humidity_unit,
    "cloud_cover": cloudcover,
    "cloud_cover_unit": cloudcover_unit,
    "precipitation": precipitation,
    "precipitation_unit": precipitation_unit,
    "forecast": forecast
  }
  
  return new Response(JSON.stringify(out_data));
}
