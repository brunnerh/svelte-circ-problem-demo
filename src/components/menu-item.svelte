<script type="text/typescript">
	import Menu from './menu.svelte';
	import { createEventDispatcher } from 'svelte';
	import { IMenuItem } from './menu-interface';

	export let item: IMenuItem;
	export let showSubMenu: boolean = false;

	$: subMenuItems = item.children ?? [];

	const dispatch = createEventDispatcher();

	async function handleClick()
	{
		if (item.command != null)
		{
			try
			{
				await item.command();
			}
			finally
			{
				dispatch('menu-item-command-executed');
			}
		}
	}

	function handleMouseEnter()
	{
		showSubMenu = item.children != null;
		dispatch('menu-item-hover', item);
	}
</script>

<style>
	.menu-item-container
	{
		position: relative;
	}
	.menu-item-button
	{
		box-sizing: border-box;
		text-align: left;
		width: 100%;
		white-space: nowrap;
	}
	.menu-item-sub-menu
	{
		position: absolute;
		top: 0;
		left: 100%;
	}
</style>

<div class="menu-item-container">
	<button type="button"
		class="menu-item-button"
		disabled={item.isEnabled != null && item.isEnabled() == false}
		on:click|stopPropagation={handleClick}
		on:mouseenter={handleMouseEnter}>
		{item.label}
	</button>

	{#if showSubMenu}
		<div class="menu-item-sub-menu">
			<Menu items={subMenuItems}
				on:menu-item-command-executed/>
		</div>
	{/if}
</div>