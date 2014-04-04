<%@ page pageEncoding="UTF-8" contentType="text/html; charset=UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>

<div id="m_lnb">
 <ul class="lnb">
  <li><a href="#" onClick="mNavi.hrefPost('/company'   ,'1')"  class="<c:if test="${lnbIdx eq '1'}">lnbClick</c:if>">Company</a></li>
  <li><a href="#" onClick="mNavi.hrefPost('/broadcast' ,'2')"  class="<c:if test="${lnbIdx eq '2'}">lnbClick</c:if>">방송</a></li>
  <li><a href="#" onClick="mNavi.hrefPost('/advert'    ,'3')"  class="<c:if test="${lnbIdx eq '3'}">lnbClick</c:if>">광고</a></li>
  <li><a href="#" onClick="mNavi.hrefPost('/support'   ,'4')"  class="<c:if test="${lnbIdx eq '4'}">lnbClick</c:if>">고객지원</a></li>
  <li><a href="#" onClick="mNavi.openPDF(this)">다운로드</a></li>
  <li class="last">
   <pre>
     (주)바른몸
     KDS (의료정책방송)
     서울시 강남구 테헤란로 437 4층
     Tel : 02.6203.1231
     Fax : 02.6008.7871

    
    </pre> 
  </li>
 </ul>
</div>

