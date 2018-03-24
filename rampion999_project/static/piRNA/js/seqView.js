function seqView(divId,mRNA,scanData,CDS,CDS_1,CDS_2,divWidth){
  var trans_x = 60
  var fts=[];
  var seqViewDataArr = [];
  var firstlast = 0;
  var stackbig = [-200];
  var scaleXWidth = d3.scale.linear()
        .range([0, (divWidth-150)])
        .domain([0, 99]); 

  if (scaleXWidth(2)-scaleXWidth(1) <= 9){
    var lineUnit = 50;
  }
  else{
    var lineUnit = 100;
  }
  var y = lineUnit-1;
  var layer = 0;
  var most = [0];
  for(var key in scanData.newout){
    var first = 0;
    first = parseInt(scanData.newout[key][1].split('-')[0]);
    fts.push([first,parseInt(scanData.newout[key][1].split('-')[1]),scanData.newout[key][0]]);

    // var x = '#'+divId+'-test' + key;
    // item = item.replace(/<(.|\n)*?>/g, '');
    var QQQQ = scanData.newout[key][10].replace(/<(.|\n)*?>/g, '');
    // console.log(QQQQ);
    QQQQ = QQQQ.replace(/[\d '|]/g,'');
    var stack = 0;
    //目前的第一個位置比最上方的大21的話表示可以放回第一排，不然就要往下疊
    if (first-stackbig[0] > 21) {stack = 0;stackbig[0] = first;}
    else{ 
      stack++;
      //一層一層比如果有重疊就在往下                 
      while(true){
        if(first-stackbig[stack] > 21 || (stackbig[stack]==undefined)){
          stackbig[stack] = first;break;
        }
        else{stack++;}
      }
    }

    //陣列是從位置小的開始，會先計算出要算第幾排位置
    if (layer < Math.floor((first-1)/lineUnit)) {
      var x = layer;
      for (var i = 0; i < Math.floor((first-1)/lineUnit) - x; i++) {
        //y初始是99
        y+=lineUnit;
        layer++;
        //沒有被定義的部份給0
        if(most[layer]==undefined){most[layer]=0;}                   
      }
    }

    if(first-1<=y){
      if(most[layer]<stack+1){
        most[layer]=stack+1;                    
        if((first-1)%lineUnit > lineUnit-21){
          most[layer+1]=stack+1;
        }
      }
      else{
        if((first-1)%lineUnit > lineUnit-21){
          most[layer+1]=stack+1;
        }
      }
    }
    seqViewDataArr.push({
      piRNA : scanData.newout[key][0],
      firstPos : first,
      detail : QQQQ,
      posOfMis : scanData.newout[key][3].replace(/<(?:.|\n)*?>/gm, ''),
      posOfMisxGU : scanData.newout[key][4],
      stack : stack                 
    });
    firstlast = first;
  }
  seqViewDataArr.unshift({most:most});

  var data = seqViewDataArr;



  var mRNAlen = mRNA.length;
  var exceptHeight = 3;  //預估piRNA行數
  for (key in data[0].most){
    // if(data[0].most[key]<=3){exceptHeight+=7;}
    // else{exceptHeight+=(data[0].most[key]+5);}
    if(data[0].most[key]!=0){
      exceptHeight+=data[0].most[key]+3;
      /*****************CDS@預估高度*******************/
      if(lineUnit*Number(key) >= Math.floor((CDS_1-1)/lineUnit) && lineUnit*Number(key) <= Math.floor((CDS_2-1)/lineUnit)){
        exceptHeight +=2;
      }
      /*****************CDS@預估高度*******************/
    }
  }
  // exceptHeight += (Math.floor((CDS_2-1)/lineUnit) - Math.floor((CDS_1-1)/lineUnit))*2;
  var div = d3.select(".Pictooltip");

  // console.log("exceptHeight :"+(Math.floor(mRNAlen/lineUnit)+1));
  var width = divWidth+50;
  var height = (2.5*(Math.floor(mRNAlen/lineUnit)+1)+exceptHeight)*17.5; //坐標軸行數加上預估piRNA行數乘每單位高
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
      'height': height,
      'class':'mt-4'
    });
  
  var y=3;
  var axisPos = [3];
  var scaleA = d3.scale.linear()
        .range([0, (width-150)])
        .domain([0, lineUnit-1]);
  
  for (var i = 0; i <= Math.floor((mRNAlen-1)/lineUnit); i++) {
    // console.log((mRNAlen/lineUnit)-1);
    if(i > Math.floor(mRNAlen/lineUnit)-1 && mRNAlen%lineUnit!=1){
      var scaleX = d3.scale.linear()
        .range([0, ((width-150)/(lineUnit-1))*((mRNAlen-1)%lineUnit)])
        .domain([lineUnit*i, mRNAlen-1])
      var tick = (mRNAlen%lineUnit)-1;
      svg.append('text').attr({
        'x':scaleA(tick+1.5),
        'y':scaleY(axisPos[i]),
        // 'fill':'red',
        'style':'text-anchor: middle',
        'transform':'translate(75,0)',       
        }).text(mRNAlen);
      console.log(tick);
    }
    else if(i > Math.floor(mRNAlen/lineUnit)-1 && mRNAlen%lineUnit==1){
      var scaleX = d3.scale.linear()
        .range([0, ((width-150)/(lineUnit-1))*((mRNAlen-1)%lineUnit)])
        .domain([lineUnit*i, mRNAlen-1])
      var tick = (mRNAlen%lineUnit)-1;
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
        .range([0, (width-150)])
        .domain([lineUnit*i, lineUnit*(i+1)-1]);
      var tick = lineUnit;
      svg.append('text').attr({
        'x':scaleA(lineUnit+0.5),
        'y':scaleY(axisPos[i]),
        // 'fill':'red',
        'style':'text-anchor: middle',
        'transform':'translate(75,0)',       
        }).text(lineUnit*(i+1));
    }
    svg.append('text').attr({
        'x':scaleA(0),
        'y':scaleY(axisPos[i]),
        // 'fill':'red',
        'style':'text-anchor: middle',
        'transform':'translate(20,0)',       
        }).text(lineUnit*i+1);
    
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
        'transform':'translate('+trans_x+','+scaleY(y)+')' 
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
    if(i>=(Math.floor((CDS_1-1)/lineUnit))-1 && (i<Math.floor((CDS_2-1)/lineUnit)) && (data[0].most[i+1]!=0 && data[0].most[i+1]!=undefined)){
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

        else if((data[mis].firstPos-CDS_1)%3==1 && data[mis].firstPos>=CDS_1 && CDS_2-data[mis].firstPos>=20){
          var front = 1;   
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
            x1: scaleA((data[mis].firstPos-front-1+Number(CDS_seq))%lineUnit),
            y1: scaleY(axisPos[Math.floor((data[mis].firstPos-front-1+Number(CDS_seq))/lineUnit)]-1.2),
            x2: scaleA((data[mis].firstPos-front-1+Number(CDS_seq))%lineUnit),
            y2: scaleY(axisPos[Math.floor((data[mis].firstPos-front-1+Number(CDS_seq))/lineUnit)]-1.8),
            'transform':'translate('+trans_x+',0)',
           }).style({
             stroke: 'green',
            'stroke-width': 2
            });
            svg.append('line').attr({
            x1: scaleA((data[mis].firstPos-front-1+Number(CDS_seq))%lineUnit),
            y1: scaleY(axisPos[Math.floor((data[mis].firstPos-front-1+Number(CDS_seq))/lineUnit)]-1.8),
            x2: scaleA((data[mis].firstPos-front-1+Number(CDS_seq))%lineUnit+0.5),
            y2: scaleY(axisPos[Math.floor((data[mis].firstPos-front-1+Number(CDS_seq))/lineUnit)]-1.8),
            'transform':'translate('+trans_x+',0)',
           }).style({
             stroke: 'green',
            'stroke-width': 2
            });
          }
          else if((Number(CDS_seq)+1)%3 == 2){
            svg.append('line').attr({
            x1: scaleA((data[mis].firstPos-front-1+Number(CDS_seq))%lineUnit-0.5),
            y1: scaleY(axisPos[Math.floor((data[mis].firstPos-front-1+Number(CDS_seq))/lineUnit)]-1.8),
            x2: scaleA((data[mis].firstPos-front-1+Number(CDS_seq))%lineUnit+0.5),
            y2: scaleY(axisPos[Math.floor((data[mis].firstPos-front-1+Number(CDS_seq))/lineUnit)]-1.8),
            'transform':'translate('+trans_x+',0)',
           }).style({
             stroke: 'green',
            'stroke-width': 2
            });
            svg.append('text').attr({
              'x':scaleA((data[mis].firstPos-front-1+Number(CDS_seq))%lineUnit),
              'y':scaleY(axisPos[Math.floor((data[mis].firstPos-front-1+Number(CDS_seq))/lineUnit)]-2),
              // 'fill':'red',
              'style':'text-anchor: middle; font-size: 15px',
              'transform':'translate('+trans_x+',0)',       
              }).text(CDS[data[mis].firstPos-front-CDS_1+Number(CDS_seq)-1]);
          }
          else {
           svg.append('line').attr({
            x1: scaleA((data[mis].firstPos-front-1+Number(CDS_seq))%lineUnit-0.5),
            y1: scaleY(axisPos[Math.floor((data[mis].firstPos-front-1+Number(CDS_seq))/lineUnit)]-1.8),
            x2: scaleA((data[mis].firstPos-front-1+Number(CDS_seq))%lineUnit),
            y2: scaleY(axisPos[Math.floor((data[mis].firstPos-front-1+Number(CDS_seq))/lineUnit)]-1.8),
            'transform':'translate('+trans_x+',0)',
           }).style({
             stroke: 'green',
            'stroke-width': 2
            });
            svg.append('line').attr({
            x1: scaleA((data[mis].firstPos-front-1+Number(CDS_seq))%lineUnit),
            y1: scaleY(axisPos[Math.floor((data[mis].firstPos-front-1+Number(CDS_seq))/lineUnit)]-1.8),
            x2: scaleA((data[mis].firstPos-front-1+Number(CDS_seq))%lineUnit),
            y2: scaleY(axisPos[Math.floor((data[mis].firstPos-front-1+Number(CDS_seq))/lineUnit)]-1.2),
            'transform':'translate('+trans_x+',0)',
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
  // console.log(data);
  for (var piRNA in data){
    if(Number(piRNA)!=0){
      // console.log(piRNA);
      var posOfMis = data[piRNA].posOfMis.split(',').map(Number);
      var posOfMisxGU = data[piRNA].posOfMisxGU.split(',').map(Number);
      var over = 0;
      
      if((Number(data[piRNA].firstPos)-1)%lineUnit > (lineUnit-21)){over = (Number(data[piRNA].firstPos)-1)%lineUnit - (lineUnit-21);}
      else{over = 0;}
      for(var seq in data[piRNA].detail){
        var a = 0; 
        if(21-Number(seq) <= over){a = 1;}
        else{a = 0;}
        // console.log(Number(data[piRNA].firstPos)%lineUnit+Number(seq));
        if((posOfMis.indexOf(21-Number(seq))!=-1) && (posOfMisxGU.indexOf(21-Number(seq))!=-1)){
          // console.log((Number(data[piRNA].firstPos)%lineUnit+Number(seq)-1)%lineUnit);
          if(Number(seq)==20){
            svg.append('rect').attr({
            'id':data[piRNA].piRNA,
            'x':scaleA(((Number(data[piRNA].firstPos)-1)%lineUnit+Number(seq))%lineUnit),
            'y':scaleY(axisPos[Math.floor((Number(data[piRNA].firstPos)-1)/lineUnit)+a]+Number(data[piRNA].stack)),
            'width':'12.5', 
            'height':'15',
            'transform':'translate('+(trans_x-6)+',4)',
            'fill':'lightgreen'
            });
          }
          else{
            svg.append('rect').attr({
            'id':data[piRNA].piRNA,
            'x':scaleA(((Number(data[piRNA].firstPos)-1)%lineUnit+Number(seq))%lineUnit),
            'y':scaleY(axisPos[Math.floor((Number(data[piRNA].firstPos)-1)/lineUnit)+a]+Number(data[piRNA].stack)),
            'width':'12.5', 
            'height':'15',
            'transform':'translate('+(trans_x-6)+',4)',
            'fill':'yellow'
          });
          }
          svg.append('text')
            .text(data[piRNA].detail[seq])
            .data(data)
            .attr({              
              'class':'text',
              'x':scaleA(((Number(data[piRNA].firstPos)-1)%lineUnit+Number(seq))%lineUnit),
              'y':scaleY(axisPos[Math.floor((Number(data[piRNA].firstPos)-1)/lineUnit)+a]+Number(data[piRNA].stack)+1),
              // 'fill':'red',
              'style':'text-anchor: middle',
              'transform':'translate('+trans_x+',0)',       
            });
        }
        else if((posOfMis.indexOf(21-Number(seq))!=-1) && (posOfMisxGU.indexOf(21-Number(seq))==-1)){
          if(Number(seq)==20){
            svg.append('rect').attr({
            'id':data[piRNA].piRNA,
            'x':scaleA(((Number(data[piRNA].firstPos)-1)%lineUnit+Number(seq))%lineUnit),
            'y':scaleY(axisPos[Math.floor((Number(data[piRNA].firstPos)-1)/lineUnit)+a]+Number(data[piRNA].stack)),
            'width':'12.5', 
            'height':'15',
            'transform':'translate('+(trans_x-6)+',4)',
            'fill':'lightgreen'
            });
          }
          else{
            svg.append('rect').attr({
              'id':data[piRNA].piRNA,
              'x':scaleA(((Number(data[piRNA].firstPos)-1)%lineUnit+Number(seq))%lineUnit),
              'y':scaleY(axisPos[Math.floor((Number(data[piRNA].firstPos)-1)/lineUnit)+a]+Number(data[piRNA].stack)),
              'width':'12.5', 
              'height':'15',
              'transform':'translate('+(trans_x-6)+',4)',
              'fill':'lightblue'
            });
          }

          svg.append('text')
            .text(data[piRNA].detail[seq])
            .attr({
            'class':'text',
            'x':scaleA(((Number(data[piRNA].firstPos)-1)%lineUnit+Number(seq))%lineUnit),
            'y':scaleY(axisPos[Math.floor((Number(data[piRNA].firstPos)-1)/lineUnit)+a]+Number(data[piRNA].stack)+1),
            // 'fill':'green',
            // 'stroke': 'blue',
            // 'stroke-width':"10", 
            'style':'text-anchor: middle',
            'transform':'translate('+trans_x+',0)',       
            });
        }
        else{
          svg.append('text')
            .text(data[piRNA].detail[seq])
            .attr({
            'id':data[piRNA].piRNA,
            'class':'text',
            'x':scaleA(((Number(data[piRNA].firstPos)-1)%lineUnit+Number(seq))%lineUnit),
            'y':scaleY(axisPos[Math.floor((Number(data[piRNA].firstPos)-1)/lineUnit)+a]+Number(data[piRNA].stack)+1),
            'style':'text-anchor: middle',
            'transform':'translate('+trans_x+',0)',       
            });
          svg.append('rect').attr({
            'id':data[piRNA].piRNA,
            'x':scaleA(((Number(data[piRNA].firstPos)-1)%lineUnit+Number(seq))%lineUnit),
            'y':scaleY(axisPos[Math.floor((Number(data[piRNA].firstPos)-1)/lineUnit)+a]+Number(data[piRNA].stack)),
            'width':'12.5', 
            'height':'15',
            'transform':'translate('+(trans_x-6)+',4)',
            'opacity': 0,
          });
        }
        if(seq==13 || seq==19){
          svg.append('text')
          .text("|")
          .attr({
          'class':'text',
          'x':scaleA((((Number(data[piRNA].firstPos)-1)%lineUnit+Number(seq))%lineUnit)+0.5),
          'y':scaleY(axisPos[Math.floor((Number(data[piRNA].firstPos)-1)/lineUnit)+a]+Number(data[piRNA].stack)+1),
          'fill':'red', 
          'style':'text-anchor: middle;font-family:Arial;',
          'transform':'translate('+trans_x+',-1)',       
          });
        }
      }
      if(over!=0){
        svg.append('rect').attr({
          'id':data[piRNA].piRNA,
          'pos':data[piRNA].firstPos,
          'x':scaleA(((Number(data[piRNA].firstPos)-1)%lineUnit)%lineUnit),
          'y':scaleY(axisPos[Math.floor((Number(data[piRNA].firstPos)-1)/lineUnit)]+Number(data[piRNA].stack)),
          'width':scaleA(lineUnit-((Number(data[piRNA].firstPos)-1)%lineUnit)), 
          'height':'15',
          'transform':'translate('+(trans_x-6)+',4)',
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
          'y':scaleY(axisPos[Math.floor((Number(data[piRNA].firstPos)-1)/lineUnit)+1]+Number(data[piRNA].stack)),
          'width':scaleA((Number(data[piRNA].firstPos)+20)%lineUnit), 
          'height':'15',
          'transform':'translate('+(trans_x-6)+',4)',
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
          'x':scaleA((Number(data[piRNA].firstPos)-1)%lineUnit),
          'y':scaleY(axisPos[Math.floor((Number(data[piRNA].firstPos)-1)/lineUnit)]+Number(data[piRNA].stack)),
          'width':'340', 
          'height':'15',
          'transform':'translate('+(trans_x-6)+',4)',
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
  return seqViewDataArr
};