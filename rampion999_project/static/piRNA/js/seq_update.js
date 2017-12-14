function update(modifyCount,sug,sugNotCDS,name,gene,a,b,c,d,e,f,g,h,csrf,ori_data,pic2src,scanUrl){
	var new_gene = gene.split('');
	var selected = {};
	var count = 0;
	var posss = [];
	var ori_piRNA = {};
	var preCount = 0;
  var midCount = 0;
	var check_dict = {}; //檢查有沒有重複用的dictionary
	var selectInfo =[];
	var repeated = [];
	console.log(g);
	console.log(h);


	for (var i in sugNotCDS){
		var selectArr = [];
		if(sugNotCDS[i][1] < g){
			for (var j in sugNotCDS[i][7]){
				if ( $('#ck'+i+'_'+j).prop('checked') ) {
					var nnname = $('#ck'+i+'_'+j).val();
					nnname = nnname.split(',');
					var pos = Number(nnname[0]);
					var from = nnname[1];
					var to = nnname[2];
					var CDS = '';
					// 檢查重複
					if (Object.keys(check_dict).indexOf(String(pos)) == -1){
						check_dict[String(pos)] = to;
						new_gene[pos-1] = to;
						// selectArr.push($('#fr'+i+'_'+j).html().replace('<td><input type="checkbox" id="Preck'+i+'_'+j+'" value="'+pos+','+to+'"></td>','').replace('id="NCpic'+i+'_'+j,'id="new_NCpic'+i+'_'+j));
						selectArr.push(CDS+'##'+ pos +'##'+$('#fr'+i+'_'+j+' td:nth-last-of-type(4)').html()+'##'+$('#fr'+i+'_'+j+' td:nth-last-of-type(3)').html()+'##'+$('#fr'+i+'_'+j+' td:nth-last-of-type(2)').html()+'##'+$('#fr'+i+'_'+j+' td:nth-last-of-type(1)').html());
						posss.push(String(pos));
						selectInfo.push(pos+'@@'+from+'@@'+to+'@@'+CDS);
					}
					else{
						if(check_dict[String(pos)] != to){
							repeated.push(pos);
						}
					}
					/////////////////////////
				}			
			}
			preCount += 1;
		}
		if(selectArr.length != 0){
			// console.log('#piPic'+j);
			ori_piRNA[count] = sugNotCDS[i][0]+'@@@'+sugNotCDS[i][1]+'@@@'+$('#piPic'+i).html().replace('id="pic'+i,'id="new_pic'+i);
			selected[count] = selectArr.join('@@@');
			count+=1;
		}
	}



	for (var x in sug){
    var i = Number(x) + preCount;
		var selectArr = [];
		for (var j in sug[x][7]){
			if ( $('#ck'+i+'_'+j).prop('checked') ) {
				var nnname = $('#ck'+i+'_'+j).val();
				nnname = nnname.split(',');
				var pos = Number(nnname[0]);
				var from = nnname[1];
				var to = nnname[2];
				var CDS = nnname[3];
				if (Object.keys(check_dict).indexOf(String(pos)) == -1){
					check_dict[String(pos)] = to;
					new_gene[pos-1] = to;
					// selectArr.push($('#r'+i+'_'+j).html().replace('<td><input type="checkbox" id="ck'+i+'_'+j+'" value="'+pos+','+to+'"></td>','').replace('id="pic'+i+'_'+j,'id="new_pic'+i+'_'+j));
					selectArr.push(CDS+'##'+ pos +'##'+$('#r'+i+'_'+j+' td:nth-last-of-type(4)').html()+'##'+$('#r'+i+'_'+j+' td:nth-last-of-type(3)').html()+'##'+$('#r'+i+'_'+j+' td:nth-last-of-type(2)').html()+'##'+$('#r'+i+'_'+j+' td:nth-last-of-type(1)').html());
					posss.push(String(pos));
					selectInfo.push(pos+'@@'+from+'@@'+to+'@@'+CDS);
				}
				else{
					if(check_dict[String(pos)] != to){
						repeated.push(pos);
					}
				}
			}
		}
		if(selectArr.length != 0){
			// console.log('#piPic'+j);
			ori_piRNA[count] = sug[x][0]+'@@@'+sug[x][1]+'@@@'+$('#piPic'+i).html().replace('id="pic'+i,'id="new_pic'+i);
			selected[count] = selectArr.join('@@@');
			count+=1;
		}
    midCount +=1;
	}
	

	for (var x in sugNotCDS){
    var i = Number(x) + preCount + midCount;
		var selectArr = [];
		if(Number(x) >= preCount){
			for (var j in sugNotCDS[x][7]){
				if ( $('#ck'+i+'_'+j).prop('checked') ) {
					var nnname = $('#ck'+i+'_'+j).val();
					nnname = nnname.split(',');
					var pos = Number(nnname[0]);
					var from = nnname[1];
					var to = nnname[2];
					var CDS = '';
					if (Object.keys(check_dict).indexOf(String(pos)) == -1){
						check_dict[String(pos)] = to;
						new_gene[pos-1] = to;
						// selectArr.push($('#lr'+i+'_'+j).html().replace('<td><input type="checkbox" id="Lastck'+i+'_'+j+'" value="'+pos+','+to+'"></td>','').replace('id="NCpic'+i+'_'+j,'id="new_NCpic'+i+'_'+j));
						selectArr.push(CDS+'##'+ pos +'##'+$('#lr'+i+'_'+j+' td:nth-last-of-type(4)').html()+'##'+$('#lr'+i+'_'+j+' td:nth-last-of-type(3)').html()+'##'+$('#lr'+i+'_'+j+' td:nth-last-of-type(2)').html()+'##'+$('#lr'+i+'_'+j+' td:nth-last-of-type(1)').html());
						posss.push(String(pos));
						selectInfo.push(pos+'@@'+from+'@@'+to+'@@'+CDS);
					}
					else{
						if(check_dict[String(pos)] != to){
							repeated.push(pos);
						}
					}
				}		
			}
		}
		if(selectArr.length != 0){
			// console.log('#piPic'+j);
			ori_piRNA[count] = sugNotCDS[x][0]+'@@@'+sugNotCDS[x][1]+'@@@'+$('#piPic'+i).html().replace('id="pic'+i,'id="new_pic'+i);
			selected[count] = selectArr.join('@@@');
			count+=1;
		}
	}

	console.log(check_dict);
	console.log(repeated);
	if (posss.length==0){
		alert('you selected nothing');
	}
	else if(repeated.length != 0){
		alert(repeated.toString() + ' selected different sequence');
	}
	else{

		var posString = posss.join('@');
		var selectInfoStr = selectInfo.join('##');

		new_gene = new_gene.join('');
		$.ajax({
			url: "create_data/",
			data:{ 
				modifyCount:modifyCount,
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
				selectInfoStr:selectInfoStr,
				posString:posString,
				ori_piRNA:ori_piRNA,
				// ori_result:ori_data,
				// csrfmiddlewaretoken: '{{ csrf_token }}',
			},
			type: "POST", 
			dataType:'json',
			success: function(data){
				$('#overallTab').append(
					'<li class="nav-item">\
		            	<a class="nav-link" id="modify_'+modifyCount+'-tab" data-toggle="tab" href="#modify_'+modifyCount+'" role="tab" aria-controls="modify_'+modifyCount+'" aria-selected="false">Modified Sequence #'+modifyCount+'</a>\
		            </li>'
		        );
				$('#overallTabContent').append(
					'<div class="tab-pane fade" id="modify_'+modifyCount+'" role="tabpanel" aria-labelledby="modify_'+modifyCount+'-tab">\
		            	<div id="modify_'+modifyCount+'-Result"></div>\
		          	</div>'
		        );
		        $('html, body').animate({scrollTop: '0px'}, 300);
		        	var strVar = '<div class="card my-4 h-100 darkC">\
			                  <h4 class="card-header darkCH">Change</h4>\
			                  <div id="selectedChange_'+modifyCount+'" class="card-body">';               
            		strVar += '</div>;'            		
            		strVar +='</div>';
		        	strVar += '\
					<div class="card mb-4 h-100 darkC">\
		              <h4 class="card-header darkCH">Modified sequence</h4>\
		              <div class="card-body text-dark text-center">\
		                <svg id="preSeqView-'+modifyCount+'"></svg>\
		                <div class="row"><div class="col-1"></div><div class="col-11 text-left"><input type="checkbox" id="CDS_ck_'+modifyCount+'" class="align-self-center" checked><b class="align-self-center">Coding sequence (CDS) region: &nbsp;&nbsp;&nbsp;</b><input type="number" style="width: 60px" id="CDS_1_'+modifyCount+'" class="CDS_'+modifyCount+'">&nbsp;-&nbsp;<input type="number" style="width: 60px" id="CDS_2_'+modifyCount+'" class="CDS_'+modifyCount+'"></div></div>\
		              </div>\
		            </div>\
		        ';
		        	strVar+="";
    				// strVar += "              <div class=\"col-7\">";
    				strVar += "                <div class=\"card mb-4 h-100 darkC\">";
    				strVar += "                  <h4 class=\"card-header darkCH\">piRNA targeting rules<\/h4>";
    				strVar += "                  <div class=\"card-body\">";
    				strVar += "                    <div class=\"row\">";
    				strVar += "                      <div class=\"col-lg-6 align-self-center text-center\">";
    				strVar += "                        <a href=\"#\" class=\"d-block\">";
    				strVar += "                          <img class=\"img-fluid rounded\" src=\""+pic2src+"\" alt=\"\">";
    				strVar += "                        <\/a>";
    				strVar += "                      <\/div>";
    				// strVar += "                      <div class=\"col-lg-1\">";
    				// strVar += "                      <\/div>";
    				strVar += "                      <div class=\"col-lg-6\">";
    				strVar += "                        <ul class=\"list-unstyled\">             ";

    				strVar += "                          <li class=\"card-text\">";
					strVar += "                        <button type=\"button\" class=\"btn btn-secondary w-25 float-right\" id=\"reset_to_default_"+modifyCount+"\">Set to default<\/button>";
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
    				strVar += "<br>";
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
    				strVar += "<br>";
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
    				// strVar += "                          <li>";
    				// strVar += "                            <input type=\"checkbox\" id='CDS_ck_"+modifyCount+"' checked><b>Coding sequence (CDS) region: &nbsp;&nbsp;&nbsp;<\/b>";
    				// strVar += "                              <input type=\"number\" style=\"width: 60px\" id='CDS_1_"+modifyCount+"' class='CDS_"+modifyCount+"'>&nbsp;-&nbsp;";
    				// strVar += "                              <input type=\"number\" style=\"width: 60px\" id='CDS_2_"+modifyCount+"' class='CDS_"+modifyCount+"'>";
    				// strVar += "                          <\/li>";
    				strVar += "                          ";
    				strVar += "";

    				strVar += "                        <\/ul>";
    				strVar += "                      <\/div>";
    				strVar += "                    <\/div>";
    				strVar += "                  <\/div>";
    				strVar += "                <\/div>";
    				// strVar += "              <\/div>";
    				// strVar += "            <\/div>";   				   				
            		strVar += "            <div id=\"update_footer_"+modifyCount+"\" class=\"text-center my-3\"><button type=\"button\" id=\"TransformBTN_"+modifyCount+"\" class=\"btn btn-primary btn-lg\" style=\"width: 15%;\">RE-SCAN<\/button><\/div>";
		        $('#modify_'+modifyCount+'-Result').append(strVar);                   
		        $.ajax({
			        url: "selectedPreData/", 
			        data:{
			          modifyCount:modifyCount, 
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
		      var loca = '#originalResult-suggetions-tab';
					$('#original-tab').click(function(e){
            $(document).ready(function(e){              
              $(loca).tab('show');
            });            
          });
          $('a[data-toggle="pill"]').on('shown.bs.tab', function (e) {
            loca = '#' + e.target.id; // newly activated tab
          });
			},
		})          
	}
}


function selectedTable(divId,data,modifyCount){
  var tableText ='';
  tableText += '<table class="table table-striped" id="changeTable_'+modifyCount+'">';
  tableText += '<thead><th scope="col">#</th><th scope="col">Position</th><th scope="col">Change</th></thead><tbody></tbody></table>';
  $('#'+divId).append(tableText);

  var tableTemp='';
  for(var x in data.selectedInfo){
    tableTemp += '<tr><th>'+(Number(x)+1)+'</th><td class="mid">'+data.selectedInfo[x][0]+'</td><td class="mid">'+data.selectedInfo[x][1]+' → '+data.selectedInfo[x][2]+'</td></tr>';
  }
  $('#changeTable_'+modifyCount).find('tbody').append(tableTemp);
  $(document).ready(function() {
    $('#changeTable_'+modifyCount).DataTable({
    	"bLengthChange": false,
    	"bInfo" : false,
			"iDisplayLength": 5,
			"searching": false,
    });
	});
}