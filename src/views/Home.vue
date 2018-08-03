<template>
  <div class="home">
    <WelcomeBack :user=username />
    <p>
      {{ apiOutput }}
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
      apiOutput: 'test'
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
    })
      .then((response) => { 
    
          this.apiOutput = response.data.test
      })
  }
}
</script>
