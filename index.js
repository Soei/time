/**
 * 时间输出模版
 * @author alwbg@163.com | soei 
 *  ------------------------------------
 *  -  https://github.com/alwbg/time   -
 *  ------------------------------------
 * YYYY 年
 * MM  月
 * DD 	日
 * hh mm ss
 * MM|hh|DD|mm|ss|YYYY|YY|ampm|24h|12h
 * new Time( 'YY/mm/MM' ).fire()//输入当前时间
 * new Time( 'hh:mm:ss (凌晨|上午|下午|傍晚) YYYY/MM/DD' ).fire(1280207640000)//输入当前时间
 * 输出结果 > 13:14:00 下午 2010/07/27
 * new Time( '12h:mm:ss (凌晨|上午|下午|傍晚) YYYY/MM/DD' ).fire(1280207640000)//输入当前时间
 * 输出结果 > 01:14:00 下午 2010/07/27
 */
function run(O, name) {
	var args = Array.apply(null, arguments),
		fx;
	O = args.shift() || {};
	name = args.shift();
	fx = name instanceof Function ? name : O[name] || function () { };
	return fx.apply(O, args);
}
var SPACE = '';
var Nil;
var rMode = /(?:MM|hh|DD|M|D|mm|ss|YYYY|YY|ampm|24h|12h|week|days)/g;
//一周几天
var WEEK = 7;
//时间格式输出
function T(mode, args) {
	mode = mode || 'YYYY/MM/DD';
	args || (args = {});
	var week = args.weeks;
	if (week instanceof Array); else {
		if (typeof week == 'string'); else {
			week = Titles[(args.index >> 0) % Titles.length];
		}
		week = week.split(/\||,|;/);
	}
	this.$weeks = week;
	this.$date = new Date();
	this.remode(mode);
}
var FILTERATTR = { M: 1, MM: 2, YY: 1, YYYY: 4, DD: 2, D: 1 };
T.prototype.remode = function (mode) {
	if (this.mode == mode) return this;
	var ampmStr;
	if (this._r_ampm__.test(mode)) {
		var ampm = mode.match(this._r_ampm__);
		mode = mode.replace(this._r_ampm__, 'ampm');
		ampmStr = ((ampm && ampm[1]) || SPACE).split('|');
	} else {
		ampmStr = ['am', 'pm'];
	}
	this.mode = mode;
	this._ampm_list__ = ampmStr;
	this._mode_length__ = this._ampm_list__.length;
	this.M = mode.match(rMode) || [];
	var modechange = mode.replace(
		/* 处理特殊字符 */
		/([{}()\[\]\*\+\?\\])/g, '\\$1'
	).replace(rMode, function (k) {
		return '(\\d{' + (FILTERATTR[k] || '1,') + '})';
	});
	/* 生成验证表达式 */
	this.rMode = new RegExp(modechange);
	return this;
}
/**
 * 设置新时间
 * @param {Date} time Date时间对象
 */
T.prototype.setTime = function (time) {
	return this.$date.setTime(time), this.$date;
}
/**
 * 获取当前时间戳
 */
var now = Date.now || function () {
	return new Date;
}
/**
 * 获取时间划分范围
 * @type {RegExp}
 */
T.prototype._r_ampm__ = /\(([^\(\)|]+(?:\|[^\(\)|]+){1,})\)/;

/**
 * 获取两位年显示
 * @param  {Date} date 时间对象
 * @return {Number}    返回获取的时间
 */
T.prototype.getYearShow2 = function (date) {
	return date.getFullYear() % 100
}
/**
 * 获取时间显示格式为 12小时制
 * @param  {Date} date 时间对象
 * @return {Number}    返回12制的时间
 */
T.prototype.getHoursTo12 = function (date) {
	var hours = date.getHours();
	return hours > 12 ? hours % 12 : hours;
}
/**
 * 获取时间划分段
 * @param  {Date} date 时间对象
 * @return {String}    返回匹配到的时间段 ['am', 'pm'] 或者自定义的类型中的一种
 */
T.prototype.getAmOrPm = function (date) {
	var hours = date.getHours();
	return this._ampm_list__[Math.floor(hours * this._mode_length__ / 24)];
}
/**
 * 时间对象显示对应的方法名称
 * @type {Object}
 */
T.prototype.Map = {
	'getMonth': 1,

	'YY': 'getYearShow2',
	'YYYY': 'getFullYear',
	'MM': 'getMonth',
	'DD': 'getDate',
	'M': 'getMonth',
	'D': 'getDate',

	'hh': 'getHours',
	'mm': 'getMinutes',
	'ss': 'getSeconds',

	'24h': 'getHours',
	'12h': 'getHoursTo12',

	'ampm': 'getAmOrPm',
	'week': 'getWeek',
	'days': 'getDays'
}

var Index = { '24h': 'hh', '12h': 'hh', 'YY': 'YYYY' }
var ISOMODE = 'YYYY-MM-DD hh:mm:ss';

var iRank = [function (t) {
	return t
},
function (time) {
	return String.prototype.replace.call(time, /[\.-]/g, '/')
}];
function Json2Date(host, time) {
	if (time && (time.year || time.month || time.day)) {
		return host.date([time.year || 2016, time.month || '01', time.day || '01'].join('-'))
	}
}
var rSTRING_NUMBER = /^(?:(string)|number)$/;
T.prototype.getMonth = function () {
	return this.$date.getMonth() + 1;
}
T.prototype.getWeek = function () {
	return this.$weeks[(
		+this.$date.getDay()
		/* 
		对应内部日期数组索引
		getDay获取的是"星期天"索引为0 
		*/
		- 1
		+ WEEK
	) % WEEK];
}

/**
 * 时间格式转换输出
 * @param {T} Ti 时间模版对象
 * @param {String} timestr Ti描述的时间字符串, Ti.fire()或者相似的时间字符串
 * @returns 
 */
T.prototype.change = function (Ti, timestr) {
	return Ti instanceof T
		? this.fire(
			Ti.date(
				/* 返回指定数据模版 */
				Ti.fire(timestr)
			)
		)
		: Nil;
}
var MT;
/**
 * 获取年份差
 * @param {T|String|JSON} _time 
 * @returns 
 */
T.prototype.diff = function (_time) {
	MT || (MT = new T(ISOMODE));
	var N = this.dates();
	var Y;
	if (_time instanceof T) {
		Y = _time;
	} else {
		MT.fire(_time);
	}
	Y = MT.dates();
	var y = N.year - Y.year - 1;
	var offMonth = +(N.month - +Y.month);
	y += (offMonth == 0 ? +(N.day - +Y.day >= 0) : +(offMonth > 0));
	return y;
}
var ONEDAY = 24 * 60 * 60 * 1000;
/**
 * 获取偏移量对应的日期信息
 * @param {Boolean|Number} offsetday eg. -10 0 10
 * @param {Boolean} tojson 是否返回JSON格式 true 或者 返回模版定义
 * @returns 
 */
T.prototype.day = function (offsetday, tojson) {
	/* 获取偏移天数毫秒 */
	var millisecond = +this.$date + ONEDAY * (offsetday >> 0);
	return offsetday === true || tojson === true
		?
		(
			/* 设置记录当前时间 */
			this.date(millisecond),
			/* 返回JSON格式{年, 月, 日} */
			this.dates()
		) :
		/* 字符串化 */
		this.fire(millisecond);
}
T.prototype.getDays = function () {
	return getDayNumberByMonthAndYear(this.getMonth(), this.get('YYYY'));
}
/* 特殊处理 */
var filterBack = {
	YY(data) {
		return 4 - data.length ? 2000 + +data : data;
	}
}
/**
 * 获取时间对象
 * @param  {Number} time 时间
 * @return {Date}        返回设置后的时间对象
 */
T.prototype.date = function (time) {
	var picker;
	/* 判断是否为T对象 */
	if (time instanceof T) { time = time.$date }
	else if (picker = Json2Date(this, time)) return picker;
	/* 判断是否为Date对象 */
	time instanceof Date && (time = +time);
	picker = (typeof time).match(rSTRING_NUMBER) || { length: 0 };
	if (!picker.length) time = now();
	/* 判断是否为字符串参数 */
	else if (picker[1]) {
		var iRet, iDate;
		// 处理自定义模版,用于还原Date数据
		if (this.rMode.test(time)) {
			var date = time.match(this.rMode), da,
				M = this.M, mode = ISOMODE, i = 0, data,
				rank = { YYYY: 2016, MM: Nil, DD: Nil, hh: Nil, mm: Nil, ss: Nil };
			/* 处理已有的数据 */
			for (; (da = M[i]) && (data = date[i + 1] || this.get(da)); i++) {
				mode = mode.replace(Index[da] || da, run(filterBack, da, data) || data);
				delete rank[da];
			}
			/* 补充缺失字段 */
			for (i in rank) mode = mode.replace(i, rank[i] || '00');
			time = +new Date(mode);
		} else {
			for (var i = 0, length = iRank.length; i < length; i++) {
				if (iRet = !isNaN(+(iDate = new Date(iRank[i](time))))) {
					time = iDate;
					break;
				}
			}
			if (!iRet) {
				time = new Date();
			}
		}
	}
	return this.setTime(time);
}
T.prototype.get = function (key) {
	var fxName = this.Map[key];
	return (fxName in this ? this : this.$date)[fxName]();
}
/**
 * 执行要显示的函数
 * @param  {Number} time 时间戳
 * @return {String}      时间格式化后的字符串
 */
T.prototype.fire = function (time) {
	var format = this.mode,
		L = this.M,
		key, _date = time == Nil ? this.$date : this.date(time),
		isOwn;
	var M = this.Map, mln, ms, v;
	for (var i = 0, len = L.length; i < len; i++) {
		key = M[ms = L[i]];
		isOwn = key in this;
		mln = ms.length;
		v = run(isOwn ? this : _date, key, _date) + (isOwn ? SPACE : M[key] || 0)
		format = format.replace(
			ms,
			mln == 2 ? this.lt10(v) : v
		);
	}
	return format;
}
/**
 * 匹配小于两位显示为两位
 * @param  {String} val 要显示的数值
 * @return {String}     输出显示的值
 */
T.prototype.lt10 = function (val) {
	return (val + SPACE).replace(/(?:(\D)|^)(\d)(?!\d)/g, '$10$2');
}

/**
 * ### 获取当前月的实际天数
 * @Time   2019-09-27
 * @param  {Number}   month 月份从1开始
 * @param  {Number}   year  年
 * @return {Number}         
 */
function getDayNumberByMonthAndYear(month, year) {
	var offset = (
		// 月份大于6的偶数
		month > 6 && month % 2 == 0
	) ||
		(
			// 月份小于8的奇数
			month < 8 && month % 2 != 0
		) ||
		(
			// 月份为2,如果是闰年 该值 为 1 - 2 非 0 - 2
			month == 2 && (
				// 计算闰年
				(
					year % 4 == 0 && (year % 100 != 0 || year % 400 == 0)
				) -
				2
			)
		)
	return offset + 30;
}
var MONTH = 12;
var Titles = ['一|二|三|四|五|六|日', 'Mon|Tue|Wed|Thu|Fri|Sat|Sun', '月|火|水|木|金|土|日', '월요일|화요일|수요일|목요일|금요일|토요일|일요일'];

function DJson(data) {
	this.data = data instanceof Array ? data : [];
}
DJson.prototype.append = function (day, month, year, title, cur) {
	var date = {
		day: day
	};
	month != Nil && (date.month = month);
	year != Nil && (date.year = year);

	title != Nil && (date.title = title);
	cur != Nil && (date.cur = cur);
	return this.data.push(date);
}
T.getDayNumberByMonthAndYear = getDayNumberByMonthAndYear;
T.prototype.dates = function (offset) {
	var year = this.get('YYYY');
	var month = this.getMonth() + (offset >> 0);
	var day = this.get('DD');
	var toRi = +(month > MONTH);
	var toLe = +(month < 1) * MONTH;
	year = year + +!!toLe * -1 + toRi;
	month = month % (MONTH + 1) + toLe + toRi;
	var date = {
		year: year,
		month: month,
		day: Math.min(day, getDayNumberByMonthAndYear(month, year))
	};
	return date;
}

/**
 * _周一显示的的索引[周一的偏移量]_
 * ***
 * 如果是 1 周日在第一位, 2,3,..同理
 * @param {Number} offsetByMonday 
 * [
 * ***
 * | 一 | 二 | 三 | 四 | 五 | 六 | 日 |            0 中文 
 * ***
 * | Mon | Tue | Wed | Thu | Fri | Sat | Sun |  1 英文 
 * ***
 * | 月 | 火 | 水 | 木 | 金 | 土 | 日 |           2 日文 
 * ***
 * ]
 * ***
 * @param {Number} title 
 * 设置指定的年月日
 * {
 *     year: 2022,
 *     month: '10',
 *    day: '9'
 * }
 * @param {JSON} time 
 * time为指定, 返回当前月, 选中当前日
 * 指定日期,返回指定月份
 * @returns 
 **/
T.prototype.days = function (offsetByMonday, title, time) {
	var date = Json2Date(this, time) || this.$date || new Date;
	var year = date.getFullYear(),
		month = date.getMonth() + 1,
		cur = date.getDate(),
		week = date.getDay();
	var nil;
	// 周一显示的偏移量
	offsetByMonday >> 0 || (offsetByMonday = 0);
	offsetByMonday %= WEEK;
	// 计算周一
	var monday = (week - (cur - 1) /* % WEEK + WEEK*/) % WEEK;

	// 当前月第一天显示的偏移量
	var offset = (monday + offsetByMonday + WEEK - 1) % WEEK;
	/* 解决offsetByMonday为负数,导致offset为负数的情况 */
	offset = (offset + WEEK) % WEEK;
	// 计算当前月份天数
	var dayNumber = getDayNumberByMonthAndYear(month, year);
	// 星期的标题显示
	var weeks = (Titles[title >> 0] || Titles[0]).split('|');

	var DJ = new DJson();
	// 设置日期标题
	for (var weekTitleIndex = 0; weekTitleIndex < WEEK; weekTitleIndex++) {
		DJ.append(weeks[(weekTitleIndex - offsetByMonday + WEEK) % WEEK], nil, nil, 'title');
	}
	// 设置上月日期
	if (offset) {
		var prevYear = year - +!(month - 1);
		var prevMonth = month - 1 || 12;
		var _dayNumber = getDayNumberByMonthAndYear(prevMonth, prevYear)
		for (var i = offset; i-- > 0;) {
			DJ.append(_dayNumber - i, prevMonth, prevYear, 'prev');
		}
	}
	var len, eq;
	for (var day = 1; day <= dayNumber; day++) {
		len = DJ.append(day, month, year, 'current', eq = cur == day);
		eq && (DJ.data.cur = len - 1);
	}
	var next;
	var next = (dayNumber + offset) % WEEK;
	if (next) {
		year = year + +(month /* + 1 */ >= 12);
		month = (month + 1) % 12 || 12;
		for (var nextIndex = 1, length = WEEK - next; nextIndex <= length; nextIndex++) {
			DJ.append(nextIndex, month, year, 'next')
		}
	}
	return DJ.data;
}

module.exports = T;

// export default T;