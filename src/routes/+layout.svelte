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
  <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png">
  <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png">
  <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png">
  <link rel="manifest" href="/site.webmanifest">
  <link rel="mask-icon" href="/safari-pinned-tab.svg" color="#07080d">
  <meta name="msapplication-TileColor" content="#07080d">
  <meta name="theme-color" content="#07080d">
</svelte:head>

<Header />

<main>
  <slot />
</main>

<Footer />
