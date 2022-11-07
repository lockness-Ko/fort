<script>
  let weather_promise = fetch('/api/weather').then((x) => x.json());
  
  let days = {
    0: "mon",
    1: "tue",
    2: "wed",
    3: "thu",
    4: "fri",
    5: "sat",
    6: "sun",
  };
  function toDayName(day) {
    return days[day]
  }
</script>

{#await weather_promise then weather}
<div class="weather-current">
  <div class="weather-left">
    <h1>{ weather["emoji"] }</h1>
    <p>🌡️ { weather["temperature"] }{ weather["temperature_unit"] }</p>
    <p>🌧 { weather["precipitation"] }{ weather["precipitation_unit"] }</p>
  </div>
  <div class="weather-right">
    <p>🌬️ { weather["wind_speed"] }@{ weather["wind_direction"] }°</p>
    <p>🥵 { weather["humidity"] }{ weather["humidity_unit"] }</p>
    <p>😶‍🌫️{ weather["cloud_cover"] }{ weather["cloud_cover_unit"] }</p>
  </div>
</div>
<hr/>
<div class="weather-forecast">
  {#each weather["forecast"] as forecast, i}
  <div class="weather-forecast-item">
    <h1>{forecast[0]}</h1>
    <p>{toDayName(new Date().getDay() + i+1)}</p>
    <p>🥵 {forecast[1]}{ weather["temperature_unit"] }</p>
    <p>🥶 {forecast[2]}{ weather["temperature_unit"] }</p>
  </div>
  {/each}
</div>
{/await}
