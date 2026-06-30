<script lang="ts">
import { FilePenLine } from '@lucide/svelte';
interface CustomClass {
  size?: number;
}
const props: CustomClass = $props();

</script>

<FilePenLine {...props}/>
