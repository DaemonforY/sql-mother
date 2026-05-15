# 某乎问答单日回答问题数大于等于3个的所有用户

## 题目
描述
现有某乎问答创作者回答情况表answer_tb如下（其中answer_date表示创作日期、author_id指创作者编号、issue_id指回答问题编号、char_len表示回答字数）：
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
请你统计11月份单日回答问题数大于等于3个的所有用户信息（author_date表示回答日期、author_id表示创作者id，answer_cnt表示回答问题个数），以上例子的输出结果如下：
answer_date	author_id	answer_cnt
2021-11-02	110	3
注：若有多条数据符合条件，按answer_date、author_id升序排序。


示例1
输入：
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
2021-11-02|110|3
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
- `answer_date`
- `author_id`
- `answer_cnt`

## SQLite 说明
本关卡运行在浏览器内置 SQLite 环境中，原题的 MySQL 建表语句已转换为 SQLite 可执行语法。日期时间差可以使用 `julianday()`、`date()`、`strftime()` 等 SQLite 函数实现。

## 参考 SQL（MySQL 原题写法）
```sql
select answer_date,
author_id,
count(*) answer_cnt
from answer_tb
where answer_date like '2021-11-%'
group by answer_date,author_id
having count(*) >= 3
order by answer_date,author_id
```
