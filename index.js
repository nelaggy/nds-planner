let points = [];

function newPoint(i){ /*dialog box to add easting and northing of new point*/
	let e,n = loadPopup(null,null);
	let point = {
		'e': e,
		'n': n
	};
	points.splice(i,0,point);
	loadList();
}

function editPoint(e, n, i){ /*dialog box to modify easting and northing of existing point*/
	points[i] = {'e': e, 'n': n};
	loadList();
}

function delPoint(i){ /*removes point*/
	points.splice(i,1);
	loadList();
}

function loadList(){
	let $container = $('.point-container');
	let $pointItem = $("<div class='point-item add-point'></div>"),
		$pointIcon = $("<div class='point-icon'><span class='material-icons'>place</span></div>"),
		$pointActions = $("<div class='point-actions'><span class='material-icons action-button'>add</span><span class='material-icons action-button'>edit</span><span class='material-icons action-button'>delete</span></div>");	
		let reps = points.length
	for(var i=0; i<reps; i++){
		let $newPoint = $pointItem;
		$newPoint.append($pointIcon);
		let $pointMGR = `<div class='point-mgr'><div class='point-e'>${points[i]['e']}</div><div class='point-n'>${points[i]['n']}</div></div>`;
		$newPoint.append($pointMGR);
		$newPoint.append($pointActions);
		$container.append($newPoint);
	}
}

function loadPopup(e,n){
	if(e != null) {
		$('#mgr-input-e').val(e);
	}
	if(n != null) {
		$('#mgr-input-n').val(n);
	}
	$('.popup-bg').show();
}