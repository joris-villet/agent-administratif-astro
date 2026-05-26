<script lang="ts">
  import { authClient } from "@/lib/auth-client";

  let email = $state('');
  let password = $state('');
  let loading = $state(false);
  let error = $state('');
  // let token = $state('');

  async function handleAuth() {
    loading = true;
   
    try {
      await authClient.signIn.email({
        email: email, 
        password: password,
        rememberMe: true,
    }, {
      onSuccess: (ctx: any) => {
        console.log('ctx success => ', ctx)
        loading = false;
        window.location.href = '/chat';
      },
      onError: (ctx: any) => {
        console.log('err login => ', ctx.error)
        error = "Echec de l'authentification";
      }
    });

    } catch(err) {
      console.log('err login => ', err)
      // error = "Echec de l'authentification";
    } 
  }
</script>

<div class="flex min-h-screen items-center justify-center">
  <div class="w-full max-w-md p-8 shadow-2xl">
    <h2 class="mb-6 text-center text-2xl font-bold text-white">Connexion</h2>

    {#if error}
      <div class="mb-4 rounded-lg border border-red-800 bg-red-900/40 px-4 py-3 text-sm text-red-300">
        {error}
      </div>
    {/if}

    <!-- {#if token}
      <div class="mb-4 rounded-lg border border-green-800 bg-green-900/40 px-4 py-3 text-sm text-green-300">
        Connecte ! Token : {token.slice(0, 24)}...
      </div>
    {/if} -->

    <div class="mb-4">
      <label for="email" class="mb-2 block text-sm font-medium text-gray-300">Email</label>
      <input
        id="email"
        type="email"
        bind:value={email}
        placeholder="votre@email.com"
        class="w-full rounded-lg border border-gray-700 bg-gray-800 px-4 py-3 text-white placeholder-gray-500 focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/30"
      />
    </div>

    <div class="mb-6">
      <label for="password" class="mb-2 block text-sm font-medium text-gray-300">Mot de passe</label>
      <input
        id="password"
        type="password"
        bind:value={password}
        placeholder="••••••••"
        class="w-full rounded-lg border border-gray-700 bg-gray-800 px-4 py-3 text-white placeholder-gray-500 focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/30"
      />
    </div>

    <button
      onclick={handleAuth}
      disabled={loading}
      class="w-full cursor-pointer rounded-lg bg-indigo-600 px-4 py-3 font-medium text-white transition-colors hover:bg-indigo-500 disabled:cursor-not-allowed disabled:opacity-50"
    >
      {#if loading}
        Connexion en cours...
      {:else}
        Se connecter
      {/if}
    </button>
  </div>
</div>
