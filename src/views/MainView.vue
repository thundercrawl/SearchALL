<template>
 <div>
     
    
  <el-container>
  <el-header><headView/></el-header>
  <el-main><bodyView/></el-main>
  <el-footer>Footer</el-footer>
</el-container>

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