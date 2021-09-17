<template>
  <div id="app">


    <section class="container">
      <div class="row">
        <div class="person col-md-4 my-3" v-for="(product, index) in threeList" :key="index">
          <div class="left">
            <b-spinner class="" v-bind:style="spin(index)" label="Busy"></b-spinner>
            <img :src="`${product.image}`" @load="loaded" alt="">
          </div>
          <div class="right">
            <p>{{ product.name}}</p>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import axios from 'axios'
export default {
  name: 'app',
  // 创建一个存放用户数据的数组
  data() {
    return {
      productList: [],
      threeList: [],
      index:"",
      state:'',
    }
  },
  methods: {
    spin(idx){
      return {
        visibility: this.threeList[idx].visibility
        } 
    },
    loaded() {
      this.threeList.forEach(item=>{
        // item.visibility = 'hidden'
      })
    },
    getInitialUsers() {  
      const count = 0
      axios.post(`https://x-home.pcpogo.com/homex/product.php?RDEBUG=andrewc`,count)
        .then(
            response => {
              
              this.productList = response.data
              console.log(response.data)
              this.productList.splice(0,6).forEach(item=>{
                item.visibility = 'hidden'
                this.threeList.push(item)
              })
            }      
        )   
         
    },
    scroll() {
      let isLoading = false
      var count = 0
      var that = this
      window.onscroll = async function() {

        // 距離底部200px加載一次
        let bottomOfWindow = document.documentElement.offsetHeight - document.documentElement.scrollTop - window.innerHeight <= 200
        // let height = document.documentElement.offsetHeight - document.documentElement.scrollTop
        // console.log('bottomOfWindow',height - window.innerHeight)
        if (bottomOfWindow && isLoading == false) {
            isLoading = true
            count += 6
           await axios.post(`https://x-home.pcpogo.com/homex/product.php?RDEBUG=andrewc`, count)
            .then(
              response => {
                that.productList = response.data
                that.productList.splice(0,6).forEach(item=>{
                  item.visibility = 'visible'
                  that.threeList.push(item)
                })        
                that.threeList.forEach(item=>{
                  item.visibility = 'hidden'
                })        
              }      
            )        
            isLoading = false
        }         
      }
    }
  },
  beforeMount() {
    // 在頁面開啟前發出請求
    this.getInitialUsers()

  },
  mounted() {
    this.scroll()
  },
  computed:{
   
  }
}
</script>

<style lang="scss">
@import '~@fortawesome/fontawesome-free/css/fontawesome.css';
.person {
  background: #ccc;
  border-radius: 2px;
  margin: 0 auto 15px auto;
  padding: 15px;
  animation:fade 2s;


  img {
    width: 100%;
    height: auto;
    border-radius: 2px;
  }

 
  p:first-child {
    text-transform: capitalize;
    font-size: 2rem;
    font-weight: 900;
  }

  .text-capitalize {
    text-transform: capitalize;
  }
}

.left{
  position: relative;
}
.spin{
  position: absolute;

}
 @keyframes fade {
  0%{
    opacity: 0;
  }
  100%{
    opacity: 1;
  }
}



*{
  box-sizing: border-box;
}


body {
    margin: 0;
}

</style>
