<template>
	<div class="advertlist">
		<deletepop v-if="showDeletePop" @receive='popMsg' :popContent="popContent":popTitle="popTitle"></deletepop>
		<table v-if="advertlist.length>0" class="adv-list-table">
			<thead class="table-head">
				<tr>
					<th></th>
					<th>广告标题</th>
					<th>发布时间</th>
					<th>结束时间</th>
					<th>推送时段</th>
					<th>发布状态</th>
					<th>操作
					<a class="add-adv-btn" @click="addadvert">┼&nbsp;新增广告</a>
					</th>
				</tr>
			</thead>
			<tbody class="adv-list-table-body">
				<tr v-for="ad in advertlist">
					<td><label for=""><input type="checkbox" v-bind:value="ad.id" v-model="checkedAdvert"></label></td>
					<td>{{ad.title}}</td>
					<td>{{ad.startTime|dateFormate}}</td>
					<td>{{ad.endTime|dateFormate}}</td>
					<td>{{ad.period|convert}}</td>
					<td :class="{Published:ad.status=='Published',Obsolete:ad.status=='Obsolete',torelease:ad.status=='to-release'}">{{ad.status|statusFormula}}</td>
					<td v-show="ad.status=='Obsolete'">
						<span @click="deleteAdvert(ad.id,ad.title)">删除</span>
						<span @click="viewAdvert(ad.id)">预览</span>
					</td>
					<td v-show="ad.status=='to-release'">
						<span @click="deleteAdvert(ad.id,ad.title)">删除</span>
						<span @click="editAdvert(ad.id)">编辑</span>
						<span @click="releaseAdvert(ad)">发布</span>
						<span @click="viewAdvert(ad.id)">预览</span>
					</td>
					<td v-show="ad.status=='Published'">
						<span @click="advertStop(ad.id)">停止</span>
						<span @click="viewAdvert(ad.id)">预览</span>
					</td>
				</tr>
			</tbody>
			<tfoot class="adv-list-table-foot">
				<tr>
					<td class="checkall">
					<label >
						<input type="checkbox" v-model="CheckedAll" @change="checkAll">	
						全选
					</label>
					</td>
					<td>
						<span @click="batchDelete">批量删除</span>				
					</td>
				</tr>
			</tfoot>
		</table>
	</div>
</template>
<script>
	import store from"../Store/store";
	import filter from "../Filter/filter";
	import deletepop  from "./deletepop";
	import editadvert from "./EditAdvert";
	export default {
	  data:function() {
	  	let advertlist=store.obtain().advertList;
	  	return{
	  		advertlist:advertlist,
	  		title:'',
	  		showDeletePop:false,
	  		currentId:0,
	  		popTitle:'',
	  		popContent:'',
	  		CheckedAll:false,
	  		checkedAdvert:[],
	  	}
	  },
	  components:{
	  	deletepop
	  },
	  created:function  () {
 	  },
	  filters:filter,
	  methods:{
	  	deleteAdvert:function (id,title) {
	  		this.showDeletePop=true;
	  		this.currentId=id;
	  		this.popTitle='单个删除';
	  		this.popContent=`您确定删除广告"${title}"吗？`;
	  	},
	  	checkAll:function () {
	  		if(this.CheckedAll){
	  			while(this.checkedAdvert.pop());
		  		for (var i = 0; i <this.advertlist.length;i++) {
		  			this.checkedAdvert.push(this.advertlist[i].id);
		  		}
	  		}
	  		else{
	  			while(this.checkedAdvert.pop());
	  		}
	  	},
	  	batchDelete:function () {
	  		if(this.checkedAdvert.length==0){
	  			alert("请先选择广告！");
	  			return;
	  		}
	  		this.showDeletePop=true;
	  		this.currentId="batchDelete";
	  		this.popTitle='批量删除';
	  		this.popContent=`您确定要删除所有选择的广告吗？`;
	  	},
	  	popMsg:function (msg) {
	  		if(msg=='ok'){
	  			if(this.currentId=='batchDelete'){
	  				for (var i=0;i<this.checkedAdvert.length;i++) {
	  				    store.deleteAdv(this.checkedAdvert[i]);
	  				}
	  				this.advertlist=store.obtain().advertList;
	  			}
	  			else{
	  				if(store.deleteAdv(this.currentId)){
	  					this.advertlist=store.obtain().advertList;
	  				}
	  				else{
	  					alert("删除失败！");
	  				}
	  			}
	  		}
	  		else if(msg=='cancel'){
	  			console.log(msg);
	  		}
	  		else{
	  			console.log("错误的信息"+msg);
	  		}
	  		this.showDeletePop=false;
	  	},
	  	addadvert:function (id) {
			let  NewAdvId=store.addadv();	  		
			this.$router.push({name:'addadvert',params:{advid:NewAdvId}});
	  	},
	  	editAdvert:function (id) {
	  		this.$router.push({name:'editadvert',params:{advid:id}});	
	  	},
	  	viewAdvert:function (id) {
	  		this.$router.push({name:'viewadvert',params:{advid:id}});
	  	},
	  	advertStop:function (id) {
	  		store.stopPub(id);
	  		this.advertlist=store.obtain().advertList;
	  	},
	  	releaseAdvert:function (ad) {
	  		let rsp=store.releaseAdvert(ad.id);
			if(rsp==true){
				alert("发布成功！");
				this.advertlist=store.obtain().advertList;
			}
			else alert(rsp);
	  	}
	  }
	}
</script>

<style>
	th,td{
		padding:5px 20px;
	}
	.add-adv-btn{
	    text-decoration: none;
	    padding: 5px 10px;
	    background-color: #4a73ea;
	    border-radius: 5px;
	    color: #fdfafa;
	    cursor: pointer;
	}
	.add-adv-btn:hover{
	    background-color:#0909CE;
	    /*color: #4a73ea;*/
	}
	.adv-list-table{
		margin: 15px 10px;
	    border-spacing: 0px;
	    border: solid 1px;
	    border-top: none;
	}
	.table-head{
		background-color: #CFC9C9;
	}
	.table-head tr th{padding:15px 0px;}
	.adv-list-table-body tr td{
		padding:15px 10px;
		/*text-align:center;*/
	}
	.adv-list-table-body tr:hover{
		background-color:#FAE4E4;
	}
	.adv-list-table-body span{
		cursor: pointer;
		padding:5px 10px;
		border:solid 1px;
		margin-left:10px;
		border-radius:5px;
	}
	.adv-list-table-body span:hover{background-color:#559EF4;}
	.checkall{text-align:end;}
	.adv-list-table-foot tr td{
    	padding: 15px 10px;
	}
	.adv-list-table-foot span{padding:5px 10px;cursor: pointer;}
	.adv-list-table-foot span:hover{
		background-color: #a9c4f7;
	    padding: 5px 10px;
	    border-radius: 5px;
	}
	.Published{color:red;font-weight:bolder;}
	.Obsolete{color:#c7ccc7;font-weight: bolder;}
	.torelease{color:blue;font-weight:bolder;}
</style>

