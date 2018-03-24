var CDS_switch = 0;
var CDS_ex1 = '';
var CDS_ex2 = '';
$(document).ready(function(){
  // CDS選像控制
  $('input[type="radio"]').click(function() {
    if($(this).attr('id') == 'CDST2') {
      $('.CDS').prop('disabled',false); 
      $('#CDS_1').val(CDS_ex1);
      $('#CDS_2').val(CDS_ex2);         
    }
    else {
      $('.CDS').prop('disabled',true);
      $('#CDS_1').val('');
      $('#CDS_2').val('');
    }
  });

  $("#reset_to_default").click(function(){
    $("#opt1").val("0");
    $("#opt2").val("2");
    $("#opt3").val("2");
    $("#opt4").val("3");
    $("#opt5").val("6");
    // if(CDS_switch==1){
    //   $('#CDS_1').val(CDS_ex1);
    //   $('#CDS_2').val(CDS_ex2);
    // }
  });
  $("#reset_to_default,#TransformBTN").mouseout(function(){
    $(this).blur();
  });
  $("#example").click(function(){
    $('#CDST1').trigger('click');
    // $('#overView,#seqView,#div_name3,#div_name').empty();
    $("#gene").val("atgagtaaaggagaagaacttttcactggagttgtcccaattcttgttgaattagatggtgatgttaatgggcacaaattttctgtcagtggagagggtgaaggtgatgcaacatacggaaaacttacccttaaatttatttgcactactggaaaactacctgttccatggccaacacttgtcactactctcacttatggtgttcaatgcttctcgagatacccagatcatatgaaacagcatgactttttcaagagtgccatgcccgaaggttatgtacaggaaagaactatatttttcaaagatgacgggaactacaagacacgtgctgaagtcaagtttgaaggtgatacccttgttaatagaatcgagttaaaaggtattgattttaaagaagatggaaacattcttggacacaaattggaatacaactataactcacacaatgtatacatcatggcagacaaacaaaagaatggaatcaaagttaacttcaaaattagacacaacattgaagatggaagcgttcaactagcagaccattatcaacaaaatactccaattggcgatggccctgtccttttaccagacaaccattacctgtccacacaatctgccctttcgaaagatcccaacgaaaagagagaccacatggtccttcttgagtttgtaacagctgctgggattacacatggcatggatgaactatacaaatag");
    $('#seqName').val('gfp');
    CDS_ex1='';
    CDS_ex2='';
    CDS_switch=1;

  });
  $("#example2").click(function(){
    $("#gene").val('agttttactttttcgcttttcgATGGCACCTCCACAAGTAAGAAGGTCCGCTAGGTTAAGCAAGAGATGCCAAGAAGAAAAGGTTAAGCTTCAGAAGAAAAATGTCGGATTTAAGGCAAAATCTAAGTCGGCTAAAAAGAGTAATAAGAAATTCAAGAAAGCTGCCGCTCAAAGACAAAGCCCAATTGACATCGTCCCACAACACGTGTGCTGTGACACAGACGTTTGCAAGGCTGATGCCTTGAACATTGACTACAAATCAGGTGACTGTTGCGATGTCCTTGTCTCCGAAGGAGGTTTCCTTGTGAATGTCAAGAGAAATTGTGGCACATTCCTTACCGCCAACCATTTACCATCATCAAAATTCGCGTTGGCTCAGTTCCATGCTCATTGGGGAAGCAACTCGAAAGAAGGATCCGAGCACTTTTTGGACGGAAAACAACTTAGCGGAGAGGTTCACTTTGTATTCTGGAACACCAGCTATGAGTCGTTTAATGTGGCACTCAGCAAGCCCGATGGATTGGCGGTTGTTGGAGTCTTCTTGAAGGAAGGAAAATACAATGACAATTACCATGGCCTGATCGACACAGTGCGCAAAGCCACCGGAAATGCCACACCAATTGCCATGCCAAAAGACTTCCACATTGAGCATCTTCTCCCATCCCCGGACAAGAGAGAATTCGTTACATACCTCGGATCCCTTACCACCCCACCATACAACGAGTGTGTTATCTGGACCTTGTTCACAGAGCCTGTGGAGGTCTCCTTCGGACAGCTCAACGTGCTCCGTAATATCATCCCCGCCAATCATCGCGCCTGCCAAGACAGATGCGACCGTGAAATCCGATCTTCCTTCAACTTTTAAatttcttatttttttcccttctcaatggttttttctatttagtttttctgtacgagaacaactcacaatcatcatgtaaaaaacaagttcacacccccgtgccgatgtaagtatgaaacgtctctttcccctcagaacatacatgtacgaagaagagcttaacactcttttctgctttctcattataaataatttagtattcaactggaataaaaagtttttcgctt');
    $('#CDST2').trigger('click');
    $('#seqName').val('R01E6.3a_spliced+UTR');
    $('#CDS_1').val('23');
    $('#CDS_2').val('865');
    CDS_ex1=23;
    CDS_ex2=865;
    CDS_switch=1;
  });

  $('#clean').on('click',function(){
    CDS_switch = 0;
    CDS_ex1 = '';
    CDS_ex2 = '';
    $('#seqName').val('');
    $("#gene").val('');
    $("#opt1").val("0");
    $("#opt2").val("2");
    $("#opt3").val("2");
    $("#opt4").val("3");
    $("#opt5").val("6");
    $('#CDST1').trigger('click');
    $('#CDS_1').val('');
    $('#CDS_2').val('');
  })

  
});



// var CDS_switch = 0;
// var CDS_ex1 = '';
// var CDS_ex2 = '';
// $(document).ready(function(){
//   $("#reset_to_default").click(function(){
//     $("#opt1").val("0");
//     $("#opt2").val("2");
//     $("#opt3").val("2");
//     $("#opt4").val("3");
//     $("#opt5").val("6");
//     if(CDS_switch==1){
//       $('#CDS_1').val(CDS_ex1);
//       $('#CDS_2').val(CDS_ex2);
//     }
//   });
//   $("#reset_to_default,#TransformBTN").mouseout(function(){
//     $(this).blur();
//   });
//   $("#example").click(function(){
//     // $('#overView,#seqView,#div_name3,#div_name').empty();
//     $("#gene").val(">GFP_DNA_sequence_without_introns\natgagtaaaggagaagaacttttcactggagttgtcccaattcttgttgaattagatggtgatgttaatgggcacaaattttctgtcagtggagagggtgaaggtgatgcaacatacggaaaacttacccttaaatttatttgcactactggaaaactacctgttccatggccaacacttgtcactactctcacttatggtgttcaatgcttctcgagatacccagatcatatgaaacagcatgactttttcaagagtgccatgcccgaaggttatgtacaggaaagaactatatttttcaaagatgacgggaactacaagacacgtgctgaagtcaagtttgaaggtgatacccttgttaatagaatcgagttaaaaggtattgattttaaagaagatggaaacattcttggacacaaattggaatacaactataactcacacaatgtatacatcatggcagacaaacaaaagaatggaatcaaagttaacttcaaaattagacacaacattgaagatggaagcgttcaactagcagaccattatcaacaaaatactccaattggcgatggccctgtccttttaccagacaaccattacctgtccacacaatctgccctttcgaaagatcccaacgaaaagagagaccacatggtccttcttgagtttgtaacagctgctgggattacacatggcatggatgaactatacaaatag");
//     // $('#CDS_ck').prop('checked',false);
//     // $('.CDS').prop('disabled',true);
//     $('#CDS_1').val('');
//     $('#CDS_2').val('');
//     $('#CDS_ck').prop('checked',true);
//     $('.CDS').removeAttr('disabled');
//     $('#CDS_1').val('1');
//     $('#CDS_2').val('717');
//     CDS_ex1=1;
//     CDS_ex2=717;
//     CDS_switch=1;

//   });
//   $("#example2").click(function(){
//     $("#gene").val('>R01E6.3a_spliced+UTR\nagttttactttttcgcttttcgATGGCACCTCCACAAGTAAGAAGGTCCGCTAGGTTAAGCAAGAGATGCCAAGAAGAAAAGGTTAAGCTTCAGAAGAAAAATGTCGGATTTAAGGCAAAATCTAAGTCGGCTAAAAAGAGTAATAAGAAATTCAAGAAAGCTGCCGCTCAAAGACAAAGCCCAATTGACATCGTCCCACAACACGTGTGCTGTGACACAGACGTTTGCAAGGCTGATGCCTTGAACATTGACTACAAATCAGGTGACTGTTGCGATGTCCTTGTCTCCGAAGGAGGTTTCCTTGTGAATGTCAAGAGAAATTGTGGCACATTCCTTACCGCCAACCATTTACCATCATCAAAATTCGCGTTGGCTCAGTTCCATGCTCATTGGGGAAGCAACTCGAAAGAAGGATCCGAGCACTTTTTGGACGGAAAACAACTTAGCGGAGAGGTTCACTTTGTATTCTGGAACACCAGCTATGAGTCGTTTAATGTGGCACTCAGCAAGCCCGATGGATTGGCGGTTGTTGGAGTCTTCTTGAAGGAAGGAAAATACAATGACAATTACCATGGCCTGATCGACACAGTGCGCAAAGCCACCGGAAATGCCACACCAATTGCCATGCCAAAAGACTTCCACATTGAGCATCTTCTCCCATCCCCGGACAAGAGAGAATTCGTTACATACCTCGGATCCCTTACCACCCCACCATACAACGAGTGTGTTATCTGGACCTTGTTCACAGAGCCTGTGGAGGTCTCCTTCGGACAGCTCAACGTGCTCCGTAATATCATCCCCGCCAATCATCGCGCCTGCCAAGACAGATGCGACCGTGAAATCCGATCTTCCTTCAACTTTTAAatttcttatttttttcccttctcaatggttttttctatttagtttttctgtacgagaacaactcacaatcatcatgtaaaaaacaagttcacacccccgtgccgatgtaagtatgaaacgtctctttcccctcagaacatacatgtacgaagaagagcttaacactcttttctgctttctcattataaataatttagtattcaactggaataaaaagtttttcgctt');
//     $('#CDS_ck').prop('checked',true);
//     $('.CDS').removeAttr('disabled');
//     $('#CDS_1').val('23');
//     $('#CDS_2').val('865');
//     CDS_ex1=23;
//     CDS_ex2=865;
//     CDS_switch=1;
//   });
//   $('#CDS_ck').click(function(){
//     if (CDS_switch == 0){
//       // $('#overView,#seqView,#div_name3,#div_name').empty();
//       $('.CDS').removeAttr('disabled');
//       $('#CDS_1').val(CDS_ex1);
//       $('#CDS_2').val(CDS_ex2);
//       CDS_switch++;
//     }
//     else{
//       // $('#overView,#seqView,#div_name3,#div_name').empty();
//       $('.CDS').val('');
//       $('.CDS').attr('disabled','');
//       CDS_switch--;
//     }
//   })
//   $('select,input,#gene').change(function(){
//     // $('#overView,#seqView,#div_name3,#div_name').empty();
//   })

//   $('#clean').on('click',function(){
//     CDS_switch = 0;
//     CDS_ex1 = '';
//     CDS_ex2 = '';
//     $("#gene").val('');
//     $("#opt1").val("0");
//     $("#opt2").val("2");
//     $("#opt3").val("2");
//     $("#opt4").val("3");
//     $("#opt5").val("6");
//     $('#CDS_ck').prop('checked',false);
//     $('.CDS').prop('disabled',true);
//     $('#CDS_1').val('');
//     $('#CDS_2').val('');
//   })

  
// });

