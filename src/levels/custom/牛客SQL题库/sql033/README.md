# 牛客直播各科目出勤率

## 题目
描述
牛客某页面推出了数据分析系列直播课程介绍。用户可以选择报名任意一场或多场直播课。
已知课程表course_tb如下（其中course_id代表课程编号，course_name表示课程名称，course_datetime代表上课时间）：
course_id	course_name	course_datetime
1	Python	2021-12-1 19:00-21:00
2	SQL	2021-12-2 19:00-21:00

3	R	2021-12-3 19:00-21:00

用户行为表behavior_tb如下（其中user_id表示用户编号、if_vw表示是否浏览、if_fav表示是否收藏、if_sign表示是否报名、course_id代表课程编号）：
user_id	if_vw	if_fav	if_sign	course_id
100	1	1	1	1
100	1	1	1	2
100	1	1	1	3
101	1	1	1	1
101	1	1	1	2
101	1	0	0	3
102	1	1	1	1
102	1	1	1	2
102	1	1	1	3
103	1	1	0	1
103	1	0	0	2
103	1	0	0	3
104	1	1	1	1
104	1	1	1	2
104	1	1	0	3
105	1	0	0	1
106	1	0	0	1
107	1	0	0	1
107	1	1	1	2
108	1	1	1	3
上课情况表attend_tb如下（其中user_id表示用户编号、course_id代表课程编号、in_datetime表示进入直播间的时间、out_datetime表示离开直播间的时间）：
user_id	course_id	in_datetime	out_datetime

100	1	2021-12-01  19:00:00	2021-12-01  19:28:00

100
	1	2021-12-01  19:30:00
	2021-12-01  19:53:00

101
	1	2021-12-01  19:00:00
	2021-12-01  20:55:00

102
	1	2021-12-01  19:00:00
	2021-12-01  19:05:00

104
	1	2021-12-01  19:00:00
	2021-12-01  20:59:00

101
	2	2021-12-02  19:05:00
	2021-12-02  20:58:00

102
	2	2021-12-02  18:55:00
	2021-12-02  21:00:00

104
	2	2021-12-02  18:57:00
	2021-12-02  20:56:00

107
	2	2021-12-02  19:10:00
	2021-12-02  19:18:00

100	3	2021-12-03  19:01:00
	2021-12-03  21:00:00

102	3	2021-12-03  18:58:00
	2021-12-03  19:05:00

108	3	2021-12-03  19:01:00
	2021-12-03  19:56:00

请你统计每个科目的出勤率（attend_rate(%)，结果保留两位小数），出勤率=出勤（在线时长10分钟及以上）人数 / 报名人数，输出结果按course_id升序排序，以上数据的输出结果如下：
course_id	course_name	attend_rate(%)
1	Python	75.00
2	SQL	60.00
3	R	66.67
示例1
输入：
drop table if exists course_tb;
CREATE TABLE course_tb(
course_id int(10) NOT NULL, 
course_name char(10) NOT NULL,
course_datetime char(30) NOT NULL);

INSERT INTO course_tb VALUES(1, 'Python', '2021-12-1 19:00-21:00');
INSERT INTO course_tb VALUES(2, 'SQL', '2021-12-2 19:00-21:00');
INSERT INTO course_tb VALUES(3, 'R', '2021-12-3 19:00-21:00');

drop table if exists behavior_tb;
CREATE TABLE behavior_tb(
user_id int(10) NOT NULL, 
if_vw int(10) NOT NULL,
if_fav int(10) NOT NULL,
if_sign int(10) NOT NULL,
course_id int(10) NOT NULL);

INSERT INTO behavior_tb VALUES(100, 1, 1, 1, 1);
INSERT INTO behavior_tb VALUES(100, 1, 1, 1, 2);
INSERT INTO behavior_tb VALUES(100, 1, 1, 1, 3);
INSERT INTO behavior_tb VALUES(101, 1, 1, 1, 1);
INSERT INTO behavior_tb VALUES(101, 1, 1, 1, 2);
INSERT INTO behavior_tb VALUES(101, 1, 0, 0, 3);
INSERT INTO behavior_tb VALUES(102, 1, 1, 1, 1);
INSERT INTO behavior_tb VALUES(102, 1, 1, 1, 2);
INSERT INTO behavior_tb VALUES(102, 1, 1, 1, 3);
INSERT INTO behavior_tb VALUES(103, 1, 1, 0, 1);
INSERT INTO behavior_tb VALUES(103, 1, 0, 0, 2);
INSERT INTO behavior_tb VALUES(103, 1, 0, 0, 3);
INSERT INTO behavior_tb VALUES(104, 1, 1, 1, 1);
INSERT INTO behavior_tb VALUES(104, 1, 1, 1, 2);
INSERT INTO behavior_tb VALUES(104, 1, 1, 0, 3);
INSERT INTO behavior_tb VALUES(105, 1, 0, 0, 1);
INSERT INTO behavior_tb VALUES(106, 1, 0, 0, 1);
INSERT INTO behavior_tb VALUES(107, 1, 0, 0, 1);
INSERT INTO behavior_tb VALUES(107, 1, 1, 1, 2);
INSERT INTO behavior_tb VALUES(108, 1, 1, 1, 3);

drop table if exists attend_tb;
CREATE TABLE attend_tb(
user_id int(10) NOT NULL, 
course_id int(10) NOT NULL,
in_datetime datetime NOT NULL,
out_datetime datetime NOT NULL
);
INSERT INTO attend_tb VALUES(100, 1, '2021-12-1 19:00:00', '2021-12-1 19:28:00');
INSERT INTO attend_tb VALUES(100, 1, '2021-12-1 19:30:00', '2021-12-1 19:53:00');
INSERT INTO attend_tb VALUES(101, 1, '2021-12-1 19:00:00', '2021-12-1 20:55:00');
INSERT INTO attend_tb VALUES(102, 1, '2021-12-1 19:00:00', '2021-12-1 19:05:00');
INSERT INTO attend_tb VALUES(104, 1, '2021-12-1 19:00:00', '2021-12-1 20:59:00');
INSERT INTO attend_tb VALUES(101, 2, '2021-12-2 19:05:00', '2021-12-2 20:58:00');
INSERT INTO attend_tb VALUES(102, 2, '2021-12-2 18:55:00', '2021-12-2 21:00:00');
INSERT INTO attend_tb VALUES(104, 2, '2021-12-2 18:57:00', '2021-12-2 20:56:00');
INSERT INTO attend_tb VALUES(107, 2, '2021-12-2 19:10:00', '2021-12-2 19:18:00');
INSERT INTO attend_tb VALUES(100, 3, '2021-12-3 19:01:00', '2021-12-3 21:00:00');
INSERT INTO attend_tb VALUES(102, 3, '2021-12-3 18:58:00', '2021-12-3 19:05:00');
INSERT INTO attend_tb VALUES(108, 3, '2021-12-3 19:01:00', '2021-12-3 19:56:00');
复制
输出：
1|Python|75.00
2|SQL|60.00
3|R|66.67
复制
TOP
SQL 编程
是否格式化代码？
否(5)
是
1
执行结果
自测输入
提交记录
自测运行
保存并提交

## 输出字段
- `course_id`
- `course_name`
- `attend_rate`

## SQLite 说明
本关卡运行在浏览器内置 SQLite 环境中，原题的 MySQL 建表语句已转换为 SQLite 可执行语法。日期时间差可以使用 `julianday()`、`date()`、`strftime()` 等 SQLite 函数实现。

## 参考 SQL（MySQL 原题写法）
```sql
with temp1 as(  select course_id,  sum(if_sign) as total_numbers  from behavior_tb  group by course_id ),temp2 as ( select course_id,user_id, sum(timestampdiff(second,if(time_format(in_datetime,'%H')<19,concat(date(in_datetime),' ','19:00:00'),in_datetime) ,out_datetime)/60) as total_user_minutes from attend_tb group by course_id,user_id having total_user_minutes>=10) select course_id,course_name, round(count(user_id)/total_numbers*100,2) as'attend_rate(%)'from course_tb JOIN temp1 USING(course_id) JOIN temp2 USING(course_id) group by course_id,course_name order by course_id
```
