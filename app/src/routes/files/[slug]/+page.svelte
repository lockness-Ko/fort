<script>
  import { page } from '$app/stores';
  import { createPatch, applyPatch } from 'diff';
  
  let slug = $page.params.slug;
  let pwd = $page.url.searchParams.get('pwd') || '/';
  
  let diff = "";
  
  let ext = slug.toLowerCase();
  
  let thumb = `/thumb/?${pwd}${slug.split('.')[0]}.webp`;
  
  let contents_promise;
  if (ext.endsWith(".txt") || ext.endsWith(".yml") || ext.endsWith(".c") || ext.endsWith(".cc") || ext.endsWith(".rs") || ext.endsWith(".py") || ext.endsWith(".js") || ext.endsWith(".html") || ext.endsWith(".css") || ext.endsWith(".sh") || ext.endsWith(".md")) {
    contents_promise = fetch(`/download/?${pwd}${slug}`).then((x) => x.text());
  }
  
  function editDiff(e) {
    let patch = createPatch(slug, diff, e.target.value, "", "");
    fetch(`/api/files?${pwd}${slug}`, {
      method: 'PATCH',
      body: patch
    })
    diff = e.target.value;
  }
  
  function setDiff(e) {
    console.log("loaded");
    diff = document.querySelector("#txt-editor-area").value;
  }
</script>

<head>
  <meta name="twitter:image" content="{thumb}">
  <meta name="og:image" content="{thumb}">
</head>

<div class="header">
  <h1>{slug}</h1> <span><a href="/download/?{pwd}{slug}" download>download</a></span>
</div>

<hr/>

{#if ext.endsWith(".jpg") || ext.endsWith(".svg") || ext.endsWith(".png") || ext.endsWith(".webp") || ext.endsWith(".gif") || ext.endsWith(".apng") }
  <img src="/download/?{pwd}{slug}"/>
{:else if ext.endsWith(".mp4") || ext.endsWith(".webm") || ext.endsWith(".mov") }
  <video src="/download/?{pwd}{slug}" controls/>
{:else if ext.endsWith(".mp3") || ext.endsWith(".wav") || ext.endsWith(".flac") }
  <audio src="/download/?{pwd}{slug}" controls/>
{:else if ext.endsWith(".txt") || ext.endsWith(".yml") || ext.endsWith(".c") || ext.endsWith(".cc") || ext.endsWith(".rs") || ext.endsWith(".py") || ext.endsWith(".js") || ext.endsWith(".html") || ext.endsWith(".css") || ext.endsWith(".sh") || ext.endsWith(".md")}
  <div class="txt-editor">
    {#await contents_promise then contents}<textarea id="txt-editor-area" use:setDiff on:mouseover={editDiff} on:change={editDiff} placeholder="Loading..." value={contents}></textarea>{/await}
  </div>
{:else}
  <h3>Oh no! It looks like this file can't be previewed. <a href="/download/?{pwd}{slug}" download>Click <u>here</u> to download instead.</a></h3>
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
  
  .txt-editor {
    display: flex;
  }
  
  textarea {
    width: 100%;
    height: 500px;
    border: none;
    margin: auto;
    border-radius: 4px;
    padding: 12px 15px;
    outline: none;
    resize: none;
    color: #eee;
    font-size: 15px;
    background-color: #333;
  }
</style>