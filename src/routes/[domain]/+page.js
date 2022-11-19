/** @type {import('./$types').PageLoad} */
export async function load({ fetch, params }) {
    const res = await fetch(`https://api.dontbo.re/${params.domain}`);
    const logins = await res.json();
   
    return { logins };
}
