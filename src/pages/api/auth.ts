// import type { APIRoute } from 'astro';
// import { directusAuth, directusServer } from '@/lib/directus';
// import { login } from '@directus/sdk';

// import { jsonResponse } from '../../utils/response';

// export const prerender = false;

// export const POST: APIRoute = async ({ request }) => {

//   try {
//     const { email, password } = await request.json();
    
//     if (!email || !password) {
//       return jsonResponse({ error: 'Email et mot de passe requis' }, 400);
//     }
 
//     // const result = await directusAuth.request(login(email, password));
//     // console.log('RESULT AUTH DIRECTUS => ', result)

//     //return jsonResponse({ access_token: token.access_token });

//     const res = await fetch(`${import.meta.env.DIRECTUS_URL}/auth/login`, {
//       method: 'POST',
//       headers: { 'Content-Type': 'application/json' },
//       body: JSON.stringify({ email, password })
//     });

//     const result = await res.json();
//     const accessToken = result.data.access_token;

//     return new Response(JSON.stringify({ success: true }), {
//       status: 200,
//       headers: {
//         'Set-Cookie': `directus_token=${accessToken}; HttpOnly; Path=/; Max-Age=86400; SameSite=Lax`,
//         'Content-Type': 'application/json'
//       }
//     });
  
//   } catch (error) {
//     console.error('❌ Directus login error =>', error)
//     return jsonResponse({ error: "Echec de l'authentification" }, 401);
//   }
// };
