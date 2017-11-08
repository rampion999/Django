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



function update(modifyCount,sug,sugNotCDS,name,gene,a,b,c,d,e,f,g,h,csrf,ori_data,pic2src,scanUrl){
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
				ori_result:ori_data,
				// csrfmiddlewaretoken: '{{ csrf_token }}',
			},
			type: "POST", 
			dataType:'json',
			success: function(data){
				$('#overallTab').append(
					'<li class="nav-item">\
		            	<a class="nav-link" id="modify_'+modifyCount+'-tab" data-toggle="tab" href="#modify_'+modifyCount+'" role="tab" aria-controls="modify_'+modifyCount+'" aria-selected="false">Modify #'+modifyCount+'</a>\
		            </li>'
		        );
				$('#overallTabContent').append(
					'<div class="tab-pane fade" id="modify_'+modifyCount+'" role="tabpanel" aria-labelledby="modify_'+modifyCount+'-tab">\
		            	<div id="modify_'+modifyCount+'-Result"></div>\
		          	</div>'
		        );
		        $('html, body').animate({scrollTop: '0px'}, 300);
		        $('#modify_'+modifyCount+'-Result').append('\
					<div class="card mb-4">\
		              <h1 class="card-header bg-white text-dark text-center"><b>New gene seq</b></h4>\
		              <div class="card-body text-dark text-center">\
		                <svg id="preSeqView-'+modifyCount+'"></svg>\
		              </div>\
		            </div>\
		        ');
		        var strVar="";
    				strVar += "            <div class=\"row\">";
    				strVar += "              <div class=\"col-5\">";
            strVar += '\
                <div class="card">\
                  <h4 class="card-header">Selected changes</h4>\
                  <div id="selectedChange_'+modifyCount+'" class="card-body">';               
            strVar += '</div></div>';
    				strVar += "              <\/div>";
    				strVar += "              <div class=\"col-7\">";
    				strVar += "                <div class=\"card mb-2 h-100\">";
    				strVar += "                  <h4 class=\"card-header\">Scan filter options<\/h4>";
    				strVar += "                  <div class=\"card-body\">";
    				strVar += "                    <div class=\"row\">";
    				strVar += "                      <div class=\"col-lg-5 align-self-center\">";
    				strVar += "                        <a href=\"#\">";
    				strVar += "                          <img class=\"img-fluid rounded\" src=\""+pic2src+"\" alt=\"\">";
    				strVar += "                        <\/a>";
    				strVar += "                        <button type=\"button\" class=\"btn btn-outline-dark btn-block\" id=\"reset_to_default_"+modifyCount+"\">Set to default<\/button>";
    				strVar += "                      <\/div>";
    				strVar += "                      <!-- <div class=\"col-lg-1\">";
    				strVar += "                      <\/div> -->";
    				strVar += "                      <div class=\"col-lg-7\">";
    				strVar += "                        <ul class=\"list-unstyled\">             ";
    				strVar += "                          <li class=\"card-text\">";
    				strVar += "                            <!-- <b>Choose nematode species :&nbsp;&nbsp;<\/b> -->";
    				strVar += "                            <label class=\"mr-sm-2\" for=\"nematodeType\"><b>Choose nematode species :<\/b><\/label>";
    				strVar += "                            <select class=\"custom-select mb-2 mr-sm-2 mb-sm-0\" id=\"nematodeType_"+modifyCount+"\">";
    				strVar += "                              <option class = \"clean\" selected value=\"C.elegans\">C. elegans<\/option>";
    				strVar += "                              <option class = \"clean\" value=\"C.briggsae\">C. briggsae<\/option>";
    				strVar += "                              <option class = \"clean\" value=\"C.remanei\">C. remanei<\/option>";
    				strVar += "                              <option class = \"clean\" value=\"C.brenneri\">C. brenneri<\/option>";
    				strVar += "                            <\/select>";
    				strVar += "                          <\/li>";
    				strVar += "                          <li class=\"card-text\">";
    				strVar += "                            <b>Number of mismatches allowed at seed region:<\/b>";
    				strVar += "                          <\/li>";
    				strVar += "";
    				strVar += "";
    				strVar += "                          <li>";
    				strVar += "                            <ul>";
    				strVar += "                              <li>";
    				strVar += "                                <label class=\"mr-sm-2\" for=\"opt1\">number of non-GU pairs &nbsp;≤&nbsp;<\/label>";
    				strVar += "                                <select id=\"opt1_"+modifyCount+"\">";
    				strVar += "                                  <option class = \"clean\" selected value=\"0\">0<\/option>";
    				strVar += "                                  <option class = \"clean\" value=\"1\">1<\/option>";
    				strVar += "                                  <option class = \"clean\" value=\"2\">2<\/option>";
    				strVar += "                                  <option class = \"clean\" value=\"3\">3<\/option>";
    				strVar += "                                  <option class = \"clean\" value=\"4\">4<\/option>";
    				strVar += "                                  <option class = \"clean\" value=\"5\">5<\/option>";
    				strVar += "                                  <option class = \"clean\" value=\"6\">6<\/option>";
    				strVar += "                                <\/select>";
    				strVar += "                              <\/li>";
    				strVar += "                              <!-- <br> -->";
    				strVar += "                              <li>";
    				strVar += "                                <label class=\"mr-sm-2\" for=\"opt2\">number of GU pairs &nbsp;≤&nbsp;<\/label>";
    				strVar += "                                <select id=\"opt2_"+modifyCount+"\">";
    				strVar += "                                  <option class = \"clean\" value=\"0\">0<\/option>";
    				strVar += "                                  <option class = \"clean\" selected value=\"1\">1<\/option>";
    				strVar += "                                  <option class = \"clean\" value=\"2\">2<\/option>";
    				strVar += "                                  <option class = \"clean\" value=\"3\">3<\/option>";
    				strVar += "                                  <option class = \"clean\" value=\"4\">4<\/option>";
    				strVar += "                                  <option class = \"clean\" value=\"5\">5<\/option>";
    				strVar += "                                  <option class = \"clean\" value=\"6\">6<\/option>";
    				strVar += "                                <\/select>";
    				strVar += "                              <\/li>";
    				strVar += "                            <\/ul>";
    				strVar += "                          <\/li>";
    				strVar += "                          ";
    				strVar += "";
    				strVar += "                          <li class=\"card-text\">";
    				strVar += "                            <b>Number of mismatches allowed at non-seed region:<\/b>";
    				strVar += "                          <\/li>";
    				strVar += "";
    				strVar += "";
    				strVar += "                          <li>";
    				strVar += "                            <ul>";
    				strVar += "                              <li>";
    				strVar += "                                <label class=\"mr-sm-2\" for=\"opt3\">number of non-GU pairs &nbsp;≤&nbsp;<\/label>";
    				strVar += "                                <select id=\"opt3_"+modifyCount+"\">";
    				strVar += "                                  <option class = \"clean\" value=\"0\">0<\/option>";
    				strVar += "                                  <option class = \"clean\" value=\"1\">1<\/option>";
    				strVar += "                                  <option class = \"clean\" value=\"2\">2<\/option>";
    				strVar += "                                  <option class = \"clean\" selected value=\"3\">3<\/option>";
    				strVar += "                                  <option class = \"clean\" value=\"4\">4<\/option>";
    				strVar += "                                  <option class = \"clean\" value=\"5\">5<\/option>";
    				strVar += "                                  <option class = \"clean\" value=\"6\">6<\/option>";
    				strVar += "                                  <option class = \"clean\" value=\"7\">7<\/option>";
    				strVar += "                                  <option class = \"clean\" value=\"8\">8<\/option>";
    				strVar += "                                  <option class = \"clean\" value=\"9\">9<\/option>";
    				strVar += "                                  <option class = \"clean\" value=\"10\">10<\/option>";
    				strVar += "                                  <option class = \"clean\" value=\"11\">11<\/option>";
    				strVar += "                                  <option class = \"clean\" value=\"12\">12<\/option>";
    				strVar += "                                  <option class = \"clean\" value=\"13\">13<\/option>";
    				strVar += "                                  <option class = \"clean\" value=\"14\">∞<\/option>";
    				strVar += "                                <\/select>";
    				strVar += "                              <\/li>";
    				strVar += "                              <li>";
    				strVar += "                                <label class=\"mr-sm-2\" for=\"opt4\">number of GU pairs &nbsp;≤&nbsp;<\/label>";
    				strVar += "                                <select id=\"opt4_"+modifyCount+"\">";
    				strVar += "                                  <option class = \"clean\" value=\"0\">0<\/option>";
    				strVar += "                                  <option class = \"clean\" value=\"1\">1<\/option>";
    				strVar += "                                  <option class = \"clean\" value=\"2\">2<\/option>";
    				strVar += "                                  <option class = \"clean\" selected value=\"3\">3<\/option>";
    				strVar += "                                  <option class = \"clean\" value=\"4\">4<\/option>";
    				strVar += "                                  <option class = \"clean\" value=\"5\">5<\/option>";
    				strVar += "                                  <option class = \"clean\" value=\"6\">6<\/option>";
    				strVar += "                                  <option class = \"clean\" value=\"7\">7<\/option>";
    				strVar += "                                  <option class = \"clean\" value=\"8\">8<\/option>";
    				strVar += "                                  <option class = \"clean\" value=\"9\">9<\/option>";
    				strVar += "                                  <option class = \"clean\" value=\"10\">10<\/option>";
    				strVar += "                                  <option class = \"clean\" value=\"11\">11<\/option>";
    				strVar += "                                  <option class = \"clean\" value=\"12\">12<\/option>";
    				strVar += "                                  <option class = \"clean\" value=\"13\">13<\/option>";
    				strVar += "                                  <option class = \"clean\" value=\"14\">∞<\/option>";
    				strVar += "                                <\/select>";
    				strVar += "                              <\/li>";
    				strVar += "                            <\/ul>";
    				strVar += "                          <\/li>";
    				strVar += "";
    				strVar += "";
    				strVar += "                          <li>";
    				strVar += "                            <label class=\"mr-sm-2\" for=\"opt5\"><b>Total number of mismatches at seed & non-seed regions ≤&nbsp;<\/b><\/label>";
    				strVar += "                            <select id=\"opt5_"+modifyCount+"\">";
    				strVar += "                              <option class = \"clean\" value=\"0\">0<\/option>";
    				strVar += "                              <option class = \"clean\" value=\"1\">1<\/option>";
    				strVar += "                              <option class = \"clean\" value=\"2\">2<\/option>";
    				strVar += "                              <option class = \"clean\" selected value=\"3\">3<\/option>";
    				strVar += "                              <option class = \"clean\" value=\"4\">4<\/option>";
    				strVar += "                              <option class = \"clean\" value=\"5\">5<\/option>";
    				strVar += "                              <option class = \"clean\" value=\"6\">6<\/option>";
    				strVar += "                              <option class = \"clean\" value=\"7\">7<\/option>";
    				strVar += "                              <option class = \"clean\" value=\"8\">8<\/option>";
    				strVar += "                              <option class = \"clean\" value=\"9\">9<\/option>";
    				strVar += "                              <option class = \"clean\" value=\"10\">10<\/option>";
    				strVar += "                              <option class = \"clean\" value=\"11\">11<\/option>";
    				strVar += "                              <option class = \"clean\" value=\"12\">12<\/option>";
    				strVar += "                              <option class = \"clean\" value=\"13\">13<\/option>";
    				strVar += "                              <option class = \"clean\" value=\"14\">14<\/option>";
    				strVar += "                              <option class = \"clean\" value=\"15\">15<\/option>";
    				strVar += "                              <option class = \"clean\" value=\"16\">16<\/option>";
    				strVar += "                              <option class = \"clean\" value=\"17\">17<\/option>";
    				strVar += "                              <option class = \"clean\" value=\"18\">18<\/option>";
    				strVar += "                              <option class = \"clean\" value=\"19\">19<\/option>";
    				strVar += "                              <option class = \"clean\" value=\"20\">20<\/option>";
    				strVar += "                              <option class = \"clean\" value=\"21\">21<\/option>";
    				strVar += "                            <\/select>";
    				strVar += "                          <\/li>";
    				strVar += "";
    				strVar += "";
    				strVar += "                          <li>";
    				strVar += "                            <input type=\"checkbox\" id='CDS_ck_"+modifyCount+"' checked><b>Show CDS &nbsp;&nbsp;&nbsp;<\/b>";
    				strVar += "                          <\/li>";
    				strVar += "                          ";
    				strVar += "";
    				strVar += "                          <li>";
    				strVar += "                            <ul>";
    				strVar += "                              <li>";
    				strVar += "                              choose region :";
    				strVar += "                              <input type=\"number\" style=\"width: 60px\" id='CDS_1_"+modifyCount+"' class='CDS_"+modifyCount+"'>&nbsp;~&nbsp;";
    				strVar += "                              <input type=\"number\" style=\"width: 60px\" id='CDS_2_"+modifyCount+"' class='CDS_"+modifyCount+"'>";
    				strVar += "                              <\/li>";
    				strVar += "                            <\/ul>";
    				strVar += "                          <\/li>";
    				strVar += "                        <\/ul>";
    				strVar += "                      <\/div>";
    				strVar += "                    <\/div>";
    				strVar += "                  <\/div>";
    				strVar += "                <\/div>";
    				strVar += "              <\/div>";
    				strVar += "            <\/div>";
    				strVar += "            <div id=\"update_footer_"+modifyCount+"\" class=\"text-center my-3\"><button type=\"button\" id=\"TransformBTN_"+modifyCount+"\" class=\"btn btn-primary btn-lg\" style=\"width: 50%;\">RESCAN<\/button><\/div>";

		        $('#modify_'+modifyCount+'-Result').append(strVar);                   
		        $.ajax({
			        url: "selectedPreData/", 
			        data:{ 
			          QQ:'QQ',
			        },
			        type: "POST", 
			        dataType:'json',
			        error: function(no){
			          console.log(no);
			          swal(
			            'Scan cancelled',
			            'System memory overload',
			            'error'
			          )
			          },
			        success: function(data){
			        	console.log(data);			        	
          			loadDaShit(pic2src,data,modifyCount);
			        	preSeqView('preSeqView-'+modifyCount,data);	
                selectedTable('selectedChange_'+modifyCount,data,modifyCount); 
			        	$('#TransformBTN_'+modifyCount).on('click',function(){
				        	newScan(data,pic2src,modifyCount,scanUrl);
				        });
			        },
			    });
			    $('#originalResult-resultTab a').removeClass('active');
			    $('#originalResult-resultTabContent a').removeClass('active');
		        $('#modify_'+modifyCount+'-tab').on('click', function(){
		       		$('#originalResult-resultTab a').removeClass('active');
			   		$('#originalResult-resultTabContent div').removeClass('active');
		        });
		        $('#modify_'+modifyCount+'-tab').trigger('click');
			},
		})          
	}
}


function selectedTable(divId,data,modifyCount){
  var tableText ='';
  tableText += '<table class="table table-striped" id="changeTable_'+modifyCount+'">';
  tableText += '<thead><th scope="col">#</th><th scope="col">Position</th><th scope="col">Variation</th></thead><tbody></tbody></table>';
  $('#'+divId).append(tableText);

  var tableTemp='';
  for(var x in data.changed_pos){
    tableTemp += '<tr><th>'+(Number(x)+1)+'</th><td>'+data.changed_pos[x]+'</td></tr>';
  }
  $('#changeTable_'+modifyCount).find('tbody').append(tableTemp);
}