
var DbTbView= function(div, tb_ary)
{
	var tr = document.createElement('tr');   	
	for (var i = 0; i < tb_ary.length;)
	{
		var str;
		if (i==0)
			str="Action";
		else
			str=sprintf("%s(%s)",tb_ary[i],tb_ary[i+1]);
		var text = document.createTextNode(str);
		var th = document.createElement('th');		
		th.appendChild(text);
		tr.appendChild(th);	
		if (i==0)
			i++;
		else
			i+=2;
	}
	
	var table = document.createElement('table');	
	table.appendChild(tr);	
	div.innerHTML="";	
	div.appendChild(table);
}
var DbRsView= function(div, name, tb_ary, rs_ary)
{
	var table=div.querySelector('table');
	var cap= table.createCaption();
    cap.innerHTML = sprintf("<b>%s</b>", name);
	var fd_num=(tb_ary.length-1)/2;
	for (var i = 1; i < rs_ary.length; i+=fd_num)
	{
		var tr = document.createElement('tr'); 
		var td = document.createElement('td');		
		td.innerHTML="<button>Read</button>/<button>Del</button>";
		tr.appendChild(td);	
			
		for (var j=0; j < fd_num; j++)
		{
			var text = document.createTextNode(rs_ary[i+j]);
			var td = document.createElement('td');		
			td.appendChild(text);
			tr.appendChild(td);	
		}
		table.appendChild(tr);	
	}

	var tr = document.createElement('tr'); 
	var td = document.createElement('td');		
	td.innerHTML="<button>Add</button>";
	tr.appendChild(td);	
	for (var j=0; j < fd_num; j++)
	{
		var td = document.createElement('td');		
		if (j>0)
		{
			var text = document.createTextNode("nil");		
			td.appendChild(text);
			td.contentEditable=true;
		}
		tr.appendChild(td);	
	}
	table.appendChild(tr);		
}
