<template>
	<div>
	<div class="Carousel-wrap">
  		<transition-group name="fade">
  			<img v-for="ad in advertpub" :src="ad.url" v-show="ad.show" alt="这是轮播图，图片显示出错，请确认链接是否正确" class="adv-img" :key="ad.id">
		</transition-group>
		<ul class="index-list">
			<li v-for="(ad,index) in advertpub" :class="{actived:ad.show,normal:true}">{{index+1}}</li>
		</ul>
	</div>
	<button @click="back" class="Carousel-back">返回列表</button>
	</div>
</template>
<script>
import  store from "../Store/store";
export default {
 	name: 'hello',
  	data:function(){
  	let adPublished=store.obtainPublished();
	    return {
	    	advertpub:adPublished,
	    }
  	},
  	mounted:function () {
  		let i=0;
  		setInterval(()=>{
  			if(i>=(this.advertpub.length)){
  				this.advertpub[i-1].show=false;
  				i=0;
  				this.advertpub[i].show=true;
  			}
  			else if(i==0){
  				this.advertpub[i].show=true;
  			}
  			else{
	  			this.advertpub[i-1].show=false;
	  			this.advertpub[i].show=true;
  			} 
  			i++;	
  		},3000);
  	},
  	methods:{
  		back:function () {
				this.$router.go(-1);
  		}
  	}
}
</script>
<style>
	tr,th,td{
		padding: 5px 20px;
	}
	.Carousel-wrap{
	    position: relative;
	    /*border: solid 1px;*/
	    width: 750px;
	    height: 350px;
	    margin: 20px auto;
	    overflow: hidden;
	}
	.adv-img{
		width:750px;
		height:350px;
	}
	.index-list{
		position: absolute;
		bottom: 15px;
		left: 15px;
	}
	.normal{
		display: inline;
	    padding: 0px 7px;
	    margin-left: 10px;
	    border-radius: 10px;
	    background-color:white;
	    color:black;
	    font-weight: bolder;
	    cursor:pointer;
	}
	.actived{
	    background-color:#481b56;
	    color: white;
	}
	.Carousel-back{
		margin: 15px auto;
		display: block;
		padding: 8px 10px;
		border-radius: 5px;
		border: none;
		cursor: pointer;
	}
	.Carousel-back:hover{background-color:#7C76EB;}
	.fade-enter-active,.fade-leave-active{
	  transition: opacity .3s
	}
	.fade-enter,.fade-leave-active {
	  opacity: 0
	}
</style>
