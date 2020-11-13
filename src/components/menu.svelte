<script type="text/typescript">
	import MenuItem from './menu-item.svelte';
	import { setContext, createEventDispatcher } from 'svelte';
	import { IMenuItem } from './menu-interface';

	export let items: IMenuItem[];

	const dispatch = createEventDispatcher();

	let hoverItem: IMenuItem | null = null;
	
	let mouseLeaveTimeout: number | undefined = undefined;
	function handleMouseEnter()
	{
		clearTimeout(mouseLeaveTimeout);
	}
	function handleMouseLeave()
	{
		mouseLeaveTimeout = window.setTimeout(() => hoverItem = null, 300);
	}
</script>

<style>
	.menu-popup
	{
		display: flex;
		flex-direction: column;
		align-items: stretch;
	}
</style>

<div class="menu-popup"
	on:mouseenter={handleMouseEnter}
	on:mouseleave={handleMouseLeave}>
	{#each items as item}
		<MenuItem {item}
			showSubMenu={item.children != null && hoverItem == item}
			on:menu-item-hover={e => hoverItem = e.detail}
			on:menu-item-command-executed={e => dispatch('menu-item-command-executed', e)}/>
	{/each}
</div>