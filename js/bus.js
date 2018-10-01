/*bus.html*/
function date(){
	$.getJSON('http://192.168.0.5:8080/iLife/bus.php?callback=?',{},function(resource){
		var arr_key=Object.keys(resource);
		var list = document.getElementById("list");
		for(var i=0;i<arr_key.length;i++)
		{
			var key=arr_key[i];
			var div = document.createElement("div");
			var datev=resource[key].replace(/-/g, "&ndash;");
			datev="\"".concat(datev,"\"");
			var string="<a href='javascript:click(".concat(key,",",datev,")' >",resource[key]);
			div.innerHTML = string;
			list.appendChild(div);
		}
	});
}
function click(key,date){
	window.sessionStorage["dateid"]=key;
	window.sessionStorage["date"]=date;
	var role=window.localStorage["role"];
	if(role=="student"){
		window.location="location.html";
	}
	else if(role="driver"){
		window.location="location_driver.html";
	}
}
/*location.html*/
function loca(){
	var date=window.sessionStorage["date"];
	document.getElementById("date").innerHTML = date;
	$.getJSON('http://192.168.0.5:8080/iLife/location.php?callback=?',{},function(resource){
		var list = document.getElementById("list");
		for(var i=0;i<resource.length;i++)
		{
			var div = document.createElement("div");
			var datev=resource[i].replace(/>/g, "&gt;");
			datev="\"".concat(datev,"\"");
			var string="<a href='javascript:click_l(".concat(i,",",datev,")' >",resource[i]);
			div.innerHTML = string;
			list.appendChild(div);
		}
	});
}
function click_l(key,dire){
	window.sessionStorage["direid"]=key;
	window.sessionStorage["dire"]=dire;
	var role=window.localStorage["role"];
	if(role=="student"){
		window.location="time.html";
	}
	else if(role="driver"){
		window.location="time_driver.html";
	}
}
/*time.html*/
function time(){
	var date=window.sessionStorage["date"];
	var dire=window.sessionStorage["dire"];
	var dateloca=date.concat(" ",dire);
	document.getElementById("dateloca").innerHTML = dateloca;
	var dateid=window.sessionStorage["dateid"];
	var direid=window.sessionStorage["direid"];
	var data={Date:dateid, Dire:direid};
	$.getJSON('http://192.168.0.5:8080/iLife/time.php?callback=?',data,function(resource){
		var arr_key=Object.keys(resource);
		var list = document.getElementById("list_t");
		for(var i=0;i<arr_key.length;i++)
		{
			var key=arr_key[i];
			var div = document.createElement("div");
			div.setAttribute("id","list_t1");
			var div1 = document.createElement("div");
			div1.setAttribute("id","time");
			div1.innerHTML=resource[key].t;
			div.appendChild(div1);
			var div2 = document.createElement("div");
			div2.setAttribute("id","time1");
			div2.innerHTML=resource[key].number+'/20';
			div.appendChild(div2);
			var div3 = document.createElement("div");
			var input1 = document.createElement("input");
			input1.setAttribute("class","botton1");
			input1.setAttribute("name","list");
			input1.setAttribute("type","button");
			input1.setAttribute("value","查詢名單");
			input1.setAttribute("onClick","click_tc()");
			div.appendChild(input1);
			var input2 = document.createElement("input");
			input2.setAttribute("class","botton1");
			input2.setAttribute("name","time");
			input2.setAttribute("type","button");
			input2.setAttribute("value","預約");
			var tv=resource[key].t.replace(/:/g, ":");
			tv="\"".concat(tv,"\"");
			var string2="javascript:click_t(".concat(key,",",tv,")");
			input2.setAttribute("onclick", string2);
			div.appendChild(input2);
			list.appendChild(div);
		}
	});
}
function click_tc(){
}
function click_t(tid,t){
	window.sessionStorage["tid"]=tid;
	window.sessionStorage["t"]=t;
	window.location="confirm.html";
}
/*confirm.html*/
function con(){
	var userid=window.localStorage["userid"];
	var user=window.localStorage["user"];
	var depart=window.localStorage["depart"];
	var grade=window.localStorage["grade"];
	var string=userid.concat(" ",user," ",depart," ",grade);
	document.getElementById("t1").innerHTML = string;
	var date=window.sessionStorage["date"];
	document.getElementById("t2").innerHTML = date;
	var dire=window.sessionStorage["dire"];
	document.getElementById("t3").innerHTML = dire;
	var time=window.sessionStorage["t"];
	document.getElementById("t4").innerHTML = time;
}
function r(){
	var id=window.sessionStorage["tid"];
	var data={id:id};
	$.getJSON('http://192.168.0.5:8080/iLife/submit.php?callback=?',data,function(resource){
		if(resource["result"]=="suc"){
			window.location="finish.html";
		}
		else if(resource["result"]=="booked"){
			window.location="bus.html";
		}
		else if(resource["result"]=="full"){
			window.location="bus.html";
		}
		else{
			window.location="bus.html";
		}
	});
}