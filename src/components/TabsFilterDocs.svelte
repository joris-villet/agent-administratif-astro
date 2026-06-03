<script lang="ts">
	import { onMount } from 'svelte';

	interface Items {
		itemName: string;
		itemWidth: number;
	}

	let ulRef: HTMLUListElement;
	let divSlide: HTMLDivElement;
	let currentItem = $state('Tous les documents');
	let items = $state<Items[]>([
		{ itemName: 'Tous les documents', itemWidth: 0 },
		{ itemName: 'PDF', itemWidth: 0 },
		{ itemName: 'DOCX', itemWidth: 0 },
		{ itemName: 'JPG', itemWidth: 0 },
		{ itemName: 'Autres', itemWidth: 0 }
	]);

	let offset = $state<number>(0);

	const setCurrentItem = (evt: Event, item: any) => {
		let target = evt.target as HTMLElement;
    //console.log('target => ', target.textContent)
		// console.log("ulRef.clientWidth", ulRef.clientWidth);
		// console.log('current offset => ', offset);
		// console.log('target offset => ', target.offsetLeft);
		offset = target.offsetLeft;
		currentItem = item.itemName;
		if (currentItem === target.textContent) {
			divSlide.style.width = `${item.itemWidth}px`;
			divSlide.style.transform = `translateX(${offset}px)`;
		}
	};

	onMount(() => {
		//console.log(ulRef);
		Array.from(ulRef.children).forEach((child) => {
			for (let obj in items) {
				Object.entries(items[obj]).forEach(([key, value]) => {
					//console.log(key, value);
					if (key === 'itemName' && value === child.textContent) {
						items[obj].itemWidth = child.clientWidth;
					}
				});
			}

			if (child.textContent === currentItem) {
				divSlide.style.width = `${items[0].itemWidth}px`;
			}
		});
		//$inspect('items => ', items)
	});
</script>

<ul bind:this={ulRef} class="relative mt-8 flex gap-8 w-full">
	{#each items as item}
		<li>
			<button
				onclick={(evt) => setCurrentItem(evt, item)}
				class={`${currentItem === item.itemName ? 'text-blue-600 transition-all' : 'text-neutral-500'} cursor-pointer font-bold hover:text-blue-600`}
			>
				{item.itemName}
			</button>
		</li>
	{/each}
	<div
		bind:this={divSlide}
		class={`absolute z-10 bottom-0 h-0.5 translate-y-2 rounded-xl bg-blue-600 transition-all duration-500`}
	></div>
  <div
		class={`absolute w-full bottom-0 h-0.5 translate-y-2 rounded-xl bg-neutral-100 transition-all duration-500`}
	></div>
</ul>


