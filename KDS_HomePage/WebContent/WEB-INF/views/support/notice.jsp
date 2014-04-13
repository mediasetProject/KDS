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
								공지사항
								<small>
									<i class="icon-double-angle-right"></i>
									Dynamic tables and grids using jqGrid plugin
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
							
		                 <div class="widget-toolbar no-border" style="margin-top:5px">
			                   <button id="btn_search" type="button" class="btn btn-purple btn-xs">
			                    <i class="icon-search bigger-120"></i>
			                    <strong>검색</strong>
			                   </button>
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
				
									<div class="form-group">
										<div class="col-sm-10 clearfix">
											<span>
												<input id="notice_title" name="notice_title" type="text" class="col-sm-8" placeholder="제 목"  />
											</span>
										</div>																							
									</div>
									
									<div class="form-group">
										<div class="col-sm-12 clearfix">
										<span>
												<textarea style="margin:0; width:100%; height:100px"></textarea>
											</span>
										</div>																							
									</div>
									
									<div class="form-group">
										<div class="col-sm-12 clearfix" >
											<div class="ace-file-input">
											 	<input type="file" id="file_input"><a class="remove" href="#"><i class="icon-remove"></i></a>
											 </div>
										</div>																							
									</div>
									
									
									
								</form>
							
							    <div class="widget-toolbar no-border" style="float:left">
			                     <button id="btn_jqGridList"  type="button" class="btn btn-success btn-xs">
			                       <i class="icon-align-justify bigger-120"></i>
			                       <strong>목록</strong>
			                     </button>
			                 </div>
			                 <div class="widget-toolbar no-border" style="margin-top:5px">
				                   <button id="btn_resetForm" type="button" class="btn btn-xs">
				                    <i class="icon-undo bigger-120"></i>
				                    <strong>리셋</strong>
				                   </button>
				                   <button id="btn_regForm" type="button" class="btn btn-success  btn-xs ">
				                     <i class="icon-ok bigger-120"></i>
				                     <strong>등록</strong>
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

<!-- 해당 페이지 스크립트-->
<script src="/js/views/support/notice.js"></script>

