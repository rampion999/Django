function seqView(mRNA,data){
  var mRNAlen = mRNA.length;
  var exceptHeight = 5;  //預估piRNA行數
  for (key in data[0].most){
    // if(data[0].most[key]<=3){exceptHeight+=7;}
    // else{exceptHeight+=(data[0].most[key]+5);}
    if(data[0].most[key]!=0){exceptHeight+=data[0].most[key]+1;}
  }

  var div = d3.select("body").append("div") 
    .attr("class", "tooltip")       
    .style("opacity", 0);

  console.log("exceptHeight :"+exceptHeight);
  var width = 1700;
  var height = (3*(Math.floor(mRNAlen/100)+1)+exceptHeight)*17.5; //坐標軸行數加上預估piRNA行數乘每單位高
  console.log(height);
  var scaleY = d3.scale.linear()
        .range([0, height])
        .domain([0, height/17.5]);
  var svg = d3.select('#seqView').attr({
      'width': width,
      'height': height
    });
    
  var y=5;
  var axisPos = [5];
  var scaleA = d3.scale.linear()
        .range([0, 1600])
        .domain([0, 99]);
  
  for (var i = 0; i <= Math.floor(mRNAlen/100); i++) {
    // console.log((mRNAlen/100)-1);
    if(i > Math.floor(mRNAlen/100)-1){
      var scaleX = d3.scale.linear()
        .range([0, (1600/99)*(mRNAlen%100)])
        .domain([100*i, mRNAlen-1])
      var tick = mRNAlen%100;
      svg.append('text').attr({
        'x':scaleA(tick+1.5),
        'y':scaleY(axisPos[i]),
        // 'fill':'red',
        'style':'text-anchor: middle',
        'transform':'translate(40,0)',       
        }).text(mRNAlen);
      // console.log(tick);
    }
    else{
      var scaleX = d3.scale.linear()
        .range([0, 1600])
        .domain([100*i, 100*(i+1)-1]);
      var tick = 100;
      svg.append('text').attr({
        'x':scaleA(100.5),
        'y':scaleY(axisPos[i]),
        // 'fill':'red',
        'style':'text-anchor: middle',
        'transform':'translate(40,0)',       
        }).text(100*(i+1));
    }
    svg.append('text').attr({
        'x':scaleA(-1.5),
        'y':scaleY(axisPos[i]),
        // 'fill':'red',
        'style':'text-anchor: middle',
        'transform':'translate(40,0)',       
        }).text(100*i+1);

    var axisX = d3.svg.axis()
        .scale(scaleX)
        .orient('top')
        .tickFormat(function(d){return mRNA[d];})
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
    
    if (data[0].most[i] == undefined){y+=2;axisPos[i+1] = y;}
    else{
      var big = Number(data[0].most[i]);
      // if(big<=3 && big !=0){y+=5;axisPos[i+1] = y;}
      if(big ==0){y+=2;axisPos[i+1] = y;}
      else{y+=(big+4);axisPos[i+1] = y;}
    }   
  }
  // console.log(axisPos);
  for (var piRNA in data){
    if(piRNA!=0){
      var posOfMis = data[piRNA].posOfMis.split(',').map(Number);
      var posOfMisxGU = data[piRNA].posOfMisxGU.split(',').map(Number);
      var over = 0;
      
      if((Number(data[piRNA].firstPos)-1)%100 > 79){over = (Number(data[piRNA].firstPos)-1)%100 - 79;}
      else{over = 0;}
      for(var seq in data[piRNA].detail){
        var a = 0; 
        if(21-Number(seq) <= over){a = 1;}
        else{a = 0;}
        // console.log(Number(data[piRNA].firstPos)%100+Number(seq));
        if((posOfMis.indexOf(21-Number(seq))!=-1) && (posOfMisxGU.indexOf(21-Number(seq))!=-1)){
          // console.log((Number(data[piRNA].firstPos)%100+Number(seq)-1)%100);
          svg.append('rect').attr({
            'id':data[piRNA].piRNA,
            'x':scaleA(((Number(data[piRNA].firstPos)-1)%100+Number(seq))%100),
            'y':scaleY(axisPos[Math.floor((Number(data[piRNA].firstPos)-1)/100)+a]+Number(data[piRNA].stack)),
            'width':'15', 
            'height':'15',
            'transform':'translate(32.5,4)',
            'fill':'yellow'
          });

          svg.append('text')
            .text(data[piRNA].detail[seq])
            .data(data)
            .attr({              
              'class':'text',
              'x':scaleA(((Number(data[piRNA].firstPos)-1)%100+Number(seq))%100),
              'y':scaleY(axisPos[Math.floor((Number(data[piRNA].firstPos)-1)/100)+a]+Number(data[piRNA].stack)+1),
              // 'fill':'red',
              'style':'text-anchor: middle',
              'transform':'translate(40,0)',       
            });
        }
        else if((posOfMis.indexOf(21-Number(seq))!=-1) && (posOfMisxGU.indexOf(21-Number(seq))==-1)){
          svg.append('rect').attr({
            'id':data[piRNA].piRNA,
            'x':scaleA(((Number(data[piRNA].firstPos)-1)%100+Number(seq))%100),
            'y':scaleY(axisPos[Math.floor((Number(data[piRNA].firstPos)-1)/100)+a]+Number(data[piRNA].stack)),
            'width':'15', 
            'height':'15',
            'transform':'translate(32.5,4)',
            'fill':'lightblue'
          });
          svg.append('text')
            .text(data[piRNA].detail[seq])
            .attr({
            'class':'text',
            'x':scaleA(((Number(data[piRNA].firstPos)-1)%100+Number(seq))%100),
            'y':scaleY(axisPos[Math.floor((Number(data[piRNA].firstPos)-1)/100)+a]+Number(data[piRNA].stack)+1),
            // 'fill':'green',
            // 'stroke': 'blue',
            // 'stroke-width':"10", 
            'style':'text-anchor: middle',
            'transform':'translate(40,0)',       
            });
        }
        else{
          svg.append('text')
            .text(data[piRNA].detail[seq])
            .attr({
            'id':data[piRNA].piRNA,
            'class':'text',
            'x':scaleA(((Number(data[piRNA].firstPos)-1)%100+Number(seq))%100),
            'y':scaleY(axisPos[Math.floor((Number(data[piRNA].firstPos)-1)/100)+a]+Number(data[piRNA].stack)+1),
            'style':'text-anchor: middle',
            'transform':'translate(40,0)',       
            });
          svg.append('rect').attr({
            'id':data[piRNA].piRNA,
            'x':scaleA(((Number(data[piRNA].firstPos)-1)%100+Number(seq))%100),
            'y':scaleY(axisPos[Math.floor((Number(data[piRNA].firstPos)-1)/100)+a]+Number(data[piRNA].stack)),
            'width':'15', 
            'height':'15',
            'transform':'translate(32.5,4)',
            'opacity': 0,
          });
        }
        if(seq==13 || seq==19){
          svg.append('text')
          .text("|")
          .attr({
          'class':'text',
          'x':scaleA((((Number(data[piRNA].firstPos)-1)%100+Number(seq))%100)+0.5),
          'y':scaleY(axisPos[Math.floor((Number(data[piRNA].firstPos)-1)/100)+a]+Number(data[piRNA].stack)+1),
          'fill':'red', 
          'style':'text-anchor: middle;font-family:Arial;',
          'transform':'translate(40,-1)',       
          });
        }
      }
      if(over!=0){
        svg.append('rect').attr({
          'id':data[piRNA].piRNA,
          'pos':data[piRNA].firstPos,
          'x':scaleA(((Number(data[piRNA].firstPos)-1)%100)%100),
          'y':scaleY(axisPos[Math.floor((Number(data[piRNA].firstPos)-1)/100)]+Number(data[piRNA].stack)),
          'width':scaleA(100-((Number(data[piRNA].firstPos)-1)%100)), 
          'height':'15',
          'transform':'translate(32.5,4)',
          'fill':'red',
          'opacity': 0,
        }).on("mouseover", function(d) {
                var gettt = 'piRNA : ' + $(this).attr('id') + '<br>' + 'region : ' + $(this).attr('pos')
                            + ' ~ ' + (parseInt($(this).attr('pos'))+20);   
                div.transition()    
                  .duration(1)    
                  .style("opacity", 1)
                  .style("visibility", "visible");
                div.html(gettt);
                  // .style("left", (d3.event.pageX) + "px")   
                  // .style("top", (d3.event.pageY - 28) + "px");
            })
            .on("mousemove", function(){
              return div.style("top", (event.pageY+20)+"px").style("left",(event.pageX+10)+"px");
            })
            .on("mouseout", function(d) {   
                 div.transition()        
                  .style("visibility", "hidden"); 
            });
        svg.append('rect').attr({
          'id':data[piRNA].piRNA,
          'pos':data[piRNA].firstPos,
          'x':scaleA(0),
          'y':scaleY(axisPos[Math.floor((Number(data[piRNA].firstPos)-1)/100)+1]+Number(data[piRNA].stack)),
          'width':scaleA((Number(data[piRNA].firstPos)+20)%100), 
          'height':'15',
          'transform':'translate(32.5,4)',
          'fill':'red',
          'opacity': 0,
        }).on("mouseover", function(d) {
                var gettt = 'piRNA : ' + $(this).attr('id') + '<br>' + 'region : ' + $(this).attr('pos')
                            + ' ~ ' + (parseInt($(this).attr('pos'))+20);   
                div.transition()    
                  .duration(1)    
                  .style("opacity", 1)
                  .style("visibility", "visible");
                div.html(gettt);
                  // .style("left", (d3.event.pageX) + "px")   
                  // .style("top", (d3.event.pageY - 28) + "px");
            })
            .on("mousemove", function(){
              return div.style("top", (event.pageY+20)+"px").style("left",(event.pageX+10)+"px");
            })
            .on("mouseout", function(d) {   
                 div.transition()    
                  .style("visibility", "hidden"); 
            });
      }
      else{
        svg.append('rect').attr({
          'id':data[piRNA].piRNA,
          'pos':data[piRNA].firstPos,
          'x':scaleA((Number(data[piRNA].firstPos)-1)%100),
          'y':scaleY(axisPos[Math.floor((Number(data[piRNA].firstPos)-1)/100)]+Number(data[piRNA].stack)),
          'width':'340', 
          'height':'15',
          'transform':'translate(32.5,4)',
          'fill':'red',
          'opacity': 0,
        }).on("mouseover", function(d) {
                var gettt = 'piRNA : ' + $(this).attr('id') + '<br>' + 'region : ' + $(this).attr('pos')
                            + ' ~ ' + (parseInt($(this).attr('pos'))+20);   
                div.transition()
                  .duration(1)
                  .style("opacity", 1)      
                  .style("visibility", "visible");
                div.html(gettt);
                  // .style("left", (d3.event.pageX) + "px")   
                  // .style("top", (d3.event.pageY - 28) + "px");
            })
            .on("mousemove", function(){
              return div.style("top", (event.pageY+20)+"px").style("left",(event.pageX+10)+"px");
            })
            .on("mouseout", function(d) {   
                 div.transition()        
                  .style("visibility", "hidden"); 
            });
      }
    }
  }
};