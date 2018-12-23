<template>
	<div class="recipes">
		<h1 class="PageTitle">New recipe</h1>
		<form @submit.prevent="handleSubmit">
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

				<div class="MainContent">

					<RepeaterField 
						:schema="this.schemas.fermentableSchema"
						v-model="this.recipe.fermentables" 
					/>
					<RepeaterField 
						:schema="this.schemas.mashSchema"
						v-model="this.recipe.mash" 
					/>
					<RepeaterField 
						:schema="this.schemas.hopSchema"
						v-model="this.recipe.hops" 
					/>
					<RepeaterField 
						:schema="this.schemas.otherSchema"
						v-model="this.recipe.other" 
					/>
					<button 
						type="submit" 
						class="Button Brown FullWidth"
					>
						Save recipe
					</button>

				</div>

			</div>
		</form>
	</div>
</template>

<script>
import RepeaterField from '../../components/Form/RepeaterField';
import RecipeRepository from '../../repositories/recipe-repository';
import FieldSchema from '../../schema/field-schema';
import ABVHelper from '../../helpers/abv-helper';
import EBCHelper from '../../helpers/ebc-helper';
import IBUHelper from '../../helpers/ibu-helper';
import EBCBadge from '../../components/UI/EBCBadge';

export default {
	name: 'NewRecipe',
	components: {
		EBCBadge,
		RepeaterField
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
			},
			schemas: FieldSchema
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