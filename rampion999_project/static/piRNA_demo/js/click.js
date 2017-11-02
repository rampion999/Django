$(document).ready(function(){				
	function submit(){
		$.ajax({
			url: "CNZ/",
			data:{
				mydata:$('#dick').val(),
				csrfmiddlewaretoken: '{{ csrf_token }}'
			},
			type: "POST",
			datatype:"text",
			success: function(data){
				$('#qq').html(data);
			},
			error: function(){console.log('fail')},
		})
	}
	$(document).on('click','#transformBTN',submit);
});
$(document).ready(function(){
	$("#transformBTN").click(function(){
		$("#re").html("大屌弟");
	});
});