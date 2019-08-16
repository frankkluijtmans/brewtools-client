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
		<DismissableMessage
			:identifier="'dashboard_intro'"
		>
			Lorem ipsum dolor sit amet, consectetur adipiscing elit. 
			Donec tincidunt massa ullamcorper felis pharetra hendrerit eget vitae ex. 
			Morbi dictum nisi mi, mollis ultrices ante convallis id. Sed bibendum suscipit 
			elementum. Aenean iaculis, sem et ultricies vestibulum, velit urna aliquet quam, 
			nec consectetur ligula enim quis mauris.
		</DismissableMessage>
		<Stats :recipes="recipes" />
		<div class="Grid">

			<div class="MainContent">
				<Invites />
			</div>

			<div class="Sidebar Last">
				<div class="TableContainer Blue">
					<header>
						<i class="fa fa-bar-chart"></i>
						Recipe breakdown
					</header>
					<EmptyTable v-if="recipes.length === 0">
						You don't have any recipes yet.
					</EmptyTable>
					<RecipeBreakdown 
						v-else
						:recipes="recipes" 
					/>
				</div>
			</div>
		
		</div>
	</div>
</template>

<script>
import RecipeRepository from '../repositories/recipe-repository';
import Invites from '../components/Dashboard/Invites';
import RecipeBreakdown from '../components/Dashboard/RecipeBreakdown';
import Stats from '../components/Dashboard/Stats';
import DismissableMessage from '../components/UI/DismissableMessage';
import EmptyTable from '../components/UI/EmptyTable';

export default {
	name: 'home',
	components: {
		Invites,
		RecipeBreakdown,
		Stats,
		DismissableMessage,
		EmptyTable
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