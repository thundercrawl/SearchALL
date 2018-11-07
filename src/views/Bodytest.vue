<template>

<div id="app">
  <h2>Cats</h2>
  
  <div v-for="item in cats" :key="item.id">
    <p>
      <span class="cat">{{ item.cat }}</span>
      <button @click="removeCat(n)">Remove</button>
    </p>
  </div>

  <p>
    <input v-model="newCat">
    <button @click="addCat">Add Cat</button>
  </p>
</div>


</template>

<script>

export default{

  data(){

    return{
    cats:[],
    newCat:{}
    }

  },
  mounted() {
    if (localStorage.getItem('cats')) {
      try {
        this.cats = JSON.parse(localStorage.getItem('cats'));
      } catch(e) {
        localStorage.removeItem('cats');
      }
    }
  },
  methods: {
    addCat() {
      // ensure they actually typed something
      if (!this.newCat) {
        return;
      }
      let item = {}
      item.cat= this.newCat
      item.id = this.cats.length
      
      this.cats.push(item);
      
      this.newCat = '';
      this.saveCats();
    },
    removeCat(x) {
      this.cats.splice(x, 1);
      this.saveCats();
    },
    saveCats() {
      const parsed = JSON.stringify(this.cats);
      localStorage.setItem('cats', parsed);
    }
  }

}
</script>