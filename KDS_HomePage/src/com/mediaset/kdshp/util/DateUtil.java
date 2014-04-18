package com.mediaset.kdshp.util;

import java.text.SimpleDateFormat;
import java.util.Date;


public class DateUtil {
	
	/**
	 * <p>날짜 포멧 함수(문자열 파라메터)</p>
	 * : 날짜 형식을 맞춘다.
	 *  예) 9일 -> 09일<br>
	 * 
	 * @param sDay String - Date 로 변환할 String 객체
	 * @return String
	 */
	public static String addZero(String sDay){
		
		int iDay = null != sDay ? Integer.parseInt(sDay) : 0;
		
		return addZero(iDay);
	}
	
	/**
	 * <p>날짜 포멧 함수(숫자형 파라메터)</p>
	 * : 날짜 형식을 맞춘다.
	 *  예) 9일 -> 09일<br>
	 * 
	 * @param iDay int - Date 로 변환할 int
	 * @return String
	 */
	public static String addZero(int iDay){
		
		String str = "";
		
		if(iDay < 10){
			
			str = "0" + iDay;
		}
		else{
			
			str = String.valueOf(iDay);
		}
		return str;
	}

	public static final String DATE_TO_STR_TIME_SEP_KEY_0 = "0"; // yyyyMMddHHmmss
	public static final String DATE_TO_STR_TIME_SEP_KEY_1 = "1"; // yyyyMMdd
	public static final String DATE_TO_STR_TIME_SEP_KEY_2 = "2"; // HHmmss
	public static final String DATE_TO_STR_TIME_SEP_KEY_3 = "3"; // yyyy년 MM월 dd일 HH시mm분
	public static final String DATE_TO_STR_TIME_SEP_KEY_4 = "4"; // (yy.M.d HH:mm:ss)
	public static final String DATE_TO_STR_TIME_SEP_KEY_5 = "5"; // yy.MM.dd
	
	/**
	 * <p>java.util.Date 형식 데이터의 날짜 String 화</p>
	 * <br>
	 * 
	 * @param d Date - 변환할 Date
	 * @param funcKey String - 포멧 설정키(	0: yyyyMMddHHmmss, 
	 * 										1: yyyyMMdd,
	 * 										2: HHmmss,
	 * 										3: yyyy년 MM월 dd일 HH시mm분 
	 * 										4: (yy.M.d HH:mm:ss)		
	 *                                      5: yy.MM.dd
	 *                                      )
	 * @return String(yyyyMMddHHmmss)
	 */
	public static String dateToStrTime(Date d, String funcKey){
		
		String date = null;
		
		if(null != d && null != funcKey){
			
			SimpleDateFormat sdf = null;
			
			if("0".equals(funcKey)){
				
				sdf = new SimpleDateFormat("yyyyMMddHHmmss");
			}
			else if("1".equals(funcKey)){
				
				sdf = new SimpleDateFormat("yyyyMMdd");
			}
			else if("2".equals(funcKey)){
				
				sdf = new SimpleDateFormat("HHmmss");
			}
			else if("3".equals(funcKey)){
				
				sdf = new SimpleDateFormat("yyyy년 MM월 dd일 HH시mm분");
			}
			else if("4".equals(funcKey)){
				sdf = new SimpleDateFormat("(yy.M.d HH:mm:ss)");
			}
			else if(funcKey.equals("5")){
				sdf = new SimpleDateFormat("yy.MM.dd");
			}
			
			date = sdf.format(d);
		}
		return date;
	}
	
	/**
	 * <p>String 날짜형식 데이터의 java.util.Date 화</p>
	 * : yyyyMMddHHmmss 나 yyyyMMdd 형식의 포멧으로 입력 필요.<br>
	 * 
	 * @param d String - Date 로 변환할 String 객체
	 * @return Date
	 */
	public static Date StrToDateTime(String d){
		
		Date date = null;
		
		try{
			if(8 == d.length()){
				
				date = new SimpleDateFormat("yyyyMMdd").parse(d);
			}
			else if(14 == d.length()){
				
				date = new SimpleDateFormat("yyyyMMddHHmmss").parse(d);
			}
		}
		catch(Exception e){
			System.out.println(e);
		}
		return date;
	}
	
	/**
	 * <p>날짜 비교 함수</p>
	 * : 앞선 날짜인지, 뒤의 날짜인지, 같은 날짜인지를 비교</br>
	 * 
	 * @param aDate String - 기준날짜(yyyyMMdd)
	 * @param bDate String - 비교날짜(yyyyMMdd)
	 * @return int 0 - 비교날짜가 기준날짜 이전의 경우
	 * 				1 - 비교날짜가 기준날짜 이후의 경우
	 * 				2 - 같은 날짜의 경우
	 */
	public static int chkDateOrder(String aDate, String bDate){
		
		int iResult= -1;

		Date dateA = null;
		Date dateB = null;
		
		try{
			dateA = new SimpleDateFormat("yyyyMMdd").parse(aDate);
			dateB = new SimpleDateFormat("yyyyMMdd").parse(bDate);
			
		}catch(Exception e){
			
			System.out.println(e);
		}
		
		if (dateA.after(dateB)){
			
			iResult = 0;
		}
		if (dateA.before(dateB)){
			
			iResult = 1;
		}
		if (dateA.equals(dateB)){
			
			iResult = 2;
		}
		return iResult;
	}
}
