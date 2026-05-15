# 牛客直播转换率

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
请你统计每个科目的转换率（sign_rate(%)，转化率=报名人数/浏览人数，结果保留两位小数）。
注：按照course_id升序排序。
course_id	course_name	sign_rate(%)
1	Python	50.00
2
	SQL	83.33
3	R	50.00
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
复制
输出：
1|Python|50.00
2|SQL|83.33
3|R|50.00
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
- `sign_rate`

## SQLite 说明
本关卡运行在浏览器内置 SQLite 环境中，原题的 MySQL 建表语句已转换为 SQLite 可执行语法。日期时间差可以使用 `julianday()`、`date()`、`strftime()` 等 SQLite 函数实现。

## 参考 SQL（MySQL 原题写法）
```sql
SELECT    cou.course_id, -- 课程ID，用于排序和分组    cou.course_name, -- 课程名称    -- 计算转化率：报名人数 / 浏览人数 * 100，保留两位小数    -- 处理浏览人数为0的情况：用NULLIF将分母转为NULL，除法结果为NULL时，IFNULL转为0        ROUND(SUM(beh.if_sign)/SUM(beh.if_vw )*100,2) AS sign_rate -- 别名不要包含特殊字符，如%，否则需用反引号（但题目要求输出%的话，可在最后拼接）FROM    course_tb cou    JOIN behavior_tb beh ON cou.course_id = beh.course_idGROUP BY    cou.course_id,    cou.course_name -- 同时按ID和名称分组（因ID唯一，名称也唯一）ORDER BY    cou.course_id;  -- 按课程ID升序排序
```
