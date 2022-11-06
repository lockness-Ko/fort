<script>
  import FileUpload from 'sveltefileuploadcomponent';
  
  function gotFiles(files) {
    let data = new FormData();
    data.append('image', files.detail.files[0]);
    console.log(files.detail.files[0]);
    
    fetch('/api/files', {
      method: "POST",
      body: data
    }).then(x => x.text()).then(y => window.location = y);
  }
</script>

<h1>upload</h1>

<div class="file_upload">
  <FileUpload on:input={gotFiles}/>
</div>

<style>

.file_upload {
  background-color: #555;
  padding: 10px;
  width: 30ch;
}
</style>
