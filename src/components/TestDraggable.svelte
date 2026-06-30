<!-- <script lang="ts">
  import { gsap } from "gsap";
  import { Draggable } from "gsap/Draggable";
  import { onMount } from "svelte";

  let elem = $state<HTMLElement>();

  gsap.registerPlugin(Draggable);

  onMount(() => {
    Draggable.create(elem, {
      type: "x",
      onLockAxis: (evt) => console.log(evt),
    });
  });
</script>

<div class="bg-orange-300 h-full w-1/2">
  <div bind:this={elem} class="w-32 h-32 bg-red-500">Draggable</div>
</div> -->
