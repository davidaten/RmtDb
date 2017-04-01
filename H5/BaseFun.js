var printf = function(str, arr) {
    var i = -1;
    function callback(exp, p0, p1, p2, p3, p4) {
        if (exp=='%%') return '%';
        if (arr[++i]===undefined) return undefined;
        var exp  = p2 ? parseInt(p2.substr(1)) : undefined;
        var base = p3 ? parseInt(p3.substr(1)) : undefined;
        var val;
        switch (p4) {
            case 's': val = arr[i]; break;
            case 'c': val = arr[i][0]; break;
            case 'f': val = parseFloat(arr[i]).toFixed(exp); break;
            case 'p': val = parseFloat(arr[i]).toPrecision(exp); break;
            case 'e': val = parseFloat(arr[i]).toExponential(exp); break;
            case 'x': val = parseInt(arr[i]).toString(base?base:16); break;
            case 'd': val = parseFloat(parseInt(arr[i], base?base:10).toPrecision(exp)).toFixed(0); break;
        }
        val = typeof(val)=='object' ? JSON.stringify(val) : val.toString(base);
        var sz = parseInt(p1); /* padding size */
        var ch = p1 && p1[0]=='0' ? '0' : ' '; /* isnull? */
        while (val.length<sz) val = p0 !== undefined ? val+ch : ch+val; /* isminus? */
       return val;
    }
    var regex = /%(-)?(0?[0-9]+)?([.][0-9]+)?([#][0-9]+)?([scfpexd])/g;
    return str.replace(regex, callback);
}

// JavaScript source code
function sprintf(format) {
    for (var i = 1; i < arguments.length; i++) {
        format = format.replace(/%s/, arguments[i]);
    }
    return format;
}
//-------------------------------------------------------------------------------------
//Oppsite to parseInt()
function Int2Str(value, radio, len) {

    if (arguments.lenth < 3) {
        len = 0;
    }
    if (arguments.lenth < 2) {
        radio = 10;
    }
    if (arguments.lenth < 1) {
        return "";
    }
    var str = value.toString(radio);
    while (str.length < len) {
        str = "0" + str;
    };
    return str;
}
//-------------------------------------------------------------------------------------
function StrChgCase(str, type, off, len) 
{
	if (off>=str.length)
		return str;
	if (len==0)
		return str;
	if (off<0)
		off=0;
	var max=str.length-off;
	if (len<0)
		len=max;
	if (len>=max)
		len=max;
	console.log(sprintf("str=%s, off=%s, len=%s"), str, off, len);
	var sub, tgt, res;
	sub=str.substr(off, len);
	if (type) 
		tgt=sub.toUpperCase();
	else
		tgt=sub.toLowerCase();
	res="";
	if (off>0)
		res+=str.substr(0, off);
	res+=tgt;
	if (off+len<str.length)
		res+=str.substr(off+len, str.length-off-len);
	
	return res;
}
//Allow my own single and multiple inheritance
function PrototypeExtend(dst, src) 
{
	var fun=dst.constructor;
	for (var k in src) 
		if (src.hasOwnProperty(k)) 
			dst[k] = src[k];
	dst.constructor=fun;		
	return dst; 
}
function CallBack(evt, cb_fun, cb_obj, cb_tag)
{
	if (!cb_fun)
		return;
	if (cb_obj)
		cb_fun.call(cb_obj, evt, cb_tag);
	else
		cb_fun(evt, cb_tag);
}



function HtmlRgb(r, g, b) {
    if (r > 255) r = 255;
    if (r < 0) r = 0;
    if (g > 255) g = 255;
    if (g < 0) g = 0;
    if (b > 255) b = 255;
    if (b < 0) b = 0;
    return sprintf("#%s%s%s", PadInt(r, 16, 2), PadInt(g, 16, 2), PadInt(b, 16, 2));
}
//-------------------------------------------------------------------------------------
//String result: as"as -> "as\"as" ; number result: 0 ->"0"
function JsonStrGet(val)
{
	var str=JSON.stringify(val);	
	var s0=str.substring(0,1);
	if (s0!='"')
		str='"'+str+'"';
	return str;
}
function JsonAryByList()
{
	var  ary=[];
	for (var i = 0; i < arguments.length; i++) 
	{
		var str=JsonStrGet(arguments[i]);
		ary.push(str);
	}
	return ary;
}
function JsonAryToBlob(ary)
{
	var str= '['+ary.join(",")+']';
	var blob = new Blob([str], { type: 'text/plain' });
	
	return blob;
}
function JsonAry4StrList()
{
	var  ary=[];
	for (var i = 0; i < arguments.length; i++) 
		ary.push(JSON.stringify(arguments[i]));
	var str= '['+ary.join(",")+']';
	
	var  ary1=[];
	for (var i = 0; i < arguments.length; i++) 
		ary1.push(arguments[i]);		
	var str1=JSON.stringify(ary1);
	
	return str1;
}

function StrCodeDbg(str) {
    for (var i = 0; i < str.length; i++) {
        console.log(sprintf("i=%s,char=%s,code=x%s", i, str.charAt(i), str.charCodeAt(i).toString(16)));
    }
}
//-------------------------------------------------------------------------------------
function Bool2Str(val)
{
	if (val) 
		return "1";
	else
		return "0";
}
//-------------------------------------------------------------------------------------	
//Local string: 2016-02-12[, 03:46:22.87]
//If okay, return date type; else return string type
//Gmt=0, kenya=+3, van=-7
function Str2Dt(str, type)
{
	var ary_dt=str.split(",");//If no "," there, array[0]=str.
	var ary_d,	ary_t, dt;	
	ary_d=ary_dt[0].split("-");
	if (ary_d.length!=3)
		return "Invalid Date!";
	if (type=="dt")
	{
		if (ary_dt.length!=2)
			return "Invalid Time!";
		ary_t=ary_dt[1].split(":");
		if (ary_t.length!=3)
			return "Invalid Time!";
		dt = new Date(ary_d[0],ary_d[1]-1,ary_d[2],ary_t[0],ary_t[1],ary_t[2]);//Month from 0
	}
	else
		dt = new Date(ary_d[0],ary_d[1]-1,ary_d[2]);//Month from 0

	if (isNaN(dt.getTime() ) )
		return "Invalid Datetime!";

	return dt;
}
function Dt2Str(dt, type)
{
    if (!dt)
        dt = new Date();

    var str;
	switch(type)
	{
		case "d": 
			str = sprintf("%s-%s-%s",	Int2Str(dt.getFullYear(), 10, 4),  Int2Str(dt.getMonth() + 1, 10, 2), 	Int2Str(dt.getDate(), 10, 2));
			break;
		case "dt": 
			str = sprintf("%s-%s-%s, %s:%s:%s",  Int2Str(dt.getFullYear(), 10, 4), Int2Str(dt.getMonth() + 1, 10, 2),	Int2Str(dt.getDate(), 10, 2),
				Int2Str(dt.getHours(), 10, 2), Int2Str(dt.getMinutes(), 10, 2), Int2Str(dt.getSeconds(), 10, 2));
			break;
		case "z":
		    var zdm = dt.getTimezoneOffset();
			if (zdm >= 0)
				zdm_sign = "-";//Oppsite to positive
			else
			{
				zdm_sign = "+";//Oppsite to negtive
				zdm = -zdm;
			}
			str = sprintf("%s%s:%s",  zdm_sign, Int2Str(zdm/60, 10, 2),  Int2Str(zdm%60, 10, 2));
			break;
		case "dtz": //2011-10-05T14:48:00.000Z
			str = dt.toISOString();
			break;			
		}

    return str;
}
//-------------------------------------------------------------------------------------
function UrlQry2Ary()
{
	var query = window.location.search.slice(1);
	if (query=="")
		return [];
	var ary = query.split('&');
	return ary;
}
//-------------------------------------------------------------------------------------
function UrlQry2Obj()
{
	var query = window.location.search.slice(1);
	var ary = query.split('&');
	var i, grp, obj={};
	for(i = 0; i < ary.length; i++)
    {
        grp = ary[i].split('=');
        obj[grp[0]] = grp[1];
    }
	return obj;
}	
function SidLogin(type, sid, mbr, email, role, state)
{
	sessionStorage.setItem("Sid-Act", "login");
	sessionStorage.setItem("Sid-Email", email);	
	sessionStorage.setItem("Sid-Mbr", mbr);		
	sessionStorage.setItem("Sid-Role", role);				
	sessionStorage.setItem("Sid-State", state);							
	switch(type)
	{
		case "tab"://Login but not save to browser
			sessionStorage.setItem("Sid-Type", "tab");						
			sessionStorage.setItem("Sid-Sid", sid);		
			break;
		case "sys"://Login and save to browser
			sessionStorage.setItem("Sid-Type", "sys");			
			sessionStorage.setItem("Sid-Sid", sid);		
			localStorage.setItem("Sid-Act", "login");				
			localStorage.setItem("Sid-Sid", sid);					
			localStorage.setItem("Sid-Mbr", mbr);			
			localStorage.setItem("Sid-Email", email);	
			localStorage.setItem("Sid-Role", role);				
			localStorage.setItem("Sid-State", state);							
			break;
	}
}
function SidInit()
{
	if (sessionStorage.getItem("Sid-Act")=="logout")
		return 0;
	if (SidValid("tab"))//Valid session
	    if (sessionStorage.getItem("Sid-Type")=="tab")
			return 1;
	if (!SidValid("sys"))//Invalid local     
	{	
		SidLogout("sys");
		return 0;
	}
	//Setup session from local
	sessionStorage.setItem("Sid-Type", "sys");					
	sessionStorage.setItem("Sid-Act", "login");
	sessionStorage.setItem("Sid-Sid", localStorage.getItem("Sid-Sid"));				
	sessionStorage.setItem("Sid-Mbr", localStorage.getItem("Sid-Mbr"));		
	sessionStorage.setItem("Sid-Email", localStorage.getItem("Sid-Email"));	
	sessionStorage.setItem("Sid-Role", localStorage.getItem("Sid-Role"));		
	sessionStorage.setItem("Sid-State", localStorage.getItem("Sid-State"));		
	return 1;
}
function SidUse(xhttp)
{
	if (sessionStorage.getItem("Sid-Act")!="login")
		return;
	var type=sessionStorage.getItem("Sid-Type");
	if (sessionStorage.getItem("Sid-Type")=="tab")
	{
		xhttp.setRequestHeader("SID", sessionStorage.getItem("Sid-Sid"));
		return;
	}
	//if (sessionStorage.getItem("Sid-Type")=="sys")	
	if (SidValid("sys"))
		if (SidMatch())
		{
			sessionStorage.setItem("Sid-Sid", localStorage.getItem("Sid-Sid"));		
			xhttp.setRequestHeader("SID", sessionStorage.getItem("Sid-Sid"));
			return;
		}
	sessionStorage.removeItem("Sid-Act");
}
function SidChg(xhttp)
{
	if (sessionStorage.getItem("Sid-Act")!="login")
		return;
	var sid=xhttp.getResponseHeader("SID");
	if (!sid)
		return;
	sessionStorage.setItem("Sid-Sid", sid);
	if (sessionStorage.getItem("Sid-Type")=="tab")
		return;
	//if (sessionStorage.getItem("Sid-Type")=="sys")
	if (SidValid("sys"))
		if (SidMatch())
		{
			localStorage.setItem("Sid-Sid", sid);
			return;
		}
	sessionStorage.removeItem("Sid-Act");
}
function SidLogout(type)
{
	if (type=="tab")//Logout from tab, set logout to avoid auto login from sys
		sessionStorage.setItem("Sid-Act", "logout");	
	else
		sessionStorage.removeItem("Sid-Act");						
	if (type=="err") //Expired login, clear according to type
		type=sessionStorage.getItem("Sid-Type");
	sessionStorage.removeItem("Sid-Type");					
	sessionStorage.removeItem("Sid-Sid");					
	sessionStorage.removeItem("Sid-Mbr");		
	sessionStorage.removeItem("Sid-Email");	
	sessionStorage.removeItem("Sid-Role");	
	sessionStorage.removeItem("Sid-State");		

	if (type=="sys")
	{
		localStorage.removeItem("Sid-Act");								
		localStorage.removeItem("Sid-Sid");					
		localStorage.removeItem("Sid-Mbr");			
		localStorage.removeItem("Sid-Email");		
		localStorage.removeItem("Sid-Role");		
		localStorage.removeItem("Sid-State");		
	}
}
function SidValid(type) 
{
	var store=sessionStorage;
	if (type=="sys")
		store=localStorage;
	if (store.getItem("Sid-Act")!="login")
		return 0;
	var email=store.getItem("Sid-Email");	
	if (!email)
		return 0;
	if (email.indexOf("@")<0)
		return 0;
	var mbr=store.getItem("Sid-Mbr");	
	mbr=parseInt(mbr);
	if (mbr<=0)
		return 0;
	if (mbr>0xfffffff)
		return 0;
	var sid=store.getItem("Sid-Sid");	
	if (!sid)
		return 0;
	if (sid=="0-0-0")
		return 0;
	var ary=sid.split("-");	
	if (ary.length!=3)
		return 0;
	if (type=="sys")
		return 1;
	var type0=store.getItem("Sid-Type");	
	if (type0=="tab")
		return 1;
	if (type0=="sys")
		return 1;
	return 0;
}	
function SidMatch() 
{
	var sid0=localStorage.getItem("Sid-Sid");	
	var sid1=sessionStorage.getItem("Sid-Sid");		
	var ary0=sid0.split("-");	
	var ary1=sid1.split("-");		
	if ((ary0[0]==ary1[0])&&(ary0[1]==ary1[1]))
		return 1;
	return 0;
}
//-------------------------------------------------------------------------------------
//function KjvDownloadCb(evt, tag_any)
//{
//	if (evt.type=="loadend")
//	{
//      var http=evt.target;
//      console.log(sprintf("type=%s,ready=%s,status=%s", evt.type, http.readyState, http.status));
//		if (http.status==200)
//			console.log("Okay");
//		else 
//			console.log("Fail");	
//	}
//	else
//	{   //When pos evt.target isn't http, but http.upload.
//      console.log(sprintf("type=%s, total=%s,loaded=%s", evt.type,  evt.total, evt.loaded));
//		if (evt.lengthComputable) 
//		{
//			var ratio = Math.floor((evt.loaded / evt.total) * 100) + '%';
//			console.log(ratio);
//		}
//	}
//}
//Above is an example callback for HttpAsync 
//EDGE, IE and FF's progress event not include readyState=4

function HttpReqNew(cmd, url) 
{
	var xreq = new XMLHttpRequest();
	xreq.open(cmd, url, true);
	SidUse(xreq);
	return xreq;
}	
function HttpReqCb(xreq, cb_type, cb_fun, cb_obj, cb_any) 
{
	var fun=function(evt) 
	{
		if (evt.type == "loadend")
			SidChg(evt.target);
		if (cb_obj!=null)
			cb_fun.call(cb_obj, evt, cb_any);
		else
			cb_fun(evt, cb_any);
	};
	if (type&1)
		xreq.upload.onprogress = fun;//This is for upstream data	
	if (type&2)
		xreq.onprogress = fun;//This is for downstream data
	xreq.onloadend = fun;//Post rseult data end
}
function HttpReqGo(xreq, dat) 
{
}
function HttpAsync(cmd,url,dat,cb_fun,cb_obj,cb_any) 
{
	var fun=function(evt) 
	{
		if (evt.type == "loadend")
			SidChg(evt.target);
		
		if (cb_obj!=null)
			cb_fun.call(cb_obj, evt, cb_any);
		else
			cb_fun(evt, cb_any);
		
	};
	var xhttp = new XMLHttpRequest();
	xhttp.open(cmd, url, true);
	xhttp.setRequestHeader("Content-Type", "text/plain");
	if (cb_fun) 
	{
		
		if (dat)		
			xhttp.upload.onprogress = fun;//This is for upstream data
		else
			xhttp.onprogress = fun;//This is for downstream data
		xhttp.onloadend = fun;//Post rseult data end
	}
	
	//SidUse(xhttp);

	if (dat)
		xhttp.send(dat);
	else
		xhttp.send();
}
function HttpFileGet(url,cb_fun,cb_obj,cb_any) 
{
	HttpAsync("GET",url,0,cb_fun,cb_obj,cb_any); 
}
//-------------------------------------------------------------------------------------
function FileSaveBlob(blob, fname) 
{
	if (navigator.msSaveBlob)
	{
		window.navigator.msSaveBlob(blob, fname);
		return;
	};
	
	var a_div = document.createElement("a");
	a_div.style = "display: none";
    document.body.appendChild(a_div);
	a_div.download = fname;
	var url = window.URL.createObjectURL(blob);
	a_div.href = url;
	a_div.click();

	var clrfun = function() {
		document.body.removeChild(a_div);
		window.URL.revokeObjectURL(url);
		console.log("FileSave clr");
	}
	setTimeout(clrfun, 350);
}
//Must clean up at callback: 
//document.body.removeChild(evt.target);
function FileSelect(cb_fun, cb_obj, cb_any) 
{
	i_div = document.createElement("input");
	i_div.type="file";
	i_div.style.display="none";
	document.body.appendChild(i_div);
	i_div.onchange = function(evt){
        if (cb_obj!=null)
            cb_fun.call(cb_obj, evt, cb_any);
        else
            cb_fun(evt, cb_any);
	};
	i_div.click();
}
function FileReadTxt(file_obj, cb_fun, cb_obj, cb_any) 
{
	var fileReader = new FileReader();
	fileReader.onload = function(evt){
        if (cb_obj!=null)
            cb_fun.call(cb_obj, evt, cb_any);
        else
            cb_fun(evt, cb_any);
	};
	fileReader.readAsText(file_obj, "UTF-8");
}
