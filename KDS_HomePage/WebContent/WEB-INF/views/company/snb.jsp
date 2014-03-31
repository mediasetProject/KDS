<%@ page pageEncoding="UTF-8" contentType="text/html; charset=UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>

<div id="m_snb" >
  <ul class="s_navi">
		<li><a href="#" onClick="mNavi.hrefPost('/company' ,'1', '1')" class="<c:if test="${snbIdx eq '1'}">snbClick</c:if>">KDS란</a></li>
		<li><a href="#" onClick="mNavi.hrefPost('/company' ,'1', '2')" class="<c:if test="${snbIdx eq '2'}">snbClick</c:if>">의료정책방송</a></li>
		<li><a href="#" onClick="mNavi.hrefPost('/company' ,'1', '3')" class="<c:if test="${snbIdx eq '3'}">snbClick</c:if>">네트워크구성</a></li>
		<li><a href="#" onClick="mNavi.hrefPost('/company' ,'1', '4')" class="<c:if test="${snbIdx eq '4'}">snbClick</c:if>">비전</a></li>
		<li><a href="#" onClick="mNavi.hrefPost('/company' ,'1', '5')" class="<c:if test="${snbIdx eq '5'}">snbClick</c:if>">찾아오시는 길</a></li>
	</ul>
</div>

