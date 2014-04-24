
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
	dwp : "dmlfywjdcorqkdthd",//의료정책방송,
	authorized : true
};


/*파일 업로드 관련 */
var file_upload = {
		
	WHITE_LIST : ["image/png","image/jpeg","image/gif","image/bmp","image/vnd.microsoft.icon","image/tiff","image/tiff","audio/mpeg","video/mp4",
	              "application/zip","audio/mpeg","application/pdf","application/msword","application/vnd.ms-excel","application/vnd.ms-powerpoint",
	              "application/haansofthwp","application/x-hwp","text/plain"]	,

    BLACK_LIST : ["text/html","application/javascript"],
    MAX_SIZE   : 10 * 1024 * 1024, //10MB,
    MAX_SIZE_HM : "10MB"
		
};


/*보도자료 파일업로드 */
var report_file_upload = {
		
	WHITE_LIST : ["image/png","image/jpeg","image/gif","image/bmp","image/vnd.microsoft.icon","image/tiff","image/tiff","video/mp4"]	,

    BLACK_LIST : ["text/html","application/javascript"],
    MAX_SIZE   : 20 * 1024 * 1024, //20MB,
    MAX_SIZE_HM : "20MB"
		
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
   };


String.prototype.trim = function() { //전체공백제거
    return this.replace(/^\s+|\s+$/g,"");
};
function replaceAll(sValue, param1, param2) {
    return sValue.split(param1).join(param2);
}