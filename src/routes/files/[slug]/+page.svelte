<script>
  import { page } from '$app/stores';
  let slug = $page.params.slug;
</script>

<div class="header">
  <h1>{slug}</h1> <span><a href="/download/{slug}" download>download</a></span>
</div>

<img src="/download/{slug}"/>

<style>
  img {
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