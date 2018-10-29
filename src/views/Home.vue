<template>
  <div class="home">
  
    <MainView msg="MainView"/>
  </div>
</template>

<script>
// @ is an alias to /src
import MainView from '@/views/MainView.vue'


export default {
  name: 'home',
  components: {
    MainView,

  }
}
</script>
