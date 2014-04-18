
/**********************************************************************************
 * 
 * 고객지원 - 신청서작성 JS
 * : 
 * 
 * @author Boh
 * @since 2014/03/21
 * 
 **********************************************************************************/

var mSpinner={
	
   spinnerObj : null,
	opts      : {
				  lines: 15, // The number of lines to draw 
				  length: 15, // The length of each line
				  width: 5, // The line thickness
				  radius:10, // The radius of the inner circle
				  rotate: 5, // The rotation offset
				  color: '#1e90ff', // #rgb or #rrggbb
				  speed: 0.9, // Rounds per second
				  trail: 60, // Afterglow percentage
				  shadow: false, // Whether to render a shadow
				  hwaccel: false, // Whether to use hardware acceleration
				  className: 'spinner', // The CSS class to assign to the spinner
				  zIndex: 2e9, // The z-index (defaults to 2000000000)
				  //top: 'auto', Top position relative to parent in px
				  //left: 'auto' Left position relative to parent in px
				  },
	run : function(){
		this.spinnerObj = new Spinner(this.opts).spin(document.getElementById('spin'));
	},
	stop : function(){
		this.spinnerObj.stop();
	}
		
 };



var mMain={
		
		
    /* 신청서작서 마법사 세팅 */	
	wizardSetting : function(){
		
		$('#fuelux-wizard').ace_wizard().on('change' , function(e, info){
			
			if(info.step == 1 && info.direction == "next"){
				if(!$('#validation-form').valid()) return false;
			}
			else if(info.step == 2 && info.direction == "next"){
				if(!$("input[name=agree]").is(":checked")){
					mMain.alertMessage("동의사항을 체크해주세요!","300px");
					return false;
				}
				
				//스피너 시작
				mSpinner.run();
				$(".wizard-steps li").eq(2).find(".title").text("메일 발송중");
				$("#btn-prev").hide();
				$("#btn-next").hide();
				
				//신청서 보내기
				mMain.submitApplicationForm("validation-form");
			}
			
  		}).on('finished', function(e) {}).on('stepclick', function(e){});
	
	
		//documentation : http://docs.jquery.com/Plugins/Validation/validate
	
	
		$('#validation-form').validate({
			errorElement: 'div',
			errorClass: 'help-block',
			focusInvalid: false,
			validClass:"valid",
			rules: {
				dentalClinic: {
					required: true,
				},
				dentist: {
					required: true,
				},
				contract: {
					required: true,
				},
				addr: {
					required: true
				}
			},
			messages:{
				dentalClinic:{
					required: "&nbsp;<strong>*</strong>"
				},
				dentist:{
					required: "&nbsp;<strong>*</strong>"
				},
				contract:{
					required: "&nbsp;<strong>*</strong>"
				},
				addr:{
					required: "&nbsp;<strong>*</strong>"
				},
		  },
	
	
			invalidHandler: function (event, validator) { //display error alert on form submit   
				$('.alert-danger', $('.login-form')).show();
			},
	
			highlight: function (e) {
				$(e).closest('.form-group').removeClass('has-info').addClass('has-error');
			},
	
			success: function (e) {
				$(e).closest('.form-group').removeClass('has-error').addClass('has-info');
				$(e).remove();
			},
	
			errorPlacement: function (error, element) {
				if(element.is(':checkbox') || element.is(':radio')) {
					var controls = element.closest('div[class*="col-"]');
					if(controls.find(':checkbox,:radio').length > 1) controls.append(error);
					else error.insertAfter(element.nextAll('.lbl:eq(0)').eq(0));
				}
				else if(element.is('.select2')) {
					error.insertAfter(element.siblings('[class*="select2-container"]:eq(0)'));
				}
				else if(element.is('.chosen-select')) {
					error.insertAfter(element.siblings('[class*="chosen-container"]:eq(0)'));
				}
				else error.appendTo(element.parent());
				
			},
	
			submitHandler: function (form) {},
			invalidHandler: function (form) {}
		});
	
	},	
		
	
	/* 의료정책방송 셋탑박스 신청서 제출 */
	submitApplicationForm : function(form){
		
		$.ajax({
			url  : "/support/mk_application/sendEmail",
			type : "POST",
			dataType: "json", 
			data  : $("#"+form).serialize(),
			success : function(data){
				
				if(data.result == ajaxResultCode.SUCCESS){
					$("#btn-next").trigger("click");
				}
				else{
					mMain.alertMessage("죄송합니다. 메일 전송을 실패하였습니다 !!","300px");
				}
			},
			complete:function(){
				mSpinner.stop();
			   //<i class=" icon-envelope bigger-130  icon-on-right"></i>
				var reMailing = '<button class="btn btn-info" id="btn_remailing"  onClick="mNavi.hrefPost(\'/support\' ,\'4\',\'3\')" >새 메일&nbsp;<i class="icon-envelope  align-top bigger-125"></i></button>';
				$(".wizard-actions").append(reMailing);
			}					
		});	
		
	},
	
	 alertMessage : function(message,width){
		 
		 var messageAlarm = new BootstrapDialog({
		    	type: BootstrapDialog.TYPE_PRIMARY,
			    title : "<i class='icon-bullhorn  bigger-125'></i> 알 림",
	           message: message,
	        });
		     messageAlarm.realize();
	        $(messageAlarm.getModal()).find(".modal-content").css("width",width);
	        messageAlarm.open();
	 },

	 actEvent:function(){},
	 
	 init:function(){
		mMain.wizardSetting();
	 }
};


//==================================
//페이지(도큐먼트) 초기화
//==================================

function initDocument(){
	mMain.init();
	mMain.actEvent();
}


