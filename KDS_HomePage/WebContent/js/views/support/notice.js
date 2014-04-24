
/**********************************************************************************
 * 
 * 고객지원 - 공지사항 JS
 * : 
 * 
 * @author Boh
 * @since 2014/04/11
 * 
 **********************************************************************************/




var mMain={
		
    gridinfo  : null,
    selArticleID : null,
	 writable : false,  //글 쓸수 있는 권한 (admin)	
	
	 /* 파일업로드 Callback */
	 fileUploadCallback : function(responseText, statusText, xhr, $form){
			
		 var res = $.parseJSON(responseText);
		 
		 if(res.result == ajaxResultCode.SUCCESS){
			 $("#fileName").val(res.fileName);
			 $("#fileExt").val(res.fileExt);
			 $("#upload_file_path").val(res.fileUrl);
			 $("#upload_file_chk").val("true");
             
		 }else{
			 $("#fileName").val("");
			 $("#fileExt").val("");
			 $("#upload_file_path").val("");
			 $("#upload_file_chk").val("false");
			 mMain.warnMessage(res.message,"300px");
		 }
	 },
	 
	 /* 공지사항 등록 */
	 addNotice : function(form){
		
			$.ajax({
				url  : "/support/notice/addNotice",
				type : "POST",
				dataType: "json", 
				data  : $("#"+form).serialize(),
				success : function(data){
					
					if(data.result == ajaxResultCode.SUCCESS){
						mMain.reloadjqGrid();
						mMain.hideFormShowGrid();
					}
					else{
						mMain.warnMessage("공지사항 등록을 실패하였습니다","300px");
						mMain.hideFormShowGrid();
					}
				},
				complete:function(){}					
			});	
	 },
	 
	 /* 공지사항 수정 */
	 updateArticle : function(){
			
		 var params = $("#main-form").serialize() + "&seq="+mMain.selArticleID;
		 
			$.ajax({
				url  : "/support/notice/updateArticle",
				type : "POST",
				async   : false,
				dataType: "json", 
				data    : params,
				success : function(data){
					if(data.result == ajaxResultCode.SUCCESS){
						mMain.reloadjqGrid();
						mMain.hideFormShowGrid();
					}
				},
				complete:function(){
				}					
			});
	 },
	 
	 /* 공지사항 삭제 */
	 delArticle : function(seq, file_path){
		
			$.ajax({
				url  : "/support/notice/delArticle",
				type : "POST",
				async   : false,
				dataType: "json", 
				data  : {
					seq       : seq,
					file_path : file_path
				},
				success : function(data){
					if(data.result == ajaxResultCode.SUCCESS){
						mMain.reloadjqGrid();
						mMain.hideFormShowGrid();
					}
				},
				complete:function(){
					
				}					
			});
	 },
	 
	 //게시글 일반표출 체크박스 CSS
	  displayNormalCss : function(){
		 $("#ckb_has_priority").attr("checked", false);
		 $("#has_priority").val("N");
		 $("#lbl_has_priority").removeClass("label-danger").addClass("label-success").text("일반표출");
		 
	 },
	 
	 //게시글 상단표출 체크박스  CSS
	 displayUrgenCss : function(){
		 $("#ckb_has_priority").attr("checked", true);
		 $("#has_priority").val("Y");
		 $("#lbl_has_priority").removeClass("label-success").addClass("label-danger").text("상단표출");
	 },
	 
	 hideFormShowGrid : function(){
		 $("#jqGrid_container").show();
		 $("#form_container").hide();
	 },
	 
	 showFormHideGrid : function(){
		 $("#jqGrid_container").hide();
		 $("#form_container").show();
	 },
	 
	 /* Css 설정 초기화 */
	 setInitCssStatus : function(){
		 
		//각종 정보 초기화
		 $("#fileName").val("");
		 $("#fileExt").val("");
		 $("#upload_file_path").val("");
		 $("#upload_file_chk").val("false");
		
		 $("#notice_title").removeAttr("disabled");
		 $("#notice_content").removeAttr("disabled");
		 $("#btn_download").attr("disabled"  , false);
		 
		 $("#lbl_read_acc").text("0");
		 
		 $("form")[0].reset();
		 $(".ace-file-input").find("a[class=remove]").trigger("click");
		 
	 },
	 /* 공지사항 등록모드 */
	 changeMode_Register : function(){
			mMain.showFormHideGrid();
			$(".edit-mode").hide();
			$(".view-mode").hide();
			$(".reg-mode ").show();
	 },
	 
	 /* 공지사항 수정모드 */
	 changeMode_Edit : function(){
		 
		 mMain.showFormHideGrid();
		 
		 $(".view-mode").hide();
		 $(".reg-mode ").hide();
		 $(".edit-mode").show();
		 
		var rowData = mMain.gridinfo.getRowData(mMain.selArticleID);
		$("#notice_title").val(rowData.title);
		$("#notice_content").val(rowData.content);
		
		
		//상단표출 체크 박스
		if(rowData.has_priority == 'Y'){
			mMain.displayUrgenCss();
			
		}else{
			mMain.displayNormalCss();
		}
		
		//각종 정보 초기화
		$("#fileName").val("");
		$("#fileExt").val("");
		$("#upload_file_path").val("");
		$("#upload_file_chk").val("false");
		$(".ace-file-input").find("a[class=remove]").trigger("click");
		
		//파일다운로드 비활성화
		if(rowData.file_path.trim() == ""){
			$("#btn_download").attr("disabled",true);
		}
		 
	 },
	 /* 공지사항 보기모드 */
    changeMode_View : function(){
    	
    	mMain.showFormHideGrid();
    	
		$(".edit-mode").hide();
		$(".reg-mode ").hide();
		$(".view-mode").show();
		
		var rowData = mMain.gridinfo.getRowData(mMain.selArticleID);
		$("#notice_title").val(rowData.title);
		$("#notice_title").attr('disabled' , 'disabled');
		$("#notice_title").css({});
		
		$("#notice_content").val(rowData.content);
		$("#notice_content").attr('disabled' , 'disabled');
		 
		if(rowData.file_path.trim() == ""){
			$("#btn_download").attr("disabled",true);
		}
		
		//조회수 증가
		mMain.increaseReadAccount(mMain.selArticleID);
		
	 },
	 
	 /*조회수 증가*/
	 increaseReadAccount : function(article_seq){
		 
		 $.ajax({
				url  : "/support/notice/increaseArticleReadAccount",
				type : "POST",
				dataType: "json", 
				data  : {
					seq    : article_seq,
				},
				success : function(data){},
				complete:function(){}					
			});
	 },
	 
	 doWriteNoticeInfo : function(){
		mMain.changeMode_Register();
		 
	 },
	 confirmPassword : function(){

		 var dialog = new BootstrapDialog({
			    title : "<i class='icon-info-key'></i>",
	           message: function(dialogRef){
	        	   
	        	   $message = "<div>";
	        	   $message +=	"<label class='col-sm-4'> 비밀번호 </label>";
	        	   $message +=	"<div class='col-sm-8'>";
	        	   $message +=		"<input type='password' id='notice_pwd' placeholder='' class='col-sm-12'>";
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
	                    mMain.writable = false;
	                }
	              },{
	                label: '확인',
	                icon: 'icon-ok',
	                hotkey: 13, // Enter.
	                cssClass: 'btn-primary btn-xs',
	                action: function(dialogRef){
	                	if(dialogRef.getModalBody().find("#notice_pwd").val() == kdsHP_info.dwp){
	                		dialogRef.close();
	                		mMain.writable = true;
	                		mMain.changeMode_Register();
	                	}else{
	                		dialogRef.getModalBody().find("#notice_pwd").focus().val("");
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
	 
	 //jqGrid 파일다운로드 포맷
	 formatFileDown :function(cellValue, options, rowObject){
		 
		 var r = "";
		 
		 if(rowObject.file_path.trim() != ""){
			 r +=  '<button  type="button" class="btn btn-success btn-xs btn-minier" disabled="disabled" style="display: inline-block;">';
			 r += 	'<i class="icon-download-alt bi"></i>';
			 r +=  '</button>';
		 }
		 
		 return r;
	 } ,
	 
	 jqGridData : function(postData){
			var url         = "/support/notice/queryNoticeList";
			mMain.gridinfo = new mcGrid("grid-table", "grid-pager",{
								data         : 'POST',
								url            : url,
								postData : postData,
								datatype : "JSON",
								height     : 'auto',
								colNames:['번호','제 목','작성자','날짜','첨부<br/><br/>파일','','','','',''],
								colModel:[
											{name : 'seq'      ,width:'5%'  , align:"CENTER"},	
											{name : 'title'    ,width:'65%'},
											{name : 'writer'   ,width:'10%' , align:"CENTER"} ,
											{name : 'reg_date' ,width:'15%' , align:"CENTER" ,formatter:mcGrid.formatDateTimeFormat2},
											{name : 'file_down',width:'5%'  , align:"CENTER" ,formatter:mMain.formatFileDown},
											{name : 'content'      ,hidden:true},
											{name : 'read_account' ,hidden:true},
											{name : 'file_name'    ,hidden:true},
											{name : 'file_path'    ,hidden:true},
											{name : 'has_priority' ,hidden:true},
								           ], 	
								width:$("#grid-container").width(),
								cmTemplate:{sortable:false, align:"CENTER", width:100},
								onSelectRow  : function(id){
									
									mMain.selArticleID = id;
									//조회수
									$("#lbl_read_acc").text(mMain.gridinfo.getRowData(mMain.selArticleID).read_account);
									
									if(mMain.writable){
										mMain.changeMode_Edit();
									}else{
										mMain.changeMode_View();
									}
									
								},
			});	
		 
	 },
	 reloadjqGrid : function(search_txt){
			
			$("#grid-table").clearGridData();
			$("#grid-table").setGridParam( {
				     postData : {
				    	 search_txt : search_txt
				     }
			} ).trigger("reloadGrid");		
		},
	 
	 actEvent:function(){
		
		 //글쓰기 버튼 클릭
		 $("#btn_write").on("click",function(){
			 
			 mMain.setInitCssStatus();
			 mMain.displayNormalCss();
			 
			if(mMain.writable){
				mMain.doWriteNoticeInfo();
			}else{
				mMain.confirmPassword();
			}
		  });
		 
		 //등록 버튼 클릭
		 $("#btn_regForm").on('click',function(){
			mMain.addNotice("main-form");
			 
		 });
		 
		 //수정 버튼 큭릭
		 $("#btn_editForm").on("click",function(){
			 mMain.updateArticle();
			 
		 });
		 
		 //삭제 버튼 클릭
		 $("#btn_delForm").on("click",function(){
			 mMain.delArticle(mMain.selArticleID, mMain.gridinfo.getRowData(mMain.selArticleID).file_path);
		 });
		 
		 //다운로드 버튼 클릭
		 $("#btn_download").on("click",function(){
			 var rowData = mMain.gridinfo.getRowData(mMain.selArticleID);
			 var params = "file_name="+rowData.file_name+"&file_path="+rowData.file_path;
			  downloadFile('/support/notice/download', params ,'POST');
			 
		 });
		 
		 //목록 버튼 클릭
		 $("#btn_jqGridList").on("click",function(){
			 mMain.selArticleID = null;
			 mMain.setInitCssStatus();
			 mMain.hideFormShowGrid();
			 
			});
		 
		 //엔터 검색 대응 
		 $("#txt_search").on("keydown",function(event){
			 if(event.which == 13){
				 $("#btn_search").trigger("click");
			 }
			 
		 });
		 
		 //검색 버튼 클릭
		 $("#btn_search").on("click",function(){
			 
			 var html = "";
			 $("#grid-container").html("");
			   html += '<table id="grid-table"></table>';
			   html += '<div id="grid-pager"></div>';
			 $("#grid-container").html(html);
			 
			 mMain.jqGridData({search_txt : $("#txt_search").val().trim()});
			 
			 
		 });
		 
		 //상단표출 체크박스
		 $("#ckb_has_priority").on("change",function(){
			 if($(this).is(":checked")){
				 mMain.displayUrgenCss();
				 
			 }else{
				 mMain.displayNormalCss()();
			 }
		 });

		 
	 },
	 
	 init:function(){
		 
		 //공지사항 
		 mMain.jqGridData({});
		 
		 //상단표출 체크박스 초기화
		 $("#has_priority").val("N");
		 
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
					$("#main-form").ajaxForm(mMain.fileUploadCallback);
					$("#main-form").attr("action","/comm/file/uploadTempFile");
					$("#main-form").submit();
					
					return true;
				}
				,before_remove : function() {
					$("#fileName").val("");
					$("#fileExt").val("");
					$("#upload_file_path").val("");
					$("#upload_file_chk").val("false");
					return true;
					}
				,
				preview_error : function(filename, error_code) {}
		
			}).on('change', function(){});
			
	 }
};


//==================================
//페이지(도큐먼트) 초기화
//==================================

function initDocument(){
	mMain.init();
	mMain.actEvent();
}


