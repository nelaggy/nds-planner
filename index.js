let points = [];

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

function loadItem(i, $container){
	let $firstItem = $("<div class='point-item add-point' id='add-point-start'><div class='point-icon'><span class='material-icons'>add</span></div><div class='point-mgr'><h2>add a new point</h2></div></div>")
	let pointItem = "<div class='point-item'></div>",
			pointIcon = "<div class='point-icon'><span class='material-icons'>place</span></div>",
			$pointActions = $("<div class='point-actions'><span class='material-icons action-button' id='add-button'>add</span><span class='material-icons action-button' id='edit-button'>edit</span><span class='material-icons action-button' id='del-button'>delete</span></div>");	
	if(i<0){
		$container.append($firstItem);
		$firstItem.on('click', function(){
			loadPopup(false);
		});
	} else {
		let $newPoint = $(pointItem);
		let e = points[i]['e'],
			n = points[i]['n'];
		let $pointMGR = $(`<div class='point-mgr'><div class='point-e'>${e}</div><div class='point-n'>${n}</div></div>`);
		$newPoint.append($(pointIcon));
		$newPoint.append($pointMGR);
		$newPoint.append($pointActions);
		$container.append($newPoint);
		$pointActions.find('#add-button').on('click', function(){
			loadPopup(false);
		});
		$pointActions.find('#edit-button').on('click', function(){
			loadPopup(true,e,n);
		})
		$pointActions.find('#del-button').on('click', function(){
			points.splice(i,1);
			loadList();
		})
	}
	function loadPopup(edit,e=null,n=null){
		let $modal = $("<div class='popup-bg' id='modal'><div class='popup-window'><h1 class='popup-label'>new point</h1></div></div>"),
			$inputs = $("<form class='input-window'><div class='popup-inputs'><input type='text' name='e' id='mgr-input-e' placeholder='easting'><input type='text' name='n' id='mgr-input-n' placeholder='northing'></div></form>"),
			$actions = $("<div class='popup-actions'><button class='cancel'>cancel</button><button class='submit' type='submit'>continue</button></div>");
		$inputs.append($actions);
		$modal.find('.popup-window').append($inputs);
		$('body').prepend($modal);
		if(edit){
			$inputs.find('#mgr-input-e').val(e);
			$inputs.find('#mgr-input-n').val(n);
		}
		$inputs.on('submit',function(ev){
			ev.preventDefault();
			$('.popup-bg').remove();
			if(!edit){
				let point = {
					'e': parseInt($inputs.find('.popup-inputs').find('#mgr-input-e').val()),
					'n': parseInt($inputs.find('.popup-inputs').find('#mgr-input-n').val())
				};
				points.splice(i+1,0,point);
			} else {
				points[i] = {'e': e, 'n': n};
			}
			loadList();
			return;
		});

		$actions.find('.cancel').on('click', function(ev){
			ev.preventDefault();
			$('.popup-bg').remove();
			return;
		});
	}
}

function loadList(){
	let $container = $('.point-container');
	$container.empty();
	loadItem(-1,$container);
	let reps = points.length;
	for(var i=0; i<reps; i++){
		loadItem(i, $container);
	}
}

function loadTable(){
	let $container = $('.nds-container');
	let reps = points.length;
	$container.empty();
	$container.append('<tr><th>from (mgr)</th><th>to (mgr)</th><th>distance (m)</th><th>direction (mils)</th></tr>')
	for(var i=0; i<reps-1; i++){
		let e1 = points[i]['e'],
			e2 = points[i+1]['e'],
			n1 = points[i]['n'],
			n2 = points[i+1]['n'];
		let scale = 5 - e1.toString().length
		let dist = Math.round(calcDist(e2-e1, n2-n1, scale));
		let angle = Math.round(calcAngle(e2-e1, n2-n1));
		let $newRow = `<tr><td>${e1} ${n1}</td><td>${e2} ${n2}</td><td>${dist}</td><td>${angle}</td></tr>`
		$container.append($newRow);
	}
}


$(document).ready(function(){
	loadList();
	$('#generate-nds').on('click', function(ev){
		ev.preventDefault();
		loadTable();
	})
});