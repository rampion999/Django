function pock(){
	$('.name').on({
    mouseover: function(){
        var a = $(this).attr('adultHermaphrodites');
        var b = $(this).attr('adultMales');
        var c = $(this).attr('embryos');
        var d = $(this).attr('upstream_motif_score');
        var str = 'opacity: 1; visibility: visible; left:'+(event.pageX+15)+'px; top:'+(event.pageY+23)+'px; width: 300px;'
        $(".tooltip").attr({'style':str});
        $('.tooltip').html('adultHermaphrodites : '+a+'<br>'+'adultMales : '+b+'<br>'+'embryos : '+c+'<br>'+'upstream_motif_score : '+d);
    },  
    mousemove: function(){
    	// var str = 'opacity: 1; visibility: visible; left:'+event.pageX+'px; top:'+(event.pageY-28)+'px;'
        $(".tooltip").attr({'style':'opacity: 1; visibility: visible; left:'+(event.pageX+15)+'px; top:'+(event.pageY+23)+'px; width: 300px;'});
    },
    mouseout: function(){
    	var str = 'opacity: 1; visibility: hidden; left:'+(event.pageX+15)+'px; top:'+(event.pageY+23)+'px;'
        $(".tooltip").attr('style',str);
    } 
});
}

function cbr(id,a,b,c,d){
    var str = '#'+id
    $(str).attr('adulthermaphrodites',a);
    $(str).attr('adultMales',b);
    $(str).attr('embryos',c);
    $(str).attr('upstream_motif_score',d);
}