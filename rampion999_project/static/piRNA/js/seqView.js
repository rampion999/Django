function seqView(divId,mRNA,data,CDS,CDS_1,CDS_2,divWidth){
  var mRNAlen = mRNA.length;
  var exceptHeight = 3;  //預估piRNA行數
  for (key in data[0].most){
    // if(data[0].most[key]<=3){exceptHeight+=7;}
    // else{exceptHeight+=(data[0].most[key]+5);}
    if(data[0].most[key]!=0){
      exceptHeight+=data[0].most[key]+3;
      /*****************CDS@預估高度*******************/
      if(100*Number(key) >= Math.floor((CDS_1-1)/100) && 100*Number(key) <= Math.floor((CDS_2-1)/100)){
        exceptHeight +=2;
      }
      /*****************CDS@預估高度*******************/
    }
  }
  // exceptHeight += (Math.floor((CDS_2-1)/100) - Math.floor((CDS_1-1)/100))*2;
  var div = d3.select("body").append("div") 
    .attr("class", "tooltip")       
    .style("opacity", 0);

  // console.log("exceptHeight :"+(Math.floor(mRNAlen/100)+1));
  var width = divWidth;
  var height = (2.5*(Math.floor(mRNAlen/100)+1)+exceptHeight)*17.5; //坐標軸行數加上預估piRNA行數乘每單位高
  // console.log(height);
  var scaleY = d3.scale.linear()
        .range([0, height])
        .domain([0, height/17.5]);

  // var svg = d3.select("#seqView")
  //   .append("div")
  //   .classed("svg-container", true) //container class to make it responsive
  //   .append("svg")
  //   //responsive SVG needs these 2 attributes and no width and height attr
  //   .attr("preserveAspectRatio", "xMinYMin meet")
  //   .attr("viewBox", "0 0 1700 "+String(height))
  //   //class to make it responsive
  //   .classed("svg-content-responsive", true); 


  var svg = d3.select('#'+divId+'-seqView').attr({
      'width': width,
      'height': height
    });
  
  var y=3;
  var axisPos = [3];
  var scaleA = d3.scale.linear()
        .range([0, (width-100)])
        .domain([0, 99]);
  
  for (var i = 0; i <= Math.floor((mRNAlen-1)/100); i++) {
    // console.log((mRNAlen/100)-1);
    if(i > Math.floor(mRNAlen/100)-1 && mRNAlen%100!=1){
      var scaleX = d3.scale.linear()
        .range([0, ((width-100)/99)*((mRNAlen-1)%100)])
        .domain([100*i, mRNAlen-1])
      var tick = (mRNAlen%100)-1;
      svg.append('text').attr({
        'x':scaleA(tick+1.5),
        'y':scaleY(axisPos[i]),
        // 'fill':'red',
        'style':'text-anchor: middle',
        'transform':'translate(40,0)',       
        }).text(mRNAlen);
      // console.log(tick);
    }
    else if(i > Math.floor(mRNAlen/100)-1 && mRNAlen%100==1){
      var scaleX = d3.scale.linear()
        .range([0, ((width-100)/99)*((mRNAlen-1)%100)])
        .domain([100*i, mRNAlen-1])
      var tick = (mRNAlen%100)-1;
      svg.append('text').attr({
        'x':scaleA(0),
        'y':scaleY(axisPos[i]-0.5),
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
        .range([0, (width-100)])
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
    /*****************坐標軸預始位置***************************************/




       /*****************坐標軸預始位置(CDS@部分)*******************/
    if(i>=(Math.floor((CDS_1-1)/100))-1 && (i<Math.floor((CDS_2-1)/100)) && (data[0].most[i+1]!=0 && data[0].most[i+1]!=undefined)){
          y+=2;
          // console.log(i);
        }
        /*****************坐標軸預始位置(CDS@部分)*******************/




    if (data[0].most[i] == undefined){y+=2;axisPos[i+1] = y;}
    else{
      var big = Number(data[0].most[i]);
      // if(big<=3 && big !=0){y+=5;axisPos[i+1] = y;}
      if(big ==0){y+=2;axisPos[i+1] = y;}
      else{y+=(big+4);axisPos[i+1] = y;}
    }   
  }



  // console.log(axisPos);
    /*****************坐標軸預始位置***************************************/



    /***********************CDS@圖************************/

  // console.log(CDS);
  if(CDS_1!='' && CDS_2!=''){
    for(var mis in data){

      /***********************判斷需要比掃到的piRNA往前多少，要列出幾個CDS******************************/
      if(data[mis].firstPos!=undefined && CDS_1-data[mis].firstPos<=20 && CDS_2-data[mis].firstPos>=0 ){
        //掃到的piRNA首位跟CDS_1比剛好是3的倍數，前置為0，CDS畫出21位
        if((data[mis].firstPos-CDS_1)%3==0 && data[mis].firstPos>=CDS_1 && CDS_2-data[mis].firstPos>=20){
          var front = 0;   
          var CDS_che = range(0,21)
        } 

        //掃到的piRNA首位比CDS_1前面，前置須在CDS1開始之後所以是負數，CDS畫出CDS_1之後到piRNA結束補滿3位數
        else if(data[mis].firstPos<CDS_1){
          var front = (data[mis].firstPos-CDS_1);          
          var CDS_che = range(0,21-(CDS_1-data[mis].firstPos)-(data[mis].firstPos-CDS_1)%3);
          }

        //掃到的piRNA位置會超過CDS_2，前置跟正常一樣，CDS畫出CDS_2跟piRNA首位的差距+1再加前置 
        else if(CDS_2-data[mis].firstPos<20){
          var front = (data[mis].firstPos-CDS_1)%3;
          var CDS_che = range(0,(CDS_2-data[mis].firstPos+1)+front);
        }
        //其餘正常情況，CDS畫出的位置一定是24
        else{var front = (data[mis].firstPos-CDS_1)%3;var CDS_che = range(0,24)}
      /***********************判斷需要比掃到的piRNA往前多少，要列出幾個CDS******************************/

        for (var CDS_seq in CDS_che){
          if ((Number(CDS_seq)+1)%3 == 1){
            svg.append('line').attr({
            x1: scaleA((data[mis].firstPos-front-1+Number(CDS_seq))%100),
            y1: scaleY(axisPos[Math.floor((data[mis].firstPos-front-1+Number(CDS_seq))/100)]-1.2),
            x2: scaleA((data[mis].firstPos-front-1+Number(CDS_seq))%100),
            y2: scaleY(axisPos[Math.floor((data[mis].firstPos-front-1+Number(CDS_seq))/100)]-1.8),
            'transform':'translate(40,0)',
           }).style({
             stroke: 'green',
            'stroke-width': 2
            });
            svg.append('line').attr({
            x1: scaleA((data[mis].firstPos-front-1+Number(CDS_seq))%100),
            y1: scaleY(axisPos[Math.floor((data[mis].firstPos-front-1+Number(CDS_seq))/100)]-1.8),
            x2: scaleA((data[mis].firstPos-front-1+Number(CDS_seq))%100+0.5),
            y2: scaleY(axisPos[Math.floor((data[mis].firstPos-front-1+Number(CDS_seq))/100)]-1.8),
            'transform':'translate(40,0)',
           }).style({
             stroke: 'green',
            'stroke-width': 2
            });
          }
          else if((Number(CDS_seq)+1)%3 == 2){
            svg.append('line').attr({
            x1: scaleA((data[mis].firstPos-front-1+Number(CDS_seq))%100-0.5),
            y1: scaleY(axisPos[Math.floor((data[mis].firstPos-front-1+Number(CDS_seq))/100)]-1.8),
            x2: scaleA((data[mis].firstPos-front-1+Number(CDS_seq))%100+0.5),
            y2: scaleY(axisPos[Math.floor((data[mis].firstPos-front-1+Number(CDS_seq))/100)]-1.8),
            'transform':'translate(40,0)',
           }).style({
             stroke: 'green',
            'stroke-width': 2
            });
            svg.append('text').attr({
              'x':scaleA((data[mis].firstPos-front-1+Number(CDS_seq))%100),
              'y':scaleY(axisPos[Math.floor((data[mis].firstPos-front-1+Number(CDS_seq))/100)]-2),
              // 'fill':'red',
              'style':'text-anchor: middle; font-size: 15px',
              'transform':'translate(40,0)',       
              }).text(CDS[data[mis].firstPos-front-CDS_1+Number(CDS_seq)-1]);
          }
          else {
           svg.append('line').attr({
            x1: scaleA((data[mis].firstPos-front-1+Number(CDS_seq))%100-0.5),
            y1: scaleY(axisPos[Math.floor((data[mis].firstPos-front-1+Number(CDS_seq))/100)]-1.8),
            x2: scaleA((data[mis].firstPos-front-1+Number(CDS_seq))%100),
            y2: scaleY(axisPos[Math.floor((data[mis].firstPos-front-1+Number(CDS_seq))/100)]-1.8),
            'transform':'translate(40,0)',
           }).style({
             stroke: 'green',
            'stroke-width': 2
            });
            svg.append('line').attr({
            x1: scaleA((data[mis].firstPos-front-1+Number(CDS_seq))%100),
            y1: scaleY(axisPos[Math.floor((data[mis].firstPos-front-1+Number(CDS_seq))/100)]-1.8),
            x2: scaleA((data[mis].firstPos-front-1+Number(CDS_seq))%100),
            y2: scaleY(axisPos[Math.floor((data[mis].firstPos-front-1+Number(CDS_seq))/100)]-1.2),
            'transform':'translate(40,0)',
           }).style({
             stroke: 'green',
            'stroke-width': 2
            });
          }
        }
      } 
    }
  }


          /***********************CDS************************/


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
          if(Number(seq)==20){
            svg.append('rect').attr({
            'id':data[piRNA].piRNA,
            'x':scaleA(((Number(data[piRNA].firstPos)-1)%100+Number(seq))%100),
            'y':scaleY(axisPos[Math.floor((Number(data[piRNA].firstPos)-1)/100)+a]+Number(data[piRNA].stack)),
            'width':'15', 
            'height':'15',
            'transform':'translate(32.5,4)',
            'fill':'lightgreen'
            });
          }
          else{
            svg.append('rect').attr({
            'id':data[piRNA].piRNA,
            'x':scaleA(((Number(data[piRNA].firstPos)-1)%100+Number(seq))%100),
            'y':scaleY(axisPos[Math.floor((Number(data[piRNA].firstPos)-1)/100)+a]+Number(data[piRNA].stack)),
            'width':'15', 
            'height':'15',
            'transform':'translate(32.5,4)',
            'fill':'yellow'
          });
          }
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
          if(Number(seq)==20){
            svg.append('rect').attr({
            'id':data[piRNA].piRNA,
            'x':scaleA(((Number(data[piRNA].firstPos)-1)%100+Number(seq))%100),
            'y':scaleY(axisPos[Math.floor((Number(data[piRNA].firstPos)-1)/100)+a]+Number(data[piRNA].stack)),
            'width':'15', 
            'height':'15',
            'transform':'translate(32.5,4)',
            'fill':'lightgreen'
            });
          }
          else{
            svg.append('rect').attr({
              'id':data[piRNA].piRNA,
              'x':scaleA(((Number(data[piRNA].firstPos)-1)%100+Number(seq))%100),
              'y':scaleY(axisPos[Math.floor((Number(data[piRNA].firstPos)-1)/100)+a]+Number(data[piRNA].stack)),
              'width':'15', 
              'height':'15',
              'transform':'translate(32.5,4)',
              'fill':'lightblue'
            });
          }
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
                var gettt = 'piRNA name: ' + $(this).attr('id') + '<br>' + 'positions: ' + $(this).attr('pos')
                            + ' - ' + (parseInt($(this).attr('pos'))+20);   
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
                var gettt = 'piRNA name: ' + $(this).attr('id') + '<br>' + 'positions: ' + $(this).attr('pos')
                            + ' - ' + (parseInt($(this).attr('pos'))+20);   
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
                var gettt = 'piRNA name: ' + $(this).attr('id') + '<br>' + 'positions: ' + $(this).attr('pos')
                            + ' - ' + (parseInt($(this).attr('pos'))+20);   
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