
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
	 
	 //탭 보도자료 리스트
	 getReportList : function(ctg_code,statusIdx,tabContent){
		 
		 $.ajax({
				url  : "/support/report/getReportList",
				type : "POST",
				dataType: "json", 
				async   : false,
				data    : {ctg_code : ctg_code},
				success : function(data){
					if(data.result == ajaxResultCode.SUCCESS){
						if(data.reportlist.length > 0){
							
							 var reportlist = data.reportlist;
							 
							 $(tabContent).find(".widget-main").html("");
							 
							 var r_items = "";
							 for(var i = 0 ; i < reportlist.length ; i++){
								 var report = reportlist[i];
								 
								 //only 보도자료
								 if(report.type == "normal"){
									 
									 r_items +='<div class="profile-activity clearfix">';
									 r_items +=	'<div class="slimscrollDIV">';
									 r_items +=		'<p>';
									 r_items +=	     report.content;
									 r_items +=	   '</p>';
									 r_items +=    '</div>';

									 r_items +=    '<div class="tools action-buttons">';
									 r_items +=		'<a href="#" class="blue"><i class="icon-pencil bigger-125"></i></a>';
									 r_items +=		'<a href="#" class="red"><i  class="icon-remove bigger-125"></i></a>';
									 r_items +=    '</div>';
									 r_items +='</div>';
									  
								 }
								 //이미지 보도자료
								 else if(report.type == "image"){
									 
									 r_items +='<div class="profile-activity clearfix">';
									 r_items +=	'<div class="slimscrollDIV">';
									 r_items +=	   '<a href="/images/test/test.png"  title="" data-rel="colorbox" >';
									 r_items +=	     '<img class="pull-left" alt="" src="/js/bootstrap/assets/avatars/avatar5.png">';
									 r_items +=	   '</a>';
									 r_items +=       '<div>';
									 r_items +=	       report.content;
									 r_items +=	    '</div>';
									 r_items +=    '</div>';
									 
									 r_items +=    '<div class="tools action-buttons">';
									 r_items +=		'<a href="#" class="blue"><i class="icon-pencil bigger-125"></i></a>';
									 r_items +=		'<a href="#" class="red"><i  class="icon-remove bigger-125"></i></a>';
									 r_items +=    '</div>';
									 r_items +='</div>';
									 
								 }
								 //비디오 보도자료
								 else if(report.type == "video"){
									 
									 r_items +='<div class="profile-activity clearfix">';
									 r_items +=	'<div class="slimscrollDIV">';
									 r_items +=	   ' <a  class="sublime"  href="#v'+report.seq+'" title="" data-settings="close-button-visibility:visible;" >';
									 r_items +=	     '<img class="pull-left" alt="" src="/js/bootstrap/assets/avatars/avatar5.png">';
									 r_items +=	   '</a>';
									 r_items +=       '<div>';
									 r_items +=	       report.content;
									 r_items +=	    '</div>';
									 r_items +=    '</div>';
									 
									 r_items +=    '<div class="tools action-buttons">';
									 r_items +=		'<a href="#" class="blue"><i class="icon-pencil bigger-125"></i></a>';
									 r_items +=		'<a href="#" class="red"><i  class="icon-remove bigger-125"></i></a>';
									 r_items +=    '</div>';
									 r_items +='</div>';
									 
								 }
								 
							 }
							 $(tabContent).find(".widget-main").html(r_items);
							
						}
					}
				},
				complete:function(){}					
			});	
		 
	 },
	 
	 //탭 목록 초기화
	 init_TabList : function(){
		 $.ajax({
				url  : "/support/report/getAvaiableCategories",
				type : "POST",
				dataType: "json", 
				data    : {},
				success : function(data){
					
					if(data.result == ajaxResultCode.SUCCESS){
						if(data.tablist.length > 0){
							
							//탭 목록 구성
							 var tabList = data.tablist;
							 $("#report_tabs").html("");
							 $(".tab-content").html("");
							 
							 var tab_li   = "";
							 var tab_cont = "";
							 
							 for(var i = 0 ; i < tabList.length ; i++){
							   tab_li += "<li class='' code_data='"+tabList[i].ctg_code+"' idx='"+i+"'>";
							   tab_li +=	  "<a data-toggle='tab' href='#tab_"+tabList[i].ctg_code+"'>"+tabList[i].ctg_name+"</a>";
							   tab_li +=	"</li>";
							   
							   tab_cont += "<div id='tab_"+tabList[i].ctg_code+"' class='tab-pane'>";
							   tab_cont +=   "<p>";
							   tab_cont +=   "</p>";
							   tab_cont +=   "<div class='widget-body'>";
							   tab_cont +=      "<div class='widget-main padding-4'></div>";
							   tab_cont +=   "</div>";
							   tab_cont += "</div>";
							   
							 }
							 $("#report_tabs").html(tab_li);
							 $(".tab-content").html(tab_cont);
							 
							
						}else{
							$(".tab-content").html("<center> 등록된 보도자료가 없습니다</center>");
						}
					}
				},
				complete:function(){
					
					
					 $.each($("#report_tabs li"),function(idx, liEle){
							var ctg_code    = $(this).attr("code_data");
							var idx         = $(this).attr("idx");
							var tab_content = "#tab_"+ctg_code;
							mMain.getReportList(ctg_code,idx,tab_content);
							
						 if(idx == 0){
							 $(liEle).addClass("active").trigger("click");
							 $("#tab_"+$(liEle).attr("code_data")).addClass("active");
						 }
					 });
					
					 //슬림스크롤 초기화
					 mMain.init_SlimScroll();

					//이미지 크게보기 초기화
					 mMain.init_ZoomInImage();
					
				}					
			});	
		 
		
		 
		 
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
	
	 },
	 
	 actEvent:function(){},
	 
	 init:function(){
		 
		//탭 목록 초기화
		 mMain.init_TabList();
			
	 }
};


//==================================
//페이지(도큐먼트) 초기화
//==================================

function initDocument(){
	mMain.init();
	mMain.actEvent();
}


