<script>
  import File from '$lib/components/File.svelte'

  let files_promise = fetch('/api/files').then((x) => x.json());
  let weather_promise = fetch('/api/weather').then((x) => x.json());
  
  let emojis = ["🌞", "☁️", "🌧️", "⛈️"];
</script>

<h1>🏰</h1>

<div class="weather">
  {#await weather_promise then weather}
  <h3>Weather { weather["current_weather"]["temperature"] > 20 ? emojis[0] : emojis[1] }</h3>
    <p>Temperature: {weather["current_weather"]["temperature"]}</p>
  {/await}
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
