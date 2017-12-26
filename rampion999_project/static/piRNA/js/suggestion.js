function shit(divId,sug,sugNotCDS,a,b,c,d,e,name,gene,nematodeType,CDS1,CDS2,csrf,ori_data,pic2src,scanUrl,seqViewDataArr,userNum){
	var duplicateFir = []; //有重複的checkbox第一個位置
	var duplicateDict = {};
	var frontCount = 0;
	var midCount = 0;
	var lastCount = 0;

	//////////////Rule說明
	var ruleText = '<div class="escape" style="text-align:left;">';
	ruleText += 		'<h2>Rules for piRNA targeting</h2>';
	ruleText +=			'<div class="row pt-4">';

	// ruleText +=				'<div class="col-1">';
	// ruleText +=				'</div>';

	ruleText +=				'<div class="col-4">';
	ruleText +=					'<ul class="list-unstyled">';
	ruleText +=						'<li class="card-text">';
	ruleText +=							'<b>Number of mismatches allowed at seed region:</b>';
	ruleText +=						'</li>';


	ruleText +=						'<li class="card-text">';
	ruleText +=							'<ul>';
	ruleText +=								'<li>';
	ruleText +=									'<span class="badge badge-dark">Rule 1</span> number of non-GU pairs &nbsp;≤&nbsp;'+a;
	ruleText +=								'</li>';
	ruleText +=								'<li>';
	ruleText +=									'<span class="badge badge-dark">Rule 2</span> number of GU pairs &nbsp;≤&nbsp;'+b;
	ruleText +=								'</li>';
	ruleText +=							'</ul>';
	ruleText +=						'</li>';
	ruleText +=					'</ul>';
	ruleText +=				'</div>';

	ruleText +=				'<div class="col-4">';
	ruleText +=					'<ul class="list-unstyled">';
	ruleText +=						'<li class="card-text">';
	ruleText +=							'<b>Number of mismatches allowed at non-seed region:</b>';
	ruleText +=						'</li>';


	ruleText +=						'<li class="card-text">';
	ruleText +=							'<ul>';
	ruleText +=								'<li>';
	ruleText +=									'<span class="badge badge-dark">Rule 3</span> number of non-GU pairs &nbsp;≤&nbsp;'+c;
	ruleText +=								'</li>';
	ruleText +=								'<li>';
	ruleText +=									'<span class="badge badge-dark">Rule 4</span> number of GU pairs &nbsp;≤&nbsp;'+d;
	ruleText +=								'</li>';
	ruleText +=							'</ul>';
	ruleText +=						'</li>';
	ruleText +=					'</ul>';
	ruleText +=				'</div>';

	ruleText +=				'<div class="col-4">';
	ruleText +=					'<ul class="list-unstyled">';
	ruleText +=						'<li class="card-text">';
	ruleText +=							'<span class="badge badge-dark">Rule 5</span> <b>Total number of mismatches at seed & non-seed regions ≤&nbsp;</b>'+e;
	ruleText +=						'</li>';
	ruleText +=					'</ul>';
	ruleText +=				'</div>';

	// ruleText +=				'<div class="col-1">';
	// ruleText +=				'</div>';


	ruleText +=			'</div>';
	$('#'+divId+'-sugTable').append(ruleText);
	//////////////Rule說明







	///////////////先創CDS前表格
	for (var i in sugNotCDS){
		if(sugNotCDS[i][1] > CDS1){break;}
		var table_html = '';
		var table = '';
		table_html += '<div class="my-4 py-4" id="'+divId+'-sugPicTableDiv_'+i+'"><table id="'+divId+'-sugPicTable_'+i+'" class="sugTable bw" width= 100%><thead><tr><th style="width: 200px;">piRNA</th>';
		table_html += '<th style="width: 100px;">targeted region in input sequence</th>';
		// table_html += '<th width= 100>original situation</th>';
		table_html += '<td colspan="7"><svg id="'+divId+'-overView_'+i+'"></svg></td>';
		table_html += '</tr></thead><tbody>';
		var span = sugNotCDS[i][7].length+1;
		table += '<tr><td class="mid" rowspan="'+(span+2)+'">'+sugNotCDS[i][0]+'</td>';
		table += '<td class="mid" rowspan="'+(span+2)+'">'+sugNotCDS[i][1]+'~'+(sugNotCDS[i][1]+(sugNotCDS[i][2]-1))+'</td>';
		table += '<td colspan="4" rowspan="2"></td><td>pairing (top: input sequence, bottom: piRNA)</td><td rowspan="2"></td></tr>';
		table += '<tr><td id="'+divId+'-piPic'+i+'" class="mid"><svg id = "'+divId+'-pic'+i+'"></svg></td></tr>';
		table += '<tr><td></td><td>amino acid</td><td>modified position</td><td>suggested change</td><td>pairing after change(top: modified sequence, bottom: piRNA)</td><td>rule(s) broken</td></tr>';
		table_html+=table;
		var temp = '';
		
		for (var pics in sugNotCDS[i][7]){
			var rule = '';
			var new_sxgu = sugNotCDS[i][7][pics][0][3][0];
			var new_sgu = sugNotCDS[i][7][pics][0][3][1];
			var new_nsxgu = sugNotCDS[i][7][pics][0][3][2];
			var new_nsgu = sugNotCDS[i][7][pics][0][3][3];
			var new_total = sugNotCDS[i][7][pics][0][3][0] + sugNotCDS[i][7][pics][0][3][1] + sugNotCDS[i][7][pics][0][3][2] + sugNotCDS[i][7][pics][0][3][3];
					
			temp += '<tr id="'+divId+'-r'+i+'_'+pics+'"><td><input type="checkbox" id="'+divId+'-ck'+i+'_'+pics+'" value="'+sugNotCDS[i][7][pics][0][0]+','+sugNotCDS[i][7][pics][0][1]+','+sugNotCDS[i][7][pics][0][2]+',"></td>';
					
			temp += '<td></td><td>'+sugNotCDS[i][7][pics][0][0]+'</td>';
			// duplicateFir.push([sugNotCDS[i][7][pics][0][0],sugNotCDS[i][15][sugNotCDS[i][7][pics][0][0]],Number(i),Number(pics)]);
			// duplicateDict[sugNotCDS[i][7][pics][0][0]+'_'+i] = pics;

			if(sugNotCDS[i][7][pics].length == 1){
				temp += '<td>'+sugNotCDS[i][7][pics][0][1]+' → '+sugNotCDS[i][7][pics][0][2]+'</td><td><svg id = "'+divId+'-pic'+i+'_'+pics+'"></svg></td>';
			}
			else{
				temp +=	'<td>'+sugNotCDS[i][7][pics][0][1]+' → <select class="drop">';
				for(var z in sugNotCDS[i][7][pics]){
					temp += '<option value="'+i+'_'+pics+'_'+z+'_'+i+'">'+sugNotCDS[i][7][pics][z][2]+'</option>';
				}
				temp += '</select></td><td id="'+divId+'-chart'+i+'_'+pics+'"><svg id = "'+divId+'-pic'+i+'_'+pics+'"></svg></td>';
			}

			if (new_sxgu > a){
				rule += '<span class="badge badge-dark"> Rule 1 </span>&nbsp;';
			}

			if (new_sgu > b){
				rule += '<span class="badge badge-dark"> Rule 2 </span>&nbsp;';
			} 

			if (new_nsxgu > c){
				rule += '<span class="badge badge-dark"> Rule 3 </span>&nbsp;';
			}
			
			if (new_nsgu > d){
				rule += '<span class="badge badge-dark"> Rule 4 </span>&nbsp;';
			}
			
			if (new_total > e){
				rule += '<span class="badge badge-dark"> Rule 5 </span>&nbsp;';
			}
			
			if (rule != ''){
				temp += '<td id="'+divId+'-rule'+i+'_'+pics+'" class="mid">'+rule+'</td>';
			}
			else{
				temp += '<td id="'+divId+'-rule'+i+'_'+pics+'" class="mid">✕</td>';
			}

			// if (new_sxgu > a || new_sgu > b || new_nsxgu > c || new_nsgu > d || new_total >e){
			// 	temp += '<td id="escape'+i+'_'+pics+'" class="mid">✓</td></tr>';
			// }
			// else{
			// 	temp += '<td id="escape'+i+'_'+pics+'" class="mid">✕</td></tr>';
			// }
		}
		table_html+=temp;
		// console.log(sugNotCDS);
		table_html+='</tbody></table></div>';
		$('#'+divId+'-sugTable').append(table_html);
		$('.drop').change(function(){
			var val = this.value.split('_');
			$('#'+divId+'-pic'+val[0]+'_'+val[1]).empty();
			// console.log(val);
			plotOutCDS(val[3],val[1],val[2],sugNotCDS,val[0],divId);
			var new_sxgu = sugNotCDS[val[3]][7][val[1]][val[2]][3][0];
			var new_sgu = sugNotCDS[val[3]][7][val[1]][val[2]][3][1];
			var new_nsxgu = sugNotCDS[val[3]][7][val[1]][val[2]][3][2];
			var new_nsgu = sugNotCDS[val[3]][7][val[1]][val[2]][3][3];
			var new_total = sugNotCDS[val[3]][7][val[1]][val[2]][3][0] + sugNotCDS[val[3]][7][val[1]][val[2]][3][1] + sugNotCDS[val[3]][7][val[1]][val[2]][3][2] + sugNotCDS[val[3]][7][val[1]][val[2]][3][3];
			var rule = '';
			if (new_sxgu > a){
				rule += '<span class="badge badge-dark"> Rule 1 </span>&nbsp;';
			}

			if (new_sgu > b){
				rule += '<span class="badge badge-dark"> Rule 2 </span>&nbsp;';
			} 

			if (new_nsxgu > c){
				rule += '<span class="badge badge-dark"> Rule 3 </span>&nbsp;';
			}
			
			if (new_nsgu > d){
				rule += '<span class="badge badge-dark"> Rule 4 </span>&nbsp;';
			}
			
			if (new_total > e){
				rule += '<span class="badge badge-dark"> Rule 5 </span>&nbsp;';
			}
			
			if (rule != ''){
				$('#'+divId+'-rule'+val[0]+'_'+val[1]).empty();
				$('#'+divId+'-rule'+val[0]+'_'+val[1]).html(rule);
			}
			else{
				$('#'+divId+'-rule'+val[0]+'_'+val[1]).empty();
				$('#'+divId+'-rule'+val[0]+'_'+val[1]).html('✕');
			}

			// if (new_sxgu > a || new_sgu > b || new_nsxgu > c || new_nsgu > d || new_total >e){
			// 	$('#escape'+val[0]+'_'+val[1]).empty();
			// 	$('#escape'+val[0]+'_'+val[1]).html('✓');
			// }
			// else{
			// 	$('#escape'+val[0]+'_'+val[1]).empty();
			// 	$('#escape'+val[0]+'_'+val[1]).html('✕');
			// }
			$('#'+divId+'-ck'+val[0]+'_'+val[1]).attr('value',sugNotCDS[val[3]][7][val[1]][val[2]][0]+','+sugNotCDS[val[3]][7][val[1]][val[2]][1]+','+sugNotCDS[val[3]][7][val[1]][val[2]][2]+', ');
		})
		frontCount += 1;
	}
	///////////////先創CDS前表格



	/////////////////////創CDS內的表格
	for (var i in sug){
		var table_html = '';
		var table = '';
		var midX = Number(i)+frontCount;
		table_html += '<div class="my-4 py-4" id="'+divId+'-sugPicTableDiv_'+midX+'"><table id="'+divId+'-sugPicTable_'+midX+'" class="sugTable bw" width= 100%><thead><tr><th style="width: 200px;">piRNA</th>';
		table_html += '<th style="width: 100px;">targeted region in input sequence</th>';
		// table_html += '<th width= 100>original situation</th>';
		table_html += '<td colspan="7"><svg id="'+divId+'-overView_'+midX+'"></svg></td>';
		table_html += '</tr></thead><tbody>';
		var span = sug[i][7].length+1;
		table += '<tr><td class="mid" rowspan="'+(span+2)+'">'+sug[i][0]+'</td>';
		table += '<td class="mid" rowspan="'+(span+2)+'">'+sug[i][1]+'~'+(sug[i][1]+(sug[i][2]-1))+'</td>';
		table += '<td colspan="4" rowspan="2"></td><td>pairing (top: input sequence, bottom: piRNA)</td><td rowspan="2"></td></tr>';
		table += '<tr><td id="'+divId+'-piPic'+midX+'" class="mid"><svg id = "'+divId+'-pic'+midX+'"></svg></td></tr>';
		table += '<tr><td></td><td>amino acid</td><td>modified position</td><td>suggested change</td><td>pairing after change(top: modified sequence, bottom: piRNA)</td><td>rule(s) broken</td></tr>';
		table_html+=table;
		var temp = '';
		
		for (var pics in sug[i][7]){
			var rule = '';
			var new_sxgu = sug[i][7][pics][0][4][0];
			var new_sgu = sug[i][7][pics][0][4][1];
			var new_nsxgu = sug[i][7][pics][0][4][2];
			var new_nsgu = sug[i][7][pics][0][4][3];
			var new_total = sug[i][7][pics][0][4][0] + sug[i][7][pics][0][4][1] + sug[i][7][pics][0][4][2] + sug[i][7][pics][0][4][3];
					
			temp += '<tr id="'+divId+'-r'+midX+'_'+pics+'"><td><input type="checkbox" id="'+divId+'-ck'+midX+'_'+pics+'" value="'+sug[i][7][pics][0][1]+','+sug[i][7][pics][0][2]+','+sug[i][7][pics][0][3]+','+sug[i][7][pics][0][0]+'"></td>';
					
			temp += '<td>'+sug[i][7][pics][0][0]+'</td><td>'+sug[i][7][pics][0][1]+'</td>';
			duplicateFir.push([sug[i][7][pics][0][1],sug[i][15][sug[i][7][pics][0][1]],Number(i),Number(pics)]);
			duplicateDict[sug[i][7][pics][0][1]+'_'+i] = pics;

			if(sug[i][7][pics].length == 1){
				temp += '<td>'+sug[i][7][pics][0][2]+' → '+sug[i][7][pics][0][3]+'</td><td><svg id = "'+divId+'-pic'+midX+'_'+pics+'"></svg></td>';
			}
			else{
				temp +=	'<td>'+sug[i][7][pics][0][2]+' → <select class="dropCDS">';
				for(var z in sug[i][7][pics]){
					temp += '<option value="'+midX+'_'+pics+'_'+z+'_'+i+'">'+sug[i][7][pics][z][3]+'</option>';
				}
				temp += '</select></td><td id="'+divId+'-chart'+midX+'_'+pics+'"><svg id = "'+divId+'-pic'+midX+'_'+pics+'"></svg></td>';
			}

			if (new_sxgu > a){
				rule += '<span class="badge badge-dark"> Rule 1 </span>&nbsp;';
			}

			if (new_sgu > b){
				rule += '<span class="badge badge-dark"> Rule 2 </span>&nbsp;';
			} 

			if (new_nsxgu > c){
				rule += '<span class="badge badge-dark"> Rule 3 </span>&nbsp;';
			}
			
			if (new_nsgu > d){
				rule += '<span class="badge badge-dark"> Rule 4 </span>&nbsp;';
			}
			
			if (new_total > e){
				rule += '<span class="badge badge-dark"> Rule 5 </span>&nbsp;';
			}
			
			if (rule != ''){
				temp += '<td id="'+divId+'-rule'+midX+'_'+pics+'" class="mid">'+rule+'</td>';
			}
			else{
				temp += '<td id="'+divId+'-rule'+midX+'_'+pics+'" class="mid">✕</td>';
			}

			// if (new_sxgu > a || new_sgu > b || new_nsxgu > c || new_nsgu > d || new_total >e){
			// 	temp += '<td id="escape'+midX+'_'+pics+'" class="mid">✓</td></tr>';
			// }
			// else{
			// 	temp += '<td id="escape'+midX+'_'+pics+'" class="mid">✕</td></tr>';
			// }
		}
		table_html+=temp;
		// console.log(duplicateFir);
		table_html+='</tbody></table></div>';
		$('#'+divId+'-sugTable').append(table_html);
		$('.dropCDS').change(function(){
			var val = this.value.split('_');
			$('#'+divId+'-pic'+val[0]+'_'+val[1]).empty();
			plot(val[3],val[1],val[2],sug,val[0],divId);
			var new_sxgu = sug[val[3]][7][val[1]][val[2]][4][0];
			var new_sgu = sug[val[3]][7][val[1]][val[2]][4][1];
			var new_nsxgu = sug[val[3]][7][val[1]][val[2]][4][2];
			var new_nsgu = sug[val[3]][7][val[1]][val[2]][4][3];
			var new_total = sug[val[3]][7][val[1]][val[2]][4][0] + sug[val[3]][7][val[1]][val[2]][4][1] + sug[val[3]][7][val[1]][val[2]][4][2] + sug[val[3]][7][val[1]][val[2]][4][3];
			var rule = '';
			if (new_sxgu > a){
				rule += '<span class="badge badge-dark"> Rule 1 </span>&nbsp;';
			}

			if (new_sgu > b){
				rule += '<span class="badge badge-dark"> Rule 2 </span>&nbsp;';
			} 

			if (new_nsxgu > c){
				rule += '<span class="badge badge-dark"> Rule 3 </span>&nbsp;';
			}
			
			if (new_nsgu > d){
				rule += '<span class="badge badge-dark"> Rule 4 </span>&nbsp;';
			}
			
			if (new_total > e){
				rule += '<span class="badge badge-dark"> Rule 5 </span>&nbsp;';
			}
			
			if (rule != ''){
				$('#'+divId+'-rule'+val[0]+'_'+val[1]).empty();
				$('#'+divId+'-rule'+val[0]+'_'+val[1]).html(rule);
			}
			else{
				$('#'+divId+'-rule'+val[0]+'_'+val[1]).empty();
				$('#'+divId+'-rule'+val[0]+'_'+val[1]).html('✕');
			}

			// if (new_sxgu > a || new_sgu > b || new_nsxgu > c || new_nsgu > d || new_total >e){
			// 	$('#escape'+val[0]+'_'+val[1]).empty();
			// 	$('#escape'+val[0]+'_'+val[1]).html('✓');
			// }
			// else{
			// 	$('#escape'+val[0]+'_'+val[1]).empty();
			// 	$('#escape'+val[0]+'_'+val[1]).html('✕');
			// }
			$('#'+divId+'-ck'+val[0]+'_'+val[1]).attr('value',sug[val[3]][7][val[1]][val[2]][1]+','+sug[val[3]][7][val[1]][val[2]][2]+','+sug[val[3]][7][val[1]][val[2]][3]+','+sug[val[3]][7][val[1]][val[2]][0]);
		})
		midCount += 1;	
	}
	/////////////////////創CDS內的表格



	///////////////創CDS後表格
	for (var i in sugNotCDS){
		if(sugNotCDS[i][1] > CDS1){
			var table_html = '';
			var table = '';
			var lastX = Number(i) + frontCount + midCount;
			table_html += '<div class="my-4 py-4" id="'+divId+'-sugPicTableDiv_'+lastX+'"><table id="'+divId+'-sugPicTable_'+lastX+'" class="sugTable bw" width= 100%><thead><tr><th style="width: 200px;">piRNA</th>';
			table_html += '<th style="width: 100px;">targeted region in input sequence</th>';
			// table_html += '<th width= 100>original situation</th>';
			table_html += '<td colspan="7"><svg id="'+divId+'-overView_'+lastX+'"></svg></td>';
			table_html += '</tr></thead><tbody>';
			var span = sugNotCDS[i][7].length+1;
			table += '<tr><td class="mid" rowspan="'+(span+2)+'">'+sugNotCDS[i][0]+'</td>';
			table += '<td class="mid" rowspan="'+(span+2)+'">'+sugNotCDS[i][1]+'~'+(sugNotCDS[i][1]+(sugNotCDS[i][2]-1))+'</td>';
			table += '<td colspan="4" rowspan="2"></td><td>pairing (top: input sequence, bottom: piRNA)</td><td rowspan="2"></td></tr>';
			table += '<tr><td id="'+divId+'-piPic'+lastX+'" class="mid"><svg id = "'+divId+'-pic'+lastX+'"></svg></td></tr>';
			table += '<tr><td></td><td>amino acid</td><td>modified position</td><td>suggested change</td><td>pairing after change(top: modified sequence, bottom: piRNA)</td><td>rule(s) broken</td></tr>';
			table_html+=table;
			var temp = '';
			for (var pics in sugNotCDS[i][7]){
				var rule = '';
				var new_sxgu = sugNotCDS[i][7][pics][0][3][0];
				var new_sgu = sugNotCDS[i][7][pics][0][3][1];
				var new_nsxgu = sugNotCDS[i][7][pics][0][3][2];
				var new_nsgu = sugNotCDS[i][7][pics][0][3][3];
				var new_total = sugNotCDS[i][7][pics][0][3][0] + sugNotCDS[i][7][pics][0][3][1] + sugNotCDS[i][7][pics][0][3][2] + sugNotCDS[i][7][pics][0][3][3];
						
				temp += '<tr id="'+divId+'-r'+lastX+'_'+pics+'"><td><input type="checkbox" id="'+divId+'-ck'+lastX+'_'+pics+'" value="'+sugNotCDS[i][7][pics][0][0]+','+sugNotCDS[i][7][pics][0][1]+','+sugNotCDS[i][7][pics][0][2]+', "></td>';
						
				temp += '<td></td><td>'+sugNotCDS[i][7][pics][0][0]+'</td>';
				// duplicateFir.push([sugNotCDS[i][7][pics][0][0],sugNotCDS[i][15][sugNotCDS[i][7][pics][0][0]],Number(i),Number(pics)]);
				// duplicateDict[sugNotCDS[i][7][pics][0][0]+'_'+i] = pics;

				if(sugNotCDS[i][7][pics].length == 1){
					temp += '<td>'+sugNotCDS[i][7][pics][0][1]+' → '+sugNotCDS[i][7][pics][0][2]+'</td><td><svg id = "pic'+lastX+'_'+pics+'"></svg></td>';
				}
				else{
					temp +=	'<td>'+sugNotCDS[i][7][pics][0][1]+' → <select class="drop">';
					for(var z in sugNotCDS[i][7][pics]){
						temp += '<option value="'+lastX+'_'+pics+'_'+z+'_'+i+'">'+sugNotCDS[i][7][pics][z][2]+'</option>';
					}
					temp += '</select></td><td id="'+divId+'-chart'+lastX+'_'+pics+'"><svg id = "'+divId+'-pic'+lastX+'_'+pics+'"></svg></td>';
				}

				if (new_sxgu > a){
					rule += '<span class="badge badge-dark"> Rule 1 </span>&nbsp;';
				}

				if (new_sgu > b){
					rule += '<span class="badge badge-dark"> Rule 2 </span>&nbsp;';
				} 

				if (new_nsxgu > c){
					rule += '<span class="badge badge-dark"> Rule 3 </span>&nbsp;';
				}
				
				if (new_nsgu > d){
					rule += '<span class="badge badge-dark"> Rule 4 </span>&nbsp;';
				}
				
				if (new_total > e){
					rule += '<span class="badge badge-dark"> Rule 5 </span>&nbsp;';
				}
				
				if (rule != ''){
					temp += '<td id="'+divId+'-rule'+lastX+'_'+pics+'" class="mid">'+rule+'</td>';
				}
				else{
					temp += '<td id="'+divId+'-rule'+lastX+'_'+pics+'" class="mid">✕</td>';
				}

				// if (new_sxgu > a || new_sgu > b || new_nsxgu > c || new_nsgu > d || new_total >e){
				// 	temp += '<td id="escape'+lastX+'_'+pics+'" class="mid">✓</td></tr>';
				// }
				// else{
				// 	temp += '<td id="escape'+lastX+'_'+pics+'" class="mid">✕</td></tr>';
				// }
			}
			table_html+=temp;
			table_html+='</tbody></table></div>';
			$('#'+divId+'-sugTable').append(table_html);
			$('.drop').change(function(){
				var val = this.value.split('_');
				$('#'+divId+'-pic'+val[0]+'_'+val[1]).empty();
				plotOutCDS(val[3],val[1],val[2],sugNotCDS,val[0],divId);
				var new_sxgu = sugNotCDS[val[3]][7][val[1]][val[2]][3][0];
				var new_sgu = sugNotCDS[val[3]][7][val[1]][val[2]][3][1];
				var new_nsxgu = sugNotCDS[val[3]][7][val[1]][val[2]][3][2];
				var new_nsgu = sugNotCDS[val[3]][7][val[1]][val[2]][3][3];
				var new_total = sugNotCDS[val[3]][7][val[1]][val[2]][3][0] + sugNotCDS[val[3]][7][val[1]][val[2]][3][1] + sugNotCDS[val[3]][7][val[1]][val[2]][3][2] + sugNotCDS[val[3]][7][val[1]][val[2]][3][3];
				var rule = '';
				if (new_sxgu > a){
					rule += '<span class="badge badge-dark"> Rule 1 </span>&nbsp;';
				}

				if (new_sgu > b){
					rule += '<span class="badge badge-dark"> Rule 2 </span>&nbsp;';
				} 

				if (new_nsxgu > c){
					rule += '<span class="badge badge-dark"> Rule 3 </span>&nbsp;';
				}
				
				if (new_nsgu > d){
					rule += '<span class="badge badge-dark"> Rule 4 </span>&nbsp;';
				}
				
				if (new_total > e){
					rule += '<span class="badge badge-dark"> Rule 5 </span>&nbsp;';
				}
				
				if (rule != ''){
					$('#'+divId+'-rule'+val[0]+'_'+val[1]).empty();
					$('#'+divId+'-rule'+val[0]+'_'+val[1]).html(rule);
				}
				else{
					$('#'+divId+'-rule'+val[0]+'_'+val[1]).empty();
					$('#'+divId+'-rule'+val[0]+'_'+val[1]).html('✕');
				}

				// if (new_sxgu > a || new_sgu > b || new_nsxgu > c || new_nsgu > d || new_total >e){
				// 	$('#escape'+val[0]+'_'+val[1]).empty();
				// 	$('#escape'+val[0]+'_'+val[1]).html('✓');
				// }
				// else{
				// 	$('#escape'+val[0]+'_'+val[1]).empty();
				// 	$('#escape'+val[0]+'_'+val[1]).html('✕');
				// }
				$('#'+divId+'-ck'+val[0]+'_'+val[1]).attr('value',sugNotCDS[val[3]][7][val[1]][val[2]][0]+','+sugNotCDS[val[3]][7][val[1]][val[2]][1]+','+sugNotCDS[val[3]][7][val[1]][val[2]][2]+', ');
			})
		}
		lastCount += 1;
	}
	///////////////創CDS後表格

	// $('#'+divId+'-sugTable').append(table_html);


	
	// for(var dupEffect in duplicateFir){
	// 	// duplicateFir  0:修改位置 1:相同位置幾種改法 2:最外層count 3:內層count (通通都是int)
	// 	// console.log(range(duplicateFir[dupEffect][2]));
	// 	for (var aa in range(duplicateFir[dupEffect][1])){
	// 		console.log('#ck'+duplicateFir[dupEffect][2]+'_'+(duplicateFir[dupEffect][3]+Number(aa)));
	// 		$('#ck'+duplicateFir[dupEffect][2]+'_'+(duplicateFir[dupEffect][3]+Number(aa))).click(function(){
	// 			var getID = $(this).attr('id');
	// 			var newList = getID.replace('ck','');
	// 			var firCount = newList.split('_')[0];
	// 			var lastCount = newList.split('_')[1];
	// 			var misPOS = $(this).attr('value').split(',')[0];
	// 			// console.log(duplicateDict);
	// 			// console.log(sug);
	// 			for(var aaa in range(sug[firCount][15][misPOS])){
	// 				// console.log(range('aaa = '+aaa));
	// 				if (Number(aaa) + Number(duplicateDict[misPOS+'_'+firCount]) != Number(lastCount)){
	// 					$('#ck'+firCount+'_'+(Number(aaa) + Number(duplicateDict[misPOS+'_'+firCount]))).prop('checked',false);
	// 				}
	// 			}
	// 		});
	// 	}
	// }

	var frontDuplicateFir = []; //有重複的checkbox第一個位置
	var frontDuplicateDict = {};
	var lastDuplicateFir = []; //有重複的checkbox第一個位置
	var lastDuplicateDict = {};
	


	// $('#'+divId+'-sugPicTable').find('tbody').prepend(frontText);
	// console.log(frontDuplicateFir);
	for(var dupEffect in frontDuplicateFir){
		// duplicateFir  0:修改位置 1:相同位置幾種改法 2:最外層count 3:內層count (通通都是int)
		// console.log(range(duplicateFir[dupEffect][2]));
		for (var aa in range(frontDuplicateFir[dupEffect][1])){
			// console.log('#Preck'+frontDuplicateFir[dupEffect][2]+'_'+(frontDuplicateFir[dupEffect][3]+Number(aa)));
			$('#Preck'+frontDuplicateFir[dupEffect][2]+'_'+(frontDuplicateFir[dupEffect][3]+Number(aa))).click(function(){
				var getID = $(this).attr('id');
				var newList = getID.replace('Preck','');
				var firCount = newList.split('_')[0];
				var lastCount = newList.split('_')[1];
				var misPOS = $(this).attr('value').split(',')[0];
				// console.log(duplicateDict);
				// console.log(sug);
				for(var aaa in range(sugNotCDS[firCount][12][misPOS])){
					// console.log(range('aaa = '+aaa));
					if (Number(aaa) + Number(frontDuplicateDict[misPOS+'_'+firCount]) != Number(lastCount)){
						$('#Preck'+firCount+'_'+(Number(aaa) + Number(frontDuplicateDict[misPOS+'_'+firCount]))).prop('checked',false);
					}
				}
			});
		}
	}

	// $('#'+divId+'-sugPicTable tbody').append(lastText);
	for(var dupEffect in lastDuplicateFir){
		// duplicateFir  0:修改位置 1:相同位置幾種改法 2:最外層count 3:內層count (通通都是int)
		// console.log(range(duplicateFir[dupEffect][2]));
		for (var aa in range(lastDuplicateFir[dupEffect][1])){
			// console.log('#Preck'+lastDuplicateFir[dupEffect][2]+'_'+(lastDuplicateFir[dupEffect][3]+Number(aa)));
			$('#Lastck'+lastDuplicateFir[dupEffect][2]+'_'+(lastDuplicateFir[dupEffect][3]+Number(aa))).click(function(){
				var getID = $(this).attr('id');
				var newList = getID.replace('Lastck','');
				var firCount = newList.split('_')[0];
				var lastCount = newList.split('_')[1];
				var misPOS = $(this).attr('value').split(',')[0];
				// console.log(duplicateDict);
				// console.log(sug);
				for(var aaa in range(sugNotCDS[firCount][12][misPOS])){
					// console.log(range('aaa = '+aaa));
					if (Number(aaa) + Number(lastDuplicateDict[misPOS+'_'+firCount]) != Number(lastCount)){
						$('#Lastck'+firCount+'_'+(Number(aaa) + Number(lastDuplicateDict[misPOS+'_'+firCount]))).prop('checked',false);
					}
				}
			});
		}
	}
	var totalCount = frontCount + midCount + lastCount;
	for (var i = 0; i < totalCount; i++) {
		eachOverView(i,gene,seqViewDataArr,CDS1,CDS2,divId,$('#wrap').width()*0.75);
		$(document).ready(function(){
            $(window).resize(function() {
              // console.log('#'+divId+'-overView_'+i);
              $('#'+divId+'-overView_'+i).empty();
              eachOverView(i,gene,seqViewDataArr,CDS1,CDS2,divId,$('#wrap').width()*0.75);          
            });
        });
	}
	$(document).ready(function(){
        $(window).resize(function() {
        	for (var i = 0; i < totalCount; i++) {
				// console.log('#'+divId+'-overView_'+i);
	            $('#'+divId+'-overView_'+i).empty();
	            eachOverView(i,gene,seqViewDataArr,CDS1,CDS2,divId,$('#wrap').width()*0.75);
			}                   
        });
    });
	// $('#'+divId+'-sugTable').parent().after('<div id="update_footer" class="card-footer text-center"><button type="button" id="'+divId+'-update" class="btn btn-primary btn-lg" style="width: 25%;">Modify input sequence</button></div>');
	$('#'+divId+'-update').on({
		click:function(){
			var modifyCount = Number($(this).attr('value')) +1;
			update(modifyCount,sug,sugNotCDS,name,gene,a,b,c,d,e,nematodeType,CDS1,CDS2,csrf,ori_data,pic2src,scanUrl,divId,userNum);
		},
	});


	//先畫CDS內的
	for (var x in sug){
		console.log(sug[x]);
		var midX = Number(x)+frontCount;
		var transX = 22.5;
		var transY = -17.5;
		var width = 500;
		var height = 140;
		var svg = d3.select('#'+divId+'-pic'+midX).attr({
			'width': width,
			'height': 80
			});
		var scaleY = d3.scale.linear()
			.range([0, height])
			.domain([0, height/17.5]);
		var scaleA = d3.scale.linear()
			.range([0, sug[x][11].length*16])
			.domain([0, sug[x][11].length-1]);
		var axisX = d3.svg.axis()
			.scale(scaleA)
			.orient('top')
			.tickFormat(function(d){return sug[x][11][d];})	
			.ticks(sug[x][11].length);
		svg.append('g')
			.call(axisX)
			.attr({
			'fill':'none',
			'stroke':'#000',
			'transform':'translate('+transX+','+(transY+scaleY(-1+5))+')' 
			})
			.selectAll('text')
			.attr({
			'fill':'#000',
			'stroke':'none',
			}).style({
			'font-size':'15px'
			});
		var cc = 0;
		for (var seq in sug[x][8]){
			// console.log(String(sug[x][2]-Number(seq)));
			// console.log(sug[x][9])
			if( sug[x][9].indexOf(String(sug[x][2]-Number(seq))) != -1 || sug[x][10].indexOf(String(sug[x][2]-Number(seq))) != -1){				
				if (sug[x][9].indexOf(String(sug[x][2]-Number(seq))) != -1){
					if (String(sug[x][2]-Number(seq)) == '1'){var color = 'lightgreen';}
					else{var color = 'yellow';}
				}
				else{
					if (String(sug[x][2]-Number(seq)) == '1'){var color = 'lightgreen';}
					else{
						var color = 'lightblue';
					}				
				}
				svg.append('rect').attr({
					'x':scaleA(sug[x][14]+Number(seq)),
					'y':scaleY(-1+6-1),
					'width':'15', 
					'height':'15',
					'transform':'translate('+(transX-7.5)+','+(transY+4.2)+')',
					'fill':color
				});	
			};	


			svg.append('text')
			.text(sug[x][8][seq])
			.attr({
				'class':'text',
				'x':scaleA(sug[x][14]+Number(seq)),
				'y':scaleY(-1+6),
				// 'style':'text-anchor: middle, font-size:15px',
				'transform':'translate('+transX+','+transY+')',       
			}).style({
				'text-anchor':'middle',
				'font-size':'15px'
			});;


			if(seq==13 || seq==19){
				svg.append('text')
					.text("|")
					.attr({
						'class':'text',
						'x':scaleA(sug[x][14]+Number(seq)+0.5),
						'y':scaleY(-1+6),
						'fill':'red', 
						'style':'text-anchor: middle;font-family:Arial;',
						'transform':'translate('+transX+','+(transY-1)+')', 
					});
			}


			for (var yoyoyo in sug[x][13]){
				if (cc!=0) {break;}
				svg.append('line').attr({
					x1: scaleA(sug[x][12]+3*Number(yoyoyo)),
					y1: scaleY(-1+5-1.2),
					x2: scaleA(sug[x][12]+3*Number(yoyoyo)),
					y2: scaleY(-1+5-1.8),
					'transform':'translate('+transX+','+(transY-1)+')',
				})
				.style({
					stroke: 'green',
					'stroke-width': 2
				});

				svg.append('line').attr({
					x1: scaleA(sug[x][12]+3*Number(yoyoyo)),
					y1: scaleY(-1+5-1.8),
					x2: scaleA(sug[x][12]+3*Number(yoyoyo)+2),
					y2: scaleY(-1+5-1.8),
					'transform':'translate('+transX+','+(transY-1)+')',
				})
				.style({
					stroke: 'green',
					'stroke-width': 2
				});

				svg.append('line').attr({
					x1: scaleA(sug[x][12]+3*Number(yoyoyo)+2),
					y1: scaleY(-1+5-1.8),
					x2: scaleA(sug[x][12]+3*Number(yoyoyo)+2),
					y2: scaleY(-1+5-1.2),
					'transform':'translate('+transX+','+(transY-1)+')',
				})
				.style({
					stroke: 'green',
					'stroke-width': 2
				});

				svg.append('text')
				.attr({
					'x':scaleA(sug[x][12]+3*Number(yoyoyo)+1),
					'y':scaleY(-1+5-2),
					'style':'text-anchor: middle; font-size: 15px',
					'transform':'translate('+transX+','+(transY-1)+')',    
				})
				.text(sug[x][13][yoyoyo]);
				
			}
			cc+=1;
		}

		for (var y in sug[x][7]){
			var transX = 22.5;
			var transY = -17.5;
			var width = 500;
			var height = 140;
			var svg = d3.select('#'+divId+'-pic'+midX+'_'+y).attr({
				'width': width,
				'height': 80
				});
			var scaleY = d3.scale.linear()
				.range([0, height])
				.domain([0, height/17.5]);
			var scaleA = d3.scale.linear()
				.range([0, sug[x][11].length*16])
				.domain([0, sug[x][11].length-1]);
			var axisX = d3.svg.axis()
				.scale(scaleA)
				.orient('top')
				.tickFormat(function(d){
					if(d == sug[x][7][y][0][1]-sug[x][1]+sug[x][14]){
						return sug[x][7][y][0][3];
					}
					return sug[x][11][d];
				})	
				.ticks(sug[x][11].length);
			svg.append('g')
				.call(axisX)
				.attr({
				'fill':'none',
				'stroke':'#000',
				'transform':'translate('+transX+','+(transY+scaleY(-1+5))+')' 
				})
				.selectAll('text')
				.attr({
				'fill':'#000',
				'stroke':'none',
				}).style({
				'color':'red',
				'font-size':'15px'
				});	
							
			svg.select('g:nth-of-type('+(sug[x][7][y][0][1]-sug[x][1]+sug[x][14]+1)+') text')
				.attr({
				'fill':'red',
				'stroke':'none',
				});
			var cc = 0;
			for (var seq in sug[x][8]){
				// console.log(String(sug[x][2]-Number(seq)));
				// console.log(sug[x][9])
				if( (sug[x][9].indexOf(String(sug[x][2]-Number(seq))) != -1 || sug[x][10].indexOf(String(sug[x][2]-Number(seq))) != -1) && Number(seq) != sug[x][7][y][0][1]-sug[x][1]){				
					if (sug[x][9].indexOf(String(sug[x][2]-Number(seq))) != -1){
						if (String(sug[x][2]-Number(seq)) == '1'){var color = 'lightgreen';}
						else{var color = 'yellow';}
					}
					else{
						if (String(sug[x][2]-Number(seq)) == '1'){var color = 'lightgreen';}
						else{
							var color = 'lightblue';
						}			
					}
					svg.append('rect').attr({
						'x':scaleA(sug[x][14]+Number(seq)),
						'y':scaleY(-1+6-1),
						'width':'15', 
						'height':'15',
						'transform':'translate('+(transX-7.5)+','+(transY+4.2)+')',
						'fill':color
					});

				}
				// console.log(sug[x][2]-Number(seq));
				// console.log(sug[x][7][y][0][1]-sug[x][1]+sug[x][14]);
				if(Number(seq) == sug[x][7][y][0][1]-sug[x][1]){
					if (sug[x][7][y][0][5] == 0){
						var color = 'yellow';
					}
					else{
						var color = 'lightblue';
					}
					svg.append('rect').attr({
						'x':scaleA(sug[x][14]+Number(seq)),
						'y':scaleY(-1+6-1),
						'width':'15', 
						'height':'15',
						'transform':'translate('+(transX-7.5)+','+(transY+4.2)+')',
						'fill':color
					});
				}




				svg.append('text')
				.text(sug[x][8][seq])
				.attr({
					'class':'text',
					'x':scaleA(sug[x][14]+Number(seq)),
					'y':scaleY(-1+6),
					// 'style':'text-anchor: middle, font-size:15px',
					'transform':'translate('+transX+','+transY+')',       
				}).style({
					'text-anchor':'middle',
					'font-size':'15px'
				});;


				if(seq==13 || seq==19){
					svg.append('text')
						.text("|")
						.attr({
							'class':'text',
							'x':scaleA(sug[x][14]+Number(seq)+0.5),
							'y':scaleY(-1+6),
							'fill':'red', 
							'style':'text-anchor: middle;font-family:Arial;',
							'transform':'translate('+transX+','+(transY-1)+')', 
						});
				}


				for (var yoyoyo in sug[x][13]){
					if((sug[x][7][y][0][1]-sug[x][1]+sug[x][14]) - ( sug[x][12]+3*Number(yoyoyo) ) <= 2 &&
						(sug[x][7][y][0][1]-sug[x][1]+sug[x][14]) - ( sug[x][12]+3*Number(yoyoyo) ) >= 0){
						if (cc!=0) {break;}
						svg.append('line').attr({
							x1: scaleA(sug[x][12]+3*Number(yoyoyo)),
							y1: scaleY(-1+5-1.2),
							x2: scaleA(sug[x][12]+3*Number(yoyoyo)),
							y2: scaleY(-1+5-1.8),
							'transform':'translate('+transX+','+(transY-1)+')',
						})
						.style({
							stroke: 'green',
							'stroke-width': 2
						});

						svg.append('line').attr({
							x1: scaleA(sug[x][12]+3*Number(yoyoyo)),
							y1: scaleY(-1+5-1.8),
							x2: scaleA(sug[x][12]+3*Number(yoyoyo)+2),
							y2: scaleY(-1+5-1.8),
							'transform':'translate('+transX+','+(transY-1)+')',
						})
						.style({
							stroke: 'green',
							'stroke-width': 2
						});

						svg.append('line').attr({
							x1: scaleA(sug[x][12]+3*Number(yoyoyo)+2),
							y1: scaleY(-1+5-1.8),
							x2: scaleA(sug[x][12]+3*Number(yoyoyo)+2),
							y2: scaleY(-1+5-1.2),
							'transform':'translate('+transX+','+(transY-1)+')',
						})
						.style({
							stroke: 'green',
							'stroke-width': 2
						});

						svg.append('text')
						.attr({
							'x':scaleA(sug[x][12]+3*Number(yoyoyo)+1),
							'y':scaleY(-1+5-2),
							'style':'text-anchor: middle; font-size: 15px',
							'transform':'translate('+transX+','+(transY-1)+')',    
						})
						.text(sug[x][13][yoyoyo]);
						
					}
					
				}
				cc+=1;
			}
			
		}
		
	}
	//先畫CDS內的

	//畫CDS外的
	for (var x in sugNotCDS){
		if (Number(x) < frontCount){
			var outX = Number(x);
		}
		else{
			var outX = Number(x) + frontCount + midCount;
		}
		var transX = 22.5;
		var transY = -27.5;
		var width = 500;
		var height = 140;
		var svg = d3.select('#'+divId+'-pic'+outX).attr({
			'width': width,
			'height': 80
			});
		var scaleY = d3.scale.linear()
			.range([0, height])
			.domain([0, height/17.5]);
		var scaleA = d3.scale.linear()
			.range([0, sugNotCDS[x][11].length*16])
			.domain([0, sugNotCDS[x][11].length-1]);
		var axisX = d3.svg.axis()
			.scale(scaleA)
			.orient('top')
			.tickFormat(function(d){return sugNotCDS[x][11][d];})	
			.ticks(sugNotCDS[x][11].length);
		svg.append('g')
			.call(axisX)
			.attr({
			'fill':'none',
			'stroke':'#000',
			'transform':'translate('+(scaleA(3)+transX)+','+(transY+scaleY(-1+5))+')' 
			})
			.selectAll('text')
			.attr({
			'fill':'#000',
			'stroke':'none',
			}).style({
			'font-size':'15px'
			});
		var cc = 0;
		for (var seq in sugNotCDS[x][8]){
			if( sugNotCDS[x][9].indexOf(String(sugNotCDS[x][2]-Number(seq))) != -1 || sugNotCDS[x][10].indexOf(String(sugNotCDS[x][2]-Number(seq))) != -1){				
				if (sugNotCDS[x][9].indexOf(String(sugNotCDS[x][2]-Number(seq))) != -1){
					if (String(sugNotCDS[x][2]-Number(seq)) == '1'){var color = 'lightgreen';}
					else{var color = 'yellow';}
				}
				else{
					if (String(sugNotCDS[x][2]-Number(seq)) == '1'){var color = 'lightgreen';}
					else{
						var color = 'lightblue';
					}					
				}
				svg.append('rect').attr({
					'x':scaleA(3+Number(seq)),
					'y':scaleY(-1+6-1),
					'width':'15', 
					'height':'15',
					'transform':'translate('+(transX-7.5)+','+(transY+4.2)+')',
					'fill':color
				});	
			};	


			svg.append('text')
			.text(sugNotCDS[x][8][seq])
			.attr({
				'class':'text',
				'x':scaleA(3+Number(seq)),
				'y':scaleY(-1+6),
				// 'style':'text-anchor: middle, font-size:15px',
				'transform':'translate('+transX+','+transY+')',       
			}).style({
				'text-anchor':'middle',
				'font-size':'15px'
			});;


			if(seq==13 || seq==19){
				svg.append('text')
					.text("|")
					.attr({
						'class':'text',
						'x':scaleA(3+Number(seq)+0.5),
						'y':scaleY(-1+6),
						'fill':'red', 
						'style':'text-anchor: middle;font-family:Arial;',
						'transform':'translate('+transX+','+(transY-1)+')', 
					});
			}
			cc+=1;
		}

		for (var y in sugNotCDS[x][7]){
			var transX = 22.5;
			var transY = -27.5;
			var width = 500;
			var height = 140;
			var svg = d3.select('#'+divId+'-pic'+outX+'_'+y).attr({
				'width': width,
				'height': 80
				});
			var scaleY = d3.scale.linear()
				.range([0, height])
				.domain([0, height/17.5]);
			var scaleA = d3.scale.linear()
				.range([0, sugNotCDS[x][11].length*16])
				.domain([0, sugNotCDS[x][11].length-1]);
			var axisX = d3.svg.axis()
				.scale(scaleA)
				.orient('top')
				.tickFormat(function(d){
					if(d == sugNotCDS[x][7][y][0][0]-sugNotCDS[x][1]){
						return sugNotCDS[x][7][y][0][2];
					}
					return sugNotCDS[x][11][d];
				})	
				.ticks(sugNotCDS[x][11].length);
			svg.append('g')
				.call(axisX)
				.attr({
				'fill':'none',
				'stroke':'#000',
				'transform':'translate('+(scaleA(3)+transX)+','+(transY+scaleY(-1+5))+')' 
				})
				.selectAll('text')
				.attr({
				'fill':'#000',
				'stroke':'none',
				}).style({
				'color':'red',
				'font-size':'15px'
				});	
							
			svg.select('g:nth-of-type('+(sugNotCDS[x][7][y][0][0]-sugNotCDS[x][1]+1)+') text')
				.attr({
				'fill':'red',
				'stroke':'none',
				});
			var cc = 0;
			for (var seq in sugNotCDS[x][8]){
				// console.log(String(sugNotCDS[x][2]-Number(seq)));
				// console.log(sugNotCDS[x][9])
				if( (sugNotCDS[x][9].indexOf(String(sugNotCDS[x][2]-Number(seq))) != -1 || sugNotCDS[x][10].indexOf(String(sugNotCDS[x][2]-Number(seq))) != -1) && Number(seq) != sugNotCDS[x][7][y][0][0]-sugNotCDS[x][1]){				
					if (sugNotCDS[x][9].indexOf(String(sugNotCDS[x][2]-Number(seq))) != -1){
						if (String(sugNotCDS[x][2]-Number(seq)) == '1'){var color = 'lightgreen';}
						else{var color = 'yellow';}
					}
					else{
						if (String(sugNotCDS[x][2]-Number(seq)) == '1'){var color = 'lightgreen';}
						else{
							var color = 'lightblue';
						}						
					}
					svg.append('rect').attr({
						'x':scaleA(3+Number(seq)),
						'y':scaleY(-1+6-1),
						'width':'15', 
						'height':'15',
						'transform':'translate('+(transX-7.5)+','+(transY+4.2)+')',
						'fill':color
					});

				}
				// console.log(sugNotCDS[x][2]-Number(seq));
				// console.log(sugNotCDS[x][7][y][1]-sugNotCDS[x][1]+sugNotCDS[x][14]);
				if(Number(seq) == sugNotCDS[x][7][y][0][0]-sugNotCDS[x][1]){
					if (sugNotCDS[x][7][y][0][4] == 0){
						var color = 'yellow';
					}
					else{
						var color = 'lightblue';
					}
					svg.append('rect').attr({
						'x':scaleA(3+Number(seq)),
						'y':scaleY(-1+6-1),
						'width':'15', 
						'height':'15',
						'transform':'translate('+(transX-7.5)+','+(transY+4.2)+')',
						'fill':color
					});
				}




				svg.append('text')
				.text(sugNotCDS[x][8][seq])
				.attr({
					'class':'text',
					'x':scaleA(3+Number(seq)),
					'y':scaleY(-1+6),
					// 'style':'text-anchor: middle, font-size:15px',
					'transform':'translate('+transX+','+transY+')',       
				}).style({
					'text-anchor':'middle',
					'font-size':'15px'
				});;


				if(seq==13 || seq==19){
					svg.append('text')
						.text("|")
						.attr({
							'class':'text',
							'x':scaleA(3+Number(seq)+0.5),
							'y':scaleY(-1+6),
							'fill':'red', 
							'style':'text-anchor: middle;font-family:Arial;',
							'transform':'translate('+transX+','+(transY-1)+')', 
						});
				}
				cc+=1;
			}
			
		}
		
	} 
	//畫CDS外的
}

function plot(x,y,z,sug,midX,divId){
	// console.log('#'+divId+'-pic'+midX+'_'+y);
	var transX = 22.5;
	var transY = -17.5;
	var width = 500;
	var height = 140;
	var svg = d3.select('#'+divId+'-pic'+midX+'_'+y).attr({
		'width': width,
		'height': 80
		});
	var scaleY = d3.scale.linear()
		.range([0, height])
		.domain([0, height/17.5]);
	var scaleA = d3.scale.linear()
		.range([0, sug[x][11].length*16])
		.domain([0, sug[x][11].length-1]);
	var axisX = d3.svg.axis()
		.scale(scaleA)
		.orient('top')
		.tickFormat(function(d){
			if(d == sug[x][7][y][z][1]-sug[x][1]+sug[x][14]){
				return sug[x][7][y][z][3];
			}
			return sug[x][11][d];
		})	
		.ticks(sug[x][11].length);
	svg.append('g')
		.call(axisX)
		.attr({
		'fill':'none',
		'stroke':'#000',
		'transform':'translate('+transX+','+(transY+scaleY(-1+5))+')' 
		})
		.selectAll('text')
		.attr({
		'fill':'#000',
		'stroke':'none',
		}).style({
		'color':'red',
		'font-size':'15px'
		});	
					
	svg.select('g:nth-of-type('+(sug[x][7][y][z][1]-sug[x][1]+sug[x][14]+1)+') text')
		.attr({
		'fill':'red',
		'stroke':'none',
		});
	var cc = 0;
	for (var seq in sug[x][8]){
		if( (sug[x][9].indexOf(String(sug[x][2]-Number(seq))) != -1 || sug[x][10].indexOf(String(sug[x][2]-Number(seq))) != -1) && Number(seq) != sug[x][7][y][z][1]-sug[x][1]){				
			if (sug[x][9].indexOf(String(sug[x][2]-Number(seq))) != -1){
				if (String(sug[x][2]-Number(seq)) == '1'){var color = 'lightgreen';}
				else{var color = 'yellow';}
			}
			else{
				var color = 'lightblue';
			}
			svg.append('rect').attr({
				'x':scaleA(3+Number(seq)),
				'y':scaleY(-1+6-1),
				'width':'15', 
				'height':'15',
				'transform':'translate('+(transX-7.5)+','+(transY+4.2)+')',
				'fill':color
			});

		}
		if(Number(seq) == sug[x][7][y][z][1]-sug[x][1]){
			if (sug[x][7][y][z][5] == 0){
				var color = 'yellow';
			}
			else{
				var color = 'lightblue';
			}
			svg.append('rect').attr({
				'x':scaleA(3+Number(seq)),
				'y':scaleY(-1+6-1),
				'width':'15', 
				'height':'15',
				'transform':'translate('+(transX-7.5)+','+(transY+4.2)+')',
				'fill':color
			});
		}


		svg.append('text')
		.text(sug[x][8][seq])
		.attr({
			'class':'text',
			'x':scaleA(3+Number(seq)),
			'y':scaleY(-1+6),
			// 'style':'text-anchor: middle, font-size:15px',
			'transform':'translate('+transX+','+transY+')',       
		}).style({
			'text-anchor':'middle',
			'font-size':'15px'
		});;


		if(seq==13 || seq==19){
			svg.append('text')
				.text("|")
				.attr({
					'class':'text',
					'x':scaleA(3+Number(seq)+0.5),
					'y':scaleY(-1+6),
					'fill':'red', 
					'style':'text-anchor: middle;font-family:Arial;',
					'transform':'translate('+transX+','+(transY-1)+')', 
				});
		}

		for (var yoyoyo in sug[x][13]){
			if((sug[x][7][y][z][1]-sug[x][1]+sug[x][14]) - ( sug[x][12]+3*Number(yoyoyo) ) <= 2 &&
				(sug[x][7][y][z][1]-sug[x][1]+sug[x][14]) - ( sug[x][12]+3*Number(yoyoyo) ) >= 0){
				if (cc!=0) {break;}
				svg.append('line').attr({
					x1: scaleA(sug[x][12]+3*Number(yoyoyo)),
					y1: scaleY(-1+5-1.2),
					x2: scaleA(sug[x][12]+3*Number(yoyoyo)),
					y2: scaleY(-1+5-1.8),
					'transform':'translate('+transX+','+(transY-1)+')',
				})
				.style({
					stroke: 'green',
					'stroke-width': 2
				});

				svg.append('line').attr({
					x1: scaleA(sug[x][12]+3*Number(yoyoyo)),
					y1: scaleY(-1+5-1.8),
					x2: scaleA(sug[x][12]+3*Number(yoyoyo)+2),
					y2: scaleY(-1+5-1.8),
					'transform':'translate('+transX+','+(transY-1)+')',
				})
				.style({
					stroke: 'green',
					'stroke-width': 2
				});

				svg.append('line').attr({
					x1: scaleA(sug[x][12]+3*Number(yoyoyo)+2),
					y1: scaleY(-1+5-1.8),
					x2: scaleA(sug[x][12]+3*Number(yoyoyo)+2),
					y2: scaleY(-1+5-1.2),
					'transform':'translate('+transX+','+(transY-1)+')',
				})
				.style({
					stroke: 'green',
					'stroke-width': 2
				});

				svg.append('text')
				.attr({
					'x':scaleA(sug[x][12]+3*Number(yoyoyo)+1),
					'y':scaleY(-1+5-2),
					'style':'text-anchor: middle; font-size: 15px',
					'transform':'translate('+transX+','+(transY-1)+')',    
				})
				.text(sug[x][13][yoyoyo]);
			}
		}
		cc+=1;
	}
}

function plotOutCDS(x,y,z,sugNotCDS,outX,divId){
	var transX = 22.5;
	var transY = -27.5;
	var width = 500;
	var height = 140;
	var svg = d3.select('#'+divId+'-pic'+outX+'_'+y).attr({
		'width': width,
		'height': 80
		});
	var scaleY = d3.scale.linear()
		.range([0, height])
		.domain([0, height/17.5]);
	var scaleA = d3.scale.linear()
		.range([0, sugNotCDS[x][11].length*16])
		.domain([0, sugNotCDS[x][11].length-1]);
	var axisX = d3.svg.axis()
		.scale(scaleA)
		.orient('top')
		.tickFormat(function(d){
			if(d == sugNotCDS[x][7][y][z][0]-sugNotCDS[x][1]){
				return sugNotCDS[x][7][y][z][2];
			}
			return sugNotCDS[x][11][d];
		})	
		.ticks(sugNotCDS[x][11].length);
	svg.append('g')
		.call(axisX)
		.attr({
		'fill':'none',
		'stroke':'#000',
		'transform':'translate('+(scaleA(3)+transX)+','+(transY+scaleY(-1+5))+')' 
		})
		.selectAll('text')
		.attr({
		'fill':'#000',
		'stroke':'none',
		}).style({
		'color':'red',
		'font-size':'15px'
		});	
					
	svg.select('g:nth-of-type('+(sugNotCDS[x][7][y][z][0]-sugNotCDS[x][1]+1)+') text')
		.attr({
		'fill':'red',
		'stroke':'none',
		});
	var cc = 0;
	for (var seq in sugNotCDS[x][8]){
		// console.log(String(sugNotCDS[x][2]-Number(seq)));
		// console.log(sugNotCDS[x][9])

		if( (sugNotCDS[x][9].indexOf(String(sugNotCDS[x][2]-Number(seq))) != -1 || sugNotCDS[x][10].indexOf(String(sugNotCDS[x][2]-Number(seq))) != -1) && Number(seq) != sugNotCDS[x][7][y][z][0]-sugNotCDS[x][1]){				
			if (sugNotCDS[x][9].indexOf(String(sugNotCDS[x][2]-Number(seq))) != -1){
				if (String(sugNotCDS[x][2]-Number(seq)) == '1'){var color = 'lightgreen';}
				else{var color = 'yellow';}
			}
			else{
				var color = 'lightblue';
			}
			svg.append('rect').attr({
				'x':scaleA(3+Number(seq)),
				'y':scaleY(-1+6-1),
				'width':'15', 
				'height':'15',
				'transform':'translate('+(transX-7.5)+','+(transY+4.2)+')',
				'fill':color
			});

		}
		// console.log(sugNotCDS[x][2]-Number(seq));
		// console.log(sugNotCDS[x][7][y][1]-sugNotCDS[x][1]+sugNotCDS[x][14]);
		if(Number(seq) == sugNotCDS[x][7][y][z][0]-sugNotCDS[x][1]){
			if (sugNotCDS[x][7][y][z][4] == 0){
				var color = 'yellow';
			}
			else{
				var color = 'lightblue';
			}
			svg.append('rect').attr({
				'x':scaleA(3+Number(seq)),
				'y':scaleY(-1+6-1),
				'width':'15', 
				'height':'15',
				'transform':'translate('+(transX-7.5)+','+(transY+4.2)+')',
				'fill':color
			});
		}




		svg.append('text')
		.text(sugNotCDS[x][8][seq])
		.attr({
			'class':'text',
			'x':scaleA(3+Number(seq)),
			'y':scaleY(-1+6),
			// 'style':'text-anchor: middle, font-size:15px',
			'transform':'translate('+transX+','+transY+')',       
		}).style({
			'text-anchor':'middle',
			'font-size':'15px'
		});;


		if(seq==13 || seq==19){
			svg.append('text')
				.text("|")
				.attr({
					'class':'text',
					'x':scaleA(3+Number(seq)+0.5),
					'y':scaleY(-1+6),
					'fill':'red', 
					'style':'text-anchor: middle;font-family:Arial;',
					'transform':'translate('+transX+','+(transY-1)+')', 
				});
		}
		cc+=1;
	}
}

function suggestion(sug,sugNotCDS,a,b,c,d,e){
	// console.log(sug);
	// console.log(a,b,c,d,e)
	// $('#sugTable').append('<h1 style= "text-align: center;"><b>Suggestions</b></h1>');
	var table_html = '<table id="sugTable" class="display"><thead><tr><th width= 150>piRNA</th>';
	table_html += '<th width= 100>targeted region in input sequence</th>';
	table_html += '<th width= 70>number of non-GU mismatches in seed region</th>';
	table_html += '<th width= 70>number of GU mismatches in seed region</th>';
	table_html += '<th width= 70>number of non-GU mismatches in non-seed region</th>';
	table_html += '<th width= 70>number of GU mismatches in non-seed region</th>';
	table_html += '<th width= 70>total number of mismatches</th>';
	table_html += '<th colspan="9">methods<br>escape condition{ seed-xGU > '+a+' , seed-GU > '+b+' , non-seed-xGU > '+c+' , non-seed-GU > '+d+' , total mis > '+e+'}</th>';
	table_html += '</tr></thead><tbody></tbody></table><br><br>';
	$('#sugTable').append(table_html);

	for (var x in sug){
		var table = '';
		var span = sug[x][7].length + 1;
		table += '<tr><td class="mid" rowspan="'+span+'">'+sug[x][0]+'</td>';
		table += '<td class="mid" rowspan="'+span+'">'+sug[x][1]+'~'+(sug[x][1]+(sug[x][2]-1))+'</td>';
		table += '<td class="mid" rowspan="'+span+'">'+sug[x][3]+'</td>';
		table += '<td class="mid" rowspan="'+span+'">'+sug[x][4]+'</td>';
		table += '<td class="mid" rowspan="'+span+'">'+sug[x][5]+'</td>';
		table += '<td class="mid" rowspan="'+span+'">'+sug[x][6]+'</td>';
		table += '<td class="mid" rowspan="'+span+'">'+(sug[x][3] + sug[x][4] + sug[x][5] + sug[x][6])+'</td>';
		table += '<td class="mid" width= 80>CDS</td>';
		table += '<td class="mid">position</td>';
		table += '<td class="mid" width= 130>changed seq</td>';
		table += '<td class="mid" width= 130>seed-xGU</td>';
		table += '<td class="mid" width= 130>seed-GU</td>';
		table += '<td class="mid" width= 130>non-seed-xGU</td>';
		table += '<td class="mid" width= 130>non-seed-GU</td>';
		table += '<td class="mid" width= 130>total mis</td>';
		table += '<td class="mid" width= 130>escape?</td>';
		table += '</tr>';
		var temp = '';
		for (var i in sug[x][7]){
			var new_sxgu = sug[x][7][i][4][0];
			var new_sgu = sug[x][7][i][4][1];
			var new_nsxgu = sug[x][7][i][4][2];
			var new_nsgu = sug[x][7][i][4][3];
			var new_total = sug[x][7][i][4][0] + sug[x][7][i][4][1] + sug[x][7][i][4][2] + sug[x][7][i][4][3];
			temp += '<tr><td class="mid">'+sug[x][7][i][0]+'</td>';
			temp += '<td class="mid">'+sug[x][7][i][1]+'</td>';
			temp += '<td class="mid">'+sug[x][7][i][2]+' → '+sug[x][7][i][3]+'</td>';


			if (new_sxgu > a){
				temp += '<td class="mid" style = "color : red">'+new_sxgu+'</td>';
			}
			else{
				temp += '<td class="mid">'+new_sxgu+'</td>';
			}


			if (new_sgu > b){
				temp += '<td class="mid" style = "color : red">'+new_sgu+'</td>';
			}
			else{
				temp += '<td class="mid">'+new_sgu+'</td>';
			}   


			if (new_nsxgu > c){
				temp += '<td class="mid" style = "color : red">'+new_nsxgu+'</td>';
			}
			else{
				temp += '<td class="mid">'+new_nsxgu+'</td>';
			}

			
			if (new_nsgu > d){
				temp += '<td class="mid" style = "color : red">'+new_nsgu+'</td>';
			}
			else{
				temp += '<td class="mid">'+new_nsgu+'</td>';
			}

			
			if (new_total > e){
				temp += '<td class="mid" style = "color : red">'+new_total+'</td>';
			}
			else{
				temp += '<td class="mid">'+ new_total + '</td>';
			}

			
			if (new_sxgu > a || new_sgu > b || new_nsxgu > c || new_nsgu > d || new_total >e){
				temp += '<td class="mid">✓</td></tr>';
			}
			else{
				temp += '<td class="mid">✕</td></tr>';
			}
		}
		// temp = temp.replace(/^<tr>/, "");
		table += temp;
		$('#sugTable').find('tbody').append(table);
	}

}