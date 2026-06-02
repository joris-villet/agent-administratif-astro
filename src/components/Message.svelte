<script lang="ts">
  import VibeMessage from "./VibeMessage.svelte";
  import { storeMessage } from "@/stores/message.svelte";

  const { role = "", content = "", isNewMessage = undefined } = $props();
  let loading = $derived(storeMessage.isLoading);
</script>

{#if role === "user"}
  <div class="flex justify-end mb-6">
    <div class="max-w-[75%] bg-message-user text-white px-4 py-2.5 rounded-2xl rounded-br-sm shadow-sm">
      <p class="anim-enter whitespace-pre-line font-mono leading-none">{content}</p>
    </div>
  </div>
{/if}

{#if loading && isNewMessage}
  <div class="flex justify-start mb-6 items-center gap-2">
    <div class="rounded-full bg-slate-200 border border-blue-100 flex items-center justify-center shrink-0 mb-0.5">
      <img src="/img/photo-agent.webp" alt="bot" class="w-12 h-12" />
    </div>
    <div class="flex gap-1 px-4 py-3 bg-slate-100 rounded-2xl rounded-bl-sm">
      <span class="w-1.5 h-1.5 bg-slate-400 rounded-full animate-bounce" style="animation-delay: 0ms"></span>
      <span class="w-1.5 h-1.5 bg-slate-400 rounded-full animate-bounce" style="animation-delay: 150ms"></span>
      <span class="w-1.5 h-1.5 bg-slate-400 rounded-full animate-bounce" style="animation-delay: 300ms"></span>
    </div>
  </div>
{/if}

{#if role === "assistant"}
  <div class="flex justify-start mb-6 items-end gap-2">
    <div class="rounded-full bg-slate-200 border border-blue-100 flex items-center justify-center shrink-0 mb-0.5">
      <img src="/img/photo-agent.webp" alt="bot" class="w-12 h-12" />
    </div>
    <div class="max-w-[75%] bg-message-ai px-4 py-2.5 rounded-2xl rounded-bl-sm shadow-sm">
      <div class="anim-enter text-sm text-slate-700 leading-relaxed whitespace-pre-wrap">
        <!-- <VibeMessage {content} /> -->
        {#if isNewMessage}
          <VibeMessage {content} />
        {:else}
          <span class="whitespace-pre-line font-mono leading-none">{content}</span>
        {/if}
      </div>
    </div>
  </div>
{/if}

<style>
  .anim-enter {
    animation: animEnter 0.35s cubic-bezier(0.16, 1, 0.3, 1) forwards;
  }

  @keyframes animEnter {
    from { opacity: 0; transform: translateY(6px); }
    to   { opacity: 1; transform: translateY(0); }
  }
</style>
