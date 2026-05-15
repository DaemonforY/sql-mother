# 某乎问答最大连续回答问题天数大于等于3天的用户及其对应等级

## 题目
描述
现有某乎问答创作者信息表author_tb如下(其中author_id表示创作者编号、author_level表示创作者级别，共1-6六个级别、sex表示创作者性别)：
author_id	author_level	sex
101	6	m
102	1	f
103	1	m
104	3	m
105	4	f
106	2	f
107	2	m
108	5	f
109	6	f
110	5	m
创作者回答情况表answer_tb如下（其中answer_date表示创作日期、author_id指创作者编号、issue_id指回答问题编号、char_len表示回答字数）：

answer_date	author_id	issue_id	char_len
2021-11-01	101	E001	150
2021-11-01
	101	E002	200
2021-11-01
	102	C003	50
2021-11-01
	103	P001	35
2021-11-01
	104	C003	120
2021-11-01
	105	P001	125
2021-11-01
	102	P002	105
2021-11-02
	101	P001	201
2021-11-02
	110	C002	200
2021-11-02
	110	C001	225
2021-11-02
	110	C002	220
2021-11-03
	101	C002	180
2021-11-04
	109	E003	130
2021-11-04
	109	E001	123
2021-11-05
	108	C001	160
2021-11-05
	108	C002	120
2021-11-05
	110	P001	180
2021-11-05
	106	P002	45
2021-11-05
	107	E003	56
请你统计最大连续回答问题的天数大于等于3天的用户及其等级（若有多条符合条件的数据，按author_id升序排序），以上例子的输出结果如下：
author_id	author_level
	days_cnt
101	6	3
示例1
输入：
drop table if exists author_tb;
CREATE TABLE author_tb(
author_id int(10) NOT NULL, 
author_level int(10) NOT NULL,
sex char(10) NOT NULL);
INSERT INTO author_tb VALUES(101 , 6, 'm');
INSERT INTO author_tb VALUES(102 , 1, 'f');
INSERT INTO author_tb VALUES(103 , 1, 'm');
INSERT INTO author_tb VALUES(104 , 3, 'm');
INSERT INTO author_tb VALUES(105 , 4, 'f');
INSERT INTO author_tb VALUES(106 , 2, 'f');
INSERT INTO author_tb VALUES(107 , 2, 'm');
INSERT INTO author_tb VALUES(108 , 5, 'f');
INSERT INTO author_tb VALUES(109 , 6, 'f');
INSERT INTO author_tb VALUES(110 , 5, 'm');

drop table if exists answer_tb;
CREATE TABLE answer_tb(
answer_date date NOT NULL, 
author_id int(10) NOT NULL,
issue_id char(10) NOT NULL,
char_len int(10) NOT NULL);
INSERT INTO answer_tb VALUES('2021-11-1', 101, 'E001' ,150);
INSERT INTO answer_tb VALUES('2021-11-1', 101, 'E002', 200);
INSERT INTO answer_tb VALUES('2021-11-1',102, 'C003' ,50);
INSERT INTO answer_tb VALUES('2021-11-1' ,103, 'P001', 35);
INSERT INTO answer_tb VALUES('2021-11-1', 104, 'C003', 120);
INSERT INTO answer_tb VALUES('2021-11-1' ,105, 'P001', 125);
INSERT INTO answer_tb VALUES('2021-11-1' , 102, 'P002', 105);
INSERT INTO answer_tb VALUES('2021-11-2',  101, 'P001' ,201);
INSERT INTO answer_tb VALUES('2021-11-2',  110, 'C002', 200);
INSERT INTO answer_tb VALUES('2021-11-2',  110, 'C001', 225);
INSERT INTO answer_tb VALUES('2021-11-2' , 110, 'C002', 220);
INSERT INTO answer_tb VALUES('2021-11-3', 101, 'C002', 180);
INSERT INTO answer_tb VALUES('2021-11-4' ,109, 'E003', 130);
INSERT INTO answer_tb VALUES('2021-11-4', 109, 'E001',123);
INSERT INTO answer_tb VALUES('2021-11-5', 108, 'C001',160);
INSERT INTO answer_tb VALUES('2021-11-5', 108, 'C002', 120);
INSERT INTO answer_tb VALUES('2021-11-5', 110, 'P001', 180);
INSERT INTO answer_tb VALUES('2021-11-5' , 106, 'P002' , 45);
INSERT INTO answer_tb VALUES('2021-11-5' , 107, 'E003', 56);
复制
输出：
101|6|3
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
- `author_id`
- `author_level`
- `days_cnt`

## SQLite 说明
本关卡运行在浏览器内置 SQLite 环境中，原题的 MySQL 建表语句已转换为 SQLite 可执行语法。日期时间差可以使用 `julianday()`、`date()`、`strftime()` 等 SQLite 函数实现。

## 参考 SQL（MySQL 原题写法）
```sql
with temp1 as(
    select *,
    DENSE_RANK() OVER (PARTITION BY author_id order by answer_date) as cont
    from answer_tb
),temp2 as(
    select answer_date,
    author_id,
    date_sub(answer_date,interval cont day) as dt
    from temp1
)
select distinct author_id,
author_level,
days_cnt
from (
    select author_id,
    count(distinct answer_date) as days_cnt
    from temp2
    group by author_id,dt
    having days_cnt >= 3
) t1 left join author_tb t2 using(author_id)
order by author_id
```
