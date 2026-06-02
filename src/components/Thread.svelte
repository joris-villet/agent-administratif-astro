<script lang="ts">
  import { storeMessage } from "@/stores/message.svelte";
  import { storeThreads } from "@/stores/thread.svelte";
  import ThreadOptions from "@/components/ThreadOptions.svelte";
  import type { IThread } from "@/interfaces";
  import IconNewThread from "@/components/Icons/IconNewThread.svelte";
  import ky from "ky";

  let { threadId }: { threadId?: string } = $props();

  let states = $state<{ threads: IThread[]; loading: boolean }>({
    threads: [],
    loading: false,
  });

  let threadLength = $derived(storeThreads.threads.length);
  let computedThread = $derived(storeThreads.threads);
  let splittedContent = $derived.by(() => {
    return computedThread.map((thread: any) => {
      let message = thread.messages.at(0).content;
      if (message?.length > 50) {
        return message.substring(0, 50) + "...";
      }
      return message;
    });
  });

  $inspect("threads length => ", storeThreads.threads);


  function groupThreadsByDate(threads: IThread[]) {
    const today = new Date();
    const yesterday = new Date(today);
    yesterday.setDate(today.getDate() - 1);

    return threads.reduce((groups: Record<string, IThread[]>, thread) => {
      const date = new Date(thread.createdAt);
      let label: string;

      if (date.toDateString() === today.toDateString()) label = "Aujourd'hui";
      else if (date.toDateString() === yesterday.toDateString()) label = "Hier";
      else {
        const diffDays = Math.floor(
          (today.getTime() - date.getTime()) / (1000 * 60 * 60 * 24),
        );
        if (diffDays < 7) label = `Il y a ${diffDays} jours`;
        else label = "Plus ancien";
      }

      if (!groups[label]) groups[label] = [];
      groups[label]?.push(thread);
      return groups;
    }, {});
  }

  async function loadHistory() {
    if (storeThreads.loaded) return;
    storeThreads.loaded = true;
    try {
      const data = await ky
        .get(`${import.meta.env.PUBLIC_FASTIFY_URL}/api/thread/get`, {
          credentials: "include",
        })
        .json<IThread[]>();

      console.log("thread => ", data);

      storeThreads.threads = data;
    } catch (e) {
      console.error("Failed to load history:", e);
    } finally {
      states.loading = false;
    }
  }

  function newChat() {
    storeMessage.threadId = null;
    storeMessage.messages = [];
    window.history.pushState({}, '', '/chat');
  }

  async function selectThread(id: string) {
    storeMessage.threadId = id;
    storeMessage.messages =
      storeThreads.threads.find((t) => t.threadId === id)?.messages ?? [];
    window.history.pushState({}, "", `/chat/${id}`);
  }

  $effect(() => {
    loadHistory();
    if (threadId) {
      storeMessage.threadId = threadId;
      storeMessage.messages =
        storeThreads.threads.find((t) => t.threadId === threadId)?.messages ??
        [];
    }
  });
</script>

<div class="p-4 pb-6 mx-auto">
  {#if threadLength}
    <div
      class="flex items-center gap-4 py-2 px-4 bg-accent max-w-max h-full shadow-lg shadow-accent/30 rounded-xl cursor-pointer border border-white/20 text-sm font-medium text-slate-100 transition-all duration-500"
    >
      <IconNewThread />
      <button class="block cursor-pointer" onclick={newChat}
        >Nouvelle conversation</button
      >
    </div>
  {/if}
</div>

<!-- Thread list -->
<div class="flex-1 overflow-y-auto px-4 pb-4 min-h-0">
  {#if states.loading}
    <div class="flex items-center justify-center py-10">
      <svg
        class="w-5 h-5 text-slate-500 animate-spin"
        fill="none"
        viewBox="0 0 24 24"
      >
        <circle
          class="opacity-25"
          cx="12"
          cy="12"
          r="10"
          stroke="currentColor"
          stroke-width="4"
        ></circle>
        <path
          class="opacity-75"
          fill="currentColor"
          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
        ></path>
      </svg>
    </div>
  {:else if storeThreads.threads.length === 0}
    <p class="text-xs text-slate-500 text-center py-10">Aucune conversation</p>
  {:else}
    <div class="space-y-2">
      {#each Object.entries(groupThreadsByDate(computedThread)) as [label, group]}
        <p class="text-xs text-gray-200 pb-1 pt-4">{label}</p>
        {#each group as thread}
          <a
            onclick={(e) => {
              e.preventDefault();
              selectThread(thread.threadId);
            }}
            href={`/chat/${thread.threadId}`}
            class="block w-full cursor-pointer relative px-4 py-4 rounded-xl border border-white/20 text-sm font-medium text-slate-200 hover:bg-white/10 hover:border-white/30 transition-all hover:border-l-blue-500"
          >
            <span class="absolute left-2 top-2 text-xs italic">
              à {new Date(thread.createdAt)
                .toLocaleTimeString("fr-FR", {
                  hour: "2-digit",
                  minute: "2-digit",
                })
                .replace(":", "h")}
            </span>

            <ThreadOptions threadId={thread.threadId} title={thread.title} />

            <p class="w-full text-left font-bold py-0.5 mt-4">
              {thread.title ?? thread.threadId}
            </p>
            <p class="font-light text-md text-neutral-300 py-0.5 italic">
              {splittedContent}
            </p>
          </a>
        {/each}
      {/each}
    </div>
  {/if}
</div>
