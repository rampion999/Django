function resultCreate(divId){
	var resultText = '<div class="container-fluid py-4">';
	resultText += '<div class="card my-3">';
	resultText += 	'<div class="card-header">';
	resultText += 		'<ul class="nav nav-pills card-header-pills" id="'+divId+'-resultTab" role="tablist">';
	resultText += 			'<li class="nav-item">';
	resultText += 				'<a class="nav-link active" id="'+divId+'-charts-tab" data-toggle="pill" href="#'+divId+'-charts" role="tab" aria-controls="'+divId+'-charts" aria-selected="true">Scan Result</a>';
	resultText += 			'</li>';
	resultText += 			'<li class="nav-item">';
	resultText += 				'<a class="nav-link" id="'+divId+'-suggetions-tab" data-toggle="pill" href="#'+divId+'-suggetions" role="tab" aria-controls="'+divId+'-suggetions" aria-selected="false">Modified Sequence Design</a>';
	resultText += 			'</li>';
	resultText += 		'</ul>';
	resultText += 	'</div>';
	resultText += 	'<div class="card-body">';
	resultText += 		'<div class="tab-content" id="'+divId+'-resultTabContent">';
	resultText += 			'<div class="tab-pane show active mt-4" id="'+divId+'-charts" role="tabpanel" aria-labelledby="'+divId+'-charts-tab">';
	resultText += 				'<fieldset>';
	resultText += 					'<legend>Scan result for original sequence</legend>';
	resultText += 					'<div class="card mb-4 border-dark" style="border-top-left-radius: 0rem!important;">';
	resultText += 						'<div class="card-body text-dark text-center">';
	resultText += 							'<div class="card mb-4">';
	resultText += 								'<h1 class="card-header bg-white text-dark text-center"><b>Identified piRNA target sites</b> <small>(Figure View)</small></h1>';
	resultText += 								'<div class="card-body text-dark text-center">';
	resultText += 									'<svg id="'+divId+'-overView"></svg>';
	resultText += 								'</div>';
	resultText += 							'</div>';
	resultText += 					'<div class="card my-4">';
	resultText += 						'<h1 class="card-header bg-white text-dark text-center"><b>Identified piRNA target sites</b> <small>(Table View)</small></h1>';
	resultText += 						'<div class="card-body text-dark text-center">';
	resultText += 							'<div id="'+divId+'-targetedTable"></div>';
	resultText += 						'</div>';
	resultText += 					'</div>';
	resultText += 					'<div class="card my-4">';
	resultText += 						'<h1 class="card-header bg-white text-dark text-center"><b>piRNA abundance</b></h1>';
	resultText += 						'<div class="card-body text-dark text-center">';
	resultText += 							'<div id="'+divId+'-abundance"></div>';
	resultText += 						'</div>';
	resultText += 					'</div>';
	resultText += 					'<div class="card my-4">';
	resultText += 						'<h1 class="card-header bg-white text-dark text-center"><b>Identified piRNA target sites</b> <small>(Sequence View)</small></h1>';
	resultText += 						'<div class="card-body text-dark text-center">';
	resultText += 							'<div class="d-inline float-left mb-4">&nbsp;&nbsp;&nbsp;Lowercase/Uppercase text indicates UTRs/CDS</div><div id="'+divId+'-symbol" class="text-left float-right"></div><svg id="'+divId+'-seqView"></svg>';
	resultText += 						'</div>';
	resultText += 					'</div>';
	resultText += 				'</fieldset>';
	resultText += 			'</div>';
	resultText += 			'<div class="tab-pane mt-4" id="'+divId+'-suggetions" role="tabpanel" aria-labelledby="'+divId+'-suggetions-tab">';
	resultText += 				'<fieldset>'
	resultText += 					'<legend>Modify your DNA/RNA sequence<samll>(without changing the coded amino acid sequence)</samll> to escape the piRNA targeting</legend>';
	resultText += 					'<div class="card darkC">';
	resultText += 						'<div class="card-body text-dark text-center">';
	resultText += 							'<div id="'+divId+'-sugTable"></div>';
	resultText += 						'</div>';
	resultText += 					'</div>';
	resultText += 				'</fieldset>';
	resultText += 				'<div id="update_footer" class="text-center my-4"><button type="button" id="'+divId+'-update" class="btn btn-primary btn-lg">Modify input sequence</button></div>'
	resultText += 			'</div>';
	resultText += 		'</div>';
	resultText += 	'</div>';
	resultText += '</div>';
	resultText += '</div>';

	$('#'+divId).append(resultText);

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


function modifyResultCreate(divId,modifyCount){
	var resultText = '<div class="container-fluid py-2">';
	resultText += '<fieldset>';
	resultText += '<legend>Scan result for modified sequence #'+modifyCount+'</legend>';
	resultText += '<div class="card my-3">';
	resultText += '';
	resultText += '<div class="card-body">';
	resultText += '<div class="card mb-4 border-dark" style="border-top-left-radius: 0rem!important;">';
	resultText += '<div class="card-body text-dark text-center">';
	resultText += '<div class="card mb-4">';
	resultText += '<h1 class="card-header bg-white text-dark text-center"><b>Identified piRNA target sites</b> <small>(Figure View)</small></h1>';
	resultText += '<div class="card-body text-dark text-center">';
	resultText += '<svg id="'+divId+'-overView"></svg>';
	resultText += '</div>';
	resultText += '</div>';
	resultText += '<div class="card mb-4">';
	resultText += '<h1 class="card-header bg-white text-dark text-center"><b>Identified piRNA target sites</b> <small>(Table View)</small></h1>';
	resultText += '<div class="card-body text-dark text-center">';
	resultText += '<div id="'+divId+'-targetedTable"></div>';
	resultText += '</div>';
	resultText += '</div>';
	resultText += '<div class="card mb-4">';
	resultText += '<h1 class="card-header bg-white text-dark text-center"><b>piRNA abundance</b></h1>';
	resultText += '<div class="card-body text-dark text-center">';
	resultText += '<div id="'+divId+'-abundance"></div>';
	resultText += '</div>';
	resultText += '</div>';
	resultText += '<div class="card mb-4">';
	resultText += '<h1 class="card-header bg-white text-dark text-center"><b>Identified piRNA target sites</b> <small>(Sequence View)</small></h1>';
	resultText += '<div class="card-body text-dark text-center">';
	resultText += '<div class="d-inline float-left mb-4">&nbsp;&nbsp;&nbsp;Lowercase/Uppercase text indicates UTRs/CDS</div><div id="'+divId+'-symbol" class="text-left float-right"></div><div id="'+divId+'-symbol" class="text-left float-right"></div><svg id="'+divId+'-seqView"></svg>';
	resultText += '</div>';
	resultText += '</div>';
	resultText += '</div>';
	resultText += '</div>';
	resultText += '</div>';
	resultText += '<div class="card-footer text-center"><button class="backsug btn btn-primary btn-lg w-25">Try other modification</button></div>';
	resultText += '</div>';
	resultText += '</fieldset>';
	resultText += '</div>';

	$('#'+divId).append(resultText);


	var symbol = '';
	symbol += 	'  <mark style="color: yellow">&nbsp;&nbsp;&nbsp;&nbsp;</mark>  non-GU mismatch &nbsp;&nbsp;&nbsp;&nbsp;';
	symbol += 	'  <mark style="color: lightblue; background-color: lightblue;">&nbsp;&nbsp;&nbsp;&nbsp;</mark>  GU mismatch &nbsp;&nbsp;&nbsp;&nbsp;';
	symbol += 	'  <mark style="color: lightgreen; background-color: lightgreen;">&nbsp;&nbsp;&nbsp;&nbsp;</mark>  mismatch at the 1st position of piRNA &nbsp;&nbsp;&nbsp;&nbsp;';
	symbol += 	'  <span id="detail"><span id="L">|</span>&nbsp;&nbsp;<span id="L">|</span></span>  seed region &nbsp;&nbsp;&nbsp;&nbsp;';
	symbol +=	'<svg width="40" height="20"><line x1="1" y1="1" x2="1" y2="11.5" class="CDSLine" transform="translate(0,7.5)"></line><line x1="1" y1="1" x2="33.32" y2="1" class="CDSLine" transform="translate(0,7.5)"></line><line x1="33.32" y1="1" x2="33.32" y2="11.5" class="CDSLine" transform="translate(0,7.5)"></line></svg> Codon &nbsp;&nbsp;<br>'
	$('#'+divId+'-symbol').append(symbol);


	$('.backsug').on('click',function(){
		$('#original-tab').tab('show');
		$('#originalResult-suggetions-tab').tab('show');
		$(document).ready(function(){
			$('html, body').animate({scrollTop: '0px'}, 300);
		});	
	});
}