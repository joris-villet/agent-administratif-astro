import type { IMessage } from "@/interfaces/conversation";
import type { APIRoute } from "astro";

export const prerender = false;

export const POST: APIRoute = async ({ request }) => {
  try {
    const {
      messages,
      threadId,
    }: { messages: IMessage[]; threadId: string | null } = await request.json();

    console.log(
      "env => ",
      `${import.meta.env.PUBLIC_BACKEND_URL}/api/agent/message`
    );

    const res = await fetch(
      `${import.meta.env.PUBLIC_BACKEND_URL}/api/agent/message`,
      {
        method: "POST",
        body: JSON.stringify({ messages, threadId }),
      }
    );

    // console.log('res status => ', res.status, res.statusText);

    if (!res.ok) {
      const errorBody = await res.text();
      console.error("❌ External API error:", res.status, errorBody);
      return new Response(
        JSON.stringify({ error: `External API error: ${res.status}` }),
        { status: 502 }
      );
    }

    const data = await res.json();
    return new Response(
      JSON.stringify({ content: data.content, threadId: data.threadId })
    );
  } catch (error) {
    console.error("❌ Erreur serveur :", error);
    return new Response(JSON.stringify({ error: "Erreur serveur" }), {
      status: 500,
    });
  }
};
