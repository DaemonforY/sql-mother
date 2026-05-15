# 某宝店铺连续2天及以上购物的用户及其对应的天数

## 题目
描述
11月结束后，小牛同学需要对其在某宝的网店就11月份用户交易情况和产品情况进行分析以更好的经营小店。
11月份销售数据表sales_tb如下（其中，sales_date表示销售日期，user_id指用户编号，item_id指货号，sales_num表示销售数量，sales_price表示结算金额）：
sales_date	user_id	item_id	sales_num	sales_price
2021-11-01	1	A001	1	90
2021-11-01
	2	A002	2	220
2021-11-01
	2	B001	1	120
2021-11-02
	3	C001	2	500
2021-11-02
	4	B001	1	120
2021-11-03
	5	C001	1	240
2021-11-03
	6	C002	1	270
2021-11-04
	7	A003	1	180
2021-11-04
	8	B002	1	140
2021-11-04
	9	B001	1	125
2021-11-05
	10	B003	1	120
2021-11-05
	10	B004	1	150
2021-11-05
	10	A003	1	180
2021-11-06
	11	B003	1	120
2021-11-06
	10	B004	1	150
请你统计连续2天及以上在该店铺购物的用户及其对应的次数（若有多个用户，按user_id升序排序），以上例子的输出结果如下：
user_id	days_count
10	2


示例1
输入：
drop table if exists sales_tb;
CREATE TABLE sales_tb(
sales_date date NOT NULL,
user_id int(10) NOT NULL,
item_id char(10) NOT NULL,
sales_num int(10) NOT NULL,
sales_price int(10) NOT NULL
);

INSERT INTO sales_tb VALUES('2021-11-1', 1, 'A001',  1, 90);
INSERT INTO sales_tb VALUES('2021-11-1', 2, 'A002',  2, 220);
INSERT INTO sales_tb VALUES('2021-11-1', 2, 'B001',  1, 120);
INSERT INTO sales_tb VALUES('2021-11-2', 3, 'C001',  2, 500);
INSERT INTO sales_tb VALUES('2021-11-2', 4, 'B001',  1, 120);
INSERT INTO sales_tb VALUES('2021-11-3', 5, 'C001',  1, 240);
INSERT INTO sales_tb VALUES('2021-11-3', 6, 'C002',  1, 270);
INSERT INTO sales_tb VALUES('2021-11-4', 7, 'A003',  1, 180);
INSERT INTO sales_tb VALUES('2021-11-4', 8, 'B002',  1, 140);
INSERT INTO sales_tb VALUES('2021-11-4', 9, 'B001',  1, 125);
INSERT INTO sales_tb VALUES('2021-11-5', 10, 'B003',  1, 120);
INSERT INTO sales_tb VALUES('2021-11-5', 10, 'B004',  1, 150);
INSERT INTO sales_tb VALUES('2021-11-5', 10, 'A003',  1, 180);
INSERT INTO sales_tb VALUES('2021-11-6', 11, 'B003',  1, 120);
INSERT INTO sales_tb VALUES('2021-11-6', 10, 'B004',  1, 150);
复制
输出：
10|2
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
- `user_id`
- `days_count`

## SQLite 说明
本关卡运行在浏览器内置 SQLite 环境中，原题的 MySQL 建表语句已转换为 SQLite 可执行语法。日期时间差可以使用 `julianday()`、`date()`、`strftime()` 等 SQLite 函数实现。

## 参考 SQL（MySQL 原题写法）
```sql
with a as(
select *,row_number() over(partition by user_id order by sales_date) as rn
from (select distinct user_id,sales_date
from sales_tb) t
),b as(select*,date_sub(sales_date,interval rn DAY) as days_group
from a
),c as(
    select user_id,count(*)as cnt,days_group
    from b
    group by user_id,days_group
)
select user_id,cnt as days_count
from c
where cnt>=2
order by user_id
```
