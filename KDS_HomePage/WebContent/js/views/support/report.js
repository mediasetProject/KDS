
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
	
	 edit_seq : null, //수정용 seq
		
	 /* 파일업로드 Callback */
	 fileUploadCallback : function(responseText, statusText, xhr, $form){
			
		 var res = $.parseJSON(responseText);
		 
		 if(res.result == ajaxResultCode.SUCCESS){
			 $("#fileName").val(res.fileName);
			 $("#fileExt").val(res.fileExt);
			 $("#fileType").val(res.fileType);
			 $("#upload_file_path").val(res.fileUrl);
			 $("#upload_file_chk").val("true");
             
		 }else{
			 $("#fileName").val("");
			 $("#fileExt").val("");
			 $("#fileType").val("");
			 $("#upload_file_path").val("");
			 $("#upload_file_chk").val("false");
			 mMain.warnMessage(res.message,"300px");
		 }
	 },	
	 
    // 확인 창 
	confirmMessage : function(message, width, callback, params){
		
	 var dialog = new BootstrapDialog({
			 
			   title : "<i class='icon-bullhorn  bigger-125'></i> 확 인",
			   message: message,
	          draggable:true,
	          data: {
                  'callback': callback
              },
	          buttons: [{
	                label: '취소',
	                icon: 'icon-remove',
	                cssClass:"btn-danger btn-xs",
	                action: function(dialogRef){
	                    dialogRef.close();
	                }
	              },{
	                label: '확인',
	                icon: 'icon-ok',
	                hotkey: 13, // Enter.
	                cssClass: 'btn-primary btn-xs',
	                action: function(dialogRef){
	                	typeof dialogRef.getData('callback') === 'function' && dialogRef.getData('callback')(params.id);
	                	dialogRef.close();
	                }
	                    
	            }],
	            onshow   : function(dialogRef){},
	            onshown  : function(dialogRef){},
	            onhide   : function(dialogRef){},
	            onhidden : function(dialogRef){}
	        });
	        dialog.realize();
	        $(dialog.getModal()).find(".modal-content").css("width",width);
	        dialog.open();
		
        
	},
		
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
	 
    //보도자료 삭제 확인
	 confirmDelete : function(obj){
		 mMain.confirmMessage("삭제하시겠습니까?","250px",mMain.removeReport, {"id":$(obj).parent().parent().attr("id")});
	 },
	 
	 //보도자료 삭제
	 removeReport : function(rDiv_id){
		 
		 var $reportWrapper = $("#"+rDiv_id);
		 $reportWrapper.remove();
	    
	    $.ajax({
			url  : "/support/report/deleteReportOne",
			type : "POST",
			dataType: "json", 
			data    : {seq : $reportWrapper.attr("data-key")},
			success : function(data){},
			complete:function(){}					
		});	
	    
	    
	 },
	 
	 hideFormShowTabs : function(){
		 $(".tab_container").show();
		 $("#form_container").hide();
	 },
	 
	 showFormHideTabs : function(){
		 $(".tab_container").hide();
		 $("#form_container").show();
	 },
	 
	 //보도자료 수정
	 updateReport : function(){
		
		 if(mMain.edit_seq == null){return;}
		 
		 var params = $("#main-form").serialize() + "&seq="+mMain.edit_seq;
		 
			$.ajax({
				url  : "/support/report/updateReportOne",
				type : "POST",
				async   : false,
				dataType: "json", 
				data    : params,
				success : function(data){
					if(data.result == ajaxResultCode.SUCCESS){
						mMain.alertMessage("보도자료를 수정하였습니다","230px");
					}
					else{
						mMain.warnMessage("보도자료 수정을 실패하였습니다","280px");
					}
				},
				complete:function(){
					 mMain.edit_seq = null;
				}					
			});
	 },
	 
	 //보도자료 수정 모드
	 changeMode_Edit : function(container){
		 mMain.showFormHideTabs();
		 $(".reg-mode ").hide();
		 $(".edit-mode").show();
		 
		 mMain.setInitCssStatus();
		 
		 var $container    = $(container);
		 var p_key         = $container.attr("data-key");
		 var category_code = $container.attr("ctg_code");
		 var content       = replaceAll($container.find("[class=report_content]").text(),"<br/>","\r\n");
		
		 $("#tab_category>option[value='"+category_code+"']").attr("selected", "selected");
		 $("#tab_category").attr("disabled", "disabled");
		 $("#content").html(content);
		 
		 mMain.edit_seq = p_key;
	 },
	 
	 //보도자료 입력 모드
	 changeMode_Reg : function(){
		 mMain.showFormHideTabs();
		 $(".edit-mode").hide();
		 $(".reg-mode ").show();
		 mMain.setInitCssStatus();
	 },
	 
	 /* Css 설정 초기화 */
	 setInitCssStatus : function(){
		 
		//각종 정보 초기화
		 $("#fileName").val("");
		 $("#fileExt").val("");
		 $("#fileType").val("");
		 $("#upload_file_path").val("");
		 $("#upload_file_chk").val("false");
		
		 $("#tab_category").removeAttr("disabled");
		 
		 $("form")[0].reset();
		 $(".ace-file-input").find("a[class=remove]").trigger("click");
		 
	 },
	 
	 //탭 보도자료 리스트
	 getReportList : function(ctg_code,tabContent){
		 
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
									 
									 r_items +='<div class="profile-activity clearfix" data-key="'+report.seq+'" ctg_code="'+ctg_code+'" id="rDiv_'+report.seq+'">';
									 r_items +=	'<div class="slimscrollDIV">';
									 r_items +=		'<p class="report_content">';
									 r_items +=	     report.content;
									 r_items +=	   '</p>';
									 r_items +=    '</div>';
									 
									 r_items +=    '<div class="tools action-buttons">';
									 r_items +=		'<a href="#" class="blue" onClick="mMain.changeMode_Edit(rDiv_'+report.seq+')"><i class="icon-pencil bigger-125"></i></a>';
									 r_items +=		'<a href="#" class="red"  onClick="mMain.confirmDelete(this)"><i  class="icon-remove bigger-125"></i></a>';
									 r_items +=    '</div>';
									 r_items +='</div>';
								 }
								 //이미지 보도자료
								 else if(report.type == "image"){
									 
									 r_items +='<div class="profile-activity clearfix" data-key="'+report.seq+'" ctg_code="'+ctg_code+'" id="rDiv_'+report.seq+'">';
									 r_items +=	'<div class="slimscrollDIV">';
									 r_items +=	   '<a href="/assets/'+report.image_path+'"  title="" data-rel="colorbox" >';
									 r_items +=	     '<img class="pull-left" alt="" src="/assets/'+report.image_path+'">';
									 r_items +=	   '</a>';
									 r_items +=       '<div class="report_content">';
									 r_items +=	       report.content;
									 r_items +=	    '</div>';
									 r_items +=    '</div>';
									 
									 r_items +=    '<div class="tools action-buttons">';
									 r_items +=		'<a href="#" class="blue" onClick="mMain.changeMode_Edit(rDiv_'+report.seq+')"><i class="icon-pencil bigger-125"></i></a>';
									 r_items +=		'<a href="#" class="red"  onClick="mMain.confirmDelete(this)"><i  class="icon-remove bigger-125"></i></a>';
									 r_items +=    '</div>';
									 r_items +='</div>';
									 
								 }
								 //비디오 보도자료
								 else if(report.type == "video"){
									 
									 r_items +='<div class="profile-activity clearfix" data-key="'+report.seq+'" ctg_code="'+ctg_code+'" id="rDiv_'+report.seq+'">';
									 r_items +=	'<div class="slimscrollDIV">';
									 r_items +=	   ' <a  class="sublime"  href="#video_'+report.seq+'" title="" data-settings="close-button-visibility:visible;" >';
									 r_items +=	     '<img class="pull-left" alt="" src="/assets/'+report.image_path+'">';
									 r_items +=	   '</a>';
									 r_items +=       '<div class="report_content">';
									 r_items +=	       report.content;
									 r_items +=	    '</div>';
									 r_items +=    '</div>';
									 
									 r_items +=    '<div class="tools action-buttons">';
									 r_items +=		'<a href="#" class="blue" onClick="mMain.changeMode_Edit(rDiv_'+report.seq+')"><i class="icon-pencil bigger-125"></i></a>';
									 r_items +=		'<a href="#" class="red"  onClick="mMain.confirmDelete(this)"><i  class="icon-remove bigger-125"></i></a>';
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
							   tab_li += "<li class='' code_data='"+tabList[i].ctg_code+"'>";
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
							$(".tab-content").html("<center> 등록된 보도자료가 없습니다 </center>");
						}
					}
				},
				complete:function(){
					
					
					 $.each($("#report_tabs li"),function(idx, liEle){
							var ctg_code    = $(this).attr("code_data");
							var tab_content = "#tab_"+ctg_code;
							mMain.getReportList(ctg_code,tab_content);
							
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
	 
	 //폼 셀렉트 초기화
	 init_FormSelect : function(targetId){
		 
		 $.ajax({
				url  : "/support/report/getAllTabCategories",
				type : "POST",
				dataType: "json", 
				success : function(data){
					
					$("#"+targetId).html("");
					var options = "";
					$.each(data.tablist, function(idx,ctg_info){
						options += "<option value='" + ctg_info.ctg_code +"'>" + ctg_info.ctg_name + "</option>";
					});
					
					$("#"+targetId).html(options);
				},
				complete:function(){}
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
				
					$.each(report_file_upload.WHITE_LIST,function(idx,type){
						if(file_mime_type == type){
							file_vaild = true;
						}
					});
					
					if(file_size > report_file_upload.MAX_SIZE){
						mMain.warnMessage("최대 파일크기를 초과하였습니다 ("+report_file_upload.MAX_SIZE_HM+")","300px");
						return false;
					}
					else if(!file_vaild){
						mMain.warnMessage("업로드를 할 수 없는 파일형식입니다","300px");
						return false;
					}
					
					// 임시파일로 업로드
					$("#main-form").ajaxForm(mMain.fileUploadCallback);
					$("#main-form").attr("action","/comm/file/uploadTempFile");
					$("#main-form").submit();
					
					return true;
				}
				,before_remove : function() {
					$("#fileName").val("");
					$("#fileExt").val("");
					$("#fileType").val("");
					$("#upload_file_path").val("");
					$("#upload_file_chk").val("false");
					return true;
				}
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
	 
	 /* 보도자료 등록 */
	 addReport : function(form){
		 
			$.ajax({
				url  : "/support/report/addReport",
				type : "POST",
				dataType: "json", 
				data  : $("#"+form).serialize(),
				success : function(data){
					if(data.result == ajaxResultCode.SUCCESS){
						mMain.alertMessage("보도자료를 등록하였습니다","250px");
						mMain.setInitCssStatus();
					}
					else{
						mMain.warnMessage("보도자료 등록을 실패하였습니다","280px");
					}
				},
				complete:function(){}					
			});	
	 },
	 
	 confirmPassword : function(){

		 var dialog = new BootstrapDialog({
			    title : "<i class='icon-info-key'></i>",
	           message: function(dialogRef){
	        	   
	        	   $message = "<div>";
	        	   $message +=	"<label class='col-sm-4'> 비밀번호 </label>";
	        	   $message +=	"<div class='col-sm-8'>";
	        	   $message +=		"<input type='password' id='login_password' placeholder='' class='col-sm-12'>";
	        	   $message +=	"</div>";
	        	   $message +=   "<div class='space-14'></div>";
	        	   $message += "</div>";
	        	   
	              return $message;
	            },
	          draggable:true,
	          buttons: [{
	                label: '취소',
	                icon: 'icon-remove',
	                cssClass:"btn-danger btn-xs",
	                action: function(dialogRef){
	                    dialogRef.close();
	                }
	              },{
	                label: '확인',
	                icon: 'icon-ok',
	                hotkey: 13, // Enter.
	                cssClass: 'btn-primary btn-xs',
	                action: function(dialogRef){
	                	if(dialogRef.getModalBody().find("#login_password").val() == kdsHP_info.dwp){
	                		dialogRef.close();
	                		kdsHP_info.authorized = true;
	                		mMain.changeMode_Reg();
	                	}else{
	                		dialogRef.getModalBody().find("#login_password").focus().val("");
	                	}
	                }
	            }],
	            onshow   : function(dialogRef){},
	            onshown  : function(dialogRef){},
	            onhide   : function(dialogRef){},
	            onhidden : function(dialogRef){}
	        });
	        dialog.realize();
	        dialog.getModalHeader().hide();
	        $(dialog.getModal()).find(".modal-content").css("width","300px");
	        dialog.open();
	 },
	 
	 actEvent:function(){
		 
		 //목록 버튼 클릭
		 $("#btn_tabList").on("click",function(){
			 mNavi.hrefPost('/support'   ,'4', '2');
			 /*mMain.hideFormShowTabs();*/
		 });
		 
		 //등록 버튼 클릭
		 $("#btn_regForm").on('click',function(){
			mMain.addReport("main-form");
		 });
		 
		 //수정 버튼 클릭
		 $("#btn_Edit").on("click",function(){
			 mMain.updateReport();
		 });
		 
		 //글쓰기 버튼 클릭
		 $("#btn_write").on("click",function(){
			 mMain.confirmPassword();
		 });
		 
		 
	 },
	 
	 init:function(){
		 
		 //탭 목록 초기화
		 mMain.init_TabList();
		 //Form Select 초기화
		 mMain.init_FormSelect("tab_category");
		 //파일업로드 초기화	
		 mMain.init_Fileupload(); 
		 
		 
	 }
};


//==================================
//페이지(도큐먼트) 초기화
//==================================

function initDocument(){
	mMain.init();
	mMain.actEvent();
}


