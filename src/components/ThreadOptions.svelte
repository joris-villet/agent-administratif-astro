<script lang="ts">
import { Ellipsis } from '@lucide/svelte';

function handleOption() {
    alert('Option clicked');
    // rename
    // delete
}
</script>

<button class="absolute right-2 top-1 text-xs cursor-pointer" onclick={handleOption}>
    <Ellipsis />
</button>
