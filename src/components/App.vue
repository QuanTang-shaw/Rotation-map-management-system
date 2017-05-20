<template>
  <div id="wrap">
    <navbar></navbar>
    <main class="adv-main">
    <router-view></router-view>
    </main>
  </div>
</template>

<script>
import  navbar from "./navbar";
import store from"../Store/store";

export default {
  name: 'app',
  components:{navbar},
  created:function  () {
    store.initData();
  }
}
</script>

<style>
  *{margin:0px;
    padding:0px;
  }
  body{
    height:100%;
    background-color: #eceff3;
  }
  .adv-main{
    display:inline-block;
    /*min-width:80%;*/
    min-height: 300px;
    min-width:950px;
    margin:30px 5%;
    position: relative;
    background-color: #fff;
    box-shadow: 2px 2px 3px #aaa;
  }
  @media (max-width:521px){
      .adv-main{
          /*padding-bottom: 100px;*/
        background-color:red;
      }
  }
</style>
