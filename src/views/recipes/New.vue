<template>
	<div class="recipes">
		<h1 class="PageTitle">New recipe</h1>
		<form 
			@submit.prevent="handleSubmit"
			novalidate
		>
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
										<input type="text" v-model="recipe.name">
									</td>
								</tr>
								<tr
									class="TableRow"
								>
									<td>
										<label class="TopLabel">Style</label>
										<div class="InputWrapper">
											<select
												v-model="recipe.style"
											>
												<option 
													v-for="style in styleCollection"
													:key="style.name"
												>
													{{ style.name }}
												</option>
											</select>
											<i class="fa fa-caret-down SelectBoxIcon" />
										</div>
									</td>
								</tr>
								<tr
									class="TableRow"
								>
									<td>
										<label class="TopLabel">Boiling time</label>
										<div class="InputWrapper">
											<input 
												type="number"
												min="0"
												v-model="recipe.boiling_time"
											>
											<label class="InputLabel">minutes</label>
										</div>
									</td>
								</tr>
								<tr
									class="TableRow"
								>
									<td>
										<label class="TopLabel">Original gravity(og)</label>
										<input 
											type="number"
											min="1000"
											v-model="recipe.og"
										>
									</td>
								</tr>
								<tr
									class="TableRow"
								>
									<td>
										<label class="TopLabel">Final gravity(fg)</label>
										<input 
											type="number"
											min="1000"
											v-model="recipe.fg"
										>
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
											<input 
												type="number"
												min="0"
												step="0.1"
												v-model="recipe.base_volume"
											>
											<label class="InputLabel">liters</label>
										</div>
									</td>
								</tr>
								<tr
									class="TableRow"
								>
									<td>
										<label class="TopLabel">Mash water</label>
										<div class="InputWrapper">
											<input 
												type="number"
												min="0"
												step="0.1"
												v-model="recipe.mash_water"
											>
											<label class="InputLabel">liters</label>
										</div>
									</td>
								</tr>
								<tr
									class="TableRow"
								>
									<td>
										<label class="TopLabel">Flush water</label>
										<div class="InputWrapper">
											<input
												type="number"
												min="0"
												step="0.1"
												v-model="recipe.flush_water"
											>
											<label class="InputLabel">liters</label>
										</div>
									</td>
								</tr>
							</tbody>
						</table>
					</div>

				</div>

				<div class="MainContent Last">

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
										<AutoComplete
											:v-model="recipe.yeast.name"
											@input="recipe.yeast.name = $event"
											:list="yeastCollection"
											:placeholder="'Name'"
										/>
									</td>
									<td>
										<input 
											min="0" 
											type="number" 
											v-model="recipe.yeast.volume.amount"
										/>
										<select
											v-model="recipe.yeast.volume.unit"	
											class="InputLabel"
										>
											<option 
												selected
												value="grams"
											>
												grams
											</option>
											<option>
												millilitres
											</option>
										</select>
										<i class="fa fa-caret-down SelectBoxIcon" />
									</td>
								</tr>
							</tbody>
						</table>
					</div>

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
		<SuccessModal ref="successModal">
			Your changes we're saved successfully.
		</SuccessModal>
	</div>
</template>

<script>
import RepeaterField from '../../components/Form/RepeaterField';
import AutoComplete from '../../components/Form/AutoComplete';
import RecipeRepository from '../../repositories/recipe-repository';
import YeastRepository from '../../repositories/yeast-repository';
import StyleRepository from '../../repositories/style-repository';
import FieldSchema from '../../schema/field-schema';
import ABVHelper from '../../helpers/abv-helper';
import EBCHelper from '../../helpers/ebc-helper';
import IBUHelper from '../../helpers/ibu-helper';
import EBCBadge from '../../components/UI/EBCBadge';
import SuccessModal from '../../components/UI/SuccessModal';

export default {
	name: 'NewRecipe',
	components: {
		EBCBadge,
		RepeaterField,
		AutoComplete,
		SuccessModal
	},
	data() {
		return {
			recipe: {
				name: '',
				style: '',
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
					usage: {
						amount: null,
						unit: 'minutes/boil'
					}
				}],
				fermentables: [{
					name: '',
					color: null,
					volume: null
				}],
				other: [{
					name: '',
					volume: null,
					usage: {
						amount: null,
						unit: 'minutes/boil'
					}
				}],
				yeast: {
					name: '',
					volume: {
						amount: null,
						unit: 'grams'
					}
				}
			},
			schemas: FieldSchema
		}
	},
	computed: {

		styleCollection() {

			return StyleRepository.getAll();
		},
		yeastCollection() {

			return YeastRepository.getAll();
		},
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

					this.$refs.successModal.showModal();
				}).catch(() => {

					document.dispatchEvent(
						new CustomEvent('error_message', {
							detail: {
								type: "DATA_INSERTION_ERROR"
							}
						})
					)
				})
		}
	}
}
</script>