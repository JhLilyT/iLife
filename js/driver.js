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
			var input2 = document.createElement("input");
			input2.setAttribute("class","botton1");
			input2.setAttribute("name","time");
			input2.setAttribute("type","button");
			input2.setAttribute("value","查詢");
			var tv=resource[key].t.replace(/:/g, ":");
			tv="\"".concat(tv,"\"");
			var string2="javascript:click_t(".concat(key,",",tv,")");
			input2.setAttribute("onclick", string2);
			div.appendChild(input2);
			list.appendChild(div);
		}
	});
}
function click_t(busid,t){
	window.sessionStorage["busid"]=busid;
	window.sessionStorage["t"]=t;
	window.location="driver_list.html";
}
/*driver_list*/
function d_list(){
	var date=window.sessionStorage["date"];
	var dire=window.sessionStorage["dire"];
	var t=window.sessionStorage["t"];
	var dateloca=date.concat(" ",dire," ",t);
	document.getElementById("t1").innerHTML = dateloca;
	var busid=window.sessionStorage["busid"];
	var data={ID:busid};
	$.getJSON('http://192.168.0.5:8080/iLife/driver/driver_list.php?callback=?',data,function(resource){
		var arr_key=Object.keys(resource);
		var list = document.getElementById("css_table");
		for(var i=0;i<arr_key.length;i++)
		{
			var key=arr_key[i];
			var tr = document.createElement("tr");
			var td1 = document.createElement("td");
			td1.setAttribute("class","css_td");
			td1.innerHTML=key;
			var td2 = document.createElement("td");
			td2.setAttribute("class","css_td");
			var string= resource[key].department.concat(resource[key].grade);
			td2.innerHTML=string;
			var td3 = document.createElement("td");
			td3.setAttribute("class","css_td");
			td3.innerHTML=resource[key].username;
			var td4 = document.createElement("td");
			td4.setAttribute("class","css_td");
			var input = document.createElement("input");
			input.setAttribute("type","checkbox");
			input.setAttribute("name","list[]");
			input.setAttribute("value",key);
			input.setAttribute("id",key);
			td4.appendChild(input);
			tr.appendChild(td1);
			tr.appendChild(td2);
			tr.appendChild(td3);
			tr.appendChild(td4);
			list.appendChild(tr);
		}
	});
}
function store(){
	var trs=document.getElementsByTagName("tr");
	var k=0;
	var t_list=[];
	for(var i=1;i<trs.length;i++)
	{
		if(trs[i].childNodes[3].childNodes[0].checked==true)
		{	
			t_list[k]=trs[i].childNodes[3].childNodes[0].id;
			k=k+1;
		}
	}
	window.sessionStorage["list"]=t_list;
	window.location="driver_conform.html";
}
/*driver_conform.html*/
function con_sub(){
	var date=window.sessionStorage["date"];
	document.getElementById("t1").innerHTML = date;
	var dire=window.sessionStorage["dire"];
	document.getElementById("t2").innerHTML = dire;
	var time=window.sessionStorage["t"];
	document.getElementById("t3").innerHTML = time;
}
function t(){
	var id=window.sessionStorage["busid"];
	var list=window.sessionStorage["list"];
	var data={id:id,list:list};
	$.getJSON('http://192.168.0.5:8080/iLife/driver/driver_sub.php?callback=?',data,function(resource){
		if(resource["result"]=="suc"){
			window.location="driver_suc.html";
		}
		else if(resource["result"]=="none"){
			window.location="driver_suc.html";
		}
		else if(resource["result"]=="fail"){
			window.location="driver_fail.html";
		}
		else{
			window.location="bus_driver.html";
		}
	});
}