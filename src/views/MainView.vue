<template>
  <el-container>
  <el-header>Header
     <headView/>
  </el-header>
  <el-main>MainView</el-main>
  <el-footer>Footer</el-footer>
</el-container>

</template>

<script>
import headView from '@/views/Header.vue' 
 export default {
        components:{
            headView
        }
        
    }
</script>