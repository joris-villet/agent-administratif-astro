<script lang="ts">
  import { Search, Lightbulb } from "@lucide/svelte";

  // placeholders (tu changeras plus tard)
  type  TInsights = {
    id: number | StaticRange;
    title: string;
    content: string;
  }
  let query = $state("");
  let insights = $state<TInsights[]>([]);
</script>

<div class="w-96 bg-[#1a1a1a] border-l border-gray-800 flex flex-col">
  
  <!-- HEADER + INPUT -->
  <div class="p-6 border-b border-gray-800">
    <h2 class="text-yellow-400 text-sm font-semibold mb-4 uppercase tracking-wider">
      AI INSIGHTS & ACTIONS
    </h2>

    <div class="relative">
      <input
        type="text"
        placeholder="Any qulisthon or command.."
        bind:value={query}
        class="w-full bg-[#252525] text-gray-300 px-4 py-2.5 rounded-lg border border-gray-700 focus:outline-none focus:border-yellow-400 transition-colors text-sm"
      />
    </div>
  </div>

  <!-- BODY -->
  <div class="flex-1 overflow-y-auto p-6">

    <!-- STATIC EXAMPLE BLOCK -->
    <div class="mb-6">
      <div class="flex items-center gap-2 mb-3">
        <Search class="w-5 h-5 text-yellow-400" />
        <h3 class="text-yellow-400 font-semibold text-lg">AI INSIGHTS</h3>
      </div>

      <div class="bg-[#252525] rounded-lg p-4 border border-gray-800">
        <div class="flex items-start justify-between mb-2">
          <h4 class="text-white font-semibold">Assistant</h4>
          <button class="text-gray-500 hover:text-gray-300 transition-colors">
            <!-- <MoreVertical class="w-4 h-4" /> -->
          </button>
        </div>
        <p class="text-gray-400 text-sm leading-relaxed">
          Lorem ipsum dololor sit amet, cons cretur adipi-
        </p>
      </div>
    </div>

 
    {#if insights.length > 0}
      <div class="space-y-3">
        {#each insights as insight (insight.id)}
          <div class="bg-[#252525] rounded-lg p-4 border border-gray-800">
            <div class="flex items-start gap-2 mb-2">
              <Lightbulb class="w-4 h-4 text-yellow-400 shrink-0 mt-0.5" />
              <h4 class="text-white font-semibold text-sm">{insight.title}</h4>
            </div>
            <p class="text-gray-400 text-xs leading-relaxed">
              {insight.content}
            </p>
          </div>
        {/each}
      </div>
    {/if}

  </div>
</div>
