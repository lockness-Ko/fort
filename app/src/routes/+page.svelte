<script>
  import File from '$lib/components/File.svelte'

  let files_promise = fetch('/api/files').then((x) => x.json());
  let weather_promise = fetch('/api/weather').then((x) => x.json());
</script>

<h1>🏰</h1>

<div class="weather">
  <div class="weather-current">
    {#await weather_promise then weather}
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
    {/await}
  </div>
</div>

<hr/>

<div class="files">
  <h3>Files</h3>
  <ul>
  {#await files_promise then files}
    {#each files as file}
    <li>
      <File filename={file["name"]} date={file["date"]}/>
    </li>
    {/each}
  {/await}
  </ul>
</div>

<style>
</style>
