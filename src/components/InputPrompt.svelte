<script lang="ts">
  import { storeMessage } from "@/stores/message.svelte";
  import type { IResponseTeacher } from "@/interfaces";
  import ky from 'ky';

  let input = $state("");
  let updatedMessages = $derived(storeMessage.messages);

  const sendMessage = async (evt: any) => {
    evt.preventDefault();
    if (!input.trim()) return;

    let userMessage = input.trim();
    input = "";

    storeMessage.messages = storeMessage.messages.map((m) => ({ ...m, isNewMessage: false }));

    setTimeout(() => { storeMessage.isLoading = true; }, 400);

    storeMessage.messages = storeMessage.messages.concat({
      role: "user",
      content: userMessage,
      isNewMessage: true,
    });

    try {
      const responseTeacher = await ky.post<IResponseTeacher>(`${import.meta.env.PUBLIC_FASTIFY_URL}/api/agent/message`, {
        credentials: 'include',
        json: { 
          messages: updatedMessages.map(m => ({ role: m.role, content: m.content })),
          threadId: storeMessage.threadId 
        },
        timeout: 60000,
      }).json();

      if (responseTeacher) {
        storeMessage.isLoading = false;
        if (responseTeacher.threadId) storeMessage.threadId = responseTeacher.threadId;
        setTimeout(() => {
          storeMessage.messages = storeMessage.messages.concat({
            role: "assistant",
            content: responseTeacher.content,
            isNewMessage: true,
          });
        }, 300);
      }
    } catch (e) {
      storeMessage.isLoading = false;
      console.error(e);
    }
  };
</script>

<form onsubmit={sendMessage} class="px-6 py-4">
  <div class="border border-border rounded-2xl bg-white focus-within:border-slate-300 transition-colors shadow-lg shadow-gray-200">
    <textarea
      bind:value={input}
      rows="3"
      autocorrect="off"
      placeholder="Écrivez votre message ici..."
      class="w-full px-4 pt-4 pb-2 text-sm text-slate-700 resize-none focus:outline-none placeholder:text-slate-400 bg-transparent leading-relaxed"
      onkeydown={(e) => {
        if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); sendMessage(e); }
      }}
    ></textarea>
    <div class="flex items-center justify-between px-3 pb-3">
      <div class="flex items-center gap-1">
        <button type="button" class="p-2 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-lg transition-colors" aria-label="Joindre un fichier">
          <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15.172 7l-6.586 6.586a2 2 0 102.828 2.828l6.414-6.586a4 4 0 00-5.656-5.656l-6.415 6.585a6 6 0 108.486 8.486L20.5 13"/>
          </svg>
        </button>
        <button type="button" class="p-2 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-lg transition-colors" aria-label="Ajouter un document">
          <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"/>
          </svg>
        </button>
      </div>
      <button
        type="submit"
        class="w-9 h-9 rounded-full bg-accent hover:bg-accent-light text-white flex items-center justify-center transition-colors shadow-sm active:scale-95"
        aria-label="Envoyer"
      >
        <svg class="w-4 h-4 ml-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"/>
        </svg>
      </button>
    </div>
  </div>
</form>
