<script lang="ts">
  // import { storeThreads } from "@/stores/thread.svelte";
  import Message from "./Message.svelte";
  import { storeMessage } from "@/stores/message.svelte";

  let containerRef: HTMLDivElement;
  // let threads = $derived(storeThreads.threads);
  // let counterMessages = $derived(storeMessage.messages.length);

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
    //messages = storeMessage.messages;
    // console.log("counterMessages => ", counterMessages);

    // if (counterMessages > 10) {
    //   alert('10 messages now');
    // }

    // Utiliser setTimeout pour s'assurer que le DOM est mis à jour avant de défiler
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
    <!-- <p class="text-red-500 font-bold">
      store message thread id: {storeMessage.threadId}
    </p>
    <p>
      {threads.map(
        (t) => `thread id: ${t.threadId}\n, thread title: ${t.title}\n`,
      )}
    </p> -->
    {#each storeMessage.messages as message}
      <Message
        role={message.role}
        content={message.content}
        isNewMessage={message.isNewMessage}
      />
    {/each}
  </div>
</div>
