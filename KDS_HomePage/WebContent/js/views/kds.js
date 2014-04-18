
/**********************************************************************************
 * 
 * KDS 홈페이지 전역변수 JS
 * : 
 * 
 * @author Boh
 * @since 2014/04/11
 * 
 **********************************************************************************/

var grid_selector 	= "#grid-table";
var pager_selector 	= "#grid-pager";

var kdsHP_info = {
	dwp : "dmlfywjdcorqkdthd",//의료정책방송
};

var file_upload = {
		
	WHITE_LIST : ["image/png","image/jpeg","image/gif","image/bmp","image/vnd.microsoft.icon","image/tiff","image/tiff","audio/mpeg",
	              "application/zip","audio/mpeg","application/pdf","application/msword","application/vnd.ms-excel","application/vnd.ms-powerpoint",
	              "application/haansofthwp","application/x-hwp","text/plain"]	,

    BLACK_LIST : ["text/html","application/javascript"],
    MAX_SIZE  : 10 * 1024 * 1024, //10MB,
    MAX_SIZE_HM : "10MB"
		
};


 /*다운로드*/
var downloadFile = function(url, parameters , method){
	
	var inputs = "";
	var params = parameters.split("&");
	
	if(url != null){
		
		$.each(params, function(index,value){
			var pairs = value.split("=");
			inputs += "<input type='hidden' name='"+pairs[0]+"' value='"+pairs[1]+"' />";
		});
		
		var form = "<form action='"+url+"' method='"+(method ? method : 'POST' )+"'>" + inputs + "</form>";
		
		$(form).appendTo("body").submit().remove();
		
	  }
   }


String.prototype.trim = function() { //전체공백제거
    return this.replace(/^\s+|\s+$/g,"");
}