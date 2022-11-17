/** @type {import('./$types').PageLoad} */
export async function load({ fetch, params }) {
    const res = await fetch(`http://localhost:63409/${params.domain}/logins`);
    const logins = await res.json();
   
    return { logins };
}
