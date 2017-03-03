
/* Form Fillers */
var TaskElementFillForm = function(cellview) {

	$("#task-name").val(cellview.model.attributes.content);
	$("#task-name").bind('input', function() {
		cellview.model.set("content",$("#task-name").val());
	});
	
	$("#task-type").val(cellview.model.attributes.taskType);
	$("#task-type").change( function() {
		var type = $("#task-type").val();
		cellview.model.set( "taskType",type );

		if (type == 'script' ) {cellview.model.set("icon","script"); }
		else if (type == 'service' ) {cellview.model.set("icon","service"); }
		else if (type == 'manual' ) {cellview.model.set("icon","manual"); }
		else if (type == 'user' || type == 'manual') {cellview.model.set("icon","user")}
		else if (type == 'send' || type == 'receive') {cellview.model.set("icon","message")}
		else {cellview.model.set("icon","none")}
	});

	$("#task-participant").val(cellview.model.attributes.taskResource);
	$("#task-participant").bind('input', function() {
		cellview.model.set("taskResource",$("#task-participant").val());
	});

}

var GatewayElementFillForm = function(cellview) {
	$("#gateway-name").val(cellview.model.attributes.attrs[".label"].text);
	$("#gateway-name").bind('input', function() {
		cellview.model.attributes.attrs[".label"].text =$("#gateway-name").val();
		cellview.update();
	});
	
	$("#gateway-type").val(cellview.model.attributes.gatewayType);
	$("#gateway-type").change( function() {
		var type = $("#gateway-type").val();
		cellview.model.set( "gatewayType",type );
		if (type == 'exclusive') {cellview.model.set("icon","cross")}
		else if (type == 'parallel') {cellview.model.set("icon","plus")}
		else {cellview.model.set("icon","none")}
	});

}

var EventElementFillForm = function(cellview) {

	$("#event-name").val(cellview.model.attributes.attrs[".label"].text);
	$("#event-name").bind('input', function() {
		cellview.model.attributes.attrs[".label"].text =$("#event-name").val();
		cellview.update();
	});
	
	
	if (!(cellview.model instanceof BPMNBoundary)){
		$("#event-type").prop('disabled', false);

		$("#event-type").val(cellview.model.attributes.eventType);
		$("#event-type").change( function() {
			var type = $("#event-type").val();
			cellview.model.set( "eventType",type );
		});
	}else{
		$("#event-type").val(cellview.model.attributes.eventType);
		$("#event-type").prop('disabled', 'disabled');
	}
		
	

	
	$("#event-timer").val(cellview.model.attributes.timer_condition);
	$("#event-timer").bind('input', function() {
		cellview.model.attributes.timer_condition =$("#event-timer").val();
		cellview.update();
	});

	$("#event-condition").val(cellview.model.attributes.event_condition);
	$("#event-condition").bind('input', function() {
		cellview.model.attributes.event_condition =$("#event-condition").val();
		cellview.update();
	});
	
	$("#event-trigger_type").val(cellview.model.attributes.trigger_type);
	$("#event-trigger_type").change( function() {
		var trigger_type = $("#event-trigger_type").val();
		cellview.model.set( "trigger_type",trigger_type );	

	if (trigger_type == 'message' ) {cellview.model.set("icon","message"); }
	if (trigger_type == 'conditional' ) { cellview.model.set("icon","conditional"); }
	if (trigger_type == 'timer' ) { cellview.model.set("icon","timer"); }
	if (trigger_type == 'signal' ) { cellview.model.set("icon","signal"); }
	if (trigger_type == 'multiple' ) { cellview.model.set("icon","multiple"); }
	if (trigger_type == 'parallelmultiple' ) { cellview.model.set("icon","parallelmultiple"); }
	if (trigger_type == 'cancel' ) { cellview.model.set("icon","cross"); }
	if (trigger_type == 'error' ) { cellview.model.set("icon","error"); }
	if (trigger_type == 'terminate' ) { cellview.model.set("icon","terminate"); }
	if (trigger_type == 'escalation' ) { cellview.model.set("icon","escalation"); }
	if (trigger_type == 'compensation' ) {cellview.model.set("icon","compensation"); }

	});

}

var DataObjectElementFillForm = function(cellview) {
	$("#resource-name").val(cellview.model.attributes.dataName);
	$("#resource-name").bind('input', function() {
		var name = $("#resource-name").val();
		cellview.model.set( "dataName", name);

		var state = $("#resource-state").val();		
		var complete_name = name;
		if (state != '') {complete_name = name+"\n["+state+"]"}
	
		cellview.model.attributes.attrs[".label"].text =complete_name;
		cellview.update();
	});
	

	$("#resource-state").val(cellview.model.attributes.dataState);
	$("#resource-state").bind('input', function() {
		var state = $("#resource-state").val();		
		cellview.model.set( "dataState", state);

		var name = $("#resource-name").val();
		var complete_name = name;
		if (state != '') {complete_name = name+"\n["+state+"]"}
	
		cellview.model.attributes.attrs[".label"].text =complete_name;
		cellview.update();
	});
	
	$("#resource-itemref").val(cellview.model.attributes.dataItemRef);
	$("#resource-itemref").change( function() {
		
		var itemref = $("#resource-itemref").val();
		cellview.model.set( "dataItemRef",itemref );	

		
	});

}

var MessageElementFillForm = function(cellview) {
	$("#message-name").val(cellview.model.attributes.attrs[".label"].text);
	$("#message-name").bind('input', function() {
		cellview.model.attributes.attrs[".label"].text =$("#message-name").val();
		cellview.update();
	});
	
	$("#message-participant").val(cellview.model.attributes.participant);
	$("#message-participant").bind('input', function() {
		cellview.model.set("participant",$("#message-participant").val());
	});
	

	$("#message-sender").val(cellview.model.attributes.messageSender);
	$("#message-sender").bind('input', function() {
		cellview.model.set("messageSender",$("#message-sender").val());
	});
	 	
	$("#message-receiver").val(cellview.model.attributes.messageReceiver);
	$("#message-receiver").bind('input', function() {
		cellview.model.set("messageReceiver",$("#message-receiver").val());
	});
	
	$("#message-itemref").val(cellview.model.attributes.dataItemRef);
	$("#message-itemref").change( function() {
		
		var itemref = $("#message-itemref").val();
		cellview.model.set( "dataItemRef",itemref );	

		
	});
	
}

var LinkFillForm = function(cellview) {
	if (cellview.model.get("linkType") == "sequence-flow") { 
	
		$("#sequence-flow-name").val(cellview.model.attributes.labels[0].attrs.text.text);
		$("#sequence-flow-name").bind('input', function() {
			var label = $("#sequence-flow-name").val();
			last.model.label(0, { attrs: { text: { text: label } } });
		});
		
		$("#sequence-flow-condition").val((cellview.model.attributes.labels[1].attrs.text.text).slice(1, -1));
		$("#sequence-flow-condition").bind('input', function() {
			var label = '['+$("#sequence-flow-condition").val()+']';
			last.model.label(1, { attrs: { text: { text: label } } });
		});
	
	}
	
}

var PoolElementFillForm = function(cellview) {
		$("#pool-name").val(cellview.model.get('lanes').label);
	$("#pool-name").bind('input', function() {
//		cellview.model.set('lanes').label =$("#message-name").val();
		cellview.model.set('lanes',{label:$("#pool-name").val()})
		cellview.update();
	});
	
}



/* Element Factories */

var LinkFactory = function() {
	var element = new BPMNFlow();
	return element;
}


var TaskFactory = function(type) {
	myName = "basic "+type+" task";		
	if (type=="user" || type=="manual") {
		myIcon = "user";
	} else if (type == "send" || type == "receive") {
		myIcon = "message";
	 
	} else if (type == "service") {
		myIcon = "service";
	}else {
		myIcon = "none";
	}
	var element = new BPMNTask({
		position: { x: drop_x, y: drop_y },
		size: { width:120, height: 80 },
	
		icon: myIcon,
		content: myName,
		activityType: 'task',
	
		/* user defined */
		elementType: 'task',
		taskType: type,
		taskResource: ''
	});
	
	
	/*var element = new joint.shapes.bpmn.Activity({
		position: { x: drop_x, y: drop_y },
		size: { width:120, height: 80 },
		
		icon: myIcon,
	    content: myName,
	    activityType: 'task',
	    
	    elementType: 'task',
	    taskType: type,
	    taskResource: '',
	    
	});
	
	$.extend( element, {
		link_factory: LinkFactory,
		element_form: TaskElementFillForm,
		geometry_form: GeometryFillForm
	});*/
	
	return element;
}



var GatewayFactory = function(type) {
	if (type=="exclusive") {
		myIcon = "cross";
	} else if (type == "parallel") {
		myIcon = "plus";
	} else {
		myIcon = "none";
	}
	var element = new BPMNGateway({
		position: { x: drop_x, y: drop_y },
		size: { width:80, height: 80 },
		
		icon: myIcon,
	    
	    /* user defined */
	    elementType: 'gateway',
	    gatewayType: type
	    
	});
	
	return element;
}


var EventFactory = function(type) {
	var myName;
	if (type=="start") {myName="Start Event"}
	else if (type=="end") {myName="End Event"}
	else {myName=""};
	
	var element = new BPMNEvent({
		position: { x: drop_x, y: drop_y },
		size: { width:60, height: 60 },
	
		icon: 'none',
	    
	    attrs: {
	        '.label': { text: myName }
	    },

	    /* user defined */
	    elementType: 'event',
	    eventType: type,
	    trigger_type: '',
	    timer_condition:'',
	    event_condition:''
	    
	});
	
	return element;
}


var DataObjectFactory = function(type) {
	
	var element = new BPMNDataObject({
		position: { x: drop_x, y: drop_y },
		size: { width:50, height: 50 },
		
	    attrs: {
	        '.label': { text: 'Data Object' }
	    },

	    /* user defined */
	    elementType: 'resource',
	    dataName:'Data Object',
	    participant:'',
	    dataItemRef: '',
	    dataState:'',
	    
	});
	
	return element;
}


var MessageFactory = function(type) {
	
	var element = new BPMNMessage({
		position: { x: drop_x, y: drop_y },
		size: { width:70, height: 50 },
		
	    attrs: {
	        '.label': { text: 'Message' }
	    },

	    /* user defined */
	    elementType: 'message',
	    dataItemRef: '',
	    participant:'',
	    messageSender:'',
	    messageReceiver:''
	    
	});
	
	return element;
}


var BoundaryFactory = function() {
	var element = new BPMNBoundary({
		position: { x: drop_x, y: drop_y },
		size: { width:30, height: 30 },
		
		icon: 'none',
	    
	    attrs: {
	        '.label': { text: "" }
	    },

	    /* user defined */
	    elementType: 'event',
	    eventType: "intermediate",
	    trigger_type: '',
	    timer_condition:'',
	    event_condition:''
	    
	});

	return element;
}

var PoolFactory = function(alignment) {
			var element = new BPMNPool({
		position: { x: drop_x, y: drop_y },
		size: { width:400, height: 300 },
		elementType: 'pool',
		positioning: alignment,
		lanes: {
			label: 'Pool',
			sublanes: [
//			            {
//			                label: 'lane 1',
//			                name: 'myClass' // this lane has an unique css class and therefore can be targeted
//			                                // in attrs above
//			            },
//			            {
//			                label: 'lane',
//			                sublanes: [] // it may consist of another sublanes
//			            }
			        ]
		}
	});

		if(alignment=='vertical'){
			element.rotate(90);
			}
	return element;
}


//var BoundaryFactory = function(type) {
//	var myName;
//	if (type=="start") {myName="Start Event"}
//	else if (type=="end") {myName="End Event"}
//	else {myName=""};
//	
//	var element = new BPMNBoundary({
//		position: { x: drop_x, y: drop_y },
//		size: { width:60, height: 60 },
//		
//		icon: 'none',
//	    
//	    attrs: {
//	        '.label': { text: myName }
//	    },
//
//	    /* user defined */
//	    elementType: 'intermediate',
//	    eventType: type,
//	    trigger_type: '',
//	    timer_condition:'',
//	    event_condition:''
//	    
//	});
//	
//	return element;
//}

//var InstantiatePool = function() {
//	
//	
//	
//	console.log("instantiating a pool");
//	var element = new joint.shapes.bpmn.Pool({
//		position: { x: drop_x, y: drop_y },
//		size: { width:400, height: 300 },
//		
//		lanes: {
//			label: 'Pool',
//			sublanes: [
////			            {
////			                label: 'lane 1',
////			                name: 'myClass' // this lane has an unique css class and therefore can be targeted
////			                                // in attrs above
////			            },
//			            {
//			                label: 'lane',
//			                sublanes: [] // it may consist of another sublanes
//			            }
//			        ]
//		}
//	});
//
//	return element;
//}





var DoNothing = function() {
	return null;
}



/* BPMN ELEMENT DEFINITION */
BPMNTask = joint.shapes.bpmn.Activity.extend({
	link_factory: LinkFactory,
	element_form: TaskElementFillForm,
	geometry_form: GeometryFillForm
});

BPMNGateway = joint.shapes.bpmn.Gateway.extend({
	link_factory: LinkFactory,
	element_form: GatewayElementFillForm,
	geometry_form: GeometryFillForm
});

BPMNEvent = joint.shapes.bpmn.Event.extend({
	link_factory: LinkFactory,
	element_form: EventElementFillForm,
	geometry_form: GeometryFillForm
});

BPMNBoundary = joint.shapes.bpmn.Event.extend({
	link_factory: LinkFactory,
	element_form: EventElementFillForm,
	geometry_form: GeometryFillForm
});

BPMNPool = joint.shapes.bpmn.Pool.extend({
	link_factory: LinkFactory,
	element_form: PoolElementFillForm,
	geometry_form: GeometryFillForm
});


BPMNDataObject = joint.shapes.bpmn.DataObject.extend({
	link_factory: LinkFactory,
	element_form: DataObjectElementFillForm,
	geometry_form: GeometryFillForm
});

BPMNMessage = joint.shapes.bpmn.Message.extend({
	link_factory: LinkFactory,
	element_form: MessageElementFillForm,
	geometry_form: GeometryFillForm
});

BPMNFlow = joint.dia.Link.extend({
    defaults: {

        type: "bp.Flow",

        attrs: {

            '.marker-source': {
                d: 'M 0 0'
            },
            '.marker-target': {
                d: 'M 10 0 L 0 5 L 10 10 z',
                fill: '#000000'
            },
            '.connection': {
                'stroke-dasharray': ' ',
                'stroke-width': 1
            },
            '.connection-wrap': {
                style: '',
                onMouseOver: '',
                onMouseOut: ''
            }
        },
		labels: [
        	{ position: 0.5, attrs: { text: { text: '' } } },
        	{ position: 0.75, attrs: { text: { text: '' } } }
    	],
    
        elementType: "link",
        linkType: "",
        flowType: "normal",
        
    },

	element_form: LinkFillForm,
	geometry_form: DoNothing,

    initialize: function() {

        joint.dia.Link.prototype.initialize.apply(this, arguments);
        
    },
    
    instantiated: function() {
        this.listenTo(this, 'change:flowType', this.onFlowTypeChange);
        this.listenTo(this, 'change:source', function() { this.changeVertices(); } );
        this.listenTo(this, 'change:target', function() { this.changeVertices(); } );
        this.onFlowTypeChange(this, this.get('flowType'));
        this.changeVertices();
    },
    
    changeVertices: function() {
    		
    	    var sourceId = this.get('source').id;
			var targetId = this.get('target').id;
			
			if ( targetId == undefined) {
				this.set("flowType","errorLink");
			}
			else if
			 (sourceId != undefined && targetId != undefined) {
				this.setFlowType(sourceId,targetId);
			}
			
				
    },
    
    setFlowType: function(sourceId,targetId) {
    	console.log("CALL SET FLOW TYPE")
		var sourceCell = graph.getCell(sourceId);
		var sourceType = sourceCell.attributes.elementType;
		var targetCell = graph.getCell(targetId);
		var targetType = targetCell.attributes.elementType;
			if (sourceType=="task" || sourceType=="gateway" || sourceType=="event") {
			sourceType="flowElement";
		}
		if (targetType=="task" || targetType=="gateway" || targetType=="event") {
			targetType="flowElement";
		}
		
		//sequence-flow
		
		/* case1: sequence-flow */
		if ( sourceType=="flowElement" && targetType=="flowElement" ) {
			this.set("linkType","sequence-flow");
			this.set("flowType","normal");
			return;
		}
		
	
		/* case2: dataflow */
		if ( (sourceType=="flowElement" && targetType=="resource") || (sourceType=="resource" && targetType=="flowElement") ) {
			this.set("linkType","data-flow");
			this.set("flowType","dataflow");
			return;
		}

		/* case3: messageflow */
		if ( (sourceType=="flowElement" && targetType=="message") || (sourceType=="message" && targetType=="flowElement") || (sourceType=="pool" && targetType=="message") || (sourceType=="message" && targetType=="pool")) {
			this.set("linkType","message-flow");
			this.set("flowType","message");
			console.log("IS message-flow")
			return;
		}
		
		
//		/* case4: poolSource */
		if ( (sourceType=="pool" && targetType!="message")|| (targetType=="pool" && sourceType!="message")) {
		
			this.set("flowType","errorLink");
			return;
		}
	
		this.set("flowType","normal");
    },

    onFlowTypeChange: function(cell, type) {
     console.log("CALL onFlowTypeChange: "+ type)
    	var attrs;

        switch (type) {

        case 'default':

            attrs = {
                '.marker-source': {
                    d: 'M 0 5 L 20 5 M 20 0 L 10 10',
                    fill: 'none'
                }
            };

            break;

        case 'conditional':

            attrs = {
                '.marker-source': {
                    d: 'M 20 8 L 10 0 L 0 8 L 10 16 z',
                    fill: '#FFF'
                }
            };

            break;

        case 'normal':

        	attrs = {
                '.marker-target': {
                    fill: '#000000',
                    stroke: '#000000'
                },
                '.connection': {
                	stroke: '#000000'
                }
        };

            break;

        case 'dataflow':

            attrs = {
                '.marker-target': {
                    fill: '#FFF',
                    stroke: '#000000'
                },
                
                '.connection': {
                	stroke: '#000000'
                }
            /*,
                '.connection': {
                    'stroke-dasharray': '4,4'
                }*/
            };

            break;

        case 'message':

            attrs = {
                '.marker-target': {
                    fill: '#FFF',
                    stroke: '#000000'
                },
                '.connection': {
                    'stroke-dasharray': '4,4',
                    stroke: '#000000'
                }
            };

            break;

        case 'association':

            attrs = {
                '.marker-target': {
                    d: 'M 0 0',
                    stroke: '#000000'
                },
                '.connection': {
                    'stroke-dasharray': '4,4',
                    stroke: '#000000'
                }
            };

            break;

        case 'conversation':

            // The only way how to achieved 'spaghetti insulation effect' on links is to
            // have the .connection-wrap covering the inner part of the .connection.
            // The outer part of the .connection then looks like two parallel lines.
            attrs = {
                '.marker-target': {
                    d: 'M 0 0'
                },
                '.connection': {
                    'stroke-width': '7px'
                },
                '.connection-wrap': {
                    // As the css takes priority over the svg attributes, that's only way
                    // how to overwrite default jointjs styling.
                    style: 'stroke: #fff; stroke-width: 5px; opacity: 1;',
                    onMouseOver: "var s=this.style;s.stroke='#000';s.strokeWidth=15;s.opacity=.4",
                    onMouseOut: "var s=this.style;s.stroke='#fff';s.strokeWidth=5;s.opacity=1"
                }
            };

            break;

        case 'errorLink':
        	  attrs = {
                '.marker-target': {
                    fill: '#FF0000',
                    stroke: '#FF0000'
                },
                '.connection': {
                	stroke: '#FF0000'
                }
        };


            break;
        default:

            throw "BPMN: Unknown Flow Type: " + type;
        }

        cell.attr(_.merge({}, this.defaults.attrs, attrs));
    }

});


/**
 * customization for BPMN 2.0
 */

function populate_palette_with_BPMN() {

	palette_add_compartment("task","TASK");
	palette_add_item("task","user-task","User Task","img/element/usertask.png",TaskFactory,"user");
	palette_add_item("task","service-task","Service Task","img/element/servicetask.png",TaskFactory,"service");
	palette_add_item("task","receive-task","Receive Task","img/element/messagetask.png",TaskFactory,"receive");
	palette_add_item("task","send-task","Send Task","img/element/messagetask.png",TaskFactory,"send");

	palette_add_compartment("gateway","GATEWAY");
	palette_add_item("gateway","exc-gateway","Exclusive Gateway","img/element/xgateway.png",GatewayFactory,"exclusive");
	palette_add_item("gateway","par-gateway","Parallel Gateway","img/element/pgateway.png",GatewayFactory,"parallel");

	palette_add_compartment("event","EVENT");
	palette_add_item("event","start-event","Start Event","img/element/startevent.png",EventFactory,"start");
	palette_add_item("event","end-event","End Event","img/element/endevent.png",EventFactory,"end");
	palette_add_item("event","intermediate","Intermediate Event","img/element/intermediateevent.png",EventFactory,"intermediate");
	palette_add_item("event","boundary","Boundary Event","img/element/intermediateevent.png",BoundaryFactory,"boundary");

//	palette_add_compartment("boundary","BOUNDARY");
//	palette_add_item("boundary","boundary","Boundary Event","img/element/intermediateevent.png",BoundaryFactory,"boundary");

	palette_add_compartment("resource","RESOURCE");
	palette_add_item("resource","data-object","Data Object","img/element/dataobject.png",DataObjectFactory,"dataobject");
	palette_add_item("resource","message","Message","img/element/message.png",MessageFactory,"message");

	palette_add_compartment("pool","POOL");
//	palette_add_item("pool","user-pool","USER POOL","img/pool.png",InstantiatePool);
	palette_add_item("pool","user-pool","Horizontal Pool","img/element/pool_horizontal.png",PoolFactory,"horizontal");
	palette_add_item("pool","vertical-user-pool","Vertical Pool","img/element/pool_vertical.png",PoolFactory,"vertical");

}

function populate_property_with_BPMN() {
	property_add_compartment("task");
	property_add_input("task","name","task name: ");
	property_add_select("task","type","task type: ",[ 
	                                                 { name: "user", label: "User" }, 
	                                                 { name: "manual", label: "Manual" }, 
	                                                 { name: "service", label: "Service" }, 
	                                                 { name: "script", label: "Script" }, 
	                                                 { name: "send", label: "Send" }, 
	                                                 { name: "receive", label: "Receive" }, 
	                                                 { name: "reference", label: "Reference" }
	                                                 ] );
	property_add_input("task","participant","participant: ");

	property_add_compartment("resource");
	property_add_input("resource","name","resource name: ");
	property_add_select("resource","itemref","item ref: ",[] );
	property_add_input("resource","state","resource state: ");

	property_add_compartment("message");
	property_add_input("message","name","message name: ");
	property_add_select("message","itemref","item ref: ",[] );
	property_add_input("message","participant","participant: ");
	property_add_input("message","sender","message sender: ");
	property_add_input("message","receiver","message receiver: ");

	property_add_compartment("event");
	property_add_input("event","name","event name: ");
	property_add_select("event","type","event type: ",[ 
	                                                   { name: "start", label: "Start" }, 
	                                                   { name: "intermediate", label: "Intermediate" }, 
	                                                   { name: "end", label: "End" }		] );
	property_add_select("event","trigger_type","triggering: ",[ 
	                                                           { name: "message", label: "Message" }, 
	                                                           { name: "conditional", label: "Conditional" }, 
	                                                           { name: "timer", label: "Timer" }, 
	                                                           { name: "signal", label: "Signal" }, 
	                                                           { name: "multiple", label: "Multiple" }, 
	                                                           { name: "parallelmultiple", label: "Parallel Multiple" }, 
	                                                           { name: "cancel", label: "Cancel" }, 
	                                                           { name: "error", label: "Error" }, 
	                                                           { name: "terminate", label: "Terminate" }, 
	                                                           { name: "escalation", label: "Escalation" }, 
	                                                           { name: "compensation", label: "Compensation" }
	                                                           ] );
	property_add_input("event","timer","timer condition: ");
	property_add_input("event","condition","event condition: ");

	property_add_compartment("gateway");
	property_add_input("gateway","name","gateway name: ");
	property_add_select("gateway","type","gateway type: ",[ 
	                                                       { name: "exclusive", label: "Exclusive" }, 
	                                                       { name: "inclusive", label: "Inclusive" }, 
	                                                       { name: "parallel", label: "Parallel" }		] );


	property_add_compartment("sequence-flow");
	property_add_input("sequence-flow","name","label: ");
	property_add_input("sequence-flow","condition","condition: ");


	property_add_compartment("link");
	property_add_input("link","name","link label: ");
	
	property_add_compartment("pool");
	property_add_input("pool","name","pool label: ");

	show_target_property(null);
}
