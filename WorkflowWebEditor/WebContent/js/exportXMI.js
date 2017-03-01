/**
 * 
 */
 var idProcess='PROCESS_1'
	 

function exportXMINewId(){
	       	var  xmlWriter=createXMIFile();
			if(xmlWriter){
				
				
			var textFileAsBlob = new Blob([xmlWriter.flush()], {type:'text/xml'});
			if($('#process-process-name').val()=="")
				alert("PROCESS NAME IS EMPTY!");
			else{
			var fileNameToSaveAs = $('#process-process-name').val()+"_BPMN";

			saveAs(textFileAsBlob, fileNameToSaveAs);
			
//			var fileNameToSaveAs = "FileXML";
//
//			var downloadLink = document.createElement("a");
//			downloadLink.download = fileNameToSaveAs;
//			downloadLink.innerHTML = "Download File";
//			if (window.webkitURL != null)
//			{
//				downloadLink.href = window.webkitURL.createObjectURL(textFileAsBlob);
//			}
//			else
//			{
//				
//				downloadLink.href = window.URL.createObjectURL(textFileAsBlob);
//				downloadLink.style.display = "none";
//				document.body.appendChild(downloadLink);
//			}
//
//			downloadLink.click();
			}
			}
	
}



function createXMIFile(){
	
	 var xmlWriter = new  XMLWriter('MacRoman', '1.0');
	 
	 //TODO : insert iterm ref for all item definition in the process
	 // <itemDefinition id="itemRFQMessage" structureRef="myData:rfqRequest">
	insertHeader(xmlWriter);
	insertBoby(xmlWriter);
	//chiudo tag definitions
	xmlWriter.writeEndElement();
	xmlWriter.writeEndDocument();
	return xmlWriter;
	
}


function insertHeader(xmlWriter){

	 xmlWriter.writeStartDocument(false);
	
	 xmlWriter.writeStartElement( 'definitions' );
	 xmlWriter.writeAttributeString('xmlns', 'http://www.omg.org/spec/BPMN/20100524/MODEL');
	 xmlWriter.writeAttributeString('xmlns:bpmndi', 'http://www.omg.org/spec/BPMN/20100524/DI');
	 xmlWriter.writeAttributeString('xmlns:dc', 'http://www.omg.org/spec/DD/20100524/DC');
	 xmlWriter.writeAttributeString('xmlns:di', 'http://www.omg.org/spec/DD/20100524/DI');
	 xmlWriter.writeAttributeString('xmlns:tns', 'http://sourceforge.net/bpmn/definitions/_1419237461760');
	 xmlWriter.writeAttributeString('xmlns:xsd', 'http://www.w3.org/2001/XMLSchema');
	 xmlWriter.writeAttributeString('xmlns:xsi', 'http://www.w3.org/2001/XMLSchema-instance');
	 xmlWriter.writeAttributeString('xmlns:yaoqiang', 'http://bpmn.sourceforge.net');
		
	 xmlWriter.writeAttributeString('exporter', '');
	 xmlWriter.writeAttributeString('xmlns:xsi', 'http://www.w3.org/2001/XMLSchema-instance');
	 xmlWriter.writeAttributeString('exporterVersion', '2.2.5 (GPLv3, Non-Commercial)');
		
	 xmlWriter.writeAttributeString('expressionLanguage', 'http://www.w3.org/1999/XPath');
	
	 var  id =Math.floor((Math.random() * 100000000) + 1);
	
	 xmlWriter.writeAttributeString('id','_'+ id.toString());
	 xmlWriter.writeAttributeString('name', '');
	 xmlWriter.writeAttributeString('targetNamespace', 'http://sourceforge.net/bpmn/definitions/_1419237461760');
	 xmlWriter.writeAttributeString('typeLanguage', 'http://www.omg.org/spec/BPMN/20100524/MODEL http://bpmn.sourceforge.net/schemas/BPMN20.xsd');
	 xmlWriter.writeAttributeString('xsi:schemaLocation', 'http://www.omg.org/spec/BPMN/20100524/MODEL http://bpmn.sourceforge.net/schemas/BPMN20.xsd');

}

idMap = {}
function populateMap(idMap)
{
	 var idElement="";
	 var incrementId=0;
	
	var allElements=graph.getElements();
	_.each(allElements, function (element) {
		
		idElement="_"+incrementId++;
			idMap[element.id] = idElement;
	
	});
	
		
	 
  var allLinks=graph.getLinks();
	_.each(allLinks, function (link) {
		idElement="_"+incrementId++;
		idMap[link.id] = idElement;
	});	
		return idMap;
}

function defineItemTagElement(xmlWriter)
{
	
	var itemsGrid = $("#process-data-item").jsGrid("option", "data");
	
	var itemsDataSting='{"items":'+JSON.stringify(itemsGrid)+'}';
	
	var jsonVar = JSON.parse(itemsDataSting);
	
	for (i=0; i<jsonVar.items.length; i++) {
		var item = jsonVar.items[i];
		
		 xmlWriter.writeStartElement('itemDefinition' );
		 

	 xmlWriter.writeAttributeString('id',item['Name']);
	 xmlWriter.writeAttributeString('itemKind', item['Type']);
	 xmlWriter.writeAttributeString('structureRef', item['Name']);

    xmlWriter.writeEndElement();
	
	}

	
}
function insertBoby(xmlWriter){
	
	 var processName = $('#process-process-name').val();
	
	 //Map each element to an unique id
	
	 idMap=new Array;
	 
		idMap=populateMap(idMap);
		defineItemTagElement(xmlWriter);
	
		var allElements=graph.getElements();
		_.each(allElements, function (element) {
//			TODO : insert message and itemRef if present
//			 <message id="msgRFQ" name="RFQ Message" itemRef="tns:itemRFQMessage"/>
			
			if(element instanceof BPMNMessage){
			defineMessageElement(xmlWriter,element,idMap);
			}
			
		});	 
		
		 xmlWriter.writeStartElement( 'process' );
		 //ONLY ONE POOL IS CONSIDERED
		
		 xmlWriter.writeAttributeString('id',idProcess);
		 xmlWriter.writeAttributeString('name',processName);
		 xmlWriter.writeAttributeString('isClosed','false');
		 xmlWriter.writeAttributeString('isExecutable','true');
		 xmlWriter.writeAttributeString('processType','None');
		  
		 defineFlowElement(xmlWriter,idMap);
		_.each(allElements, function (element) {
			
			if(element instanceof BPMNDataObject){
				defineDataObjectElement(xmlWriter,element,idMap);
			}
			if(element instanceof BPMNTask){
			defineTaskElement(xmlWriter,element,idMap);
			}
			if(element instanceof BPMNGateway){
			defineGatewayElement(xmlWriter,element,idMap);
			}
			
			if(element instanceof BPMNEvent){
				defineEventElement(xmlWriter,element,idMap);
			}
//			if(element instanceof BPMNMessage){
//				defineMessageElement(xmlWriter,element,idMap);
//			}
			
		});
		
		//chiudo il tag process
		 xmlWriter.writeEndElement();
		
}
function defineMessageElement(xmlWriter,element,idMap){
	//INSERT MESSAGE ELEMENT		
	if(element instanceof BPMNMessage){
 xmlWriter.writeStartElement('message' );
		 xmlWriter.writeAttributeString('id', idMap[element.id]);
		 xmlWriter.writeAttributeString('name',  element.attr(".label/text"));
		 if(element.get("dataItemRef")!=="" )
			 xmlWriter.writeAttributeString('itemRef', element.get("dataItemRef"));

		 xmlWriter.writeEndElement();
		
	}
	
}

function defineDataObjectElement(xmlWriter,element,idMap){
	//INSERT DATAOBJECT ELEMENT		
		if(element instanceof BPMNDataObject){

			 xmlWriter.writeStartElement('dataObject');
			 xmlWriter.writeAttributeString('id', "DO_"+idProcess+idMap[element.id]);
			 xmlWriter.writeAttributeString('isCollection','false');
			 //elimino dal nome del data Object l'eventuale stato presente
			 var dataObjectname=element.attr(".label/text").substring(0,element.attr(".label/text").indexOf("["));
			 xmlWriter.writeAttributeString('name', dataObjectname);
			// xmlWriter.writeAttributeString('name', element.attr(".label/text"));
			 if(element.get("dataItemRef")!=="")
				 xmlWriter.writeAttributeString('itemSubjectRef',element.get("dataItemRef"));

			 xmlWriter.writeEndElement();
			 var dataObjectId=idMap[element.id];
			 xmlWriter.writeStartElement('dataObjectReference' );
			 xmlWriter.writeAttributeString('dataObjectRef',"DO_"+idProcess+dataObjectId);
			 xmlWriter.writeAttributeString('id', idMap[element.id]);
			 //se contiene uno state allora aggiungo il tag dataState
			 if(element.get('dataState')!==""){
				 xmlWriter.writeStartElement('dataState' );
				 xmlWriter.writeAttributeString('name', element.get('dataState'));
				 xmlWriter.writeEndElement();
			 }
			 //chiudo dataObjectReference
			 xmlWriter.writeEndElement();
			 
			}
}

function defineEventElement(xmlWriter,element,idMap){
	var eventType=element.get('eventType');
	var eventTag='startEvent';
	if(eventType==='end')
		eventTag='endEvent';
	
	
	 xmlWriter.writeStartElement(eventTag );
	 xmlWriter.writeAttributeString('id', idMap[element.id]);
	 xmlWriter.writeAttributeString('name',element.attr('.label/text'));
	 var eventTriggerType=element.get('trigger_type');
	 if(eventTriggerType==='parallelmultiple')
		 xmlWriter.writeAttributeString('parallelMultiple', 'true');
	 else if(eventType==='start'||eventType==='intermediate')
	  xmlWriter.writeAttributeString('parallelMultiple', 'false');
	 if(eventType==='start')
		 xmlWriter.writeAttributeString('isInterrupting', 'true');
	 if(eventType==='intermediate')
		 xmlWriter.writeAttributeString('isInterrupting', 'false');
	 allTagLink(element,xmlWriter,idMap);
		
	switch (eventTriggerType) {

    case 'message':
    	 xmlWriter.writeStartElement('messageEventDefinition' );
    	 xmlWriter.writeAttributeString('id', idMap[element.id]+'_EM_1');
    	 xmlWriter.writeEndElement();
    	break;
    case 'timer':
    	 xmlWriter.writeStartElement('timerEventDefinition ' );
    	 xmlWriter.writeAttributeString('id', idMap[element.id]+'_ET_1');
    	 xmlWriter.writeEndElement();
    	break;
    case 'conditional':
    	 xmlWriter.writeStartElement('conditionalEventDefinition ' );
    	 xmlWriter.writeAttributeString('id', idMap[element.id]+'_EC_1');
    	 xmlWriter.writeEndElement();
    	break;
    case 'signal':
    	 xmlWriter.writeStartElement('signalEventDefinition ' );
    	 xmlWriter.writeAttributeString('id', idMap[element.id]+'_ES_1');
    	 xmlWriter.writeEndElement();
    	break;
    	
    case 'error':
    	 xmlWriter.writeStartElement('errorEventDefinition  ' );
    	 xmlWriter.writeAttributeString('id', idMap[element.id]+'_EER_1');
    	 xmlWriter.writeEndElement();
    	break;
    	
    case 'compensation':
    	 xmlWriter.writeStartElement('compensateEventDefinition  ' );
    	 xmlWriter.writeAttributeString('id', idMap[element.id]+'_ECM_1');
    	 xmlWriter.writeEndElement();
    	break;
    	
    case 'terminate':
    	 xmlWriter.writeStartElement('terminateEventDefinition   ' );
    	 xmlWriter.writeAttributeString('id', idMap[element.id]+'_ET_1');
    	 xmlWriter.writeEndElement();
    	break;
    case 'escalation':
    	 xmlWriter.writeStartElement('escalationEventDefinition ' );
    	 xmlWriter.writeAttributeString('id', idMap[element.id]+'_ET_1');
    	 xmlWriter.writeEndElement();
    	break;
    }
	
	 xmlWriter.writeEndElement();
}
function defineGatewayElement(xmlWriter,element,idMap){
	
	var gatewayType=element.get('gatewayType');
	var gatewayTag='exclusiveGateway';
	if(gatewayType==='parallel')
		gatewayTag='parallelGateway';
	if(gatewayType==='inclusive')
		gatewayTag='inclusiveGateway';
	
	 xmlWriter.writeStartElement(gatewayTag);
	 xmlWriter.writeAttributeString('id', idMap[element.id]);
	
	 xmlWriter.writeAttributeString('name',element.attr('.label/text'));
	 if(gatewayType==='inclusive')
	 xmlWriter.writeAttributeString('gatewayDirection', 'Unspecified');
	 else
		 xmlWriter.writeAttributeString('gatewayDirection', 'Diverging');
	
	 allTagLink(element,xmlWriter,idMap);
	 xmlWriter.writeEndElement();
}

function defineFlowElement(xmlWriter,idMap){
	 var allLinks=graph.getLinks();
		_.each(allLinks, function (link) {

			var typelink=link.get('linkType');
			if(typelink==='sequence-flow'){
				xmlWriter.writeStartElement('sequenceFlow' );
				 xmlWriter.writeAttributeString('id', idMap[link.id]);
				 xmlWriter.writeAttributeString('sourceRef', idMap[link.get('source').id]);
				 xmlWriter.writeAttributeString('targetRef', idMap[link.get('target').id]);
				 xmlWriter.writeAttributeString('name', link.attributes.labels[0].attrs.text.text);
				 if(link.attributes.labels[1].attrs.text.text!==""){
					// xmlWriter.writeStartElement('conditionExpression' );
					 xmlWriter.writeElementString('conditionExpression',(link.attributes.labels[1].attrs.text.text).slice(1, -1));
					 
					// xmlWriter.writeEndElement();
				 }
				 xmlWriter.writeEndElement();
			}
			
			if(typelink==='message-flow'){
				xmlWriter.writeStartElement('association' );
				 xmlWriter.writeAttributeString('id', idMap[link.id]);
				 xmlWriter.writeAttributeString('sourceRef', idMap[link.get('source').id]);
				 xmlWriter.writeAttributeString('targetRef',idMap[ link.get('target').id]);
				 xmlWriter.writeAttributeString('associationDirection', 'None');
				 xmlWriter.writeEndElement();
			}
			
		});
		
}

function defineTaskElement(xmlWriter,element,idMap){
	
	
		var taskType=element.get("taskType");
		var taskTag='';
		var taskRepositoryID=element.attr('.typeId/text');
		if(taskType==='default')
			 taskTag='task';
		else
			 taskTag=taskType+'Task';
		 xmlWriter.writeStartElement(taskTag );
		 xmlWriter.writeAttributeString('completionQuantity','1');
		 xmlWriter.writeAttributeString('id', idMap[element.id]);
		 xmlWriter.writeAttributeString('isForCompensation','false');
		 xmlWriter.writeAttributeString('name', element.get("content"));
		 xmlWriter.writeAttributeString('startQuantity','1');
		
		 if(element.get('taskType')==='receive'||element.get('taskType')==='send'||element.get('taskType')==='service'||element.get('taskType')==='user')
			 xmlWriter.writeAttributeString('implementation','##WebService');
		 if(element.get('taskType')==='receive')
			 xmlWriter.writeAttributeString('instantiate','false');
		
		 
		 //aggiungo il tag relativo ai link in ingresso ed in uscita
	
		 allTagLink(element,xmlWriter,idMap);
	
		 allTagLinkDataObject(element,xmlWriter,idMap);
		 
		 
		 //TODO---> gestire le risorse come gli items ??? CHIEDERE A LUCA
		 //inserisco i tag humanPerformer se l'elemento ha un ruolo associato
//		 console.log("RUOLO ASSOCIATO AD UN TASK:"+element.get("taskResource"));
//		 if(element.get("taskResource")!==""){
//			 xmlWriter.writeStartElement('humanPerformer');
//			 xmlWriter.writeAttributeString('id', idMap[element.id]+"_RES");
//			 xmlWriter.writeElementString('resourceRef',element.get("taskResource"));
//			 xmlWriter.writeEndElement();
//		 }
		 
//			end tag task
		 xmlWriter.writeEndElement();
		 
		 //aggiungo il tag relativo agli eventi di tipo boundary eventualmente presenti
		 allBoundaryEvent(element,xmlWriter,idMap);

	
}

function allBoundaryEvent(element,xmlWriter,idMap){
_.each(element.getEmbeddedCells(), function(cellEmb) {

	 xmlWriter.writeStartElement('boundaryEvent');
	 xmlWriter.writeAttributeString('attachedToRef',idMap[ element.id]);
	 xmlWriter.writeAttributeString('cancelActivity',"true");
	 xmlWriter.writeAttributeString('id', idMap[cellEmb.id]);
	
	 
	 
	 if(element.attr('.label/text'))
	 xmlWriter.writeAttributeString('name',element.attr('.label/text'));
	 else
		 xmlWriter.writeAttributeString('name','');
	 
	 var eventTriggerType=element.get('trigger_type');
	 if(eventTriggerType==='parallelmultiple')
		 xmlWriter.writeAttributeString('parallelMultiple', 'true');
	 else
		 xmlWriter.writeAttributeString('parallelMultiple', 'false');
		
	switch (eventTriggerType) {

    case 'message':
    	 xmlWriter.writeStartElement('messageEventDefinition' );
    	 xmlWriter.writeAttributeString('id', idMap[element.id]+'_ED_1');
    	 xmlWriter.writeEndElement();
    	break;
    case 'timer':
    	 xmlWriter.writeStartElement('timerEventDefinition ' );
    	 xmlWriter.writeAttributeString('id', idMap[element.id]+'_ED_1');
    	 xmlWriter.writeEndElement();
    	break;
    case 'conditional':
    	 xmlWriter.writeStartElement('conditionalEventDefinition ' );
    	 xmlWriter.writeAttributeString('id', idMap[element.id]+'_ED_1');
    	 xmlWriter.writeEndElement();
    	break;
    case 'signal':
    	 xmlWriter.writeStartElement('signalEventDefinition ' );
    	 xmlWriter.writeAttributeString('id', idMap[element.id]+'_ED_1');
    	 xmlWriter.writeEndElement();
    	break;
    	
    case 'error':
    	 xmlWriter.writeStartElement('errorEventDefinition  ' );
    	 xmlWriter.writeAttributeString('id', idMap[element.id]+'_ED_1');
    	 xmlWriter.writeEndElement();
    	break;
    	
    case 'compensation':
    	 xmlWriter.writeStartElement('compensateEventDefinition  ' );
    	 xmlWriter.writeAttributeString('id', idMap[element.id]+'_ED_1');
    	 xmlWriter.writeEndElement();
    	break;
    	
    case 'terminate':
    	 xmlWriter.writeStartElement('terminateEventDefinition   ' );
    	 xmlWriter.writeAttributeString('id', idMap[element.id]+'_ED_1');
    	 xmlWriter.writeEndElement();
    	break;
    case 'escalation':
    	 xmlWriter.writeStartElement('escalationEventDefinition ' );
    	 xmlWriter.writeAttributeString('id', idMap[element.id]+'_ED_1');
    	 xmlWriter.writeEndElement();
    	break;
	}
//		end boundary task
	 xmlWriter.writeEndElement();

	 
      })   
	
}
function allTagLink(element,xmlWriter,idMap){
	 
	 var asObject=false;
	 var  outLinks=graph.getConnectedLinks(element,{ outbound: true });
	 var  inLinks=graph.getConnectedLinks(element,{ inbound: true });
	 _.each(inLinks, function (inLink) {
			
		 if(inLink.get('target').id===element.id){
			 var cellSource=graph.getCell(inLink.get('source').id);
			 if(cellSource  instanceof BPMNMessage){
				 xmlWriter.writeAttributeString('messageRef',idMap[cellSource.id]);
			 }
			 if(!(cellSource  instanceof BPMNMessage)&&!(cellSource  instanceof BPMNDataObject))
			 xmlWriter.writeElementString('incoming',idMap[inLink.id]);
		 }
		
		 
	 });
	 _.each(outLinks, function (outLink) {
		
		 if(outLink.get('source').id===element.id){
			 var cellTarget=graph.getCell(outLink.get('target').id);
			 
			 if(cellTarget  instanceof BPMNMessage){
				
				 xmlWriter.writeAttributeString('messageRef',idMap[cellTarget.id]);
			 }
			 //verifico se il target è un oggetto di tipo dataObject
			 if(!(cellTarget  instanceof BPMNMessage)&&!(cellTarget  instanceof BPMNDataObject))
				 {
					 xmlWriter.writeElementString('outgoing',idMap[outLink.id]);
				 }
		 }
		 
		 
	 });

}


function allTagLinkDataObject(element,xmlWriter,idMap){
	
	 var asObject=false;
	  var  outLinks=graph.getConnectedLinks(element,{ outbound: true });
	 var  inLinks=graph.getConnectedLinks(element,{ inbound: true });
	 _.each(inLinks, function (inLink) {
			
		 if(inLink.get('target').id===element.id){
			 var cellSource=graph.getCell(inLink.get('source').id);
			 if(cellSource  instanceof BPMNDataObject)
				{ 
				 if(!asObject){
					 xmlWriter.writeStartElement('ioSpecification' );
				
					 setDataOut(xmlWriter ,outLinks,idMap);
					 setDataInput(xmlWriter ,inLinks,idMap);
					
					 setInputSet(xmlWriter ,inLinks,idMap);
					 setOutSet(xmlWriter ,outLinks,idMap);
					
					 //chiudo tag ioSpecification
					
					 xmlWriter.writeEndElement();
					 asObject=true;
					}
				 
				 
				 
				 xmlWriter.writeStartElement('dataInputAssociation' );
					 xmlWriter.writeAttributeString('id', idMap[inLink.id]);
				 xmlWriter.writeElementString('sourceRef',idMap[inLink.get('source').id]);
				 xmlWriter.writeElementString('targetRef',"Din"+idMap[inLink.get('target').id]+""+idMap[inLink.get('source').id]);
				 
				 //chiudo tag dataOutputAssociation
				 xmlWriter.writeEndElement();
				}
			 
		 }
		
		 
	 });
	 _.each(outLinks, function (outLink) {
		
		 if(outLink.get('source').id===element.id){
			 var cellTarget=graph.getCell(outLink.get('target').id);
			 // TODO verificare se è necessario ai fini del tools BPMNTOGOALS
			 //vanno inseriti prima tutti i tag di tipo outgoing e poi i tag di tipo ioSpecification
			
			 //verifico se il target è un oggetto di tipo dataObject
			
			 if(cellTarget  instanceof BPMNDataObject)
				{ 
				 
				if(!asObject){
				 xmlWriter.writeStartElement('ioSpecification' );
				 setDataInput(xmlWriter ,inLinks,idMap);
				 setDataOut(xmlWriter ,outLinks,idMap);
				 setInputSet(xmlWriter ,inLinks,idMap);
				 setOutSet(xmlWriter ,outLinks,idMap);
				
				 //chiudo tag ioSpecification
				
				 xmlWriter.writeEndElement();
				 asObject=true;
				}
				 
				 
				 
				 xmlWriter.writeStartElement('dataOutputAssociation' );
				 //scegliere un id univoco 
				 xmlWriter.writeAttributeString('id', idMap[outLink.id]);
				 xmlWriter.writeElementString('sourceRef',"Dout"+idMap[outLink.get('source').id]+""+idMap[outLink.get('target').id]);
				 xmlWriter.writeElementString('targetRef',idMap[outLink.get('target').id]);
				 //chiudo tag dataOutputAssociation
				 xmlWriter.writeEndElement();
				}
			
		 }
		 
		 
	 });
}

function setOutSet(xmlWriter ,outLinks,idMap){
	var hasOutSet=false;
	if(!hasOutSet)	 {
		 hasOutSet=true;
		 xmlWriter.writeStartElement('outputSet' );
	 }

	_.each(outLinks, function (outLink) {
		
		
			 //verifico se il target è un oggetto di tipo dataObject
			 var cellTarget=graph.getCell(outLink.get('target').id);
			 if(hasOutSet) if(cellTarget  instanceof BPMNDataObject){

				 //inserisco tanti tag di tipo dataOutputRefs quanti sono i data object target
				 xmlWriter.writeElementString('dataOutputRefs',"Dout"+idMap[outLink.get('source').id]+""+idMap[outLink.get('target').id]);
			}
	});
	 if(hasOutSet){
		 xmlWriter.writeEndElement();
	}
}

function setInputSet(xmlWriter ,inLinks,idMap){
	var hasInputSet=false;

	 if(!hasInputSet)	 {
		 hasInputSet=true;
		 xmlWriter.writeStartElement('inputSet' );
	 }

	_.each(inLinks, function (inLink) {
		//verifico se il target è un oggetto di tipo dataObject
		 var cellTarget=graph.getCell(inLink.get('source').id);
			 if(hasInputSet) if(cellTarget  instanceof BPMNDataObject){
				 xmlWriter.writeElementString('dataInputRefs',"Din"+idMap[inLink.get('target').id]+""+idMap[inLink.get('source').id]);
			 }
	});
	 if(hasInputSet){
		 xmlWriter.writeEndElement();
	}

}

function setDataOut(xmlWriter ,outLinks, idMap){
		_.each(outLinks, function (outLink) {
		 //verifico se il target è un oggetto di tipo dataObject
			 var cellTarget=graph.getCell(outLink.get('target').id);
			 if(cellTarget  instanceof BPMNDataObject){
				 xmlWriter.writeStartElement('dataOutput');
				 xmlWriter.writeAttributeString('id', "Dout"+idMap[outLink.get('source').id]+""+idMap[outLink.get('target').id]);
				 xmlWriter.writeAttributeString('isCollection', 'false');
				 xmlWriter.writeEndElement();
			 }
	});
}

function setDataInput(xmlWriter ,inLinks, idMap){
	_.each(inLinks, function (inLink) {
				 //verifico se il target è un oggetto di tipo dataObject
			 var cellTarget=graph.getCell(inLink.get('source').id);
			 if(cellTarget  instanceof BPMNDataObject){
				 xmlWriter.writeStartElement('dataInput' );
				 xmlWriter.writeAttributeString('id', "Din"+idMap[inLink.get('target').id]+""+idMap[inLink.get('source').id]);
				 xmlWriter.writeAttributeString('isCollection', 'false');
				 xmlWriter.writeEndElement();
		 
		 }

	});
}