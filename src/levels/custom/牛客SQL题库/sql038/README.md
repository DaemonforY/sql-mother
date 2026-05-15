# 某乎问答回答过教育类问题的用户里有多少用户回答过职场类问题

## 题目
描述
现有某乎问答题目信息表issue_tb如下（其中issue_id代表问题编号，issue_type表示问题类型）：
issue_id	issue_type
E001	Education
E002	Education

E003	Education

C001	Career

C002	Career
C003	Career

C004	Career

P001	Psychology
P002	Psychology

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
请你统计回答过教育类问题的用户里有多少用户回答过职场类问题，以上例子的输出结果如下：
num
1


示例1
输入：
drop table if exists issue_tb;
CREATE TABLE issue_tb(
issue_id char(10) NOT NULL, 
issue_type char(10) NOT NULL);
INSERT INTO issue_tb VALUES('E001' ,'Education');
INSERT INTO issue_tb VALUES('E002' ,'Education');
INSERT INTO issue_tb VALUES('E003' ,'Education');
INSERT INTO issue_tb VALUES('C001', 'Career');
INSERT INTO issue_tb VALUES('C002', 'Career');
INSERT INTO issue_tb VALUES('C003', 'Career');
INSERT INTO issue_tb VALUES('C004', 'Career');
INSERT INTO issue_tb VALUES('P001' ,'Psychology');
INSERT INTO issue_tb VALUES('P002' ,'Psychology');

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
1
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
- `num`

## SQLite 说明
本关卡运行在浏览器内置 SQLite 环境中，原题的 MySQL 建表语句已转换为 SQLite 可执行语法。日期时间差可以使用 `julianday()`、`date()`、`strftime()` 等 SQLite 函数实现。

## 参考 SQL（MySQL 原题写法）
```sql
select
    count(distinct author_id) as num
from
    answer_tb
    join issue_tb using (issue_id)
where
    issue_type = 'Career'
    and author_id in (
        #统计回答过教育类问题的用户
        select distinct
            author_id
        from
            answer_tb
            join issue_tb using (issue_id)
        where
            issue_type = 'Education'
    )
```
