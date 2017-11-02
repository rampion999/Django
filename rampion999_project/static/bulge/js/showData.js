function bulgeData(data){
	var table_html = '<h1 style= "text-align: center;"><b>Targeted piRNAs</b></h1>\
						<table id="myTable" class="display"><thead>\
						<tr>\
						<th width= 150>piRNA</th>\
						<th>targeted region in the input sequences</th>\
						<th>bulge position in the input sequences</th>\
						<th>bulge position in piRNA</th>\
						<th>total number of mismatches</th>\
						<th>position of mismatches in piRNA</th>\
						<th>number of non-GU mismatches in seed region</th>\
						<th>number of GU mismatches in seed region</th>\
						<th>number of non-GU mismatches in non-seed region</th>\
						<th>number of GU mismatches in non-seed region</th>\
						<th>pairing (top:'+data.name+', bottom:piRNA)</th>\
						</tr>\
						</thead><tbody></tbody></table>';

	$('#div_name').append(table_html);


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
		table_html += '<td class="mid">'+(data.newout[key][13]+1)+'</td>';
		table_html += '<td class="mid">'+(data.newout[key][14])+'~'+(data.newout[key][14]+1)+'</td>';      
		table_html += '<td class="mid">'+data.newout[key][2]+'</td>';     
		table_html += '<td class="mid">'+data.newout[key][3]+'</td>';     
		// table_html += '<td class="mid">'+data.newout[key][4]+'</td>';
		table_html += '<td class="mid">'+data.newout[key][5]+'</td>';     
		table_html += '<td class="mid">'+data.newout[key][6]+'</td>';
		table_html += '<td class="mid">'+data.newout[key][7]+'</td>';
		table_html += '<td class="mid">'+data.newout[key][8]+'</td>';
		table_html += '<td id="detail" width= 400>'+data.newout[key][9]+'<br><div id="test'+key+'">'+data.newout[key][10]+'</div></td></tr>'
		$('#div_name').find('tbody').append(table_html);						
		// if ($('#nematodeType').val()=='C.briggsae') {pock();}
		first = parseInt(data.newout[key][1].split('~')[0]);
		fts.push([first,parseInt(data.newout[key][1].split('~')[1]),data.newout[key][0]]);
		var x = 'div#test' + key;
		var QQQQ = $(x).text();
		QQQQ = QQQQ.replace(/[\d '|]/g,'');
		var stack = 0;
		if (first-stackbig[0] > 21+1) {stack = 0;stackbig[0] = first;}
		else{ 
			stack++;                   
			while(true){
				if(first-stackbig[stack] > 21+1 || (stackbig[stack]==undefined)){
					stackbig[stack] = first;
					break;
				}
				else{stack++;}
			}
		}
		if (layer < Math.floor((first-1)/100)) {
			var x = layer;
			// console.log(x);
			for (var i = 0; i < Math.floor((first-1)/100) - x; i++) {
				y+=100;
				layer++;
				if(most[layer]==undefined){most[layer]=0;}                   
			}
		// console.log(layer)						
		}
		if(first-1<=y){
			// console.log('l:'+layer+',y:'+y)
			if(most[layer]<stack+1){
				most[layer]=stack+1;                    
				if((first-1)%100 > 79-1){
					most[layer+1]=stack+1;
				}
			}
			else if(most[layer]==stack+1 && (first-1)%100 > 79-1){
				most[layer+1]=stack+1;
			}
		}
		var bulge_posOfMis = data.newout[key][3].replace(/<(?:.|\n)*?>/gm, '')
		bulge_posOfMis = bulge_posOfMis.split(',')
		for (var bpom in bulge_posOfMis) {
			if (bulge_posOfMis[bpom] > 21-(data.newout[key][13] - first +1)){
				bulge_posOfMis[bpom] = String(Number(bulge_posOfMis[bpom])+1);
			}	
		}
		bulge_posOfMis = bulge_posOfMis.join();

		var bulge_posOfMisxGU = data.newout[key][4];

		bulge_posOfMisxGU = bulge_posOfMisxGU.split(',')
		for (var bpom in bulge_posOfMisxGU) {
			if (bulge_posOfMisxGU[bpom] > 21-(data.newout[key][13] - first +1)){
				bulge_posOfMisxGU[bpom] = String(Number(bulge_posOfMisxGU[bpom])+1);
			}	
		}
		bulge_posOfMisxGU = bulge_posOfMisxGU.join();

		seqViewDataArr.push({
			piRNA : data.newout[key][0],
			firstPos : first,
			detail : QQQQ,
			posOfMis : bulge_posOfMis,
			posOfMisxGU : bulge_posOfMisxGU,
			stack : stack,
			bulge : (data.newout[key][13] - first +1),                 
		});
		firstlast = first;
	}
	seqViewDataArr.unshift({most:most});
	resultTable = $('#myTable').DataTable({
		"ordering": false,
		// info:false,
		"searching": false,
		// "paging":false
	});
	return seqViewDataArr
}