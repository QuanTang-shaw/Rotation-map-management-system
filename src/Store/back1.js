// import jquery from "../jquery" ;
const key= "test";
let globalData;

function initData (){
	
	$.ajax({
		type:"GET",
		url:"192.168.1.104:8080/questions",
		success:function(data, textStatus) {
			try {
				globalData = data;
			} catch (e) {
				console.log("get peer failed, "+e.toString());
				globalData={
				userList:[
					{
						// 用户id
						id:1,
						// 用户名
						name:"admin",
						// 拥有的问卷id
						own:[1,2]
					}
				],
				advertList:[
					{
						id:1,
						title:"我们一起去旅游吧!",
						startTime:"2017/05/07",
						endTime:"2017/05/09",
						period:"morning",
						status:"Obsolete",
						url:''
						//Published,Obsolete
					},
					{
						id:2,
						title:"热辣夏日，全年仅此一次！",
						startTime:"2017/05/07",
						endTime:"2017/05/09",
						period:"afternoon",
						status:"to-release",
						url:''
						//Published,Obsolete
					}
				],
				timePeriod:{
					time1:"morning",
					time2:"afternoon",
					time3:"night"
				}
			};
		 }
		}
	});
	console.log(window.JSON.stringify(globalData));
	localStorage.clear();
	localStorage.setItem(key,window.JSON.stringify(globalData));
}


function obtain () {
	return JSON.parse(localStorage.getItem(key));	
}

function obtainAdv(id) {
	let localData=obtain();
	for (var i=0;i<localData.advertList.length;i++){
		if(id===localData.advertList[i].id){
			return localData.advertList[i];
		}
	}
}

function addadv () {
	let NewId=(globalData.advertList.length+1);
	let oNewadvert={id:NewId,title:'我的广告！',startTime:null,endTime:null,period:'morning',status:'to-release',url:''};
	globalData.advertList.push(oNewadvert);
	localStorage.setItem(key,window.JSON.stringify(globalData));
	save2Server();
	return NewId;
}

function save2Server() {
	$.ajax({
		type:"POST",
		url:"192.168.1.104:8080/questions",
		data:window.JSON.stringify(globalData),
		success:function(data, textStatus) {}
	});
	return false;
}

function saveAdv(obj) {
	for (var i = 0; i <globalData.advertList.length; i++) {
		if(globalData.advertList[i].id==obj.id){
  			globalData.advertList[i].title=obj.title;
  			globalData.advertList[i].url=obj.url;
  			globalData.advertList[i].endTime=obj.deadLine;
  			globalData.advertList[i].period=obj.time;
			localStorage.setItem(key,window.JSON.stringify(globalData));
			save2Server();
  			return true;
		}
	}
	return false;
}

function releaseAdvert(id) {
	let time=new Date();
	for (var i = 0; i <globalData.advertList.length; i++) {
		if(globalData.advertList[i].id==id){
			if(globalData.advertList[i].url==''){
				return "请先保存！";
			}
			else if(globalData.advertList[i].endTime==''){
				return "请先保存！";
			}
			globalData.advertList[i].status="Published";
			globalData.advertList[i].startTime=time.getFullYear()+'/'+(time.getMonth()+1)+'/'+time.getDate();
			localStorage.setItem(key,window.JSON.stringify(globalData));
			save2Server();
  			return true;
		}
	}
	return false;
}



export default{
	initData,
	obtain,
	addadv,
	obtainAdv,
	saveAdv,
	releaseAdvert
};

