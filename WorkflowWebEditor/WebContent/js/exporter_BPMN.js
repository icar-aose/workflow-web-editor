//
//function save_json() {
//	cells = graph.getElements();
//	n_cells = cells.length;
//	
//	for (int i=0; i<n_cells; i++) {
//		var type = cells[i].attributes.elementType;
//		console.log(type);
//	}	
//}

function exportIBP(){
	
	//funzione che mi permette di scaricare il file .ibp al fine di avere un formato compatibile con il tool BPMNtransformer il quale accetta solo formati di input di questo tipo
	
    console.log(" CALL exportIBP")
	var  xmlWriter=createIBPFile();
	if(xmlWriter){
	var textFileAsBlob = new Blob([xmlWriter.flush()], {type:'text/xml'});
	if($('#process-process-name').val()=="")
		alert("PROCESS NAME IS EMPTY!");
	else{
	var fileNameToSaveAs = $('#process-process-name').val()+"_IBP";


	saveAs(textFileAsBlob, fileNameToSaveAs);
	
//	var downloadLink = document.createElement("a");
//	downloadLink.download = fileNameToSaveAs;
//	downloadLink.innerHTML = "Download File";
//	if (window.webkitURL != null)
//	{
//		downloadLink.href = window.webkitURL.createObjectURL(textFileAsBlob);
//	}
//	else
//	{
//		
//		downloadLink.href = window.URL.createObjectURL(textFileAsBlob);
//		downloadLink.style.display = "none";
//		document.body.appendChild(downloadLink);
//	}
//
//	downloadLink.click();
	}
	}
}

function createIBPFile(){

	 var xmlWriter = new  XMLWriter('UTF-8', '1.0');
	 xmlWriter.writeStartDocument(false);
	 xmlWriter.writeStartElement( 'diagram' );
	
	 var idElement="";
	 var incrementId=0;
	 console.log("idMap BEFORE: "+idMap.length);
	 idMap=new Array;
	 console.log("idMap AFTER: "+idMap.length);
	 var allElements=graph.getElements();
		_.each(allElements, function (element) {
			var typeElement=""
				
				if(element instanceof BPMNGateway)
					typeElement="G"		
				if(element instanceof BPMNEvent)
					typeElement="E"			
			idElement=typeElement+"_"+incrementId++;
			//per gli elementi di tipo task mantengo il nome
			
//			if(element instanceof BPMNTask)
//				typeElement="T"
			if(element instanceof BPMNTask){
				//sostituisco gli spazi vuoti con un _ e metto tutto in minuscolo
				taskName=element.get("content").split(' ').join('_');
				//sostituisco gli spazi vuoti con un _ e metto tutto in minuscolo
				idElement=taskName.toLowerCase();
				console.log("NAME TASK :"+idElement);
			}
			//Fine modifiche
			console.log("idElement-_>"+idElement)
			idMap[element.id] = idElement;
		
		});
		
	 console.log("idMap AFTER ELEMENT: "+idMap.length);
			
		 
	  var allLinks=graph.getLinks();
		_.each(allLinks, function (link) {
			idElement="L_"+incrementId++;
			console.log("idElement LINK-_>"+idElement)
			idMap[link.id] = idElement;
		});	
	console.log("idMap AFTER LINK: "+idMap.length);
			
	
	 
	 //scorro tutti gli elementi del diagramma per impostare il 
	 var allElements=graph.getElements();
		_.each(allElements, function (element) {
			
			//GESTISCO PER PRIMA  GLI ELEMENTI DI START E DI END
			//effettuo il mapping relativo agli elementi event
			if(element instanceof BPMNEvent){
				var eventType=element.get('eventType');
				var eventTag='Intermediate';
				if(eventType==='end')
					eventTag='End';
				if(eventType==='start')
					eventTag='Start';
					
				 xmlWriter.writeStartElement(eventTag );
				 xmlWriter.writeAttributeString('id',idMap[element.id]);
					
				
				 xmlWriter.writeStartElement( 'property' );
				 xmlWriter.writeAttributeString('name',"CSSclass");
				 xmlWriter.writeString("Event");
				 //chiusura elemento property CSSclass
				 xmlWriter.writeEndElement();
				 
				 //ADD PROPERTY TRIGGER 
				 var eventTriggerType=element.get('trigger_type');
				 if(eventTriggerType!=""){
				 console.log("EVENT TRIGGER : "+eventTriggerType);
				 xmlWriter.writeStartElement( 'property' );
				 xmlWriter.writeAttributeString('name','Trigger');
				 xmlWriter.writeString(eventTriggerType);
				 //chiusura elemento property CSSclass
				 xmlWriter.writeEndElement();
				 }
				 //chiusura elemento Event
				 xmlWriter.writeEndElement();
			
			}
			
			//effettuo il mapping relativo agli elementi activity
			if(element instanceof BPMNTask){
				console.log("ELEMENT IS A TASK");
				 xmlWriter.writeStartElement( 'Task' );
				 xmlWriter.writeAttributeString('id',idMap[element.id]);
				 
				 xmlWriter.writeStartElement( 'property' );
				 xmlWriter.writeAttributeString('name',"Name");
				 xmlWriter.writeString(element.get("content").split(' ').join('_').toLowerCase());
				 //chiusura elemento property Name
				 xmlWriter.writeEndElement();
				
				 xmlWriter.writeStartElement( 'property' );
				 xmlWriter.writeAttributeString('name',"CSSclass");
				 xmlWriter.writeString("Activity");
				 //chiusura elemento property CSSclass
				 xmlWriter.writeEndElement();
				 
				 
				 //chiusura elemento Task
				 xmlWriter.writeEndElement();
			}
			
			//effettuo il mapping relativo agli elementi gateway
			if(element instanceof BPMNGateway){
				
				var gatewayType=element.get('gatewayType');
				var gatewayTag='OR';
				if(gatewayType==='parallel')
					gatewayTag='AND';
				if(gatewayType==='inclusive')
					gatewayTag='XOR';
				
				 xmlWriter.writeStartElement( 'Gateway' );
				 xmlWriter.writeAttributeString('id',idMap[element.id]);
					
				 xmlWriter.writeStartElement( 'property' );
				 xmlWriter.writeAttributeString('name',"Name");
				 xmlWriter.writeString(element.attr('.label/text'));
				 //chiusura elemento property Name
				 xmlWriter.writeEndElement();
				
				 xmlWriter.writeStartElement( 'property' );
				 xmlWriter.writeAttributeString('name',"GatewayType");
				 xmlWriter.writeString(gatewayTag);
				 xmlWriter.writeEndElement();
				 
				 //chiusura elemento Gateway
				 xmlWriter.writeEndElement();
				
			}
			
			//effettuo il mapping relativo agli elementi message
			if(element instanceof BPMNMessage){
				
			}
		
			
			//effettuo il mapping relativo agli elementi dataObject
			if(element instanceof BPMNDataObject){
				
			}
				
		
			
		})
		
		
			//effettuo il mapping relativo ai link presenti nel diagramma
			var allLinks=graph.getLinks();
			_.each(allLinks, function (link) {
				
				//inserisco un nuovo elemento di tipo Flow
				 xmlWriter.writeStartElement('Flow');
				 
				 xmlWriter.writeAttributeString('islink',"true");
				 xmlWriter.writeAttributeString('id',idMap[link.id]);
				 xmlWriter.writeAttributeString('from',idMap[link.get('source').id]);
				 xmlWriter.writeAttributeString('to',idMap[link.get('target').id]);
				
				 // verifico se il link ha una condition.
				 if(link.attributes.labels[1].attrs.text.text){
				 xmlWriter.writeStartElement('property');
				 xmlWriter.writeAttributeString('name',"Condition");
				 xmlWriter.writeString((link.attributes.labels[1].attrs.text.text).slice(1, -1));
				//chiusura elemento property
				 xmlWriter.writeEndElement();
				 }
				
				 //chiusura elemento Flow
				 xmlWriter.writeEndElement();
					
				
			})
	 //chiusura elemento diagram
	xmlWriter.writeEndElement();
	return xmlWriter;
}