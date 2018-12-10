<template>
  <div>
    <h1 class="PageTitle">Your recipes</h1>
    <div class="OverviewTable">
      <header>Overview</header>
      <div class="TableRow TableHeader">
        <span>Recipe <i class="fas fa-sort"></i></span>
        <span>Style <i class="fas fa-sort"></i></span>
        <span>Brewery <i class="fas fa-sort"></i></span>
        <span>Last edited <i class="fas fa-sort"></i></span>
        <span></span>
      </div>
      <div 
        v-for="recipe in recipes"
        :key="recipe._id"  
      >
        <router-link
          to="/recipes/detail/1" 
          class="TableRow"
        >
          <span>{{ recipe.name }}</span>
          <span>{{ recipe.style }}</span>
          <span>The Monkey Brewery</span>
          <span>16 Jul. 2018</span>
          <span class="Buttons">
            <router-link to="/recipes/edit/1" class="Button Edit">
              <i class="fas fa-edit"></i> Edit
            </router-link>
            <a 
              @click="deleteRecipe(recipe._id)"
              class="Button Delete"
            >
              <i class="fas fa-trash"></i> Delete
            </a>
          </span>
        </router-link>
      </div>
      <footer>
        <router-link to="/recipes/new" class="Button New"><i class="fas fa-plus"></i> Create a new recipe</router-link>
      </footer>
    </div>
  </div>
</template>

<script>
import RecipeRepository from '../../repositories/recipe-repository';

export default {
  name: 'recipes-overview',
  data: function() {

    return {
      recipes: []
    }
  },
  mounted() {

    RecipeRepository.getAll()
      .then(response => {
        this.recipes = response;
      })
  },
  methods: {

    deleteRecipe: function(id) {

      RecipeRepository.delete(id)
        .then(() => {
          alert('recipe deleted');
        })
    }
  }
}
</script>

<style lang="scss">
  @import '../../styles/_tables';
</style>