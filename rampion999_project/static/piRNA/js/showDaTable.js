function showDaTable(){
	$.ajax({
		url: "showDaTable/", 
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
			console.log(data.out);
			var tText = '';
			tText += '<h1 style="text-align: center;"><b>selected changes</b></h1>';
			tText += '<table id="sug_selected">';
			// <th>CDS</th><th>position</th><th>change to</th><th>after changed</th><th>breaked rules</th><th>escape?</th>
			tText += '<thead><tr><th>piRNA</th><th width= 100>targeted region in the input sequences</th><th width= 100>original situation</th><th colspan="6">methods</th></tr></thead><tbody>';
			for (x in data.out){
				tText += '<tr><td class="mid" rowspan="'+(data.out[x][1].length+1)+'">'+data.out[x][0][0]+'</td>';
				tText += '<td class="mid" rowspan="'+(data.out[x][1].length+1)+'">'+data.out[x][0][1]+'~'+(Number(data.out[x][0][1])+20)+'</td>';
				tText += '<td class="mid" rowspan="'+(data.out[x][1].length+1)+'">'+data.out[x][0][2]+'</td><td>CDS</td><td>position</td><td>change to</td><td>after changed</td><td>breaked rules</td><td>escape?</td></tr>';
				for (y in data.out[x][1]){
					tText += '<tr>'
					tText += '<td>'+data.out[x][1][y][0]+'</td>';
					tText += '<td>'+data.out[x][1][y][1]+'</td>';
					tText += '<td>'+data.out[x][1][y][2]+'</td>';
					tText += '<td>'+data.out[x][1][y][3].replace('pic','Newpic')+'</td>';
					tText += '<td>'+data.out[x][1][y][4]+'</td>';
					tText += '<td>'+data.out[x][1][y][5]+'</td>';
					tText += '</tr>'
				}
			}
			tText += '</tbody></table>';
			$('#preTable').append(tText);
		}
	})
}