<%@ page pageEncoding="UTF-8" contentType="text/html; charset=UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>

<div id="m_snb" >
  <ul class="s_navi">
		<li><a href="#" onClick="mNavi.hrefPost('/support' ,'4', '1')" class="<c:if test="${snbIdx eq '1'}">snbClick</c:if>">공지사항</a></li>
		<li><a href="#" onClick="mNavi.hrefPost('/support' ,'4', '2')" class="<c:if test="${snbIdx eq '2'}">snbClick</c:if>">보도자료</a></li>
		<li><a href="#" onClick="mNavi.hrefPost('/support' ,'4', '3')" class="<c:if test="${snbIdx eq '3'}">snbClick</c:if>">신청서작성</a></li>
		<li><a href="#" onClick="mNavi.hrefPost('/support' ,'4', '4')" class="<c:if test="${snbIdx eq '4'}">snbClick</c:if>">FAQ</a></li>
	</ul>
</div>

