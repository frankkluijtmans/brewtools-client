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
			width: 50%;

			color: $white;

			.Button {
				box-shadow: none;
			}

			h1 {
				margin: 0;

				font-size: $XXL;
			}

			p {
				margin: 25px 0;
			}
		}
	}

	.DashboardStats {

		list-style-type: none;
		margin: 0;
		padding: 0;

		li {
			position: relative;
			overflow: hidden;

			padding: 15px 15px 45px;
			margin-bottom: 25px;

			background: $white;
			border-radius: 5px;
			@include shadow();

			span {
				font-size: $XXL;
				font-weight: 500;
			}

			footer {
				position: absolute;
				bottom: 0;
				left: 0;

				width: 100%;
				padding: 8px 15px;
				margin-top: 10px;

				@include gradient(#773f19, #a26a44);

				color: $white;
				font-size: $SN;
			}

			&:first-child {

				footer {
					@include gradient(#7a7453, #9c956d);
				}
			}

			&:last-child {

				footer {
					@include gradient(#afc40c, #c6db20);
				}
			}
		}
	}
</style>