function shit(sug,sugNotCDS,a,b,c,d,e,name,gene,nematodeType,CDS1,CDS2,csrf){
	var table_html = '<table id="sugPicTable" class="display" width= 100%><thead><tr><th>piRNA</th>';
	table_html += '<th width= 100>targeted region in the input sequences</th>';
	table_html += '<th width= 100>original situation</th>';
	table_html += '<th colspan="7">methods<br>escape condition{ rule1 : seed-xGU > '+a+' , rule2 : seed-GU > '+b+' , rule3 : non-seed-xGU > '+c+' ,<br>rule4 : non-seed-GU > '+d+' , rule5 : total mis > '+e+'}</th>';
	table_html += '</tr></thead><tbody>';
	var table = '';
	var duplicateFir = []; //有重複的checkbox第一個位置
	var duplicateDict = {};
	for (var i in sug){
		var span = sug[i][7].length+1;
		table += '<tr><td class="mid" rowspan="'+span+'">'+sug[i][0]+'</td>';
		table += '<td class="mid" rowspan="'+span+'">'+sug[i][1]+'~'+(sug[i][1]+(sug[i][2]-1))+'</td>';
		table += '<td id="piPic'+i+'" class="mid" rowspan="'+span+'"><svg id = "pic'+i+'"></svg></td><td></td><td>CDS</td><td>position</td><td>change to</td><td>after changed</td><td>breaked rules</td><td>escape?</td></tr>'	
		var temp = '';
		

		for (var pics in sug[i][7]){
			var rule = '';
			var new_sxgu = sug[i][7][pics][4][0];
			var new_sgu = sug[i][7][pics][4][1];
			var new_nsxgu = sug[i][7][pics][4][2];
			var new_nsgu = sug[i][7][pics][4][3];
			var new_total = sug[i][7][pics][4][0] + sug[i][7][pics][4][1] + sug[i][7][pics][4][2] + sug[i][7][pics][4][3];
			temp += '<tr id="r'+i+'_'+pics+'"><td><input type="checkbox" id="ck'+i+'_'+pics+'" value="'+sug[i][7][pics][1]+','+sug[i][7][pics][3]+','+sug[i][7][pics][0]+'"></td>';
			
			// console.log(sug[16]);
			if (sug[i][15][sug[i][7][pics][1]] != undefined && SCount  == undefined){
				temp += '<td rowspan='+sug[i][15][sug[i][7][pics][1]]+'>'+sug[i][7][pics][0]+'</td><td rowspan='+sug[i][15][sug[i][7][pics][1]]+'>'+sug[i][7][pics][1]+'</td>';
				var SCount = sug[i][15][sug[i][7][pics][1]]-1;
				duplicateFir.push([sug[i][7][pics][1],sug[i][15][sug[i][7][pics][1]],Number(i),Number(pics)]);
				duplicateDict[sug[i][7][pics][1]+'_'+i] = pics;
			}
			else if(SCount  != undefined){
				SCount -= 1
				if (SCount == 0){
					SCount = undefined;
				}
			}
			else{
				temp += '<td rowspan='+sug[i][15][sug[i][7][pics][1]]+'>'+sug[i][7][pics][0]+'</td><td>'+sug[i][7][pics][1]+'</td>';
			}
			
			temp += '<td>'+sug[i][7][pics][2]+' → '+sug[i][7][pics][3]+'</td><td><svg id = "pic'+i+'_'+pics+'"></svg></td>';
			
			if (new_sxgu > a){
				rule += ' rule1 ';
			}

			if (new_sgu > b){
				rule += ' rule2 ';
			} 

			if (new_nsxgu > c){
				rule += ' rule3 ';
			}
			
			if (new_nsgu > d){
				rule += ' rule4 ';
			}
			
			if (new_total > e){
				rule += ' rule5 ';
			}
			
			if (rule != ''){
				temp += '<td class="mid">'+rule+'</td>';
			}
			else{
				temp += '<td class="mid">N/A</td>';
			}

			if (new_sxgu > a || new_sgu > b || new_nsxgu > c || new_nsgu > d || new_total >e){
				temp += '<td class="mid">✓</td></tr>';
			}
			else{
				temp += '<td class="mid">✕</td></tr>';
			}
			// temp += '</damn><g></g>'
		}
		table+=temp;
		// console.log(duplicateFir);	
	}
	table_html+=table;
	table_html+='</tbody></table>';


	var frontText = '';
	var lastText = '';
	$('#div_name2').append(table_html);


	
	for(var dupEffect in duplicateFir){
		// duplicateFir  0:修改位置 1:相同位置幾種改法 2:最外層count 3:內層count (通通都是int)
		// console.log(range(duplicateFir[dupEffect][2]));
		for (var aa in range(duplicateFir[dupEffect][1])){
			// console.log('#ck'+duplicateFir[dupEffect][2]+'_'+(duplicateFir[dupEffect][3]+Number(aa)));
			$('#ck'+duplicateFir[dupEffect][2]+'_'+(duplicateFir[dupEffect][3]+Number(aa))).click(function(){
				var getID = $(this).attr('id');
				var newList = getID.replace('ck','');
				var firCount = newList.split('_')[0];
				var lastCount = newList.split('_')[1];
				var misPOS = $(this).attr('value').split(',')[0];
				// console.log(duplicateDict);
				// console.log(sug);
				for(var aaa in range(sug[firCount][15][misPOS])){
					// console.log(range('aaa = '+aaa));
					if (Number(aaa) + Number(duplicateDict[misPOS+'_'+firCount]) != Number(lastCount)){
						$('#ck'+firCount+'_'+(Number(aaa) + Number(duplicateDict[misPOS+'_'+firCount]))).prop('checked',false);
					}
				}
			});
		}
	}

	var frontDuplicateFir = []; //有重複的checkbox第一個位置
	var frontDuplicateDict = {};
	var lastDuplicateFir = []; //有重複的checkbox第一個位置
	var lastDuplicateDict = {};
	for (var i in sugNotCDS){
		if(sugNotCDS[i][1] < CDS1){
			var span = sugNotCDS[i][7].length+1;
			frontText += '<tr><td class="mid" rowspan="'+span+'">'+sugNotCDS[i][0]+'</td>';
			frontText += '<td class="mid" rowspan="'+span+'">'+sugNotCDS[i][1]+'~'+(sugNotCDS[i][1]+(sugNotCDS[i][2]-1))+'</td>';
			frontText += '<td id="NCpiPic'+i+'" class="mid" rowspan="'+span+'"><svg id = "NCpic'+i+'"></svg></td><td></td><td>CDS</td><td>position</td><td>change to</td><td>after changed</td><td>breaked rules</td><td>escape?</td></tr>'
			for (var pics in sugNotCDS[i][7]){
				var rule = '';
				var new_sxgu = sugNotCDS[i][7][pics][3][0];
				var new_sgu = sugNotCDS[i][7][pics][3][1];
				var new_nsxgu = sugNotCDS[i][7][pics][3][2];
				var new_nsgu = sugNotCDS[i][7][pics][3][3];
				var new_total = sugNotCDS[i][7][pics][3][0] + sugNotCDS[i][7][pics][3][1] + sugNotCDS[i][7][pics][3][2] + sugNotCDS[i][7][pics][3][3];
				frontText += '<tr id="fr'+i+'_'+pics+'"><td><input type="checkbox" id="Preck'+i+'_'+pics+'" value="'+sugNotCDS[i][7][pics][0]+','+sugNotCDS[i][7][pics][2]+'"></td>';
				
				if (sugNotCDS[i][12][sugNotCDS[i][7][pics][0]] != undefined && SCount  == undefined){
					frontText += '<td rowspan='+sugNotCDS[i][12][sugNotCDS[i][7][pics][0]]+'></td><td rowspan='+sugNotCDS[i][12][sugNotCDS[i][7][pics][0]]+'>'+sugNotCDS[i][7][pics][0]+'</td>';
					var SCount = sugNotCDS[i][12][sugNotCDS[i][7][pics][0]]-1;
					frontDuplicateFir.push([sugNotCDS[i][7][pics][0],sugNotCDS[i][12][sugNotCDS[i][7][pics][0]],Number(i),Number(pics)]);
					frontDuplicateDict[sugNotCDS[i][7][pics][0]+'_'+i] = pics;
				}
				else if(SCount  != undefined){
					SCount -= 1
					if (SCount == 0){
						SCount = undefined;
					}
				}
				else{
					frontText += '<td></td><td>'+sugNotCDS[i][7][pics][1]+'</td>';
				}

				frontText += '<td>'+sugNotCDS[i][7][pics][1]+' → '+sugNotCDS[i][7][pics][2]+'</td><td><svg id = "NCpic'+i+'_'+pics+'"></svg></td>'
				
				if (new_sxgu > a){
					rule += ' rule1 ';
				}

				if (new_sgu > b){
					rule += ' rule2 ';
				} 

				if (new_nsxgu > c){
					rule += ' rule3 ';
				}
				
				if (new_nsgu > d){
					rule += ' rule4 ';
				}
				
				if (new_total > e){
					rule += ' rule5 ';
				}
				
				if (rule != ''){
					frontText += '<td class="mid">'+rule+'</td>';
				}
				else{
					frontText += '<td class="mid">N/A</td>';
				}

				if (new_sxgu > a || new_sgu > b || new_nsxgu > c || new_nsgu > d || new_total >e){
					frontText += '<td class="mid">✓</td></tr>';
				}
				else{
					frontText += '<td class="mid">✕</td></tr>';
				}
			}
		}
		else{
			
			var span = sugNotCDS[i][7].length+1;
			lastText += '<tr><td class="mid" rowspan="'+span+'">'+sugNotCDS[i][0]+'</td>';
			lastText += '<td class="mid" rowspan="'+span+'">'+sugNotCDS[i][1]+'~'+(sugNotCDS[i][1]+(sugNotCDS[i][2]-1))+'</td>';
			lastText += '<td id="NCpiPic'+i+'" class="mid" rowspan="'+span+'"><svg id = "NCpic'+i+'"></svg></td><td></td><td>CDS</td><td>position</td><td>change to</td><td>after changed</td><td>breaked rules</td><td>escape?</td></tr>'
			for (var pics in sugNotCDS[i][7]){
				var rule = '';
				var new_sxgu = sugNotCDS[i][7][pics][3][0];
				var new_sgu = sugNotCDS[i][7][pics][3][1];
				var new_nsxgu = sugNotCDS[i][7][pics][3][2];
				var new_nsgu = sugNotCDS[i][7][pics][3][3];
				var new_total = sugNotCDS[i][7][pics][3][0] + sugNotCDS[i][7][pics][3][1] + sugNotCDS[i][7][pics][3][2] + sugNotCDS[i][7][pics][3][3];
				lastText += '<tr id="lr'+i+'_'+pics+'"><td><input type="checkbox" id="Lastck'+i+'_'+pics+'" value="'+sugNotCDS[i][7][pics][0]+','+sugNotCDS[i][7][pics][2]+'"></td>';
				
				if (sugNotCDS[i][12][sugNotCDS[i][7][pics][0]] != undefined && SCount  == undefined){
					lastText += '<td rowspan='+sugNotCDS[i][12][sugNotCDS[i][7][pics][0]]+'></td><td rowspan='+sugNotCDS[i][12][sugNotCDS[i][7][pics][0]]+'>'+sugNotCDS[i][7][pics][0]+'</td>';
					var SCount = sugNotCDS[i][12][sugNotCDS[i][7][pics][0]]-1;
					lastDuplicateFir.push([sugNotCDS[i][7][pics][0],sugNotCDS[i][12][sugNotCDS[i][7][pics][0]],Number(i),Number(pics)]);
					lastDuplicateDict[sugNotCDS[i][7][pics][0]+'_'+i] = pics;
				}
				else if(SCount  != undefined){
					SCount -= 1
					if (SCount == 0){
						SCount = undefined;
					}
				}
				else{
					lastText += '<td></td><td>'+sugNotCDS[i][7][pics][1]+'</td>';
				}

				lastText += '<td>'+sugNotCDS[i][7][pics][1]+' → '+sugNotCDS[i][7][pics][2]+'</td><td><svg id = "NCpic'+i+'_'+pics+'"></svg></td>'
				
				if (new_sxgu > a){
					rule += ' rule1 ';
				}

				if (new_sgu > b){
					rule += ' rule2 ';
				} 

				if (new_nsxgu > c){
					rule += ' rule3 ';
				}
				
				if (new_nsgu > d){
					rule += ' rule4 ';
				}
				
				if (new_total > e){
					rule += ' rule5 ';
				}
				
				if (rule != ''){
					lastText += '<td class="mid">'+rule+'</td>';
				}
				else{
					lastText += '<td class="mid">N/A</td>';
				}

				if (new_sxgu > a || new_sgu > b || new_nsxgu > c || new_nsgu > d || new_total >e){
					lastText += '<td class="mid">✓</td></tr>';
				}
				else{
					lastText += '<td class="mid">✕</td></tr>';
				}
			}
		}

	}


	$('#sugPicTable').find('tbody').prepend(frontText);
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

	$('#sugPicTable tbody').append(lastText);
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
	
	$('#div_name2').append('<p style="text-align: center"><input type="submit" id="update" value="update input sequence"></p><br><br>');
	$('#update').on({
		click:function(){
			update(sug,sugNotCDS,name,gene,a,b,c,d,e,nematodeType,CDS1,CDS2,csrf);
		},
	});

	for (var x in sug){
		var transX = 22.5;
		var transY = -17.5;
		var width = 500;
		var height = 140;
		var svg = d3.select('#pic'+x).attr({
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
			};	


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
			var svg = d3.select('#pic'+x+'_'+y).attr({
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
					if(d == sug[x][7][y][1]-sug[x][1]+sug[x][14]){
						return sug[x][7][y][3];
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
							
			svg.select('g:nth-of-type('+(sug[x][7][y][1]-sug[x][1]+sug[x][14]+1)+') text')
				.attr({
				'fill':'red',
				'stroke':'none',
				});
			var cc = 0;
			for (var seq in sug[x][8]){
				// console.log(String(sug[x][2]-Number(seq)));
				// console.log(sug[x][9])
				if( (sug[x][9].indexOf(String(sug[x][2]-Number(seq))) != -1 || sug[x][10].indexOf(String(sug[x][2]-Number(seq))) != -1) && Number(seq) != sug[x][7][y][1]-sug[x][1]){				
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
				// console.log(sug[x][2]-Number(seq));
				// console.log(sug[x][7][y][1]-sug[x][1]+sug[x][14]);
				if(Number(seq) == sug[x][7][y][1]-sug[x][1]){
					if (sug[x][7][y][5] == 0){
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
			
		}
		
	}

	for (var x in sugNotCDS){
		var transX = 22.5;
		var transY = -27.5;
		var width = 500;
		var height = 140;
		var svg = d3.select('#NCpic'+x).attr({
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
			var svg = d3.select('#NCpic'+x+'_'+y).attr({
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
					if(d == sugNotCDS[x][7][y][0]-sugNotCDS[x][1]){
						return sugNotCDS[x][7][y][2];
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
							
			svg.select('g:nth-of-type('+(sugNotCDS[x][7][y][0]-sugNotCDS[x][1]+1)+') text')
				.attr({
				'fill':'red',
				'stroke':'none',
				});
			var cc = 0;
			for (var seq in sugNotCDS[x][8]){
				// console.log(String(sugNotCDS[x][2]-Number(seq)));
				// console.log(sugNotCDS[x][9])
				if( (sugNotCDS[x][9].indexOf(String(sugNotCDS[x][2]-Number(seq))) != -1 || sugNotCDS[x][10].indexOf(String(sugNotCDS[x][2]-Number(seq))) != -1) && Number(seq) != sugNotCDS[x][7][y][0]-sugNotCDS[x][1]){				
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
				if(Number(seq) == sugNotCDS[x][7][y][0]-sugNotCDS[x][1]){
					if (sugNotCDS[x][7][y][4] == 0){
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


				// for (var yoyoyo in sugNotCDS[x][13]){
				// 	if (cc!=0) {break;}
				// 	svg.append('line').attr({
				// 		x1: scaleA(sugNotCDS[x][12]+3*Number(yoyoyo)),
				// 		y1: scaleY(-1+5-1.2),
				// 		x2: scaleA(sugNotCDS[x][12]+3*Number(yoyoyo)),
				// 		y2: scaleY(-1+5-1.8),
				// 		'transform':'translate('+transX+','+(transY-1)+')',
				// 	})
				// 	.style({
				// 		stroke: 'green',
				// 		'stroke-width': 2
				// 	});

				// 	svg.append('line').attr({
				// 		x1: scaleA(sugNotCDS[x][12]+3*Number(yoyoyo)),
				// 		y1: scaleY(-1+5-1.8),
				// 		x2: scaleA(sugNotCDS[x][12]+3*Number(yoyoyo)+2),
				// 		y2: scaleY(-1+5-1.8),
				// 		'transform':'translate('+transX+','+(transY-1)+')',
				// 	})
				// 	.style({
				// 		stroke: 'green',
				// 		'stroke-width': 2
				// 	});

				// 	svg.append('line').attr({
				// 		x1: scaleA(sugNotCDS[x][12]+3*Number(yoyoyo)+2),
				// 		y1: scaleY(-1+5-1.8),
				// 		x2: scaleA(sugNotCDS[x][12]+3*Number(yoyoyo)+2),
				// 		y2: scaleY(-1+5-1.2),
				// 		'transform':'translate('+transX+','+(transY-1)+')',
				// 	})
				// 	.style({
				// 		stroke: 'green',
				// 		'stroke-width': 2
				// 	});

				// 	svg.append('text')
				// 	.attr({
				// 		'x':scaleA(sugNotCDS[x][12]+3*Number(yoyoyo)+1),
				// 		'y':scaleY(-1+5-2),
				// 		'style':'text-anchor: middle; font-size: 15px',
				// 		'transform':'translate('+transX+','+(transY-1)+')',    
				// 	})
				// 	.text(sugNotCDS[x][13][yoyoyo]);
					
				// }
				cc+=1;
			}
			
		}
		
	}


	
	// $('#div_name2').append('</tbody></table><br><br>');  
}





function suggestion(sug,sugNotCDS,a,b,c,d,e){
	// console.log(sug);
	// console.log(a,b,c,d,e)
	$('#div_name2').append('<h1 style= "text-align: center;"><b>Suggestions</b></h1>');
	var table_html = '<table id="sugTable" class="display"><thead><tr><th width= 150>piRNA</th>';
	table_html += '<th width= 100>targeted region in the input sequences</th>';
	table_html += '<th width= 70>number of non-GU mismatches in seed region</th>';
	table_html += '<th width= 70>number of GU mismatches in seed region</th>';
	table_html += '<th width= 70>number of non-GU mismatches in non-seed region</th>';
	table_html += '<th width= 70>number of GU mismatches in non-seed region</th>';
	table_html += '<th width= 70>total number of mismatches</th>';
	table_html += '<th colspan="9">methods<br>escape condition{ seed-xGU > '+a+' , seed-GU > '+b+' , non-seed-xGU > '+c+' , non-seed-GU > '+d+' , total mis > '+e+'}</th>';
	table_html += '</tr></thead><tbody></tbody></table><br><br>';
	$('#div_name2').append(table_html);

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
		$('#div_name2').find('tbody').append(table);
	}




}