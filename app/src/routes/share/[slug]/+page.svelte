<script>
  import { page } from '$app/stores';
  
  let slug = $page.params.slug;
  
  let diff = "";
  
  let ext = slug.toLowerCase();
  
  let contents_promise;
  if (ext.endsWith(".txt") || ext.endsWith(".yml") || ext.endsWith(".c") || ext.endsWith(".cc") || ext.endsWith(".rs") || ext.endsWith(".py") || ext.endsWith(".js") || ext.endsWith(".html") || ext.endsWith(".css") || ext.endsWith(".sh") || ext.endsWith(".md")) {
    contents_promise = fetch(`/api/share?${slug}`).then((x) => x.text());
  }
</script>

<div class="header">
  <input type="text" value={slug}/> <span><a href="/api/share?{slug}" download>download</a></span>
</div>

<hr/>

{#if ext.endsWith(".jpg") || ext.endsWith(".png") || ext.endsWith(".webp") || ext.endsWith(".gif") || ext.endsWith(".apng") }
  <img src="/api/share?{slug}"/>
{:else if ext.endsWith(".svg") }
  <svg src="/api/share?{slug}"/>
{:else if ext.endsWith(".mp4") || ext.endsWith(".webm") || ext.endsWith(".mov") }
  <video src="/api/share?{slug}" controls/>
{:else if ext.endsWith(".mp3") || ext.endsWith(".wav") || ext.endsWith(".flac") }
  <audio src="/api/share?{slug}" controls/>
{:else if ext.endsWith(".txt") || ext.endsWith(".yml") || ext.endsWith(".c") || ext.endsWith(".cc") || ext.endsWith(".rs") || ext.endsWith(".py") || ext.endsWith(".js") || ext.endsWith(".html") || ext.endsWith(".css") || ext.endsWith(".sh") || ext.endsWith(".md")}
  <div class="txt-editor">
    {#await contents_promise then contents}<textarea id="txt-editor-area" placeholder="Loading..." value={contents}></textarea>{/await}
  </div>
{:else}
  <h3>Oh no! It looks like this file can't be previewed. <a href="/api/share?{slug}" download>Click <u>here</u> to download instead.</a></h3>
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
  
  span a {
    margin: 10px;
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
  
  input {
    background-color: #0000;
    color: white;
    border: none;
    font-size: 30px;
    outline: none;
  }
</style>