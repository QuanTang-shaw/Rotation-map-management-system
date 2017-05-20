<template>
	<header class="Carousel-head">
		<router-link to='/com1' class="navbar-btn">我的轮播图</router-link>
		<router-link to='/' class="navbar-btn">效果预览</router-link>
	</header>
</template>
<script>
export default {

}
</script>
<style>
	.Carousel-head{
		width: 100%;
		height: 60px;
		background-color: rgb(38, 144, 237);
	}
	.navbar-btn{
		text-decoration:none;
		display: inline-block;
		margin:10px 20px;
		padding: 5px 15px;
		border-radius:5px;
		color: aliceblue;
		font-size: 120%;
		font-weight: bolder;
	}
	.navbar-btn:hover{background-color: #f7f3fb;    color: #086cc3;}
</style>