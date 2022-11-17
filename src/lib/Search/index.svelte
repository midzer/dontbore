<script>
  import { goto } from '$app/navigation';
  
  let input;

  function isValidDomain (string) {
    return /^([a-z0-9]{1,63}(-[a-z0-9]+)*\.)+[a-z]{2,}$/.test(string);
  }

  function onSubmit (event) {
    let domain;
    try {
      const url = new URL(input);
      domain = url.hostname;
    }
    catch (err) {
      if (!isValidDomain(input)) {
        console.error(err.message);
        alert(err.message);
        return;
      }
      domain = input;
    }
    if (domain.startsWith('www.')) {
      domain = input = domain.replace('www.', '');
    }
    goto(`/${domain}`, { invalidateAll: true });
	}
</script>
<form on:submit|preventDefault={onSubmit}>
  <input type="text" placeholder="domain or URL" bind:value={input}>
  <button type="submit" disabled={input ? false : true}>Go 🚀</button>
</form>
