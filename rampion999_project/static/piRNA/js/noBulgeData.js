function noBulgeData(divId,data){
	var table_html = '<table id="'+divId+'-myTable" class="display"><thead>\
						<tr>\
						<th width= 150>piRNA</th>\
						<th>targeted region in the input sequences</th>\
						<th>total number of mismatches</th>\
						<th>position of mismatches in piRNA</th>\
						<th>number of non-GU mismatches in seed region</th>\
						<th>number of GU mismatches in seed region</th>\
						<th>number of non-GU mismatches in non-seed region</th>\
						<th>number of GU mismatches in non-seed region</th>\
						<th>pairing (top:'+data.name+', bottom:piRNA)</th>\
						</tr>\
						</thead><tbody></tbody></table>';
	$('#'+divId+'-targetedTable').append(table_html);
	open_table(divId,data.piRNA_info_name);


	data.newout = data.newout.sort(function (a, b) {
		a1 = parseInt(a[1].split('~')[0]);
		b1 = parseInt(b[1].split('~')[0]);
		return a1 > b1 ? 1 : -1;
	});

	data.newout = data.newout.sort(function (a, b) {
		a1 = a[13];
		b1 = b[13];
		return a1 > b1 ? 1 : -1;
	});

	var fts=[];
	var seqViewDataArr = [];
	var firstlast = 0;
	var stackbig = [-200]; 
	
	var y = 99;
	var layer = 0;
	var most = [0];
	for(var key in data.newout){
		var first = 0;
		var table_html = '<tr id = "'+data.newout[key][0].replace('C.bri.','')+'" class = "name"><td class="mid">'+data.newout[key][0]+'</td>';      
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
		first = parseInt(data.newout[key][1].split('~')[0]);
		fts.push([first,parseInt(data.newout[key][1].split('~')[1]),data.newout[key][0]]);
		var x = '#'+divId+'-test' + key;
		var QQQQ = $(x).text();
		QQQQ = QQQQ.replace(/[\d '|]/g,'');
		var stack = 0;
		if (first-stackbig[0] > 21) {stack = 0;stackbig[0] = first;}
		else{ 
			stack++;                   
			while(true){
				if(first-stackbig[stack] > 21 || (stackbig[stack]==undefined)){
					stackbig[stack] = first;break;
				}
				else{stack++;}
			}
		}
		if (layer < Math.floor((first-1)/100)) {
			var x = layer;
			for (var i = 0; i < Math.floor((first-1)/100) - x; i++) {
				y+=100;
				layer++;
				if(most[layer]==undefined){most[layer]=0;}                   
			}
		}
		if(first-1<y){
			if(most[layer]<stack+1){
				most[layer]=stack+1;                    
				if((first-1)%100 > 79){
					most[layer+1]=stack+1;
				}
			};
		}
		seqViewDataArr.push({
			piRNA : data.newout[key][0],
			firstPos : first,
			detail : QQQQ,
			posOfMis : data.newout[key][3].replace(/<(?:.|\n)*?>/gm, ''),
			posOfMisxGU : data.newout[key][4],
			stack : stack                 
		});
		firstlast = first;
	}
	piRNA_info(divId,data.newout,data.piRNA_info_name,data.options.nematodeType);
	seqViewDataArr.unshift({most:most});
	resultTable = $('#'+divId+'-myTable').DataTable({
		"ordering": false,
		// info:false,
		"searching": false,
		// "paging":false
	});
	return seqViewDataArr
}