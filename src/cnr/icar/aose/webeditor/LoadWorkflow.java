package cnr.icar.aose.webeditor;

import java.io.FileOutputStream;
import java.io.IOException;
import java.io.PrintWriter;
import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Statement;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.json.JSONException;
import org.json.JSONObject;

import cnr.icar.musa.web.config.MusaProperties;
import dbBean.Process;
import dbDAO.ProcessDAO;

/**
 * Servlet implementation class LoadWorkflow
 */
@WebServlet("/LoadWorkflow")
public class LoadWorkflow extends HttpServlet {
	private static final long serialVersionUID = 1L;
       
    /**
     * @see HttpServlet#HttpServlet()
     */
    public LoadWorkflow() {
        super();
        // TODO Auto-generated constructor stub
    }

	/**
	 * @see HttpServlet#doGet(HttpServletRequest request, HttpServletResponse response)
	 */
	protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		ProcessDAO processDAO=new ProcessDAO();
		Process processDb=processDAO.getProcessById(Integer.parseInt(request.getParameter("idWorkflow")));
		byte[]   diagramSaved= processDb.getFileWf();
		 try{
			 
			 String absolutePath = getServletContext().getRealPath("/");
//			 System.out.println("absolutePath-->"+absolutePath);
		     FileOutputStream fos = new FileOutputStream(absolutePath+"/tmpProcess/tempProcess.json"); 
		     fos.write(diagramSaved);
		     fos.close();
		     
		 }catch(Exception e){
		     e.printStackTrace();
		 }
			 
//		 String query="SELECT * FROM process  WHERE idWorkflow= '"+request.getParameter("idWorkflow")+"'";
//			
//		 System.out.println("query-->"+query);
//
//		 byte[]   diagramSaved = null;
//		 String dbMusaAdress=MusaProperties.getDbMusaAdress();
//			String dbPort=MusaProperties.getDbPort();
//			String userDB=MusaProperties.getUserDB();
//			String passDB=MusaProperties.getPassDB();
//		    String dbName=MusaProperties.getDbName();
//			
//			try {
//				Class.forName("com.mysql.jdbc.Driver").newInstance();
//				   Connection dbconn=DriverManager.getConnection("jdbc:mysql://"+dbMusaAdress+":"+dbPort+"/"+dbName,userDB,passDB);
//					Statement statement = dbconn.createStatement();
//					ResultSet rs = statement.executeQuery(query);
//					
//					  while (rs.next()) 
//						{
//							
//						  diagramSaved = rs.getBytes("fileWF");
//						}
//					  System.out.println("diagramSaved-->"+diagramSaved);
//					  
//						 try{
//					     FileOutputStream fos = new FileOutputStream("./tmpProcess/tempProcess.json"); 
//					     fos.write(diagramSaved);
//					     fos.close();
//					     
//					 }catch(Exception e){
//					     e.printStackTrace();
//					 }
//			} catch (InstantiationException | IllegalAccessException
//					| ClassNotFoundException e) {
//				// TODO Auto-generated catch block
//				e.printStackTrace();
//			} catch (SQLException e) {
//				// TODO Auto-generated catch block
//				e.printStackTrace();
//			}
//			
//		
//				PrintWriter httpout = response.getWriter();
//		        
//			    httpout.println(diagramSaved);
//		     
//			
			
		 
	
	}

	/**
	 * @see HttpServlet#doPost(HttpServletRequest request, HttpServletResponse response)
	 */
	protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		// TODO Auto-generated method stub
	}

}
