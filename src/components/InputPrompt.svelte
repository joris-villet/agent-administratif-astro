<script lang="ts">
  import { storeMessage } from "@/stores/message.svelte";
  import { storeThreads } from "@/stores/thread.svelte";
  import type { IResponseTeacher } from "@/interfaces";
  import ky from "ky";
  import { v4 as randomUUID } from "uuid";
  import ButtonSend from "./ButtonSend.svelte";
  import { sendStoreMessage } from "@/utils/sendStoreMessage";

  let input = $state<string>("");
  let updatedMessages = $derived(storeMessage.messages);

  const handleKeyDown = (evt: KeyboardEvent) => {
    //console.log("key =>", evt.key, "| input =>", input);
    if (evt.key === "Enter") {
      evt.preventDefault();
      sendMessage();
    }
  };

  // $effect(() => {
  //   $inspect("sendMessage =>", { messages: updatedMessages });
  //   $inspect("threadId =>", storeMessage.threadId);
  // });

  const getTitleThread = async (threadId: string) => {
    try {
      const url: string = `${import.meta.env.PUBLIC_BACKEND_URL}/api/agent/generate-title`;
      const data = await ky
        .post(url, {
          credentials: "include",
          json: {
            threadId,
          },
          timeout: 60000,
        })
        .json<{ title: string }>();

      // console.log("data.title => ", data.title);

      if (data.title) {
        // console.log("store thread => ", storeThreads.threads);

        const thisThread = storeThreads.threads.find(
          (t) => t.threadId === threadId
        );
        // console.log("thisTrhead => ", thisThread);
        if (thisThread) {
          thisThread.title = data.title;
          // console.log("storeThread.threadId => ", storeThreads.threads);
        }
      }
    } catch (error) {
      console.error(error);
    }
  };

  const sendMessage = async () => {
    if (!input.trim()) return;

    let userMessage = input.trim();
    input = "";

    storeMessage.messages = storeMessage.messages.map((m) => ({
      ...m,
      isNewMessage: false,
    }));

    storeMessage.isLoading = true;

    sendStoreMessage("user", userMessage, true);

    let threadId = storeMessage.threadId;

    if (!threadId) {
      threadId = randomUUID();
      storeMessage.threadId = threadId;
      window.history.pushState({}, "", `/chat/${threadId}`);
    }

    storeThreads.threads = storeThreads.threads.concat({
      threadId: storeMessage.threadId,
      title: "Nouvelle conversation",
      createdAt: new Date(),
      messages: storeMessage.messages,
    });

    try {
      const url: string = `${import.meta.env.PUBLIC_BACKEND_URL}/api/agent/message`;
      const responseAgent = await ky
        .post<IResponseTeacher>(url, {
          credentials: "include",
          json: {
            messages: updatedMessages.map((m) => ({
              role: m.role,
              content: m.content,
            })),
            threadId: storeMessage.threadId,
          },
          timeout: 60000,
        })
        .json();

      if (!responseAgent) {
        storeMessage.isLoading = false;
        sendStoreMessage("system", "No respone from Agent", true);
      }

      // console.log("res agent =>", responseAgent);
      storeMessage.isLoading = false;

      if (responseAgent.threadId !== storeMessage.threadId) {
        console.error("THREAD ID MISMATCH", {
          sent: storeMessage.threadId,
          received: responseAgent.threadId,
        });

        sendStoreMessage(
          "system",
          "Erreur de synchronisation. Recharge la page.",
          true
        );

        return;
      }

      sendStoreMessage("assistant", responseAgent.content, true);
      await getTitleThread(responseAgent.threadId);
    } catch (e) {
      storeMessage.isLoading = false;
      console.error(e);
    }
  };
</script>

<form class="px-6 py-4">
  <div
    class="border border-blue-300 rounded-2xl bg-white focus-within:border-blue-400 focus-within:shadow-accent/20 transition-colors shadow-lg shadow-gray-200"
  >
    <textarea
      onkeydown={handleKeyDown}
      bind:value={input}
      rows="3"
      placeholder="Écrivez votre message ici..."
      class="w-full px-4 pt-4 pb-2 text-sm text-slate-700 shrink-0 resize-none focus:outline-none placeholder:text-slate-500 bg-transparent leading-relaxed"
    >
    </textarea>
    <div class="flex items-center justify-between px-3 pb-3 relative">
      <!-- <div class="flex items-center gap-1">
        <button
          type="button"
          class="p-2 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-lg transition-colors"
          aria-label="Joindre un fichier"
        >
          <svg
            class="w-5 h-5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M15.172 7l-6.586 6.586a2 2 0 102.828 2.828l6.414-6.586a4 4 0 00-5.656-5.656l-6.415 6.585a6 6 0 108.486 8.486L20.5 13"
            />
          </svg>
        </button>
        <button
          type="button"
          class="p-2 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-lg transition-colors"
          aria-label="Ajouter un document"
        >
          <svg
            class="w-5 h-5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
            />
          </svg>
        </button>
      </div> -->
      <div class="absolute right-2 bottom-1">
        <ButtonSend />
      </div>
    </div>
  </div>
</form>
