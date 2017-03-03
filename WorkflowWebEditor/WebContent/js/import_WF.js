/**
 * 
 */

function readLocalFile(fileName){
	location.href='Main.html?fileName='+fileName;
}
	
function newFileConfirm(){
	
	if(confirm('Are you sure you want to edit a new WF?Be aware, if you press "OK" now, ALL your changes will be lost!Press Cancel to stay on the current page')){
		location.href='Main.html';
		//window.location.reload();  
	}
}

function openfileDialog() {
    $("#fileLoader").click();
}
 function drawWF(jsonVar){
	 

		//var jsonVar = data;
		
		drop_x=0;
		drop_y=0;
		//SET THE PROCESS NAME
		$('#process-process-name').val(jsonVar.process_name);
		
		//LOAD ALL ITEMS DEFINTIONS 
		for (i=0; i<jsonVar.items.length; i++) {
			var item = jsonVar.items[i];
			$("#process-data-item").jsGrid("insertItem", {"Name":item.Name, "Type": item.Type});
			//inserisco tali valori anche nelle relative select di interesse (per dataobject e message element)
			$('#message-itemref').append($('<option>', {
	 	    value:item['Name'],
	 	    text:item['Name']+"-"+item['Type']
	 	}));
	 	
	 	$('#resource-itemref').append($('<option>', {
	 	    value:item['Name'],
	 	    text:item['Name']+"-"+item['Type']
	 	}));
	 	
		}
		
		//LOAD ALL GRAPH ELEMENT
		for (i=0; i<jsonVar.cells.length; i++) {
			var item = jsonVar.cells[i];
			
			if (item.elementType == "task") {
				var element = TaskFactory(item.taskType);
				element.set("id",item.id);
				element.set("content",item.content);
				element.set("participant",item.participant);
				element.set("taskResource",item.taskResource);
				element.resize( item.size.width, item.size.height );
				element.translate(item.position.x,item.position.y);
				if (element != null) {
	 			graph.addCell(element);   		
	 		}
			}
		
			if (item.elementType == "gateway") {
				
				var element = GatewayFactory(item.gatewayType);
				element.set("id",item.id);
				if(item.attrs[".label"])
				element.attributes.attrs[".label"].text=item.attrs[".label"].text;
				element.resize( item.size.width, item.size.height );
				element.translate(item.position.x,item.position.y);
				if (element != null) {
				
	 			graph.addCell(element);   		
	 		}
			}
			
			    	
			if (item.elementType == "event") {
							
				var element = EventFactory(item.eventType);
				element.set("id",item.id);
				if(item.attrs[".label"])
				element.attributes.attrs[".label"].text=item.attrs[".label"].text;
			
				element.set("trigger_type",item.trigger_type);
				element.set("timer_condition",item.timer_condition);
				element.set("event_condition",item.event_condition);
				element.resize( item.size.width, item.size.height );
				element.translate(item.position.x,item.position.y);
				if (element != null) {
				   graph.addCell(element);   		
				}
			}
			
			if (item.elementType == "resource") {
				var element = DataObjectFactory("dataobject");
				element.set("id",item.id);
				if(item.attrs[".label"])
				element.attributes.attrs[".label"].text=item.attrs[".label"].text;
				element.set("dataItemRef",item.dataItemRef);
				element.set("dataState",item.dataState);
				element.resize( item.size.width, item.size.height );
				element.translate(item.position.x,item.position.y);
				if (element != null) {
				   graph.addCell(element);   		
				}
			}	
			if (item.elementType == "message") {
				var element = MessageFactory("message");
				element.set("id",item.id);
				if(item.attrs[".label"])
				element.attributes.attrs[".label"].text=item.attrs[".label"].text;
				element.set("dataItemRef",item.dataItemRef);
				element.set("participant",item.participant);
				element.set("messageSender",item.messageSender);
				element.set("messageReceiver",item.messageReceiver);
				element.resize( item.size.width, item.size.height );
				element.translate(item.position.x,item.position.y);
				if (element != null) {
				   graph.addCell(element);   		
				}
			}
			
			
			
		}
	for (i=0; i<jsonVar.cells.length; i++) {
			var item = jsonVar.cells[i];
		if (item.elementType == "link") {
				
				
				var element =LinkFactory();
				element.set("id",item.id);
				element.set("linkType",item.linkType);
				element.set("flowType","normal");
				element.attributes.labels[0].attrs.text.text=item.labels[0].attrs.text.text;
				element.attributes.labels[1].attrs.text.text=item.labels[1].attrs.text.text;
				
				//verifico che il link sia associato ad un elemento altrimenti imposto le corrdiante x-y 
				element.set("source", { id: item.source.id } ); 
				if(item.target.id){
					element.set("target", { id: item.target.id } ); 
					element.setFlowType( item.source.id , item.target.id);
				}
				
			   else
				   element.set('target', { x:item.target.x , y:item.target.y});
				
				
				element.onFlowTypeChange(element,item.flowType);
				
				//SET LABEL E CONDITION FOR LINK ....
				
				if (element != null) {
				   graph.addCell(element);   
				}
				
			//	console.log("graph -->"+JSON.stringify(graph));

				
			}
		}
			//graph.fromJSON(JSON.parse(jsonString))
//			

		
	 
 }
function showWF(fileName){
	var url="./testCase/"+fileName;
	
	jQuery.get(url, function(data) { 
		
		drawWF(data)

	});

	
}
function loadWF(){
	//INIZIALE A NEW GRAPH
	graph.clear()
	console.log("LOAD DIAGRAM")
	var file_input=document.getElementById("fileLoader").files[0];
	var fileReader = new FileReader();
	
	fileReader.onload = function(fileLoadedEvent) 
	{
		var jsonString = fileLoadedEvent.target.result;
		var jsonVar = JSON.parse(jsonString);
		drawWF(jsonVar)

	};
	fileReader.readAsText(file_input, "UTF-8");
			
			
};


function saveDiagramm(){
	console.log("SAVE DIAGRAM")

	
	//var graphdate=JSON.stringify(graph);
	
		
	var itemsGrid = $("#process-data-item").jsGrid("option", "data");
	var itemsDataSting='{"items":'+JSON.stringify(itemsGrid)+'}';
	
	var itemJson=JSON.parse(itemsDataSting)
	var graphToSave=graph;
	
    var result=$.extend({}, graph.toJSON(),itemJson);
    result["process_name"]=$('#process-process-name').val()
	var graphdate=JSON.stringify(result);
	var textFileAsBlob = new Blob([graphdate], {type:'text/plain'});
		
	if($('#process-process-name').val()=="")
		alert("PROCESS NAME IS EMPTY!");
	else{
		
	var fileNameToSaveAs = $('#process-process-name').val()+".json";
	
	var downloadLink = document.createElement("a");
	downloadLink.download = fileNameToSaveAs;
	downloadLink.innerHTML = "Download File";
	if (window.webkitURL != null)
	{
		downloadLink.href = window.webkitURL.createObjectURL(textFileAsBlob);
	}
	else
	{
		downloadLink.href = window.URL.createObjectURL(textFileAsBlob);
		downloadLink.style.display = "none";
		document.body.appendChild(downloadLink);
	}
	
	downloadLink.click();
	}

};

