package com.mediaset.kdshp;

import java.util.Date;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;

import org.json.simple.JSONArray;
import org.json.simple.JSONObject;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.orm.ibatis.SqlMapClientTemplate;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import com.mediaset.kdshp.dao.common.AjaxResultCode;
import com.mediaset.kdshp.util.MailSendComponent;
import com.mediaset.kdshp.util.XmlFileManager;

@Controller
public class support {
	
	private static final Logger logger = LoggerFactory.getLogger(support.class);
	
	@Autowired
	private SqlMapClientTemplate sqlMap;
	
	@Autowired
	private MailSendComponent mailSender;
	
	
	/**
	 * <p>고객지원 Navigator</p>
	 * <br>
	 * 
	 * @param request HttpServletRequest - 요청 데이터
	 */
	@RequestMapping(value = "/support", method=RequestMethod.POST)
	public String moveToSupport(HttpServletRequest request) {
		
		logger.info("Msg> Connect(/support)-Time: *************** " + new Date(System.currentTimeMillis()) + " ***************");
		
		HttpSession session = request.getSession();
		JSONArray sub_views = (JSONArray)session.getAttribute("support_views");
		
		if(sub_views == null){
			String sub_views_XF = "http://"+request.getServerName()+":"+request.getServerPort()+"/xml/sub_views.xml";
			sub_views = XmlFileManager.getValue2nd(XmlFileManager.readXMLFile(sub_views_XF), "support");
		}
		
		String snbIdx   = (request.getParameter("snbIdx").equals("") ? "1" : (request.getParameter("snbIdx")));
		String viewName = XmlFileManager.getNameOfValue(sub_views, snbIdx);
		
		request.setAttribute("lnbIdx", request.getParameter("lnbIdx"));
		request.setAttribute("snbIdx", snbIdx);
		
		logger.info("Msg> Disconnect(/support)-Time: *************** " + new Date(System.currentTimeMillis()) + " ***************");
		return "support/"+viewName+".mv";
	}
	
	
	
	/**
	 * <p>고객지원 - 신청서작성</p>
	 * <br>
	 * 
	 * @param request HttpServletRequest
	 * @param mMap Map
	 * @return JSONObject
	 */
	@SuppressWarnings("unchecked")
	@RequestMapping(value="/support/mkApplication.json",headers="Accept=application/json", 
					  method=RequestMethod.POST)
	public @ResponseBody JSONObject makeApplication(HttpServletRequest request,
												          @RequestParam Map<String, String> mMap){
		
		logger.info("Msg> Connect(support > makeApplication)-Time: *************** " +  new Date(System.currentTimeMillis()) + " ***************");
		
		JSONObject jsonObj =  new JSONObject();
		
		String dentalClinic = mMap.get("dentalClinic");
		String dentist      = mMap.get("dentist");
		String contact      = mMap.get("contract");
		String addr         = mMap.get("addr"); 
		String memo         = mMap.get("memo"); 
		
		
		int resultcode = AjaxResultCode.SUCCESS;
		
		 StringBuilder contents = new StringBuilder();
		 contents.append("<p><b>"+ dentalClinic +" ("+ dentist +" <small>원장님</small>)</b>에서 셋탑박스 설치를 요청하였습니다.</p>");
		 contents.append("<p>"+ memo +"</p>");
		 contents.append("<p>"+ addr +" </p>");
		 contents.append("<p>"+ contact +"</p>");

		 try {
			mailSender.sendMail("("+dentalClinic+") 의료정책방송 신청", contents.toString());
			
			// 신청내용 DB 저장
			
			
		} catch (Exception e) {
			resultcode = AjaxResultCode.FAIL;
		}
		
		 jsonObj.put("result", resultcode);
		
		logger.info("Msg> DisConnect(support > makeApplication)-Time: *************** " +  new Date(System.currentTimeMillis()) + " ***************");
		
		return jsonObj;  
	}
		
	

}
