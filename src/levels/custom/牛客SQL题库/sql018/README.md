# 店铺901国庆期间的7日动销率和滞销率

## 题目
描述
商品信息表tb_product_info
id	product_id
	shop_id	tag	in_price
	quantity	release_time
1	8001	901	日用	60	1000	2020-01-01 10:00:00
2	8002	901	零食	140	500	2020-01-01 10:00:00

3	8003	901	零食	160	500	2020-01-01 10:00:00

（product_id-商品ID, shop_id-店铺ID, tag-商品类别标签, in_price-进货价格, quantity-进货数量, release_time-上架时间）



订单总表tb_order_overall

id	order_id	uid	event_time	total_amount	total_cnt	status
1	301004	102	2021-09-30 10:00:00	170	1	1
2	301005	104	2021-10-01 10:00:00
	160	1	1
3	301003	101	2021-10-02 10:00:00
	300	2	1
4	301002	102	2021-10-03 11:00:00
	235	2	1
（order_id-订单号, uid-用户ID, event_time-下单时间, total_amount-订单总金额, total_cnt-订单商品总件数, status-订单状态）



订单明细表tb_order_detail

id	order_id	product_id	price	cnt
1	301004	8002	180	1
2	301005
	8002
	170	1
3	301002
	8001
	85
	1
4	301002
	8003
	180	1
5	301003
	8002
	150	1
6	301003
	8003
	180	1
（order_id-订单号, product_id-商品ID, price-商品单价, cnt-下单数量）


问题：请计算店铺901在2021年国庆头3天的7日动销率和滞销率，结果保留3位小数，按日期升序排序。


注：
动销率定义为店铺中一段时间内有销量的商品占当前已上架总商品数的比例（有销量的商品/已上架总商品数)。
滞销率定义为店铺中一段时间内没有销量的商品占当前已上架总商品数的比例。（没有销量的商品/已上架总商品数)。
只要当天任一店铺有任何商品的销量就输出该天的结果，即使店铺901当天的动销率为0。


输出示例：
示例数据的输出结果如下：
dt	sale_rate	unsale_rate
2021-10-01	0.333	0.667

2021-10-02
	0.667	0.333

2021-10-03
	1.000	0.000
解释：
10月1日的近7日（9月25日---10月1日）店铺901有销量的商品有8002，截止当天在售商品数为3，动销率为0.333，滞销率为0.667；
10月2日的近7日（9月26日---10月2日）店铺901有销量的商品有8002、8003，截止当天在售商品数为3，动销率为0.667，滞销率为0.333；
10月3日的近7日（9月27日---10月3日）店铺901有销量的商品有8002、8003、8001，截止当天店铺901在售商品数为3，动销率为1.000，
滞销率为0.000；
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
  (8003, 901, '零食', 160, 500, '2020-01-01 10:00:00');

INSERT INTO tb_order_overall(order_id, uid, event_time, total_amount, total_cnt, `status`) VALUES
  (301004, 102, '2021-09-30 10:00:00', 170, 1, 1),
  (301005, 104, '2021-10-01 10:00:00', 160, 1, 1),
  (301003, 101, '2021-10-02 10:00:00', 300, 2, 1),
  (301002, 102, '2021-10-03 11:00:00', 235, 2, 1);

INSERT INTO tb_order_detail(order_id, product_id, price, cnt) VALUES
  (301004, 8002, 180, 1),
  (301005, 8002, 170, 1),
  (301002, 8001, 85, 1),
  (301002, 8003, 180, 1),
  (301003, 8002, 150, 1),
  (301003, 8003, 180, 1);
复制
输出：
2021-10-01|0.333|0.667
2021-10-02|0.667|0.333
2021-10-03|1.000|0.000
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
- `dt`
- `sale_rate`
- `unsale_rate`

## SQLite 说明
本关卡运行在浏览器内置 SQLite 环境中，原题的 MySQL 建表语句已转换为 SQLite 可执行语法。日期时间差可以使用 `julianday()`、`date()`、`strftime()` 等 SQLite 函数实现。

## 参考 SQL（MySQL 原题写法）
```sql
with temp1 as ( select distinct date(event_time) dt from tb_order_overall where date(event_time) between '2021-10-01' and '2021-10-03'), temp2 as (     select event_time as dt,     product_id     from tb_order_overall join tb_order_detail using(order_id) join tb_product_info using(product_id)     where shop_id=901 and status=1) select t1.dt, round(count(distinct t2.product_id)/(select count(product_id) from tb_product_info where date(release_time) <= t1.dt and shop_id = 901),3) as sale_rate, round(1-count(distinct t2.product_id)/(select count(product_id) from tb_product_info where date(release_time) <= t1.dt and shop_id = 901),3) as unsale_rate from temp1 t1 left join temp2 t2 on datediff(t1.dt,t2.dt) between 0 and 6group by t1.dt order by t1.dt
```
