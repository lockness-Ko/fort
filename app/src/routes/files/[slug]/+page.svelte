<script>
  import { page } from '$app/stores';
  let slug = $page.params.slug;
</script>

<head>
  <meta name="twitter:image" content="/download/{slug}">
  <meta name="og:image" content="/download/{slug}">
</head>

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