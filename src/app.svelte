<script type="text/typescript">
	import Menu from './components/menu.svelte';
	import { IMenuItem } from './components/menu-interface';

	const items: IMenuItem[] = [
		{
			label: 'Item 1',
			command: () => alert('!'),
		},
	];
</script>

<Menu {items}/>