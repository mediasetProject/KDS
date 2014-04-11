<%@ page pageEncoding="UTF-8" contentType="text/html; charset=UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>

<div id="m_lnb">

	  <div class="idxMenu">
	     <ul>
	        <li>
	           <a href="#" onClick="mNavi.hrefPost('/company'   ,'1')"  class="<c:if test="${lnbIdx eq '1'}">lnbClick</c:if>">
	              <img src="/images/index/menu_company.png" width="161" height="40" alt="KDS소개" title="KDS소개">
	           </a>
	        </li>
	        <li>
	           <a href="#" onClick="mNavi.hrefPost('/broadcast' ,'2')"  class="<c:if test="${lnbIdx eq '2'}">lnbClick</c:if>">
	              <img src="/images/index/menu_broadcast.png" width="161" height="40" alt="방송정보" title="방송정보">
	           </a>
	        </li>
	        <li>
	           <a href="#" onClick="mNavi.hrefPost('/advert'    ,'3')"  class="<c:if test="${lnbIdx eq '3'}">lnbClick</c:if>">
	              <img src="/images/index/menu_advt.png" width="161" height="40" alt="광고안내" title="광고안내">
	           </a>
	        </li>
	        <li>
	           <a href="#" onClick="mNavi.hrefPost('/support'   ,'4')"  class="<c:if test="${lnbIdx eq '4'}">lnbClick</c:if>">
	              <img src="/images/index/menu_support.png" width="161" height="40" alt="고객지원" title="고객지원">
	           </a>
	        </li>
	        <li>
	           <a href="/assets/pdf/kdsIntroduction.pdf" target="_blank">
	              <img src="/images/index/menu_support.png" width="161" height="40" alt="다운로드" title="다운로드">
	           </a>
	        </li>
	     </ul>
	  </div>
	  <div class="idxBlank">&nbsp;</div>
	  <div class="idxContact">
	    <img src="/images/index/idx_contact.png" width="200" height="114" alt="">
	  </div>
	  <div class="idxBlank">&nbsp;</div>
</div>

