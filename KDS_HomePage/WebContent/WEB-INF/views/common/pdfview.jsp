<%@ page language="java"  pageEncoding="UTF-8" contentType="text/html;charset=UTF-8" %>

<!-- PDF View -->
<script type="text/javascript">
<!--
//-->
</script>
<div id="noTitle_pop" >
	<div class="pop_header" >
		<span class="h_title" style='position:relative;top:-10px;'>
		 <h1 id="confirm_title">Image</h1>
		</span>
		<span class="pop_close">
		 <span class="">
		 </span>
		 <span class="p_close" style='top:8px;'><a href="javascript:;">
		  <img src="/images/common/b_pop_close.png" alt="닫기버튼" title="닫기" class="alert_ok"/></a>
		 </span>
		</span>
	</div>
	<!-- popupBox 컨텐츠 -->
	<div class="no_pop_body">
		<div class="pop_contents">
		
			<object data="/images/common/pdf_viewer_test.pdf" type="application/pdf" width="100%" height="500">
 
			  <p>It appears you don't have a PDF plugin for this browser.
			  No biggie... you can <a href="myfile.pdf">click here to
			  download the PDF file.</a></p>
			  
			</object>

		</div>
			<div class="Block_alignC" style="clear:both;padding-top:10px;">
			 <span class="button small-g strong icon alert_ok">
			  <span class="cancel"></span>
			  <a style="cursor:pointer;" title="닫기">닫기</a>
			 </span>
			</div>
	</div>
	<!-- //popupBox 컨텐츠 -->
</div>
<!-- //PDF View  -->
