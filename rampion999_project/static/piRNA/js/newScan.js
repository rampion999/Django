function newScan(input,pic2src,modifyCount,scanUrl){
  swal.queue([{
  title : 'Scanning...\nPlease wait for 15 seconds',
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
      $.ajax({
        url: "scanOperation/", 
        data:{ 
          data1:'>'+input.name+'\n'+input.gene,
          opt1:$('#opt1_'+modifyCount).val(),
          opt2:$('#opt2_'+modifyCount).val(),
          opt3:$('#opt3_'+modifyCount).val(),
          opt4:$('#opt4_'+modifyCount).val(),
          opt5:$('#opt5_'+modifyCount).val(),
          nematodeType:input.options['nematodeType'],
          CDS_1:$('#CDS_1_'+modifyCount).val(),
          CDS_2:$('#CDS_2_'+modifyCount).val(),
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
          clearInterval(clock);
          if(data.state=='nothing'){
            swal(
            'Scan cancelled',
            'The input aera is empty, please enter some sequence :)',
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
          else{
            console.log(data);
            if (data.newout.length == 0){
              $.ajax({
                url:"sucData/",
                data:{
                  modifyCount:modifyCount,
                  geneName:data.name,
                  geneSeq:data.gene,
                  CDS1:data.CDS1,
                  CDS2:data.CDS2,
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
                      <p >No piRNA target site is found in the modified sequence.</p>\
                    </div>\
                  ');
                  var strVar = '<div class="card my-4 h-100 darkC">\
                              <h3 class="card-header darkCH">Selected Changes in the Original Sequence</h3>\
                              <div id="selectedChange_'+modifyCount+'" class="card-body"></div>';              
                      strVar +='</div>';
                      strVar += '\
                        <div class="card mb-4 h-100 darkC">\
                          <h3 class="card-header darkCH">Modified sequence<a href="http://140.116.215.236/rampion999/Download/'+modifyCount+'" ><button type="button" class="btn btn-light float-right" style="padding-top: 4px; padding-bottom: 4px;"><img src="https://png.icons8.com/download/androidL/20/000000">  Download</button></a></h3>\
                          <div class="card-body text-dark text-center">\
                            <svg id="preSeqView-'+modifyCount+'"></svg>\
                          </div>\
                        </div>\
                      ';                   

                  $('#modify_'+modifyCount+'-Result').append(strVar);


                  selectedTable('selectedChange_'+modifyCount,SCdata,modifyCount);
                  preSeqView('preSeqView-'+modifyCount,SCdata);

                }
              });

            }
            else{
              $.ajax({
                url:"sucData/",
                data:{
                  modifyCount:modifyCount,
                  geneName:data.name,
                  geneSeq:data.gene,
                  CDS1:data.CDS1,
                  CDS2:data.CDS2,
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
                  $('#modify_'+modifyCount+'-tab').html($('#modify_'+modifyCount+'-tab').html()+' <span class="badge badge-danger">Fail</span>');
                  $('#modify_'+modifyCount+'-Result').empty();

                  $('#modify_'+modifyCount+'-Result').append('\
                    <div class="alert alert-danger" style="margin: 0px 15px;" role="alert">\
                      <h3 class="alert-heading">Fail!</h4>\
                      <p>At least one piRNA target site is still found in the modified sequence.</p>\
                    </div>\
                  ');
                  var strVar = '<div class="card my-4 h-100 darkC" style="margin: 0px 15px;">\
                              <h4 class="card-header darkCH">Selected Changes in the Original Sequence</h4>\
                              <div id="selectedChange_'+modifyCount+'" class="card-body"></div>';              
                      strVar +='</div></div>';               
                  $('#modify_'+modifyCount+'-Result').append(strVar);
                  selectedTable('selectedChange_'+modifyCount,SCdata,modifyCount);
                  modifyResultCreate('modify_'+modifyCount+'-Result',modifyCount);
                  var seqViewDataArr = noBulgeData('modify_'+modifyCount+'-Result',data,pic2src);
                  var geneArr = data.gene.split("");
                  overView('modify_'+modifyCount+'-Result',geneArr,seqViewDataArr,data.CDS1,data.CDS2);
                  seqView('modify_'+modifyCount+'-Result',geneArr,seqViewDataArr,data.CDS[0].split(''),data.CDS1,data.CDS2);
                  $('#modify_'+modifyCount+'-tab').click(function(){
                    $(document).ready(function(){
                      $('#modify_'+modifyCount+'-Result-charts-tab').tab('show');
                    });            
                  });
                }
              });
            }
            $('html, body').animate({scrollTop: '0px'}, 300);
            swal.close();
          }
        },
      })
} 