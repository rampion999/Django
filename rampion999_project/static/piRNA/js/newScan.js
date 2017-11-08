function newScan(input,pic2src,modifyCount,scanUrl){
  swal.queue([{
  title : 'Scanning',
  imageUrl: scanUrl,
  disableButtons: true,
  showConfirmButton: false,
  allowOutsideClick : false,
  }]);
  start = new Date().getTime();
      $.ajax({
        url: "scanOperation/", 
        data:{ 
          data1:'>'+input.name+'\n'+input.gene,
          opt1:$('#opt1_'+modifyCount).val(),
          opt2:$('#opt2_'+modifyCount).val(),
          opt3:$('#opt3_'+modifyCount).val(),
          opt4:$('#opt4_'+modifyCount).val(),
          opt5:$('#opt5_'+modifyCount).val(),
          nematodeType:$('#nematodeType_'+modifyCount).val(),
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
              $('#modify_'+modifyCount+'-tab').html($('#modify_'+modifyCount+'-tab').html()+' <span class="badge badge-success">Success</span>');
              $('#modify_'+modifyCount+'-Result').empty(); 
              $('#modify_'+modifyCount+'-Result').append('\
                <div class="jumbotron jumbotron-fluid">\
                  <div class="container">\
                    <h1 class="display-3">Congratulations!!</h1>\
                    <p class="lead">There is no targeted site on your new gene sequence.</p>\
                  </div>\
                </div>\
              ')
            }
            else{
              $('#modify_'+modifyCount+'-tab').html($('#modify_'+modifyCount+'-tab').html()+' <span class="badge badge-danger">Fail</span>');
              $('#modify_'+modifyCount+'-Result').empty(); 
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
            $('html, body').animate({scrollTop: '0px'}, 300);
            swal.close();
          }
        },
      })
} 