package com.mediaset.kdshp;

import java.util.Date;
import java.util.HashMap;
import java.util.List;

import javax.servlet.http.HttpServletRequest;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.orm.ibatis.SqlMapClientTemplate;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;


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
		
		logger.info("Msg> Disconnect(/)-Time: *************** " + new Date(System.currentTimeMillis()) + " ***************");
		return "index";
	}
	
	
}
