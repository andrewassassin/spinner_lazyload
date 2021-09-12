<template>
  <div id="app">
     
    <h1> </h1>
  <section class="container">
    <div class="row">
      <div class="person col-md-4 my-3" v-for="(product, index) in threeList" :key="index">
        <div class="left">
          <b-spinner :id="`${index}`" class="m-5 spin" v-bind:style="spin(index)" label="Busy" ></b-spinner>
          <img :src="`${product.image}`" alt="">
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
      // state: 'hidden',
      index:""
    }
  },
   components: { 

   },
  methods: {
     spin(idx){
        // console.log('idx',idx)
      return {
        visibility: this.threeList[idx].visibility
        } 
    },
    // axios请求接口获取数据
    getInitialUsers() {     

        axios.get(`http://localhost/Amitproject/product.php#/`).then(response => {
          // console.log('data',response.data)
          // 將1~6個產品push到threeList上
          this.productList = response.data
          this.productList.splice(0,6).forEach(item=>{
            item.visibility = 'hidden'
           
            //  item.visibility = 'hidden'
            this.threeList.push(item)
          })

  
        
        })
      
    },
    scroll() {

      let isLoading = false
     
      window.onscroll = () => {
         
     
        // 距离底部200px时加载一次
        let bottomOfWindow = document.documentElement.offsetHeight - document.documentElement.scrollTop - window.innerHeight <= 200
        // let height = document.documentElement.offsetHeight - document.documentElement.scrollTop
        // console.log('bottomOfWindow',height - window.innerHeight)
        if (bottomOfWindow && isLoading == false) {
          isLoading = true
          
            // 理想是每滑動一次，就把res.data的接續三個產品丟進去productList，這樣throwarray的slice就可以陸續提取productList的末三項(最新三項)
            this.productList.splice(0,3).forEach(item=>{

             item.visibility = 'visible'
             
             
            this.threeList.push(item)
          })
          // this.threeList[0].visibility= 'hidden'
          console.log('three',this.threeList)
           
  


            isLoading = false
          
        } 
        
      }
    }
  },
  beforeMount() {
    // 在页面挂载前就发起请求
    this.getInitialUsers()
  },
  mounted() {
    this.scroll(this.productList)
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
