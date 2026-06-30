// import type { APIRoute } from "astro";
// import { readItems } from "@directus/sdk";

// export const prerender = false;

// export const GET: APIRoute = async ({ url }) => {
//   try {
//     const threadId = url.searchParams.get("threadId");

//     if (threadId) {
//       // Load messages for a specific conversation
//       const conversations = await directusServer.request(
//         readItems("conversations", {
//           fields: ["id", "thread_id", "title", "created_at"],
//           filter: { thread_id: { _eq: threadId } },
//           limit: 1,
//         })
//       );

//       const convo = conversations[0];
//       if (!convo) {
//         return new Response(JSON.stringify({ error: "Conversation not found" }), {
//           status: 404,
//           headers: { "Content-Type": "application/json" },
//         });
//       }

//       const messages = await directusServer.request(
//         readItems("conversation_messages", {
//           fields: ["id", "role", "content"],
//           filter: { conversation_id: { _eq: convo.id } },
//           sort: ["id"],
//         })
//       );

//       return new Response(JSON.stringify({ ...convo, messages }), {
//         headers: { "Content-Type": "application/json" },
//       });
//     }

//     // List all conversations
//     const conversations = await directusServer.request(
//       readItems("conversations", {
//         fields: ["id", "thread_id", "title", "created_at"],
//         sort: ["-id"],
//         limit: 50,
//       })
//     );

//     return new Response(JSON.stringify(conversations), {
//       headers: { "Content-Type": "application/json" },
//     });
//   } catch (error) {
//     console.error("❌ History error:", error);
//     return new Response(JSON.stringify({ error: "Erreur serveur" }), {
//       status: 500,
//     });
//   }
// };
