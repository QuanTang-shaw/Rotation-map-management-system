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
				url:'http://pic.qiantucdn.com/58pic/17/22/81/71W58PICtFa_1024.jpg!/watermark/url/L3dhdGVybWFyay12MS4zLnBuZw==/align/center'
				//Published,Obsolete
				,show:true
			},
			{
				id:2,
				title:"热辣夏日，全年仅此一次！",
				startTime:"2017/05/07",
				endTime:"2017/05/09",
				period:"afternoon",
				status:"to-release",
				url:'http://pic.qiantucdn.com/58pic/19/68/18/41D58PICn3t_1024.jpg!/watermark/url/L3dhdGVybWFyay12MS4zLnBuZw==/align/center'
				//Published,Obsolete
				,show:true
			},
			{
				id:3,
				title:"热辣夏日，全年仅此一次！",
				startTime:"2017/05/07",
				endTime:"2017/05/09",
				period:"afternoon",
				status:"Published",
				url:'http://pic.qiantucdn.com/58pic/19/68/18/41D58PICn3t_1024.jpg!/watermark/url/L3dhdGVybWFyay12MS4zLnBuZw==/align/center'
				,show:true
			},
			{
				id:4,
				title:"我们一起去旅游吧!",
				startTime:"2017/05/14",
				endTime:"2017/05/20",
				period:"morning",
				status:"Published",
				url:'http://pic.qiantucdn.com/58pic/17/22/81/71W58PICtFa_1024.jpg!/watermark/url/L3dhdGVybWFyay12MS4zLnBuZw==/align/center'
				,show:true
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

function obtainPublished(){
	let localData=obtain(),
		published=[];
	for (var i=0;i<localData.advertList.length;i++){
		if(localData.advertList[i].status==="Published"){
			published.push(localData.advertList[i]);
		}
	}
	return published;
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

function deleteAdv(id) {
	for (var i = 0; i <data.advertList.length; i++) {
		if(data.advertList[i].id==id){
			data.advertList.splice(i,1);
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
				return "请填写有效URL地址并保存！";
			}
			// console.log("截止时间:"+data.advertList[i].endTime);
			if(!data.advertList[i].endTime){
				return "请选择截止时间并保存！";
			}
			data.advertList[i].status="Published";
			data.advertList[i].startTime=time.getFullYear()+'/'+(time.getMonth()+1)+'/'+time.getDate();
			localStorage.setItem(key,window.JSON.stringify(data));
  			return true;
		}
	}
	return false;
}

function stopPub(id) {
	for (var i = 0; i <data.advertList.length; i++) {
		if(data.advertList[i].id==id){
			data.advertList[i].status="to-release";
			data.advertList[i].startTime=null;
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
	releaseAdvert,
	deleteAdv,
	obtainPublished,
	stopPub
};

