var CDS_switch = 0;
var CDS_ex1 = 27;
var CDS_ex2 = 1064;
$(document).ready(function(){
  $("#reset_to_default").click(function(){
    $("#opt1").val("0");
    $("#opt2").val("1");
    $("#opt3").val("3");
    $("#opt4").val("3");
    $("#opt5").val("3");
    if(CDS_switch==1){
      $('#CDS_1').val(CDS_ex1);
      $('#CDS_2').val(CDS_ex2);
    }
  });
  $("#example").click(function(){
    $("#gene").val(">GFP_DNA_sequence_without_introns\natgagtaaaggagaagaacttttcactggagttgtcccaattcttgttgaattagatggtgatgttaatgggcacaaattttctgtcagtggagagggtgaaggtgatgcaacatacggaaaacttacccttaaatttatttgcactactggaaaactacctgttccatggccaacacttgtcactactctcacttatggtgttcaatgcttctcgagatacccagatcatatgaaacagcatgactttttcaagagtgccatgcccgaaggttatgtacaggaaagaactatatttttcaaagatgacgggaactacaagacacgtgctgaagtcaagtttgaaggtgatacccttgttaatagaatcgagttaaaaggtattgattttaaagaagatggaaacattcttggacacaaattggaatacaactataactcacacaatgtatacatcatggcagacaaacaaaagaatggaatcaaagttaacttcaaaattagacacaacattgaagatggaagcgttcaactagcagaccattatcaacaaaatactccaattggcgatggccctgtccttttaccagacaaccattacctgtccacacaatctgccctttcgaaagatcccaacgaaaagagagaccacatggtccttcttgagtttgtaacagctgctgggattacacatggcatggatgaactatacaaatag");
    $('#CDS_ck').prop('checked',false);
    $('.CDS').prop('disabled',true);
    $('#CDS_1').val('');
    $('#CDS_2').val('');
    $("#opt5").val("4");
    CDS_ex1=27;
    CDS_ex2=1064;
    CDS_switch=0;

  });
  $("#example2").click(function(){
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
    $("#opt5").val("3");
    CDS_ex1=9;
    CDS_ex2=1460;
    CDS_switch=1;
  });
  $('#CDS_ck').click(function(){
    if (CDS_switch == 0){
      $('.CDS').removeAttr('disabled');
      $('#CDS_1').val(CDS_ex1);
      $('#CDS_2').val(CDS_ex2);
      CDS_switch++;
    }
    else{
      $('.CDS').val('');
      $('.CDS').attr('disabled','');
      CDS_switch--;
    }
  })

  
});

