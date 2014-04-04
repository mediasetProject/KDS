package com.mediaset.kdshp;

import java.util.Date;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;

import org.json.simple.JSONArray;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.orm.ibatis.SqlMapClientTemplate;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

import com.mediaset.kdshp.util.XmlFileManager;


@Controller
public class Company {

	private static final Logger logger = LoggerFactory.getLogger(Company.class);
	
	@Autowired
	private SqlMapClientTemplate sqlMap;
	
	
	/**
	 * <p>Company Navigator</p>
	 * <br>
	 * 
	 * @param request HttpServletRequest - 요청 데이터
	 */
	@RequestMapping(value = "/company", method=RequestMethod.POST)
	public String moveToCompany(HttpServletRequest request) {
		
		logger.info("Msg> Connect(/company)-Time: *************** " + new Date(System.currentTimeMillis()) + " ***************");
		  
		HttpSession session = request.getSession();
		JSONArray sub_views = (JSONArray)session.getAttribute("company_views");
		
		if(sub_views == null){
			String sub_views_XF = "http://"+request.getServerName()+":"+request.getServerPort()+"/xml/sub_views.xml";
			sub_views = XmlFileManager.getValue2nd(XmlFileManager.readXMLFile(sub_views_XF), "company");
		}
		
		String snbIdx   = (request.getParameter("snbIdx").equals("") ? "1" : (request.getParameter("snbIdx")));
		String viewName = XmlFileManager.getNameOfValue(sub_views, snbIdx);
		
		request.setAttribute("lnbIdx", request.getParameter("lnbIdx"));
		request.setAttribute("snbIdx", snbIdx);
		
		logger.info("Msg> Disconnect(/company)-Time: *************** " + new Date(System.currentTimeMillis()) + " ***************");
		return "company/"+viewName+".mv";
	}
	
	
	
	
}
