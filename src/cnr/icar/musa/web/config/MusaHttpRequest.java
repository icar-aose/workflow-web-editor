package cnr.icar.musa.web.config;

import java.io.IOException;

import java.net.URISyntaxException;

import org.apache.http.HttpEntity;
import org.apache.http.HttpResponse;
import org.apache.http.client.ClientProtocolException;
import org.apache.http.client.HttpClient;
import org.apache.http.client.methods.HttpPost;
import org.apache.http.entity.StringEntity;
import org.apache.http.impl.client.HttpClientBuilder;
import org.apache.http.util.EntityUtils;
import org.json.JSONException;
import org.json.JSONObject;

import cnr.icar.musa.web.config.MusaProperties;

public  class MusaHttpRequest {
 public  static String callMusaServlet( JSONObject goals_json, String context) throws JSONException, ClientProtocolException, IOException, URISyntaxException{
		 
		 
		 HttpClient httpClient = HttpClientBuilder.create().build(); //Use this instead 
		 String setPath="http://%s:%s/"+context;
		 String host = String.format(setPath, MusaProperties.getIpAdress(), MusaProperties.getPort());
         System.out.println("Sending to "+host);
         HttpPost request = new HttpPost(host);
         
         StringEntity params = new StringEntity(goals_json.toString().trim());
         request.addHeader("content-type", "application/x-www-form-urlencoded");
         request.setEntity(params);
         HttpResponse response = httpClient.execute(request);

         HttpEntity entity = response.getEntity();  
         final String content = EntityUtils.toString(entity);
 
         System.out.println("response: "+content);
			return content;
             
	}
 
 public  static String sendGoalSpecToMusa(String context,String message) throws ClientProtocolException, IOException{
	 
	 HttpClient httpClient = HttpClientBuilder.create().build();
	 String setPath="http://%s:%s/"+context;
	 String host = String.format(setPath, MusaProperties.getIpAdress(), MusaProperties.getPort());
     System.out.println("Sending to "+host);
     HttpPost request = new HttpPost(host);
     
     StringEntity params = new StringEntity(message);
     request.addHeader("content-type", "application/x-www-form-urlencoded");
     request.setEntity(params);
     HttpResponse response = httpClient.execute(request);

     HttpEntity entity = response.getEntity();  
     final String content = EntityUtils.toString(entity);

     System.out.println("response: "+content);
		return content;
	 
 }
 public  static String sendMessageToMusa(String context,String message){
	   String content="";
	 HttpClient httpClient = HttpClientBuilder.create().build(); //Use this instead 
	 String setPath="http://%s:%s/"+context;
	 String host = String.format(setPath, MusaProperties.getIpAdress(), MusaProperties.getPort());
     System.out.println("Sending to "+host);
     HttpPost request = new HttpPost(host);
     
     StringEntity params;
	try {
		params = new StringEntity(message);
	
     request.addHeader("content-type", "application/x-www-form-urlencoded");
     
     request.setEntity(params);
     HttpResponse response = httpClient.execute(request);

     HttpEntity entity = response.getEntity();  
     content = EntityUtils.toString(entity);

     System.out.println("response: "+content);
		

	} catch (IOException e) {
		// TODO Auto-generated catch block
		e.printStackTrace();
	}
	
	return content;

 }

}
