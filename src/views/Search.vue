<template>
<div id="search">
<el-input  placeholder="Search input" v-model="searchData" ></el-input>
<el-button @click="search">elastic search</el-button>

</div>
</template>


<script>

export default
{
    
/*data(){   <--- this left { cannot been moved to next line, or the compiler will continue report error

*/
data()
{

    return{
        searchData:''

    }
},
methods:
{ 
    search:function()
    {
        this.$global.logInfo("do search for:"+this.searchData);
        if(this.searchData === 'asdf')
        {
            this.$global.logInfo('trigger the router replace secrete')
            this.$router.push('/')
        }
    }


}
}

</script>