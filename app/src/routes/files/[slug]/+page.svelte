<script>
  import { page } from '$app/stores';
  let slug = $page.params.slug;
  
  let ext = slug.toLowerCase();
  
  let thumb = `/thumb/?${slug.split('.')[0]}.webp`;
  
  let script = `<script>window.onload = () => { fetch('/download/?${slug}').then(x => x.text()).then(y => document.querySelector('#txt_container').textContent = y);}<\/script>`;
</script>

<head>
  <meta name="twitter:image" content="{thumb}">
  <meta name="og:image" content="{thumb}">
</head>

<div class="header">
  <h1>{slug}</h1> <span><a href="/download/?{slug}" download>download</a></span>
</div>

{#if ext.endsWith(".jpg") || ext.endsWith(".png") || ext.endsWith(".webp") || ext.endsWith(".gif") || ext.endsWith(".apng") }
  <img src="/download/?{slug}"/>
{:else if ext.endsWith(".mp4") || ext.endsWith(".webm") || ext.endsWith(".mov") }
  <video src="/download/?{slug}" controls/>
{:else if ext.endsWith(".mp3") || ext.endsWith(".wav") || ext.endsWith(".flac") }
  <audio src="/download/?{slug}" controls/>
{:else if ext.endsWith(".txt") || ext.endsWith(".c") || ext.endsWith(".cc") || ext.endsWith(".rs") || ext.endsWith(".py") || ext.endsWith(".js") || ext.endsWith(".html") || ext.endsWith(".css") || ext.endsWith(".sh") || ext.endsWith(".md")}
  <pre id="txt_container"></pre>
  {@html script}
{:else}
  <h3>Oh no! It looks like this file can't be previewed. <a href="/download/?{slug}" download>Click <u>here</u> to download instead.</a></h3>
{/if}

<style>
  img, video, audio {
    width: 100%;
    margin: auto;
  }
  
  span {
    margin: auto;
    margin-right: 10px;
  }
  
  .header {
    display: flex;
  }
</style>