function messageGo(){
	var username =$('#user').val();                                     
	var password =$('#password').val();
	var data = {user:username,password:password};
	$.getJSON('http://192.168.0.5:8080/iLife/instruc/login.php?callback=?',data,function(res){
    if(res.role=="student")
	{
		window.localStorage["userid"]=username;
		window.localStorage["user"]=res.user;
		window.localStorage["depart"]=res.depart;
		window.localStorage["grade"]=res.grade;
		window.localStorage["role"]=res.role;
		window.location = "menu.html";
	}
	else if(res.role=="driver")
	{
		window.localStorage["userid"]=username;
		window.localStorage["user"]=res.user;
		window.localStorage["depart"]=res.depart;
		window.localStorage["grade"]=res.grade;
		window.localStorage["role"]=res.role;
		window.location="driver/bus_driver.html";
	}
	else if(res.role=="none")
	{
		location.reload();
	}
	else
	{
		alert("error!");
	}
	});
}
function display(){
	var user=window.localStorage["userid"];
	var depart=window.localStorage["depart"];
	var username=window.localStorage["user"];
	var grade=window.localStorage["grade"];
	var info_string=username.concat(" ",user," ",depart,grade);
	document.getElementById("info").innerHTML = info_string;
}