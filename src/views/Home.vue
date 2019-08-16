<template>
	<div>
		<h1 class="PageTitle">
			Welcome back {{ username }}!
			<div class="Actions">
				<router-link 
					tag="button" 
					to="/recipes/new" 
					class="Button Blue"
				>
					<i class="fa fa-plus" /> Create a new recipe
				</router-link>
			</div>
		</h1>
		<Stats />
		<div class="Grid">

			<div class="MainContent">
				<Invites />
			</div>

			<div class="Sidebar Last">
				<AtAGlance />
			</div>
		
		</div>
	</div>
</template>

<script>
import RecipeRepository from '../repositories/recipe-repository';
import Invites from '../components/Dashboard/Invites';
import AtAGlance from '../components/Dashboard/AtAGlance';
import Stats from '../components/Dashboard/Stats';

export default {
	name: 'home',
	components: {
		Invites,
		AtAGlance,
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

		.Content {
			width: 100%;
			margin-bottom: 50px;

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
				margin: 20px 0;

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