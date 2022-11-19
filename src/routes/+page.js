/** @type {import('./$types').PageLoad} */
export async function load({ fetch }) {
    const res = await fetch(`https://api.dontbo.re/`);
    const domains = await res.json();
   
    return { domains };
}
