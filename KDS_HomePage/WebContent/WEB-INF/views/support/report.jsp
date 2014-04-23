<%@ page pageEncoding="UTF-8" contentType="text/html; charset=UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>

<link href="/js/plugins/bootstrap-dialog/css/bootstrap-dialog.min.css" rel="stylesheet" type="text/css" />
<link href="/js/bootstrap/assets/css/colorbox.css" rel="stylesheet" type="text/css"> 
<link href="/css/views/support/report.css" rel="stylesheet" type="text/css">

<style>

</style>


<div id="m_contents" >
  <div id="main-container" class="main-container">          
     <div class="main-container-inner">    
         <div class="main-content">        
             <div class="page-content">
				  <!-- 본문 내용 시작 -->
	                 <div class="page-header">
								<h1>
									고객지원
									<small>
										<i class="icon-double-angle-right"></i>
										보도자료
									</small>
								</h1>
						 </div>
						 
                       <!-- 비디오 영역 시작 -->  
                       <c:forEach var="videoItem" items="${videoList}">
                            <video id="v${videoItem.seq}" poster="" width="640" height="320" title="" preload="none" style="display:none"><source src="https://cdn.sublimevideo.net/vpa/ms_720p.mp4" data-quality="hd"></video>
                       </c:forEach>
                        <!-- 비디오 영역 끝 -->  
                        
	                     <!-- 탭 영역 시작 -->  
						 <div class="tab_container">
						   <div class="tabbable">
								<ul class="nav nav-tabs" id="report_tabs">
								</ul>
								<div class="tab-content">
								</div>
							</div>
						  </div>
						<!-- 탭 영역 끝 -->  
						
						<!-- form 영역 시작 -->  
	                    <div class="row" id="form_container" style="display:none">
				            <div class="col-xs-12">
								<form id="main-form" class="form-horizontal" role="form" enctype="multipart/form-data" method="post">
								
								      <input name="fileName"     id="fileName"   type="hidden" value="" />
								      <input name="fileExt"      id="fileExt"    type="hidden" value="" />
								      <input name="upload_file_path" id="upload_file_path"   type="hidden" value="" />
								      <input name="upload_file_chk"  id="upload_file_chk"    type="hidden" value="false"/>
					       
										<div class="form-group">
											<div class="col-sm-10 clearfix">
												<span>
													<select class="form-control col-xs-4" id="">
													<option value="">&nbsp;</option>
													<option value="AL">Alabama</option>
													<option value="AK">Alaska</option>
													<option value="AZ">Arizona</option>
													<option value="AR">Arkansas</option>
											      </select>
											 </span>
											</div>	
										</div>
										
										<div class="form-group reg-mode edit-mode view-mode">
											<div class="col-sm-12 clearfix">
											<span>
													<textarea style="margin:0; width:100%; height:255px" name="" id=""></textarea>
												</span>
											</div>																							
										</div>
										
										<div class="form-group reg-mode edit-mode">
											<div class="col-sm-12 clearfix" >
												<div class="ace-file-input">
												 	<input type="file" id="file_input" name="file_input"><a class="remove" href="#"><i class="icon-remove"></i></a>
												 </div>
											</div>																							
										</div>
										
									</form>
								
								    <div class="widget-toolbar no-border" style="float:left">
				                     <button id=""  type="button" class="btn btn-success btn-xs reg-mode edit-mode view-mode">
				                       <i class="icon-align-justify bigger-120"></i>
				                       <strong>목록</strong>
				                     </button>
				                 </div>
				                 <div class="widget-toolbar no-border" style="margin-top:5px">
					                   <button id="" type="button" class="btn btn-success btn-xs reg-mode">
					                     <i class="icon-ok bigger-120"></i>
					                     <strong>등록</strong>
					                   </button>
					                   <button id="" type="button" class="btn btn-primary btn-xs edit-mode">
					                    <i class="icon-edit bigger-120"></i>
					                    <strong>수정</strong>
					                   </button>
					                   <button id="" type="button" class="btn btn-danger btn-xs edit-mode">
					                    <i class="icon-trash bigger-120"></i>
					                    <strong>삭제</strong>
					                   </button>
									     <button id="" type="button" class="btn btn-success btn-xs edit-mode view-mode">
											<i class="icon-eye-open bigger-120"></i> 
											<strong>미리보기</strong>
									  	 </button>
								    </div>
				            </div>   
				          </div>
	                   <!-- form 영역 시작 --> 

					
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
<script src="/js/plugins/bootstrap-dialog/js/bootstrap-dialog.min.js"></script>
<script src="/js/bootstrap/assets/js/ace-elements.min.js"></script>
<script src="/js/bootstrap/assets/js/jquery.slimscroll.min.js"></script>
<script src="/js/bootstrap/assets/js/jquery.colorbox-min.js"></script>
<script src="/js/plugins/html5lightbox/html5lightbox.js"></script>


<!-- 해당 페이지 스크립트-->
<script src="/js/views/support/report.js"></script>

