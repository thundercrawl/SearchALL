<template>
  <el-container>
  <el-header>Header
     <headView/>
  </el-header>
  <el-main>MainView
    <bodyView/>

  </el-main>
  <el-footer>Footer</el-footer>
</el-container>

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