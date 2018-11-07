<template>
<div id='body'>
    <view1/>
</div>


</template>

<script>
import searchView from '@/views/Search.vue'
import view1 from '@/views/view1.vue'

export default {
  name: 'body',
  components: {
    searchView,
    view1
  }
}

</script>