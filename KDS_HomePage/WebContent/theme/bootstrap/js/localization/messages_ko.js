/*
 * Translated default messages for the jQuery validation plugin.
 * Locale: KO (Korean; 한국어)
 */
(function ($) {
	$.extend($.validator.messages, {
		required: "&nbsp;* 필수",
		remote: "&nbsp;항목을 수정하세요.",
		email: "&nbsp;유효하지 않은 E-Mail주소입니다.",
		url: "&nbsp;유효하지 않은 주소입니다.",
		date: "&nbsp;옳바른 날짜를 입력하세요.",
		dateISO: "&nbsp;옳바른 날짜(ISO)를 입력하세요.",
		number: "&nbsp;유효한 숫자가 아닙니다.",
		digits: "&nbsp;숫자만 입력 가능합니다.",
		creditcard: "&nbsp;신용카드번호가 바르지 않습니다.",
		equalTo: "&nbsp;같은값을 다시 입력하세요.",
		accept: "&nbsp;옳바른 확장자가 아닙니다.",
		maxlength: $.format("&nbsp;{0}자를 넘을 수 없습니다. "),
		minlength: $.format("&nbsp;{0}자 이하로 입력하세요."),
		rangelength: $.format("&nbsp;문자 길이를 {0} 에서 {1} 사이의로 입력하세요."),
		range: $.format("&nbsp;{0} 에서 {1} 값을 입력하세요."),
		max: $.format("&nbsp;{0} 이하의 값을 입력하세요."),
		min: $.format("&nbsp;{0} 이상의 값을 입력하세요.")
	});
}(jQuery));
