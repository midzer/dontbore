<script>
  import { page } from '$app/stores';
  import { invalidateAll } from '$app/navigation';
  
  let domain = $page.url.pathname.substring(1);
  let username, password, check, task;

  export let data;

  function generateTask() {
    const a = Math.floor(Math.random() * 10);
    const b = Math.floor(Math.random() * 10);
    const c = Math.floor(Math.random());
    
    task = {
        name: `${a}${c ? '+' : '-'}${b}=?`,
        result: c ? a + b : a - b
    }
  }

  function onSubmit (event) {
    postData(`https://api.dontbo.re/${domain}`, { user: username, pass: password })
    .then((data) => {
      //console.log(data); // JSON data parsed by `data.json()` call
      invalidateAll();
    });
  }

  async function postData(url, data) {
    // Default options are marked with *
    const response = await fetch(url, {
        method: 'POST', // *GET, POST, PUT, DELETE, etc.
        //mode: 'no-cors', // no-cors, *cors, same-origin
        //cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
        //credentials: 'same-origin', // include, *same-origin, omit
        headers: {
            'Content-Type': 'application/json'
            //'Content-Type': 'application/x-www-form-urlencoded'
        },
        //redirect: 'follow', // manual, *follow, error
        //referrerPolicy: 'no-referrer', // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
        body: JSON.stringify(data) // body data type must match "Content-Type" header
    });
    return response.json();
  }

  generateTask();
</script>

<h1>{ $page.url.pathname.substring(1) } logins</h1>
<article id="logins">
  <ol>
    {#each data.logins as login}
      <li>
        Username: <samp>{login.user}</samp> / Password: <samp>{login.pass}</samp>
      </li>
    {/each}
  </ol>
  <aside>
    <p>No logins found or working? Please register a fake account then share the login below ↓.</p>
  </aside>
</article>
<hr>
<section id="share">
  <form on:submit|preventDefault={onSubmit}>
    <h2>Share a login</h2>
    <label for="domain">Site:</label>
    <input type="text" name="domain" bind:value={domain}>
    <label for="username">Username:</label>
    <input type="text" name="username" bind:value={username}>
    <label for="password">Password:</label>
    <input type="text" name="password" bind:value={password}>
    <label for="check">Check:</label>
    <input type="text" name="check" placeholder={task.name} bind:value={check}>
    <button type="submit" disabled={domain && username && password && check == task.result ? false : true}>Submit</button>
  </form>
</section>
