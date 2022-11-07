<script>

  export let pwd = "/";
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
  
  function createFolder() {
    fetch(`/api/files?folder_name=${pwd}${prompt("Folder name?")}`).then(_ => {})
    files_promise = fetch(`/api/files?pwd=${pwd}`).then((x) => x.json());
  }
  
  function createFile() {
    fetch(`/api/files?name=${pwd}${prompt("File name?")}`).then(_ => {})
    files_promise = fetch(`/api/files?pwd=${pwd}`).then((x) => x.json());
  }
</script>

<div class="files-header">
  <h3>Files</h3>
  <h4 on:click={createFile}>➕</h4>
  <h4 on:click={createFolder}>📁</h4>
</div>
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
  
  .files-header {
    display: flex;
    flex-direction: row;
  }
  
  .files-header h4 {
    width: 5%;
  }
  
  .files-header h3 {
    width: 3em;
  }
</style>
