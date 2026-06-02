<script lang="ts">
	import { Ellipsis } from "@lucide/svelte";
	import ModalRenameThread from "@/components/ModalRenameThread.svelte";
	import ModalDeleteThread from "./ModalDeleteThread.svelte";

	let { threadId, title }: { threadId: string; title: string | null } =
		$props();

	let show = $state(false);
	let showRenameModal = $state(false);
	let showDeleteModal = $state(false);

	function handleOption(e: MouseEvent) {
		e.preventDefault();
		e.stopPropagation();
		show = !show;
	}

	function openRename(e: MouseEvent) {
		e.preventDefault();
		e.stopPropagation();
		show = false;
		showRenameModal = true;
	}

	function openDelete(e: MouseEvent) {
		e.preventDefault();
		e.stopPropagation();
		show = false;
		showDeleteModal = true;
	}
</script>

<div class="absolute right-2 top-1 text-xs">
	<button onclick={handleOption} class="cursor-pointer">
		<Ellipsis />
	</button>
	{#if show}
		<ul
			class="absolute right-0 z-50 bg-neutral-800 border border-neutral-700 rounded-xl p-4 flex flex-col gap-2"
		>
			<li>
				<button
					onclick={openRename}
					class="cursor-pointer hover:text-white transition-colors w-full text-left"
					>Rename</button
				>
			</li>
			<li>
				<button
					onclick={openDelete}
					class="cursor-pointer hover:text-white transition-colors w-full text-left"
					>Delete</button
				>
			</li>
		</ul>
	{/if}
</div>

{#if showRenameModal}
	<ModalRenameThread
		{threadId}
		currentTitle={title}
		onclose={() => (showRenameModal = false)}
	/>
{/if}

{#if showDeleteModal}
	<ModalDeleteThread {threadId} onclose={() => (showDeleteModal = false)} />
{/if}
