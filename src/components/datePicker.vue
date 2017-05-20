<template>
	<div class="datePicker-cover" @click="closeDatePicker">
		<div class="datePicker-pop" @click="datePicker_click">
			<header class="datePicker-header">
				<div class="datePicker-left-arrow" @click="preMonth"></div>
				<label class="select-year">
					<select v-model="selectedYear" @change="changeYear">
						<option v-for="year in years">{{year}}</option>
					</select>年
				</label >
				<label class="select-month">
					<select v-model="selectedMonth" @change="changeMonth">
						<option v-for="month in months">{{month}}</option>
					</select>月
				</label>
				<div class="datePicker-right-arrow" @click="nextMonth"></div>
			</header>
			<table class="datepicker-table">
				<thead>
	                <tr><th>日</th><th>一</th><th>二</th><th>三</th><th>四</th><th>五</th><th>六</th></tr>
                </thead>
                <tbody>
                	<tr v-for="line in dates">
                		<td v-for="date in line" :class="date.class "    @click="dateClick">{{date.content}}</td>
                	</tr>
                </tbody>
			</table>
		</div>
	</div>
</template>
<script>
	export default{
		data:function () {
			return{
				years:[],
				months:[],
				dates:[[],[],[],[],[],[]],
				selectedYear:0,
				selectedMonth:0,
				selectedDate:'',
				initDate:null,
				initYear:null,
				initMonth:0,
				today:0
			}
		},
		created:function (){
			let currentDate=this.initDate=new Date();
			//设置当前年
			this.selectedYear=currentDate.getFullYear();
			//设置当前月
			this.selectedMonth=this.initMonth=currentDate.getMonth()+1;
			this.today=currentDate.getDate();
			this.render(currentDate);
			this.initYear=currentDate.getFullYear();
			this.years.push(this.initYear-2,this.initYear-1,this.initYear,this.initYear+1);
			this.months.push(1,2,3,4,5,6,7,8,9,10,11,12);
		},
		methods:{
			render:function (setDate) {
				this.dates=[[],[],[],[],[],[]];
				let DateNow=new Date(setDate);
				let tempMonth=DateNow.getMonth();
				// let tempMonth=this.initMonth;
				//获取第一个表格的日期
				DateNow.setDate(1);
				DateNow.setDate(DateNow.getDate()-DateNow.getDay());
				let tempdate;
				for(let k = 0; k < 6; k++){
					for(let j = 0; j <7; j++){
						tempdate=DateNow.getDate();
						if(DateNow.getMonth()==tempMonth){
								this.dates[k].push(
								{
									content:tempdate,
									class:"currentMonth"
								});
						}
						else if(DateNow.getMonth()<=tempMonth-1){
							this.dates[k].push(
								{
									content:tempdate,
									class:"preMonth"
								});
						}
						else{
								this.dates[k].push(
								{
									content:tempdate,
									class:"nextMonth"
								});
						}
						DateNow.setDate(DateNow.getDate()+1);
					}
				}
			},
			closeDatePicker:function () {
				this.$emit('closepop');
			},
			datePicker_click:function (ev) {
				let oEvent=ev||Event;
				oEvent.cancelBubble=true;
			},
			preMonth:function () {
				if((this.selectedYear>2015)||(this.selectedYear==2015&&this.selectedMonth>1)){
					let Date0=this.initDate.setMonth(this.initDate.getMonth()-1);
					this.selectedMonth--;
					this.render(Date0);
				}
				if((this.selectedMonth<1)&&(this.selectedYear>2015)){
					this.selectedMonth=12;
					this.selectedYear--;
				}
			},
			nextMonth:function () {
				if((this.selectedYear<2018)||(this.selectedYear==2018&&this.selectedMonth<12)){
					let Date0=this.initDate.setMonth(this.initDate.getMonth()+1);
					this.selectedMonth++;
					this.render(Date0);
				}
				if((this.selectedYear<2018)&&this.selectedMonth>12){
					this.selectedMonth=1;
					this.selectedYear++;
				}
			},
			dateClick:function (ev) {
				let oEvent=ev||Event;
				let dateValue=oEvent.target.innerHTML;
				let className=ev.target.getAttribute('class');
				if(className=='nextMonth')
				return this.nextMonth();
				else if(className=='preMonth')
				return this.preMonth();
				else if(this.isLegal(dateValue)){
					this.selectedDate=this.initDate.getFullYear()+'/'+(this.initDate.getMonth()+1)+'/'+dateValue;
					this.$emit('closepop',this.selectedDate);
				}
				else{
					alert('日期必须大于当天！');
				}
			},
			isLegal:function (date) {
					if(this.selectedYear<this.initYear){
						return false;
					} 
					else if((this.selectedYear==this.initYear)&&(this.selectedMonth<this.initMonth))
					{
						return false;
					}
					else if((this.selectedYear==this.initYear)&&(this.selectedMonth==this.initMonth)&&(date<=this.today)){
						return false;
					}
					else{
						console.log(4);
						return true;
					}
			},
			changeYear:function () {
				let date=new Date(this.selectedYear,(this.selectedMonth-1));
				this.render(date);
			},
			changeMonth:function () {
				let date=new Date(this.selectedYear,(this.selectedMonth-1));
				this.render(date);
			}
		}
	}
</script>

<style>
	.datePicker-cover{
		position: fixed;
		width: 100%;
		height: 100%;
		background-color: rgba(162, 171, 171, 0.5);
		left: 0;
		top: 0;
	}
	.datePicker-pop{
		position: absolute;
		min-width: 300px;
		min-height: 200px;
		top: 190px;
		left: 35%;
		-webkit-transform: translateX(-50%);
		transform: translateX(-50%);
		background-color: #F1EFEF;
		border-radius: 5px;
		overflow: hidden;
	}
	.datepicker-table tr td {
		cursor: pointer;
	}
	.datePicker-left-arrow{
		border-right: 15px solid #FEFEFF;
		border-top: 10px solid transparent;
		border-bottom: 10px solid transparent;
		display: inline-block;
		margin-left: 20px;
		float: left;
		cursor:pointer;
	}
	.datePicker-right-arrow{
		border-left: 15px solid #FEFEFF;
		border-top: 10px solid transparent;
		border-bottom: 10px solid transparent;
		display: inline-block;
		float: right;
		margin-right: 20px;
		cursor:pointer;
	}
	.datePicker-header{
		height: 32px;
		padding-top: 10px;
		background-color: #6396f5;
	}
	.select-year{margin-left:50px;}
	.select-year,.select-month{font-weight:bolder;}
	.select-year select,.select-month select{
		padding: 3px 5px;
    	font-weight: bolder;
    	text-align:center;
	}

	.currentMonth{
		background-color:#B8EB49;
	}
	.currentMonth:hover{
		background-color: #F59ADF;
	}
</style>