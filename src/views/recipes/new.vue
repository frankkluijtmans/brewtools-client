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

					<button 
						type="submit" 
						class="SaveButton"
					>
						<i class="far fa-save"></i> Save recipe
					</button>
				</div>

				<div class="Sidebar">
					<div class="OverviewTable KeyFacts">
						<header>Key facts</header>
						<table>
							<tbody>
								<tr
									class="TableRow"
								>
									<td>
										<input type="text" v-model="recipe.name" placeholder="Name">
									</td>
								</tr>
								<tr
									class="TableRow"
								>
									<td>
										<input type="text" v-model="recipe.style" placeholder="Style">
									</td>
								</tr>
								<tr
									class="TableRow"
								>
									<td>
										<input type="number" v-model="recipe.boiling_time" placeholder="Boiling time">
									</td>
								</tr>
								<tr
									class="TableRow"
								>
									<td>
										<input type="number" v-model="recipe.og" placeholder="Original Gravity">
									</td>
								</tr>
								<tr
									class="TableRow"
								>
									<td>
										<input type="number" v-model="recipe.fg" placeholder="Final Gravity">
									</td>
								</tr>
							</tbody>
						</table>
						<footer>
							EBC: {{ calculatedEbc }}
							ABV: {{ calculatedAbv }}
						</footer>
					</div>

					<div class="OverviewTable Water">
						<header>Water</header>
						<table>
							<tbody>
								<tr
									class="TableRow"
								>
									<td>
										<input type="number" v-model="recipe.base_volume" placeholder="Total volume">
									</td>
								</tr>
								<tr
									class="TableRow"
								>
									<td>
										<input type="number" v-model="recipe.mash_water" placeholder="Mash water">
									</td>
								</tr>
								<tr
									class="TableRow"
								>
									<td>
										<input type="number" v-model="recipe.flush_water" placeholder="Flush water">
									</td>
								</tr>
							</tbody>
						</table>
					</div>					
				</div>
			</div>
		</form>
	</div>
</template>

<script>
import RecipeRepository from '../../repositories/recipe-repository';
import ABVHelper from '../../helpers/abv-helper';

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
				ebc: this.calculatedEbc,
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
	computed: {

		calculatedEbc() {

			let totalVolume = 0;
			let totalEbc = 0;

			this.recipe.fermentables.forEach(fermentable => {

				if(fermentable.volume !== null) {
					
					totalVolume += parseInt(fermentable.volume);
				}
			});

			this.recipe.fermentables.forEach(fermentable => {

				if(fermentable.volume !== null && fermentable.color !== null) {
					
					let percentile = Math.round(parseInt(fermentable.volume) / (totalVolume / 100));
					totalEbc += percentile * parseInt(fermentable.color);
				}
			});

			return totalEbc / 100;
		},
		calculatedAbv() {

			if(this.recipe.og !== null && this.recipe.fg !== null) {
				
				return ABVHelper.calculate(this.recipe.og, this.recipe.fg);
			}

			return null;
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

	.SaveButton {
		display: inline-block;
		width: 100%;
		margin-top: 25px;
		padding: 12px 14px;

        border: none;
		border-radius: 5px;
		
		background: $brown;

		color: $white;
        text-decoration: none;
		font-size: $N;
		
        cursor: pointer;
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

		&.KeyFacts {
			margin-bottom: 25px;
		}

		&.Water {
			
			header {
				@include gradient(#089bd9, #0082c7);
			}
		}
	}
</style>