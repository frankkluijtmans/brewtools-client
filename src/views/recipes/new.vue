<template>
  <div class="recipes">
    <h1 class="PageTitle">New recipe</h1>
    <form @submit.prevent="handleSubmit">
      <input type="text" v-model="recipe.name">
      <input type="submit" value="send">
    </form>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  name: 'NewRecipe',
  data() {
    return {
      recipe: {
        name: ''
      }
    }
  },

  methods: {
    handleSubmit() {
      axios.post(
        'http://localhost:3000/insert',
        this.recipe
      ).then(() => {
      
        alert('submission saved');
      });
    }
  }
}
</script>