package com.mediaset.kdshp.util;

import java.io.ByteArrayOutputStream;
import java.io.File;
import java.io.FileInputStream;
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.InputStream;
import java.nio.channels.FileChannel;
import java.security.MessageDigest;



/**
 * <p>파일 관련 유틸</p>
 * <br>
 * 
 * @author SayidLee
 * @since 2012/06/29
 */
public class FileUtil{
	
	/**
	 * <p>파일 이동</p>
	 * <br>
	 * 
	 * @param source
	 * @param targetPath
	 * @param target
	 */
	public static void copyFile(String source, String targetPath, String target){
		
		File sourceFile    = new File(source);
		File targetPathFile= new File(targetPath);
		
		FileInputStream inputStream  = null;
		FileOutputStream outputStream= null;
		
		FileChannel fcin = null;
		FileChannel fcout= null;
		
		try{
			// 경로 폴더 유무 확인
			if(targetPathFile.exists()){
				
				// 존재할 경우
			}
			else{
				// 존재하지 않을 경우, 생성
				targetPathFile.mkdirs();
			}
			
			inputStream = new FileInputStream(sourceFile);   
			outputStream= new FileOutputStream(target);
			
			fcin = inputStream.getChannel();
			fcout= outputStream.getChannel();
			
			long size = fcin.size();
			fcin.transferTo(0, size, fcout);
			
		}catch (Exception e){
			
			System.out.println("  copy ERROR >>"+e.getMessage());
			e.printStackTrace();
			
		}
		finally{
			
			try{
				fcout.close();
				
			}catch(IOException ioe){
				
			}
			
			try{
				fcin.close();
				
			}catch(IOException ioe){
				
			}
			
			try{
				outputStream.close();
				
			}catch(IOException ioe){
				
			}
			
			try{
				inputStream.close();
				
			}catch(IOException ioe){
				
			}  				
		}
	}
	
	
	/**
	 * <p>파일 경로 삭제</p>
	 * <br>
	 * 
	 * @param targetFolder
	 * @return boolean
	 */
	public static boolean deleteFolder(File targetFolder){
		
		File[] childFile   = targetFolder.listFiles();
		
		boolean confirm = false;
		int size = childFile.length;
 
		if(size > 0){
 
			for(int i = 0; i < size; i++){
 
				if(childFile[i].isFile()){
 
					confirm = childFile[i].delete();
                  
				}else{
 
					deleteFolder(childFile[i]);
				}
			}
		}
		targetFolder.delete();
      
      	return (!targetFolder.exists());  
	}
	
	
	public static void copyFile(String source, String target){

		File sourceFile = new File( source );
		
		FileInputStream inputStream = null;
		FileOutputStream outputStream = null;
		
		FileChannel fcin = null;  
		FileChannel fcout = null;
		
		try{
			inputStream = new FileInputStream(sourceFile);   
			outputStream = new FileOutputStream(target);
			
			fcin = inputStream.getChannel();   
			fcout = outputStream.getChannel();
			
			long size = fcin.size();   
			fcin.transferTo(0, size, fcout);
			
		}catch (Exception e){
			
			
		}finally{
			try{ fcout.close();  }catch(IOException ioe){}   
			try{ fcin.close();   }catch(IOException ioe){}   
			try{ outputStream.close();   }catch(IOException ioe){}   
			try{    inputStream.close();   }catch(IOException ioe){}  				
		}
		
	}
	
	
	public static void deleteFile(String file){
		
		try{
			System.out.println(" filedelete [" + file + "]");
			File f = new File( file );
			f.delete();
		}
		catch(Exception e){
			
			System.out.println(" filedelete ERROR >>>"+e.getMessage());
		}
	}
	
	
	public static String calcMD5( String infile ){
		
		String output = "";
		 
		try{
			MessageDigest digest = MessageDigest.getInstance("MD5");
			
			File f = new File(infile); 
			InputStream is = new FileInputStream(f);				
			byte[] buffer = new byte[8192]; 
			int read = 0;
			try { 
				int cnt = 0; 
				while( (read = is.read(buffer)) > 0) 
				{
					digest.update(buffer, 0, read);
				}		
				byte[] md5sum = digest.digest();
				
				for( int x=0;x<md5sum.length;x++)
					output += "".format("%02x", (md5sum[x] & 0x00ff) ); // (Integer.toHexString(md5sum[x] & 0x00ff)).format("%02d", args);
			}
			catch(IOException e) {
				throw new RuntimeException("Unable to process file for MD5", e);
			}
			finally {
				try {
					is.close();
				}
				catch(IOException e) {
					throw new RuntimeException("Unable to close input stream for MD5 calculation", e);
				}
			}
		}
		catch(Exception ee) { }
		return output;
	}
	
	
	public static void mkdir(String path){
		
		try{
			File f = new File(path);
			f.mkdirs();
		}
		catch( Exception e ){
			
		}
	}
	
	
	public static String getFileName( String fname ){
		
		int index = fname.lastIndexOf(".");
		
		String result = "";
		
		if( index > 0 ){
			
			result = fname.substring(0, index);
		}
		return result; 
	}
	

	public static String getFileExt( String fname ){
		
		int index = fname.lastIndexOf(".");
		
		String result = "";
		
		if( index > 0 )
		    result = fname.substring(index + 1);
		
		return result;
	}
	
	
	public static long getFileSize( String fname ){
		
		File f = new File(fname);
		
		if( f.exists() && f.isFile() ){
			
			return f.length();
		}
		return 0;
	}
	
	
    public static String extractFileName(String fullPathName){
    	
        int len = fullPathName.length() - 1;
        int i;
        
        for(i = len; i > -1; i--)
            if(fullPathName.charAt(i) == '/' || fullPathName.charAt(i) == '\\')
                break;

        return fullPathName.substring(i + 1);
    }
    
    
    public static String extractFilePath(String fullPathName){
    	
        int len = fullPathName.length() - 1;
        int i;
        
        for(i = len; i > -1; i--)
            if(fullPathName.charAt(i) == '/' || fullPathName.charAt(i) == '\\')
                break;

        return fullPathName.substring(0, i);
    }
    
    
    
}
