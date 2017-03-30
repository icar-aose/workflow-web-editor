package cnr.icar.musa.web.config;

public class MusaProperties {
//	private static String ipAdress="194.119.214.114";
//	private static String dbMusaAdress="194.119.214.121";
//	private static String dbPort="3306";
//	private static String userDB="occp_root";
//	private static String passDB="occp_root_password_2014";
//	private static String dbName="musa_workflow";
//	private static String port="2004";

	private static String ipAdress="aose.pa.icar.cnr.it";
	private static String dbMusaAdress="aose.pa.icar.cnr.it";
	private static String dbPort="3306";
	private static String userDB="root";
	private static String passDB="aose_serverino_2015";
	private static String dbName="musa_db";
	private static String port="2004";
	
//	LOCALE
//	http://aose.pa.icar.cnr.it/
//	private static String ipAdress="localhost";
//	private static String dbMusaAdress="localhost";
//	private static String dbPort="3306";
//	private static String userDB="root";
//	private static String passDB="root";
//	private static String dbName="musa_db";
//	private static String port="2004";
	
	//IPUBLIC CONFIGURAZIONI
//	private static String ipAdress="192.168.111.64";
//	private static String dbMusaAdress="192.168.111.64";
//	private static String dbPort="3306";
//	private static String userDB="root";
//	private static String passDB="password";
//	private static String dbName="musa_workflow";
//	private static String port="2004";
//	
	public static String getIpAdress() {
		return ipAdress;
	}
	public static void setIpAdress(String ipAdress) {
		MusaProperties.ipAdress = ipAdress;
	}
	public static String getPort() {
		return port;
	}
	public static void setPort(String port) {
		MusaProperties.port = port;
	}
	public static String getDbMusaAdress() {
		return dbMusaAdress;
	}
	public static void setDbMusaAdress(String dbMusaAdress) {
		MusaProperties.dbMusaAdress = dbMusaAdress;
	}
	public static String getDbPort() {
		return dbPort;
	}
	public static void setDbPort(String dbPort) {
		MusaProperties.dbPort = dbPort;
	}
	public static String getUserDB() {
		return userDB;
	}
	public static void setUserDB(String userDB) {
		MusaProperties.userDB = userDB;
	}
	public static String getPassDB() {
		return passDB;
	}
	public static void setPassDB(String passDB) {
		MusaProperties.passDB = passDB;
	}
	public static String getDbName() {
		return dbName;
	}
	public static void setDbName(String dbName) {
		MusaProperties.dbName = dbName;
	}

	
	
}
