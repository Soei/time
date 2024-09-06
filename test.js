let Time = require('./index');
let { each } = require('@soei/tools')
let t = new Time(":::DD YYYY-MM(子|丑|丑|寅|寅|卯|卯|辰|辰|巳|巳|午|午|未|未|申|申|酉|酉|戌|戌|亥|亥|子)时 24h:mm:ss 周week");

/* console.log(t.fire(+new Date()))
console.log(t.fire('2088/08/08 08:08:08'))
// t.setTime('2022-10-20')
console.log(t.dates(3))

// console.log(t.date({
//     year: 2016,
//     month: '5',
//     day: '16'
// }))
// console.log(t.days(0, 0, {
//     year: 2016,
//     month: '5',
//     day: '16'
// }))
console.log(Time.getDayNumberByMonthAndYear(1, 2022))

// console.log(t.date('2022-10-20 10:20:30'))

console.log('---------------------')
// 版本1.0.6支持 
let week = new Time("YYYY {week} （week） -week- 本月days天「week」", {
    // weeks: '星期一,星期二,星期三,星期四,星期五,星期六,星期日'
    // index: 1 //0中文（默认）1英文 2日文 3韩文
});

console.log(week.fire())
console.log(week.fire('2023-12-03'))
console.log(week.get('MM'))
console.log(week.dates())
// console.log(week.days())

console.log('当前日期::', t.day())
console.log(t.day(-1, true))
console.log(t.day(-1, true))
console.log(t.day(-1, true))
console.log(t.day(-1, true))
console.log(t.day(-1))
console.log(t.day(-1))
console.log(t.day(-1))
console.log(t.day(-1))
console.log(t.day())
console.log(t.rMode)
console.log(t.date(t.fire()))
var change = new Time('YYYY年-mm分');
var changedate = change.fire(t.date('08 2088-08辰时 08:08:08   周日'));
console.log(source.rMode)
console.log(changedate) 
*/

// var source = new Time('今年是YY年,从MM月开始,从DD日起,下午hh:mm下班(am|pm)');
// console.log(source.fire())
// console.log(source.$date.getTimezoneOffset() / 60)
// let date = source.date('今年是2024年,从05月开始,从11日起,下午16:10下班')

// console.log(date)
// console.log(source.fire())
// var change = new Time('YYYY年-[DD](MM)hh*mm*ss分');
// /* 返回一个Date对象, 该对象 */
// console.log(source.date(
//     /* 返回指定数据模版 */
//     source.fire('2012-01-09')
// ), source.fire('2012-01-09'))
// var changedate = change.fire(source);
// console.log(changedate, ':::')

// console.log(change.fire(new Date))
// console.log(change.fire('2024-05-11T08:10:00.000Z'))

// console.log(change.diff('2026-06-11'))
// console.log(change.diff('2026-06-11', 'day'))
// console.log(change.diff('2026-06-11', 'month'))
// console.log(change.days(10))

// //^[1-9]\d{7}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}$
// //^[1-9]\d{5}(18|19|20)?\d{2}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}[\dXx]$


// console.log(change.days(10))
// t.fire('2024-04-13')
// let data = t.days('-1')
// data.length = 14
// console.log(data)
let lin = new Time('YYYYMMDD')
let timestr = lin.fire('2024-04-03')
console.log(timestr)
let lins = new Time('D-YY-M')
console.log(lins.change(lin, timestr))

let tmode = new Time("YYYYMMDD");
let res = tmode.fire("2024-05-09");
// 20240503 
t = new Time('YYYY/M/D')
console.log(t.change(tmode, res));
// 2024/5/3
t = new Time('YYYY*MM*DD')
console.log(t.change(tmode, '2024/5/13'));
// 2024*05*13