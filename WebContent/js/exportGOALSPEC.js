/**
 * 
 */

function getGoalsSpecFromBPMN(){
	
	console.log("GET GOALS FROM BPMN idFileBPMNSAVED-->");
	 var  xmlWriter=createXMIFile();
	console.log("xmlWriter-->"+xmlWriter.flush())
	var ipAdress="aose.pa.icar.cnr.it:8080";
	//var ipAdress="localhost:8080";
	 $.ajax({
		url : "http://"+ipAdress+"/BPMN2REQWEB/GetGoalSpecFromBPMNServlet",
	    type: "POST",
		data:{"bpmnDiagramm":xmlWriter.flush()},
	    crossDomain: true,
	    dataType: 'json',
//	    jsonp: 'callback',
//        jsonpCallback: 'jsonpCallback',
//        cache: true,
	    success : function (data) {
	    	console.log("GOAL SPEC :"+data.goals)
	    	
	    	var textFileAsBlob = new Blob([data.goals], {type:'text/plain;charset=utf-8'});
			var fileNameToSaveAs = "GoalSPECToBPMN";

			saveAs(textFileAsBlob, fileNameToSaveAs);
		  
			
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
			},
			
	     error : function (richiesta,stato,errori) {
	     console.log("ERRORE: "+errori)
	    	console.log("STATO: "+stato)
		    }
	   
	});  
	
}




function jsonpCallback(data) {
        console.log("callback",data);
        //do nothing    
    }