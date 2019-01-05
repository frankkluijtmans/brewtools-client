<template>
	<div>
		<div class="HeroUnit">
			<div class="Content">
				<h1>Welcome back {{ username }}!</h1>
				<p>
					Have you used Brewtools before? It's the easiest way to file your recipes
					and log your brewing sessions. Start right now by creating a new recipe.
				</p>
				<router-link 
					tag="button" 
					to="/recipes/new" 
					class="Button Blue"
				>
					<i class="fa fa-plus" /> Create a new recipe
				</router-link>
			</div>
		</div>
		<div class="Grid">

			<div class="MainContent">
				<Invites />
			</div>

			<div class="Sidebar Last">
				<Stats />
			</div>
		
		</div>
	</div>
</template>

<script>
import RecipeRepository from '../repositories/recipe-repository';
import Invites from '../components/Dashboard/Invites';
import Stats from '../components/Dashboard/Stats';

export default {
	name: 'home',
	components: {
		Invites,
		Stats
	},
	data() {
		return {
			recipes: []
		}
	},
	computed: {

		username: function () {

			return this.$keycloak.fullName.split(" ")[0];
		},
		createdRecipes: function() {

			return this.recipes.filter(recipe => recipe.owner.email === this.$keycloak.userName).length;
		},
		averageRecipeEBC: function() {

			let totalEBC = 0;

			this.recipes.forEach(recipe => {

				totalEBC += parseInt(recipe.ebc);
			})

			if(this.recipes.length > 0) {
				
				return Math.round(totalEBC / this.recipes.length);
			}

			return 0;
		},
		averageRecipeIBU: function() {

			let totalIBU = 0;

			this.recipes.forEach(recipe => {

				totalIBU += parseInt(recipe.ibu);
			})

			if(this.recipes.length > 0) {

				return Math.round(totalIBU / this.recipes.length);
			}

			return 0;
		},
	},
	mounted() {
			
		RecipeRepository.getAll()
			.then(response => {
				
				this.recipes = response;
			})
	}
}
</script>

<style lang="scss" scoped>
	@import '../styles/_variables';
    @import '../styles/_mixins';
	@import '../styles/_buttons';

	.HeroUnit {
		position: relative;

		display: flex;
		align-items: flex-end;
		width: calc(100% + 50px);
		margin: -60px 0 25px -25px;
		height: 420px;
		padding: 35px 25px;

		background: url('../assets/hero_unit_bg.jpg') no-repeat center center;
		background-size: cover;

		.Content {
			width: 100%;

			color: $white;

			@include Breakpoint(Large) {
				width: 80%;
			}

			@include Breakpoint(ExtraLarge) {
				width: 50%;
			}

			.Button {
				box-shadow: none;
			}

			h1 {
				margin: 0;

				font-size: $XL;

				@include Breakpoint(ExtraLarge) {
					font-size: $XXL;
				}
			}

			p {
				margin: 25px 0;
			}
		}
	}
</style>