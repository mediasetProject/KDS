<%@ page language="java" contentType="text/html; charset=utf-8"    pageEncoding="utf-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jstl/core" %>
<%@ taglib prefix="fmt" uri="http://java.sun.com/jsp/jstl/fmt"%>
<%@ taglib prefix="t" uri="http://tiles.apache.org/tags-tiles"%>
<fmt:requestEncoding value="utf-8"/>

<!DOCTYPE html>
<html lang="ko">
    <head>
    	<t:insertAttribute name="header" /> 
    </head>
    <body class="skin-1 navbar-fixed breadcrumbs-fixed"> 
	    <t:insertAttribute name="top" />
	    <t:insertAttribute name="contents" />
	    <t:insertAttribute name="footer" />
    </body>
</html>