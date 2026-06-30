<script lang="ts">
  import ky from "ky";
  import { untrack } from "svelte";
  import { storeThreads } from "@/stores/thread.svelte";
  import type { IThread } from "@/interfaces/thread";

  let {
    threadId,
    currentTitle,
    onclose,
  }: {
    threadId: string;
    currentTitle: string | null;
    onclose: () => void;
  } = $props();

  let newTitle = $state(untrack(() => currentTitle ?? ""));
  let loading = $state(false);
  let error = $state<string | null>(null);

  async function confirm() {
    if (!newTitle.trim()) return;
    loading = true;
    error = null;
    try {
      await ky.post(`${import.meta.env.PUBLIC_BACKEND_URL}/api/thread/rename`, {
        credentials: "include",
        json: { threadId, title: newTitle.trim() },
      });
      const thread = storeThreads.threads.find(
        (t: IThread) => t.threadId === threadId
      );
      if (thread) thread.title = newTitle.trim();
      onclose();
    } catch (e) {
      error = "Erreur lors du renommage.";
      console.error(e);
    } finally {
      loading = false;
    }
  }

  function onkeydown(e: KeyboardEvent) {
    if (e.key === "Enter") confirm();
    if (e.key === "Escape") onclose();
  }
</script>

<div
  class="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm"
  onclick={(e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.target === e.currentTarget) onclose();
  }}
  onkeydown={(e) => {
    if (e.key === "Escape") onclose();
  }}
  role="presentation"
  tabindex="-1"
>
  <div
    class="bg-neutral-900 border border-neutral-700 rounded-2xl p-6 w-full max-w-md shadow-2xl flex flex-col gap-4"
    onclick={(e) => {
      e.preventDefault();
      e.stopPropagation();
    }}
    onkeydown={(e) => {
      if (e.key === "Escape") {
        e.stopPropagation();
        onclose();
      }
    }}
    role="dialog"
    aria-modal="true"
    tabindex="-1"
  >
    <h2 class="text-white font-semibold text-lg">Renommer la conversation</h2>

    <input
      type="text"
      bind:value={newTitle}
      {onkeydown}
      placeholder="Nouveau titre..."
      class="w-full bg-neutral-800 border border-neutral-600 rounded-xl px-4 py-2.5 text-sm text-white placeholder:text-neutral-500 focus:outline-none focus:border-blue-500 transition-colors"
    />

    {#if error}
      <p class="text-red-400 text-xs">{error}</p>
    {/if}

    <div class="flex justify-end gap-2">
      <button
        onclick={(e) => {
          e.preventDefault();
          e.stopPropagation();
          onclose();
        }}
        class="px-4 py-2 rounded-xl text-sm text-neutral-300 hover:bg-neutral-800 transition-colors cursor-pointer"
      >
        Annuler
      </button>
      <button
        onclick={(e) => {
          e.preventDefault();
          e.stopPropagation();
          confirm();
        }}
        disabled={loading || !newTitle.trim()}
        class="px-4 py-2 rounded-xl text-sm font-medium bg-blue-600 hover:bg-blue-500 disabled:opacity-50 disabled:cursor-not-allowed text-white transition-colors cursor-pointer"
      >
        {loading ? "Enregistrement…" : "Confirmer"}
      </button>
    </div>
  </div>
</div>
