<template>
  <div id="app">
    <h1>Random User</h1>
    <div class="person" v-for="(product, index) in productList" :key="index">
      <div class="left">
        <img :src="`${product.image}`" alt="">
      </div>
      <div class="right">
        <p>{{ product.name}}}</p>
        <ul>

        </ul>
      </div>

    </div>
  </div>
</template>

<script>
import axios from 'axios'
import moment from 'moment'
export default {
  name: 'app',
  // 创建一个存放用户数据的数组
  data() {
    return {
      productList: []
    }
  },
  methods: {
    // axios请求接口获取数据
    getInitialUsers() {
      for (var i = 0; i < 5; i++) {
        axios.get(`https://x-home.pcpogo.com/homex/product.php?RDEBUG=andrewc`).then(response => {
          console.log('response.data',response.data[0])
          this.productList.push(response.data[0])
        })
      }
    },
    formatDate(date) {
      if (date) {
        return moment(String(date)).format('MM/DD/YYYY')
      }
    },
    scroll(person) {
      let isLoading = false
      window.onscroll = () => {
        // 距离底部200px时加载一次
        let bottomOfWindow = document.documentElement.offsetHeight - document.documentElement.scrollTop - window.innerHeight <= 200
        if (bottomOfWindow && isLoading == false) {
          isLoading = true
          axios.get(`https://x-home.pcpogo.com/homex/product.php?RDEBUG=andrewc`).then(response => {
            person.push(response.data[0])
            isLoading = false
          })
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
  }
}
</script>

<style lang="scss">
.person {
  background: #ccc;
  border-radius: 2px;
  width: 20%;
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
 @keyframes fade {
  0%{
    opacity: 0;
  }
  100%{
    opacity: 1;
  }
}

</style>
