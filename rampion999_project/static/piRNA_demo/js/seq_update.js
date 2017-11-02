// var csrftoken = Cookies.get('csrftoken');
// function csrfSafeMethod(method) {
//     // these HTTP methods do not require CSRF protection
//     return (/^(GET|HEAD|OPTIONS|TRACE)$/.test(method));
// }
// $.ajaxSetup({
//     beforeSend: function(xhr, settings) {
//         if (!csrfSafeMethod(settings.type) && !this.crossDomain) {
//             xhr.setRequestHeader("X-CSRFToken", csrftoken);
//         }
//     }
// });



function update(sug,sugNotCDS,name,gene,a,b,c,d,e,f,g,h,csrf){
	var new_gene = gene.split('');
	var selected = {};
	var count = 0;
	var posss = [];
	var ori_piRNA = {};
	var preCount = 0;
	var check_dict = {}; //檢查有沒有重複用的dictionary
	var repeated = [];
	console.log(g);
	console.log(h);
	for (var i in sugNotCDS){
		var selectArr = [];
		if(sugNotCDS[i][1] < g){
			for (var j in sugNotCDS[i][7]){
				if ( $('#Preck'+i+'_'+j).prop('checked') ) {
					var nnname = $('#Preck'+i+'_'+j).val();
					nnname = nnname.split(',');
					var pos = Number(nnname[0]);
					var to = nnname[1];
					var CDS = '';
					// 檢查重複
					if (Object.keys(check_dict).indexOf(String(pos)) == -1){
						check_dict[String(pos)] = to;
					}
					else{
						if(check_dict[String(pos)] != to){
							repeated.push(pos);
						}
					}
					/////////////////////////

					new_gene[pos-1] = to;
					// selectArr.push($('#fr'+i+'_'+j).html().replace('<td><input type="checkbox" id="Preck'+i+'_'+j+'" value="'+pos+','+to+'"></td>','').replace('id="NCpic'+i+'_'+j,'id="new_NCpic'+i+'_'+j));
					selectArr.push(CDS+'##'+ pos +'##'+$('#fr'+i+'_'+j+' td:nth-last-of-type(4)').html()+'##'+$('#fr'+i+'_'+j+' td:nth-last-of-type(3)').html()+'##'+$('#fr'+i+'_'+j+' td:nth-last-of-type(2)').html()+'##'+$('#fr'+i+'_'+j+' td:nth-last-of-type(1)').html());
					posss.push(String(pos));
				}			
			}
			preCount += 1;
		}
		if(selectArr.length != 0){
			// console.log('#piPic'+j);
			ori_piRNA[count] = sugNotCDS[i][0]+'@@@'+sugNotCDS[i][1]+'@@@'+$('#NCpiPic'+i).html().replace('id="NCpic'+i,'id="new_NCpic'+i);
			selected[count] = selectArr.join('@@@');
			count+=1;
		}
	}



	for (var i in sug){
		var selectArr = [];
		for (var j in sug[i][7]){
			if ( $('#ck'+i+'_'+j).prop('checked') ) {
				var nnname = $('#ck'+i+'_'+j).val();
				nnname = nnname.split(',');
				var pos = Number(nnname[0]);
				var to = nnname[1];
				var CDS = nnname[2];
				if (Object.keys(check_dict).indexOf(String(pos)) == -1){
					check_dict[String(pos)] = to;
				}
				else{
					if(check_dict[String(pos)] != to){
						repeated.push(pos);
					}
				}
				new_gene[pos-1] = to;
				// selectArr.push($('#r'+i+'_'+j).html().replace('<td><input type="checkbox" id="ck'+i+'_'+j+'" value="'+pos+','+to+'"></td>','').replace('id="pic'+i+'_'+j,'id="new_pic'+i+'_'+j));
				selectArr.push(CDS+'##'+ pos +'##'+$('#r'+i+'_'+j+' td:nth-last-of-type(4)').html()+'##'+$('#r'+i+'_'+j+' td:nth-last-of-type(3)').html()+'##'+$('#r'+i+'_'+j+' td:nth-last-of-type(2)').html()+'##'+$('#r'+i+'_'+j+' td:nth-last-of-type(1)').html());
				posss.push(String(pos));
			}
		}
		if(selectArr.length != 0){
			// console.log('#piPic'+j);
			ori_piRNA[count] = sug[i][0]+'@@@'+sug[i][1]+'@@@'+$('#piPic'+i).html().replace('id="pic'+i,'id="new_pic'+i);
			selected[count] = selectArr.join('@@@');
			count+=1;
		}
	}
	
	for (var i in sugNotCDS){
		var selectArr = [];
		if(Number(i) >= preCount){
			for (var j in sugNotCDS[i][7]){
				if ( $('#Lastck'+i+'_'+j).prop('checked') ) {
					var nnname = $('#Lastck'+i+'_'+j).val();
					nnname = nnname.split(',');
					var pos = Number(nnname[0]);
					var to = nnname[1];
					var CDS = '';
					if (Object.keys(check_dict).indexOf(String(pos)) == -1){
						check_dict[String(pos)] = to;
					}
					else{
						if(check_dict[String(pos)] != to){
							repeated.push(pos);
						}
					}
					
					new_gene[pos-1] = to;
					// selectArr.push($('#lr'+i+'_'+j).html().replace('<td><input type="checkbox" id="Lastck'+i+'_'+j+'" value="'+pos+','+to+'"></td>','').replace('id="NCpic'+i+'_'+j,'id="new_NCpic'+i+'_'+j));
					selectArr.push(CDS+'##'+ pos +'##'+$('#lr'+i+'_'+j+' td:nth-last-of-type(4)').html()+'##'+$('#lr'+i+'_'+j+' td:nth-last-of-type(3)').html()+'##'+$('#lr'+i+'_'+j+' td:nth-last-of-type(2)').html()+'##'+$('#lr'+i+'_'+j+' td:nth-last-of-type(1)').html());
					posss.push(String(pos));
				}		
			}
		}
		// console.log(Object.keys(check_dicthe));
		if(selectArr.length != 0){
			// console.log('#piPic'+j);
			ori_piRNA[count] = sugNotCDS[i][0]+'@@@'+sugNotCDS[i][1]+'@@@'+$('#NCpiPic'+i).html().replace('id="NCpic'+i,'id="new_NCpic'+i);
			selected[count] = selectArr.join('@@@');
			count+=1;
		}
	}
	// console.log(Object.keys(check_dict));
	// console.log('24' in Object.keys(check_dict));
	// console.log(check_dict);
	// console.log(repeated);
	if (posss.length==0){
		alert('you selected nothing T_T');
	}
	else if(repeated.length != 0){
		alert(repeated.toString() + ' selected different sequence');
	}
	else{

		var posString = posss.join('@')

		new_gene = new_gene.join('');
		// new_gene = '>'+name+'\n'+new_gene;
		// $('#gene').val(new_gene);
		// var teee = {'a':'1','b':'2','c':'3'};
		// console.log(selected.length);
		$.ajax({
			url: "create_data/",
			data:{ 
				data1:new_gene,
				name:name,
				opt1:a,
				opt2:b,
				opt3:c,
				opt4:d,
				opt5:e,
				nematodeType:f,
				CDS_1:g,
				CDS_2:h,
				selected:selected,
				select_num:count,
				posString:posString,
				ori_piRNA:ori_piRNA,
				// csrfmiddlewaretoken: '{{ csrf_token }}',
			},
			type: "POST", 
			dataType:'json',
			success: function(data){
				console.log(data);
			},
		})
		// window.open("http://140.116.215.236/rampion999/piRNA/update/",'_blank');
		window.open(document.URL.replace(/\?fref=gc&dti=[0-9]+/,'')+"update/",'_blank');
	}
}