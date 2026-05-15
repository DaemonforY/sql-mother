# 牛客直播开始时各直播间在线人数

## 题目
描述
牛客某页面推出了数据分析系列直播课程介绍。用户可以选择报名任意一场或多场直播课。
已知课程表course_tb如下（其中course_id代表课程编号，course_name表示课程名称，course_datetime代表上课时间）：
course_id	course_name	course_datetime
1	Python	2021-12-1 19:00-21:00
2	SQL	2021-12-2 19:00-21:00

3	R	2021-12-3 19:00-21:00

上课情况表attend_tb如下（其中user_id表示用户编号、course_id代表课程编号、in_datetime表示进入直播间的时间、out_datetime表示离开直播间的时间）：
user_id	course_id	in_datetime	out_datetime
100	1	2021-12-01 19:00:00
	2021-12-01 19:28:00

100	1	2021-12-01 19:30:00
	2021-12-01 19:53:00

101	1	2021-12-01 19:00:00
	2021-12-01 20:55:00

102	1	2021-12-01 19:00:00
	2021-12-01 19:05:00

104	1	2021-12-01 19:00:00
	2021-12-01 20:59:00

101	2	2021-12-02 19:05:00
	2021-12-02 20:58:00

102	2	2021-12-02 18:55:00
	2021-12-02 21:00:00

104	2	2021-12-02 18:57:00
	2021-12-02 20:56:00

107	2	2021-12-02 19:10:00
	2021-12-02 19:18:00

100	3	2021-12-03 19:01:00
	2021-12-03 21:00:00

102	3	2021-12-03 18:58:00
	2021-12-03 19:05:00

108	3	2021-12-03 19:01:00
	2021-12-03 19:56:00

请你统计直播开始时（19：00），各科目的在线人数，以上例子的输出结果为（按照course_id升序排序）：
course_id	course_name	online_num
1	Python	4
2
	SQL	2
3	R	1
示例1
输入：
CREATE TABLE course_tb(
course_id int(10) NOT NULL, 
course_name char(10) NOT NULL,
course_datetime char(30) NOT NULL);
INSERT INTO course_tb VALUES(1, 'Python', '2021-12-1 19:00-21:00');
INSERT INTO course_tb VALUES(2, 'SQL', '2021-12-2 19:00-21:00');
INSERT INTO course_tb VALUES(3, 'R', '2021-12-3 19:00-21:00');

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
1|Python|4
2|SQL|2
3|R|1
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
- `online_num`

## SQLite 说明
本关卡运行在浏览器内置 SQLite 环境中，原题的 MySQL 建表语句已转换为 SQLite 可执行语法。日期时间差可以使用 `julianday()`、`date()`、`strftime()` 等 SQLite 函数实现。

## 参考 SQL（MySQL 原题写法）
```sql
select course_id,
course_name,
count(case when time_format(in_datetime,'%H:%i')<='19:00' then 1 end) as online_num
from course_tb join attend_tb USING(course_id)
group by course_id,course_name
order by course_id
```
