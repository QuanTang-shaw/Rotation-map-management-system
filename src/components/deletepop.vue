<template>
	<div class="cover" @click="closepop">
		<div class="pop" @click="popclick">
			<header class="pop-head">
				{{popTitle}}
			</header>
			<main class="pop-main">
				<p>
					{{popContent}}
				</p>
			</main>
			<footer class="pop-footer">
				<button class="pop-footer-button" @click="btnClick('ok')">确定</button>
				<button class="pop-footer-button" @click="btnClick('cancel')">取消</button>
			</footer>
		</div>
		
	</div>
</template>
<script>
	import store  from "../Store/store";
	import datepicker  from "./datePicker";
	export default{
		props:["popContent","popTitle"],
		data:function () {
	  		let timePeriodlist=store.obtain().timePeriod;
	  		return{
	  			timePeriodlist:timePeriodlist,
	  		}
		},
		methods:{
			closepop:function () {
				this.$emit('receive');
			},
			popclick:function (ev) {
				let oEvent=ev||Event;
				oEvent.cancelBubble=true;
			},
			btnClick:function (msg) {
				this.$emit('receive',msg);
			}
		},
	} 
</script>

<style>
	.cover{
		left: 0;
		top: 0;
		width: 100%;
		height: 100%;
		position: fixed;
		display: flex;
		justify-content: center;
		align-items: center;
		background-color: rgba(173, 159, 159, 0.5);
	}
	.addadvpop{
		min-width: 500px;
		min-height: 200px;
		position: fixed;
		-webkit-box-pack: center;
		-ms-flex-pack: center;
		justify-content: center;
		-webkit-box-align: center;
		-ms-flex-align: center;
		align-items: center;
		background-color: #FFFFFF;
		border-radius: 5px;
		overflow: hidden;
	}
	.pop{
		background-color:aliceblue;
		border-radius: 5px;
		overflow: hidden;
	}
	.pop-head{
		padding: 5px 15px;
		background-color: #5ac0e8;
		font-size: 130%;
		font-weight: bolder;
		color: floralwhite;
		cursor:pointer;
	}
	.pop-main{
		display: block;
		margin-bottom: 15px;
		padding: 15px 35px;
		min-height: 100px;
		background-color: aliceblue;
	}
	.input-title{
		display: inline;
		outline: none;
	}
	.pop-main ul li{
		margin-top:20px;
		list-style: none;
	}
	.pop-footer-button{
		width: 80px;
		height: 30px;
		margin-left: 30px;
		margin-bottom: 10px;
		border: 1px solid #999;
		font-family: Microsoft YaHei UI;
		border-radius: 3px;
		cursor: pointer;
	}
	.pop-footer{
		/*position: absolute;*/
		width: 100%;
		/*bottom: 0;*/
	}
</style>