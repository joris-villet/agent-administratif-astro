<script lang="ts">
  import ContainerMessages from "./ContainerMessages.svelte";
  import IconIdea from "./Icons/IconIdea.svelte";
  import InputPrompt from "./InputPrompt.svelte";
  import { storeMessage } from "@/stores/message.svelte";

  const conversation = $derived(storeMessage.messages.length);
</script>

<section
  class="flex-1 flex flex-col bg-surface rounded-2xl overflow-hidden shadow-sm border border-border min-w-0"
>
  <div
    class="px-7 py-5 flex items-start justify-between gap-6 border-b border-border"
  >
    <div class="flex items-center gap-4"></div>

    <div
      class="shrink-0 flex items-start gap-2.5 px-4 py-3 rounded-xl border border-border bg-slate-50 max-w-[220px]"
    >
      <svg
        class="w-5 h-5 text-accent shrink-0 mt-0.5"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="2"
          d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
        ></path>
      </svg>
      <div>
        <p class="text-sm font-semibold text-slate-700">
          Vos données sont sécurisées
        </p>
        <p class="text-xs text-muted mt-0.5">
          Vos informations et documents sont confidentiels et protégés.
        </p>
      </div>
    </div>
  </div>

  {#if conversation}
    <div class="flex-1 min-h-0 flex flex-col overflow-hidden px-6 relative">
      <ContainerMessages />
    </div>
  {:else}
    <div class="flex-1 min-h-0 flex justify-center items-center px-6 relative">
      <p
        class="text-md text-muted text-center pb-3 flex items-center justify-center gap-1.5"
      >
        <IconIdea customClass="text-accent-light shrink-0" />
        Soyez précis dans votre demande pour une réponse plus adaptée.
      </p>
    </div>
  {/if}

  <div>
    <InputPrompt />
  </div>
</section>
