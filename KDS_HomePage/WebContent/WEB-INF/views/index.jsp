<%@ page pageEncoding="UTF-8" contentType="text/html; charset=UTF-8"%>
	
	<style>
	 #m_contents{
	   width:970px;
	 }
	</style>
	
   <link href="/js/plugins/video-js/video-js.min.css" rel="stylesheet" type="text/css">

	
	<div id="m_contents" >
	
	   <!-- index 본문 시작 -->
		
		<div class="idxLeftA">
		  <div class="idxLogo">
		    <a href="/" id="">
                <img src="/images/index/idx_logo.png"  height="140px" width="200px" alt="kds 의료정책방송" title="KDS(의료정책 방송)"> 
            </a>
		  </div>
		  <div class="idxMenu">
		     <ul>
		        <li>
		            <a href="#" onClick="mNavi.hrefPost('/company'   ,'1')">
	                 <img src="/images/index/menu_company.png" width="161" height="40" alt="KDS소개" title="KDS소개">
	               </a>
		        </li>
		        <li>
		            <a href="#" onClick="mNavi.hrefPost('/broadcast' ,'2')" >
	                 <img src="/images/index/menu_broadcast.png" width="161" height="40" alt="방송정보" title="방송정보">
	               </a>
		        </li>
		        <li>
		            <a href="#" onClick="mNavi.hrefPost('/advert'    ,'3')">
	                 <img src="/images/index/menu_advt.png" width="161" height="40" alt="광고안내" title="광고안내">
	                </a>
		        </li>
		        <li>
		            <a href="#" onClick="mNavi.hrefPost('/support'   ,'4')">
	                 <img src="/images/index/menu_support.png" width="161" height="40" alt="고객지원" title="고객지원">
	               </a>
		        </li>
		     </ul>
		  </div>
		  <div class="idxBlank"></div>
		  <div class="idxContact">
		    <img src="/images/index/idx_contact.png" width="200" height="114" alt="">
		  </div>
		</div>
		<div class="idxCenterA">
		  <img src="/images/index/idx_main_img.png" width="410"  alt="">
		</div>
		<div class="idxRightA">
		  <div class="idxMovieContent">
		     <!-- 홍보 동영상 시작 -->
		     
			<a class="sublime" href="#idx_advmovie" title="" data-settings="close-button-visibility:visible;"> 
			  <img src="/images/common/kds_logo.png" width="360" height="203"   alt="" />
			</a>

			<video id="idx_advmovie" poster="/js/bootstrap/assets/avatars/avatar5.png" width="780" height="460" title="" preload="none" style="display: none">
				<source src="/assets/vedio/vedio_test.mp4" />
				<source src="https://cdn.sublimevideo.net/vpa/ms_720p.mp4" data-quality="hd" />
				<source src="https://cdn.sublimevideo.net/vpa/ms_360p.webm" />
				<source src="https://cdn.sublimevideo.net/vpa/ms_720p.webm" data-quality="hd" />
			</video>


<!-- 		 
           <video id="" class="video-js vjs-default-skin vjs-big-play-centered"  width="360" height="203"
				          poster="/images/common/kds_logo.png"
				          data-setup='{ "controls": true, "autoplay": false, "preload": "auto", "loop" : false }'>
			    <source src="/assets/vedio/vedio_test.mp4" type='video/mp4' />
			    <source src="" type='video/webm' />
			    <source src="" type='video/ogg' />
			</video> 
-->	  
		    <!-- 홍보 동영상 끝 -->
		  </div>
		  <div>
			  <div class="" style="width:180px; height:380px;float:left">
			    <img src="/images/index/idx_setup.png"width="180" height="380" alt="">
			  </div>
			  <div class="" style="width:180px; height:190px;float:left">
			     <a href="/assets/pdf/kdsIntroduction.pdf" target="_blank">
			      <img src="/images/index/idx_company_itc.png" width="180" height="190" alt="">
			     </a> 
			  </div>
			  <div class="" style="width:180px; height:190px;float:left">
			     <img src="/images/index/idx_adv_req.png" width="180" height="190" alt="">
			  </div>
			  <div class="" style="clear:both"></div>
		  </div>
		  <div class="idxSponor">
		     <img src="/images/index/main_17.png" width="360" height="255" alt="">
		  </div>	  
		</div>
		<div style="clear:both"></div>
	
	  <!-- index 본문 끝-->
	  
	</div> <!-- END #m_contents -->		
	
		
		
<!-- 
    ====================================================================================================================
    =============================================== 스크립트 영역  ======================================================
    ====================================================================================================================
 -->

<!-- 추가 플러그인 -->
  <script src="/js/plugins/video-js/video.js"></script>

<!-- 해당 페이지 스크립트-->
  <script src="/js/views/index.js"></script>



