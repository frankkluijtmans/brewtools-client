<template>
	<div class="recipes">
		<h1 class="PageTitle">New recipe</h1>
		<form @submit.prevent="handleSubmit">
			<input type="text" v-model="recipe.name">
			<input type="submit" value="send">
		</form>
	</div>
</template>

<script>
import RecipeRepository from '../../repositories/recipe-repository';

export default {
	name: 'NewRecipe',
	data() {
		return {
			recipe: {
				name: ''
			}
		}
	},

	methods: {
		handleSubmit() {
			RecipeRepository.create(this.recipe)
				.then(() => {
					alert('recipe saved');
				})
		}
	}
}
</script>