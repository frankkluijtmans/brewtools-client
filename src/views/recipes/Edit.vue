<template>
	<div v-if="!loaded">
		<PageError v-if="error" />
		<PageLoader v-else />
	</div>
	<div 
		v-else 
		class="recipes"
	>
		<h1 class="PageTitle">
			Edit {{ recipe.name }}
			<div class="Actions">
				<button 
					@click="openInviteModal()"
					class="Button Blue"
				>
					<i class="fa fa-user-plus"></i>	Invite collaborators
				</button>
			</div>
		</h1>
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
										<input type="text" v-model="recipe.name" placeholder="Name">
									</td>
								</tr>
								<tr
									class="TableRow"
								>
									<td>
										<select
											v-model="recipe.style"
										>
											<option 
												disabled
												selected
												value=''
											>
												Style
											</option>
											<option 
												v-for="style in styleCollection"
												:key="style.name"
											>
												{{ style.name }}
											</option>
										</select>
										<i class="fa fa-caret-down SelectBoxIcon" />
									</td>
								</tr>
								<tr
									class="TableRow"
								>
									<td>
										<input 
											type="number"
											min="0"
											v-model="recipe.boiling_time"
											placeholder="Boiling time"
										>
										<label class="InputLabel">minutes</label>
									</td>
								</tr>
								<tr
									class="TableRow"
								>
									<td>
										<input 
											type="number"
											min="1000"
											v-model="recipe.og"
											placeholder="Original gravity(og)"
										>
									</td>
								</tr>
								<tr
									class="TableRow"
								>
									<td>
										<input 
											type="number"
											min="1000"
											v-model="recipe.fg"
											placeholder="Final gravity(fg)"
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
										<input 
											type="number"
											min="0"
											step="0.1"
											v-model="recipe.base_volume" 
											placeholder="Actual volume"
										>
										<label class="InputLabel">liters</label>
									</td>
								</tr>
								<tr
									class="TableRow"
								>
									<td>
										<input 
											type="number"
											min="0"
											step="0.1"
											v-model="recipe.mash_water"
											placeholder="Mash water"
										>
										<label class="InputLabel">liters</label>
									</td>
								</tr>
								<tr
									class="TableRow"
								>
									<td>
										<input
											type="number"
											min="0"
											step="0.1"
											v-model="recipe.flush_water"
											placeholder="Flush water"
										>
										<label class="InputLabel">liters</label>
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
		<InviteModal 
			:users="this.recipe.collaborators"
			:recipe_id="this.recipe._id"
			ref="inviteModal" 
		/>
	</div>
</template>

<script>
import PageError from '../../components/UI/PageError';
import PageLoader from '../../components/UI/PageLoader';
import RepeaterField from '../../components/Form/RepeaterField';
import AutoComplete from '../../components/Form/AutoComplete';
import RecipeRepository from '../../repositories/recipe-repository';
import YeastRepository from '../../repositories/yeast-repository';
import StyleRepository from '../../repositories/style-repository';
import FieldSchema from '../../schema/field-schema';
import ABVHelper from '../../helpers/abv-helper';
import EBCHelper from '../../helpers/ebc-helper';
import IBUHelper from '../../helpers/ibu-helper';
import InviteModal from '../../components/UI/InviteModal';
import EBCBadge from '../../components/UI/EBCBadge';

export default {
	name: 'NewRecipe',
	components: {
		EBCBadge,
		RepeaterField,
		AutoComplete,
		InviteModal,
		PageError,
		PageLoader
	},
	data() {
		return {
			recipe: {},
			loaded: false,
			error: false,
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
	mounted() {

		RecipeRepository.get(this.$route.params.id)
			.then(data => {

				this.recipe = data;
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

		handleSubmit() {

			this.recipe.ebc = this.calculatedEbc;
			this.recipe.ibu = this.calculatedIbu;

			RecipeRepository.update(this.recipe, this.recipe._id)
				.then(() => {
					alert('recipe saved');
				})
		},
		openInviteModal() {

			this.$refs.inviteModal.showModal();
		}
	}
}
</script>
