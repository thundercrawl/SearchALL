<template>
 <div class="wrapper">  
     
    
  <el-container direction="vertical">
  <el-header ><headView/></el-header>
  <el-main style="background: none repeat scroll 0 0 #fff;"><bodyView/></el-main>
  <el-footer style="height:20%,position:absolute; background-color:#545c64;"><footerView/></el-footer>
</el-container>

  </div>
</template>

<script>
import headView from '@/views/Header.vue' 
import bodyView from '@/views/Body.vue'
import footerView from '@/views/Footer.vue'
 export default {
        components:{
            headView,
            bodyView,
            footerView
        }

        
    }
</script>

<style>


</style>