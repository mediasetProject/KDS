package com.mediaset.kdshp.support;

import java.io.File;
import java.io.IOException;
import java.util.ArrayList;
import java.util.Calendar;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;

import org.json.simple.JSONArray;
import org.json.simple.JSONObject;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataAccessException;
import org.springframework.orm.ibatis.SqlMapClientTemplate;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.multipart.MultipartHttpServletRequest;
import org.springframework.web.servlet.ModelAndView;

import com.mediaset.kdshp.common.AjaxResultCode;
import com.mediaset.kdshp.common.KDSCodeMaster;
import com.mediaset.kdshp.common.jqGridParameters;
import com.mediaset.kdshp.util.DateUtil;
import com.mediaset.kdshp.util.FileUtil;
import com.mediaset.kdshp.util.MailSendComponent;
import com.mediaset.kdshp.util.XmlFileManager;
import com.mediaset.kdshp.util.FileUtil;

@Controller
public class SupportController {
	
	private static final Logger logger = LoggerFactory.getLogger(SupportController.class);
	
	@Autowired
	private SqlMapClientTemplate sqlMap;
	
	@Autowired
	private MailSendComponent mailSender;
	
	private String SLASH = "/";
	private String NOTICE_DIR = "notice";
	private String REPORT_DIR = "report";
	int THIS_YEAR              = Calendar.getInstance().get(Calendar.YEAR);
	
	private String noticeSqlMap = "notice_sqlMap.";
	private String reportqlMap  = "report_sqlMap.";
	
	
	
    /*****************************	고객지원 - 공지사항 *****************************/
	
	/**
	 * <p>공지사항 조회 (jqGrid)</p>
	 * <br>
	 * 
	 * @param request HttpServletRequest
	 * @param mMap Map
	 * @return JSONObject
	 */
	@SuppressWarnings("unchecked")
	@RequestMapping(value="/support/notice/queryNoticeList",headers="Accept=application/json", 
					  method=RequestMethod.POST)
	public @ResponseBody JSONObject queryNoticeList(HttpServletRequest request, jqGridParameters jqGridParam, @RequestParam Map<String, Object> mMap){
		
		logger.info("Msg> Connect(SupportController > queryNoticeList)-Time: *************** " +  new Date(System.currentTimeMillis()) + " ***************");
		JSONObject jsonObj =  new JSONObject();
		
		List<HashMap<String,Object>> infoTopList = null;  // 상단표출 공지사항
		List<HashMap<String,Object>> infoList    = null;  // 일반표출 공지사항 
		HashMap<String,String> jqGridData        = null;
		
		int rows = jqGridParam.getRows();
		int page = jqGridParam.getPage();
		
		mMap.put("startRow", (page-1)*rows);
		mMap.put("page", page);
		mMap.put("rows", rows);
		
		int rowcount = (Integer)sqlMap.queryForObject(noticeSqlMap + "queryNoticeListRows", mMap); 
		
		int total_pages = 0 ;
		total_pages = (rowcount > 0) ? (int)(java.lang.Math.ceil( (double)rowcount / rows)) : 0; 
		
		
		jsonObj.put("total"   , total_pages);       // 1. 
		jsonObj.put("page"    , page);	        	  // 2. 
		jsonObj.put("records" , rowcount);	         // 3. 
		
		ArrayList<HashMap<String,String>> jqGridRows = new ArrayList<HashMap<String,String>>();
		
		infoTopList = (List<HashMap<String,Object>>)sqlMap.queryForList(noticeSqlMap + "queryTopNoticeList", mMap);
		infoList    = (List<HashMap<String,Object>>)sqlMap.queryForList(noticeSqlMap + "queryNoticeList", mMap);
		
		
		// 상단표출 공지사항 jqGrid  추가
		if(infoTopList.size() > 0 ){
			for (int i = 0; i < infoTopList.size(); i++) {
				jqGridData = new HashMap<String,String>();
				jqGridData.put("id"       , infoTopList.get(i).get("seq").toString());
				jqGridData.put("seq"      , "공 지");
				jqGridData.put("title"    , infoTopList.get(i).get("title").toString());
				jqGridData.put("writer"   , infoTopList.get(i).get("writer").toString());
				jqGridData.put("reg_date" , infoTopList.get(i).get("reg_date").toString());
				jqGridData.put("content"      , infoTopList.get(i).get("content").toString());
				jqGridData.put("read_account" , infoTopList.get(i).get("read_account").toString());
				jqGridData.put("file_name"    , infoTopList.get(i).get("file_name").toString());
				jqGridData.put("file_path"    , infoTopList.get(i).get("file_path").toString());
				jqGridData.put("has_priority" , infoTopList.get(i).get("has_priority").toString());
				
				jqGridRows.add(jqGridData);
			}
		}
		
		// 일반표출 공지사항 jqGrid  추가
		if(infoList.size() > 0){
			for (int i = 0; i < infoList.size(); i++) {
				
				jqGridData = new HashMap<String,String>();
				
				jqGridData.put("id"       , infoList.get(i).get("seq").toString());
				jqGridData.put("seq"      , infoList.get(i).get("seq").toString());
				jqGridData.put("title"    , infoList.get(i).get("title").toString());
				jqGridData.put("writer"   , infoList.get(i).get("writer").toString());
				jqGridData.put("reg_date" , infoList.get(i).get("reg_date").toString());
				jqGridData.put("content"      , infoList.get(i).get("content").toString());
				jqGridData.put("read_account" , infoList.get(i).get("read_account").toString());
				jqGridData.put("file_name"    , infoList.get(i).get("file_name").toString());
				jqGridData.put("file_path"    , infoList.get(i).get("file_path").toString());
				jqGridData.put("has_priority" , infoList.get(i).get("has_priority").toString());
				
				jqGridRows.add(jqGridData);
			}
		}
		
		jsonObj.put("rows", jqGridRows);     // 4. 
		
		logger.info("Msg> DisConnect(SupportController > queryNoticeList)-Time: *************** " +  new Date(System.currentTimeMillis()) + " ***************");
		
		return jsonObj;  
	}
	
	
	/**
	 * <p>공지사항 입력</p>
	 * <br>
	 * 
	 * @param request HttpServletRequest
	 * @param mMap Map
	 * @return JSONObject
	 */
	@SuppressWarnings("unchecked")
	@RequestMapping(value="/support/notice/addNotice",headers="Accept=application/json", 
					  method=RequestMethod.POST)
	public @ResponseBody JSONObject addNotice(HttpServletRequest request, jqGridParameters jqGridParam, @RequestParam Map<String, Object> mMap){
		
		logger.info("Msg> Connect(SupportController > addNotice)-Time: *************** " +  new Date(System.currentTimeMillis()) + " ***************");
		JSONObject jsonObj =  new JSONObject();

		int resultcode = AjaxResultCode.SUCCESS;
		
		try {
			
			  fileUplad_inserArticle(request, mMap);
			  
		  } catch (Exception e) {
			resultcode = AjaxResultCode.FAIL;
		 }
		
		 jsonObj.put("result", resultcode);
		
		logger.info("Msg> DisConnect(SupportController > queryNoticeList)-Time: *************** " +  new Date(System.currentTimeMillis()) + " ***************");
		
		return jsonObj;  
	}
	
	
	/**
	 * <p>공지사항 수정</p>
	 * <br>
	 * 
	 * @param request HttpServletRequest
	 * @param mMap Map
	 * @return JSONObject
	 */
	@SuppressWarnings("unchecked")
	@RequestMapping(value="/support/notice/updateArticle",headers="Accept=application/json", 
					  method=RequestMethod.POST)
	public @ResponseBody JSONObject updateArticle(HttpServletRequest request, @RequestParam Map<String, Object> mMap){
		
		logger.info("Msg> Connect(SupportController > updateArticle)-Time: *************** " +  new Date(System.currentTimeMillis()) + " ***************");
		JSONObject jsonObj =  new JSONObject();
		int resultcode = AjaxResultCode.SUCCESS;
		
		try {
			
			this.delFileAndArticle(request, mMap);
			this.fileUplad_inserArticle(request, mMap);
			
		  } catch (Exception e) {
			  logger.debug(e.getMessage());
			resultcode = AjaxResultCode.FAIL;
		 }
		
		 jsonObj.put("result", resultcode);
		
		logger.info("Msg> DisConnect(SupportController > updateArticle)-Time: *************** " +  new Date(System.currentTimeMillis()) + " ***************");
		
		return jsonObj;  
	}
	
	
	/**
	 * <p>공지사항 삭제</p>
	 * <br>
	 * 
	 * @param request HttpServletRequest
	 * @param mMap Map
	 * @return JSONObject
	 */
	@SuppressWarnings("unchecked")
	@RequestMapping(value="/support/notice/delArticle",headers="Accept=application/json", 
					  method=RequestMethod.POST)
	public @ResponseBody JSONObject delArticle(HttpServletRequest request, @RequestParam Map<String, Object> mMap){
		
		logger.info("Msg> Connect(SupportController > delArticle)-Time: *************** " +  new Date(System.currentTimeMillis()) + " ***************");
		JSONObject jsonObj =  new JSONObject();
		int resultcode = AjaxResultCode.SUCCESS;
		
		try {
			
			this.delFileAndArticle(request, mMap);
			
		  } catch (Exception e) {
			resultcode = AjaxResultCode.FAIL;
		 }
		
		 jsonObj.put("result", resultcode);
		
		logger.info("Msg> DisConnect(SupportController > delArticle)-Time: *************** " +  new Date(System.currentTimeMillis()) + " ***************");
		
		return jsonObj;  
	}
	
	
	/**
	 * <p>공지사항 조회수 증가</p>
	 * <br>
	 * 
	 * @param request HttpServletRequest
	 * @param mMap Map
	 * @return JSONObject
	 */
	@SuppressWarnings("unchecked")
	@RequestMapping(value="/support/notice/increaseArticleReadAccount",headers="Accept=application/json", 
					  method=RequestMethod.POST)
	public @ResponseBody JSONObject increaseArticleReadAccount(HttpServletRequest request, @RequestParam Map<String, Object> mMap){
		
		logger.info("Msg> Connect(SupportController > increaseArticleReadAccount)-Time: *************** " +  new Date(System.currentTimeMillis()) + " ***************");
		JSONObject jsonObj =  new JSONObject();
		int resultcode = AjaxResultCode.SUCCESS;
		
		try {
			
			sqlMap.delete(noticeSqlMap + "updateArticleReadAccount", mMap);
			
		  } catch (Exception e) {
			resultcode = AjaxResultCode.FAIL;
		 }
		
		 jsonObj.put("result", resultcode);
		
		logger.info("Msg> DisConnect(SupportController > increaseArticleReadAccount)-Time: *************** " +  new Date(System.currentTimeMillis()) + " ***************");
		
		return jsonObj;  
	}
	
	
   private void fileUplad_inserArticle(HttpServletRequest request, Map<String, Object> mMap)throws Exception{
		
		logger.info("Msg> Connect(SupportController > fileUplad_inserArticle)-Time: *************** " +  new Date(System.currentTimeMillis()) + " ***************");

		
	    String storageDir = XmlFileManager.getOnlyValue((JSONArray)(request.getSession().getAttribute("storage_path")));
	    
	    String fileUrl     = null;
	    String orgFileName = null;
	    String fileExt     = null;
	    String filePath    = null;
			
		 if((mMap.get("upload_file_chk").equals("true"))){
			
			// 업로드 파일 저장
			fileUrl     = mMap.get("upload_file_path").toString().trim();
			orgFileName = mMap.get("fileName").toString().trim();	
			fileExt     = mMap.get("fileExt").toString().trim();	
			
			//DB에 저장되는 파일명 생성
			String file     = "notice_"+ DateUtil.dateToStrTime(new Date(), DateUtil.DATE_TO_STR_TIME_SEP_KEY_0) + "." + fileExt;
			       filePath = this.NOTICE_DIR + this.SLASH + file;
			
			
			// 임시폴더에서 이동
			FileUtil.copyFile(storageDir + this.SLASH + fileUrl,
					           storageDir + this.SLASH + this.NOTICE_DIR, 
					           storageDir + this.SLASH + filePath);
		    }else{
		    	
		    	orgFileName = " ";
		    	filePath    = " ";
		    }
		   
			 mMap.put("file_name" , orgFileName);
			 mMap.put("file_input", filePath);
		 	
			// 임시폴더 삭제
		   File tmpDir = new File(storageDir + this.SLASH + KDSCodeMaster.FILE_TEMP_PATH);
		   if(tmpDir.exists()){  FileUtil.deleteFolder(tmpDir); }
			
			sqlMap.insert(noticeSqlMap + "addNotice", mMap);
		
		
		logger.info("Msg> DisConnect(SupportController > fileUplad_inserArticle)-Time: *************** " +  new Date(System.currentTimeMillis()) + " ***************");
	}
	
   
   private void delFileAndArticle(HttpServletRequest request, Map<String, Object> mMap)throws Exception{
		
		logger.info("Msg> Connect(SupportController > delFileAndArticle)-Time: *************** " +  new Date(System.currentTimeMillis()) + " ***************");
		
		String storageDir = XmlFileManager.getOnlyValue((JSONArray)(request.getSession().getAttribute("storage_path")));
		String file_path = (String)mMap.get("file_path");
		
		if(file_path != null && !file_path.equals("")){
			new File(storageDir + this.SLASH + file_path).delete(); 
		}
		
		sqlMap.delete(noticeSqlMap + "deleteArticle", mMap);
	  
		logger.info("Msg> DisConnect(SupportController > delFileAndArticle)-Time: *************** " +  new Date(System.currentTimeMillis()) + " ***************");
	}
	
   
   
   
	
	/**
	 * <p>파일 다운로드</p>
	 * <br>
	 * 
	 * @return ModelAndView - bean id="download"
	 */
	@RequestMapping(value="/support/notice/download", method=RequestMethod.POST)
	public ModelAndView getAttachedFile(HttpServletRequest request,@RequestParam Map<String, Object> mMap) throws IOException {
		
		logger.info("Msg> Connect(SupportController > getAttachedFile)-Time: *************** " +  new Date(System.currentTimeMillis()) + " ***************");

		String storageDir = XmlFileManager.getOnlyValue((JSONArray)(request.getSession().getAttribute("storage_path")));
		
		String sourceFile = mMap.get("file_path").toString();
		String targetFile = mMap.get("file_name")+"."+FileUtil.getFileExt(sourceFile);
		
		FileUtil.copyFile(storageDir + this.SLASH + sourceFile,
				           storageDir + this.SLASH + targetFile);
		
		//복사본 삭제
		//...
		
		
		logger.info("Msg> DisConnect(SupportController > getAttachedFile)-Time: *************** " +  new Date(System.currentTimeMillis()) + " ***************");
		
		return new ModelAndView("download","downloadFile",new File(storageDir + this.SLASH + targetFile));
	}
	
	
	
	
    /*****************************	고객지원 - 보도자료 *****************************/	
	
	
	
	/**
	 * <p>탭 리스트 카테고리</p>
	 * <br>
	 * 
	 * @param request HttpServletRequest
	 * @param mMap Map
	 * @return JSONObject
	 */
	@SuppressWarnings("unchecked")
	@RequestMapping(value="/support/report/getAllTabCategories",headers="Accept=application/json", 
					  method=RequestMethod.POST)
	public @ResponseBody JSONObject getAllTabCategories(HttpServletRequest request, @RequestParam Map<String, Object> mMap){
		
		logger.info("Msg> Connect(SupportController > getAllTabCategories)-Time: *************** " +  new Date(System.currentTimeMillis()) + " ***************");
		
		JSONObject jsonObj =  new JSONObject();
		int resultcode = AjaxResultCode.SUCCESS;
		ArrayList<HashMap<String,String>> tabList = new ArrayList<HashMap<String,String>>();
		
		try {
			
			List<HashMap<String,String>> ctgList = sqlMap.queryForList(reportqlMap + "getAllTabCategories");
			if (ctgList.size() > 0 ) {
				
				HashMap<String,String> tabItem = null;
				
				for (int i = 0; i < ctgList.size(); i++) {
					  tabItem  = new HashMap<>();
					  tabItem.put("ctg_code", ctgList.get(i).get("ctg_code"));
					  tabItem.put("ctg_name", ctgList.get(i).get("ctg_name"));
					  tabList.add(tabItem);
				}
			}
		  } catch (Exception e) {
			resultcode = AjaxResultCode.FAIL;
		 }
		
		 jsonObj.put("result" , resultcode);
		 jsonObj.put("tablist", tabList);
		
		logger.info("Msg> DisConnect(SupportController > getAllTabCategories)-Time: *************** " +  new Date(System.currentTimeMillis()) + " ***************");
		
		return jsonObj;  
	}
	
	
	/**
	 * <p>탭 리스트</p>
	 * <br>
	 * 
	 * @param request HttpServletRequest
	 * @param mMap Map
	 * @return JSONObject
	 */
	@SuppressWarnings("unchecked")
	@RequestMapping(value="/support/report/getAvaiableCategories",headers="Accept=application/json", 
					  method=RequestMethod.POST)
	public @ResponseBody JSONObject getAvaiableCategories(HttpServletRequest request, @RequestParam Map<String, Object> mMap){
		
		logger.info("Msg> Connect(SupportController > getAvaiableCategories)-Time: *************** " +  new Date(System.currentTimeMillis()) + " ***************");
		
		JSONObject jsonObj =  new JSONObject();
		int resultcode = AjaxResultCode.SUCCESS;
		ArrayList<HashMap<String,String>> tabList = new ArrayList<HashMap<String,String>>();
		
		try {
			
			List<HashMap<String,String>> ctgList = sqlMap.queryForList(reportqlMap + "getAvaiableCategories");
			if (ctgList.size() > 0 ) {
				
				HashMap<String,String> tabItem = null;
				
				for (int i = 0; i < ctgList.size(); i++) {
					  tabItem  = new HashMap<>();
					  tabItem.put("ctg_code", ctgList.get(i).get("ctg_code"));
					  tabItem.put("ctg_name", ctgList.get(i).get("ctg_name"));
					  tabList.add(tabItem);
				}
			}
		  } catch (Exception e) {
			resultcode = AjaxResultCode.FAIL;
		 }
		
		 jsonObj.put("result" , resultcode);
		 jsonObj.put("tablist", tabList);
		
		logger.info("Msg> DisConnect(SupportController > getAvaiableCategories)-Time: *************** " +  new Date(System.currentTimeMillis()) + " ***************");
		
		return jsonObj;  
	}
	
	
	/**
	 * <p>탭 별 보도자료</p>
	 * <br>
	 * 
	 * @param request HttpServletRequest
	 * @param mMap Map
	 * @return JSONObject
	 */
	@SuppressWarnings("unchecked")
	@RequestMapping(value="/support/report/getReportList",headers="Accept=application/json", 
					  method=RequestMethod.POST)
	public @ResponseBody JSONObject getReportList(HttpServletRequest request, @RequestParam Map<String, Object> mMap){
		
		logger.info("Msg> Connect(SupportController > getReportList)-Time: *************** " +  new Date(System.currentTimeMillis()) + " ***************");
		
		JSONObject jsonObj =  new JSONObject();
		int resultcode = AjaxResultCode.SUCCESS;
		ArrayList<HashMap<String,String>> reportList = new ArrayList<HashMap<String,String>>();
		
		try {
			
			List<HashMap<String,String>> rList = sqlMap.queryForList(reportqlMap + "getReportList", mMap);
			if (rList.size() > 0 ) {
				
				HashMap<String,String> reportItem = null;
				
				for (int i = 0; i < rList.size(); i++) {
					  reportItem  = new HashMap<>();
					  reportItem.put("seq"       , rList.get(i).get("seq"));
					  reportItem.put("content"   , rList.get(i).get("content"));
					  reportItem.put("image_path", rList.get(i).get("image_path"));
					  reportItem.put("video_path", rList.get(i).get("video_path"));
					  reportItem.put("type"      , rList.get(i).get("type"));
					  reportItem.put("reg_date"  , rList.get(i).get("reg_date"));
					  reportList.add(reportItem);
				}
			}
			
		  } catch (Exception e) {
			resultcode = AjaxResultCode.FAIL;
		 }
		
		 jsonObj.put("result" , resultcode);
		 jsonObj.put("reportlist", reportList);
		
		logger.info("Msg> DisConnect(SupportController > getReportList)-Time: *************** " +  new Date(System.currentTimeMillis()) + " ***************");
		
		return jsonObj;  
	}
	
	
	
	/**
	 * <p>보도자료 등록</p>
	 * <br>
	 * 
	 * @param request HttpServletRequest
	 * @param mMap Map
	 * @return JSONObject
	 */
	@SuppressWarnings("unchecked")
	@RequestMapping(value="/support/report/addReport",headers="Accept=application/json", 
					  method=RequestMethod.POST)
	public @ResponseBody JSONObject addReport(HttpServletRequest request, jqGridParameters jqGridParam, @RequestParam Map<String, Object> mMap){
		
		logger.info("Msg> Connect(SupportController > addReport)-Time: *************** " +  new Date(System.currentTimeMillis()) + " ***************");
		JSONObject jsonObj =  new JSONObject();

		int resultcode = AjaxResultCode.SUCCESS;
		
		try {
			 //줄바꿈 처리
			  mMap.put("content", mMap.get("content").toString().replace("\r\n", "<br/>"));
			  fileUplad_inserReport(request, mMap);
			  
		  } catch (Exception e) {
			resultcode = AjaxResultCode.FAIL;
		 }
		
		 jsonObj.put("result", resultcode);
		
		logger.info("Msg> DisConnect(SupportController > addReport)-Time: *************** " +  new Date(System.currentTimeMillis()) + " ***************");
		
		return jsonObj;  
	}
	
	/**
	 * <p>보도자료 업데이트</p>
	 * <br>
	 * 
	 * @param request HttpServletRequest
	 * @param mMap Map
	 * @return JSONObject
	 */
	@SuppressWarnings("unchecked")
	@RequestMapping(value="/support/report/updateReportOne",headers="Accept=application/json", 
					  method=RequestMethod.POST)
	public @ResponseBody JSONObject updateReportOne(HttpServletRequest request, @RequestParam Map<String, Object> mMap){
		
		logger.info("Msg> Connect(SupportController > updateReportOne)-Time: *************** " +  new Date(System.currentTimeMillis()) + " ***************");
		
		JSONObject jsonObj =  new JSONObject();
		int resultcode = AjaxResultCode.SUCCESS;
		
		try {
			   //줄바꿈 처리
			   mMap.put("content", mMap.get("content").toString().replace("\r\n", "<br/>"));
             sqlMap.update(reportqlMap + "updateReportOne", mMap);			
		  } catch (Exception e) {
			resultcode = AjaxResultCode.FAIL;
		 }
		
		 jsonObj.put("result" , resultcode);
		
		logger.info("Msg> DisConnect(SupportController > updateReportOne)-Time: *************** " +  new Date(System.currentTimeMillis()) + " ***************");
		return jsonObj;  
	}
	
	
	/**
	 * <p>보도자료 삭제</p>
	 * <br>
	 * 
	 * @param request HttpServletRequest
	 * @param mMap Map
	 * @return JSONObject
	 */
	@SuppressWarnings("unchecked")
	@RequestMapping(value="/support/report/deleteReportOne",headers="Accept=application/json", 
					  method=RequestMethod.POST)
	public @ResponseBody JSONObject deleteReportOne(HttpServletRequest request, @RequestParam Map<String, Object> mMap){
		
		logger.info("Msg> Connect(SupportController > deleteReportOne)-Time: *************** " +  new Date(System.currentTimeMillis()) + " ***************");
		
		JSONObject jsonObj =  new JSONObject();
		int resultcode = AjaxResultCode.SUCCESS;
		
		String storageDir = XmlFileManager.getOnlyValue((JSONArray)(request.getSession().getAttribute("storage_path")));
		
		try {
			  HashMap<String,String> delInfo = (HashMap<String,String>)sqlMap.queryForObject(reportqlMap + "getReportOne", mMap);
			  
			   String image_path = delInfo.get("image_path");
			   String video_path = delInfo.get("video_path");
			   
			   if(image_path != null && !image_path.trim().equals("")){
				   new File(storageDir + this.SLASH + image_path).delete();
			   }
			   
			   if(video_path != null && !video_path.trim().equals("")){
				   new File(storageDir + this.SLASH + video_path).delete();
			   }
			
             sqlMap.delete(reportqlMap + "deleteReportOne", mMap);	
               
               
		  } catch (Exception e) {
			resultcode = AjaxResultCode.FAIL;
		 }
		
		 jsonObj.put("result" , resultcode);
		
		logger.info("Msg> DisConnect(SupportController > deleteReportOne)-Time: *************** " +  new Date(System.currentTimeMillis()) + " ***************");
		return jsonObj;  
	}
	
 private void fileUplad_inserReport(HttpServletRequest request, Map<String, Object> mMap)throws Exception{
		
		logger.info("Msg> Connect(SupportController > fileUplad_inserReport)-Time: *************** " +  new Date(System.currentTimeMillis()) + " ***************");

		
	    String storageDir = XmlFileManager.getOnlyValue((JSONArray)(request.getSession().getAttribute("storage_path")));
	    
	    String fileUrl     = null;
	    String orgFileName = null;
	    String fileExt     = null;
	    String image_path  = null;
	    String video_path  = null;
	    String type        = null;
	    
			
		 if((mMap.get("upload_file_chk").equals("true"))){
			
		    String tab_category = mMap.get("tab_category").toString();
			 
			// 업로드 파일 저장
			fileUrl     = mMap.get("upload_file_path").toString().trim();
			orgFileName = mMap.get("fileName").toString().trim();	
			fileExt     = mMap.get("fileExt").toString().trim();	
			type        = mMap.get("fileType").toString().trim();
			
			//DB에 저장되는 파일명 생성
			String fileName = "report_"+ DateUtil.dateToStrTime(new Date(), DateUtil.DATE_TO_STR_TIME_SEP_KEY_0) + "." + fileExt;
			String filePath = this.REPORT_DIR + this.SLASH + THIS_YEAR + this.SLASH + tab_category;
			
			
			// 임시폴더에서 복사
			FileUtil.copyFile(storageDir + this.SLASH + fileUrl,
					           storageDir + this.SLASH + filePath, 
					           storageDir + this.SLASH + filePath + this.SLASH + fileName);
			
			//이미지 비디오 타입에 따른 처리
			   if(type.equals("image")){
				   image_path = filePath + this.SLASH + fileName;
				   video_path = " ";
				   
			   }else if(type.equals("video")){
				   
				   //동영상 스크린샷 이미지 저장 및 처리
				   // ...
				   
				   image_path = " "; // 스크린샷 이미지
				   video_path = filePath + this.SLASH + fileName;
			   }
			    
		    }else{
		    	
		    	orgFileName   = " ";
		    	image_path    = " ";
		    	video_path    = " ";
		    	type          = "normal";
		    }
		   
			 mMap.put("file_name" , orgFileName);
			 mMap.put("image_path", image_path);
			 mMap.put("video_path", video_path);
			 mMap.put("file_type" , type);
		 	
			// 임시폴더 삭제
		   File tmpDir = new File(storageDir + this.SLASH + KDSCodeMaster.FILE_TEMP_PATH);
		   if(tmpDir.exists()){  FileUtil.deleteFolder(tmpDir); }
			
			sqlMap.insert(reportqlMap + "addReportOne", mMap);
		
		
		logger.info("Msg> DisConnect(SupportController > fileUplad_inserReport)-Time: *************** " +  new Date(System.currentTimeMillis()) + " ***************");
	}
	
	
	
	
	
	
    /*****************************	고객지원 - 신청서작성 *****************************/
	
	/**
	 * <p>신청서 메일 전송</p>
	 * <br>
	 * 
	 * @param request HttpServletRequest
	 * @param mMap Map
	 * @return JSONObject
	 */
	@SuppressWarnings("unchecked")
	@RequestMapping(value="/support/mk_application/sendEmail",headers="Accept=application/json", 
					  method=RequestMethod.POST)
	public @ResponseBody JSONObject sendAppEmail(HttpServletRequest request,
												          @RequestParam Map<String, String> mMap){
		
		logger.info("Msg> Connect(support > sendAppEmail)-Time: *************** " +  new Date(System.currentTimeMillis()) + " ***************");
		
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
		
		logger.info("Msg> DisConnect(support > sendAppEmail)-Time: *************** " +  new Date(System.currentTimeMillis()) + " ***************");
		
		return jsonObj;  
	}
	
	
	

		
	

}
