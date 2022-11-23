<script>
  import Todo from '$lib/components/Todo.svelte';
  import { browser } from '$app/environment';

  let todos = {};
  if (browser) {
    fetch(`/api/todo`).then(raw => raw.json()).then(json => todos = json);
  }
  
  function todoTicked(e) {
    todos[e.detail] = e.explicitOriginalTarget.checked;
    
    fetch(`/api/todo`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(todos)
    })
  }
</script>

<h1>🗒️</h1>

<ul>
  {#each Object.keys(todos) as todo}
    <li>
      <Todo on:change={todoTicked} value={todo} done={todos[todo]}/>
    </li>
  {/each}
</ul>

<style>
  ul {
    list-style-type: none;
  }
  
  li {
    padding: 5px;
  }
</style>
