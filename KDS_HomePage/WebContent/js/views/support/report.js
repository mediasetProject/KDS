
/**********************************************************************************
 * 
 * 고객지원 - 보도자료 JS
 * : 
 * 
 * @author Boh
 * @since 2014/04/19
 * 
 **********************************************************************************/




var mMain={
		
	 
	 // 경고 메시지 알림창
	 warnMessage : function(message,width){
		 
		 var messageAlarm = new BootstrapDialog({
		    	type: BootstrapDialog.TYPE_WARNING,
			    title : "<i class='icon-exclamation-sign  bigger-125'></i> 경 고",
	           message: message,
	        });
		     messageAlarm.realize();
	        $(messageAlarm.getModal()).find(".modal-content").css("width",width);
	        messageAlarm.open();
	 },
	 
	 // 일반 메시지 알림창
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
	 
	 //파일업로드 컨트롤러 셋팅
	 init_Fileupload : function(){
		
		 $('#file_input').ace_file_input({
				no_file:"파일을 선택해주세요",
				btn_choose:'파일선택',
				btn_change:"파일선택",
				droppable:false,
				thumbnail:'small',//large | fit,
				before_change:function(files, dropped) {
					var file = files[0];
					var file_mime_type = file["type"];
					var file_size = file["size"];
					var file_vaild = false;
				
					$.each(file_upload.WHITE_LIST,function(idx,type){
						if(file_mime_type == type){
							file_vaild = true;
						}
					});
					
					if(file_size > file_upload.MAX_SIZE){
						mMain.warnMessage("최대 파일크기를 초과하였습니다 ("+file_upload.MAX_SIZE_HM+")","300px");
						return false;
					}
					else if(!file_vaild){
						mMain.warnMessage("업로드를 할 수 없는 파일형식입니다","300px");
						return false;
					}
					
					// 임시파일로 업로드
					
					
					return true;
				}
				,before_remove : function() {}
				,
				preview_error : function(filename, error_code) {}
		
			}).on('change', function(){});
		 
	 },
	 
	 //슬림스크롤 셋팅
	 init_SlimScroll : function(){
		 
		 $(".slimscrollDIV").slimScroll({
			 height: '160px',
			 alwaysVisible: false,
			 touchScrollStep : 500
			});
		 $(".slimScrollBar").hide();
		 
	 },
	 
	 //이미지 확대보기 셋팅
	 init_ZoomInImage : function(){

		var colorbox_params = {
			reposition:true,
			scalePhotos:true,
			scrolling:false,
			previous:'<i class="icon-arrow-left"></i>',
			next:'<i class="icon-arrow-right"></i>',
			close:'&times;',
			current:'{current} of {total}',
			maxWidth:'100%',
			maxHeight:'100%',
			onOpen:function(){
				document.body.style.overflow = 'hidden';
			},
			onClosed:function(){
				document.body.style.overflow = 'auto';
			},
			onComplete:function(){
				$.colorbox.resize();
			}
		};
	
		$('.profile-activity [data-rel="colorbox"]').colorbox(colorbox_params);
		$("#cboxLoadingGraphic").append("<i class='icon-spinner orange'></i>");//let's add a custom loading icon
	
		/**$(window).on('resize.colorbox', function() {
			try {
				//this function has been changed in recent versions of colorbox, so it won't work
				$.fn.colorbox.load();//to redraw the current frame
			} catch(e){}
		});*/
		
		 
	 },
	 
	 actEvent:function(){},
	 
	 init:function(){
		 
	 
	    //슬림스크롤 초기화
		 mMain.init_SlimScroll();

		//이미지 크게보기 초기화
		 mMain.init_ZoomInImage();
		 
		 
		 
			
	 }
};


//==================================
//페이지(도큐먼트) 초기화
//==================================

function initDocument(){
	mMain.init();
	mMain.actEvent();
}


