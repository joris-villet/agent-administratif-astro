// import type { APIRoute } from "astro";



// export const POST: APIRoute = async ({ params, request }) => {
//   try {
//     const offset = params.offset;

//     const data = await db.select().from(documents).offset(offset);

//     return new Response(JSON.stringify({ offset }));
//   } catch (error) {
//     console.error("❌ Erreur serveur :", error);
//     return new Response(JSON.stringify({ error: "Erreur serveur" }), { status: 500 });
//   }
// };