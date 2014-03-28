
/**********************************************************************************
 * 
 * sample JS
 * : 
 * 
 * @author Boh
 * @since 2014/03/21
 * 
 **********************************************************************************/




var mMain={

 actEvent:function(){
	alert("이벤트 핸들러 초기화"); 
 },
 
 init:function(){
	 
	 $("#tabs").tabs();
	getContentTab(1);	

	 
 }
};


//==================================
//페이지(도큐먼트) 초기화
//==================================

function initDocument(){
	mMain.init();
	mMain.actEvent();
}



function getContentTab(index){
	//var url="/user/list" + index;  
	var targetDiv = "#tabs-" + index; 

	$(targetDiv).html(result)
	
/*	$.get(url, null, function(result){
		$(targetDiv).html(result);   // 해당 div에 결과가 나타남
	});*/
}
