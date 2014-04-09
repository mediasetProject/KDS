package com.mediaset.kdshp;

import java.util.Date;
import java.util.HashMap;
import java.util.List;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.orm.ibatis.SqlMapClientTemplate;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

import com.mediaset.kdshp.util.MailSendComponent;
import com.mediaset.kdshp.util.XmlFileManager;


@Controller
public class MainController {

	private static final Logger logger = LoggerFactory.getLogger(MainController.class);
	
	@Autowired
	private SqlMapClientTemplate sqlMap;
	
	
	
	/**
	 * <p>KDS 홈페이지 Root</p>
	 * <br>
	 * 
	 * @param request HttpServletRequest - 요청 데이터
	 */
	@RequestMapping(value = "/")
	public String connectKDS_HomePage(HttpServletRequest request) {
		
		logger.info("Msg> Connect(/)-Time: *************** " + new Date(System.currentTimeMillis()) + " ***************");
		
		logger.info("SysInfo > java.version  : " + System.getProperty("java.version"));
		logger.info("SysInfo > java.home     : " + System.getProperty("java.home"));
		logger.info("SysInfo > os.name       : " + System.getProperty("os.name"));
		logger.info("SysInfo > os.arch       : " + System.getProperty("os.arch"));
		logger.info("SysInfo > os.version    : " + System.getProperty("os.version"));
		logger.info("SysInfo > file.encoding : " + System.getProperty("file.encoding"));
		
		
		HttpSession session = request.getSession();
		
		
		// 서브페이지 리스트 세션 등록
		String sub_views_XF = "http://"+request.getServerName()+":"+request.getServerPort()+"/xml/sub_views.xml";
		
		session.setAttribute("company_views"  , XmlFileManager.getValue2nd(XmlFileManager.readXMLFile(sub_views_XF), "company"));
		session.setAttribute("broadcast_views", XmlFileManager.getValue2nd(XmlFileManager.readXMLFile(sub_views_XF), "broadcast"));
		session.setAttribute("advert_views"   , XmlFileManager.getValue2nd(XmlFileManager.readXMLFile(sub_views_XF), "advert"));
		session.setAttribute("support_views"  , XmlFileManager.getValue2nd(XmlFileManager.readXMLFile(sub_views_XF), "support"));

		
		
		logger.info("Msg> Disconnect(/)-Time: *************** " + new Date(System.currentTimeMillis()) + " ***************");
		return "index";
	}
	
			
	/**
	 * <p>KDS 홈페이지 다운로드 메뉴</p>
	 * <br>
	 * 
	 * @param request HttpServletRequest - 요청 데이터
	 */
	@RequestMapping(value = "/download")
	public String pdfDownload(HttpServletRequest request) {
		
		logger.info("Msg> Connect(/download)-Time: *************** " + new Date(System.currentTimeMillis()) + " ***************");
		
		
		logger.info("Msg> Disconnect(/download)-Time: *************** " + new Date(System.currentTimeMillis()) + " ***************");
		return "/download/pdfview";
	}		
	
	
	///////////////////////////////////////////////////////////////////////////////////////////////////////////////		
	
	@RequestMapping(value = "/sample")
	public String sample(HttpServletRequest request) {
		
		logger.info("Msg> Connect(/download)-Time: *************** " + new Date(System.currentTimeMillis()) + " ***************");
		
		

		
		logger.info("Msg> Disconnect(/download)-Time: *************** " + new Date(System.currentTimeMillis()) + " ***************");
		return "sample2.mv";
	}		
	///////////////////////////////////////////////////////////////////////////////////////////////////////////////	



}
