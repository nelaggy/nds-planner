let points = [];

function addRow(e, n, i){ //add new point into table where specified
	
}

function delRow(i){ //delete existing point from table where specified
	
}

function newPoint(i){ //dialog box to add easting and northing of new point

	let point = {
		'E': e,
		'N': n
	};
	points.splice(i,0,point);
	addRow(e, n, i);
}

function editPoint(e, n, i){ //dialog box to modify easting and northing of existing point

}

function delPoint(i){ //removes point
	points.splice(i,1);
	delRow(i);
}

function pointDialog(e,n){
	
}