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
									<td>Name</td>
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
										<td class="RemoveFields">
											<a 
												@click="recipe.fermentables.splice(index, 1)"
												type="button"
											><i class="fa fa-trash" /></a>
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
							><i class="fa fa-plus" /> Add a grain</button>
						</footer>
					</div>

					<div class="TableContainer Mash">
						<header>Mashing steps</header>
						<table>
							<tbody>
								<tr class="TableRow TableHeader">
									<td>Temperature</td>
									<td>Duration</td>
									<td></td>
								</tr>
								<template 
									v-for="(step, index) in recipe.mash"
								>
									<tr 
										:key="index"
										class="TableRow"
									>
										<td>
											<input type="number" v-model="step.temperature">
											<label class="InputLabel">°C</label>
										</td>
										<td>
											<input type="number" v-model="step.duration">
											<label class="InputLabel">minutes</label>
										</td>
										<td class="RemoveFields">
											<a 
												@click="recipe.mash.splice(index, 1)"
												type="button"
											><i class="fa fa-trash" /></a>
										</td>
									</tr>
								</template>
							</tbody>
						</table>
						<footer>
							<button
								@click="recipe.mash.push({
									name: '',
									color: null,
									volume: null
								})"
								type="button"
								class="Button Add"
							><i class="fa fa-plus" /> Add a step</button>
						</footer>
					</div>

					<div class="TableContainer Hops">
						<header>Hops</header>
						<table>
							<tbody>
								<tr class="TableRow TableHeader">
									<td>Name</td>
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
										<td class="RemoveFields">
											<a 
												@click="recipe.hops.splice(index, 1)"
												type="button"
											><i class="fa fa-trash" /></a>
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
							><i class="fa fa-plus" /> Add a hop</button>
						</footer>
					</div>

					<div class="TableContainer">
						<header>Other ingredients</header>
						<table>
							<tbody>
								<tr class="TableRow TableHeader">
									<td>Name</td>
									<td>Volume</td>
									<td></td>
								</tr>
								<template 
									v-for="(ingredient, index) in recipe.other"
								>
									<tr 
										:key="index"
										class="TableRow"
									>
										<td>
											<input type="text" v-model="ingredient.name" placeholder="Name">
										</td>
										<td>
											<input type="number" v-model="ingredient.volume">
											<label class="InputLabel">grams</label>
										</td>
										<td class="RemoveFields">
											<a 
												@click="recipe.other.splice(index, 1)"
												type="button"
											><i class="fa fa-trash" /></a>
										</td>
									</tr>
								</template>
							</tbody>
						</table>
						<footer>
							<button
								@click="recipe.other.push({
									name: '',
									volume: null
								})"
								type="button"
								class="Button Add"
							><i class="fa fa-plus" /> Add an ingredient</button>
						</footer>
					</div>

					<button 
						type="submit" 
						class="SaveButton"
					>
						Save recipe
					</button>
				</div>

				<div class="Sidebar">
					<div class="TableContainer">
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
										<input type="number" v-model="recipe.og" placeholder="Original gravity(og)">
									</td>
								</tr>
								<tr
									class="TableRow"
								>
									<td>
										<input type="number" v-model="recipe.fg" placeholder="Final gravity(fg)">
									</td>
								</tr>
							</tbody>
						</table>
						<footer>
							<ul class="CalculatedKeyFacts">
								<li>
									{{ calculatedEbc }}
									<EBCBadge v-if="calculatedEbc > 0" :ebc="calculatedEbc" /> 
									<footer>EBC</footer>
								</li>
								<li>
									{{ calculatedIbu }}
									<footer>IBU</footer>
								</li>
								<li>
									{{ calculatedAbv }}
									<footer>ABV</footer>
								</li>	
							</ul>
						</footer>
					</div>

					<div class="TableContainer Yeast">
						<header>Yeast</header>
						<table>
							<tbody>
								<tr class="TableRow TableHeader">
									<td>Name</td>
									<td>Volume</td>
								</tr>
								<tr
									class="TableRow"
								>
									<td>
										<input type="text" v-model="recipe.yeast.name" placeholder="Name">
									</td>
									<td>
										<input type="number" v-model="recipe.yeast.volume">
										<label class="InputLabel">grams</label>
									</td>
								</tr>
							</tbody>
						</table>
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
										<label class="InputLabel">liters</label>
									</td>
								</tr>
								<tr
									class="TableRow"
								>
									<td>
										<input type="number" v-model="recipe.mash_water" placeholder="Mash water">
										<label class="InputLabel">liters</label>
									</td>
								</tr>
								<tr
									class="TableRow"
								>
									<td>
										<input type="number" v-model="recipe.flush_water" placeholder="Flush water">
										<label class="InputLabel">liters</label>
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
import IBUHelper from '../../helpers/ibu-helper';
import EBCBadge from '../../components/UI/EBCBadge';

export default {
	name: 'NewRecipe',
	components: {
		EBCBadge
	},
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
				mash: [{
					temperature: null,
					duration: null
				}],
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
				other: [{
					name: '',
					volume: null
				}],
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
		calculatedIbu() {

			return IBUHelper.calculate(this.recipe.og, this.recipe.hops, this.recipe.base_volume);
		},
		calculatedAbv() {

			if(this.recipe.og > 1000 && this.recipe.fg > 1000) {
				
				return ABVHelper.calculate(this.recipe.og, this.recipe.fg) + "%";
			}

			return 0;
		}
	},
	methods: {

		handleSubmit() {

			this.recipe.ebc = this.calculatedEbc;
			this.recipe.ibu = this.calculatedIbu;

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
		height: 50px;
		padding: 0 18px;

        border: none;
		border-radius: 5px;
		
		@include gradient($brown, #70401f);
		box-shadow: 1px 1px 3px $light-color;

		color: $white;
        text-decoration: none;
		font-size: $N;
		font-weight: normal;
		
        cursor: pointer;
	}
</style>