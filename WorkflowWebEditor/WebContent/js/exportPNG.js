
function exportSVG() { 
	paper.toSVG(function(svgPaper) {
		var clientRect = paper.viewport.getBoundingClientRect();
		contentWidth = clientRect.width || 1;
		contentHeight = clientRect.height || 1;
	var svgStringData = svgPaper = svgPaper.replace('width="100%"','width="' + contentWidth + '"').replace('height="100%"','height="' + contentHeight + '"');
		//add name spaces.
		if(!svgStringData.match(/^<svg[^>]+xmlns="http\:\/\/www\.w3\.org\/2000\/svg"/)){
			svgStringData = svgStringData.replace(/^<svg/, '<svg xmlns="http://www.w3.org/2000/svg"');
		}
		if(!svgStringData.match(/^<svg[^>]+"http\:\/\/www\.w3\.org\/1999\/xlink"/)){
			svgStringData = svgStringData.replace(/^<svg/, '<svg xmlns:xlink="http://www.w3.org/1999/xlink"');
		}

		//add xml declaration
		svgStringData = '<?xml version="1.0" standalone="no"?>\r\n' + svgStringData;

		//convert svg source to URI data scheme.
		var url = "data:image/svg+xml;charset=utf-8,"+encodeURIComponent(svgStringData);

		var downloadLink = document.createElement("a");
		downloadLink.href = url;
		
		
		downloadLink.download = $('#process-process-name').val()+".svg";
		
		document.body.appendChild(downloadLink);
		downloadLink.click();
		//document.body.removeChild(canvas);
		document.body.removeChild(downloadLink);
	})
}

function exportPNG() { 
	if($('#process-process-name').val()=="")
		alert("PROCESS NAME IS EMPTY!");
	else{
	paper.toSVG(function(svgPaper) {
		img = new Image();
		var clientRect = paper.viewport.getBoundingClientRect();
		contentWidth = clientRect.width || 1;
		contentHeight = clientRect.height || 1;
		var svgStringData = svgPaper = svgPaper.replace('width="100%"','width="' + contentWidth + '"').replace('height="100%"','height="' + contentHeight + '"');
	    	 
		img.src = "data:image/svg+xml;utf8," + svgStringData;
		
		var canvas = document.createElement('canvas');
		canvas.width =contentWidth;
		canvas.height = contentHeight;
		//document.body.appendChild(canvas);
		canvas.getContext("2d").drawImage(img,0,0);
		
		var imgURL = canvas.toDataURL("image/png");
		
		
		var downloadLink = document.createElement("a");
		downloadLink.href = imgURL;
		
		
		downloadLink.download = $('#process-process-name').val()+".png";
		
		document.body.appendChild(downloadLink);
		downloadLink.click();
		//document.body.removeChild(canvas);
		document.body.removeChild(downloadLink);
	
		
		
	}, {});
	}
//OLD
//	 paper.toSVG(function(svgPaper) {
//    	 	
//    	 	console.log("ANTO BEFORE PRINT SVG:"+ svgPaper);
//    	 	var clientRect = paper.viewport.getBoundingClientRect();
//
//    		contentWidth = clientRect.width || 1;
//    		contentHeight = clientRect.height || 1;
//    	 	var svgStringData = svgPaper = svgPaper.replace('width="100%"','width="' + contentWidth + '"').replace('height="100%"','height="' + contentHeight + '"');
//    	 
//    	 	//start
//    	 	var canvas = document.getElementById('canvas');
//    	    var ctx    = canvas.getContext('2d');
//    	    
//    	    
//    	    var DOMURL = window.URL || window.webkitURL || window;
//    	    
//    	    var img = new Image();
//    	    img.crossOrigin="anonymous"
//    	    var svg = new Blob([svgStringData], {type: 'image/svg+xml;charset=utf-8'});
//    	    var url = DOMURL.createObjectURL(svg);
//    	    
//    	    img.src = url;
//    	  
//
//    	  
//    	    img.onload = function () {
//    	      ctx.drawImage(img, 0, 0);
//    	    //  DOMURL.revokeObjectURL(url);
//    	     
//    	    }
//   	    
//    	    img.src = url;
//    	   
//    	    setTimeout(function(){
//    	    var image = new Image();
//    	    image.crossOrigin="anonymous";
//	 		image.src = document.getElementById('canvas').toDataURL("image/png");
//			
//			//window.open(image.src)
//	 		var url2 = image.src.replace(/^data:image\/[^;]/, 'data:application/octet-stream');
//	 		
//	 		
//	 		var downloadLink = document.createElement("a");
////	 		downloadLink.href = url2;
//	 		downloadLink.href = document.getElementById('canvas').toDataURL();
//	 		downloadLink.download = "diagram.png";
//
//	 		document.body.appendChild(downloadLink);
//	 		downloadLink.click();
//	 		document.body.removeChild(downloadLink);
//	 		
//	 		 }, 1000);
//    	    
//    	  //end
//    	    
//    	    
////    	 	canvg(document.getElementById('canvas'), svgStringData);
////    	 
////    	 	
////    	 	setTimeout(function(){ var image = new Image();
////	 		image.src = (document.getElementById('canvas')).toDataURL("image/png");
////			
////	 		var url = image.src.replace(/^data:image\/[^;]/, 'data:application/octet-stream');
////	 		
////	 		
////	 		var downloadLink = document.createElement("a");
////	 		downloadLink.href = url;
////	 		downloadLink.download = "diagram.png";
////
////	 		document.body.appendChild(downloadLink);
////	 		downloadLink.click();
////	 		document.body.removeChild(downloadLink);
//	 		
////	 		 }, 1000);
//    	 	
//    	 	
//    	 	 
//    	 	//SALVO L'SVG
////    	 	var svgFile = new Blob([svgStringData], {type: 'image/svg+xml'});
////    	 	var fileNameToSaveAs = "DiagramPNG";
////
////			var downloadLink = document.createElement("a");
////			downloadLink.download = fileNameToSaveAs;
////			downloadLink.innerHTML = "Download File";
////			if (window.webkitURL != null)
////			{
////				downloadLink.href = window.webkitURL.createObjectURL(svgFile);
////			}
////			else
////			{
////				
////				downloadLink.href = window.URL.createObjectURL(svgFile);
////				downloadLink.style.display = "none";
////				document.body.appendChild(downloadLink);
////			}
////
////			downloadLink.click();
//    	 		
//    	 		
//    	    }, {});

}
