<script>
  import FileUpload from 'sveltefileuploadcomponent';
  import Files from '$lib/components/Files.svelte'
  
  let pwd = "/";
  function gotFiles(files) {
    files.detail.files.forEach((file, index) => {
      alert("Uploading file...");
      let data = new FormData();
      data.append('image', file);
      console.log(file);
    
      fetch(`/api/files?pwd=${pwd}`, {
        method: "POST",
        body: data
      }).then(x => x.text()).then(y => {
        alert(`Uploaded ${y}`);
        if (index == files.detail.files.length - 1) {
          window.location = y;
        }
      });
    });
  }
  
</script>

<h1>upload</h1>

<div class="file_upload">
  <FileUpload on:input={gotFiles}/>
</div>

<Files bind:pwd={pwd} />

<style>

.file_upload {
  background-color: #555;
  padding: 10px;
  width: 30ch;
}
</style>
