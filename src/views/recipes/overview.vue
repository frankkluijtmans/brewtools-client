<template>
	<div>
		<h1 class="PageTitle">Your recipes</h1>
		<div class="OverviewTable">
			<header>Overview</header>
			<div class="TableRow TableHeader">
				<span>Recipe <i class="fas fa-sort"></i></span>
				<span>Style <i class="fas fa-sort"></i></span>
				<span>ABV <i class="fas fa-sort"></i></span>
				<span>Last edited <i class="fas fa-sort"></i></span>
				<span></span>
			</div>
			<EmptyTable v-if="recipes.length === 0" />
			<div 
				v-for="recipe in recipes"
				:key="recipe._id"  
			>
				<router-link
					:to='"/recipes/detail/" + recipe._id'
					class="TableRow"
				>
					<span>
						<i
							v-if="!isOwner(recipe.owner)"
							class="fas fa-share-square SharedRecipeIcon"
						/>
						{{ recipe.name }}
					</span>
					<span>{{ recipe.style }}</span>
					<span>{{ calculateABV(recipe.og, recipe.fg ) }}%</span>
					<span>{{ parseDate(recipe.last_edited.date) }}</span>
					<span class="Buttons">
						<router-link 
							:to='"/recipes/edit/" + recipe._id'
							class="Button Edit"
						>
							<i class="fas fa-edit" /> Edit
						</router-link>
						<a
							v-if="isOwner(recipe.owner)"
							@click="deleteRecipe(recipe._id)"
							class="Button Delete"
						>
							<i class="fas fa-trash" /> Delete
						</a>
					</span>
				</router-link>
			</div>
			<footer>
				<router-link to="/recipes/new" class="Button New"><i class="fas fa-plus" /> Create a new recipe</router-link>
			</footer>
		</div>
	</div>
</template>

<script>
import EmptyTable from '../../components/UI/EmptyTable';
import RecipeRepository from '../../repositories/recipe-repository';
import ABVHelper from '../../helpers/abv-helper';
import moment from 'moment';

export default {
	name: 'recipes-overview',
	components: {
		EmptyTable
	},
	data: function() {

		return {
			recipes: []
		}
	},
	mounted() {

		RecipeRepository.getAll()
			.then(response => {
				this.recipes = response;
			})
	},
	methods: {

		deleteRecipe: function(id) {

			RecipeRepository.delete(id)
				.then(() => {
					alert('recipe deleted');
				})
		},
		parseDate: function(date) {

			return moment(date).format("DD MMM YYYY - HH:mm");
		},
		calculateABV: function(og, fg) {

			return ABVHelper.calculate(og, fg);
		},
		isOwner: function(user) {

			return user === this.$keycloak.userName;
		}
	}
}
</script>

<style lang="scss">
	@import '../../styles/_tables';

	.SharedRecipeIcon {
		margin-right: 5px;
	}
</style>