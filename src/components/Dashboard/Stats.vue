<template>
    <ul class="DashboardStats">
        <li>
            <span>{{ createdRecipes }}</span>
            <footer>Total recipes created</footer>
        </li>
        <li>
            <span>{{ averageRecipeEBC }}</span>
            <footer>Average recipe EBC</footer>
        </li>
        <li>
            <span>{{ averageRecipeIBU }}</span>
            <footer>Average recipe IBU</footer>
        </li>
    </ul>
</template>

<script>
import RecipeRepository from '../../repositories/recipe-repository';

export default {
	name: 'Stats',
	data() {
		return {
			recipes: []
		}
	},
	computed: {

		username: function () {

			return this.$keycloak.fullName.split(" ")[0];
		},
		createdRecipes: function() {

			return this.recipes.filter(recipe => recipe.owner.email === this.$keycloak.userName).length;
		},
		averageRecipeEBC: function() {

			let totalEBC = 0;

			this.recipes.forEach(recipe => {

				totalEBC += parseInt(recipe.ebc);
			})

			if(this.recipes.length > 0) {
				
				return Math.round(totalEBC / this.recipes.length);
			}

			return 0;
		},
		averageRecipeIBU: function() {

			let totalIBU = 0;

			this.recipes.forEach(recipe => {

				totalIBU += parseInt(recipe.ibu);
			})

			if(this.recipes.length > 0) {

				return Math.round(totalIBU / this.recipes.length);
			}

			return 0;
		},
	},
	mounted() {
			
		RecipeRepository.getAll()
			.then(response => {
				
				this.recipes = response;
			})
	}
}
</script>

<style lang="scss" scoped>
	@import '../../styles/_variables';
    @import '../../styles/_mixins';

	.DashboardStats {

		list-style-type: none;
		margin: 0;
		padding: 0;

		li {
			position: relative;
			overflow: hidden;

			padding: 15px 15px 45px;
			margin-bottom: 25px;

			background: $white;
			border-radius: 5px;
            @include shadow();
            
            &:last-child {
                margin-bottom: 0;
            }

			span {
				font-size: $XXL;
				font-weight: 500;
			}

			footer {
				position: absolute;
				bottom: 0;
				left: 0;

				width: 100%;
				padding: 8px 15px;
				margin-top: 10px;

				@include gradient(#773f19, #a26a44);

				color: $white;
				font-size: $SN;
			}

			&:first-child {

				footer {
					@include gradient(#7a7453, #9c956d);
				}
			}

			&:last-child {

				footer {
					@include gradient(#afc40c, #c6db20);
				}
			}
		}
	}
</style>