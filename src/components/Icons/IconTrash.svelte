<script lang="ts">
import { Trash2 } from '@lucide/svelte';
interface CustomClass {
  size?: number;
}
const props: CustomClass = $props();
</script>

<Trash2 {...props}/>
