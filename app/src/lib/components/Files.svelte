<script>
  import File from '$lib/components/File.svelte'

  let files_promise = fetch('/api/files').then((x) => x.json());
</script>

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

