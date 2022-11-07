<script>

  let pwd = "/";
  let files_promise = fetch(`/api/files?pwd=${pwd}`).then((x) => x.json());
  
  function clicked(e) {
    let elem;
    if (e.target.parentElement.children[2] == undefined) {
      elem = e.target.parentElement.parentElement;
    } else {
      elem = e.target.parentElement;
    }
    
    if (elem.children[2].textContent == "directory") {
      pwd += elem.children[0].textContent + "/";
      files_promise = fetch(`/api/files?pwd=${pwd}`).then((x) => x.json());
    }
  }
</script>

<h3>Files</h3>
<ul>
  {#await files_promise then files}
    {#each files as file}
    <li>
      <div on:click={clicked}>
        {#if file["type"] == "file"}
        <a href="/files/{file['name']}?pwd={pwd}"><b>{file["name"]}</b></a>
        <u>{file["date"]}</u>
        <a href="/download/?{pwd}{file['name']}" download>download</a>
        {:else if file["type"] == "dir"}
        <a><b>{file["name"]}</b></a>
        <u>{file["date"]}</u>
        <a>directory</a>
        {/if}
      </div>
    </li>
    {/each}
  {/await}
</ul>

<style>
  div {
    display: flex;
    flex-direction: row;
  }
  
  u, a {
    width: 50%
  }
</style>
