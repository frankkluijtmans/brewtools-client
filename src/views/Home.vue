<template>
  <div class="home">
    <WelcomeBack :user=username />
    <p v-if="output.id !== null">
      Found a cat named {{ output.name }} with ID {{ output.id }}
    </p>
  </div>
</template>

<script>
import WelcomeBack from '@/components/WelcomeBack.vue'
import axios from 'axios'

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

    axios.get('http://localhost:3000/', {
      headers: {
        "Content-Type": "application/json"
      }
    }).then((response) => { 
      
      this.output.name = response.data[0].name;
      this.output.id = response.data[0]._id;
    })
  }
}
</script>
