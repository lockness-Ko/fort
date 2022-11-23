<script>
  import { createEventDispatcher } from 'svelte';
  export let value;
  export let done;

  const dispatch = createEventDispatcher();
  const change = () => dispatch('change', value);

</script>

<input type="checkbox" on:change={change} checked={done} name={value}/>
<label for={value}>{value}</label>
