[![安装](https://img.shields.io/badge/安装-npm_i_@soei/time-ffc107?style=flat)](https://www.npmjs.com/package/@soei/time) [![Latest Version on NPM](https://img.shields.io/badge/✔-线上实例-ae8aff?style=flat)](https://alwbg.github.io)

# 时间工具类 [![Latest Version on NPM](https://img.shields.io/npm/v/@soei/time?label=npm&style=flat-square)](https://npmjs.com/package/@soei/time) [![Software License](https://img.shields.io/badge/license-ISC-brightgreen?label=&style=flat-square)](https://www.npmjs.com/package/@soei/time) [![npm](https://img.shields.io/npm/dw/@soei/time?label=Downloads&style=flat-square)](https://www.npmjs.com/package/@soei/time) [![npm bundle size](https://img.shields.io/bundlephobia/min/%40soei%2Ftime?label=Size&color=&style=flat-square)](https://www.npmjs.com/package/@soei/time)

### 2016-05-16(小棉袄生日 🎂)

[下面日历数据参考 (# t.days)](#days)

|                 一                  | 二  | 三  | 四  | 五  | 六  | 日  |
| :---------------------------------: | :-: | :-: | :-: | :-: | :-: | :-: |
|                 25                  | 26  | 27  | 28  | 29  | 30  |  1  |
|                  2                  |  3  |  4  |  5  |  6  |  7  |  8  |
|                  9                  | 10  | 11  | 12  | 13  | 14  | 15  |
| <span style="color:green">16</span> | 17  | 18  | 19  | 20  | 21  | 22  |
|                 23                  | 24  | 25  | 26  | 27  | 28  | 29  |
|                 30                  | 31  |  1  |  2  |  3  |  4  |  5  |

---

- [时间 { Time }](#time)
- [获取当前月天数 { getDayNumberByMonthAndYear }](#getDayNumberByMonthAndYear)
- [格式化输出 { fire }](#fire)
- [获取当前月的详情 { dates }](#dates)
- [获取当前月和相邻月补位的天数集合 { days }](#days)
- [返回指定日期的对象 { date }](#date)
- ...

---

# **Time**

## 更新日志

### 版本 1.1.1

- `T`.change(`obj<T>`, `mode<String>`) 方法

  ```javascript
  /**
   * 时间格式转换输出
   * - obj 为 T 类型
   * - mode 为字符串, obj.fire()生成的或者相似的时间字符串
   */
  T.change(obj<T>, mode<String>)

  let tmode = new Time("YYYYMMDD");
  let res = tmode.fire("2024-05-03");
  // 20240503

  let t = new Time("YYYY/M/D");
  t.change(tmode, res);
  // 2024/5/3

  t = new Time("YYYY*MM*DD");
  t.change(t, "2024/5/13");
  // 2024*05*13
  ```

### 版本 1.1.0

- 解决模版为`YYYYMMDD`时, 月份小于 10 时, 显示为`2024-9-3` => `202493`, 正确显示: `20240903`

  ```javascript
  let t = new Time("YYYYMMDD");
  t.fire("2024-05-03");
  // 20240503
  t = new Time("DD-YYYY-MM");
  t.fire("2024-05-03");
  // 03-2024-05
  t = new Time("YYYYMDD");
  t.fire("2024-05-03");
  // 2024503
  t = new Time("YYYY/M/D");
  t.fire("2024-05-03");
  // 2024/5/3
  ```

### 版本 1.0.17

- `t.days(-1)` 参数小于 `0` 时, 上月数据不能正常获取,导致整体显示异常

  ```javascript
  t.days(-1);
  /*
  [
    { day: '二', title: 'title' },
    { day: '三', title: 'title' },
    { day: '四', title: 'title' },
    { day: '五', title: 'title' },
    { day: '六', title: 'title' },
    { day: '日', title: 'title' },
    { day: '一', title: 'title' },
    ...
  ]
  */
  ```

### 版本 1.0.16

- `t.days(10)` 参数超出 `7` 时, 数据异常

  ```javascript
  t.days(10);
  /*
  [
  { day: '五', title: 'title' },
  { day: '六', title: 'title' },
  { day: '日', title: 'title' },
  { day: '一', title: 'title' },
  { day: '二', title: 'title' },
  { day: '三', title: 'title' },
  { day: '四', title: 'title' },
  ...
  ]
  */
  ```

### 版本 1.0.15

- 支持 `t.fire(Time实例对象)` 方法

  ```javascript
  let t2 = new Time("YYYY年DD日-MM月");
  // t2 : 2022年26日-01月

  t.fire(t2);
  // 按照 t 的设置的格式输出
  ```

### 版本 1.0.13

- 新增
  - _diff_ 方法 处理时间对象的年差
  ```javascript
    t.diff(T|String|JOSN{ year, month, day })
  ```

### 版本 1.0.11

- 解决 YYYY-MM-DD hh:MM:ss 时间格式 输出 YYYY-MM-DD 问题

### 版本 1.0.10

- #### 优化 T.date(Models String)

  - 两个对象之间的 Date 数据交换

  ```javascript
  var source = new Time("今年是YY年,从MM月开始,从DD日起,下午hh:mm下班");
  source.fire();
  // 今年是24年,从01月开始,从13日起,下午10:17下班

  source.date("今年是2024年,从05月开始,从11日起,下午16:10下班");
  // Date对象: 2024-05-11T08:10:00.000Z => 标准时间 +8区

  source.fire();
  // 今年是24年,从05月开始,从11日起,下午16:10下班

  var change = new Time("YYYY年-[DD](MM)hh*mm*ss分");
  change.fire(
    /* 返回一个Date对象, 该对象 */
    source.date(
      /* 返回指定数据模版 */
      source.fire(/* '2012-01-09' */)
    )
  );
  // 2024年-[11](05)16*10*00分

  /* date对象做参数 */
  change.fire(new Date());
  // 2024年-[14](01)11*18*27分

  /* 标准时间转本地时间, Date本身就支持 */
  change.fire("2024-05-11T08:10:00.000Z");
  // 2024年-[11](05)16*10*00分
  ```

### 日期对象 获取 与 实例化

```javascript
/* 版本 */
/* 版本1.0.8支持 */
// 1. 修复 dates()获取日期JSON问题
// 2. 新增 day方法

// 时间格式化输出
const stringmodule =
  "YYYY-MM-DD (子|丑|丑|寅|寅|卯|卯|辰|辰|巳|巳|午|午|未|未|申|申|酉|酉|戌|戌|亥|亥|子)时 24h:mm:ss";
const Time = require("@soei/time");
let t = new Time(stringmodule);
// 或
import Time from "@soei/time";

t = new Time(stringmodule);

"当前日期::", t.day();
// 当前日期:: 2023-12-18 子时 23:13:14

t.day(-1, true);
// { year: 2023, month: 12, day: 17 }

t.day(-1, true);
// { year: 2023, month: 12, day: 16 }

t.day(-1, true);
// { year: 2023, month: 12, day: 15 }

t.day(-1, true);
// { year: 2023, month: 12, day: 14 }

t.day(-1);
// 2023-12-13 子时 23:13:14

t.day(-1);
// 2023-12-12 子时 23:13:14

t.day(-1);
// 2023-12-11 子时 23:13:14

t.day(-1);
// 2023-12-10 子时 23:13:14

/* 版本1.0.7支持 */
// 修复 days 月份计算问题，导致获取天数为上月天数

/* 版本1.0.6支持 */
/**
 * - 支持 days 当前月多少天
 * - 支持 week 当前天星期几
 *   index 和 weeks 只能存在一个
 **/
let week = new Time("YYYY {week} （week） -week- 本月days天「week」", {
  weeks: "星期一,星期二,星期三,星期四,星期五,星期六,星期日",
  // index: 1/* 0中文（默认）1英文 2日文 3韩文 */
});

week.fire();
// 2023 {星期四} （星期四） -星期四- 本月30天「星期四」

// 时间格式化输出
const stringmodule =
  "YYYY-MM-DD (子|丑|丑|寅|寅|卯|卯|辰|辰|巳|巳|午|午|未|未|申|申|酉|酉|戌|戌|亥|亥|子)时 24h:mm:ss";
const Time = require("@soei/time");
let t = new Time(stringmodule);
// 或
import Time from "@soei/time";
/**
 * stringmodule配置说明
 * YYYY 年
 * MM  月
 * DD   日
 * hh mm ss
 * MM|hh|DD|mm|ss|YYYY|YY|ampm|24h|12h
 * (..|..|..)
 * 24小时平分
 **/
t = new Time(stringmodule);
```

## getDayNumberByMonthAndYear

### 获取当前月天数

```javascript
Time.getDayNumberByMonthAndYear(1, 2022);

// 31
```

## fire

### 格式化输出

```javascript
t.fire(+new Date());
// 输出: "2023-09-01 申时 15:33:55"

// 或
t.fire("2088-8-8 8:8:8");
// 或
t.fire("2088/8/8 8:8:8");
// 2088-08-08 辰时 08:08:08
```

## dates

### 获取当前月的详情

```javascript
// 当前月
t.dates(0);

// { year: 2023, month: 9, day: 1 }

// 下一月
t.dates(1);

// { year: 2023, month: 10, day: 1 }

// 上一月
t.dates(-1);

// { year: 2023, month: 8, day: 1 }
```

## days

### 获取 _当前月_ 和 _相邻月_ 补位的天数集合

```javascript
/**
 * 周一显示的的索引[周一的偏移量] 如果是 1 周日在第一位, 2,3,..同理
 * @param {Number} offsetByMonday
 * [
 * |一 | 二 | 三 | 四 | 五 | 六 | 日|           - 0 中文
 * ------------------------------
 * |Mon | Tue | Wed | Thu | Fri | Sat | Sun| - 1 英文
 * ------------------------------
 * |月 | 火 | 水 | 木 | 金 | 土 | 日|          - 2 日文
 * ]
 * ---------------------
 * @param {Number} title
 * 设置指定的年月日
 * {
 *     year: 2022,
 *     month: '10',
 *    day: '9'
 * }
 * @param {JSON} time
 * time未指定: 返回当前月且对应数据 cur == true
 * 指定日期: 返回指定月份
 * @returns
 **/
t.days(offsetByMonday, title, time);

// 获取当前月
t.days(0, 1);

// 获取指定月份的日期集合
t.days(0, 0, {
  year: 2023,
  month: "10",
  /* 指定选中日期 */
  day: "9",
});
/*
[
  { day: '一', title: 'title' },
  { day: '二', title: 'title' },
  { day: '三', title: 'title' },
  { day: '四', title: 'title' },
  { day: '五', title: 'title' },
  { day: '六', title: 'title' },
  { day: '日', title: 'title' },
  { day: 25, month: 9, year: 2023, title: 'prev' },
  ...
  { day: 30, month: 9, year: 2023, title: 'prev' },
  { day: 1, month: 10, year: 2023, title: 'current', cur: false },
  ...
  { day: 9, month: 10, year: 2023, title: 'current', cur: true },
  ...
  { day: 31, month: 10, year: 2023, title: 'current', cur: false },
  { day: 1, month: 11, year: 2023, title: 'next' },
  ...
  { day: 5, month: 11, year: 2023, title: 'next' }
]
*/
```

## date

### 返回指定日期的对象

```javascript
t.date("2022-10-20 10:20:30");

// 2022-10-20T02:20:30.000Z
// 这个是对象输出调用toString()后的结果
```
