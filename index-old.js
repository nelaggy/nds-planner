function calcDist(dx, dy, scale){ //returns dist between 2 points
	return 10**scale*Math.sqrt(dx**2 + dy**2); // 4 digit mgr is in units of decametres => multiply by 10 to convert to m
}

function calcAngle(dx, dy){ //returns bearing of point B from point A
	let alpha = Math.atan(dx/dy);
	if(dx>=0){
		if(dy>=0){
			return 3200*alpha/Math.PI; 		// dx>0, dy>0 => add 0
		} else if(dy<0){
			return 3200*(1+ alpha/Math.PI); // dx>0, dy<0 => add 3200
		}
	} else if(dx<0){
		if(dy>=0){
			return 3200*(2+alpha/Math.PI);  // dx<0, dy>0 => add 6400
		} else if(dy<0){
			return 3200*(1+alpha/Math.PI);  // dx<0, dy<0 => add 3200
		}
	}
}


function readForm(){
	//reads the mgr values
	//console.log($('#ea').val());
	let x1 = parseInt($('#ea').val());
		let y1 = parseInt($('#na').val());
		let x2 = parseInt($('#eb').val());
		let y2 = parseInt($('#nb').val());
		//console.log(x1, x2, y1, y2);

		//this determines the factor to scale distance by
		scale = 5 - x1.toString().length
		//console.log(scale);

		//calculates and displays distance and azimuth
	let d = calcDist(x2-x1, y2-y1, scale);
	let a = calcAngle(x2-x1, y2-y1);
	$('#dist').text('distance: ' + d);
	$('#angle').text('azimuth: ' + a);
}

$(document).ready(function(){
  $("#submit").click(function(){
  		readForm();
    });
});