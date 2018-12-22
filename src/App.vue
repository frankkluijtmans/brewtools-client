<template>
	<div id="app">
		<TopBar />
		<div id="page-grid">
			<MainMenu />
			<div class="Page">
				<BreadCrumbs />
				<router-view></router-view>
			</div>
			<ErrorMessage />
		</div>
	</div>
</template>

<script>
	import MainMenu from '@/components/MainMenu.vue'
	import TopBar from '@/components/TopBar.vue'
	import BreadCrumbs from '@/components/BreadCrumbs.vue'
	import ErrorMessage from '@/components/UI/ErrorMessage.vue'

	export default {
		name: 'App',
		components: {
			MainMenu,
			TopBar,
			BreadCrumbs,
			ErrorMessage
		}
	}
</script>

<style lang="scss">
	@import './styles/_default';

	#page-grid {
		display: flex;
		flex-direction: row;
	}
</style>
