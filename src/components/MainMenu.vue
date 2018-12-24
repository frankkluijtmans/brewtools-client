<template>
	<nav id="main-navigation">
		<header class="NavigationHeading">Main menu</header>
		<router-link to="/" :class="this.$route.path === '/' ? 'Active' : ''">Dashboard</router-link>
		<router-link to="/recipes" :class="this.$route.path.startsWith('/recipes') ? 'Active' : ''">Recipes</router-link>
		<header class="NavigationHeading">Account</header>
		<a href="https://id.brewtools.org/auth/realms/Brewtools/account" target="_blank">Manage account</a>
		<a @click=this.$keycloak.logoutFn>Logout</a>
	</nav>
</template>

<script>
export default {
	name: 'MainMenu'
}
</script>

<style scoped lang="scss">
	@import '../styles/_variables';

	#main-navigation {
		position: relative;
        z-index: $FirstFloor;

		flex: 0 0 250px;
		margin: 0;
		min-height: calc(100vh - 60px);
		height: auto;

		background: $dark-color;

		.NavigationHeading {
			padding: 0 25px;
			height: 60px;
			line-height: 60px;

			color: $semidark-color;
			font-size: $SN;
		}

		a {
			display: block;
			height: 60px;
			line-height: 60px;
			padding: 0 25px;

			color: $white;
			text-decoration: none;
			font-weight: 400;
			font-size: $N;

			cursor: pointer;

			&.Active {
				background: $extradark-color;
			}
		}
	}
</style>
