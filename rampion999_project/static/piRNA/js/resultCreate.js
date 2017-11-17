function resultCreate(divId){
	var resultText = '<div class="container-fluid py-4">\
		<fieldset>\
			<legend>Original results</legend>\
			<div class="card my-3">\
				<div class="card-header">\
	        <ul class="nav nav-pills card-header-pills" id="'+divId+'-resultTab" role="tablist">\
	          <li class="nav-item">\
	            <a class="nav-link active" id="'+divId+'-charts-tab" data-toggle="pill" href="#'+divId+'-charts" role="tab" aria-controls="'+divId+'-charts" aria-selected="true">Charts</a>\
	          </li>\
	          <li class="nav-item">\
	            <a class="nav-link" id="'+divId+'-suggetions-tab" data-toggle="pill" href="#'+divId+'-suggetions" role="tab" aria-controls="'+divId+'-suggetions" aria-selected="false">Modify procedure</a>\
	          </li>\
	        </ul>\
	        </div>\
	      <div class="card-body">\
	        <div class="tab-content" id="'+divId+'-resultTabContent">\
	        	<div class="tab-pane show active" id="'+divId+'-charts" role="tabpanel" aria-labelledby="'+divId+'-charts-tab">\
							<div class="card mb-4 border-dark" style="border-top-left-radius: 0rem!important;">\
								<div class="card-body text-dark text-center">\
									<div class="card mb-4">\
										<h1 class="card-header bg-white text-dark text-center"><b>Overview chart</b></h4>\
										<div class="card-body text-dark text-center">\
											<svg id="'+divId+'-overView"></svg>\
										</div>\
									</div>\
									<div class="card mb-4">\
										<h1 class="card-header bg-white text-dark text-center"><b>Sequence chart</b></h4>\
										<div class="card-body text-dark text-center">\
											<svg id="'+divId+'-seqView"></svg>\
										</div>\
									</div>\
									<div class="card mb-4">\
										<h1 class="card-header bg-white text-dark text-center"><b>Targeted piRNAs</b></h4>\
										<div class="card-body text-dark text-center">\
											<div id="'+divId+'-targetedTable"></div>\
										</div>\
									</div>\
									<div class="card mb-4">\
										<h1 class="card-header bg-white text-dark text-center"><b>piRNA abundance</b></h4>\
										<div class="card-body text-dark text-center">\
											<div id="'+divId+'-abundance"></div>\
										</div>\
									</div>\
								</div>\
							</div>\
	        	</div>\
	          <div class="tab-pane" id="'+divId+'-suggetions" role="tabpanel" aria-labelledby="'+divId+'-suggetions-tab">\
		          <div class="card mb-4 border-dark">\
								<div class="card-body text-dark text-center">\
									<div class="card mb-4">\
										<h1 class="card-header bg-white text-dark text-center"><b>Suggestions</b></h4>\
										<div class="card-body text-dark text-center">\
											<div id="'+divId+'-sugTable"></div>\
										</div>\
									</div>\
								</div>\
							</div>\
	          </div>\
		      </div>\
		    </div>\
			</div>\
		</fieldset>\
	</div>';

	$('#'+divId).append(resultText);
}


function modifyResultCreate(divId,modifyCount){
	var resultText = '<div class="container-fluid py-4">\
		<fieldset>\
			<legend>Modified results #'+modifyCount+'</legend>\
			<div class="card my-3">\
				<div class="card-header text-center"><button class="backsug btn btn-primary btn-lg w-50">Go back and try different way</button></div>\
	      <div class="card-body">\
					<div class="card mb-4 border-dark" style="border-top-left-radius: 0rem!important;">\
						<div class="card-body text-dark text-center">\
							<div class="card mb-4">\
								<h1 class="card-header bg-white text-dark text-center"><b>Overview chart</b></h4>\
								<div class="card-body text-dark text-center">\
									<svg id="'+divId+'-overView"></svg>\
								</div>\
							</div>\
							<div class="card mb-4">\
								<h1 class="card-header bg-white text-dark text-center"><b>Sequence chart</b></h4>\
								<div class="card-body text-dark text-center">\
									<svg id="'+divId+'-seqView"></svg>\
								</div>\
							</div>\
							<div class="card mb-4">\
								<h1 class="card-header bg-white text-dark text-center"><b>Targeted piRNAs</b></h4>\
								<div class="card-body text-dark text-center">\
									<div id="'+divId+'-targetedTable"></div>\
								</div>\
							</div>\
							<div class="card mb-4">\
								<h1 class="card-header bg-white text-dark text-center"><b>piRNA abundance</b></h4>\
								<div class="card-body text-dark text-center">\
									<div id="'+divId+'-abundance"></div>\
								</div>\
							</div>\
						</div>\
					</div>\
		    </div>\
		    <div class="card-footer text-center"><button class="backsug btn btn-primary btn-lg w-50">Go back and try different way</button></div>\
			</div>\
		</fieldset>\
	</div>';

	$('#'+divId).append(resultText);
	$('.backsug').on('click',function(){
		$('#original-tab').tab('show');
		$('#originalResult-suggetions-tab').tab('show');
		$(document).ready(function(){
			$('html, body').animate({scrollTop: '0px'}, 300);
		});	
	});
}