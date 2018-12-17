<template>
	<div class="recipes">
		<h1 class="PageTitle">New recipe</h1>
		<form @submit.prevent="handleSubmit">
			<div class="Grid">
				<div class="MainContent">
					<div class="TableContainer Fermentables">
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
											<input type="number" v-model="fermentable.color">
											<label class="InputLabel">EBC</label>
										</td>
										<td>
											<input type="number" v-model="fermentable.volume">
											<label class="InputLabel">grams</label>
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
								class="Button Add"
							><i class="fas fa-plus" /> Add a grain</button>
						</footer>
					</div>

					<div class="TableContainer Hops">
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
											<input type="number" step="0.01" v-model="hop.bitterness">
											<label class="InputLabel">%</label>
										</td>
										<td>
											<input type="number" v-model="hop.volume">
											<label class="InputLabel">grams</label>
										</td>
										<td>
											<input type="number" v-model="hop.boiling_time">
											<label class="InputLabel">minutes</label>
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
								class="Button Add"
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
					<div class="TableContainer KeyFacts">
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
										<label class="InputLabel">minutes</label>
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
							<ul class="CalculatedKeyFacts">
								<li>
									{{ calculatedEbc }}
									<footer>EBC</footer>
								</li>
								<li>
									0
									<footer>IBU</footer>
								</li>
								<li>
									{{ calculatedAbv }}
									<footer>ABV</footer>
								</li>	
							</ul>
						</footer>
					</div>

					<div class="TableContainer Water">
						<header>Water</header>
						<table>
							<tbody>
								<tr
									class="TableRow"
								>
									<td>
										<input type="number" v-model="recipe.base_volume" placeholder="Actual volume">
										<label class="InputLabel">liter</label>
									</td>
								</tr>
								<tr
									class="TableRow"
								>
									<td>
										<input type="number" v-model="recipe.mash_water" placeholder="Mash water">
										<label class="InputLabel">liter</label>
									</td>
								</tr>
								<tr
									class="TableRow"
								>
									<td>
										<input type="number" v-model="recipe.flush_water" placeholder="Flush water">
										<label class="InputLabel">liter</label>
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
import EBCHelper from '../../helpers/ebc-helper';

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
	computed: {

		calculatedEbc() {

			return EBCHelper.calculate(this.recipe.fermentables);
		},
		calculatedAbv() {

			if(this.recipe.og !== null && this.recipe.fg !== null) {
				
				return ABVHelper.calculate(this.recipe.og, this.recipe.fg) + "%";
			}

			return 0;
		}
	},
	methods: {

		handleSubmit() {

			this.recipe.ebc = this.calculatedEbc;

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
	
	.CalculatedKeyFacts {
		display: flex;
		width: 100%;
		flex-direction: row;
		list-style-type: none;
		margin: 0;
		padding: 0;

		li {
			flex: 0 0 33.3%;
			color: $extradark-color;
			text-align: center;
			font-size: $XL;
			font-weight: bold;

			footer {
				border-top: none;
				color: $semidark-color;
				text-align: center;
				font-weight: normal;
			}
		}
	}
</style>