<%@ page language="java" contentType="text/html; charset=utf-8"    pageEncoding="utf-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jstl/core" %>
<%@ taglib prefix="fmt" uri="http://java.sun.com/jsp/jstl/fmt"%>
<%@ taglib prefix="t" uri="http://tiles.apache.org/tags-tiles"%>
<fmt:requestEncoding value="utf-8"/>

<!DOCTYPE html>
<html lang="ko">
    <head>
    	<t:insertAttribute name="header"/> 
    </head>
    <body> 
      <div id="b_wrap">
	     <t:insertAttribute name="top"/>
	     <div id="b_container">
	        <t:insertAttribute name="lnb"/>
	        <div id="m_container">
	          <t:insertAttribute name="snb"/>
	          <t:insertAttribute name="contents"/>
	        </div>
	     </div>
	     <t:insertAttribute name="footer"/>
	   </div> 
    </body>
</html>