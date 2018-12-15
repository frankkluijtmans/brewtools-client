<template>
	<div class="recipes">
		<h1 class="PageTitle">New recipe</h1>
		<form @submit.prevent="handleSubmit">
			<div class="Grid">
				<div class="MainContent">
					<div class="OverviewTable Fermentables">
						<header>Fermentables</header>
						<table>
							<tbody>
								<tr class="TableRow TableHeader">
									<td>Malt</td>
									<td>Color</td>
									<td>Volume</td>
									<td></td>
								</tr>
								<template 
									v-for="(fermentable, index) in recipe.fermentables"
								>
									<tr 
										:key="index"
										class="TableRow"
									>
										<td>
											<input type="text" v-model="fermentable.name" placeholder="Name">
										</td>
										<td>
											<input type="number" v-model="fermentable.color" placeholder="Color">
										</td>
										<td>
											<input type="number" v-model="fermentable.volume" placeholder="Volume">
										</td>
										<td>
											<a 
												@click="recipe.fermentables.splice(index, 1)"
												type="button"
												class="RemoveFields"
											><i class="fas fa-trash" /></a>
										</td>
									</tr>
								</template>
							</tbody>
						</table>
						<footer>
							<button
								@click="recipe.fermentables.push({
									name: '',
									color: null,
									volume: null
								})"
								type="button"
								class="Button New"
							><i class="fas fa-plus" /> Add a grain</button>
						</footer>
					</div>

					<div class="OverviewTable Hops">
						<header>Hops</header>
						<table>
							<tbody>
								<tr class="TableRow TableHeader">
									<td>Kind</td>
									<td>Bitterness</td>
									<td>Volume</td>
									<td>Time to boil</td>
									<td></td>
								</tr>
								<template 
									v-for="(hop, index) in recipe.hops"
								>
									<tr 
										:key="index"
										class="TableRow"
									>
										<td>
											<input type="text" v-model="hop.name" placeholder="Name">
										</td>
										<td>
											<input type="number" v-model="hop.bitterness" placeholder="Bitterness">
										</td>
										<td>
											<input type="number" v-model="hop.volume" placeholder="Volume">
										</td>
										<td>
											<input type="number" v-model="hop.boiling_time" placeholder="Boiling time">
										</td>
										<td>
											<a 
												@click="recipe.hops.splice(index, 1)"
												type="button"
												class="RemoveFields"
											><i class="fas fa-trash" /></a>
										</td>
									</tr>
								</template>
							</tbody>
						</table>
						<footer>
							<button
								@click="recipe.hops.push({
									name: '',
									bitterness: null,
									volume: null,
									boiling_time: null
								})"
								type="button"
								class="Button New"
							><i class="fas fa-plus" /> Add a hop</button>
						</footer>
					</div>

					<input type="submit" value="Save recipe">
				</div>

				<div class="Sidebar">
					<input type="text" v-model="recipe.name" placeholder="Name">
					<input type="text" v-model="recipe.style" placeholder="Style">
					<input type="number" v-model="recipe.og" placeholder="Original Gravity">
					<input type="number" v-model="recipe.fg" placeholder="Final Gravity">
					<input type="number" v-model="recipe.ibu" placeholder="IBU">
					<input type="number" v-model="recipe.ebc" placeholder="EBC">
					<input type="number" v-model="recipe.base_volume" placeholder="Total volume">
					<input type="number" v-model="recipe.boiling_time" placeholder="Boiling time">
					<input type="number" v-model="recipe.mash_water" placeholder="Mash water">
					<input type="number" v-model="recipe.flush_water" placeholder="Flush water">
				</div>
			</div>
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
				name: '',
				style: '',
				collaborators: [],
				og: null,
				fg: null,
				ibu: null,
				ebc: null,
				base_volume: null,
				boiling_time: null,
				mash_water: null,
				flush_water: null,
				mash: [],
				hops: [{
					name: '',
					bitterness: null,
					volume: null,
					boiling_time: null
				}],
				fermentables: [{
					name: '',
					color: null,
					volume: null
				}],
				other: [],
				yeast: {
					name: '',
					volume: null
				}
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

<style lang="scss" scoped>
	@import '../../styles/_variables';
	@import '../../styles/_mixins';

	input {
		width: 100%;
		display: block;
	}

	.OverviewTable {

		&.Fermentables {
			margin-bottom: 25px;

			header {
				@include gradient(#773f19, #a26a44);
			}
		}

		&.Hops {
			
			header {
				@include gradient(#afc40c, #c6db20);
			}
		}
	}
</style>