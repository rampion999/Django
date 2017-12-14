var CDS_switch = 0;
var CDS_ex1 = '';
var CDS_ex2 = '';
$(document).ready(function(){
  $("#reset_to_default").click(function(){
    $("#opt1").val("0");
    $("#opt2").val("1");
    $("#opt3").val("3");
    $("#opt4").val("3");
    $("#opt5").val("4");
    if(CDS_switch==1){
      $('#CDS_1').val(CDS_ex1);
      $('#CDS_2').val(CDS_ex2);
    }
  });
  $("#reset_to_default,#TransformBTN").mouseout(function(){
    $(this).blur();
  });
  $("#example").click(function(){
    // $('#overView,#seqView,#div_name3,#div_name').empty();
    $("#gene").val(">GFP_DNA_sequence_without_introns\natgagtaaaggagaagaacttttcactggagttgtcccaattcttgttgaattagatggtgatgttaatgggcacaaattttctgtcagtggagagggtgaaggtgatgcaacatacggaaaacttacccttaaatttatttgcactactggaaaactacctgttccatggccaacacttgtcactactctcacttatggtgttcaatgcttctcgagatacccagatcatatgaaacagcatgactttttcaagagtgccatgcccgaaggttatgtacaggaaagaactatatttttcaaagatgacgggaactacaagacacgtgctgaagtcaagtttgaaggtgatacccttgttaatagaatcgagttaaaaggtattgattttaaagaagatggaaacattcttggacacaaattggaatacaactataactcacacaatgtatacatcatggcagacaaacaaaagaatggaatcaaagttaacttcaaaattagacacaacattgaagatggaagcgttcaactagcagaccattatcaacaaaatactccaattggcgatggccctgtccttttaccagacaaccattacctgtccacacaatctgccctttcgaaagatcccaacgaaaagagagaccacatggtccttcttgagtttgtaacagctgctgggattacacatggcatggatgaactatacaaatag");
    // $('#CDS_ck').prop('checked',false);
    // $('.CDS').prop('disabled',true);
    $('#CDS_1').val('');
    $('#CDS_2').val('');
    $("#opt5").val("4");
    $('#CDS_ck').prop('checked',true);
    $('.CDS').removeAttr('disabled');
    $('#CDS_1').val('1');
    $('#CDS_2').val('717');
    CDS_ex1=1;
    CDS_ex2=717;
    CDS_switch=1;

  });
  $("#example2").click(function(){
    // $('#overView,#seqView,#div_name3,#div_name').empty();
    $("#gene").val(">F07C3.7_spliced+UTR\nacgcaaaaATGAACGAAAAAGAAGAAGAAGTATCGCTGAATCAGATCAAGCTCAAGCCACGTATTTCACTTTTCAATGGCTGCACAATCATTATCGGAGTTATTATTGGATCAGGAATCTTTGTGTCACCAAAAGGAGTCCTCCTTGAAGCCGGCAGTGC\
TGGAATGTCTCTGCTCATTTGGCTCCTCAGTGGAGTATTTGCCATGATTGGAGCTGTATGTTATTCAGAGCTCGGGACACTAATCCCCAAGTCTGGAGGAGATTACGCGTATATTTATGAGGCGTTTGGTCCTCTTCCGTCATTTCTTTTTCTTTGGGTA\
GCTCTTGTCATTATCAATCCAACATCTTTGGCGATTATTGCCATAACATGTGCAACTTACGCTCTTCAACCATTCTACTCATGTCCTGTACCGGACGTTGTTGTCAATCTTTTCGCCGGATGCATAATTGCTGTTCTCACATTCATCAACTGTTGGGATG\
TTCGAATGGCAACAAGAACTAACGATTTCTTCACAATCACCAAATTAATTGCTCTCACTCTCATTATTACTTGTGGAGGATATTGGCTCTCATTGGGGCATATTGATAATCTTGTGATGCCCGATGTAGCAGAAGGAAGTCAAACAAAATTATCAGCTAT\
TGCAATGGCGTTCTATTCTGGAGTTTTCTCATTTTCGGGGTTCTCTTATCTGAATTTTGTTACCGAAGAACTAAAAAACCCGTTCAGGAACCTTCCACGCGCAATCTACATTTCCATTCCTATTGTTACAATTGTCTATATGCTCGTCAATATTGCATAT\
TTTTCAGTATTAACCGTTGATGAGATTCTCGATTCCGATGCAGTGGCCATCACATTTGCCGACAAAATTCTCGGAACCTTCGGAAGCAAGATACTCATGCCATTGTTTGTTTCCTTTTCCTGCGTAGGTTCCCTTAATGGAATTCTCATCACATGCTCCA\
GAATGTTCTTTTCTGGAGCTCGAAACAGTCAACTACCTGAACTGTTTGCAATGATCTCAATCAGACAACTTACTCCGATTCCATCATTAATTTTCCTTGGTGGAACTTCAATCGTCATGCTCTTCATTGGTAACGTGTTCCAGCTTATTAACTATCTGTC\
ATTTGCTGAATCACTCGTTGTTTTCTCTTCTGTCGCTGGGCTTTTGAAATTGAGATTCACAATGCCTGAAAATGTGCTAAACGCCCGTCCAATCAAAATCAGTCTCCTGTGGCCAATACTGTTTTTCCTTATGTGCCTCTTTCTTTTGATCCTTCCATTC\
TTCCACAGTGATCCATGGGAACTCATTTACGGAGTTTTCTTGGTACTTTCAGGAATTCCCATCTACGTTCTCTTCGTCTACAATAAATACCGTCCAGGATTCATTCAATCTGTGTGGATAGGCTTCACACATTTCATTCAAAAATTGTTCTATTGTGTCC\
CAGAACTCTCCAGTTCCTGAaaattctgttttattgtcatatccaaacccgtgactctttccgttgttcttttttatttccacagtgtgcattttttgtttttttgtttggttttttttgctcccagatctttctgcgcttccgttatcaagcggacata\
tctcaaattgacacagcatttttttgctattttatccgctccatatctaaaatatatctttatgtcatcattgaaagttttggtttttagcacctaataacttattttctcgaatagaaataaaacgttctcaatttt"
    );
    $('#CDS_ck').prop('checked',true);
    $('.CDS').removeAttr('disabled');
    $('#CDS_1').val('9');
    $('#CDS_2').val('1460');
    $("#opt5").val("4");
    CDS_ex1=9;
    CDS_ex2=1460;
    CDS_switch=1;
  });
  $('#CDS_ck').click(function(){
    if (CDS_switch == 0){
      // $('#overView,#seqView,#div_name3,#div_name').empty();
      $('.CDS').removeAttr('disabled');
      $('#CDS_1').val(CDS_ex1);
      $('#CDS_2').val(CDS_ex2);
      CDS_switch++;
    }
    else{
      // $('#overView,#seqView,#div_name3,#div_name').empty();
      $('.CDS').val('');
      $('.CDS').attr('disabled','');
      CDS_switch--;
    }
  })
  $('select,input,#gene').change(function(){
    // $('#overView,#seqView,#div_name3,#div_name').empty();
  })

  $('#clean').on('click',function(){
    CDS_switch = 0;
    CDS_ex1 = '';
    CDS_ex2 = '';
    $("#gene").val('');
    $("#opt1").val("0");
    $("#opt2").val("1");
    $("#opt3").val("3");
    $("#opt4").val("3");
    $("#opt5").val("4");
    $('#CDS_ck').prop('checked',false);
    $('.CDS').prop('disabled',true);
    $('#CDS_1').val('');
    $('#CDS_2').val('');
  })

  
});

