<template>
 <div>
     <headView/>

    <bodyView/>

  </div>
</template>

<script>
import headView from '@/views/Header.vue' 
import bodyView from '@/views/Body.vue'
 export default {
        components:{
            headView,
            bodyView
        }
        
    }
</script>