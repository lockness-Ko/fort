<script>
  import { createEventDispatcher } from 'svelte';
  export let value;
  export let done;
  export let newTodo;

  const dispatch = createEventDispatcher();
  const change = () => dispatch('change', value);

  if (newTodo) {
    done = false;
    value = "";
  }
</script>

{#if newTodo}
  <label for={value}><input type="text" on:change={change} placeholder="new todo.." /></label>
{:else}
  <input type="checkbox" on:change={change} checked={done} name={value}/>
  <label for={value}>{value}</label>
{/if}

<style>
  input[type=text] {
    color: #eee;
    font-size: 17.5px;
    margin-left: 25px;
    padding: 0px;
  }
</style>
