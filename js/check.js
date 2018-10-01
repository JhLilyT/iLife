/*record.html*/
function check_list(){
	$.getJSON('http://192.168.0.5:8080/iLife/record.php?callback=?',{},function(res){
		var arr_key=Object.keys(res);
		var list = document.getElementById("list_tag");
		for(var i=0;i<arr_key.length;i++)
		{
			var key=arr_key[i];
			var div = document.createElement("div");
			div.setAttribute("id","list_r");
			var div1 = document.createElement("div");
			div1.setAttribute("id","time");
			var string=res[key].d.concat(" ",res[key].t);
			div1.innerHTML=string;
			div.appendChild(div1);
			var div2 = document.createElement("div");
			div2.setAttribute("id","time");
			div2.innerHTML=res[key].dire;
			div.appendChild(div2);
			var div3 = document.createElement("div");
			var input1 = document.createElement("input");
			input1.setAttribute("class","botton3");
			input1.setAttribute("name","time");
			input1.setAttribute("type","button");
			input1.setAttribute("value","取消");
			var tv=res[key].t.replace(/:/g, ":");
			tv="\"".concat(tv,"\"");
			var td=res[key].d.replace(/-/g, "-");
			td="\"".concat(td,"\"");
			var tdi=res[key].dire.replace(/-/g, "-");
			tdi=tdi.replace(/>/g, ">");
			tdi="\"".concat(tdi,"\"");
			var string2="javascript:click_d(".concat(key,",",td,",",tv,",",tdi,")");
			input1.setAttribute("onclick", string2);
			div.appendChild(input1);
			list.appendChild(div);
		}
	});
}
function click_d(orderid,d,t,dire){
	window.sessionStorage["order_dele"]=orderid;
	window.sessionStorage["d_dele"]=d;
	window.sessionStorage["t_dele"]=t;
	window.sessionStorage["dire_dele"]=dire;
	window.location="dele_con.html";
}
/*dele_con.html*/
function dele_c(){
	var userid=window.localStorage["userid"];
	var user=window.localStorage["user"];
	var depart=window.localStorage["depart"];
	var grade=window.localStorage["grade"];
	var string=userid.concat(" ",user," ",depart," ",grade);
	document.getElementById("t1").innerHTML = string;
	var date=window.sessionStorage["d_dele"];
	document.getElementById("t2").innerHTML = date;
	var dire=window.sessionStorage["dire_dele"];
	document.getElementById("t3").innerHTML = dire;
	var time=window.sessionStorage["t_dele"];
	document.getElementById("t4").innerHTML = time;
}
function y(){
	var Order=window.sessionStorage["order_dele"];
	var data={Order:Order};
	$.getJSON('http://192.168.0.5:8080/iLife/delete.php?callback=?',data,function(resource){
		if(resource["result"]=="s"){
			window.location="dele_suc.html";
		}
		else if(resource["result"]=="f"){
			window.location="record.html";
		}
		else{
			window.location="record.html";
		}
	});
}
function n(){
	window.location="record.html";
}