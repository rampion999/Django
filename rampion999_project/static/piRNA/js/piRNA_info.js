function open_table(divId,piRNA_name){
	// $('#div_name3').append('<h1 style= "text-align: center;"><b>piRNA abundance</b></h1>');
	var columnNum = piRNA_name.length;
	var table_html = '<table id="'+divId+'-myTable2" class="display"><thead><tr><th width= 150>piRNA</th>';

	for (var x in piRNA_name){
		table_html += '<th>' + piRNA_name[x] + '</th>';
	}

	table_html += '</tr></thead><tbody></tbody></table>';
	// console.log(table_html);
	$('#'+divId+'-abundance').append(table_html);
}

function piRNA_info(divId,data,piRNA_name,nematode){	
	var columnNum = piRNA_name.length;
	for (var x in data){
		var table = '';
		table += '<tr><td class="mid">'+data[x][0]+'</td>';
		for (var i in data[x][11]){
			if (columnNum < 5) {table += '<td class="mid">'+data[x][11][i]+'</td>';}
			else{table += '<td class="mid">'+data[x][11][i]+'</td>';}
		}
		table += '</tr>';
		$('#'+divId+'-abundance').find('tbody').append(table);
	} 

	if (columnNum <= 7) {
		$('#'+divId+'-myTable2').DataTable({
							searching:      false,
							paging:         true,
							aaSorting: [],
							"aoColumnDefs": [
								{ "bSortable": false, "aTargets": [ 0 ] }
							],
						});
	}
	else{
		$('#'+divId+'-myTable2').DataTable({
							searching:      false,
							scrollX:        true,
							scrollCollapse: true,
							paging:         true,
							fixedColumns:{
								leftColumns: 1
							},
							aaSorting: [],
							"aoColumnDefs": [
								{ "bSortable": false, "aTargets": [ 0 ] }
							],
						});
	}


	if (nematode == 'C.elegans'){
		// console.log('asshole mother fker')
		$('#'+divId+'-abundance').append(
			"<pre style='font-family: Time Newroman; text-align: left;'>References : "
			+"<br>	[1]    W. Tang et al., <a href='https://www.ncbi.nlm.nih.gov/pubmed/26919432'>“The RNase PARN-1 trims piRNA 3' ends to promote transcriptome surveillance in C. elegans,”</a> <i>Cell</i>., vol. 164, no. 5, pp. 947-948, Feb. 2016."
			+"<br>	[2]    W. Gu et al., <a href='https://www.ncbi.nlm.nih.gov/pubmed/23260138'>“CapSeq and CIP-TAP identify Pol II start sites and reveal capped small RNAs as C. elegans piRNA precursors,”</a> <i>Cell</i>., vol. 151, no. 7, pp. 1488–1500, Dec. 2012."
			+"<br>	[3]    H. C. Lee et al., <a href='https://www.ncbi.nlm.nih.gov/pubmed/22738724'>“C. elegans piRNAs mediate the genome-wide surveillance of germline transcripts,”</a> <i>Cell</i>., vol. 150, no. 1, pp. 78–87, Jun. 2012."
			+"</pre>"
		);
	}
	
}