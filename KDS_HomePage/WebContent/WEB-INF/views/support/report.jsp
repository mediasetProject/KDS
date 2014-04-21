<%@ page pageEncoding="UTF-8" contentType="text/html; charset=UTF-8"%>

<link href="/js/plugins/bootstrap-dialog/css/bootstrap-dialog.min.css" rel="stylesheet" type="text/css" />
<style>
 .profile-activity img{
     width:100px !important;
 }
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
						 
	                     <!-- 탭 영역 시작 -->  
						 <div class="tab_container">
						   <div class="tabbable">
								<ul class="nav nav-tabs" id="myTab">
									<li class="active">
									  <a data-toggle="tab" href="#policyNews">정책뉴스 <span class="badge badge-info">1</span> </a>
									</li>
	
									<li class="">
									  <a data-toggle="tab" href="#culture">문화 교양 <span class="badge badge-info">2</span> </a>
									</li>
	
									<li class="">
									  <a data-toggle="tab" href="#healthy">건강 질병 <span class="badge badge-info">3</span> </a>
									</li>
									
									<li class="">
									  <a data-toggle="tab" href="#entertainment">예능 <span class="badge badge-info">23</span> </a>
									</li>
									
								</ul>
	
								<div class="tab-content">
									<div id="policyNews" class="tab-pane active">
										<p>Raw denim you probably haven't heard of them jean shorts
											Austin.
										</p>
										<div class="widget-body">
										
										   <div class="widget-main">
												<div class="profile-activity clearfix">
													<div>
														<a href="#"><img class="pull-left" alt="" src="/js/bootstrap/assets/avatars/user.jpg" ></a>
														 <span>
															일일일일일일일일일일이이이이이이이이이이삼삼삼삼삼삼삼삼삼삼사사사사사사사사사사오오오오오오오오오오
															일일일일일일일일일일이이이이이이이이이이삼삼삼삼삼삼삼삼삼삼사사사사사사사사사사오오오오오오오오오오
															일일일일일일일일일일이이이이이이이이이이삼삼삼삼삼삼삼삼삼삼사사사사사사사사사사오오오오오오오오오오
														</span>	
													 </div>
												 </div>
											</div>
											
										   <div class="widget-main">
												<div class="profile-activity clearfix">
													<div>
														<a href="#"><img class="pull-left" alt="" src="/js/bootstrap/assets/avatars/user.jpg" ></a>
														 <span>
															일일일일일일일일일일이이이이이이이이이이삼삼삼삼삼삼삼삼삼삼사사사사사사사사사사오오오오오오오오오오
															일일일일일일일일일일이이이이이이이이이이삼삼삼삼삼삼삼삼삼삼사사사사사사사사사사오오오오오오오오오오
															일일일일일일일일일일이이이이이이이이이이삼삼삼삼삼삼삼삼삼삼사사사사사사사사사사오오오오오오오오오오
														</span>	
													 </div>
												 </div>
											</div>
											
											<div class="widget-main">
												<div class="profile-activity clearfix">
													<div>
														<a href="#"><img class="pull-left" alt="" src="/js/bootstrap/assets/avatars/user.jpg" ></a>
														 <span>
															일일일일일일일일일일이이이이이이이이이이삼삼삼삼삼삼삼삼삼삼사사사사사사사사사사오오오오오오오오오오
															일일일일일일일일일일이이이이이이이이이이삼삼삼삼삼삼삼삼삼삼사사사사사사사사사사오오오오오오오오오오
															일일일일일일일일일일이이이이이이이이이이삼삼삼삼삼삼삼삼삼삼사사사사사사사사사사오오오오오오오오오오
														</span>	
													 </div>
												 </div>
											</div>
											
											<div class="widget-main">
												<div class="profile-activity clearfix">
													<div>
														<a href="#"><img class="pull-left" alt="" src="/js/bootstrap/assets/avatars/user.jpg" ></a>
														 <span>
															일일일일일일일일일일이이이이이이이이이이삼삼삼삼삼삼삼삼삼삼사사사사사사사사사사오오오오오오오오오오
															일일일일일일일일일일이이이이이이이이이이삼삼삼삼삼삼삼삼삼삼사사사사사사사사사사오오오오오오오오오오
															일일일일일일일일일일이이이이이이이이이이삼삼삼삼삼삼삼삼삼삼사사사사사사사사사사오오오오오오오오오오
														</span>	
													 </div>
												 </div>
											</div>
											
											
										</div>
								   </div>
	
									<div id="culture" class="tab-pane">
										<p>
										   문화 예술 자료
										</p>
									</div>
	
									<div id="healthy" class="tab-pane">
										<p>
										  건강질병자료
										</p>
									</div>
	
									<div id="entertainment" class="tab-pane">
										<p>
										  예능자료
										  
										</p>
									</div>
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

<!-- 해당 페이지 스크립트-->
<script src="/js/views/support/report.js"></script>

