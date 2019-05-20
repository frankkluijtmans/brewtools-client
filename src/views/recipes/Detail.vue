<template>
	<div v-if="!loaded">
		<PageError v-if="error" />
		<PageLoader v-else />
	</div>
	<div v-else>
		<h1 class="PageTitle">
			{{ recipe.name }} {{ fraction }}
			<div class="Actions">
				<button 
					@click="printRecipe()"
					class="Button Blue"
				>
					<i class="fa fa-print"></i>	Print
				</button>
				<router-link 
					:to="'/recipes/edit/' + recipe._id"
					tag="button"
					class="Button"
				>
					<i class="fa fa-edit"></i>	Edit
				</router-link>
			</div>
		</h1>

		<div class="Grid">

			<div class="Sidebar">

				<div class="TableContainer">
					<header>Key facts</header>
					<table>
						<tbody>
							<tr 
								class="TableRow"
							>
								<td>
									<label class="TopLabel">Name</label>
									<div class="InputWrapper">
										{{ recipe.name }}
									</div>
								</td>
							</tr>
							<tr 
								class="TableRow"
							>
								<td>
									<label class="TopLabel">Style</label>
									<div class="InputWrapper">
										{{ recipe.style }}
									</div>
								</td>
							</tr>
							<tr 
								class="TableRow"
							>
								<td>
									<label class="TopLabel">Boiling time</label>
									<div class="InputWrapper">
										{{ recipe.boiling_time }} minutes
									</div>
								</td>
							</tr>
							<tr 
								class="TableRow"
							>
								<td>
									<label class="TopLabel">Original gravity(og)</label>
									<div class="InputWrapper">
										{{ recipe.og }}
									</div>
								</td>
							</tr>
							<tr 
								class="TableRow"
							>
								<td>
									<label class="TopLabel">Final gravity(fg)</label>
									<div class="InputWrapper">
										{{ recipe.fg }}
									</div>
								</td>
							</tr>
						</tbody>
					</table>
					<footer>
						<ul class="CalculatedKeyFacts">
							<li>
								{{ recipe.ebc }}
								<EBCBadge :ebc="recipe.ebc" /> 
								<footer>EBC</footer>
							</li>
							<li>
								{{ recipe.ibu }}
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
									<label class="TopLabel">Final volume</label>
									<div class="InputWrapper">
										{{ volume }} liters
										<button
											@mousedown="increaseRecipeVolume"
											class="InlineButton"
										>
											<i class="fa fa-plus" />
										</button>
										<button 
											@mousedown="decreaseRecipeVolume"
											class="InlineButton"
										>
											<i class="fa fa-minus" />
										</button>
									</div>
								</td>
							</tr>
							<tr 
								class="TableRow"
							>
								<td>
									<label class="TopLabel">Mash water</label>
									<div class="InputWrapper">
										{{ Math.round( fraction * mashWater ) }} liters
									</div>
								</td>
							</tr>
							<tr 
								class="TableRow"
							>
								<td>
									<label class="TopLabel">Flush water</label>
									<div class="InputWrapper">
										{{ Math.round( fraction * flushWater ) }} liters
									</div>
								</td>
							</tr>
						</tbody>
					</table>
				</div>

			</div>

			<div class="MainContent Last">

				<div class="TableContainer Fermentables">
					<header>Fermentables</header>
					<EmptyTable v-if="recipe.fermentables.length === 0">
						Edit this recipe to add fermentables.
					</EmptyTable>
					<div
						v-else
						class="ResponsiveTable"
					>
						<table>
							<tbody>
								<tr class="TableRow TableHeader">
									<td>Malt</td>
									<td>Color</td>
									<td>Volume</td>
								</tr>
								<tr 
									v-for="fermentable in recipe.fermentables"
									:key="fermentable._id"
									class="TableRow"
								>
									<td>{{ fermentable.name }}</td>
									<td>{{ fermentable.color }} EBC</td>
									<td>{{ scaleIngredient(fermentable.volume) }}  grams</td>
								</tr>
							</tbody>
						</table>
					</div>
				</div>

				<div class="TableContainer MashingSteps">
					<header>Mashing steps</header>
					<EmptyTable v-if="recipe.mash.length === 0">
						Edit this recipe to add mashing steps.
					</EmptyTable>
					<table v-else>
						<tbody>
							<tr class="TableRow TableHeader">
								<td>Temperature</td>
								<td>Duration</td>
							</tr>
							<tr 
								v-for="step in recipe.mash"
								:key="step._id"
								class="TableRow"
							>
								<td>{{ step.temperature }} °C</td>
								<td>{{ step.duration }} minutes</td>
							</tr>
						</tbody>
					</table>
				</div>

				<div class="TableContainer Hops">
					<header>Hops</header>
					<EmptyTable v-if="recipe.hops.length === 0">
						Edit this recipe to add hops.
					</EmptyTable>
					<div
						v-else
						class="ResponsiveTable"
					>
						<table>
							<tbody>
								<tr class="TableRow TableHeader">
									<td>Kind</td>
									<td>Bitterness</td>
									<td>Volume</td>
									<td>Usage</td>
								</tr>
								<tr 
									v-for="hop in recipe.hops"
									:key="hop._id"
									class="TableRow"
								>
									<td>{{ hop.name }}</td>
									<td>{{ hop.bitterness }}%</td>
									<td>{{ scaleIngredient(hop.volume) }} grams</td>
									<td>{{ hop.usage.amount }} {{ hop.usage.unit }}</td>
								</tr>
							</tbody>
						</table>
					</div>
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
								<td>{{ recipe.yeast.name }}</td>
								<td>{{ scaleIngredient(recipe.yeast.volume.amount) }} {{ recipe.yeast.volume.unit }}</td>
							</tr>
						</tbody>
					</table>
				</div>

				<div class="TableContainer">
					<header>Other ingredients</header>
					<EmptyTable v-if="recipe.other.length === 0">
						Edit this recipe to add other ingredients.
					</EmptyTable>
					<div
						v-else
						class="ResponsiveTable"
					>
						<table>
							<tbody>
								<tr class="TableRow TableHeader">
									<td>Name</td>
									<td>Volume</td>
									<td>Usage</td>
								</tr>
								<tr 
									v-for="ingredient in recipe.other"
									:key="ingredient._id"
									class="TableRow"
								>
									<td>{{ ingredient.name }}</td>
									<td>{{ scaleIngredient(ingredient.volume) }} grams</td>
									<td>{{ ingredient.usage.amount }} {{ ingredient.usage.unit }}</td>
								</tr>
							</tbody>
						</table>
					</div>
				</div>

			</div>

		</div>
	</div>
</template>

<script>
import RecipeRepository from '../../repositories/recipe-repository';
import ABVHelper from '../../helpers/abv-helper';
import EBCBadge from '../../components/UI/EBCBadge';
import EmptyTable from '../../components/UI/EmptyTable';
import PageError from '../../components/UI/PageError';
import PageLoader from '../../components/UI/PageLoader';

export default {
	name: 'RecipeDetail',
	components: {
		EBCBadge,
		EmptyTable,
		PageError,
		PageLoader
	},
	data() {
		return {
			recipe: {},
			volume: 0,
			loaded: false,
			error: false
		}
	},
	computed: {

		calculatedAbv() {

			if(this.recipe.og > 1000 && this.recipe.fg > 1000) {
				
				return ABVHelper.calculate(this.recipe.og, this.recipe.fg) + "%";
			}

			return 0;
		},
		mashWater() {

			return Math.round((this.volume / this.recipe.base_volume) * this.recipe.mash_water);
		},
		flushWater() {

			return Math.round((this.volume / this.recipe.base_volume) * this.recipe.flush_water);
		},
		fraction() {

			const evaporationPerHour = 3;
			const absLoss = (this.recipe.boiling_time / 60) * evaporationPerHour;
			const netLossPercentage = absLoss / (this.mashWater + this.flushWater) * 100;
			const waterWithoutEvaporatedPart = (100 - netLossPercentage) * (this.mashWater + this.flushWater);
			const waterWithEvaporatedPart = waterWithoutEvaporatedPart + absLoss;
			
			return (waterWithEvaporatedPart / (this.mashWater + this.flushWater)) / 100;
		}
	},
	mounted() {

		RecipeRepository.get(this.$route.params.id)
			.then(data => {

				this.recipe = data;
				this.volume = data.base_volume;
				this.loaded = true;
			}).catch(() => {

				document.dispatchEvent(
					new CustomEvent('error_message', {
						detail: {
							type: "DATA_RETRIEVAL_ERROR"
						}
					})
				)

				this.error = true;
			})
	},
	methods: {

		printRecipe() {

			window.print();
		},
		increaseRecipeVolume() {

			this.volume++;
		},
		decreaseRecipeVolume() {

			this.volume--;
		},
		scaleIngredient(value) {

			return Math.round((value / this.recipe.base_volume * this.volume) * this.fraction);
		}
	}
}
</script>
