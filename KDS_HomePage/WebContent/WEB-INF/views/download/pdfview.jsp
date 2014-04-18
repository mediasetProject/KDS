<%@ page language="java" contentType="text/html; charset=utf-8"    pageEncoding="utf-8"%>
<%@ taglib prefix="fmt" uri="http://java.sun.com/jsp/jstl/fmt"%>
<fmt:requestEncoding value="utf-8"/>

<!DOCTYPE html>
<html lang="ko">
    <head>
      <title>::: 의료정책방송(KDS) :::</title>
    </head>
    <body> 
      <div>
	     <object  type="application/pdf" data="/assets/pdf/pdf_viewer_test.pdf" width="100%" height="900">
		   <param name="src" value="/assets/pdf/pdf_viewer_test.pdf">
		   <p style='margin-top:100px;text-align:center;line-height:30px'>
		     <span>It seems you don't have Adobe Reader or PDF support in this web browser</span><br/>
		     <a href="/assets/pdf/pdf_viewer_test.pdf" style="text-decoration:none;">download PDF</a>
		   </p>
		</object>
	   </div> 
    </body>
</html>




