/**
 * 
 */
var drop_x;
var drop_y;

var last;

function popupDialog() {
	 $( "#dialog" ).dialog({
		 width: 400
	 });
}

function initialize_controllers() {
  $( "#palette-accordion" ).accordion({
	  collapsible: true,
	  heightStyle: "fill",
	  icons: { "header": "ui-icon-plus", "activeHeader": "ui-icon-minus" }
  });

  $( "#property-accordion" ).accordion({
	  collapsible: true,
	  heightStyle: "fill",
	  icons: { "header": "ui-icon-plus", "activeHeader": "ui-icon-minus" }
  });

  $(".scrollbar").mCustomScrollbar({
	  axis:"yx",
	  theme: "inset-dark",
	  alwaysShowScrollbar: 2,
	  mouseWheel: { enable: true },
	  scrollButtons:{ enable: false }
  
  });

  paper = new joint.dia.Paper({
		el: $('#diagram'),
		width: 3000,
		height: 2000,
		gridSize: 10,
		perpendicularLinks: true,
		
		model: graph,
	
		markAvailable: true,
		embeddingMode: true
		
	});

  initialize_selection_lazo();
  initialize_element_tool();
  
	paper.on('link:options', function(evt, cellView, x,y) { 
		$("#property-accordion").accordion({active: 1});
		show_target_property(cellView.model.get("linkType"));		
		cellView.model.element_form(cellView);
		cellView.model.geometry_form(cellView.model);
		
		last = cellView;
	});

  
  $("#diagram").droppable({
      drop: function( event, ui ) {
    	  drop_x = ui.offset.left - $(this).offset().left;
    	  drop_y = ui.offset.top - $(this).offset().top;
        }
      });

}

function initialize_element_tool() {
	snaplines = new joint.ui.Snaplines({ paper: paper })
	snaplines.startListening();

	paper.on('blank:pointerdown', function(evt, xE, yE) {
		clear_property_form();
		show_target_property(null);
			if (graph.findModelsFromPoint({ x: xE, y:yE }).length > 0) {
			
		}
		
		
	});
	
	paper.on('cell:pointerup', function(cellView) {
		// We don't want a Halo for links.
		if (cellView.model instanceof joint.dia.Link) return;
		
		
		clear_property_form();
		show_target_property(null);

		var freetransform = new joint.ui.FreeTransform({ cellView: cellView, allowRotation: false });
		var halo = new joint.ui.Halo({ cellView: cellView });
		halo.removeHandle('clone');
		halo.removeHandle('remove');
		halo.removeHandle('link');
		halo.removeHandle('unlink');
		halo.removeHandle('resize');
		halo.removeHandle('rotate');
		halo.removeHandle('fork');

		halo.addHandle({ name: 'delete', position: 'nw', icon: 'img/remove_2.png' });
		halo.addHandle({ name: 'inspect', position: 'ne', icon: 'img/settings_2.png' });
		halo.addHandle({ name: 'link', position: 'e', icon: 'img/link.png' });
//		if (cellView.model instanceof BPMNBoundary){
//			halo.removeHandle('link');
//		
//		}

		if (cellView.model instanceof BPMNPool){
			console.log("ADD ROTATE TO POOL")
				halo.addHandle({ name: 'rotatePool', position: 'se', icon: 'img/rotate.png' });
			//	halo.addHandle({ name: 'messageFlow', position: 'w', icon: 'img/messageFlow.png' });
		}
		
		halo.on('action:inspect:pointerdown', function(evt) {
			$("#property-accordion").accordion({active: 1});
			show_target_property(cellView.model.get("elementType"));		
			cellView.model.element_form(cellView);
			cellView.model.geometry_form(cellView.model);
			
		});

		
	
		
		halo.on('action:link:pointerdown', function(type,evt) {
		
			var cellView = this.options.cellView;
			var link = cellView.model.link_factory();
			link.set('source', { id: cellView.model.id /*, selector: selector*/ });
			link.set('target', { x: evt.clientX, y: evt.clientY });
			// add link to graph but don't validate
			this.options.graph.addCell(link, { validation: false, halo: this.cid });

			link.set('target', this.options.paper.snapToGrid({ x: evt.clientX, y: evt.clientY }));
			
			this._linkView = this.options.paper.findViewByModel(link);
			this._linkView.startArrowheadMove('target');
		});
		halo.on('action:link:pointermove', function(type,evt) {
			var clientCoords = this.options.paper.snapToGrid({ x: evt.clientX, y: evt.clientY });

			this._linkView.pointermove(evt, clientCoords.x, clientCoords.y);
		});
		halo.on('action:link:pointerup', function(type,evt) {
				this._linkView.pointerup(evt);

			var sourceId = this._linkView.model.get('source').id;
			var targetId = this._linkView.model.get('target').id;

			if (sourceId && targetId && (sourceId === targetId)) {
				this.makeLoopLink(this._linkView.model);
			}
			
			this._linkView.model.instantiated();
				
			if (sourceId != undefined && targetId != undefined) {
				console.log("SET FLOW TYPE IN MAIN")
				this._linkView.model.setFlowType(sourceId,targetId);
				
			}
//			if (sourceId != undefined && targetId != undefined) {
//				this._linkView.model.instantiated();
//			}
		

		});
		halo.on('action:delete:pointerup', function(type,evt) {
			clear_property_form();
			show_target_property(null);
			this.options.cellView.model.remove();
		});
			
		halo.on('action:rotatePool:pointerup', function(type,evt) {
		 if(this.options.cellView.model.get('positioning')=='horizontal'){
			this.options.cellView.model.rotate(90);
		 this.options.cellView.model.set('positioning','vertical');
		 }
		 else
			 {
				this.options.cellView.model.rotate(-90);
				 this.options.cellView.model.set('positioning','horizontal');
			 }
		});
		freetransform.render();
		halo.render();
	});
}

function clear_property_form() {
	$("#inspector .bindable").unbind();
	
	//ANTONELLA: il nome del processo viene perso se si puliscono tutti i campi editabili
	//$("#inspector .editable").val("");

}

function initialize_selection_lazo() {
	selection = new Backbone.Collection;
	selectionView = new joint.ui.SelectionView({ 
		paper: paper, 
		graph: graph, 
		model: selection, 
		
		handles : [
			{ name: 'inspect', position: 'ne', icon: 'img/geometry_2.png', events: { 
				pointerdown: 'inspectElements' 
			} },
		]
	});

	paper.on('cell:pointerdown', function(cellView, evt, x, y) {
		  var cell = cellView.model;
	    
	    if ( cell instanceof BPMNBoundary){return;}
 

	    if (!cell.get('embeds') || cell.get('embeds').length === 0) {	
	        cell.toFront();
	    }
	    if (cell.get('parent')) {
	    	console.log("UNBED CELL");
	        graph.getCell(cell.get('parent')).unembed(cell);
	    }
	});
	
	paper.on('blank:pointerdown', selectionView.startSelecting);
	
	//paper.on('blank:pointerup',selectionView.stopSelecting);
	
	
	paper.on('cell:pointerup', function(cellView, evt) {
			
	if(cellView.model instanceof joint.dia.Link){
			
	}
		
	if(!(cellView.model instanceof joint.shapes.bpmn.Pool))
		 embedInPool(cellView.model);
		
		if ((evt.ctrlKey || evt.metaKey) && !(cellView.model instanceof joint.dia.Link)) {
			selection.add(cellView.model);
			selectionView.createSelectionBox(cellView);
		}
	});

	selectionView.on('selection-box:pointerdown', function(evt) {
		
			if (evt.ctrlKey || evt.metaKey) {
			
			var cell = selection.get($(evt.target).data('model'));
			selection.reset(selection.without(cell));
			selectionView.destroySelectionBox(paper.findViewByModel(cell));
		}
	});
	
	selectionView.on('selection-box:pointerup', function(evt) {
		
	});


	selectionView.on('action:inspect:pointerdown', function(evt) {
		$("#property-accordion").accordion({active: 3});
	});
}
function embedInPool(cell) {
    if (cell instanceof joint.dia.Link) return;

    var cellsBelow = graph.findModelsInArea(cell.getBBox());
    if (!_.isEmpty(cellsBelow)) {
       
    	var cellBelow = _.find(cellsBelow, function(c) {
            return (c instanceof joint.shapes.bpmn.Pool) && (c.id !== cell.id);
        });

    	if (cellBelow && cellBelow.get('parent') !== cell.id) {
            cellBelow.embed(cell);
            cell.toFront();
            
              _.each(cell.getEmbeddedCells(), function(c) {
               c.set('parent',cell.id);
               c.toFront();
             })   
            
        }
    }
}

function embedBoundaryOnTask(cell) {

    var cellsBelow = graph.findModelsInArea(cell.getBBox());
     if (!_.isEmpty(cellsBelow)) {
    	
     	var cellBelow = _.find(cellsBelow, function(c) {
    	
    		 return (c instanceof joint.shapes.bpmn.Activity) && (c.id !== cell.id);
        });

    	if (cellBelow instanceof joint.shapes.bpmn.Activity){
    		
    		console.log("SIZE EMBEDDE-->"+cellBelow.getEmbeddedCells().length);
    		
    		//permetto di inserire al massimo 4 eventi di tipo boundary su un task
    		if(cellBelow.getEmbeddedCells().length<4){
    		graph.addCell(cell); 
    		
    		  if (cellBelow && cellBelow.get('parent') !== cell.id) {
    	            cellBelow.embed(cell);
    	            cell.toFront();
    	        }
    		  
    		  var parentId = cell.get('parent');
    		  var parent = graph.getCell(parentId);
    		  parent.on('change:size', function(parent) {
    			  constrainPositionForBoundary(cell);
    			 
    			});
    		  
    		  parent.on('change:position', function(parent) {
    			  constrainPositionForBoundary(cell);
    			 
    			});
    		  
    		  cell.on('change:position', function(cell) {
    			  constrainPositionForBoundary(cell);
    			
    			});
    		  cell.on('change:size', function(cell) {
    			  cell.set('size', cell.previous('size'));
    			});
    		  
    		  cell.on('change:parent', function(cell) {
    			  cell.set('parent', cell.previous('parent'));
    			});
    		  	//posizionare l'elemento nell'angolo in basso 
    		  constrainPositionForBoundary(cell);
  			
    		}
    			
    	}
    	else{
    		//alert("Boundary Event MUST Be attached to a Task!");
    		
    	}
       
      
    }
//    else
//    	alert("Boundary Event MUST Be attached to a Task!");
    	
}

function constrainPositionForBoundary(cell){
	var parentId = cell.get('parent');
	var parent = graph.getCell(parentId);
    var parentBbox = parent.getBBox();
    var cellBbox = cell.getBBox();
    var parentPosition = parent.get('position');
    var parentSize=parent.get('size');
    var parentWidth=parent.get('size').width;
    var parentHeight=parent.get('size').height;
    var cellWidth=cell.get('size').width;
    var cellHeight=cell.get('size').height;

    //verifico se il parent contiene altri elementi di tipo boundary ed eventualmente li vengono riposizioanti l'uno accanto all'altro
    var i=0;
    _.each(parent.getEmbeddedCells(), function(cellEmb) {
    	cellEmb.set('position', { x:  ((parentPosition.x))+parentWidth-(cellWidth)-i, y:  parentPosition.y+parentHeight -(cellHeight/2)});
//    	cellEmb.set('position', { x:  ((parentPosition.x))+i, y:  parentPosition.y+parentHeight -(cellHeight/2)});
    	cellEmb.toFront();
    	i+=cellWidth;
        
      })   
      
//    cell.set('position', { x:  (parentPosition.x)+(parentWidth/2)-(cellWidth/2), y:  parentPosition.y+parentHeight -(cellHeight/2)})
//    cell.toFront();
}

function palette_add_compartment(id,label) {
	$("#palette-accordion").append("<h3>"+label+"</h3>");
	$("#palette-accordion").append("<div class='"+id+" element-compartment'> <table id='"+id+"-comp"+"'></table></div>");
}

function palette_add_item(comp_id,item_id,item_label,image_src,factory,factory_param) {
	$("#"+comp_id+"-comp").append("<tr id='drag"+item_id+"_container'></tr>");
	$("#drag"+item_id+"_container").append("<td id='drag"+item_id+"' class='drag_item' ><img src='"+image_src+"' width='80' height='50'></td>");
	$("#drag"+item_id+"_container").append("<td><p class='item-label'>"+item_label+"</p></td>");
	
	$("#drag"+item_id).draggable( {
    	helper : "clone",
    	
    	appendTo: "#page",
    		
    	start: function(e, ui) {
    		$(ui.helper).addClass("drag_item");
    	},
	
    	stop: function(event,ui) {
		  	
    		var element = factory(factory_param);

    		if (element != null) {
    			//verifico se l'elemento inserito è di tipo boundary e se è stato posizionato sopra un elemento di tipo task altrimento inibisco l'inserimento 
    			if(element instanceof BPMNBoundary){
    				embedBoundaryOnTask(element);
    				
    				
    			}else
    				{
    				graph.addCell(element); 
    				//verifico se è stato posizionato all'interno di un pool
    				if(!(element instanceof joint.shapes.bpmn.Pool))
    				embedInPool(element);
    				}
    			  		
    		}
    	}
    			
    });
}

function instance_graph_element(element) {
	if (element=="user-task") {
		var rect = new joint.shapes.basic.Rect({
	  		position: { x: drop_x, y: drop_y },
	  		size: { width: 100, height: 40 }
	  	});
		
		return rect;
	}
	
	return null;
}

function property_add_compartment(id) {
	$("#element-property").append("<div id='"+id+"-property' class='property-section'> </div>");
}

function property_add_input(comp_id,item_id,item_label) {
	$("#"+comp_id+"-property").append("<label class='property-field'>"+item_label+"</label>");
	$("#"+comp_id+"-property").append("<input id='"+comp_id+"-"+item_id+"' class='bindable editable property-field' name='"+item_id+"' type='text'  />");
}

function property_add_img_button(comp_id,item_id,item_label,img_source,action) {
	$("#"+comp_id+"-property").append("<div class='bindable property-field'><img id='"+comp_id+"-"+item_id+"' src='"+img_source+"' class='property-button' />"+item_label+"</div>");
	
	$("#"+comp_id+"-"+item_id).click( action );
}

function property_add_select(comp_id,item_id,item_label,data) {
	$("#"+comp_id+"-property").append("<label class='property-field'>"+item_label+"</label>");
	var select="<select id='"+comp_id+"-"+item_id+"' class='bindable editable property-field'>";
	select = select+"<option value='default'>----</option>";
	var i=0;
	while (i<data.length) {
		select = select + "<option value='"+data[i].name+"'>"+data[i].label+"</option>";
		i++;
	}
	select = select+"</select>";
					
	$("#"+comp_id+"-property").append(select);
}

function property_add_editable_list(comp_id,item_id,item_label,fields,data,add_dummy_row) {
	
	$("#"+comp_id+"-property").append("<label class='property-field'>"+item_label+"</label>");
	$("#"+comp_id+"-property").append("<table id='"+comp_id+"-"+item_id+"' class='property-field'></table>");
	
	
	var myfields = fields.concat({ type: "control", editButton: false, headerTemplate: add_dummy_row });
	
	  $("#"+comp_id+"-"+item_id).jsGrid({
			width: "190px",
			height: "380px",

			paging: true,
			editing: true,
			confirmDeleting: true,
			deleteConfirm: "Are you sure?",
			controller: {
		        loadData:$.noop,
		        insertItem:$.noop,
		        updateItem:function(item) {
		        	
		        	//ALERT MESSAGE IF EXIST AN ITEM WHITH THIS VALUE
		        	var count=0;
		        	for (i=0;i<data.length;i++){
		        		
		        		if(item!=data[i]){
		        			if(item['Name']==data[i]['Name'])
			        			alert("ITEM DUPLICATED");
		        			}
		        		}
		        	
		        
		        	$('#message-itemref').append($('<option>', {
		        	    value:item['Name'],
		        	    text:item['Name']+"-"+item['Type']
		        	}));
		        	
		        	$('#resource-itemref').append($('<option>', {
		        	    value:item['Name'],
		        	    text:item['Name']+"-"+item['Type']
		        	}));
		        	
		        	},
		        
		        deleteItem:  function(item,value) {
		        	if(value){
		        		
		        	}
		        	$("#message-itemref option[value='"+ item['Name']+"']").remove();
		        	$("#resource-itemref option[value='"+ item['Name']+"']").remove();
		        }
		    },
			data: data,

			fields: myfields
		});
	  
}

function property_add_slider(comp_id,item_id,item_label,start,min,max,action) {
	$("#"+comp_id+"-property").append("<label class='property-field'>"+item_label+"</label>");
	$("#"+comp_id+"-property").append("<div id='"+comp_id+"-"+item_id+"' class='property-field'></div>");
	
	$("#"+comp_id+"-"+item_id).slider({
		value: start,
		min: min,
		max: max,
		
		slide: function( event, ui ) {
        	action(ui.value);
     	}
	
	});
}



	
function property_add_header(comp_id,label) {
	$("#"+comp_id+"-property").append("<div class='property-field' style='font-size: smaller; text-align: center;'>"+label+"</div>");
}


function property_add_divider(comp_id,label) {
	$("#"+comp_id+"-property").append("<div class='property-field' style='font-size: smaller; text-align: center; margin-top: 15px;'>"+label+"</div>");
}

function hide_all_properties() {
	$(".property-section").hide();
}

function show_target_property(type) {
		hide_all_properties();
	if (type == null) {
		$("#no-element-property").show();
	} else {
		$("#"+type+"-property").show();
	}
}


