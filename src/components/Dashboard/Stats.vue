<template>
    <ul class="DashboardStats">
        <li>
			<i class="fa fa-line-chart"></i>
            <span>{{ createdRecipes }}</span>
            <footer>Total recipes created</footer>
        </li>
		<li>
			<i class="fa fa-line-chart"></i>
            <span>{{ sharedRecipes }}</span>
            <footer>Total recipes shared</footer>
        </li>
        <li>
			<i class="fa fa-line-chart"></i>
            <span>{{ averageRecipeEBC }}</span>
            <footer>Average recipe EBC</footer>
        </li>
        <li>
			<i class="fa fa-line-chart"></i>
            <span>{{ averageRecipeIBU }}</span>
            <footer>Average recipe IBU</footer>
        </li>
    </ul>
</template>

<script>
export default {
	name: 'Stats',
	props: {
        recipes: {
            type: Array,
            default: () => []
        }
    },
	computed: {

		username: function () {

			return this.$keycloak.fullName.split(" ")[0];
		},
		createdRecipes: function() {

			return this.recipes.filter(recipe => recipe.owner.email === this.$keycloak.userName).length;
		},
		sharedRecipes: function() {

			return this.recipes.filter(recipe => recipe.owner.email !== this.$keycloak.userName).length;
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

			flex: 1;

			padding: 15px 15px 45px;
			margin: 0 0 20px 0;

			background: $white;
			border-radius: 5px;
            @include shadow();
			@include gradient($primary-color, $secondary-color);

			color: $white;

			@include Breakpoint(Large, ExtraLarge) {
				margin: 0 20px 20px 0;
			}
            
            &:last-child {
                margin-right: 0;
			}
			
			i {
				position: absolute;
				top: 0;
				right: -12px;

				color: #f4c93a;
				font-size: 5rem;
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
		}
	}
</style>