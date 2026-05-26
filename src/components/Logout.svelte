<script lang="ts">
import { authClient } from "@/lib/auth-client"
import { LogOut } from '@lucide/svelte';

const signOut = async (evt: Event) => {
  evt.preventDefault();

  await authClient.signOut({
    fetchOptions: {
      onSuccess: () => {
        window.location.reload()
      },
    },
  });

}

</script>


<button onclick={signOut}>
  <LogOut />
</button>