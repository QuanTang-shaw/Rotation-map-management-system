const key= "test";
let data;

function initData (){
	data={
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
	localStorage.clear();
	localStorage.setItem(key,window.JSON.stringify(data));
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
	let NewId=(data.advertList.length+1);
	let oNewadvert={id:NewId,title:'我的广告！',startTime:null,endTime:null,period:'morning',status:'to-release',url:''};
	data.advertList.push(oNewadvert);
	localStorage.setItem(key,window.JSON.stringify(data));
	return NewId;
}

function saveAdv(obj) {
	for (var i = 0; i <data.advertList.length; i++) {
		if(data.advertList[i].id==obj.id){
  			data.advertList[i].title=obj.title;
  			data.advertList[i].url=obj.url;
  			data.advertList[i].endTime=obj.deadLine;
  			data.advertList[i].period=obj.time;
			localStorage.setItem(key,window.JSON.stringify(data));
  			return true;
		}
	}
	return false;
}

function releaseAdvert(id) {
	let time=new Date();
	for (var i = 0; i <data.advertList.length; i++) {
		if(data.advertList[i].id==id){
			if(data.advertList[i].url==''){
				return "请先保存！";
			}
			else if(data.advertList[i].endTime==''){
				return "请先保存！";
			}
			data.advertList[i].status="Published";
			data.advertList[i].startTime=time.getFullYear()+'/'+(time.getMonth()+1)+'/'+time.getDate();
			localStorage.setItem(key,window.JSON.stringify(data));
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

