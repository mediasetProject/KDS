package com.mediaset.kdshp.common;

import java.util.Date;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;

import java.io.File;
import java.io.IOException;

import org.json.simple.JSONArray;
import org.json.simple.JSONObject;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.multipart.MultipartHttpServletRequest;

import com.mediaset.kdshp.util.XmlFileManager;
import com.mediaset.kdshp.util.DateUtil;




/**
 * <p> FileUpload 컨트롤러 </p>
 * <br>
 * 
 * @author Boh
 * @since 2014/04/16
 */

@Controller
public class FileUploadController {
	
	private static final Logger logger = LoggerFactory.getLogger(FileUploadController.class); 
	
	private String SLASH = "/";
	

	
	/**
	 * <p> 임시파일 업로드 </p>
	 * <br>
	 * 
	 * @param request HttpServletRequest
	 * @param mMap Map
	 * @return JSONObject
	 */
	@SuppressWarnings("unchecked")
	@RequestMapping(value="/comm/file/uploadTempFile",method=RequestMethod.POST)
	public ResponseEntity<String> uploadTempFile(HttpServletRequest request){
		
		logger.info("Msg> Connect(FileUploadController > uploadTempFile)-Time: *************** " +  new Date(System.currentTimeMillis()) + " ***************");
		JSONObject jsonObj =  new JSONObject();
		   
		int resultCode = AjaxResultCode.SUCCESS;
		String message = "";
		String fileUrl = "";
		
		String storageDir = XmlFileManager.getOnlyValue((JSONArray)(request.getSession().getAttribute("storage_path")));
		
		
		MultipartHttpServletRequest multipartRequest = (MultipartHttpServletRequest) request;
		MultipartFile file = multipartRequest.getFile("file_input");
		
		String fileName = file.getOriginalFilename().trim();
		String onlyFileName = fileName.substring(0, fileName.lastIndexOf("."));
		String fileExt  = fileName.substring(fileName.lastIndexOf(".")+1 , fileName.length());
		long   fileSize = file.getSize();
		
		if(fileSize <= 0 ){
			resultCode = AjaxResultCode.FAIL;
			message    = "파일이 깨졌거나 잘못된 파일입니다";
		}
		else{
			
			try {
				// 임시폴더생성
				String strTmpDir = KDSCodeMaster.FILE_TEMP_PATH + this.SLASH + request.getRequestedSessionId();
				File tmpDir = new File(storageDir + this.SLASH + strTmpDir);
				
				if(!tmpDir.exists()){
					tmpDir.mkdirs();
				}
				
				String uploadFileName = "TMP_"+ DateUtil.dateToStrTime(new Date(), DateUtil.DATE_TO_STR_TIME_SEP_KEY_0) + "." + fileExt;
				
				file.transferTo(new File(tmpDir.getPath() + this.SLASH + uploadFileName));
				
				fileUrl = strTmpDir + this.SLASH + uploadFileName;
				
			}catch (Exception e) {
				resultCode = AjaxResultCode.FAIL;
				message    = "파일 업로드 중 장애가 발생하였습니다";
			}
		}
		 String responseText = "{\"result\":\""  + resultCode   + "\"," +
						         " \"message\":\"" + message      + "\"," +
						         " \"fileName\":\""+ onlyFileName + "\"," +
						         " \"fileExt\":\"" + fileExt      + "\"," +
						         " \"fileUrl\":\"" + fileUrl      + "\"}";
	
		HttpHeaders responseHeaders = new HttpHeaders();
	    responseHeaders.add("Content-Type", "text/html; charset=UTF-8");
    
		
		logger.info("Msg> DisConnect(FileUploadController > uploadTempFile)-Time: *************** " +  new Date(System.currentTimeMillis()) + " ***************");
		
		return new ResponseEntity<String>(responseText, responseHeaders, HttpStatus.CREATED);
	}

}
