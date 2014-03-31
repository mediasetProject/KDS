<%@ page pageEncoding="UTF-8" contentType="text/html; charset=UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>

<div id="m_snb" >
  <ul class="s_navi">
		<li><a href="#" onClick="mNavi.hrefPost('/advert' ,'3', '1')" class="<c:if test="${snbIdx eq '1'}">snbClick</c:if>">광고상품안내</a></li>
		<li><a href="#" onClick="mNavi.hrefPost('/advert' ,'3', '2')" class="<c:if test="${snbIdx eq '2'}">snbClick</c:if>">광고표출안내</a></li>
		<li><a href="#" onClick="mNavi.hrefPost('/advert' ,'3', '3')" class="<c:if test="${snbIdx eq '3'}">snbClick</c:if>">광고단가</a></li>
		<li><a href="#" onClick="mNavi.hrefPost('/advert' ,'3', '4')" class="<c:if test="${snbIdx eq '4'}">snbClick</c:if>">문의&신청안내</a></li>
	</ul>
</div>

