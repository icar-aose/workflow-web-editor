/**
 * 
 */


function initialize_inspector () {
	/* global */
	property_add_input("process","process-name","process name: ");
	
	
	
	var add_dummy_row = function() {
    	return $("<button>").attr("type", "button").text("+")
    		.on("click", function () {
    			$("#process-data-item").jsGrid("insertItem", {"Name":"---", "Type": "---"}).done(function() {
    				 // add this item to select o value for message and data object
    			});
    			
    		});
	}
    	
	property_add_editable_list("process","data-item","data items: ",
			[
			 { name: "Name", type: "text", width: 80 },
			 { name: "Type", type: "select", items: [{Name:"Information", Id:"Information"},{Name:"Physical", Id:"Physical"}], valueField: "Id", textField: "Name" },
			// { name: "Type", type: "text", width: 80 }
			],[],add_dummy_row);

	
	property_add_header("geometry","size");
	property_add_input("geometry","element-width","width: ");
	property_add_input("geometry","element-height","height: ");
	
	property_add_header("align","align horizontally");
  	property_add_img_button("align","align-left","align left","img/align/object_alignment_left.png",AlignLeft);
  	property_add_img_button("align","align-hcenter","align center","img/align/object_alignment_horizontal.png",AlignHCenter);
  	property_add_img_button("align","align-right","align right","img/align/object_alignment_right.png",AlignRigth);

  	property_add_divider("align","align vertically");
  	property_add_img_button("align","align-top","align top","img/align/object_alignment_top.png",AlignTop);
  	property_add_img_button("align","align-vcenter","align center","img/align/object_alignment_vertical.png",AlignVCenter);
  	property_add_img_button("align","align-bottom","align bottom","img/align/object_alignment_bottom.png",AlignBottom);
  	
  	
	property_add_input("paper","page-width","page width: ");
	property_add_input("paper","page-height","page height: ");
	property_add_slider("paper","page-zoom","zoom: ",100,10,200,Zoom);
	
	

}

var GeometryFillForm = function(model) {
	$("#geometry-element-width").val(model.attributes.size.width);
	$("#geometry-element-width").bind('input', function() {
		var w = parseInt($("#geometry-element-width").val());
		var h = parseInt($("#geometry-element-height").val());
		model.resize( w, h );
	});
	
	$("#geometry-element-height").val(model.attributes.size.height);
	$("#geometry-element-height").bind('input', function() {
		var w = parseInt($("#geometry-element-width").val());
		var h = parseInt($("#geometry-element-height").val());
		model.resize( w, h );
	});
}

var AlignTop = function() {
	var min_y=1000000;
	for (var i=0; i<selection.length; i++) { 
		var y = selection.models[i].attributes.position.y ;
		if (y<min_y) {min_y=y}		
	}	
	for (var i=0; i<selection.length; i++) {
		var x = selection.models[i].attributes.position.x ;
		selection.models[i].position(x,min_y);
	}	
}

var AlignBottom = function() {
	var max_y=0;
	for (var i=0; i<selection.length; i++) { 
		var y = selection.models[i].attributes.position.y + selection.models[i].attributes.size.height ;
		if (y>max_y) {max_y=y}		
	}	
	for (var i=0; i<selection.length; i++) {
		var x = selection.models[i].attributes.position.x ;
		selection.models[i].position(x,max_y-selection.models[i].attributes.size.height);
	}	
}

var AlignVCenter = function() {
	var min_y=1000000;
	var max_y=0;
	for (var i=0; i<selection.length; i++) { 
		var ty = selection.models[i].attributes.position.y ;
		var by = selection.models[i].attributes.position.y + selection.models[i].attributes.size.height ;
		if (ty<min_y) {min_y=ty}		
		if (by>max_y) {max_y=by}		
	}
	cy=min_y+(max_y-min_y)/2;
		
	for (var i=0; i<selection.length; i++) {
		var x = selection.models[i].attributes.position.x ;
		selection.models[i].position(x,cy-(selection.models[i].attributes.size.height/2));
	}	
}


var AlignLeft = function() {
	var min_x=1000000;
	for (var i=0; i<selection.length; i++) { 
		var x = selection.models[i].attributes.position.x ;
		if (x<min_x) {min_x=x}		
	}	
	for (var i=0; i<selection.length; i++) {
		var y = selection.models[i].attributes.position.y ;
		selection.models[i].position(min_x,y);
	}	
}

var AlignRigth = function() {
	var max_x=0;
	for (var i=0; i<selection.length; i++) { 
		var x = selection.models[i].attributes.position.x + selection.models[i].attributes.size.width ;
		if (x>max_x) {max_x=x}		
	}	
	for (var i=0; i<selection.length; i++) {
		var y = selection.models[i].attributes.position.y ;
		selection.models[i].position(max_x-selection.models[i].attributes.size.width,y);
	}	
}


var AlignHCenter = function() {
	var min_x=1000000;
	var max_x=0;
	for (var i=0; i<selection.length; i++) { 
		var tx = selection.models[i].attributes.position.x ;
		var bx = selection.models[i].attributes.position.x + selection.models[i].attributes.size.width ;
		if (tx<min_x) {min_x=tx}		
		if (bx>max_x) {max_x=bx}		
	}
	cx=min_x+(max_x-min_x)/2;
		
	for (var i=0; i<selection.length; i++) {
		var y = selection.models[i].attributes.position.y ;
		selection.models[i].position(cx-(selection.models[i].attributes.size.width/2),y);
	}	
}

var Zoom = function(value) {
	zoom_factor = value/100;
	var cx = parseInt($("#paper").css("width"))/2;
	var cy = parseInt($("#paper").css("width"))/2;	
	var tx = - zoom_factor*cx + cx;
	var ty = - zoom_factor*cy + cy;
	
	paper.scale(zoom_factor,zoom_factor);
	paper.setOrigin(tx,ty);
}
