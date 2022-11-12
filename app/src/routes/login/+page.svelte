<form method="POST" action="/api/login">
  <div class="form-inputs">
    <input type="text" name="user" placeholder="user."/>
    <input type="password" name="pass" placeholder="password."/>
    <input type="submit" value="login">
  </div>
</form>

<style>
  .form-inputs {
    display: flex;
    flex-direction: column;
  }
  
  input {
    margin: auto;
    padding: 10px;
    margin-bottom: 5px;
    
    font-size: inherit;
  }
  
  input[type=text], input[type=password] {
    border: solid 1px #aaa;
    border-radius: 2px;
  }
</style>
