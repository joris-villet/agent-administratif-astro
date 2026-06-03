<script lang="ts">
  import ky from 'ky';
  import { storeThreads } from '@/stores/thread.svelte';
  import type { IThread } from '@/interfaces';

  let { threadId, onclose }: {
    threadId: string;
    onclose: () => void;
  } = $props();

  let loading = $state(false);
  let error = $state<string | null>(null);

  async function confirm() {
    loading = true;
    error = null;
    try {
      await ky.delete(`${import.meta.env.PUBLIC_FASTIFY_URL}/api/thread/delete`, {
        credentials: 'include',
        json: { threadId },
      });
      storeThreads.threads = storeThreads.threads.filter((t: IThread) => t.threadId !== threadId);
      onclose();
    } catch (e) {
      error = 'Erreur lors de la suppression.';
      console.error(e);
    } finally {
      loading = false;
      // window.location.assign('/');
    }
  }
</script>

<div
  class="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm"
  onclick={(e) => { e.preventDefault(); e.stopPropagation(); if (e.target === e.currentTarget) onclose(); }}
  onkeydown={(e) => { if (e.key === 'Escape') onclose(); }}
  role="presentation"
  tabindex="-1"
>
  <div
    class="bg-neutral-900 border border-neutral-700 rounded-2xl p-6 w-full max-w-md shadow-2xl flex flex-col gap-4"
    onclick={(e) => { e.preventDefault(); e.stopPropagation(); }}
    onkeydown={(e) => { if (e.key === 'Escape') { e.stopPropagation(); onclose(); } }}
    role="dialog"
    aria-modal="true"
    tabindex="-1"
  >
    <h2 class="text-white font-semibold text-lg">Supprimer la conversation</h2>
    <p class="text-neutral-400 text-sm">Cette action est irréversible. La conversation sera définitivement supprimée.</p>

    {#if error}
      <p class="text-red-400 text-xs">{error}</p>
    {/if}

    <div class="flex justify-end gap-2">
      <button
        onclick={(e) => { e.preventDefault(); e.stopPropagation(); onclose(); }}
        class="px-4 py-2 rounded-xl text-sm text-neutral-300 hover:bg-neutral-800 transition-colors cursor-pointer"
      >
        Annuler
      </button>
      <button
        onclick={(e) => { e.preventDefault(); e.stopPropagation(); confirm(); }}
        disabled={loading}
        class="px-4 py-2 rounded-xl text-sm font-medium bg-red-600 hover:bg-red-500 disabled:opacity-50 disabled:cursor-not-allowed text-white transition-colors cursor-pointer"
      >
        {loading ? 'Suppression…' : 'Supprimer'}
      </button>
    </div>
  </div>
</div>