<script lang="ts">
  // import sounds from '../audio/woosh-effect.mp3'

  let { content } = $props();
  let index = $state(0);
  
  let vibeMessage = $derived(content.substring(0, index));
  
  $effect(() => {
    setInterval(() => {
      index++;
    }, 10)
  });

  // const audio = new Audio(sounds); 
  // audio.play();

</script>

<span class="whitespace-pre-line font-mono leading-none">{vibeMessage}</span>


