
//var dataObjectName;
//function in_array(valore_da_esaminare, array_di_riferimento) {
//    for( var i = 0; i < array_di_riferimento.length; i++) {
//	if(valore_da_esaminare === array_di_riferimento[i]) {
//		//console.log("VALORI UGUALI")
//	    return true;
//	}
//    }
//    return false;
//}
var idMap = {};
function exportXMINewId(){
			
	var arrayDataObjectAdded={};
			
			 var xmlWriter = new  XMLWriter('MacRoman', '1.0');
			
			 xmlWriter.writeStartDocument(false);
			
			// xmlWriter.WriteProcessingInstruction("xml", "version=""1.0"" encoding=""UTF-8"" standalone=""yes""")
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
			 //SETTARE UN ID UNIVOCO
			
			 xmlWriter.writeAttributeString('id', '_1419237461760');
			 xmlWriter.writeAttributeString('name', '');
			 xmlWriter.writeAttributeString('targetNamespace', 'http://sourceforge.net/bpmn/definitions/_1419237461760');
			 xmlWriter.writeAttributeString('typeLanguage', 'http://www.omg.org/spec/BPMN/20100524/MODEL http://bpmn.sourceforge.net/schemas/BPMN20.xsd');
			
			 var idProcess='PROCESS_';
			 var idElement="";  
			 var idCollaboration={};
			 var incrementId=0;
			 var numCollaboration=0;
			 var collaborationAdded=false;
			 console.log("idMap BEFORE: "+idMap.length);
			 idMap=new Array;
			 console.log("idMap AFTER: "+idMap.length);
				var allElements=graph.getElements();
				_.each(allElements, function (element) {
					
					idElement="_"+incrementId++;
					console.log("idElement: "+idElement);
					idMap[element.id] = idElement;
				
				});
				
				//aggiungo gli itemdefinitions
				var tableItem=$('#items').children().length;
				console.log("tableItem-->"+tableItem)
				console.log("$('#items').children()-->"+$('#items').children(0).children(0))
				//TODO scorre la tabella per inserire dati negli item
				$('#items tr').each(function(riga) {
					
					 var idItem = $(this).find(".idItem").html(); 
					 var structureRef = $(this).find(".structureRef").html();  
					 var itemKind = $(this).find(".itemKind").html();  
					 var isCollectionItem = $(this).find(".isCollectionItem").html();  
					
					 if(idItem!==undefined){
						 xmlWriter.writeStartElement('itemDefinition' );
						 
					 console.log("idItem:"+idItem);
					 console.log("structureRef:"+structureRef);
					 console.log("itemKind:"+itemKind);
					 console.log("isCollectionItem:"+isCollectionItem);
					 
					 xmlWriter.writeAttributeString('id',idItem);
					 xmlWriter.writeAttributeString('isCollection', isCollectionItem);
					 xmlWriter.writeAttributeString('itemKind', itemKind);
					 xmlWriter.writeAttributeString('structureRef', structureRef);
		   
				    xmlWriter.writeEndElement();
					 }

				});
				
			
				//pre ogni elemnto creo un nuovo id da inserire in una mappa
				_.each(allElements, function (element) {
				if(element instanceof joint.shapes.basic.Message){
//					idElement="_"+incrementId++;
//					idMap[element.id] = idElement;
					 xmlWriter.writeStartElement('message' );
					 xmlWriter.writeAttributeString('id', idMap[element.id]);
					 xmlWriter.writeAttributeString('name',  element.attr("text/text"));
					 console.log("ITEM MESAGE:-->"+element.attr(".itemRef/text"));
					 if(element.attr(".itemRef/text")!==undefined && element.attr(".itemRef/text")!=="")
						 xmlWriter.writeAttributeString('itemRef', element.attr(".itemRef/text"));
						 xmlWriter.writeStartElement('extensionElements' );
							 xmlWriter.writeStartElement('yaoqiang:style' );
							 xmlWriter.writeAttributeString('init', '1');
							 xmlWriter.writeEndElement();
						 xmlWriter.writeEndElement();
					 xmlWriter.writeEndElement();
					
				}
				});
				 //Inserisco tanti tag di tipo resource quanti sono i ruoli associati agli elementi 
				 var increResource=0;
				 _.each(allElements, function (element) {
					 console.log("element.attr('.resourceProperty/text')-->"+element.attr('.resourceProperty/text'))
					 if(element.attr('.resourceProperty/text')!=="" && element.attr('.resourceProperty/text')!==undefined){
						 console.log("ADD RESOURCE IN MAP: "+idMap[element.attr('.resourceProperty/text')]);
						 console.log("idMap IN RESOURCE: "+idMap.length);
						 if(idMap[element.attr('.resourceProperty/text')]===undefined){
						 increResource++;
						 var resourceId="RS_"+increResource;
						 console.log("ADD RESOURCE:"+element.attr('.resourceProperty/text'))
						 idMap[element.attr('.resourceProperty/text')] = resourceId;
						 xmlWriter.writeStartElement('resource' );
						 xmlWriter.writeAttributeString('id', idMap[element.attr('.resourceProperty/text')]);
						 xmlWriter.writeAttributeString('name', element.attr('.resourceProperty/text'));
						 //end participant tag
						 xmlWriter.writeEndElement();
						 }
					 }
					 
				 });
				
				xmlWriter.writeStartElement('collaboration' );
				
				 xmlWriter.writeAttributeString('id', "COLLABORATION_"+numCollaboration);
				 xmlWriter.writeAttributeString('isClosed', "false");
				_.each(allElements, function (element) {
//					if(!(element instanceof joint.shapes.basic.Message)){
//					idElement="_"+incrementId++;
//					console.log("idElement: "+idElement);
//					idMap[element.id] = idElement;
//				}
					if(element instanceof joint.shapes.basic.Pool){
						
						
						
						 idCollaboration[numCollaboration] =element.id;
							 xmlWriter.writeStartElement('participant' );
							 xmlWriter.writeAttributeString('id', idMap[element.id]);
							 xmlWriter.writeAttributeString('name', element.attr("text/text"));
							 xmlWriter.writeAttributeString('processRef', idProcess+ numCollaboration);
							 
							 xmlWriter.writeStartElement('participantMultiplicity' );
							 xmlWriter.writeAttributeString('maximum', "1");
							 xmlWriter.writeAttributeString('minimum', "0");
							 xmlWriter.writeEndElement();
							
							 xmlWriter.writeEndElement();
						
						 numCollaboration++;
					}
					
					
				});
				 xmlWriter.writeEndElement();
			 for(var i=0;i<=numCollaboration;i++){
				
				 xmlWriter.writeStartElement( 'process' );
					
				 xmlWriter.writeAttributeString('id',idProcess+i);
				 xmlWriter.writeAttributeString('isClosed','false');
				 xmlWriter.writeAttributeString('isExecutable','true');
				 xmlWriter.writeAttributeString('processType','None');
				 
			 console.log("NEW TAG PROCESS:--->>"+idProcess+i);
//			 xmlWriter.writeStartElement( 'process' );
//			
//			 xmlWriter.writeAttributeString('id', idProcess);
			 	
				if((idProcess+i)==="PROCESS_0"){
				var allLinks=graph.getLinks();
				_.each(allLinks, function (link) {
					idElement="_"+incrementId++;
				//	console.log("idElement-->>"+idElement);
					idMap[link.id] = idElement;
					var typelink=link.attr('.tipologia/text');
				//	console.log("link PARENT:  "+link.get('parent'));
					if(typelink==='sequenceFlowLink'){
						xmlWriter.writeStartElement('sequenceFlow' );
						 xmlWriter.writeAttributeString('id', idMap[link.id]);
						 xmlWriter.writeAttributeString('sourceRef', idMap[link.get('source').id]);
						 xmlWriter.writeAttributeString('targetRef', idMap[link.get('target').id]);
						 xmlWriter.writeAttributeString('name', link.attributes.labels[0].attrs.text.text);
						 if(link.attributes.labels[0].attrs.text.text!==""){
							// xmlWriter.writeStartElement('conditionExpression' );
							 xmlWriter.writeElementString('conditionExpression',link.attributes.labels[0].attrs.text.text);
							 
							// xmlWriter.writeEndElement();
						 }
						 xmlWriter.writeEndElement();
					}
					
					if(typelink==='messageFlowLink'){
						xmlWriter.writeStartElement('association' );
						 xmlWriter.writeAttributeString('id', idMap[link.id]);
						 xmlWriter.writeAttributeString('sourceRef', idMap[link.get('source').id]);
						 xmlWriter.writeAttributeString('targetRef',idMap[ link.get('target').id]);
						 xmlWriter.writeAttributeString('associationDirection', 'None');
						 xmlWriter.writeEndElement();
					}
					
				});
				}
		
			_.each(allElements, function (element) {
				//console.log("element.get('parent')-->"+element.get('parent'));
				//console.log("idCollaboration[i]--->"+idCollaboration[i]);
				if(element.get('parent')===idCollaboration[i]){
//				var  outLinks=graph.getConnectedLinks(element,{ outbound: true });
//				console.log("ID FIRST:"+element.id);
//				console.log("OUT LINK FIRST:"+outLinks.length);
//				var  inLinks=graph.getConnectedLinks(element,{ intbound: true });
//				console.log("OINLINK FIRST:"+inLinks.length);
				if(element instanceof joint.shapes.basic.Activity){
					var taskType=element.get('taskType');
					var taskTag='';
					if(taskType==='default')
						 taskTag='task';
					else
						 taskTag=taskType+'Task';
					 xmlWriter.writeStartElement(taskTag );
					 xmlWriter.writeAttributeString('completionQuantity','1');
					 xmlWriter.writeAttributeString('id', idMap[element.id]);
					 xmlWriter.writeAttributeString('isForCompensation','false');
					 xmlWriter.writeAttributeString('name', element.get('content'));
					 xmlWriter.writeAttributeString('startQuantity','1');
					
					 if(element.get('taskType')==='receive'||element.get('taskType')==='send'||element.get('taskType')==='service'||element.get('taskType')==='user')
						 xmlWriter.writeAttributeString('implementation','##WebService');
					 if(element.get('taskType')==='receive')
						 xmlWriter.writeAttributeString('instantiate','false');
					 
					 //aggiungo il tag relativo ai link in ingresso ed in uscita
					 allTagLink(element,xmlWriter);
					 allTagLinkDataObject(element,xmlWriter);
					 //Si può usare questo metodo per trovare i dataObject collegati al task
					 //graph.getNeighbors(element)
					 //inserisco i tag humanPerformer se l'elemnto ha un ruolo associato
					 console.log("RUOLO ASSOCIATO AD UN TASK:"+element.attr('.resourceProperty/text'))
					 if(element.attr('.resourceProperty/text')!==""){
						 xmlWriter.writeStartElement('humanPerformer');
						 xmlWriter.writeAttributeString('id', idMap[element.id]+"_RES");
						 xmlWriter.writeElementString('resourceRef',idMap[element.attr('.resourceProperty/text')]);
						 xmlWriter.writeEndElement();
					 }
	  //			end tag task
					 xmlWriter.writeEndElement();

				}
				if(element instanceof joint.shapes.basic.Gateway){
					var gatewayType=element.get('gatewayType');
					var gatewayTag='exclusiveGateway';
					if(gatewayType==='parallel')
						gatewayTag='parallelGateway';
					if(gatewayType==='inclusive')
						gatewayTag='inclusiveGateway';
					
					 xmlWriter.writeStartElement(gatewayTag );
					 xmlWriter.writeAttributeString('id', idMap[element.id]);
					
					 xmlWriter.writeAttributeString('name',element.attr('.label/text'));
					 if(gatewayType==='inclusive')
					 xmlWriter.writeAttributeString('gatewayDirection', 'Unspecified');
					 else
						 xmlWriter.writeAttributeString('gatewayDirection', 'Diverging');
					 allTagLink(element,xmlWriter);
					 xmlWriter.writeEndElement();
					
				}
				
				if(element instanceof joint.shapes.basic.Event){
					
					var eventType=element.get('eventType');
					var eventTag='startEvent';
					if(eventType==='end')
						eventTag='endEvent';
					
					
					 xmlWriter.writeStartElement(eventTag );
					 xmlWriter.writeAttributeString('id', idMap[element.id]);
					// console.log('TEXT GATE: '+element.attr('.label/text'));
					 xmlWriter.writeAttributeString('name',element.attr('.label/text'));
					 var eventActionType=element.get('actionType');
					 if(eventActionType==='parallelmultiple')
						 xmlWriter.writeAttributeString('parallelMultiple', 'true');
					 else if(eventType==='start'||eventType==='intermediate')
					  xmlWriter.writeAttributeString('parallelMultiple', 'false');
					 if(eventType==='start')
						 xmlWriter.writeAttributeString('isInterrupting', 'true');
					 if(eventType==='intermediate')
						 xmlWriter.writeAttributeString('isInterrupting', 'false');
					 allTagLink(element,xmlWriter);
					switch (eventActionType) {

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
//				if(element instanceof joint.shapes.basic.DataObject){
//					
//				 
//					
//					 xmlWriter.writeStartElement('dataObject' );
//					 xmlWriter.writeAttributeString('id', "DO_PROCESS"+idMap[element.id]);
//					 xmlWriter.writeAttributeString('isCollection','false');
//					 xmlWriter.writeAttributeString('name',element.attr('.label/text'));
//					 xmlWriter.writeEndElement();
//					 //per ciascun dataObject devo creare tanti tag dataObjectReference quante sono le condition ad esso associati
//					 xmlWriter.writeStartElement('dataObjectReference' );
//					 xmlWriter.writeAttributeString('dataObjectRef',"DO_PROCESS"+idMap[element.id]);
//					 xmlWriter.writeAttributeString('id', idMap[element.id]);
//					 xmlWriter.writeEndElement();
//					 dataObjectName=element.attr('.label/text');
//				}
				
				
//				if(element instanceof joint.shapes.basic.Message){
//					
//					 xmlWriter.writeStartElement('message' );
//					 xmlWriter.writeAttributeString('id', idMap[element.id]);
//						 xmlWriter.writeStartElement('extensionElements' );
//							 xmlWriter.writeStartElement('yaoqiang:style' );
//							 xmlWriter.writeAttributeString('init', '1');
//							 xmlWriter.writeEndElement();
//						 xmlWriter.writeEndElement();
//					 xmlWriter.writeEndElement();
//					
//				}
				}
			});
			var dataObjectId="";
			arrayDataObjectAdded=new Array();
			arrayDataObjectAdded[0]="new";
			_.each(allElements, function (element) {
				
				if(element instanceof joint.shapes.basic.DataObject){
				//	console.log("arrayDataObjectAdded.length-->"+arrayDataObjectAdded.length);
					
					//creo un array associativo in cui 
					//	arrayDataObjectAdded[element.attr('.label/text')]=element.id;
						
					 for( var j = 0; j < arrayDataObjectAdded.length;j++) {
//						 console.log("element.attr('.label/text')-->"+element.attr('.label/text'));
//						 console.log("arrayDataObjectAdded[j]-->"+arrayDataObjectAdded[j]);
							if(element.attr('.label/text') !== arrayDataObjectAdded[j]) {
								
						
				//	if(!in_array(element.attr('.label/text'),arrayDataObjectAdded)){
				//	console.log("aggiungo elemento :"+element.attr('.label/text')+" in posirione:"+j)
					arrayDataObjectAdded[j]=element.attr('.label/text');
				//	console.log("arrayDataObjectAdded[j]-->"+arrayDataObjectAdded[j]);
					dataObjectId=idMap[element.id];
					 xmlWriter.writeStartElement('dataObject' );
					 xmlWriter.writeAttributeString('id', "DO_"+idProcess+i+idMap[element.id]);
					 xmlWriter.writeAttributeString('isCollection','false');
					 if(element.attr(".itemRef/text")!==undefined && element.attr(".itemRef/text")!=="")
						 xmlWriter.writeAttributeString('itemSubjectRef', element.attr(".itemRef/text"));
					
					 xmlWriter.writeAttributeString('name',element.attr('.label/text'));
					 xmlWriter.writeEndElement();
					 xmlWriter.writeStartElement('dataObjectReference' );
					 xmlWriter.writeAttributeString('dataObjectRef',"DO_"+idProcess+i+dataObjectId);
					 xmlWriter.writeAttributeString('id', idMap[element.id]);
					 //se contiene uno state allora aggiungo il tag dataState
					 if(element.attr('.dataState/text')!==""){
						 xmlWriter.writeStartElement('dataState' );
						 xmlWriter.writeAttributeString('name', element.attr('.dataState/text'));
						 xmlWriter.writeEndElement();
					 }
					 xmlWriter.writeEndElement();
					}else{
					 //per ciascun dataObject devo creare tanti tag dataObjectReference quanti sono gli state ad esso associati
					 xmlWriter.writeStartElement('dataObjectReference' );
					 xmlWriter.writeAttributeString('dataObjectRef',"DO_"+idProcess+i+dataObjectId);
					 xmlWriter.writeAttributeString('id', idMap[element.id]);
					 //aggiungo tag dataState
					 if(element.attr('.dataState/text')!==""){
						 xmlWriter.writeStartElement('dataState' );
						 xmlWriter.writeAttributeString('name', element.attr('.dataState/text'));
						 xmlWriter.writeEndElement();
					 }
					 xmlWriter.writeEndElement();
					}
				}
				}
			});
		
//			//chiudo il tag process
			 xmlWriter.writeEndElement();
			 }//FINE FOR
			
			 
			//inserisco un nuovo tag di tipo collaboration
			 xmlWriter.writeStartElement('collaboration' );
				numCollaboration++;
				 xmlWriter.writeAttributeString('id', "COLLABORATION_"+numCollaboration);
				 xmlWriter.writeAttributeString('isClosed', "false");
			 //controllo su MEssageFlow da  inserire
			 _.each(allElements, function (element) {
					if(element instanceof joint.shapes.basic.Message){
						console.log("MESSAGE NAME:"+element.attr('text/text'))
						 // verifico se si tratta di messaggi di tipo MessageFlow
						 var  outLinks=graph.getConnectedLinks(element,{ outbound: true });
						 var  inLinks=graph.getConnectedLinks(element,{ inbound: true });
						
						if(outLinks.length===0 && inLinks.length!==0){
							
							_.each(inLinks, function (inLink) {
								if(idMap[element.attr('.receiver/text')]===undefined){
							 
							 //inserisco un tag di tipo participant
							 idElement="_"+incrementId++;
							 idMap[element.attr('.receiver/text')] = idElement;
							 console.log("ROLE NAME ADDED "+element.attr('.receiver/text'))
							 xmlWriter.writeStartElement('participant' );
							 xmlWriter.writeAttributeString('id', idMap[element.attr('.receiver/text')]);
							 xmlWriter.writeAttributeString('name', element.attr('.receiver/text'));
							 //end participant tag
							 xmlWriter.writeEndElement();
							 
							 //inserisco un tag di tipo messageFlow
							 idElement="_"+incrementId++;
							 idMap[idElement] = idElement;
							 xmlWriter.writeStartElement('messageFlow' );
							 xmlWriter.writeAttributeString('id', idMap[idElement]);
							 xmlWriter.writeAttributeString('messageRef', idMap[element.id]);
							 xmlWriter.writeAttributeString('sourceRef', idMap[inLink.get('source').id]);
							 xmlWriter.writeAttributeString('targetRef', idMap[element.attr('.receiver/text')]);
							 //end messageFlow tag
							 xmlWriter.writeEndElement();
								}else{
									 //inserisco un tag di tipo messageFlow
									 idElement="_"+incrementId++;
									 idMap[idElement] = idElement;
									 xmlWriter.writeStartElement('messageFlow' );
									 xmlWriter.writeAttributeString('id', idMap[idElement]);
									 xmlWriter.writeAttributeString('messageRef', idMap[element.id]);
									 xmlWriter.writeAttributeString('sourceRef', idMap[inLink.get('source').id]);
									 xmlWriter.writeAttributeString('targetRef', idMap[element.attr('.receiver/text')]);
									 //end messageFlow tag
									 xmlWriter.writeEndElement();
								}
							 
							});
						}
						
						
						console.log(" inLinks.length-->"+inLinks.length);
						console.log("outLinks.length"+outLinks.length);
						if(inLinks.length===0 && outLinks.length!==0){
							//inserisco un nuovo tag di tipo collaboration
							_.each(outLinks, function (outLink) {
								console.log("SENDER ROLE:"+element.attr('.sender/text'))
								console.log(" PARTICIPANT GIA inserito:"+idMap[element.attr('.sender/text')]);
								if(idMap[element.attr('.sender/text')]===undefined){
									
									 
									 //inserisco un tag di tipo participant
									 idElement="_"+incrementId++;
									 idMap[element.attr('.sender/text')] = idElement;
									 xmlWriter.writeStartElement('participant' );
									 xmlWriter.writeAttributeString('id', idMap[element.attr('.sender/text')]);
									 xmlWriter.writeAttributeString('name', element.attr('.sender/text'));
									 //end participant tag
									 xmlWriter.writeEndElement();
									 
									 //inserisco un tag di tipo messageFlow
									 idElement="_"+incrementId++;
									 idMap[idElement] = idElement;
									 xmlWriter.writeStartElement('messageFlow' );
									 xmlWriter.writeAttributeString('id', idMap[idElement]);
									 xmlWriter.writeAttributeString('messageRef', idMap[element.id]);
									 xmlWriter.writeAttributeString('sourceRef', idMap[element.attr('.sender/text')]);
									 xmlWriter.writeAttributeString('targetRef', idMap[outLink.get('target').id]);
									 //end messageFlow tag
									 xmlWriter.writeEndElement();
									 
									 
								}else{
									 //inserisco un tag di tipo messageFlow
									 idElement="_"+incrementId++;
									 idMap[idElement] = idElement;
									 xmlWriter.writeStartElement('messageFlow' );
									 xmlWriter.writeAttributeString('id', idMap[idElement]);
									 xmlWriter.writeAttributeString('messageRef', idMap[element.id]);
									 xmlWriter.writeAttributeString('sourceRef', idMap[element.attr('.sender/text')]);
									 xmlWriter.writeAttributeString('targetRef', idMap[outLink.get('target').id]);
									 //end messageFlow tag
									 xmlWriter.writeEndElement();
								}
								
							});
						}
						
					}
					
					});
			//end collaboration tag
			 xmlWriter.writeEndElement();
			 //chiudo tag definitions
			 xmlWriter.writeEndElement();
			 xmlWriter.writeEndDocument();
		//	alert(xml.innerHTML);
			var textFileAsBlob = new Blob([xmlWriter.flush()], {type:'text/xml'});
			var fileNameToSaveAs = "FileXML";

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
		
		function	allTagLink(element,xmlWriter){
		 var asObject=false;
		 var  outLinks=graph.getConnectedLinks(element,{ outbound: true });
		 var  inLinks=graph.getConnectedLinks(element,{ inbound: true });
		//console.log("OUTLINK: "+ outLinks.length);
		 
		 _.each(inLinks, function (inLink) {
				
			 if(inLink.get('target').id===element.id){
				 var cellSource=graph.getCell(inLink.get('source').id);
				 if(!(cellSource  instanceof joint.shapes.basic.Message)&&!(cellSource  instanceof joint.shapes.basic.DataObject))
				 xmlWriter.writeElementString('incoming',idMap[inLink.id]);
			 }
			
			 
		 });
		 _.each(outLinks, function (outLink) {
			
			 if(outLink.get('source').id===element.id){
				 var cellTarget=graph.getCell(outLink.get('target').id);
				
				 //verifico se il target è un oggetto di tipo dataObject
				 if(!(cellTarget  instanceof joint.shapes.basic.Message)&&!(cellTarget  instanceof joint.shapes.basic.DataObject))
					 {
					// console.log("OUTGOING LINK");
					 xmlWriter.writeElementString('outgoing',idMap[outLink.id]);
					 }
			 }
			 
			 
		 });
		 
		//	console.log("INLINK: "+ inLinks.length);

		 
		}
		function	allTagLinkDataObject(element,xmlWriter){
			 var asObject=false;
			 var  outLinks=graph.getConnectedLinks(element,{ outbound: true });
			 var  inLinks=graph.getConnectedLinks(element,{ inbound: true });
			//console.log("OUTLINK: "+ outLinks.length);
			 
			 _.each(inLinks, function (inLink) {
					
				 if(inLink.get('target').id===element.id){
					 var cellSource=graph.getCell(inLink.get('source').id);
					 if(cellSource  instanceof joint.shapes.basic.DataObject)
						{ 
						 if(!asObject){
							 xmlWriter.writeStartElement('ioSpecification' );
							 setDataInput(xmlWriter ,inLinks);
							 setDataOut(xmlWriter ,outLinks);
							 setInputSet(xmlWriter ,inLinks);
							 setOutSet(xmlWriter ,outLinks);
							
							 //chiudo tag ioSpecification
							
							 xmlWriter.writeEndElement();
							 asObject=true;
							}
						 
						 
						 
						 xmlWriter.writeStartElement('dataInputAssociation' );
						 //scegliere un id univoco 
						// console.log("idMap[inLink.id]-->"+idMap[inLink.id]);
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
					
					 if(cellTarget  instanceof joint.shapes.basic.DataObject)
						{ 
						// console.log("TARGET IS A DATA OBJECT");
						 
						if(!asObject){
						 xmlWriter.writeStartElement('ioSpecification' );
						 setDataInput(xmlWriter ,inLinks);
						 setDataOut(xmlWriter ,outLinks);
						 setInputSet(xmlWriter ,inLinks);
						 setOutSet(xmlWriter ,outLinks);
						
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
		
		function setOutSet(xmlWriter ,outLinks){
			var hasOutSet=false;
			if(!hasOutSet)	 {
				 hasOutSet=true;
				// console.log("INSERT TAG OUTPUTSET")
				 xmlWriter.writeStartElement('outputSet' );
			 }
			_.each(outLinks, function (outLink) {
				
				
				 //verifico se il target è un oggetto di tipo dataObject
				
//				 if(!hasOutSet)	 {
//					 hasOutSet=true;
//					// console.log("INSERT TAG OUTPUTSET")
//					 xmlWriter.writeStartElement('outputSet' );
//				 }
				 });
			_.each(outLinks, function (outLink) {
				
				
					 //verifico se il target è un oggetto di tipo dataObject
					 var cellTarget=graph.getCell(outLink.get('target').id);
					 if(hasOutSet) if(cellTarget  instanceof joint.shapes.basic.DataObject){
//						 hasOutSet=true;
//						 
//						 xmlWriter.writeStartElement('outputSet' );
						 //inserisco tanti tag di tipo dataOutputRefs quanti sono i data object target
						 	xmlWriter.writeElementString('dataOutputRefs',"Dout"+idMap[outLink.get('source').id]+""+idMap[outLink.get('target').id]);
						 
						 
					 
				 }
					 
					
			});
			 if(hasOutSet){
				
				 xmlWriter.writeEndElement();
				 
			 }
		}
		
		

		function setInputSet(xmlWriter ,inLinks){
			var hasInputSet=false;

			 if(!hasInputSet)	 {
				 hasInputSet=true;
				 xmlWriter.writeStartElement('inputSet' );
			 }
			
			_.each(inLinks, function (inLink) {
				
				
				 //verifico se il target è un oggetto di tipo dataObject
//				
//				 if(!hasInputSet)	 {
//					 hasInputSet=true;
//					 xmlWriter.writeStartElement('inputSet' );
//				 }
				 });
			_.each(inLinks, function (inLink) {
				
				
					 //verifico se il target è un oggetto di tipo dataObject
				 var cellTarget=graph.getCell(inLink.get('source').id);
					 if(hasInputSet) if(cellTarget  instanceof joint.shapes.basic.DataObject){

						 //inserisco tanti tag di tipo dataOutputRefs quanti sono i data object target
						 xmlWriter.writeElementString('dataInputRefs',"Din"+idMap[inLink.get('target').id]+""+idMap[inLink.get('source').id]);
						 
						 
					 
				 }
					 
					
			});
			 if(hasInputSet){
				
				 xmlWriter.writeEndElement();
				 
			 }
			 
	
		}
		function setDataOut(xmlWriter ,outLinks){
			_.each(outLinks, function (outLink) {
				
				
					 //verifico se il target è un oggetto di tipo dataObject
					 var cellTarget=graph.getCell(outLink.get('target').id);
					 if(cellTarget  instanceof joint.shapes.basic.DataObject){
						 xmlWriter.writeStartElement('dataOutput' );
						 xmlWriter.writeAttributeString('id', "Dout"+idMap[outLink.get('source').id]+""+idMap[outLink.get('target').id]);
						 xmlWriter.writeAttributeString('isCollection', 'false');
						 xmlWriter.writeEndElement();
						 
//						 xmlWriter.writeStartElement('outputSet' );
//						 	xmlWriter.writeElementString('dataOutputRefs',"Dout_"+idMap[outLink.get('source').id]+"_"+idMap[outLink.get('target').id]);
//						 xmlWriter.writeEndElement();
						 
					 
				 }
			});
		}
		
		function setDataInput(xmlWriter ,inLinks){
			_.each(inLinks, function (inLink) {
				
				
					 //verifico se il target è un oggetto di tipo dataObject
					 var cellTarget=graph.getCell(inLink.get('source').id);
					 if(cellTarget  instanceof joint.shapes.basic.DataObject){
						 xmlWriter.writeStartElement('dataInput' );
						 xmlWriter.writeAttributeString('id', "Din"+idMap[inLink.get('target').id]+""+idMap[inLink.get('source').id]);
						 xmlWriter.writeAttributeString('isCollection', 'false');
						 xmlWriter.writeEndElement();
						 
//						 xmlWriter.writeStartElement('inputSet' );
//						 	xmlWriter.writeElementString('dataInputRefs',"Dout_"+idMap[inLink.get('target').id]+"_"+idMap[inLink.get('source').id]);
//						 xmlWriter.writeEndElement();
//						 
					 
				 }

			});
		}