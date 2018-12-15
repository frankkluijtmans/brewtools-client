<template>
	<div>
		<h1 class="PageTitle">{{ recipe.name }}</h1>

		<div class="Grid">
			<div class="MainContent">
				<div class="OverviewTable Grains">
					<header>Grains</header>
					<table>
						<tbody>
							<tr class="TableRow TableHeader">
								<td>Malt</td>
								<td>Color</td>
								<td>Volume</td>
							</tr>
							<tr 
								v-for="grain in recipe.grains"
								:key="grain._id"
								class="TableRow"
							>
								<td>{{ grain.name }}</td>
								<td>{{ grain.color }} EBC</td>
								<td>{{ grain.volume }} gram</td>
							</tr>
						</tbody>
					</table>
				</div>

				<div class="OverviewTable Hops">
					<header>Hops</header>
					<table>
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
								<td>{{ hop.volume }} gram</td>
								<td>{{ hop.boiling_time }} minutes</td>
							</tr>
						</tbody>
					</table>
				</div>
			</div>

			<div class="Sidebar">
				<div class="SwitchableContent">
					<nav>
						<a class="Active">Ingredients</a>
						<a>Timeline</a>  
					</nav>
					<div class="Content">
						Hier komt content
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
import RecipeRepository from '../../repositories/recipe-repository';

export default {
	name: 'RecipeDetail',
	data() {
		return {
			recipe: {}
		}
	},
	mounted() {

		RecipeRepository.get(this.$route.params.id)
			.then(data => {

				this.recipe = data;
			})
	}
}
</script>

<style lang="scss" scoped>
	@import '../../styles/_variables';
	@import '../../styles/_mixins';

	.SwitchableContent {
		border-radius: 5px;
		background: $white;
		box-shadow: 0 1px 1px rgba(0,0,0,.05);
		overflow: hidden;

		nav {
			color: $dark-color;
			border-bottom: 1px solid $light-color;

			a {
				display: inline-block;
				padding: 13px;
				font-size: $N;
				cursor: pointer;

				&.Active {
					border-bottom: 4px solid $primary-color;
				}
			}
		}

		.Content {
			padding: 15px;
		}
	}

	.OverviewTable {

		&.Grains {
			margin-bottom: 25px;

			header {
				@include gradient(#773f19, #a26a44);
			}
		}

		&.Hops {
			
			header {
				@include gradient(#afc40c, #c6db20);
			}
		}
	}
</style>