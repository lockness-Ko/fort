<script>
  import Header from '$lib/components/Header.svelte'
  import '$lib/styles/style.css'
</script>

<Header/>

<main>
  <slot />
</main>

<footer>&copy;&nbsp; lockness-Ko 2022</footer>
