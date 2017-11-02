function resultCreate(divId){
	// var resultText = '<div class="container-fluid mt-4">\
	// <div class="card mb-3">\
	// <h4 class="card-header text-center">Results</h4>\
	// 	<div class="card-body">\
	// 		<div class="card border-dark mb-4">\
	// 			<h1 class="card-header bg-light text-dark text-center"><b>Overview chart</b></h4>\
	// 			<div class="card-body text-dark text-center">\
	// 				<svg id="overView"></svg>\
	// 			</div>\
	// 		</div>\
	// 		<div class="card border-dark mb-4">\
	// 			<h1 class="card-header bg-light text-dark text-center"><b>Sequence chart</b></h4>\
	// 			<div class="card-body text-dark text-center">\
	// 				<svg id="seqView"></svg>\
	// 			</div>\
	// 		</div>\
	// 		<div class="card border-dark mb-4">\
	// 			<h1 class="card-header bg-light text-dark text-center"><b>Targeted piRNAs</b></h4>\
	// 			<div class="card-body text-dark text-center">\
	// 				<div id="div_name"></div>\
	// 			</div>\
	// 		</div>\
	// 		<div class="card border-dark mb-4">\
	// 			<h1 class="card-header bg-light text-dark text-center"><b>Suggestions</b></h4>\
	// 			<div class="card-body text-dark text-center">\
	// 				<div id="div_name2"></div>\
	// 			</div>\
	// 		</div>\
	// 		<div class="card border-dark mb-4">\
	// 			<h1 class="card-header bg-light text-dark text-center"><b>piRNA abundance</b></h4>\
	// 			<div class="card-body text-dark text-center">\
	// 				<div id="div_name3"></div>\
	// 			</div>\
	// 		</div>\
	// 	</div>\
	// </div>\
	// </div>';


	// var resultText = '<div class="container-fluid mt-4">\
	// <div class="card mb-3">\
	// <h4 class="card-header text-center">Results</h4>\
	// 	<div class="card-body">\
	// 		<div>\
 //        <ul class="nav nav-tabs" id="myTab" role="tablist">\
 //          <li class="nav-item">\
 //            <a class="nav-link active" id="charts-tab" data-toggle="tab" href="#charts" role="tab" aria-controls="charts" aria-selected="true">Charts</a>\
 //          </li>\
 //          <li class="nav-item">\
 //            <a class="nav-link" id="suggetions-tab" data-toggle="tab" href="#suggetions" role="tab" aria-controls="suggetions" aria-selected="false">Suggetions</a>\
 //          </li>\
 //        </ul>\
 //        <div class="tab-content" id="myTabContent">\
 //        	<div class="tab-pane fade show active" id="charts" role="tabpanel" aria-labelledby="charts-tab">\
	// 					<div class="card mb-4 border-top-0">\
	// 						<div class="card-body text-dark text-center">\
	// 							<div class="card mb-4">\
	// 								<h1 class="card-header bg-white text-dark text-center"><b>Overview chart</b></h4>\
	// 								<div class="card-body text-dark text-center">\
	// 									<svg id="overView"></svg>\
	// 								</div>\
	// 							</div>\
	// 							<div class="card mb-4">\
	// 								<h1 class="card-header bg-white text-dark text-center"><b>Sequence chart</b></h4>\
	// 								<div class="card-body text-dark text-center">\
	// 									<svg id="seqView"></svg>\
	// 								</div>\
	// 							</div>\
	// 						</div>\
	// 					</div>\
 //        	</div>\
 //          <div class="tab-pane fade" id="suggetions" role="tabpanel" aria-labelledby="suggetions-tab">\
	//           <div class="card mb-4 border-top-0">\
	// 						<div class="card-body text-dark text-center">\
	// 							<div class="card mb-4">\
	// 								<h1 class="card-header bg-white text-dark text-center"><b>Targeted piRNAs</b></h4>\
	// 								<div class="card-body text-dark text-center">\
	// 									<div id="div_name"></div>\
	// 								</div>\
	// 							</div>\
	// 						</div>\
	// 					</div>\
 //          </div>\
	//       </div>\
	// 		</div>\
	// 	</div>\
	// </div>';

	var resultText = '<div class="container-fluid py-4">\
		<fieldset>\
			<legend>Results</legend>\
			<div class="card my-3">\
				<div class="card-header">\
	        <ul class="nav nav-pills card-header-pills" id="myTab" role="tablist">\
	          <li class="nav-item">\
	            <a class="nav-link active" id="'+divId+'-charts-tab" data-toggle="pill" href="#'+divId+'-charts" role="tab" aria-controls="'+divId+'-charts" aria-selected="true">Charts</a>\
	          </li>\
	          <li class="nav-item">\
	            <a class="nav-link" id="'+divId+'-suggetions-tab" data-toggle="pill" href="#'+divId+'-suggetions" role="tab" aria-controls="'+divId+'-suggetions" aria-selected="false">Suggetions</a>\
	          </li>\
	        </ul>\
	        </div>\
	      <div class="card-body">\
	        <div class="tab-content" id="myTabContent">\
	        	<div class="tab-pane show active" id="'+divId+'-charts" role="tabpanel" aria-labelledby="'+divId+'-charts-tab">\
							<div class="card mb-4 border-dark" style="border-top-left-radius: 0rem!important;">\
								<div class="card-body text-dark text-center">\
									<div class="card mb-4">\
										<h1 class="card-header bg-white text-dark text-center"><b>Overview chart</b></h4>\
										<div class="card-body text-dark text-center">\
											<svg id="overView"></svg>\
										</div>\
									</div>\
									<div class="card mb-4">\
										<h1 class="card-header bg-white text-dark text-center"><b>Sequence chart</b></h4>\
										<div class="card-body text-dark text-center">\
											<svg id="seqView"></svg>\
										</div>\
									</div>\
									<div class="card mb-4">\
										<h1 class="card-header bg-white text-dark text-center"><b>Targeted piRNAs</b></h4>\
										<div class="card-body text-dark text-center">\
											<div id="targetedTable"></div>\
										</div>\
									</div>\
									<div class="card mb-4">\
										<h1 class="card-header bg-white text-dark text-center"><b>piRNA abundance</b></h4>\
										<div class="card-body text-dark text-center">\
											<div id="abundance"></div>\
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
											<div id="sugTable"></div>\
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