package cnr.icar.aose.webeditor;

import java.io.IOException;
import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import dbBean.Process;
import dbDAO.ProcessDAO;

/**
 * Servlet implementation class SaveDiagrammDB
 */
@WebServlet("/SaveDiagrammDB")
public class SaveDiagrammDB extends HttpServlet {
	private static final long serialVersionUID = 1L;
       
    /**
     * @see HttpServlet#HttpServlet()
     */
    public SaveDiagrammDB() {
        super();
        // TODO Auto-generated constructor stub
    }

	/**
	 * @see HttpServlet#doGet(HttpServletRequest request, HttpServletResponse response)
	 */
	protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		// TODO Auto-generated method stub
	}

	/**
	 * @see HttpServlet#doPost(HttpServletRequest request, HttpServletResponse response)
	 */
	protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		ProcessDAO processDAO=new ProcessDAO();
		Process processDb=processDAO.getProcessById(Integer.parseInt(request.getParameter("idWorkflow")));
		System.out.println("data-->"+request.getParameter("workFlowData"));
		byte[] bFile = request.getParameter("workFlowData").getBytes();
		processDb.setFileWf(bFile);
			processDAO.saveOrUpdateProcess(processDb);
	}

}
