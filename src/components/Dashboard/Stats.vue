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

		display: flex;
		flex-direction: column;
		list-style-type: none;
		margin: 0;
		padding: 0;

		@include Breakpoint(Large, ExtraLarge) {
			flex-direction: row;
		}

		li {
			position: relative;
			overflow: hidden;

			flex: 0 0 32%;

			padding: 15px 15px 45px;
			margin: 0 0 20px 0;

			background: $white;
			border-radius: 5px;
            @include shadow();
			@include gradient(#773f19, #a26a44);

			color: $white;

			@include Breakpoint(Large, ExtraLarge) {
				margin: 0 2% 20px 0;
			}
            
            &:last-child {
                margin-right: 0;
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

				background: rgba(0,0,0,0.1);

				color: $white;
				font-size: $SN;
			}

			&:first-child {

				@include gradient(#7a7453, #9c956d);
			}

			&:last-child {

				@include gradient(#afc40c, #c6db20);
			}
		}
	}
</style>