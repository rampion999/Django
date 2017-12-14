function loadDaShit(pic2src,data,modifyCount){
		$("#gene").val('>'+data.name+'\n'+data.gene);
		var CDS_switch = 1;
		$("#opt1_"+modifyCount).val(data.options['core_non_GU']);
		$("#opt2_"+modifyCount).val(data.options['core_GU']);
		$("#opt3_"+modifyCount).val(data.options['non_core_non_GU']);
		$("#opt4_"+modifyCount).val(data.options['non_core_GU']);
		$("#opt5_"+modifyCount).val(data.options['total']);
		$("#nematodeType_"+modifyCount).val(data.options['nematodeType']);
		var NCDS_1 = data.CDS1;
		var NCDS_2 = data.CDS2;
		if (NCDS_1 == 0 || NCDS_2 == 0){
			NCDS_1 = '';
			NCDS_2 = '';
			$('#CDS_ck_'+modifyCount).prop('checked',false);
			$('.CDS_'+modifyCount).prop('disabled',true);
			CDS_switch = 0;
		}
		$('#CDS_1_'+modifyCount).val(NCDS_1);
		$('#CDS_2_'+modifyCount).val(NCDS_2);
		$("#reset_to_default_"+modifyCount).click(function(){
			$("#nematodeType_"+modifyCount).val(data.options['nematodeType']);
			$("#opt1_"+modifyCount).val(data.options['core_non_GU']);
			$("#opt2_"+modifyCount).val(data.options['core_GU']);
			$("#opt3_"+modifyCount).val(data.options['non_core_non_GU']);
			$("#opt4_"+modifyCount).val(data.options['non_core_GU']);
			$("#opt5_"+modifyCount).val(data.options['total']);
			if(CDS_switch==1){
				$('#CDS_1_'+modifyCount).val(NCDS_1);
				$('#CDS_2_'+modifyCount).val(NCDS_2);
			}
		  });
		$('#CDS_ck_'+modifyCount).click(function(){
			if (CDS_switch == 0){
			  // $('#overView,#seqView,#div_name3,#div_name').empty();
			  $('.CDS_'+modifyCount).removeAttr('disabled');
			  $('#CDS_1_'+modifyCount).val(NCDS_1);
			  $('#CDS_2_'+modifyCount).val(NCDS_2);
			  CDS_switch++;
			}
			else{
			  // $('#overView,#seqView,#div_name3,#div_name').empty();
			  $('.CDS_'+modifyCount).val('');
			  $('.CDS_'+modifyCount).attr('disabled','');
			  CDS_switch--;
			}
		})
}

	// var page_text = '<p><b style="font-size: 21;">Scan filter options: </b>&nbsp;\
	// 	<input type="button" value="default" id="reset_to_default"><br>\
	// 	<img src = "'+pic2src+'" style="width:435px;height:162px;"><br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;\
	// 	<b>Choose nematode species :&nbsp;&nbsp;</b><select id="nematodeType" style="width:150px">\
	// 	<option class = "clean" selected value="C.elegans">C. elegans</option>\
	// 	<option class = "clean" value="C.briggsae">C. briggsae</option>\
	// 	<option class = "clean" value="C.remanei">C. remanei</option>\
	// 	<option class = "clean" value="C.brenneri">C. brenneri</option></select>\
	// 	<br><br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<b>Number of mismatches allowed at seed region:</b><br>\
	// 	&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;number of non-GU pairs &nbsp;≤&nbsp;\
	// 	<select id="opt1"><option class = "clean" selected value="0">0</option>\
	// 	<option class = "clean" value="1">1</option><option class = "clean" value="2">2</option>\
	// 	<option class = "clean" value="3">3</option><option class = "clean" value="4">4</option>\
	// 	<option class = "clean" value="5">5</option><option class = "clean" value="6">6</option>\
	// 	</select><br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;number of GU pairs &nbsp;≤&nbsp;\
	// 	<select id="opt2"><option class = "clean" value="0">0</option><option class = "clean" selected value="1">1</option>\
	// 	<option class = "clean" value="2">2</option><option class = "clean" value="3">3</option>\
	// 	<option class = "clean" value="4">4</option><option class = "clean" value="5">5</option>\
	// 	<option class = "clean" value="6">6</option></select><br><br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;\
	// 	<b>Number of mismatches allowed at non-seed region:</b><br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;\
	// 	number of non-GU pairs &nbsp;≤&nbsp;<select id="opt3"><option class = "clean" value="0">0</option>\
	// 	<option class = "clean" value="1">1</option><option class = "clean" value="2">2</option>\
	// 	<option class = "clean" selected value="3">3</option><option class = "clean" value="4">4</option>\
	// 	<option class = "clean" value="5">5</option><option class = "clean" value="6">6</option>\
	// 	<option class = "clean" value="7">7</option><option class = "clean" value="8">8</option>\
	// 	<option class = "clean" value="9">9</option><option class = "clean" value="10">10</option>\
	// 	<option class = "clean" value="11">11</option><option class = "clean" value="12">12</option>\
	// 	<option class = "clean" value="13">13</option><option class = "clean" value="14">∞</option>\
	// 	</select><br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;number of GU pairs &nbsp;≤&nbsp;\
	// 	<select id="opt4"><option class = "clean" value="0">0</option><option class = "clean" value="1">1</option>\
	// 	<option class = "clean" value="2">2</option><option class = "clean" selected value="3">3</option>\
	// 	<option class = "clean" value="4">4</option><option class = "clean" value="5">5</option>\
	// 	<option class = "clean" value="6">6</option><option class = "clean" value="7">7</option>\
	// 	<option class = "clean" value="8">8</option><option class = "clean" value="9">9</option>\
	// 	<option class = "clean" value="10">10</option><option class = "clean" value="11">11</option>\
	// 	<option class = "clean" value="12">12</option><option class = "clean" value="13">13</option>\
	// 	<option class = "clean" value="14">∞</option></select><br><br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;\
	// 	<b>Total number of mismatches at seed & non-seed regions &nbsp;&nbsp;≤&nbsp;</b>\
	// 	<select id="opt5"><option class = "clean" value="0">0</option><option class = "clean" value="1">1</option><option class = "clean" value="2">2</option><option class = "clean" selected value="3">3</option><option class = "clean" value="4">4</option><option class = "clean" value="5">5</option><option class = "clean" value="6">6</option><option class = "clean" value="7">7</option><option class = "clean" value="8">8</option><option class = "clean" value="9">9</option><option class = "clean" value="10">10</option><option class = "clean" value="11">11</option><option class = "clean" value="12">12</option><option class = "clean" value="13">13</option><option class = "clean" value="14">14</option><option class = "clean" value="15">15</option><option class = "clean" value="16">16</option><option class = "clean" value="17">17</option><option class = "clean" value="18">18</option><option class = "clean" value="19">19</option><option class = "clean" value="20">20</option><option class = "clean" value="21">21</option>\
	// 	</select><br><br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<input type="checkbox" id="CDS_ck" checked><b>Show CDS &nbsp;&nbsp;&nbsp;</b><br>\
	// 	&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;choose region :<input type="number" style="width: 50px" id="CDS_1" class="CDS">&nbsp;~&nbsp;\
	// 	<input type="number" style="width: 50px" id="CDS_2" class="CDS"></p>\
	// 	<input type="button" id="TransformBTN" value="Transform and scan!!"/>\
	// 	<p>This web tool is maintained by Dr. <a href="https://www.researchgate.net/profile/Wei-Sheng_Wu">Wei-Sheng Wu</a>\'s lab at National Cheng Kung University, Taiwan.</p>\
	// 	<hr><div id="test"></div><svg id="overView"></svg><svg id="seqView"></svg><div id="div_name"></div><div id="div_name2"></div><div id="div_name3"></div>';
	// 	$('#loadPage').append(page_text);