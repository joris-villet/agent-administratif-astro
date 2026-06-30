<script lang="ts">
  import { authClient } from "@/lib/auth-client";

  let email = $state("");
  let password = $state("");
  let loading = $state<boolean>(false);
  let error = $state("");
  let success = $state<boolean>(false);
  // let token = $state('');

  const handleKeyDown = (evt: any) => {
    // evt.preventDefault();
    console.log("key => ", evt.key);
    if (evt.key === "Enter") {
      evt.preventDefault();
      handleAuth();
    }
  };

  async function handleAuth() {
    loading = true;

    let payload = {
      email,
      password,
      rememberMe: true,
    };

    try {
      await authClient.signIn.email(payload, {
        onSuccess: (_ctx: any) => {
          //console.log("ctx success => ", ctx);
          loading = false;
          success = true;
          setTimeout(() => {
            window.location.assign("/chat");
          }, 3000);
        },
        onError: (ctx: any) => {
          loading = false;
          console.log("err login => ", ctx.error);
          error = "Echec de l'authentification";
        },
      });
    } catch (err) {
      loading = false;
      console.log("err login => ", err);
      // error = "Echec de l'authentification";
    }
  }
</script>

<form>
  <div class="flex min-h-screen items-center justify-center">
    <div class="w-full max-w-md p-8 shadow-2xl">
      <h2 class="mb-6 text-center text-2xl font-bold text-white">Connexion</h2>

      {#if error}
        <div
          class="mb-4 rounded-lg border border-red-800 bg-red-900/40 px-4 py-3 text-sm text-red-300"
        >
          {error}
        </div>
      {/if}

      {#if success}
        <div
          class="mb-4 rounded-lg border border-green-800 bg-green-900/40 px-4 py-3 text-sm text-green-300"
        >
          Sign in success
        </div>
      {/if}

      <div class="mb-4">
        <label for="email" class="mb-2 block text-sm font-medium text-gray-300"
          >Email</label
        >
        <input
          id="email"
          type="email"
          bind:value={email}
          onkeydown={(evt) => handleKeyDown(evt)}
          placeholder="votre@email.com"
          class="w-full rounded-lg border border-gray-700 bg-gray-800 px-4 py-3 text-white placeholder-gray-500 focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/30"
        />
      </div>

      <div class="mb-6">
        <label
          for="password"
          class="mb-2 block text-sm font-medium text-gray-300"
          >Mot de passe</label
        >
        <input
          id="password"
          type="password"
          bind:value={password}
          onkeydown={(evt) => handleKeyDown(evt)}
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
</form>
