import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'
import Recipes from './views/Recipes.vue'
import RecipeOverview from './views/recipes/overview.vue'
import RecipeNew from './views/recipes/new.vue'
import RecipeEdit from './views/recipes/edit.vue'
import RecipeDetail from './views/recipes/detail.vue'

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
    }
  ]
})
