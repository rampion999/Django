function preSeqView(divId,data){
	var CDS_1 = data.CDS1;
	var CDS_2 = data.CDS2;
	var mRNA = data.gene.split('');
	// $('#preGene').append('<h1 style="text-align: center;"><b>New input gene</b></h1><svg id="preSeqView"></svg>');
	var mRNAlen = data.gene.length;
	var unit = 100;
	var width = 1700;
	var height = (2*(Math.floor(mRNAlen/unit)+1))*17.5 + 70;
	var contentWidth = 1600;

	var scaleY = d3.scale.linear()
		.range([0, height])
		.domain([0, height/17.5]);
	var scaleA = d3.scale.linear()
		.range([0, contentWidth])
		.domain([0, unit-1]);


	var svg = d3.select('#'+divId).attr({
		'width': width,
		'height': height,
		'style':"margin-left:auto; margin-right:auto; display:block;",
	});

	var y=2;
  	var axisPos = [2];
  	for (var bot in data.changed_pos){
  		svg.append('rect').attr({
            // 'id':data[piRNA].piRNA,
            'x':scaleA((Number(data.changed_pos[bot])-1)%unit),
            'y':scaleY(2+2*(Math.floor(Number(data.changed_pos[bot])/unit)-1)),
            'width':'15', 
            'height':'15',
            'transform':'translate(32.5,13.5)',
            'fill':'transparent',
            // 'opacity': 0,
            'stroke': 'red',
          	'stroke-width': 1,
          });
  	}

	for (var i = 0; i <= Math.floor((mRNAlen-1)/unit); i++) {
		// console.log((mRNAlen/100)-1);
		if(i > Math.floor(mRNAlen/unit)-1 && mRNAlen%unit!=1){
		  var scaleX = d3.scale.linear()
			.range([0, (contentWidth/(unit-1))*((mRNAlen-1)%unit)])
			.domain([unit*i, mRNAlen-1])
		  var tick = (mRNAlen%unit)-1;
		  svg.append('text').attr({
			'x':scaleA(tick+1.5),
			'y':scaleY(axisPos[i]),
			// 'fill':'red',
			'style':'text-anchor: middle',
			'transform':'translate(40,0)',       
			}).text(mRNAlen);
		  // console.log(tick);
		}
		else if(i > Math.floor(mRNAlen/unit)-1 && mRNAlen%unit==1){
		  var scaleX = d3.scale.linear()
			.range([0, (contentWidth/(unit-1))*((mRNAlen-1)%unit)])
			.domain([unit*i, mRNAlen-1])
		  var tick = (mRNAlen%unit)-1;
		  svg.append('text').attr({
			'x':scaleA(0),
			'y':scaleY(axisPos[i]-0.5),
			// 'fill':'red',
			'style':'text-anchor: middle',
			'transform':'translate(40,0)',       
			}).text(function(){
			  if(CDS_1=='' && CDS_2==''){return mRNA[mRNAlen-1].toLowerCase();}
			  else{
				if(mRNAlen!=CDS_2){return mRNA[mRNAlen-1].toLowerCase();}
				else{return mRNA[mRNAlen-1];}
			  }
			});
		}
		else{
		  var scaleX = d3.scale.linear()
			.range([0, contentWidth])
			.domain([unit*i, unit*(i+1)-1]);
		  var tick = unit;
		  svg.append('text').attr({
			'x':scaleA(unit+0.5),
			'y':scaleY(axisPos[i]),
			// 'fill':'red',
			'style':'text-anchor: middle',
			'transform':'translate(40,0)',       
			}).text(unit*(i+1));
		}
		svg.append('text').attr({
			'x':scaleA(-1.5),
			'y':scaleY(axisPos[i]),
			// 'fill':'red',
			'style':'text-anchor: middle',
			'transform':'translate(40,0)',       
			}).text(unit*i+1);

		var axisX = d3.svg.axis()
			.scale(scaleX)
			.orient('top')
			.tickFormat(function(d){
			  // console.log('d='+d+' mRNA:'+mRNA[d]);
			  if(CDS_1=='' && CDS_2==''){return mRNA[d].toLowerCase();}
			  else{
				if(d<CDS_1-1 || d>CDS_2-1){return mRNA[d].toLowerCase();}
				else{return mRNA[d];}
			  }
			})
			.ticks(tick);
		svg.append('g')
		   .call(axisX)
		   .attr({
			'fill':'none',
			'stroke':'#000',
			'transform':'translate(40,'+scaleY(y)+')' 
		   })
		   .selectAll('text')
		   .attr({
			'fill':'#000',
			'stroke':'none',
		   }).style({
			'font-size':'15px'
		   });
		y+=2;axisPos[i+1] = y;
	}
	for (var z in data.changed_pos){
		console.log(data.changed_pos[z]);
		var nPos = Number(data.changed_pos[z])%unit;
		if (nPos == 0){nPos = unit};
		svg.select('g:nth-of-type('+String(Math.floor(Number(data.changed_pos[z])/unit)+1)+') g:nth-of-type('+String(nPos)+') text')
			.attr({
			'fill':'red',
			'stroke':'none',
			});
	}

}


function sucSeqView(divId,data){
	var CDS_1 = data.CDS1;
	var CDS_2 = data.CDS2;
	var mRNA = data.gene.split('');
	// $('#preGene').append('<h1 style="text-align: center;"><b>New input gene</b></h1><svg id="preSeqView"></svg>');
	var mRNAlen = data.gene.length;

	var width = 700;
	var height = (2*(Math.floor(mRNAlen/unit)+1))*17.5 + 70;


	var scaleY = d3.scale.linear()
		.range([0, height])
		.domain([0, height/17.5]);
	var scaleA = d3.scale.linear()
		.range([0, contentWidth])
		.domain([0, unit-1]);


	var svg = d3.select('#'+divId).attr({
		'width': width,
		'height': height,
		'style':"margin-left:auto; margin-right:auto; display:block;",
	});

	var y=2;
  	var axisPos = [2];
  	for (var bot in data.changed_pos){
  		svg.append('rect').attr({
            // 'id':data[piRNA].piRNA,
            'x':scaleA((Number(data.changed_pos[bot])-1)%unit),
            'y':scaleY(2+2*(Math.floor(Number(data.changed_pos[bot])/unit)-1)),
            'width':'15', 
            'height':'15',
            'transform':'translate(32.5,13.5)',
            'fill':'transparent',
            // 'opacity': 0,
            'stroke': 'red',
          	'stroke-width': 1,
          });
  	}

	for (var i = 0; i <= Math.floor((mRNAlen-1)/unit); i++) {
		// console.log((mRNAlen/100)-1);
		if(i > Math.floor(mRNAlen/unit)-1 && mRNAlen%unit!=1){
		  var scaleX = d3.scale.linear()
			.range([0, (contentWidth/unit-1)*((mRNAlen-1)%unit)])
			.domain([unit*i, mRNAlen-1])
		  var tick = (mRNAlen%unit)-1;
		  svg.append('text').attr({
			'x':scaleA(tick+2),
			'y':scaleY(axisPos[i]),
			// 'fill':'red',
			'style':'text-anchor: middle',
			'transform':'translate(40,0)',       
			}).text(mRNAlen);
		  // console.log(tick);
		}
		else if(i > Math.floor(mRNAlen/unit)-1 && mRNAlen%unit==1){
		  var scaleX = d3.scale.linear()
			.range([0, (contentWidth/unit-1)*((mRNAlen-1)%unit)])
			.domain([unit*i, mRNAlen-1])
		  var tick = (mRNAlen%unit)-1;
		  svg.append('text').attr({
			'x':scaleA(0),
			'y':scaleY(axisPos[i]-1),
			// 'fill':'red',
			'style':'text-anchor: middle',
			'transform':'translate(40,0)',       
			}).text(function(){
			  if(CDS_1=='' && CDS_2==''){return mRNA[mRNAlen-1];}
			  else{
				if(mRNAlen!=CDS_2){return mRNA[mRNAlen-1].toLowerCase();}
				else{return mRNA[mRNAlen-1];}
			  }
			});
		}
		else{
		  var scaleX = d3.scale.linear()
			.range([0, contentWidth])
			.domain([unit*i, unit*(i+1)-1]);
		  var tick = unit;
		  svg.append('text').attr({
			'x':scaleA(51),
			'y':scaleY(axisPos[i]),
			// 'fill':'red',
			'style':'text-anchor: middle',
			'transform':'translate(40,0)',       
			}).text(unit*(i+1));
		}
		svg.append('text').attr({
			'x':scaleA(-2),
			'y':scaleY(axisPos[i]),
			// 'fill':'red',
			'style':'text-anchor: middle',
			'transform':'translate(40,0)',       
			}).text(unit*i+1);

		var axisX = d3.svg.axis()
			.scale(scaleX)
			.orient('top')
			.tickFormat(function(d){
			  // console.log('d='+d+' mRNA:'+mRNA[d]);
			  if(CDS_1=='' && CDS_2==''){return mRNA[d];}
			  else{
				if(d<CDS_1-1 || d>CDS_2-1){return mRNA[d].toLowerCase();}
				else{return mRNA[d];}
			  }
			})
			.ticks(tick);
		svg.append('g')
		   .call(axisX)
		   .attr({
			'fill':'none',
			'stroke':'#000',
			'transform':'translate(40,'+scaleY(y)+')' 
		   })
		   .selectAll('text')
		   .attr({
			'fill':'#000',
			'stroke':'none',
		   }).style({
			'font-size':'15px'
		   });
		y+=2;axisPos[i+1] = y;
	}
	for (var z in data.changed_pos){
		console.log(data.changed_pos[z]);
		var nPos = Number(data.changed_pos[z])%unit;
		if (nPos == 0){nPos = unit};
		svg.select('g:nth-of-type('+String(Math.floor(Number(data.changed_pos[z])/unit)+1)+') g:nth-of-type('+String(nPos)+') text')
			.attr({
			'fill':'red',
			'stroke':'none',
			});
	}

}