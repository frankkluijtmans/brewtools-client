<template>
	<div class="Page">
		<h1 class="PageTitle">Triple nipple</h1>

		<div class="Grid">
			<div class="MainContent">
				<div class="OverviewTable Mash">
					<header>Mash</header>
					<div class="TableRow TableHeader">
						<span class="Flex-33">Malt <i class="fas fa-sort"></i></span>
						<span class="Flex-33">Color <i class="fas fa-sort"></i></span>
						<span class="Flex-33">Volume <i class="fas fa-sort"></i></span>
					</div>
					<div class="TableRow">
						<span class="Flex-33">Pilsener</span>
						<span class="Flex-33">8 EBC</span>
						<span class="Flex-33">4500 gram</span>
					</div>
					<div class="TableRow">
						<span class="Flex-33">Caramunich</span>
						<span class="Flex-33">120 EBC</span>
						<span class="Flex-33">1200 gram</span>
					</div>
					<div class="TableRow">
						<span class="Flex-33">Roasted malt</span>
						<span class="Flex-33">1200 EBC</span>
						<span class="Flex-33">80 gram</span>
					</div>
				</div>

				<div class="OverviewTable Hops">
					<header>Hops</header>
					<div class="TableRow TableHeader">
						<span class="Flex-25">Kind <i class="fas fa-sort"></i></span>
						<span class="Flex-25">Bitterness <i class="fas fa-sort"></i></span>
						<span class="Flex-25">Volume <i class="fas fa-sort"></i></span>
						<span class="Flex-25">Time to boil <i class="fas fa-sort"></i></span>
					</div>
					<div class="TableRow">
						<span class="Flex-25">Cascade</span>
						<span class="Flex-25">5,2%</span>
						<span class="Flex-25">45 gram</span>
						<span class="Flex-25">60 minutes</span>
					</div>
					<div class="TableRow">
						<span class="Flex-25">Mt. Hood</span>
						<span class="Flex-25">8%</span>
						<span class="Flex-25">12 gram</span>
						<span class="Flex-25">60 minutes</span>
					</div>
					<div class="TableRow">
						<span class="Flex-25">Tettnanger</span>
						<span class="Flex-25">6,7%</span>
						<span class="Flex-25">33 gram</span>
						<span class="Flex-25">30 minutes</span>
					</div>
					<div class="TableRow">
						<span class="Flex-25">Magnum</span>
						<span class="Flex-25">11%</span>
						<span class="Flex-25">10 gram</span>
						<span class="Flex-25">0 minutes</span>
					</div>
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

<style lang="scss" scoped>
	@import '../../styles/_variables';
	@import '../../styles/_mixins';

	.SwitchableContent {
		margin-right: 25px;
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

		&.Mash {
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