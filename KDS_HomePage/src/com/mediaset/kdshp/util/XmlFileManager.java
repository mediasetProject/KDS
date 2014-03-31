package com.mediaset.kdshp.util;

import java.io.IOException;
import java.util.List;

import org.jdom.Document;
import org.jdom.Element;
import org.jdom.JDOMException;
import org.json.simple.JSONArray;
import org.json.simple.JSONObject;
import org.jdom.input.SAXBuilder;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;


public class XmlFileManager {
	
	
	private static final Logger logger = LoggerFactory.getLogger(XmlFileManager.class);
	
	/**
	 * <p>JSON Array 파일리스트에서 단일 Value 의 취득</p>
	 * : 첫번째 Value를 리턴<br>
	 * 
	 * @param jsonArr JSONArray - 파일리스트
	 * @return value
	 */
	public static String getOnlyValue(JSONArray jsonArr){
		
		String sResult = null;
		
		if(	null != jsonArr && 0 < jsonArr.size()){
			
			JSONObject jsonObj = (JSONObject)jsonArr.get(0);
			
			sResult = (String)jsonObj.get("value");
		}
		return sResult;
	}
	
	
	/**
	 * <p>JSON Array 파일리스트에서 Value 로 Name 취득</p>
	 * <br>
	 * 
	 * @param jsonArr JSONArray - 파일리스트
	 * @param value String - Value
	 * @return Name
	 */
	public static String getNameOfValue(JSONArray jsonArr, String value){
		
		String sResult = null;
		
		if(	null != value && 0 < value.length() &&
			null != jsonArr && 0 < jsonArr.size()){

			for(int i = 0; i < jsonArr.size(); i++){
				
				JSONObject jsonObj = (JSONObject)jsonArr.get(i);
				
				if(value.equals((String)jsonObj.get("value"))){
					
					sResult = (String)jsonObj.get("name");
				}
			}
		}
		return sResult;
	}
	
	
	/**
	 * <p>XML에서 원하는 파일 목록 취득</p>
	 * <br>
	 * 
	 * @param listFile List - XML 파일 리스트
	 * @param selFile String - 추출할 파일 리스트 태그명
	 * @return JSONArray - 파일 리스트
	 */
	public static JSONArray getValue(List listFile, String selFile){

		JSONArray  jsonArr = new JSONArray();
		
		if(null == listFile || null == selFile){
			return null;
		}
			
		List    list = listFile;
		Element eTemp;
		
		List    lResult;
		
		for(int i = 0; i < list.size(); i++){
			
			eTemp = (Element)list.get(i);
			
			if( selFile.equals(eTemp.getName()) ){
				
				lResult = eTemp.getChildren();
				
				for(int j = 0; j < lResult.size(); j++){

					eTemp = (Element)lResult.get(j);
					
					jsonArr.add(eTemp.getValue());
				}
				break;
			}
		}
		return jsonArr;
	}
	
	
	/**
	 * <p>XML에서 원하는 파일 목록 취득</p>
	 * <br>
	 * 
	 * @param listFile List - XML 파일 리스트
	 * @param selFile String - 추출할 파일 리스트 태그명
	 * @return JSONArray - 파일 리스트
	 */
	public static JSONArray getValue2nd(List listFile, String selFile){

		JSONArray  jsonArr = new JSONArray();
		JSONObject jsonObj = null;
		
		if(null == listFile || null == selFile){
			return null;
		}
			
		List    list = listFile;
		Element eTemp;
		
		List    lResult;
		
		for(int i = 0; i < list.size(); i++){
			
			eTemp = (Element)list.get(i);
			
			if( selFile.equals(eTemp.getName()) ){
				
				lResult = eTemp.getChildren();
				
				
				for(int j = 0; j < lResult.size(); j++){

					eTemp = (Element)lResult.get(j);
					
					jsonObj = new JSONObject();

					jsonObj.put("name", eTemp.getChildText("name"));
					jsonObj.put("value", eTemp.getChildText("value"));
					
					jsonArr.add(jsonObj);
				}
				break;
			}
		}
		return jsonArr;
	}
	
	/**
	 * <p>XML에서 원하는 파일 목록 취득</p>
	 * <br>
	 * 
	 * @param url String - Ksign XML 파일이 있는 URL 경로
	 * @return List - XML 파일 List
	 */
	public static List readXMLFile(String url){

		SAXBuilder builder = new SAXBuilder();
		
		List listResult = null; 
		
		try{
			Document doc = builder.build(url);
			Element  root= doc.getRootElement();
			
			listResult = root.getChildren();
			
		}catch(IOException e){
			logger.debug(e.getMessage());
			
		}catch(JDOMException e){
			logger.debug(e.getMessage());
		}
		return listResult;
	}
	

}
