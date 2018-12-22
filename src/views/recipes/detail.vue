<template>
	<div>
		<h1 class="PageTitle">{{ recipe.name }} ({{ recipe.style }})</h1>

		<div class="Grid">

			<div class="Sidebar">

				<div class="TableContainer">
					<header>Key facts</header>
					<table>
						<tbody>
							<tr 
								class="TableRow"
							>
								<td><strong>Name</strong></td>
								<td>{{ recipe.name }}</td>
							</tr>
							<tr 
								class="TableRow"
							>
								<td><strong>Style</strong></td>
								<td>{{ recipe.style }}</td>
							</tr>
							<tr 
								class="TableRow"
							>
								<td><strong>Boiling time</strong></td>
								<td>{{ recipe.boiling_time }} minutes</td>
							</tr>
							<tr 
								class="TableRow"
							>
								<td><strong>Original gravity(og)</strong></td>
								<td>{{ recipe.og }}</td>
							</tr>
							<tr 
								class="TableRow"
							>
								<td><strong>Final gravity(fg)</strong></td>
								<td>{{ recipe.fg }}</td>
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
								<td>{{ recipe.yeast.volume }} grams</td>
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
								<td><strong>Actual volume</strong></td> 
								<td>{{ recipe.base_volume }} liters</td>
							</tr>
							<tr 
								class="TableRow"
							>
								<td><strong>Mash water</strong></td>
								<td>{{ recipe.mash_water }} liters</td>
							</tr>
							<tr 
								class="TableRow"
							>
								<td><strong>Flush water</strong></td>
								<td>{{ recipe.flush_water }} liters</td>
							</tr>
						</tbody>
					</table>
				</div>

			</div>

			<div class="MainContent">
				<div class="TableContainer Fermentables">
					<header>Fermentables</header>
					<EmptyTable v-if="recipe.fermentables.length === 0">
						Edit this recipe to add fermentables.
					</EmptyTable>
					<table v-else>
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
								<td>{{ fermentable.volume }} grams</td>
							</tr>
						</tbody>
					</table>
				</div>

				<div class="TableContainer Mash">
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
					<table v-else>
						<tbody>
							<tr class="TableRow TableHeader">
								<td>Kind</td>
								<td>Bitterness</td>
								<td>Volume</td>
								<td>Time to boil</td>
							</tr>
							<tr 
								v-for="hop in recipe.hops"
								:key="hop._id"
								class="TableRow"
							>
								<td>{{ hop.name }}</td>
								<td>{{ hop.bitterness.$numberDecimal }}%</td>
								<td>{{ hop.volume }} grams</td>
								<td>{{ hop.boiling_time }} minutes</td>
							</tr>
						</tbody>
					</table>
				</div>

				<div class="TableContainer">
					<header>Other ingredients</header>
					<EmptyTable v-if="recipe.other.length === 0">
						Edit this recipe to add other ingredients.
					</EmptyTable>
					<table v-else>
						<tbody>
							<tr class="TableRow TableHeader">
								<td>Name</td>
								<td>Volume</td>
							</tr>
							<tr 
								v-for="ingredient in recipe.other"
								:key="ingredient._id"
								class="TableRow"
							>
								<td>{{ ingredient.name }}</td>
								<td>{{ ingredient.volume }} grams</td>
							</tr>
						</tbody>
					</table>
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

export default {
	name: 'RecipeDetail',
	components: {
		EBCBadge,
		EmptyTable
	},
	data() {
		return {
			recipe: {}
		}
	},
	computed: {

		calculatedAbv() {

			if(this.recipe.og > 1000 && this.recipe.fg > 1000) {
				
				return ABVHelper.calculate(this.recipe.og, this.recipe.fg) + "%";
			}

			return 0;
		}
	},
	mounted() {

		RecipeRepository.get(this.$route.params.id)
			.then(data => {

				this.recipe = data;
			}).catch(() => {

				document.dispatchEvent(
					new CustomEvent('error_message', {
						detail: {
							message: "Failed to fetch this recipe, please try again later."
						}
					})
				)
			})
	}
}
</script>

<style lang="scss" scoped>

</style>