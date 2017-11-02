function overView(mRNA,data,CDS_1,CDS_2){
  var mRNAlen = mRNA.length;
  var big = 0;
  for (key in data[0].most){
    if(data[0].most[key] > big){big = data[0].most[key];}
  }
  console.log(big);
  // var div = d3.select("body").append("div") 
  //             .attr("class", "tooltip")       
  //             .style("opacity", 0);

  var width = 1700;
  var height = (5+big)*17.5;
  var svg = d3.select('#overView').attr({
      'width': width,
      'height': height
    });  
  var scaleY = d3.scale.linear()
        .range([0, height])
        .domain([0, height/17.5]);
  var last = 0;
  
  var scaleX = d3.scale.linear()
        .range([0, 1500])
        .domain([1, mRNAlen])
        .clamp(false);
  var last_check= scaleX(mRNAlen)-scaleX(mRNAlen-(mRNAlen%50));
  if( last_check < 30){last=0.7;}
  if(mRNAlen%50!=0){
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
        .ticks(mRNAlen/50);
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
  var div = d3.select("body").append("div") 
    .attr("class", "tooltip")       
    .style("opacity", 0);
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
        'x':scaleX(1)-23,
        'y':scaleY(2.75),
        'fill':'#000',
        'stroke':'none',
        'style':'text-anchor: middle',
        'transform':'translate(52.5,4)',       
        }).style({
        'font-size':'15px'
       }).text('input');
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
    svg.append('text').attr({
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
    if(piRNA!=0){
      svg.append('rect').attr({
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
                var IDD = $(this).attr('id');
                var gettt = 'piRNA : ' + $(this).attr('id') + '<br>' + 'region : ' + $(this).attr('pos')
                            + ' ~ ' + (parseInt($(this).attr('pos'))+20);   
                div.transition()    
                  .duration(1)    
                  .style("opacity", 1)
                  .style("visibility", "visible");
                div.html(gettt);
                  // .style("left", (d3.event.pageX) + "px")   
                  // .style("top", (d3.event.pageY - 28) + "px");
                d3.select(this).style("fill",'grey');
            })
            .on("mousemove", function(){
              return div.style("top", (event.pageY+20)+"px").style("left",(event.pageX+10)+"px");
            })
            .on("mouseout", function(d) {   
                 div.transition()        
                  .style("visibility", "hidden");
                d3.select(this).style("fill",'red');
            });
      previousPos = data[piRNA].firstPos;            
    }
  }
};