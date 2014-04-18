package com.mediaset.kdshp.util;

import java.io.File;
import java.io.FileInputStream;
import java.io.IOException;
import java.io.OutputStream;
import java.util.HashMap;
import java.util.Iterator;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.util.FileCopyUtils;
import org.springframework.web.servlet.view.AbstractView;


public class DownloadView extends  AbstractView{
	
	public DownloadView(){
		
	  this.setContentType("application/octet-stream");
	}
	
	@Override 
	protected void renderMergedOutputModel(
										Map model, 
										HttpServletRequest request,
										HttpServletResponse response) throws Exception {
		
		File file = (File)model.get("downloadFile");
		response.setContentType(this.getContentType());
		response.setContentLength((int)file.length());
		response.setHeader("Content-Disposition", "attachment; fileName=\"" + file.getName() + "\";");
		response.setHeader("Content-Transfer-Encoding", "binary");
		
		
		OutputStream out = response.getOutputStream();
		FileInputStream fis = null; 
	  
		try{
			fis = new FileInputStream(file); 
			FileCopyUtils.copy(fis, out);
			
		}finally{
			if(fis!=null){
				
				try{
					fis.close();
				}
				catch(IOException ex){}
			}
		}
		out.flush();
	}
}
