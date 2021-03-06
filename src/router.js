import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'
import NotFound from './views/NotFound.vue'
import Recipes from './views/Recipes.vue'
import RecipeOverview from './views/recipes/Overview.vue'
import RecipeNew from './views/recipes/New.vue'
import RecipeEdit from './views/recipes/Edit.vue'
import RecipeDetail from './views/recipes/Detail.vue'

Vue.use(Router)

export default new Router({
	mode: 'history',
	routes: [
		{
			path: '/',
			name: 'Dashboard',
			component: Home
		},
		{
			path: '/404',
			name: 'Page not found',
			component: NotFound
		},
		{
			path: '/recipes',
			name: 'Recipes',
			component: Recipes,
			children: [
				{ 
					path: '/', 
					name: 'Recipe overview',
					component: RecipeOverview 
				},
				{ 
					path: 'new', 
					name: 'New recipe',
					component: RecipeNew 
				},
				{ 
					path: 'edit/:id', 
					name: 'Edit recipe',
					component: RecipeEdit 
				},
				{ 
					path: 'detail/:id', 
					name: 'Recipe details',
					component: RecipeDetail
				},
			]
		},
		{ path: '*', redirect: '/404' }
	]
})
