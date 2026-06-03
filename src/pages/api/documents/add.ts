import type { APIRoute } from 'astro';
import ky from 'ky';

export const POST: APIRoute = async ({ request }) => {

  try {
    const formData = await request.formData();
    console.log('formData endpoint => ', formData)
    const file = formData.get('file') as File | null;
    console.log('file => ', file)

    if (!file) {
      return new Response(JSON.stringify({ error: 'file est requis' }), {
        status: 400,
      });
    }

    // const upstream = new FormData();
    // upstream.append('file', file, file.name);

    //const url = `${import.meta.env.PUBLIC_FASTIFY_URL}/api/document/add`;
    //console.log('url => ', url)
    // const res = await fetch("http://localhost:7000/api/document/add", {
    //   credentials: "include",
    //   method: 'POST',
    //   body: file,
    // });
    const res = await ky.post("http://localhost:7000/api/document/add", {
      json: {
        file: "file"
      }
    }).json()

    console.log('res => ', res)

    //onst data = await res.json();

    return new Response(JSON.stringify(res), {
      //status: res.status,
    });

  } catch (err) {
    console.log('err add document')
    return new Response(JSON.stringify(err))
  }
};
