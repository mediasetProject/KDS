<%@ page pageEncoding="UTF-8" contentType="text/html; charset=UTF-8"%>

  <!-- 추가 스타일시트 -->
  <link href="/js/plugins/video-js/video-js.min.css" rel="stylesheet" type="text/css">

	<div id="m_contents" >
	  <div id="main-container" class="main-container">          
	     <div class="main-container-inner">    
	         <div class="main-content">        
	             <div class="page-content">
					  <!-- 본문 내용 시작 -->
					
						<i class="icon-leaf green"></i>
						<p>이 문서를 사용하여 새 프로젝트를 빨리 시작할 수 있다.<br> 이 문구와 HTML 문서 골격이 전부이다.</p>	
						vedio 테스트
						controls preload="none"
					      <video id="" class="video-js vjs-default-skin vjs-big-play-centered"  width="360" height="234"
						          poster="/images/common/kds_logo.png"
						          data-setup='{ "controls": true, "autoplay": false, "preload": "auto", "loop" : false }'>
						    <source src="/assets/vedio/vedio_test.mp4" type='video/mp4' />
						    <source src="http://video-js.zencoder.com/oceans-clip.webm" type='video/webm' />
						    <source src="http://video-js.zencoder.com/oceans-clip.ogv" type='video/ogg' />
						  </video>	  
						   
	
	                  <!-- 본문 내용 끝-->
					</div> <!-- END.page-content -->
	          </div> <!-- END .main-content -->
	       </div> <!-- END.main-container-inner -->
	    </div><!-- END .main-container --> 
	</div> <!-- END #m_contents -->
	 

<!-- 
    ====================================================================================================================
    =============================================== 스크립트 영역  ======================================================
    ====================================================================================================================
 -->

<!-- 추가 플러그인 -->
<script>
  videojs.options.flash.swf = "/js/plugins/video-js/video-js.swf";
</script>
 <script src="/js/plugins/video-js/video.js"></script>


<!-- 해당 페이지 스크립트-->

 <script src=""></script>



