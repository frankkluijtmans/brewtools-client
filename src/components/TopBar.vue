<template>
	<header id="top-bar">
		<router-link to="/" id="logo">
			<img src="../assets/logo.svg" alt="Brewtools">
		</router-link>
		<a
			@click="toggleMenu()"
			id="menu-toggle"
		>
			<i class="fa fa-bars"></i>
		</a>
		<div id="user">
			<div class="UserImage">
			</div>
			{{ username }}
		</div>
	</header>
</template>

<script>
export default {
	name: 'TopBar',
	computed: {

		username() {

			return this.$keycloak.fullName
		}
	},
	methods: {

		toggleMenu() {

			document.dispatchEvent(new Event('toggleMenu'));
		}
	}
}
</script>

<style lang="scss" scoped>
	@import '../styles/_variables';
	@import '../styles/_mixins';

	#top-bar {
		position: fixed;
		top: 0;
		left: 0;
        z-index: $SecondFloor;

		display: flex;
		flex-direction: row;
		height: 60px;
		width: 100%;
		padding: 0 15px;

		@include shadow();
		@include gradient($primary-color, $secondary-color);

		@include Breakpoint(Large, ExtraLarge) {
			position: relative;
		}

		#logo {
			line-height: 60px;

			img {
				height: 26px;
				margin: 17px;
			}
		}

		#user {
			display: none;
			flex-direction: row;
			line-height: 60px;
			margin-left: auto;	
			margin-right: 15px;

			font-size: $N;

			@include Breakpoint(Large, ExtraLarge) {
				display: flex;
			}

			.UserImage {
				height: 36px;
				width: 36px;
				margin: 12px 10px 0;

				border-radius: 50%;
				border: 3px solid $white;

				background: url(../assets/user.png) no-repeat center center;
				background-size: cover;
			}
		}

		#menu-toggle {
			margin: 0 10px 0 auto;
			
			line-height: 62px;
			font-size: $XL;
			color: $dark-color;

			cursor: pointer;

			@include Breakpoint(Large, ExtraLarge) {
				display: none;
			}
		}
	}
</style>
