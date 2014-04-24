<%@ page pageEncoding="UTF-8" contentType="text/html; charset=UTF-8"%>

<link href="/js/plugins/bootstrap-dialog/css/bootstrap-dialog.min.css" rel="stylesheet" type="text/css" />
<style>
  .ui-jqdialog { display: none; width: 300px; position: absolute; padding: .2em; font-size:11px; overflow:visible;}
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
									공지사항
								</small>
							</h1>
					 </div>
				   
				   <!-- Grid 영역 시작 -->  
					<div class="row" id="jqGrid_container">
			          <div class="col-xs-12">

							<div id="grid-container">
								<table id="grid-table"></table>
								<div id="grid-pager"></div>
							</div>
							
						  
		                 
		                 <div class="col-xs-6 col-sm-4">
		                  	<div class="input-group" >
										<input type="text" id="txt_search"  class="form-control search-query input-sm" placeholder="제목, 내용"> 
										<span class="input-group-btn ">
											<button type="button" id="btn_search" class="btn btn-purple btn-xs" style="height:30px">
												검 색 <i class="icon-search icon-on-left bigger-120"></i>
											</button>
										</span>
								</div>
						  </div>	
						  
						   <div class="widget-toolbar no-border">
		                      <button id="btn_write" type="button" class="btn btn-success btn-xs">
			                     <i class="icon-pencil bigger-120"></i>
			                     <strong>글쓰기</strong>
			                   </button>
		                 </div>
		                 
			           </div>   
			         </div>
                    <!-- Grid 영역 끝 -->  
                    
                    <!-- form 영역 시작 -->  
                    <div class="row" id="form_container" style="display:none">
			            <div class="col-xs-12">
							<form id="main-form" class="form-horizontal" role="form" enctype="multipart/form-data" method="post">
							
							      <input name="has_priority" id="has_priority" type="hidden" />
							      <input name="fileName"     id="fileName"   type="hidden" value="" />
							      <input name="fileExt"      id="fileExt"    type="hidden" value="" />
							      <input name="upload_file_path" id="upload_file_path"   type="hidden" value="" />
							      <input name="upload_file_chk"  id="upload_file_chk"    type="hidden" value="false"/>
				       
									<div class="form-group">
										<div class="col-sm-10 clearfix">
											<span>
												<input id="notice_title" name="notice_title" type="text" class="col-sm-8 reg-mode edit-mode view-mode" placeholder="제  목"/>&nbsp;
													<label class="reg-mode edit-mode">
														<input name="ckb_has_priority" id="ckb_has_priority" type="checkbox" class="ace">
														<span class="label label-success arrowed-in-right  arrowed " id="lbl_has_priority" style="cursor:pointer">상단표출</span>
													</label>
													
											</span>&nbsp;
										    <a href="#"style="text-decoration:none;cursor:default"><span class="badge badge-info" id="lbl_read_acc">0</span>&nbsp;see</a>	
										</div>	
									</div>
									
									<div class="form-group reg-mode edit-mode view-mode">
										<div class="col-sm-12 clearfix">
										<span>
												<textarea style="margin:0; width:100%; height:255px" name="notice_content" id="notice_content"></textarea>
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
			                     <button id="btn_jqGridList"  type="button" class="btn btn-success btn-xs reg-mode edit-mode view-mode">
			                       <i class="icon-align-justify bigger-120"></i>
			                       <strong>목 록</strong>
			                     </button>
			                 </div>
			                 <div class="widget-toolbar no-border" style="margin-top:5px">
				                   <button id="btn_regForm" type="button" class="btn btn-success btn-xs reg-mode">
				                     <i class="icon-ok bigger-120"></i>
				                     <strong>등 록</strong>
				                   </button>
				                   <button id="btn_editForm" type="button" class="btn btn-primary btn-xs edit-mode">
				                    <i class="icon-edit bigger-120"></i>
				                    <strong>수 정</strong>
				                   </button>
				                   <button id="btn_delForm" type="button" class="btn btn-danger btn-xs edit-mode">
				                    <i class="icon-trash bigger-120"></i>
				                    <strong>삭 제</strong>
				                   </button>
								     <button id="btn_download" type="button" class="btn btn-success btn-xs edit-mode view-mode">
										<i class="icon-download-alt bigger-120"></i> 
										<strong>다운로드</strong>
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
<script type="text/javascript" src="/js/bootstrap/assets/js/jqGrid/i18n/grid.locale-kr.js"></script>
<script src="/js/bootstrap/assets/js/jqGrid/jquery.jqGrid.min.js"></script>
<script src="/js/mediaset/jquery.mcgrid.js"></script>
<script src="/js/plugins/prettify/run_prettify.js"></script>
<script src="/js/plugins/bootstrap-dialog/js/bootstrap-dialog.min.js"></script>
<script src="/js/bootstrap/assets/js/ace-elements.min.js"></script>

<script src="/js/plugins/jquery.form.js"></script>

<!-- 해당 페이지 스크립트-->
<script src="/js/views/support/notice.js"></script>

