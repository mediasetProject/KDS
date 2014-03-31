<%@ page pageEncoding="UTF-8" contentType="text/html; charset=UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>

<div id="m_snb" >
  <ul class="s_navi">
		<li><a href="#" onClick="mNavi.hrefPost('/broadcast' ,'2', '1')" class="<c:if test="${snbIdx eq '1'}">snbClick</c:if>">KDS 방송</a></li>
		<li><a href="#" onClick="mNavi.hrefPost('/broadcast' ,'2', '2')" class="<c:if test="${snbIdx eq '2'}">snbClick</c:if>">방송편성</a></li>
		<li><a href="#" onClick="mNavi.hrefPost('/broadcast' ,'2', '3')" class="<c:if test="${snbIdx eq '3'}">snbClick</c:if>">방송보기</a></li>
		<li><a href="#" onClick="mNavi.hrefPost('/broadcast' ,'2', '4')" class="<c:if test="${snbIdx eq '4'}">snbClick</c:if>">제휴문의</a></li>
	</ul>
</div>

