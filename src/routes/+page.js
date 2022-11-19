/** @type {import('./$types').PageLoad} */
export async function load({ fetch }) {
    const res = await fetch(`https://api.dontbo.re/`);
    let domains = await res.json();

    domains.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
    domains = domains.slice(0, 4);
   
    return { domains };
}
