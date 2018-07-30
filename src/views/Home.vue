<template>
  <div class="home">
    <WelcomeBack :user=username />
  </div>
</template>

<script>
import WelcomeBack from '@/components/WelcomeBack.vue'

export default {
  name: 'home',
  components: {
    WelcomeBack
  },
  computed: {

    username: function () {

      return this.$keycloak.userName
    }
  }
}
</script>
