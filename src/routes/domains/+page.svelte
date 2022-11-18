<script>
  import { convertMS } from '$lib/Helper/index';
  
  export let data;

  const now = new Date(Date.now());
</script>

<h1>All domains</h1>
<ul>
  {#each data.domains as domain, index}
    <li><a href="/{domain.name}#logins">{domain.name}</a> <samp>{convertMS(now.getTime() - Date.parse(domain.date))}</samp> ago</li>
  {/each}
</ul>  
