# 统计2021年10月每个退货率不大于0.5的商品各项指标

## 题目
描述

现有用户对展示的商品行为表tb_user_event

id	uid	product_id	event_time	if_click	if_cart	if_payment	if_refund
1	101	8001	2021-10-01 10:00:00	0	0	0	0
2	102	8001
	2021-10-01 10:00:00
	1	0	0	0
3	103	8001
	2021-10-01 10:00:00
	1	1	0	0
4	104	8001
	2021-10-02 10:00:00
	1	1	1	0
5	105	8001
	2021-10-02 10:00:00
	1	1	1	0
6	101	8002
	2021-10-03 10:00:00
	1	1	1	0
7	109	8001
	2021-10-04 10:00:00
	1	1	1	1
（uid-用户ID, product_id-商品ID, event_time-行为时间, if_click-是否点击, if_cart-是否加购物车, if_payment-是否付款, if_refund-是否退货退款）



问题：请统计2021年10月每个有展示记录的退货率不大于0.5的商品各项指标，


注：
商品点展比=点击数÷展示数；
加购率=加购数÷点击数；
成单率=付款数÷加购数；退货率=退款数÷付款数，
当分母为0时整体结果记为0，结果中各项指标保留3位小数，并按商品ID升序排序。


输出示例：
示例数据的输出结果如下

product_id	ctr	cart_rate	payment_rate	refund_rate
8001	0.833	0.800	0.750	0.333
8002	1.000	1.000	1.000	0.000

解释：
在2021年10月商品8001被展示了6次，点击了5次，加购了4次，付款了3次，退款了1次，因此点击率为5/6=0.833，加购率为4/5=0.800，
成单率为3/4=0.750，退货率为1/3=0.333（保留3位小数）；
示例1
输入：
DROP TABLE IF EXISTS tb_user_event;
CREATE TABLE tb_user_event (
    id INT PRIMARY KEY AUTO_INCREMENT COMMENT '自增ID',
    uid INT NOT NULL COMMENT '用户ID',
    product_id INT NOT NULL COMMENT '商品ID',
    event_time datetime COMMENT '行为时间',
    if_click TINYINT COMMENT '是否点击',
    if_cart TINYINT COMMENT '是否加购物车',
    if_payment TINYINT COMMENT '是否付款',
    if_refund TINYINT COMMENT '是否退货退款'
) CHARACTER SET utf8 COLLATE utf8_bin;

INSERT INTO tb_user_event(uid, product_id, event_time, if_click, if_cart, if_payment, if_refund) VALUES
  (101, 8001, '2021-10-01 10:00:00', 0, 0, 0, 0),
  (102, 8001, '2021-10-01 10:00:00', 1, 0, 0, 0),
  (103, 8001, '2021-10-01 10:00:00', 1, 1, 0, 0),
  (104, 8001, '2021-10-02 10:00:00', 1, 1, 1, 0),
  (105, 8001, '2021-10-02 10:00:00', 1, 1, 1, 0),
  (101, 8002, '2021-10-03 10:00:00', 1, 1, 1, 0),
  (109, 8001, '2021-10-04 10:00:00', 1, 1, 1, 1);
复制
输出：
8001|0.833|0.800|0.750|0.333
8002|1.000|1.000|1.000|0.000
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
- `product_id`
- `ctr`
- `cart_rate`
- `payment_rate`
- `refund_rate`

## SQLite 说明
本关卡运行在浏览器内置 SQLite 环境中，原题的 MySQL 建表语句已转换为 SQLite 可执行语法。日期时间差可以使用 `julianday()`、`date()`、`strftime()` 等 SQLite 函数实现。

## 参考 SQL（MySQL 原题写法）
```sql
select product_id, round(sum(if_click)/count(product_id),3) as ctr, round(if(sum(if_click)=0,0,sum(if_cart)/sum(if_click)),3) as cart_rate, round(if(sum(if_cart)=0,0,sum(if_payment)/sum(if_cart)),3) as payment_rate, round(if(sum(if_payment)=0,0,sum(if_refund)/sum(if_payment)),3) as refund_rate from tb_user_event where year(event_time)=2021 and month(event_time)= 10group by product_id having refund_rate<=0.5000order by product_id
```
