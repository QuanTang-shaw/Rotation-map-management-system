<template>
	<div class="add-advertWrap" >
		<datepicker v-if="showDate" @closepop="closepop">
		</datepicker>
		<div class="add-advert" >
			<header class="add-advert-head">
				<p>我的广告</p>
			</header>
			<main class="add-advert-main">
				<section >
					<div class="advTitle">
						<p>请输入广告标题:</p>
						<input type="text" class="input-title" v-model="title">
					</div>

					<div class="Imgaddress">
						<p>请输入图片url：</p>
						<small :class="{iswrong:iswrong}">{{checkResult}}</small>
						<input type="text" class="Imgaddress-input" v-model="url" @change="checkUrl">
					</div>

					<div class="Pushtime">
						<p>推送时段：<span>{{selectedTime}}</span></p>
						<ul>
							<li v-for="time in timePeriodlist" @click="Switch">
							{{time|convert}}
							</li>
						</ul>
					</div >
				</section>
			</main>
			<footer class="add-advert-footer">
				<label class="releaseTime">
				广告截止日期:
					<input type="text" @click="selectDate" class="releaseTime-input" v-model="deadLine">
				</label>
				<a class="add-advert-button" @click="save">保存</a>
				<a class="add-advert-button" @click="release">发布</a>
				<router-link to='/com1' class="add-advert-button">返回</router-link>
			</footer>
		</div>
	</div>
</template>
<script>
	import store  from "../Store/store";
	import datepicker  from "./datePicker";
	import filter  from "../Filter/filter";
	export default{
		data:function () {
	  		let timePeriodlist=store.obtain().timePeriod;
	  		let advert=store.obtainAdv(this.$route.params.advid);
	  		return{
	  			advid:this.$route.params.advid,
	  			timePeriodlist:timePeriodlist,
	  			showDate:false,
	  			startDay:(new Date()).setHours(0,0,0),
                endDay:new Date("6/10/2017"),
                advert:advert,
                title:advert.title,
                url:advert.url,
                deadLine:advert.endTime,
                selectedTime:"上午",
                checkResult:'',
                iswrong:false
	  		}
		},
		methods:{
			closepop:function (data) {
	  			this.showDate=!this.showDate;
	  			this.deadLine=data;	
			},
			popclick:function (ev) {
				let oEvent=ev||Event;
				oEvent.cancelBubble=true;
			},
			Switch:function (ev) {
				this.selectedTime=ev.target.innerHTML;
			},
			selectDate:function () {
	  			this.showDate=!this.showDate;
			},
			save:function () {
				if(this.title==''){
					alert('请输入标题！');
					return;
				}
				if(this.url==''||this.iswrong){
					alert('请输入正确的链接！');
					return;
				}
				if(this.deadLine==''){
					alert('请选择截止时间！');
					return;
				}
				if(store.saveAdv({id:this.advid,title:this.title,url:this.url,deadLine:this.deadLine,time:this.selectedTime})){
					alert("保存成功！");
				}
			},
			release:function () {
				let rsp=store.releaseAdvert(this.advid);
				if(rsp==true){
					alert("发布成功！");
					this.$router.push({path:'/com1'});
				}
				else alert(rsp);
			},
			checkUrl:function (ev) {
				let match = /^((ht|f)tps?):\/\/([\w\-]+(\.[\w\-]+)*\/)*[\w\-]+(\.[\w\-]+)*\/?(\?([\w\-\.,@?^=%&:\/~\+#]*)+)?/;
				console.log(match.test(this.url));
				if(match.test(this.url)){
					console.log(ev.target.style.borderColor ='#3bf13b');
					this.checkResult="格式可用";
					this.iswrong=false;
				}
				else{
					ev.target.style.borderColor='red';
					this.checkResult="格式不正确";
					this.iswrong=true;
				}
			}
		},
		created:function () {
			// console.log(this.advert.title);
		},
		components:{
			datepicker 
		},
		filters:filter
	}
</script>

<style>
	.add-advert{
		padding:0px 50px;
		/*text-align:center;*/
	}
	.add-advert-head p{
		padding: 5px 10px;
		/* border: solid 1px; */
		text-align: center;
		font-size: 32px;
		/* font-weight: bolder; */
	}
	.add-advert-main p{
		font-size: 120%;
		/*font-weight: bolder;*/
		color: #99949a;
	}
	.add-advert-main div{
		margin-top:30px;
	}
	.input-title,.Imgaddress-input{
		width: 40%;
		outline: none;
		border-radius: 6px;
		border: solid 2px #9c9191;
		padding: 6px 5px;
		/* text-align: center; */
		font-weight: bolder;
	}
	.Imgaddress small{display: block;}
	.input-title:hover,.Imgaddress-input:hover{
		background-color:#dae0dd;
	}
	.Pushtime ul li{
		list-style: none;
		display: inline-block;
		padding: 5px 20px;
		margin-left: 30px;
		/* background-color: #1783ea; */
		border-radius: 5px;
		/* font-weight: bolder; */
		/* color: aliceblue; */
		border: solid 1px;
		cursor: pointer;
	}
	.Pushtime ul li:hover{
		background-color:#24E2FA;
	}
	.Pushtime span{color:#F41996;}
	.Pushtime ul{ margin-top:30px; }
	.releaseTime-input{
		padding: 6px 10px;
		outline: none;
		width: 60px;
		font-weight: bolder;
		border-radius: 5px;
	}
	.add-advert-footer{
		padding: 20px 0;
	    border-top: solid 1px;
	    margin-top: 20px;
	}
	.add-advert-button{
		padding: 5px 20px;
		border-radius: 5px;
		text-decoration:none;
		/* background-color: #2edff7; */
		outline: none;
		/* color: aliceblue; */
		/* font-weight: bolder; */
		font-size: 110%;
		border: solid 1px;
		margin-left: 30px;
		cursor: pointer;
	}
	.add-advert-button:hover{
		background-color:#24E2FA;
	}
	.iswrong{color:red;}
</style>