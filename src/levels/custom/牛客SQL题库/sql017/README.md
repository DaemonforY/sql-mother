# 10月的新户客单价和获客成本

## 题目
描述

商品信息表tb_product_info

id	product_id
	shop_id	tag	in_price	quantity	release_time
1	8001	901	日用	60	1000	2020-01-01 10:00:00
2	8002	901	零食	140	500	2020-01-01 10:00:00

3	8003	901	零食	160	500	2020-01-01 10:00:00

4	8004	902	零食
	130	500	2020-01-01 10:00:00

（product_id-商品ID, shop_id-店铺ID, tag-商品类别标签, in_price-进货价格, quantity-进货数量, release_time-上架时间）



订单总表tb_order_overall

id	order_id	uid	event_time	total_amount	total_cnt	status
1	301002	102	2021-10-01 11:00:00	235	2	1
2	301003	101	2021-10-02 10:00:00
	300	2	1
3	301005	104	2021-10-03 10:00:00
	160	1	1
（order_id-订单号, uid-用户ID, event_time-下单时间, total_amount-订单总金额, total_cnt-订单商品总件数, status-订单状态）



订单明细表tb_order_detail

id	order_id	product_id	price	cnt
1	301002	8001	85	1
2	301002
	8003
	180	1
3	301003
	8004
	140
	1
4	301003
	8003
	180	1
5	301005
	8003
	180	1

（order_id-订单号, product_id-商品ID, price-商品单价, cnt-下单数量）




问题：请计算2021年10月商城里所有新用户的首单平均交易金额（客单价）和平均获客成本（保留一位小数）。


注：订单的优惠金额 = 订单明细里的{该订单各商品单价×数量之和} - 订单总表里的{订单总金额} 。


输出示例：
示例数据的输出结果如下
avg_amount	avg_cost
231.7	23.3
解释：
2021年10月有3个新用户，102的首单为301002，订单金额为235，商品总金额为85+180=265，优惠金额为30；
101的首单为301003，订单金额为300，商品总金额为140+180=320，优惠金额为20；
104的首单为301005，订单金额为160，商品总金额为180，优惠金额为20；
平均首单客单价为(235+300+160)/3=231.7，平均获客成本为(30+20+20)/3=23.3
示例1
输入：
DROP TABLE IF EXISTS tb_order_overall;
CREATE TABLE tb_order_overall (
    id INT PRIMARY KEY AUTO_INCREMENT COMMENT '自增ID',
    order_id INT NOT NULL COMMENT '订单号',
    uid INT NOT NULL COMMENT '用户ID',
    event_time datetime COMMENT '下单时间',
    total_amount DECIMAL NOT NULL COMMENT '订单总金额',
    total_cnt INT NOT NULL COMMENT '订单商品总件数',
    `status` TINYINT NOT NULL COMMENT '订单状态'
) CHARACTER SET utf8 COLLATE utf8_bin;

DROP TABLE IF EXISTS tb_product_info;
CREATE TABLE tb_product_info (
    id INT PRIMARY KEY AUTO_INCREMENT COMMENT '自增ID',
    product_id INT NOT NULL COMMENT '商品ID',
    shop_id INT NOT NULL COMMENT '店铺ID',
    tag VARCHAR(12) COMMENT '商品类别标签',
    in_price DECIMAL NOT NULL COMMENT '进货价格',
    quantity INT NOT NULL COMMENT '进货数量',
    release_time datetime COMMENT '上架时间'
) CHARACTER SET utf8 COLLATE utf8_bin;

DROP TABLE IF EXISTS tb_order_detail;
CREATE TABLE tb_order_detail (
    id INT PRIMARY KEY AUTO_INCREMENT COMMENT '自增ID',
    order_id INT NOT NULL COMMENT '订单号',
    product_id INT NOT NULL COMMENT '商品ID',
    price DECIMAL NOT NULL COMMENT '商品单价',
    cnt INT NOT NULL COMMENT '下单数量'
) CHARACTER SET utf8 COLLATE utf8_bin;

INSERT INTO tb_product_info(product_id, shop_id, tag, in_price, quantity, release_time) VALUES
  (8001, 901, '日用', 60, 1000, '2020-01-01 10:00:00'),
  (8002, 901, '零食', 140, 500, '2020-01-01 10:00:00'),
  (8003, 901, '零食', 160, 500, '2020-01-01 10:00:00'),
  (8004, 902, '零食', 130, 500, '2020-01-01 10:00:00');

INSERT INTO tb_order_overall(order_id, uid, event_time, total_amount, total_cnt, `status`) VALUES
  (301002, 102, '2021-10-01 11:00:00', 235, 2, 1),
  (301003, 101, '2021-10-02 10:00:00', 300, 2, 1),
  (301005, 104, '2021-10-03 10:00:00', 160, 1, 1);

INSERT INTO tb_order_detail(order_id, product_id, price, cnt) VALUES
  (301002, 8001, 85, 1),
  (301002, 8003, 180, 1),
  (301003, 8004, 140, 1),
  (301003, 8003, 180, 1),
  (301005, 8003, 180, 1);
复制
输出：
231.7|23.3
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
- `avg_amount`
- `avg_cost`

## SQLite 说明
本关卡运行在浏览器内置 SQLite 环境中，原题的 MySQL 建表语句已转换为 SQLite 可执行语法。日期时间差可以使用 `julianday()`、`date()`、`strftime()` 等 SQLite 函数实现。

## 参考 SQL（MySQL 原题写法）
```sql
with temp1 as(     select order_id,sum(price*cnt) as total_now_amount     from tb_order_detail     group by order_id ),temp2 as (     select uid,order_id,total_amount,event_time,row_number() over(partition by uid order by event_time) as t_rank     from tb_order_overall     where status = 1) select round(avg(total_amount),1) as avg_amount,round(sum(total_now_amount-total_amount)/count(order_id),1) as avg_cost from temp1 join temp2 using(order_id) where date_format(event_time,"%Y%m")='202110' and t_rank = 1
```
