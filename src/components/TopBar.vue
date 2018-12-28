<template>
	<header id="top-bar">
		<router-link to="/" id="logo">
			<img src="../assets/logo.svg" alt="Brewtools">
		</router-link>
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

		username: function () {

			return this.$keycloak.fullName
		}
	}
}
</script>

<style scoped lang="scss">
	@import '../styles/_variables';
	@import '../styles/_mixins';

	#top-bar {
		position: relative;
        z-index: $FirstFloor;

		display: flex;
		flex-direction: row;
		height: 60px;
		padding: 0 15px;

		@include shadow();
		@include gradient($primary-color, $secondary-color);

		#logo {
			line-height: 60px;

			img {
				height: 26px;
				margin: 17px;
			}
		}

		#user {
			display: flex;
			flex-direction: row;
			line-height: 60px;
			margin-left: auto;	
			margin-right: 15px;

			font-size: $N;

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
	}
</style>
