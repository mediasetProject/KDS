<%@ page language="java"  pageEncoding="UTF-8" contentType="text/html;charset=UTF-8" %>


<form id="hrefPostForm" method="post" action="/">
  <input type="hidden" name="lnbIdx" value=""/>
  <input type="hidden" name="snbIdx" value=""/>
</form>

<script type="text/javascript">

var mNavi ={
		
	hrefPost : function(url, lnbIdx, snbIdx){
		   $("#hrefPostForm input[name=lnbIdx]").val(lnbIdx);
		   $("#hrefPostForm input[name=snbIdx]").val(snbIdx);
		   $("#hrefPostForm").attr({action:url}).submit();
	 }
}


jQuery(function($) {

    // 페이지 초기화
    initDocument();
});

</script>