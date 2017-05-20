<template>
	<div>
		<div class="Preview-wrap">
		<img :src="advert.url" alt="这是轮播图，图片显示出错，请确认链接是否正确" class="Preview-img">
		</div>
		<button @click="back" class="button-back">返回列表</button>
	</div>
	
</template>
<script>
	import store from "../Store/store";
	export default{
		data:function (){
			let advert=store.obtainAdv(this.$route.params.advid);
			return{
				advert:advert
			}
		},
		methods:{
			back:function() {
				this.$router.go(-1);
			}
		}

	}
</script>
<style>
	.Preview-wrap{
		position: relative;
		width: 600px;
		height: 300px;
		margin: 10px auto;
	}
	.Preview-img{
		width:600px;
		height:300px;
	}
	.button-back{
		margin: 15px auto;
		display: block;
		padding: 8px 10px;
		border-radius: 5px;
		border: none;
		cursor: pointer;
	}
	.button-back:hover{background-color: #7C76EB;}
</style>