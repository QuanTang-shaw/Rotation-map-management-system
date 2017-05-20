
function statusFormula (str) {
	// if(str=="Obsolete")return "已过时"
	let text='';
	str=="Obsolete"&&(text="已过时");
	str=="to-release"&&(text="等待发布");
	str=="Published"&&(text="已发布");
	return text;
}
function convert(str) {
	if(str=="morning")return "上午";
	else if(str=="afternoon")return "下午";
	else if(str=="night")return "晚上";
    else return str;
}

function dateFormate (date) {
	if(date === null|| date === "-"||date ===undefined) return "-";
	var tmp = date.split("/");
	return tmp[0]+"-"+tmp[1]+"-"+tmp[2];
}
export default{
	statusFormula,
	convert,
	dateFormate
}