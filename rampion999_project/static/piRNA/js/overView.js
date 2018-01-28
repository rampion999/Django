function overView(divId,mRNA,data,CDS_1,CDS_2,divWidth,newout){
  var mRNAlen = mRNA.length;
  var tickkk = 50*(Math.floor(mRNAlen/2000)+1);
  var big = 0;
  for (key in data[0].most){
    if(data[0].most[key] > big){big = data[0].most[key];}
  }
  // console.log(big);
  // var div = d3.select("body").append("div") 
  //             .attr("class", "tooltip")       
  //             .style("opacity", 0);

  var width = divWidth;
  var height = (5+big)*17.5;
  // console.log('#'+divId+'-overView');
  var svg = d3.select('#'+divId+'-overView').attr({
      'width': width,
      'height': height
    });  
  var scaleY = d3.scale.linear()
        .range([0, height])
        .domain([0, height/17.5]);
  var last = 0;
  
  var scaleX = d3.scale.linear()
        .range([0, width-150])
        .domain([1, mRNAlen])
        .clamp(false);
  var last_check= scaleX(mRNAlen)-scaleX(mRNAlen-(mRNAlen%tickkk));
  if( last_check < 30){last=0.7;}
  if(mRNAlen%tickkk!=0){
    svg.append('text').attr({
        'x':scaleX(mRNAlen+1),
        'y':scaleY(2-last)-9,
        'fill':'#000',
        'stroke':'none',
        'style':'text-anchor: middle',
        'transform':'translate(52.5,0)',       
        }).style({
        'font-size':'15px'
       }).text(mRNAlen);
  }
  svg.append('text').attr({
        'x':scaleX(1),
        'y':scaleY(2)-9,
        'fill':'#000',
        'stroke':'none',
        'style':'text-anchor: middle',
        'transform':'translate(52.5,0)',       
        }).style({
        'font-size':'15px'
       }).text(1);
  var axisX = d3.svg.axis()
        .scale(scaleX)
        .orient('top')
        .tickFormat(function(d){return d;})
        .ticks(mRNAlen/tickkk);
    svg.append('g')
       .call(axisX)
       .attr({
        'fill':'none',
        'stroke':'#000',
        'transform':'translate(52.5,'+scaleY(2)+')' 
       })
       .selectAll('text')
       .attr({
        'fill':'#000',
        'stroke':'none',
       }).style({
        'font-size':'15px'
       });
  var previousPos = -100;
  var seqY = 3;
  var div = d3.select(".tooltip");
  if(CDS_1=='' && CDS_2==''){
    svg.append('rect').attr({
          'x':scaleX(1),
          'y':scaleY(2),
          'width':scaleX(mRNAlen), 
          'height':'15',
          'transform':'translate(52.5,4)',
          'fill':'lightblue',
          'stroke':'black',
        });
    svg.append('text').attr({
        'x':scaleX(mRNAlen/2)-23,
        'y':scaleY(2.75),
        'fill':'#000',
        'stroke':'none',
        'style':'text-anchor: middle',
        'transform':'translate(52.5,4)',       
        }).style({
        'font-size':'15px'
       }).text('Input sequence');
  }
  else{
    svg.append('rect').attr({

            'x':scaleX(1),
            'y':scaleY(2),
            'width':scaleX(Number(CDS_1)+1), 
            'height':'15',
            'transform':'translate(52.5,4)',
            'fill':'lightyellow',
            'stroke':'black',
          });
    svg.append('rect').attr({

            'x':scaleX(Number(CDS_2)),
            'y':scaleY(2),
            'width':scaleX(mRNAlen-Number(CDS_2)+1), 
            'height':'15',
            'transform':'translate(52.5,4)',
            'fill':'lightpink',
            'stroke':'black',
          });
    svg.append('rect').attr({

            'x':scaleX(Number(CDS_1)),
            'y':scaleY(2),
            'width':scaleX(Number(CDS_2)-Number(CDS_1)+1), 
            'height':'15',
            'transform':'translate(52.5,4)',
            'fill':'lightgreen',
            'stroke':'black',
          });
    if (CDS_1 != 1 || CDS_2 != mRNAlen){svg.append('text').attr({
            'x':scaleX(0)-23,
            'y':scaleY(2.75),
            'fill':'#000',
            'stroke':'none',
            'style':'text-anchor: middle',
            'transform':'translate(50,4)',       
            }).style({
            'font-size':'15px'
           }).text("5' UTR");
        svg.append('text').attr({
            'x':scaleX(mRNAlen+1)+28,
            'y':scaleY(2.75),
            'fill':'#000',
            'stroke':'none',
            'style':'text-anchor: middle',
            'transform':'translate(52.5,4)',       
            }).style({
            'font-size':'15px'
           }).text("3' UTR");
    }
    svg.append('text').attr({
        'x':scaleX((Number(CDS_2)-Number(CDS_1))/2+Number(CDS_1))+28,
        'y':scaleY(2.75),
        'fill':'#000',
        'stroke':'none',
        'style':'text-anchor: middle',
        'transform':'translate(52.5,4)',       
        }).style({
        'font-size':'15px'
       }).text("CDS");    
  }
  
  for (var piRNA in data){
    console.log(newout);
    if(piRNA!=0){
      svg.append('rect').attr({
          'num':piRNA,
          'id':data[piRNA].piRNA,
          'pos':data[piRNA].firstPos,
          'x':scaleX(Number(data[piRNA].firstPos)),
          'y':scaleY(data[piRNA].stack+3),
          'width':scaleX(20), 
          'height':'15',
          'transform':'translate(52.5,4)',
          'fill':'red',
          'stroke':'black',
          // 'stroke-width':'10'
        }).on("mouseover", function(d) {
                var num = Number($(this).attr('num'));
                var IDD = $(this).attr('id');
                // var gettt = 'piRNA name: ' + data[num].piRNA + '<br>' + 'positions: ' + $(this).attr('pos')+ ' - ' + (parseInt($(this).attr('pos'))+20);
                var newDetail = newout[(num-1)][3].split(',').join(' , ')
                var gettt = '<table>';
                gettt += '<tr class="row1">';
                gettt += '<th>#</th>';
                gettt += '<th>piRNA</th>';
                gettt += '<th>targeted region in<br>input sequence</th>';
                gettt += '<th style="white-space:nowrap;"># mismatches</th>';
                gettt += '<th>position in piRNA</th>';
                gettt += '<th>pairing (top:Input sequence, bottom:piRNA)</th>';
                gettt += '</tr>';
                gettt += '<tr>';
                gettt += '<th>'+num+'</th>';
                gettt += '<td>'+newout[(num-1)][0]+'</td>';
                gettt += '<td>'+newout[(num-1)][1]+'</td>';
                gettt += '<td>'+newout[(num-1)][2]+'</td>';
                gettt += '<td>'+newDetail+'</td>';
                gettt += '<td style="font-family: Lucida Console;">'+newout[(num-1)][9]+'<br>'+newout[(num-1)][10]+'</td>';
                gettt += '</tr>';
                gettt += '</table>';
                // console.log($('#originalResult-overView').position());
                div.transition()    
                  .duration(1)    
                  .style("opacity", 1)
                  .style("visibility", "visible");
                div.html(gettt)
                  .style("left", ($('#wrap').width()*0.5 - $('#tooltip').width()*0.5) + "px")   
                  .style("top", (event.pageY+25) + "px");
                d3.select(this).style("fill",'#fd8181');
            })
            // .on("mousemove", function(){
            //   return div.style("top", (event.pageY+20)+"px").style("left",(event.pageX+10)+"px");
            // })
            .on("mouseout", function(d) {   
                 div.transition()        
                  .style("visibility", "hidden");
                d3.select(this).style("fill",'red');
            });
            // on("mouseover", function(d) {
            //     var IDD = $(this).attr('id');
            //     var gettt = 'piRNA name: ' + $(this).attr('id') + '<br>' + 'positions: ' + $(this).attr('pos')
            //                 + ' - ' + (parseInt($(this).attr('pos'))+20);   
            //     div.transition()    
            //       .duration(1)    
            //       .style("opacity", 1)
            //       .style("visibility", "visible");
            //     div.html(gettt);
            //       // .style("left", (d3.event.pageX) + "px")   
            //       // .style("top", (d3.event.pageY - 28) + "px");
            //     d3.select(this).style("fill",'grey');
            // })
            // .on("mousemove", function(){
            //   return div.style("top", (event.pageY+20)+"px").style("left",(event.pageX+10)+"px");
            // })
            // .on("mouseout", function(d) {   
            //      div.transition()        
            //       .style("visibility", "hidden");
            //     d3.select(this).style("fill",'red');
            // });
      previousPos = data[piRNA].firstPos;            
    }
  }
};


function eachOverView(Num,mRNA,data,CDS_1,CDS_2,divId,divWidth){
  // console.log(data);
  var mRNAlen = mRNA.length;
  var big = 0;
  var tickkk = 50*(Math.floor(mRNAlen/2000)+1);

  for (key in data[0].most){
    if(data[0].most[key] > big){big = data[0].most[key];}
  }

  var width = divWidth;
  var height = (5+big) * 17.5 - 30;
  // console.log('#overView_'+Num);
  var svg = d3.select('#'+divId+'-overView_'+Num).attr({
      'width': width,
      'height': height
    });  
  var scaleY = d3.scale.linear()
        .range([0, height])
        .domain([0, height/17.5]);
  var last = 0;
  
  var scaleX = d3.scale.linear()
        .range([0, width-120])
        .domain([1, mRNAlen])
        .clamp(false);
  var last_check= scaleX(mRNAlen)-scaleX(mRNAlen-(mRNAlen%tickkk));
  if( last_check < 30){last=0.7;}
  if(mRNAlen%tickkk!=0){
    svg.append('text').attr({
        'x':scaleX(mRNAlen+1),
        'y':scaleY(2-last)-9,
        'fill':'#000',
        'stroke':'none',
        'style':'text-anchor: middle',
        'transform':'translate(52.5,0)',       
        }).style({
        'font-size':'15px'
       }).text(mRNAlen);
  }
  svg.append('text').attr({
        'x':scaleX(1),
        'y':scaleY(2)-9,
        'fill':'#000',
        'stroke':'none',
        'style':'text-anchor: middle',
        'transform':'translate(52.5,0)',       
        }).style({
        'font-size':'15px'
       }).text(1);
  var axisX = d3.svg.axis()
        .scale(scaleX)
        .orient('top')
        .tickFormat(function(d){return d;})
        .ticks(mRNAlen/tickkk);
    svg.append('g')
       .call(axisX)
       .attr({
        'fill':'none',
        'stroke':'#000',
        'transform':'translate(52.5,'+scaleY(2)+')' 
       })
       .selectAll('text')
       .attr({
        'fill':'#000',
        'stroke':'none',
       }).style({
        'font-size':'15px'
       });
  var previousPos = -100;
  var seqY = 3;
  // var div = d3.select("body").append("div") 
  //   .attr("class", "tooltip")       
  //   .style("opacity", 0);
  if(CDS_1=='' && CDS_2==''){
    svg.append('rect').attr({
          'x':scaleX(1),
          'y':scaleY(2),
          'width':scaleX(mRNAlen), 
          'height':'15',
          'transform':'translate(52.5,4)',
          'fill':'lightblue',
          'stroke':'black',
        });
    svg.append('text').attr({
        'x':scaleX(mRNAlen/2)-23,
        'y':scaleY(2.75),
        'fill':'#000',
        'stroke':'none',
        'style':'text-anchor: middle',
        'transform':'translate(52.5,4)',       
        }).style({
        'font-size':'15px'
       }).text('Input sequence');
  }
  else{
    svg.append('rect').attr({

            'x':scaleX(1),
            'y':scaleY(2),
            'width':scaleX(Number(CDS_1)+1), 
            'height':'15',
            'transform':'translate(52.5,4)',
            'fill':'lightyellow',
            'stroke':'black',
          });
    svg.append('rect').attr({

            'x':scaleX(Number(CDS_2)),
            'y':scaleY(2),
            'width':scaleX(mRNAlen-Number(CDS_2)+1), 
            'height':'15',
            'transform':'translate(52.5,4)',
            'fill':'lightpink',
            'stroke':'black',
          });
    svg.append('rect').attr({

            'x':scaleX(Number(CDS_1)),
            'y':scaleY(2),
            'width':scaleX(Number(CDS_2)-Number(CDS_1)+1), 
            'height':'15',
            'transform':'translate(52.5,4)',
            'fill':'lightgreen',
            'stroke':'black',
          });
    if (CDS_1 != 1 || CDS_2 != mRNAlen){svg.append('text').attr({
            'x':scaleX(0)-23,
            'y':scaleY(2.75),
            'fill':'#000',
            'stroke':'none',
            'style':'text-anchor: middle',
            'transform':'translate(50,4)',       
            }).style({
            'font-size':'15px'
           }).text("5' UTR");
        svg.append('text').attr({
            'x':scaleX(mRNAlen+1)+28,
            'y':scaleY(2.75),
            'fill':'#000',
            'stroke':'none',
            'style':'text-anchor: middle',
            'transform':'translate(52.5,4)',       
            }).style({
            'font-size':'15px'
           }).text("3' UTR");
    }
    svg.append('text').attr({
        'x':scaleX((Number(CDS_2)-Number(CDS_1))/2+Number(CDS_1))+28,
        'y':scaleY(2.75),
        'fill':'#000',
        'stroke':'none',
        'style':'text-anchor: middle',
        'transform':'translate(52.5,4)',       
        }).style({
        'font-size':'15px'
       }).text("CDS");    
  }
  
  var count = 0;
  for (var piRNA in data){
    if(piRNA!=0){
      if (count == Num){
        var color = 'red';
      }
      else{
        var color = ' #DDDDDD'
      }
      svg.append('rect').attr({
          'id':data[piRNA].piRNA,
          'pos':data[piRNA].firstPos,
          'x':scaleX(Number(data[piRNA].firstPos)),
          'y':scaleY(data[piRNA].stack+3),
          'width':scaleX(20), 
          'height':'15',
          'transform':'translate(52.5,4)',
          'fill':color,
          'stroke':'black',
          // 'stroke-width':'10'
        });
      previousPos = data[piRNA].firstPos;
      count++;            
    }
  }
};