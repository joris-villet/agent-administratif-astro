<script lang="ts">
import { FilePlusCorner } from '@lucide/svelte';

interface CustomClass {
  size?: number;
}
const props: CustomClass = $props();
</script>

<FilePlusCorner {...props} />
