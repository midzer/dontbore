<script>
  import { page } from '$app/stores';

  import Header from '$lib/Header/index.svelte';
  import Footer from '$lib/Footer/index.svelte';

  import '../app.css';

  const domain = $page.url.pathname.substring(1);
</script>

<svelte:head>
  <title>DontBore{ domain ? ' - ' + domain : ''}</title>
  <meta name="description" content="Find and share logins provided by the community">
  <link rel="manifest" href="/site.webmanifest">
</svelte:head>

<Header />

<main>
  <slot />
</main>

<Footer />
