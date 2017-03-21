PreLoadCls = function()
{
	this.HttpAry=[];
	this.HttpResNum=0;
	this.WndNum=0;
	this.WndResNum=0;
}
PreLoadCls.prototype.Add = function(url, id)
{
	console.log(sprintf("PreLoad add %s: %s", this.HttpAry.length, url));	
	var obj={};
	obj.Url=url;
	obj.Id=id;
	obj.ResObj=null;
	obj.ResCode=0;
	this.HttpAry.push(obj);
}
PreLoadCls.prototype.HttpCb = function(evt, tag)
{
	if (evt.type!="loadend")
		return;
	var obj=this.HttpAry[tag];	
	console.log(sprintf("PreLoad done %s: %s", tag, obj.Url));
	obj.ResText=evt.target.responseText;
	//obj.ResCode=evt.target.responseText;
	this.HttpResNum++;
	if (this.HttpResNum+this.WndResNum<this.HttpAry.length+this.WndNum)
		return;
	CallBack(0, this.CbFun, this.CbObj, this.CbTag);
}
PreLoadCls.prototype.WndCb = function(evt, tag)
{
	this.WndResNum++;
	console.log(sprintf("PreLoad done: wnd"));	
	if (this.HttpResNum+this.WndResNum<this.HttpAry.length+this.WndNum)
		return;
	CallBack(0, this.CbFun, this.CbObj, this.CbTag);
}
PreLoadCls.prototype.End = function(wnd_wait, cb_fun, cb_obj, cb_tag)
{
	for (var i=0;i<this.HttpAry.length;i++)
	{
		var obj=this.HttpAry[i];
		HttpAsync("GET", obj.Url, 0, this.HttpCb, this, i); 
	};
	this.CbFun=cb_fun;
	this.CbObj=cb_obj;	
	this.CbTag=cb_tag;
	if (wnd_wait==0)
		return;
	console.log(sprintf("PreLoad add: wnd"));		
	this.WndNum++;
	window.onload=this.WndCb.bind(this);
}
PreLoadCls.prototype.Get = function(id)
{
	for (var i=0;i<this.HttpAry.length;i++)
	{
		var obj=this.HttpAry[i];
		if (obj.Id==id)
			return obj;
	}
	return 0;
}
PreLoadCls.prototype.Clr = function()
{
	this.HttpAry=[];
	this.HttpResNum=0;
	this.WndNum=0;
	this.WndResNum=0;
}