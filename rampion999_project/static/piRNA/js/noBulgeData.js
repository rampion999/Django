function noBulgeData(divId,data){
	var table_html = '<table id="'+divId+'-myTable" class="display"><thead>\
						<tr>\
						<th>#</th>\
						<th>piRNA</th>\
						<th>targeted region in input sequence</th>\
						<th style="white-space:nowrap;"># mismatches</th>\
						<th>position in piRNA</th>\
						<th># non-GU mismatches in seed region</th>\
						<th># GU mismatches in seed region</th>\
						<th># non-GU mismatches in non-seed region</th>\
						<th># GU mismatches in non-seed region</th>\
						<th>pairing (top:Input sequence, bottom:piRNA)</th>\
						</tr>\
						</thead><tbody></tbody></table>';
	$('#'+divId+'-targetedTable').append(table_html);
	open_table(divId,data.piRNA_info_name);


	data.newout = data.newout.sort(function (a, b) {
		a1 = parseInt(a[1].split('-')[0]);
		b1 = parseInt(b[1].split('-')[0]);
		return a1 > b1 ? 1 : -1;
	});

	// data.newout = data.newout.sort(function (a, b) {
	// 	a1 = a[13];
	// 	b1 = b[13];
	// 	return a1 > b1 ? 1 : -1;
	// });

	// var fts=[];
	// var seqViewDataArr = [];
	// var firstlast = 0;
	// var stackbig = [-200]; 
	
	// var y = 99;
	// var layer = 0;
	// var most = [0];
	for(var key in data.newout){
	// 	var first = 0;
		if(data.newout[key][0].indexOf("21ur-") == 0){
			var table_html = '<tr id = "'+data.newout[key][0].replace('C.bri.','')+'" class = "name"><th class="mid">'+(Number(key)+1)+'</th><td class="mid" style="white-space:nowrap;"><a href="http://www.wormbase.org/species/c_elegans/gene/'+data.e_NameToId[data.newout[key][0]]+'" target="_blank">'+data.newout[key][0]+'</a></td>';
		}
		else{
			var table_html = '<tr id = "'+data.newout[key][0].replace('C.bri.','')+'" class = "name"><th class="mid">'+(Number(key)+1)+'</th><td class="mid" style="white-space:nowrap;">'+data.newout[key][0]+'</td>';
		}
		      
		table_html += '<td class="mid">'+data.newout[key][1]+'</td>';     
		table_html += '<td class="mid">'+data.newout[key][2]+'</td>';     
		table_html += '<td class="mid">'+data.newout[key][3]+'</td>';     
		// table_html += '<td class="mid">'+data.newout[key][4]+'</td>';
		table_html += '<td class="mid">'+data.newout[key][5]+'</td>';     
		table_html += '<td class="mid">'+data.newout[key][6]+'</td>';
		table_html += '<td class="mid">'+data.newout[key][7]+'</td>';
		table_html += '<td class="mid">'+data.newout[key][8]+'</td>';
		table_html += '<td id="detail" width= 400>'+data.newout[key][9]+'<br><div id="'+divId+'-test'+key+'">'+data.newout[key][10]+'</div></td></tr>'
		$('#'+divId+'-targetedTable').find('tbody').append(table_html);						
		// if ($('#nematodeType').val()=='C.briggsae') {pock();}
	// 	first = parseInt(data.newout[key][1].split('-')[0]);
	// 	fts.push([first,parseInt(data.newout[key][1].split('-')[1]),data.newout[key][0]]);
	// 	var x = '#'+divId+'-test' + key;
	// 	var QQQQ = $(x).text();
	// 	QQQQ = QQQQ.replace(/[\d '|]/g,'');
	// 	var stack = 0;
	// 	//目前的第一個位置比最上方的大21的話表示可以放回第一排，不然就要往下疊
	// 	if (first-stackbig[0] > 21) {stack = 0;stackbig[0] = first;}
	// 	else{ 
	// 		stack++;
	// 		//一層一層比如果有重疊就在往下                 
	// 		while(true){
	// 			if(first-stackbig[stack] > 21 || (stackbig[stack]==undefined)){
	// 				stackbig[stack] = first;break;
	// 			}
	// 			else{stack++;}
	// 		}
	// 	}

	// 	//陣列是從位置小的開始，會先計算出要算第幾排位置
	// 	if (layer < Math.floor((first-1)/100)) {
	// 		var x = layer;
	// 		for (var i = 0; i < Math.floor((first-1)/100) - x; i++) {
	// 			//y初始是99
	// 			y+=100;
	// 			layer++;
	// 			//沒有被定義的部份給0
	// 			if(most[layer]==undefined){most[layer]=0;}                   
	// 		}
	// 	}

	// 	if(first-1<=y){
	// 		if(most[layer]<stack+1){
	// 			most[layer]=stack+1;                    
	// 			if((first-1)%100 > 79){
	// 				most[layer+1]=stack+1;
	// 			}
	// 		}
	// 		else{
	// 			if((first-1)%100 > 79){
	// 				most[layer+1]=stack+1;
	// 			}
	// 		}
	// 	}
	// 	seqViewDataArr.push({
	// 		piRNA : data.newout[key][0],
	// 		firstPos : first,
	// 		detail : QQQQ,
	// 		posOfMis : data.newout[key][3].replace(/<(?:.|\n)*?>/gm, ''),
	// 		posOfMisxGU : data.newout[key][4],
	// 		stack : stack                 
	// 	});
	// 	firstlast = first;
	}
	piRNA_info(divId,data.newout,data.piRNA_info_name,data.options.nematodeType);
	// seqViewDataArr.unshift({most:most});
	resultTable = $('#'+divId+'-myTable').DataTable({
		"ordering": false,
		// "aLengthMenu": [[5,10, 25, 50, -1], [5,10, 25, 50, "All"]],
		// "iDisplayLength": 5,
		// info:false,
		"searching": false,
		"scrollX": true,
		// "paging":false
	});
	
	$('#'+divId+'-myTable_length').removeClass('dataTables_length');
	$('#'+divId+'-myTable_length').addClass('text-left');
	$('#'+divId+'-myTable_length > label').css('display','block');
	var symbol = '';
	symbol += '<span class="float-right">';
	symbol += 	'  <mark style="color: yellow">&nbsp;&nbsp;&nbsp;&nbsp;</mark>  non-GU mismatch &nbsp;&nbsp;&nbsp;&nbsp;';
	symbol += 	'  <mark style="color: lightblue; background-color: lightblue;">&nbsp;&nbsp;&nbsp;&nbsp;</mark>  GU mismatch &nbsp;&nbsp;&nbsp;&nbsp;';
	symbol += 	'  <mark style="color: lightgreen; background-color: lightgreen;">&nbsp;&nbsp;&nbsp;&nbsp;</mark>  mismatch at the 1st position of piRNA &nbsp;&nbsp;&nbsp;&nbsp;';
	symbol += 	'  <span id="detail"><span id="L">|</span>&nbsp;&nbsp;<span id="L">|</span></span>  seed region &nbsp;&nbsp;&nbsp;&nbsp;';
	symbol += '</span>';
	$('#'+divId+'-myTable_length > label').append(symbol);

	// return seqViewDataArr
}