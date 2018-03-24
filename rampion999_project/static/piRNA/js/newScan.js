function newScan(input,pic2src,modifyCount,scanUrl,userNum,oldSeqViewDataArr,loadPic){
  swal.queue([{
  title : 'Scanning...',
  text: "Running time : 0 sec",
  imageUrl: scanUrl,
  disableButtons: true,
  showConfirmButton: false,
  allowOutsideClick : false,
  }]);
  start = new Date().getTime();
  var clockTime = 1;
  var clock = setInterval(function(){
    $('#swal2-content').html('Running time : '+clockTime+' sec');
    clockTime++;
  }, 1050);
      if(input.CDS1 == 0){
        var QAQ1 = '';
        var QAQ2 = '';
      }
      else{
        var QAQ1 = input.CDS1;
        var QAQ2 = input.CDS2;
      }
      console.log(QAQ1);
      $.ajax({
        url: "scanOperation/", 
        data:{
          // data1:'>'+input.name+'\n'+input.gene,
          data1:input.gene,
          seqName:'Modified seq #'+modifyCount+' (from the original input seq: '+input.name+')',
          opt1:$('#opt1_'+modifyCount).val(),
          opt2:$('#opt2_'+modifyCount).val(),
          opt3:$('#opt3_'+modifyCount).val(),
          opt4:$('#opt4_'+modifyCount).val(),
          opt5:$('#opt5_'+modifyCount).val(),
          nematodeType:input.options['nematodeType'],
          CDS_1:QAQ1,
          CDS_2:QAQ2,
          operationTimes:modifyCount,
          userNum:userNum,
        },
        type: "POST", 
        dataType:'json',
        error: function(no){
          clearInterval(clock);
          console.log(no);
          swal(
            'Scan cancelled',
            'There have some problem. Please contact the developer',
            'error'
          )
          },
        success: function(data){
          swal.queue([{
              title : 'Loading scan result...',
              text: "It takes some time. Please wait a moment.",
              imageUrl: loadPic,
              disableButtons: true,
              showConfirmButton: false,
              allowOutsideClick : false,
              }]);
          clearInterval(clock);
          if(data.state=='nothing'){
            swal(
            'Scan cancelled',
            'The input area is empty. Please type something.',
            'error'
            )
          }
          else if(data.state=='formatX'){
            swal(
            'Scan cancelled',
            'The input sequence format is wrong!!<br>\
            Please check it and try again!!<br>\
            <br>Note!!<br>\
            DNAseq is compose of "A"."T"."C"."G"<br>\
            RNAseq is compose of "A"."U"."C"."G"',
            'error'
            )
          }
          else if(data.state=='notfasta'){
            swal(
            'Scan cancelled',
            'The input is not in fasta format',
            'error'
            )
          }
          else if(data.state=='CDSX'){
            swal(
            'Scan cancelled',
            'The input CDS regions have some problem',
            'error'
            )
          }
          else if(data.state=='nematode'){
            swal(
            'Scan cancelled',
            "Sorry, this part hasn't opened yet",
            'error'
            )
          }
          else if(data.newout.length > 100){
            swal(
              'Too many hits('+data.newout.length+' identified piRNA target sites)',
              'Use more strict rules or shorter sequence.',
              'error'
              )
          }
          else{
            if (data.newout.length == 0){              
              $.ajax({
                url:"sucData/",
                data:{
                  modifyCount:modifyCount,
                  geneName:data.name,
                  geneSeq:data.gene,
                  CDS1:data.CDS1,
                  CDS2:data.CDS2,
                  CDS_region:data.CDS_region,
                  a:data.options.core_non_GU,
                  b:data.options.core_GU,
                  c:data.options.non_core_non_GU,
                  d:data.options.non_core_GU,
                  e:data.options.total,
                  userNum:userNum,
                },
                type:"POST",
                dataType:"json",
                error:function(){
                  swal(
                    'Scan cancelled',
                    'sucData hava some trobles',
                    'error'
                  )
                },
                success:function(SCdata){
                  $('#modify_'+modifyCount+'-tab').html($('#modify_'+modifyCount+'-tab').html()+' <span class="badge badge-success">Success</span>');
                  $('#modify_'+modifyCount+'-Result').empty(); 
                  $('#modify_'+modifyCount+'-Result').append('\
                    <div class="alert alert-success" role="alert">\
                      <h2 class="alert-heading">Success!</h2>\
                      <p>No piRNA target site is found in the modified sequence.&nbsp;&nbsp;&nbsp;<a href="/piScan/Download/'+modifyCount+'/'+userNum+'" target="_blank"><button type="button" class="btn btn-info" style="border-color: black; padding-top: 4px; padding-bottom: 4px;"><img src="https://png.icons8.com/download/androidL/20/000000">  Download DNA/RNA sequence</button></a></p>\
                    </div>\
                  ');
                  var strVar = '<div class="card my-4 h-100 darkC">\
                              <h3 class="card-header darkCH">'+SCdata.selectedInfo.length+' selected changes in the input sequence</h3>\
                              <div id="selectedChange_'+modifyCount+'" class="card-body"></div>';              
                      strVar +='</div>';
                      strVar += '\
                        <div class="card mb-4 h-100 darkC">\
                          <h3 class="card-header darkCH">Modified sequence <button type="button" id="downloadModSeq'+modifyCount+'" class="btn btn-info" style="border-color: black; padding-top: 4px; padding-bottom: 4px;"><img src="https://png.icons8.com/download/androidL/20/000000">  Download modified seqView</button></h3>\
                          <div class="card-body text-dark text-center">\
                            <svg id="preSeqView-'+modifyCount+'"></svg>\
                          </div>\
                        </div>\
                      ';                   
                      strVar += '<div class="text-center"><a href="/piScan/Download/'+modifyCount+'/'+userNum+'" target="_blank"><button type="button" class="btn btn-info btn-lg" style="border-color: black; padding-top: 4px; padding-bottom: 4px;"><img src="https://png.icons8.com/download/androidL/20/000000">  Download DNA/RNA sequence</button></a></div>';

                  $('#modify_'+modifyCount+'-Result').append(strVar);
                  $('#downloadModSeq'+modifyCount).on('click',function(){
                    saveSvgAsPng(document.getElementById("preSeqView-"+modifyCount), "pre_modifySeqView_"+modifyCount+".png", {scale: 2, backgroundColor: "#FFFFFF"});
                  });

                  selectedTable('selectedChange_'+modifyCount,SCdata,modifyCount);
                  preSeqView('preSeqView-'+modifyCount,SCdata,$('#wrap').width()*0.85);
                  $(document).ready(function(){
                    $(window).resize(function() {
                      $('#preSeqView-'+modifyCount).empty();
                      preSeqView('preSeqView-'+modifyCount,SCdata,$('#wrap').width()*0.85);                                                                  
                    });
                    swal.close();
                  });

                }
              });

            }
            else{
              $.ajax({
                url:"failData/",
                data:{
                  modifyCount:modifyCount,
                  geneName:data.name,
                  geneSeq:data.gene,
                  CDS_region:data.CDS_region,
                  a:data.options.core_non_GU,
                  b:data.options.core_GU,
                  c:data.options.non_core_non_GU,
                  d:data.options.non_core_GU,
                  e:data.options.total,
                  CDS1:data.CDS1,
                  CDS2:data.CDS2,
                  userNum:userNum,
                },
                type:"POST",
                dataType:"json",
                error:function(){
                  swal(
                    'Scan cancelled',
                    'sucData hava some trobles',
                    'error'
                  )
                },
                success:function(SCdata){
                  console.log(userNum);
                  console.log(SCdata);                                  
                  $('#modify_'+modifyCount+'-tab').html($('#modify_'+modifyCount+'-tab').html()+' <span class="badge badge-danger">Fail</span>');
                  $('#modify_'+modifyCount+'-Result').empty();

                  $('#modify_'+modifyCount+'-Result').append('\
                    <div class="alert alert-danger" style="margin: 0px 15px;" role="alert">\
                      <h3 class="alert-heading">Fail!</h4>\
                      <p id="fail-alert-para-'+modifyCount+'">At least one piRNA target site is still found in the modified sequence. &nbsp;&nbsp;&nbsp;<a href="/piScan/Download/'+modifyCount+'/'+userNum+'" target="_blank"><button type="button" class="btn btn-info" style="border-color: black; padding-top: 4px; padding-bottom: 4px;"><img src="https://png.icons8.com/download/androidL/20/000000">  Download DNA/RNA sequence</button></a></p>\
                    </div>\
                  ');
                  var strVar = '<div class="card my-4 h-100 darkC" style="margin: 0px 15px;">\
                              <h4 class="card-header darkCH">'+SCdata.selectedInfo.length+' selected changes in the input sequence</h4>\
                              <div id="selectedChange_'+modifyCount+'" class="card-body"></div>';              
                      strVar +='</div></div>';               
                  $('#modify_'+modifyCount+'-Result').append(strVar);
                  var failPos = failSelectedTable('selectedChange_'+modifyCount,SCdata,modifyCount,data.newout,userNum);
                  modifyResultCreate('modify_'+modifyCount,modifyCount,userNum);
                  noBulgeData('modify_'+modifyCount,data,pic2src);
                  var geneArr = data.gene.split("");
                  var seqViewDataArr = seqView('modify_'+modifyCount,geneArr,data,data.CDS[0].split(''),data.CDS1,data.CDS2,$('#wrap').width()*0.775);
                  explain('modify_'+modifyCount,data.CDS1,data.CDS2,geneArr,$('#wrap').width()*0.9);
                  overView('modify_'+modifyCount,geneArr,seqViewDataArr,data.CDS1,data.CDS2,$('#wrap').width()*0.82,data.newout);                
                  $(document).ready(function(){
                    $(window).resize(function() {
                      $('#modify_'+modifyCount+'-overView').empty();
                      $('#modify_'+modifyCount+'-explain').empty();
                      explain('modify_'+modifyCount,data.CDS1,data.CDS2,geneArr,$('#wrap').width()*0.9);
                      overView('modify_'+modifyCount,geneArr,seqViewDataArr,data.CDS1,data.CDS2,$('#wrap').width()*0.82,data.newout);
                      $('#modify_'+modifyCount+'-seqView').empty();                      
                      seqView('modify_'+modifyCount,geneArr,data,data.CDS[0].split(''),data.CDS1,data.CDS2,$('#wrap').width()*0.775);                                          
                    });
                  });
                  var newSug = arrangeSug(SCdata.oldResult.suggestion);
                  noBulgeData('old',SCdata.oldResult,pic2src);
                  console.log(failPos);
                  shit(
                    'modify_'+modifyCount,
                    newSug.inCDS,
                    newSug.notInCDS,
                    SCdata.oldResult.options.core_non_GU,
                    SCdata.oldResult.options.core_GU,
                    SCdata.oldResult.options.non_core_non_GU,
                    SCdata.oldResult.options.non_core_GU,
                    SCdata.oldResult.options.total,
                    SCdata.oldResult.name,
                    SCdata.oldResult.gene,
                    SCdata.oldResult.options.nematodeType,
                    SCdata.oldResult.CDS1,
                    SCdata.oldResult.CDS2,
                    SCdata.oldResult.csrf,
                    SCdata.oldResult,
                    pic2src,
                    scanUrl,
                    oldSeqViewDataArr,
                    userNum,
                    oldSeqViewDataArr,
                  );

                  //創successful跟unsuccessful窗格
                  var unsuccessfulText = '<div class="alert alert-danger" id="unsuccessful_'+modifyCount+'" role="alert">'+
                              '  <h2 class="alert-heading">Unsuccessful modification:</h2>'+
                              '</div>';
                  var successfulText = '<br><br><div class="alert alert-success" id="successful_'+modifyCount+'" role="alert">'+
                              '  <h2 class="alert-heading">Successful modification:</h2>'+
                              '</div>';
                  $('#modify_'+modifyCount+'-sugTable > div.escape').after(unsuccessfulText);
                  $('#unsuccessful_'+modifyCount).after(successfulText);
                  var failDivNum = [];
                  for(var x in SCdata.posToDiv){
                    if(failPos.indexOf(Number(x)) != -1){
                      for(var i in SCdata.posToDiv[x]){
                        failDivNum.push(SCdata.posToDiv[x][i]);
                      }
                    }
                  }
                  for(var x in SCdata.picked){
                    // console.log('#modify_'+modifyCount+'-ck'+SCdata.picked[x]);
                    $('#modify_'+modifyCount+'-ck'+SCdata.picked[x]).prop('checked',true);
                  }
                  for(var i in SCdata.oldResult.newout){
                    // console.log(SCdata.posToDiv['0']);
                    // for(var x in failPos){
                    //   if(posToDiv[failPos[x]].indexOf(Number(i)) != -1){
                    //     $('#modify_'+modifyCount+'-sugPicTableDiv_'+i).appendTo('#unsuccessful_'+modifyCount);
                    //   }
                    // }
                    if(failDivNum.indexOf(Number(i)) != -1){
                      $('#modify_'+modifyCount+'-sugPicTableDiv_'+i).appendTo('#unsuccessful_'+modifyCount);
                    }
                    else{
                      $('#modify_'+modifyCount+'-sugPicTableDiv_'+i).appendTo('#successful_'+modifyCount);
                    }                    
                  }
                  if( $('#successful_'+modifyCount+' > div').length == 0){
                    $('#successful_'+modifyCount).remove();
                  }
                  $(document).ready(function(){
                    swal.close();
                  });
                }
              });               
            }

            $('html, body').animate({scrollTop: '0px'}, 300);            
          }
        },
      })
}


function failSelectedTable(divId,data,modifyCount,newOut,userNum){
  var tableText ='';
  var unsucArr = [];
  tableText += '<table class="table table-striped" id="changeTable_'+modifyCount+'">';
  tableText += '<thead><th scope="col">Design</th><th scope="col">Position</th><th scope="col">Change</th></thead><tbody></tbody></table>';
  $('#'+divId).append(tableText);
  var failSection = [];
  for(var y in newOut){
    var targetedArea = newOut[y][1].split('-');
    failSection.push([Number(targetedArea[0]),Number(targetedArea[1])]);
  }

  var tableTemp='';
  var failPos = [];
  for(var x in data.selectedInfo){
    var DCheck = '<span style="color: green;">Successful</span>';   
    for(var y in failSection){
      if(Number(failSection[y][0]) <= Number(data.selectedInfo[x][0]) && Number(failSection[y][1]) >= Number(data.selectedInfo[x][0])){
        DCheck = '<span style="color: red;">Unsuccessful</span>';
        failPos.push(Number(data.selectedInfo[x][0]));
        break;
      }
    }
    tableTemp += '<tr><th>'+DCheck+'</th><td class="mid">'+data.selectedInfo[x][0]+'</td><td class="mid">'+data.selectedInfo[x][1]+' → '+data.selectedInfo[x][2]+'</td></tr>';
  }
  var failPosStr = failPos.join();
  if(failPos.length == 1){
    $('#fail-alert-para-'+modifyCount).html('The design on position '+failPosStr+' is not successful. &nbsp;&nbsp;&nbsp;<a href="/piScan/Download/'+modifyCount+'/'+userNum+'" target="_blank"><button type="button" class="btn btn-info" style="border-color: black; padding-top: 4px; padding-bottom: 4px;"><img src="https://png.icons8.com/download/androidL/20/000000">  Download DNA/RNA sequence</button></a>');
  }
  else{
    $('#fail-alert-para-'+modifyCount).html('The design on positions '+failPosStr+' are not successful. &nbsp;&nbsp;&nbsp;<a href="/piScan/Download/'+modifyCount+'/'+userNum+'" target="_blank"><button type="button" class="btn btn-info" style="border-color: black; padding-top: 4px; padding-bottom: 4px;"><img src="https://png.icons8.com/download/androidL/20/000000">  Download DNA/RNA sequence</button></a>');
  }
  $('#changeTable_'+modifyCount).find('tbody').append(tableTemp);
  $(document).ready(function() {
    $('#changeTable_'+modifyCount).DataTable({
      "order": [[ 0, "desc" ]],
      "bLengthChange": false,
      "bInfo" : false,
      "iDisplayLength": 10,
      "searching": false,
    });
  });
  return failPos
}