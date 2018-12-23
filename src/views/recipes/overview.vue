<template>
	<div v-if="!loaded">
		<PageError v-if="error" />
		<PageLoader v-else />
	</div>
	<div v-else>
		<h1 class="PageTitle">Your recipes</h1>
		<div class="TableContainer">
			<header>Overview</header>
			<EmptyTable v-if="recipes.length === 0">
				Start creating some recipes to fill up this overview.
			</EmptyTable>
			<table v-else>
				<tbody>
					<tr class="TableRow TableHeader">
						<td @click="sortRecipes('name')" class="Sortable">
							Recipe <i class="fa fa-sort"></i>
						</td>
						<td @click="sortRecipes('style')" class="Sortable">
							Style <i class="fa fa-sort"></i>
						</td>
						<td @click="sortRecipes('abv')" class="Sortable">
							ABV <i class="fa fa-sort"></i>
						</td>
						<td @click="sortRecipes('lastEdited')" class="Sortable">
							Last edited <i class="fa fa-sort"></i>
						</td>
						<td>
							Actions
						</td>
					</tr>
					<tr
						v-for="recipe in recipes"
						:key="recipe._id"
						class="TableRow"
					>
						<td class="RecipeTitle">
							<EBCBadge :ebc="recipe.ebc" />
							{{ recipe.name }}
							<i
								v-if="!isOwner(recipe.owner)"
							>
								(Shared)
							</i>
						</td>
						<td>{{ recipe.style }}</td>
						<td>{{ calculateABV(recipe.og, recipe.fg ) }}%</td>
						<td>{{ parseDate(recipe.last_edited.date) }}</td>
						<td class="Buttons">
							<router-link
								:to='"/recipes/detail/" + recipe._id'
								class="ActionButton Blue"
							>
								<i class="fa fa-eye" /> View
							</router-link>
							<router-link 
								:to='"/recipes/edit/" + recipe._id'
								class="ActionButton Blue"
							>
								<i class="fa fa-edit" /> Edit
							</router-link>
							<a
								@click="deleteRecipe(recipe._id)"
								v-if="isOwner(recipe.owner)"
								class="ActionButton Red"
							>
								<i class="fa fa-trash" /> Delete
							</a>
						</td>
					</tr>
				</tbody>
			</table>
			<footer>
				<router-link to="/recipes/new" class="ActionButton Large New">
					<i class="fa fa-plus" /> Create a new recipe
				</router-link>
			</footer>
		</div>
		<ConfirmModal ref="confirmDelete">
			Do you really want to delete this recipe? This process cannot be undone.
		</ConfirmModal>
	</div>
</template>

<script>
import PageError from '../../components/UI/PageError';
import PageLoader from '../../components/UI/PageLoader';
import ConfirmModal from '../../components/UI/ConfirmModal';
import EmptyTable from '../../components/UI/EmptyTable';
import EBCBadge from '../../components/UI/EBCBadge';
import RecipeRepository from '../../repositories/recipe-repository';
import ABVHelper from '../../helpers/abv-helper';
import SortingHelper from '../../helpers/sorting-helper';
import moment from 'moment';

export default {
	name: 'recipes-overview',
	components: {
		PageError,
		PageLoader,
		ConfirmModal,
		EmptyTable,
		EBCBadge
	},
	data: function() {

		return {
			recipes: [],
			loaded: false,
			error: false,
			animateIn: false
		}
	},
	mounted() {

		RecipeRepository.getAll()
			.then(response => {

				this.recipes = response;
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

		deleteRecipe: function(id) {

			this.$refs.confirmDelete.showModal().then(() => {

				RecipeRepository.delete(id)
					.then(() => {
						
						for (let i = this.recipes.length - 1; i >= 0; --i) {

							if (this.recipes[i]._id == id) {
								
								this.recipes.splice(i,1);
							}
						}
					}).catch(() => {

						document.dispatchEvent(
							new CustomEvent('error_message', {
								detail: {
									type: "OPERATION_FORBIDDEN_ERROR"
								}
							})
						)
					})
			});
		},
		sortRecipes: function(type) {

			this.recipes.sort(SortingHelper[type]);
		},
		parseDate: function(date) {

			return moment(date).format("DD MMM YYYY") + " at " + moment(date).format("HH:mm");
		},
		calculateABV: function(og, fg) {

			return ABVHelper.calculate(og, fg);
		},
		isOwner: function(user) {

			return user === this.$keycloak.userName;
		}
	}
}
</script>

<style lang="scss">
	@import '../../styles/_tables';
	@import '../../styles/_buttons';

	.ActionButton {

		&.New {
			font-size: $N;
		}
	}
</style>