<script lang="ts">
  // import { storeThreads } from "@/stores/thread.svelte";
  import Message from "./Message.svelte";
  import { storeMessage } from "@/stores/message.svelte";

  let containerRef: HTMLDivElement;

  let messagesComputed = $derived(storeMessage.messages);

  // Fonction pour défiler vers le bas
  function scrollToBottom() {
    if (containerRef) {
      containerRef.scrollTop = containerRef.scrollHeight;
    }
  }

  // Gérer l'événement de défilement
  function handleScroll(_evt: Event) {
    console.log("Scroll event detected");
    // Vous pouvez ajouter d'autres logiques liées au défilement ici si nécessaire
  }

  $effect(() => {
    // Utiliser setTimeout pour s'assurer que le DOM est mis à jour avant de défiler
    $inspect("messages loaded => ", storeMessage.messages);
    $inspect("message computed => ", messagesComputed);
    setTimeout(scrollToBottom, 10);
  });

  // Initialiser le défilement au montage du composant
  $effect.root(() => {
    // Cette fonction s'exécute une seule fois après le rendu initial
    setTimeout(scrollToBottom, 10);
  });
</script>

<div
  bind:this={containerRef}
  onscroll={handleScroll}
  class="flex-1 min-h-0 overflow-y-auto py-6 relative"
>
  <div class="mx-auto w-full space-y-4 pb-4 p-6">
    {#each messagesComputed as message}
      <Message
        role={message.role}
        content={message.content}
        isNewMessage={message.isNewMessage}
      />
    {/each}
  </div>
</div>
