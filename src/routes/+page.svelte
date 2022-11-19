<script>
  import { convertMS } from '$lib/Helper/index';

  export let data;

  data.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
  data = data.slice(0, 4);

  const now = new Date(Date.now());
</script>

<h1>Find and share logins</h1>
<p>Enter a website above ↑ to check if the DontBore community has shared any logins for it.</p>
<article id="faq">
  <h2>FAQ</h2>
  <details>
    <summary>Sharing user credentials, wtf?!</summary>
    <p>In former internet days, people used to share logins for websites where the only purpose for an account was to nag the user.</p>
  </details>
  <details>
    <summary>There is BugMeNot. Why another site?</summary>
    <p>It is always good to decentralize the web. In addition, it seems BugMeNot is not maintained any more (no HTTPS for example).</p>
  </details>
  <details>
    <summary>How do I create a fake account?</summary>
    <p>There are multiple throw away or trash eMail services around. Your search engine is your friend.</p>
  </details>
</article>
<article id="recent">
  <h2>Recent logins on</h2>
  <ul>
    {#each data.domains as domain, index}
      <li><a href="/{domain.name}#logins">{domain.name}</a> <samp>{convertMS(now.getTime() - Date.parse(domain.date))}</samp> ago</li>
    {/each}
  </ul>
  <p>or browse <a href="/domains/">all domains</a>.</p>
</article>