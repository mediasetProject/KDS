<%@ page pageEncoding="UTF-8" contentType="text/html; charset=UTF-8"%>

<link href="/js/plugins/bootstrap-dialog/css/bootstrap-dialog.min.css" rel="stylesheet" type="text/css" />
<style>
     /* 스피너 위치 조정 */
	 .spinner {margin-top:80px;margin-left:170px} 
			
</style>

   <div id="m_contents" >
	  <div id="main-container" class="main-container">          
	    <div class="main-container-inner">    
	      <div class="main-content">        
	        <div class="page-content">
	             <!-- 본문 내용 시작 -->
	             
                  <div class="page-header">
						<h1>
							신청서작성
							<small>
								<i class="icon-double-angle-right"></i>
								셋탑박스 설치 및 치과 병·의원 대기실 TV 사용신청
							</small>
						</h1>
					</div>
                       
					<div class="row">
						<div class="col-xs-12">
							<!-- PAGE CONTENT BEGINS -->

							<div class="row-fluid">
								<div class="span12">
									<div class="widget-box">
										<div class="widget-header widget-header-blue widget-header-flat">
											<h4 class="lighter">신청서 작성</h4>
										</div>

										<div class="widget-body">
											<div class="widget-main">
												<div id="fuelux-wizard" class="row-fluid" data-target="#step-container">
													<ul class="wizard-steps">
														<li data-target="#step1" class="active">
															<span class="step">1</span>
															<span class="title">기본정보 입력</span>
														</li>

														<li data-target="#step2" class="">
															<span class="step">2</span>
															<span class="title">동의사항</span>
														</li>

														<li data-target="#step3" class="">
															<span class="step">3</span>
															<span class="title">메일발송</span>
														</li>

														<li data-target="#step4" class="">
															<span class="step">4</span>
															<span class="title">완료</span>
														</li>
													</ul>
												</div>

												<hr>
												<div class="step-content row-fluid position-relative" id="step-container">
													<div class="step-pane active" id="step1">
														<h3 class="lighter block green">대한치과의사협회 소속 치과 병·의원 기본정보</h3>
														
														<form class="form-horizontal" id="validation-form"  >
															<div class="form-group has-info">
																<label class="control-label col-xs-12 col-sm-3 no-padding-right" for="dentalClinic"> 치과 병·의원 명 </label>
																<div class="col-xs-12 col-sm-9">
																	<div class="clearfix">
																		<input type="text" name="dentalClinic" id="dentalClinic" class="col-xs-12 col-sm-5">
																	</div>
																</div>
															</div>

															<div class="space-2"></div>

															<div class="form-group has-info">
																<label class="control-label col-xs-12 col-sm-3 no-padding-right" for="dentist"> 원장님 성함 </label>

																<div class="col-xs-12 col-sm-9">
																	<div class="clearfix">
																		<input type="text" name="dentist" id="dentist" class="col-xs-12 col-sm-4">
																	</div>
																</div>
															</div>

															<div class="space-2"></div>

															<div class="form-group has-info">
																<label class="control-label col-xs-12 col-sm-3 no-padding-right" for="contract"> 전화번호 </label>

																<div class="col-xs-12 col-sm-9">
																	<div class="clearfix">
																		<input type="text" name="contract" id="contract" class="col-xs-12 col-sm-4">
																	</div>
																</div>
															</div>

														   <div class="space-2"></div>	
														   
															<div class="form-group has-info">
																<label class="control-label col-xs-12 col-sm-3 no-padding-right" for="addr"> 치과 병·의원  주소 </label>

																<div class="col-xs-12 col-sm-9">
																	<div class="clearfix">
																		<input type="text" id="addr" name="addr" class="col-xs-12 col-sm-10">
																	</div>
																</div>
															</div>

															<div class="space-2"></div>
															
															<div class="form-group has-info">
																<label class="control-label col-xs-12 col-sm-3 no-padding-right" for="addr"> 메 모 <small>(50자이내)</small> </label>

																<div class="col-xs-12 col-sm-9">
																	<div class="clearfix">
																		<textarea class="form-control" id="memo" name="memo" placeholder="" maxlength="50" style="width:418px"></textarea>
																	</div>
																</div>
															</div>
															
														
														</form>
													</div>

													<div class="step-pane" id="step2">
													   <div class="form-group has-info">
															<div class="col-xs-12 col-sm-12 col-sm-offset-0">
															  <div class="well">
																	<h4 class="green smaller lighter">참고사항</h4>
																	* 브라운관 TV(CRT TV)는 연결할 수 없습니다.<br/>
																	* 신청서는 서울/경기/인천 지역에 한하여 받고 있으며 타 지역은 추후 신청서를 접수할 예정이오니 이점 양해 부탁드립니다.<br/>
                                                                       * 문의사항은 대한치과의사협회 치과의료정책방송 시행사인 <strong>(주)바른몸 02-6203-1231</strong> 로 연락바랍니다.
																</div>
															     
																<label>
																	<span class="lbl"> 
																	 본 치과 병·의원은 대한치과의사협회에서 추진하는 치과의료정책방송을 위해 치과 병·의원 대기실내에 설치되어있는 TV사용을 동의합니다
																	</span>
																</label>
																
																<label class="pull-right">
																	<input name="agree" id="agree" type="checkbox" class="ace" >
																	<span class="lbl"> 동의함 </span>
																</label>
																
															</div>
														</div>	
													</div>

													<div class="step-pane" id="step3">
														<div class="center">
															<h3 class="blue lighter">
																<div id="spin" class="spinner"></div>
															</h3>
														</div>
													</div>

													<div class="step-pane" id="step4">
														<div class="center">
															<h3 class="green">감사합니다!</h3>
															의료정책방송 셋탑박스 설치 신청을 완료하였습니다.
														</div>
													</div>
												</div>

												<div class="row-fluid wizard-actions">
													<button class="btn btn-prev" id="btn-prev" disabled="disabled">
														<i class="icon-arrow-left"></i>
														이전
													</button>

													<button class="btn btn-success btn-next" id="btn-next" data-last="완료">
														다음
													   <i class="icon-arrow-right icon-on-right"></i></button>
												</div>
												
											</div><!-- /widget-main -->
										</div><!-- /widget-body -->
									</div>
								</div>
							</div>
						</div><!-- /.col -->
					</div><!-- /.row -->
					
				 <!-- 본문 내용 끝 -->	
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


<script src="/js/bootstrap/assets/js/fuelux/fuelux.wizard.min.js"></script>
<script src="/js/bootstrap/assets/js/jquery.validate.min.js"></script>
<script src="/js/bootstrap/assets/js/additional-methods.min.js"></script>
<!-- <script src="/js/bootstrap/assets/js/bootbox.min.js"></script> -->
<script src="/js/plugins/bootstrap-dialog/js/bootstrap-dialog.min.js"></script>
<script src="/js/bootstrap/assets/js/jquery.maskedinput.min.js"></script>
<script src="/js/bootstrap/assets/js/select2.min.js"></script>
<script src="/js/bootstrap/assets/js/spin.min.js"></script>

<script src="/js/bootstrap/assets/js/ace-elements.min.js"></script>
<script src="/js/bootstrap/assets/js/ace.min.js"></script> 

<!-- 해당 페이지 스크립트-->
<script src="/js/views/support/mk_allpication.js"></script>


