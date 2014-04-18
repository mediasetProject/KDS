/**********************************************************
 * Program : jquery-mediaset-grid
 * File    : /libs/mediaset/js/jquery.mc-grid.js
 * Creater : hyun3364 at mediaset.co.kr
 * Date    : 2014/02/05
 * Remark  :
 *
 * Modify  :
 *   - 
 **********************************************************/

/****************************************************************************************************************************
 * DataGrid 초기화
 * WEB-INF/views/incloud/header.jsp 파일에
 * <script src="./libs/mediaset/js/jquery.mc-grid.js"></script>
 * 추가하여 사용가능.
 * jqgrid 초기화 및 포맷터 생성하여 사용가능.
 * 사용예제
 * 자바스크립트단에서 아래와 같이 사용 
	var gridinfo;
	function initGrid()
	{
		var url = "./system/company/companyMgrList.json";
	    gridinfo = new mcGrid("grid-table", {
			url : url,
			colNames:['사업자등록번호','운영사명','대표자명'],
			colModel:[
				{name:'brn',			index:'brn', 			width:7, 	editable: false}, 
				{name:'company_name',	index:'company_name',	width:7, 	editable: false}, 
				{name:'ceo_name',		index:'ceo_name',		width:7, 	editable: false, formatter:mcGrid.등록된 포멧메소드명},
			],
			width:$("#grid-container").width()
		});	
	}

gridinfo.getSelectedRowId(); 
gridinfo.getRowData(rowId);
등... 사용가능.

****************************************************************************************************************************/

var mc = mc || function($){};
mcGrid = function(gridId, pageId, options) {
	this.init(gridId, pageId, options);
	this.initEventBind();
};
var grid_selector = "";
var page_selector = "";
var grid_width=0;
$.extend(mcGrid.prototype, {
	/**
	 * 생성자
	 *
	 * @param gridId 그리드ID
	 * @param options 옵션
	 */
	init : function(gridId, pageId, options) {
		grid_selector = "#"+gridId;
		page_selector = "#"+pageId;
		this.options = $.extend(true, {
			mtype : "POST",
			postData : {},
			rownumbers : false,
			multiselect : false,
			minWidth : 400,
			height : 'auto',
			gridview : true,
			useExtend : true,
			paging : true,
			rowNum : 10,
			rowList : [10,15,20,30,50],
			viewrecords: true,
			loadonce: false,
			gridComplete : null,
			footerrow: false,
			userDataOnFooter:false,
			loadComplete : null,
			onSelectRow : null
		}, options || {});
		
		if (this.options.width == undefined) 
		{
			this.options.width = $(window).width();
			if (this.options.width < this.options.minWidth) 
			{
				this.options.width = this.options.minWidth;
			}
		};
		grid_width = this.options.width;
		if (this.options.paging == false) {
			this.options.viewrecords = false;
			this.options.rowNum = -1;
		};

		var tableIdSelector = "#" + gridId;
		this.tableIdSelector = tableIdSelector;
		var pagerIdSelector = "#" + pageId;
		

		var model = this.options.colModel;
		for (var i = 0; i < model.length; i++) 
		{
			model[i]["sortable"] = false;
		}
		$(tableIdSelector).jqGrid({
			url : this.options.url, // 요청 URL
			// mtype: ((this.options.mtype == null) ? "POST" :
			// this.options.mtype),
			ajaxGridOptions : {type : this.options.mtype},
			postData : this.options.postData,
			datatype : 'json', // 응답 데이타타입 (json|xml|...)
			colNames : this.options.colNames, // 컬럼명 배열
			colModel : model, // 컬럼모델 배열
			pager : pagerIdSelector,
			rowNum : this.options.rowNum,
			rowList : this.options.rowList,
			// sortname : this.options.sortname, // 그리드 초기화시 정렬컬럼,
			// sortorder : this.options.sortorder, // 정렬 방법 (asc|desc)
			viewrecords : this.options.viewrecords, // pager bar에 총 레코드수 표시여부
			caption : this.options.caption, // 그리드 제목
			rownumbers : this.options.rownumbers, // 좌측 첫번째 컬럼에 1부터 시작하는 넘버링
			multiselect : this.options.multiselect,
			height : this.options.height, // 그리드 높이
			width : this.options.width-1, // 그리드 너비
			gridview : this.options.gridview, // treeGrid, subGrid,
			paging : this.options.paging,
			loadonce : !(this.options.paging), // 페이징처리와 반대로 움직임
			footerrow : this.options.footerrow,
			userDataOnFooter: this.options.userDataOnFooter,

			beforeRequest : function() 
			{
			},

			gridComplete : function() 
			{
				
				if (gridId == "grid-table1") 
				{
					var rowIds = $("#grid-table1").getDataIDs();

					if (rowIds != null && rowIds.length > 0) 
					{
						$("#grid-table1").jqGrid('setSelection', rowIds[0]);
						var rowid = $( "#grid-table1" ).jqGrid('getGridParam', "selrow" );
						var data  = $( "#grid-table" ).getRowData( rowid );
						initStbGrid(data.place_code);
					}
					else
					{
						initStbGrid();
					}
				}
			},
			
			onSelectRow : this.options.onSelectRow,
			
			onSelectAll : function(aRowids, status) {
			},
			
			loadComplete : function()
			{
				initGridNavigation();
				var table = this;
				setTimeout(function()
				{
					updatePagerIcons(table);
					enableTooltips(table);
				}, 0);
			},
			
			onCellSelect : function(rowId, columnNo, cellcontent, e)
			{
			}
		});

		if (this.options.paging == false) 
		{
			$(pagerIdSelector).hide();
		}
	},
	/**
	 * 이벤트 바인딩 초기화
	 */
	initEventBind : function()
	{
		var minWidth = this.options.minWidth;
		$(window).bind('resize', function() 
		{
			if (minWidth) 
			{
				if (grid_width < minWidth) 
				{
					grid_width = minWidth;
				}
				$(grid_selector).setGridWidth(grid_width-1);
			}
		}).trigger('resize');
		
		if (this.options.url == "") 
		{
			$(window).trigger("resize");
		}
	},
	getSelectedRowId : function()
	{
		return $(this.tableIdSelector).getGridParam("selrow");
	},
	/**
	 * 선택된 rowId 배열을 가져온다
	 */
	getSelectedRowIdArray : function() {
		return $(this.tableIdSelector).getGridParam("selarrrow");
	},
	
	getAllRowIdArray : function(exclusiveSumRow) 
	{
		if (exclusiveSumRow) {
			return $(grid_selector).getDataIDs();
		} else {
			var rowIdArray = $(grid_selector).getDataIDs();
			rowIdArray.pop();
			return rowIdArray;
		}
	},
	
	getRowData : function(rowId)
	{
		return $(this.tableIdSelector).getRowData(rowId);
	},
	
	getCellData : function(rowId, columnId)
	{
		return $(this.tableIdSelector).getRowData(rowId)[columnId];
	},
	
	getCellDataArrayByNormalChart : function(columnId, exclusiveSumRow) 
	{
		var rowIdArray = this.getAllRowIdArray(exclusiveSumRow);
		var length = (rowIdArray == null) ? 0 : rowIdArray.length;
		var cellArray = new Array();
		for (var i = 0; i < length; i++) {
			cellArray[i] = parseFloat($(this.tableIdSelector).getRowData(
					rowIdArray[i])[columnId]);
		}

		return cellArray;
	},
	
	getCellDataArrayByPieChart : function(columnId, exclusiveSumRow)
	{
		var rowIdArray = this.getAllRowIdArray(exclusiveSumRow);
		var length = (rowIdArray == null) ? 0 : rowIdArray.length;
		var cellArray = new Array();
		for (var i = 0; i < length; i++) {
			cellArray[i] = [
					rowIdArray[i],
					parseFloat($(this.tableIdSelector)
							.getRowData(rowIdArray[i])[columnId]) ];
		}

		return cellArray;
	},
});

// ----------------------------------
//DataGrid 페이저 처리 초기화
//----------------------------------
initGridNavigation = function() {
	// navButtons
	$(grid_selector).jqGrid('navGrid', page_selector, { // navbar options
		edit : false,
		editicon : 'icon-pencil blue',
		add : false,
		addicon : 'icon-plus-sign purple',
		del : false,
		delicon : 'icon-trash red',
		search : false,
		searchicon : 'icon-search orange',
		refresh : false,
		refreshicon : 'icon-refresh green',
		view : false,
		viewicon : 'icon-zoom-in grey'
	});
},

// replace icons with FontAwesome icons like above
updatePagerIcons = function(table) 
{
	var replacement = 
	{
		'ui-icon-seek-first' : 'icon-double-angle-left bigger-140',
		'ui-icon-seek-prev' : 'icon-angle-left bigger-140',
		'ui-icon-seek-next' : 'icon-angle-right bigger-140',
		'ui-icon-seek-end' : 'icon-double-angle-right bigger-140'
	};
	$('.ui-pg-table:not(.navtable) > tbody > tr > .ui-pg-button > .ui-icon').each(function(){
		var icon = $(this);
		var $class = $.trim(icon.attr('class').replace('ui-icon', ''));
		
		if($class in replacement) icon.attr('class', 'ui-icon '+replacement[$class]);
	});
},

enableTooltips = function(table) {
	$('.navtable .ui-pg-button').tooltip({container:'body'});
	$(table).find('.ui-pg-div').tooltip({container:'body'});
},

/**
 * Grid.fomatter  작성
 */


mcGrid.formatDateTimeFormat = function(cellValue, options, rowObject)
{
	if (cellValue && cellValue.length >= 14) 
	{
		return cellValue.substr(0, 4) + "-" + cellValue.substr(5, 2) + "-"
				+ cellValue.substr(8, 2) + " " + cellValue.substr(11, 2) + ":"
				+ cellValue.substr(14, 2) + ":" + cellValue.substr(17, 2);
	}

	return (cellValue) ? cellValue : "";
};
mcGrid.formatDateTimeFormat2 = function(cellValue, options, rowObject)
{
	if (cellValue && cellValue.length >= 14) 
	{
		return cellValue.substr(0, 4) + "." + cellValue.substr(5, 2) + "." + cellValue.substr(8, 2);
	}

	return (cellValue) ? cellValue : "";
};
//일자(yyyy/MM/dd) 포맷
mcGrid.formatSlashDate = function(cellValue, options, rowObject) 
{
	if (cellValue && cellValue.length >= 8) 
	{
		cellValue = cellValue.substr(0, 8);
		var year = cellValue.substr(0, 4);
		var mon = cellValue.substr(5, 2);
		var day = cellValue.substr(8, 2);
		return (year + '/' + mon + '/' + day);
	}
	return (cellValue) ? cellValue : "";
};

//년월(yyyy/MM) 포맷
mcGrid.formatSlashMonth = function(cellValue, options, rowObject) 
{
	if (cellValue && cellValue.length == 6) {
		var year = cellValue.substr(0, 4);
		var mon = cellValue.substr(4, 2);
		return (year + '/' + mon);
	}
	return (cellValue) ? cellValue : "";
};
//전화번호 포맷
mcGrid.formatPhoneNumber = function(cellValue, options, rowObject) 
{
	if (cellValue && cellValue.length >= 9) 
	{
		var reg = /(^02.{0}|^01.{1}|[0-9]{3})([0-9]+)([0-9]{4})/;
		cellValue += '';
		while (reg.test(cellValue)) 
		{
			cellValue = cellValue.replace(reg, '$1' + '-' + '$2' + '-' + '$3');
		}
		return cellValue;
	}
	return (cellValue) ? cellValue : "";
};
//핸드폰 포맷
mcGrid.formatHpNumber = function(cellValue, options, rowObject) 
{
	if (cellValue && cellValue.length >= 10) {
		var reg = /(^01.{1})([0-9]+)([0-9)]{4})/;
		cellValue += '';
		while (reg.test(cellValue)) {
			cellValue = cellValue.replace(reg, '$1' + '-' + '$2' + '-' + '$3');
		}
		return cellValue;
	}
	return (cellValue) ? cellValue : "";
};
//금액 포맷
mcGrid.formatAmt = function(cellValue, options, rowObject) 
{
	if (isNaN(cellValue)) 
	{
		return 0;
	} 
	else 
	{
		var reg = /(^[+-]?\d+)(\d{3})/;
		cellValue += '';
		while (reg.test(cellValue)) 
		{
			cellValue = cellValue.replace(reg, '$1' + ',' + '$2');
		}
		return cellValue;
	}
};
//우편번호 포맷
mcGrid.formatZipCode = function(cellValue, options, rowObject) 
{
	if (cellValue && cellValue.length >= 6) 
	{
		return (cellValue.substr(0, 3) + '-' + cellValue.substr(3, 3));
	}
	return (cellValue) ? cellValue : "";
};


