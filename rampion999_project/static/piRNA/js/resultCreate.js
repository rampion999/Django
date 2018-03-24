function resultCreate(divId,userNum,data){
	var ruleText = '<div class="escape" style="text-align:left;">';
	ruleText += 		'<h2>Input Information</h2>';
	ruleText += 		'<div class="pt-3">';
	ruleText += 			'<p><span class="h5"><strong>Sequence name: </strong></span>'+data.name+'</p>';
	ruleText += 		'</div>';
	ruleText += 		'<div class="pt-3">';
	ruleText += 			'<p><span class="h5"><strong>Specify coding sequence (CDS) region: </strong></span>'+data.CDS_region+'</p>';
	ruleText += 		'</div>';
	ruleText += 		'<div class="pt-3">';
	ruleText += 			'<p><span class="h5"><strong>piRNA targeting rules:</strong></span></p>';
	ruleText += 		'</div>';
	ruleText +=			'<div class="row pt-0 d-flex justify-content-around">';
	ruleText +=				'<div class="col-3">';
	ruleText +=					'<ul class="list-unstyled">';
	ruleText +=						'<li class="card-text">';
	ruleText +=							'<u>Number of mismatches allowed at seed region</u>:';
	ruleText +=						'</li>';
	ruleText +=						'<li class="card-text">';
	ruleText +=							'<ul>';
	ruleText +=								'<li>';
	ruleText +=									'number of non-GU pairs &nbsp;≤&nbsp;'+data.options.core_non_GU;
	ruleText +=								'</li>';
	ruleText +=								'<li>';
	ruleText +=									'number of GU pairs &nbsp;≤&nbsp;'+data.options.core_GU;
	ruleText +=								'</li>';
	ruleText +=							'</ul>';
	ruleText +=						'</li>';
	ruleText +=					'</ul>';
	ruleText +=				'</div>';

	ruleText +=				'<div class="col-4">';
	ruleText +=					'<ul class="list-unstyled">';
	ruleText +=						'<li class="card-text">';
	ruleText +=							'<u>Number of mismatches allowed at non-seed region</u>:';
	ruleText +=						'</li>';


	ruleText +=						'<li class="card-text">';
	ruleText +=							'<ul>';
	ruleText +=								'<li>';
	ruleText +=									'number of non-GU pairs &nbsp;≤&nbsp;'+data.options.non_core_non_GU;
	ruleText +=								'</li>';
	ruleText +=								'<li>';
	ruleText +=									'number of GU pairs &nbsp;≤&nbsp;'+data.options.non_core_GU;
	ruleText +=								'</li>';
	ruleText +=							'</ul>';
	ruleText +=						'</li>';
	ruleText +=					'</ul>';
	ruleText +=				'</div>';

	ruleText +=				'<div class="col-4">';
	ruleText +=					'<ul class="list-unstyled">';
	ruleText +=						'<li class="card-text">';
	ruleText +=							'<u>Total number of mismatches at seed & non-seed regions</u> ≤&nbsp;'+data.options.total;
	ruleText +=						'</li>';
	ruleText +=					'</ul>';
	ruleText +=				'</div>';
	ruleText +=			'</div>';
	ruleText +=		'</div>';


	var resultText = '<div class="container-fluid py-2">';
	resultText += ruleText;
	resultText += 				'<fieldset class="mt-5">';
	resultText += 					'<legend>Identified piRNA target sites in the input sequence</legend>';
	resultText += 					'<div class="card mb-4 border-dark" style="border-top-left-radius: 0rem!important;">';
	resultText += 						'<div class="card-body text-dark text-center">';
	resultText += 							'<div class="card mb-4">';
	resultText += 								'<h1 class="card-header bg-white text-dark text-center"><b>'+data.newout.length+' Identified piRNA target sites</b> <small>(Graphical View)</small></h1>';
	resultText += 								'<div class="card-body text-dark text-center">';
	resultText += 									'<svg id="'+divId+'-explain"></svg>';
	resultText += 									'<svg id="'+divId+'-overView"></svg>';
	resultText += 								'</div>';
	resultText += 							'</div>';
	resultText += '<br>';
	resultText += 					'<div class="card my-4">';
	resultText += 						'<h1 class="card-header bg-white text-dark text-center"><b>'+data.newout.length+' Identified piRNA target sites</b> <small>(Table View)&nbsp;&nbsp;</small><a href="/piScan/DownloadTable/0/'+userNum+'" target="_blank"><button type="button" class="btn btn-info" style="border-color: black; padding-top: 4px; padding-bottom: 4px;"><img src="https://png.icons8.com/download/androidL/20/000000">  Download table</button></a></h1>';
	resultText += 						'<div class="card-body text-dark text-center">';
	resultText += 							'<div id="'+divId+'-targetedTable"></div>';
	resultText += 						'</div>';
	resultText += 					'</div>';
	resultText += '<br>';
	resultText += 					'<div class="card my-4" style="display: none;">';
	resultText += 						'<h1 class="card-header bg-white text-dark text-center"><b>piRNA abundance</b></h1>';
	resultText += 						'<div class="card-body text-dark text-center">';
	resultText += 							'<div id="'+divId+'-abundance"></div>';
	resultText += 						'</div>';
	resultText += 					'</div>';
	resultText += '<br>';
	resultText += 					'<div class="card my-4">';
	resultText += 						'<h1 class="card-header bg-white text-dark text-center"><b>'+data.newout.length+' Identified piRNA target sites</b> <small>(Sequence View)&nbsp;&nbsp;</small><button type="button" id="downloadSeq0" class="btn btn-info" style="border-color: black; padding-top: 4px; padding-bottom: 4px;"><img src="https://png.icons8.com/download/androidL/20/000000">  Download seqView</button></h1>';
	resultText += 						'<div class="card-body text-dark text-center" id="'+divId+'-seqView-div">';
	resultText += 							'<div class="d-inline float-left mb-4">&nbsp;&nbsp;&nbsp;Lowercase/Uppercase text indicates UTRs/CDS</div><div id="'+divId+'-symbol" class="text-left float-right"></div><svg id="'+divId+'-seqView"></svg>';
	resultText += 						'</div>';
	resultText += 					'</div>';
	resultText += 				'</fieldset>';
	// resultText += 			'</div>';
	// resultText += 			'<div class="tab-pane mt-4" id="'+divId+'-suggetions" role="tabpanel" aria-labelledby="'+divId+'-suggetions-tab">';
	// resultText += 				'<fieldset>'
	// resultText += 					'<legend>Modify your DNA/RNA sequence<samll>(without changing the coded amino acid sequence)</samll> to escape the piRNA targeting</legend>';
	// resultText += 					'<div class="card darkC">';
	// resultText += 						'<div class="card-body text-dark text-center">';
	// resultText += 							'<div id="'+divId+'-sugTable"></div>';
	// resultText += 						'</div>';
	// resultText += 					'</div>';
	// resultText += 				'</fieldset>';
	// resultText += 				'<div id="update_footer" class="text-center my-4"><button type="button" id="'+divId+'-update" class="btn btn-primary btn-lg">Modify input sequence</button></div>'
	// resultText += 			'</div>';
	// resultText += 		'</div>';
	// resultText += 	'</div>';
	// resultText += '</div>';
	resultText += '</div>';

	$('#'+divId).append(resultText);


	$('#downloadSeq0').on('click',function(){
		saveSvgAsPng(document.getElementById(divId+'-seqView'), "input_seqView.png", {scale: 2, backgroundColor: "#FFFFFF"});
	});

	///////Seq Vies 圖例
	var symbol = '';
	symbol += 	'  <mark style="color: yellow">&nbsp;&nbsp;&nbsp;&nbsp;</mark>  non-GU mismatch &nbsp;&nbsp;&nbsp;&nbsp;';
	symbol += 	'  <mark style="color: lightblue; background-color: lightblue;">&nbsp;&nbsp;&nbsp;&nbsp;</mark>  GU mismatch &nbsp;&nbsp;&nbsp;&nbsp;';
	symbol += 	'  <mark style="color: lightgreen; background-color: lightgreen;">&nbsp;&nbsp;&nbsp;&nbsp;</mark>  mismatch at the 1st position of piRNA &nbsp;&nbsp;&nbsp;&nbsp;';
	symbol += 	'  <span id="detail"><span id="L">|</span>&nbsp;&nbsp;<span id="L">|</span></span>  seed region &nbsp;&nbsp;&nbsp;&nbsp;';
	symbol +=	'<svg width="40" height="20"><line x1="1" y1="1" x2="1" y2="11.5" class="CDSLine" transform="translate(0,7.5)"></line><line x1="1" y1="1" x2="33.32" y2="1" class="CDSLine" transform="translate(0,7.5)"></line><line x1="33.32" y1="1" x2="33.32" y2="11.5" class="CDSLine" transform="translate(0,7.5)"></line></svg> Codon &nbsp;&nbsp;<br>'
	// symbol += '<span class="float-right"><svg width="35" height="20"><line x1="1" y1="1" x2="1" y2="11.5" class="CDSLine" transform="translate(0,5)"></line><line x1="1" y1="1" x2="33.32" y2="1" class="CDSLine" transform="translate(0,5)"></line><line x1="33.32" y1="1" x2="33.32" y2="11.5" class="CDSLine" transform="translate(0,5)"></line></svg> CDS Codon &nbsp;&nbsp;</span><br>';
	// symbol += '<span class="float-right">Lowercase text indicates UTRs.&nbsp;&nbsp;&nbsp;&nbsp; </span><br>';
	// symbol += '<span class="float-right">Uppercase text indicates CDS.&nbsp;&nbsp;&nbsp;&nbsp; </span><br>';
	$('#'+divId+'-symbol').append(symbol);

}


function modifyResultCreate(divId,modifyCount,userNum){
	var resultText = '<div class="container-fluid py-2">';
	resultText += '<fieldset>';
	resultText += '<legend>Identified piRNA target sites in the modified sequence #'+modifyCount+'</legend>';
	resultText += '<div class="card my-3">';
	resultText += '';
	resultText += '<div class="card-body">';
	resultText += '<div class="card mb-4 border-dark" style="border-top-left-radius: 0rem!important;">';
	resultText += '<div class="card-body text-dark text-center">';
	resultText += '<div class="card mb-4">';
	resultText += '<h1 class="card-header bg-white text-dark text-center"><b>Identified piRNA target sites</b> <small>(Graphical View)</small></h1>';
	resultText += '<div class="card-body text-dark text-center">';
	resultText += '<svg id="'+divId+'-explain"></svg>';
	resultText += '<svg id="'+divId+'-overView"></svg>';
	resultText += '</div>';
	resultText += '</div>';
	resultText += '<br>';
	resultText += '<div class="card mb-4">';
	resultText += '<h1 class="card-header bg-white text-dark text-center"><b>Identified piRNA target sites</b> <small>(Table View)&nbsp;&nbsp;</small><a href="/piScan/DownloadTable/'+modifyCount+'/'+userNum+'" target="_blank"><button type="button" class="btn btn-info" style="border-color: black; padding-top: 4px; padding-bottom: 4px;"><img src="https://png.icons8.com/download/androidL/20/000000">  Download table</button></a></h1>';
	resultText += '<div class="card-body text-dark text-center">';
	resultText += '<div id="'+divId+'-targetedTable"></div>';
	resultText += '</div>';
	resultText += '</div>';
	resultText += '<br>';
	resultText += '<div class="card mb-4" style="display: none;">';
	resultText += '<h1 class="card-header bg-white text-dark text-center"><b>piRNA abundance</b></h1>';
	resultText += '<div class="card-body text-dark text-center">';
	resultText += '<div id="'+divId+'-abundance"></div>';
	resultText += '</div>';
	resultText += '</div>';
	resultText += '<br>';
	resultText += '<div class="card mb-4">';
	resultText += '<h1 class="card-header bg-white text-dark text-center"><b>Identified piRNA target sites</b> <small>(Sequence View)&nbsp;&nbsp;</small><button type="button" id="downloadSeq'+modifyCount+'" class="btn btn-info" style="border-color: black; padding-top: 4px; padding-bottom: 4px;"><img src="https://png.icons8.com/download/androidL/20/000000">  Download seqView</button></h1>';
	resultText += '<div class="card-body text-dark text-center" id="'+divId+'-seqView-div">';
	resultText += '<div class="d-inline float-left mb-4">&nbsp;&nbsp;&nbsp;Lowercase/Uppercase text indicates UTRs/CDS</div><div id="'+divId+'-symbol" class="text-left float-right"></div><div id="'+divId+'-symbol" class="text-left float-right"></div><svg id="'+divId+'-seqView"></svg>';
	resultText += '</div>';
	resultText += '</div>';
	resultText += '</div>';
	resultText += '</div>';
	resultText += '</div>';
	resultText += '<div class="card-footer text-center"><button class="btn btn-primary btn-lg" data-toggle="modal" data-target="#modify_'+modifyCount+'-suggetions-out">Refine design</button></div>';
	resultText += '</div>';
	resultText += '</fieldset>';
	resultText += '</div>';

	$('#'+divId).append(resultText);

	$('#downloadSeq'+modifyCount).on('click',function(){
		saveSvgAsPng(document.getElementById(divId+'-seqView'), "Modified#"+modifyCount+"_seqView.png", {scale: 2, backgroundColor: "#FFFFFF"});
	});


	var symbol = '';
	symbol += 	'  <mark style="color: yellow">&nbsp;&nbsp;&nbsp;&nbsp;</mark>  non-GU mismatch &nbsp;&nbsp;&nbsp;&nbsp;';
	symbol += 	'  <mark style="color: lightblue; background-color: lightblue;">&nbsp;&nbsp;&nbsp;&nbsp;</mark>  GU mismatch &nbsp;&nbsp;&nbsp;&nbsp;';
	symbol += 	'  <mark style="color: lightgreen; background-color: lightgreen;">&nbsp;&nbsp;&nbsp;&nbsp;</mark>  mismatch at the 1st position of piRNA &nbsp;&nbsp;&nbsp;&nbsp;';
	symbol += 	'  <span id="detail"><span id="L">|</span>&nbsp;&nbsp;<span id="L">|</span></span>  seed region &nbsp;&nbsp;&nbsp;&nbsp;';
	symbol +=	'<svg width="40" height="20"><line x1="1" y1="1" x2="1" y2="11.5" class="CDSLine" transform="translate(0,7.5)"></line><line x1="1" y1="1" x2="33.32" y2="1" class="CDSLine" transform="translate(0,7.5)"></line><line x1="33.32" y1="1" x2="33.32" y2="11.5" class="CDSLine" transform="translate(0,7.5)"></line></svg> Codon &nbsp;&nbsp;<br>'
	$('#'+divId+'-symbol').append(symbol);

	var modalCreate = '<div class="modal fade" id="modify_'+modifyCount+'-suggetions-out" tabindex="-1" role="dialog" aria-labelledby="modify_'+modifyCount+'ModalTitle" aria-hidden="true">'+
	'    <div class="modal-dialog modal-soBig" role="document">'+
	'      <div class="modal-content">'+
	'        <div class="modal-header">'+
	'          <h3 class="modal-title" id="modify_'+modifyCount+'ModalTitle">Refine design #'+modifyCount+'</h3>'+
	'          <button type="button" class="close" data-dismiss="modal" aria-label="Close">'+
	'            <span aria-hidden="true">×</span>'+
	'          </button>'+
	'        </div>'+
	'        <div class="modal-body">'+
	'          <div id="modify_'+modifyCount+'-sugTable"></div>'+
	'        </div>'+
	'        <div class="modal-footer">'+
	'          <div class="container text-center">          '+
	'            <button type="button" id="'+divId+'-update" class="btn btn-primary" value="'+modifyCount+'">Accept selected modifications</button>'+
	'            <button type="button" class="btn btn-secondary" data-dismiss="modal">Cancel</button>'+
	'          </div>'+
	'        </div>'+
	'      </div>'+
	'    </div>'+
	'  </div>';
	$('body').append(modalCreate);

	


	// $('.backsug').on('click',function(){
	// 	$('#original-tab').tab('show');
	// 	$('#originalResult-suggetions-tab').tab('show');
	// 	$(document).ready(function(){
	// 		$('html, body').animate({scrollTop: '0px'}, 300);
	// 	});	
	// });
}
