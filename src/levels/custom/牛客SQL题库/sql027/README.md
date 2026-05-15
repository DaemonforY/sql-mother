# 某宝店铺折扣率

## 题目
描述
11月结束后，小牛同学需要对其在某宝的网店就11月份用户交易情况和产品情况进行分析以更好的经营小店。
已知产品情况表product_tb如下（其中，item_id指某款号的具体货号，style_id指款号，tag_price表示标签价格，inventory指库存量）：
item_id	style_id	tag_price	inventory
A001	A	100	20
A002	A	120	30
A003	A	200	15
B001	B	130	18
B002	B	150	22
B003	B	125	10
B004	B	155	12
C001	C	260	25
C002	C	280	18
11月份销售数据表sales_tb如下（其中，sales_date表示销售日期，user_id指用户编号，item_id指货号，sales_num表示销售数量，sales_price表示结算金额）：
sales_date	user_id	item_id	sales_num	sales_price
2021-11-01	1	A001	1	90
2021-11-01
	2	A002
	2	220
2021-11-01
	2	B001
	1	120
2021-11-02
	3	C001	2	500
2021-11-02
	4	B001
	1	120
2021-11-03
	5	C001
	1	240
2021-11-03
	6	C002
	1	270
2021-11-04
	7	A003
	1	180
2021-11-04
	8	B002
	1	140
2021-11-04
	9	B001
	1	125
2021-11-05
	10	B003
	1	120
2021-11-05
	10	B004
	1	150
2021-11-05
	10	A003
	1	180
2021-11-06
	11	B003
	1	120
2021-11-06
	10	B004
	1	150
请你统计折扣率（GMV/吊牌金额，GMV指的是成交金额），以上例子的输出结果如下（折扣率保留两位小数）：
discount_rate(%)
93.97


示例1
输入：
drop table if exists product_tb;
CREATE TABLE product_tb(
item_id char(10) NOT NULL,
style_id char(10) NOT NULL,
tag_price int(10) NOT NULL,
inventory int(10) NOT NULL
);
INSERT INTO product_tb VALUES('A001', 'A', 100,  20);
INSERT INTO product_tb VALUES('A002', 'A', 120, 30);
INSERT INTO product_tb VALUES('A003', 'A', 200,  15);
INSERT INTO product_tb VALUES('B001', 'B', 130, 18);
INSERT INTO product_tb VALUES('B002', 'B', 150,  22);
INSERT INTO product_tb VALUES('B003', 'B', 125, 10);
INSERT INTO product_tb VALUES('B004', 'B', 155,  12);
INSERT INTO product_tb VALUES('C001', 'C', 260, 25);
INSERT INTO product_tb VALUES('C002', 'C', 280,  18);

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
93.97
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
- `discount_rate(%)`

## SQLite 说明
本关卡运行在浏览器内置 SQLite 环境中，原题的 MySQL 建表语句已转换为 SQLite 可执行语法。日期时间差可以使用 `julianday()`、`date()`、`strftime()` 等 SQLite 函数实现。

## 参考 SQL（MySQL 原题写法）
```sql
select round(100*sum(sales_price)/sum(tag_price*sales_num),2) as'discount_rate(%)'
from product_tb JOIN sales_tb USING(item_id)
```
