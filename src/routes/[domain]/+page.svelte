<script>
  import { page } from '$app/stores';
  import { invalidateAll } from '$app/navigation';
  import { /*onMount,*/ afterUpdate, beforeUpdate } from 'svelte';
  
  let domain = $page.url.pathname.substring(1);
  let username, password, check, task;

  export let data;

  // via https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/random#getting_a_random_integer_between_two_values_inclusive
  function getRandomIntInclusive(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1) + min);
  }

  function generateTask() {
    const a = getRandomIntInclusive(0,9);
    const b = getRandomIntInclusive(0,9);
    const c = getRandomIntInclusive(0,1);
    
    task = {
        name: `${a}${c ? '+' : '-'}${b}=?`,
        result: c ? a + b : a - b
    }
  }

  function onSubmit (event) {
    pushData(`https://api.dontbo.re/${domain}`, 'POST', { user: username, pass: password })
    .then((data) => {
      invalidateAll();
      window.location = window.location.origin + window.location.pathname + '#logins';
    });
    username = password = check = '';
  }

  async function pushData(url, method, data) {
    // Default options are marked with *
    const response = await fetch(url, {
        method: method, // *GET, POST, PUT, DELETE, etc.
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

  function query (selector) {
    return Array.from(document.querySelectorAll(selector))
  }

  function onCopy (event) {
    const button = event.target;
    const input = button.previousElementSibling;
    input.select();
    document.execCommand('copy');
    button.textContent = 'Done ✔️';

    window.setTimeout(() => {
      button.textContent = 'Copy 💾';
    }, 1000);
  }

  function onUpvote (event) {
    vote(event.target, 1);
  }

  function onDownvote (event) {
    vote(event.target, -1);
  }

  function vote (button, value) {
    const element = button.closest('li');
    const date = element.getAttribute('data-date');
    pushData(`https://api.dontbo.re/${domain}`, 'PUT', { date: date, vote: value })
    .then((data) => {
      invalidateAll();
    });
    button.disabled = true;
  }
  
  function calcProgressWidth(first, second) {
    const totalVotes = first + second;
    
    return first / totalVotes * 100;
  }

  afterUpdate(() => {
    query('.btn-copy').forEach(button => {
      button.addEventListener('click', onCopy);
    });

    query('.btn-upvote').forEach(button => {
      button.addEventListener('click', onUpvote);
    });

    query('.btn-downvote').forEach(button => {    
      button.addEventListener('click', onDownvote);
    });
  });

  beforeUpdate(() => {
    query('.btn-copy').forEach(button => {
      button.removeEventListener('click', onCopy);
    });

    query('.btn-upvote').forEach(button => {
      function onUpvote (event) {
        vote(button, 1);
      }
      button.removeEventListener('click', onUpvote);
    });

    query('.btn-downvote').forEach(button => {
      function onDownvote (event) {
        vote(button, -1);
      }
      button.removeEventListener('click', onDownvote);
    });
  });

  generateTask();
</script>

<article id="logins">
  <h1>{ $page.url.pathname.substring(1) } logins</h1>
  <ol>
    {#each data.logins as login, index}
      <li data-date={login.date}>
        <p>submitted on: <samp>{new Intl.DateTimeFormat().format(Date.parse(login.date))}</samp></p>
        <div class="progress">
          <div class="progress-bar bg-upvote" role="progressbar" aria-label="Upvotes" style="width: {calcProgressWidth(login.upvotes, login.downvotes)}%" aria-valuenow="{calcProgressWidth(login.upvotes, login.downvotes)}" aria-valuemin="0" aria-valuemax="100">{login.upvotes} upvotes</div>
          <div class="progress-bar bg-downvote" role="progressbar" aria-label="Downvotes" style="width: {calcProgressWidth(login.downvotes, login.upvotes)}%" aria-valuenow="{calcProgressWidth(login.downvotes, login.upvotes)}" aria-valuemin="0" aria-valuemax="100">{login.downvotes} downvotes</div>
        </div>
        <div class="btn-group" role="group" aria-label="Upvote or downvote">
          <button class="btn-upvote">Up 🔺</button>
          <button class="btn-downvote">Down 🔻</button>
        </div>
        <label for="user{index}">Username:</label>
        <div class="input-group">
          <input type="text" name="user{index}"value={login.user} readonly>
          <button class="btn-copy">Copy 💾</button>
        </div>
        <label for="pass{index}">Password:</label>
        <div class="input-group">
          <input type="text" name="pass{index}"value={login.pass} readonly>
          <button class="btn-copy">Copy 💾</button>
        </div>
      </li>
    {/each}
  </ol>
  <aside>
    <p>No logins found or working? Please register a fake account then <a href="#share">share</a> the login below ↓.</p>
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
