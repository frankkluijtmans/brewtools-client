<template>
  <div class="home">
    <WelcomeBack :user=username />
    <p v-if="output.id !== null">
      Found a recipe named {{ output.name }} with ID {{ output.id }}
    </p>
  </div>
</template>

<script>
import WelcomeBack from '@/components/WelcomeBack.vue'
import RecipeRepository from '../repositories/recipe-repository';

export default {
  name: 'home',
  components: {
    WelcomeBack
  },
  data: function() {
    
    return {
      output: {
        id: null,
        name: null
      }
    }
  },
  computed: {

    username: function () {

      return this.$keycloak.userName
    }
  },
  mounted() {
      
    RecipeRepository.get('5c0ebb02095194376c1c517a')
      .then(response => {
        
        this.output.id = response._id;
        this.output.name = response.name;
      })
  }
}
</script>
