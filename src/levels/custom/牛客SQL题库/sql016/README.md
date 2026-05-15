# 零食类商品中复购率top3高的商品

## 题目
描述

商品信息表tb_product_info



（product_id-商品ID, shop_id-店铺ID, tag-商品类别标签, in_price-进货价格, quantity-进货数量, release_time-上架时间）





订单总表tb_order_overall



（order_id-订单号, uid-用户ID, event_time-下单时间, total_amount-订单总金额, total_cnt-订单商品总件数, status-订单状态）




订单明细表tb_order_detail


（order_id-订单号, product_id-商品ID, price-商品单价, cnt-下单数量）




场景逻辑说明：

用户将购物车中多件商品一起下单时，订单总表会生成一个订单（但此时未付款， status-订单状态-订单状态为0表示待付款），在订单明细表生成该订单中每个商品的信息；

当用户支付完成时，在订单总表修改对应订单记录的status-订单状态-订单状态为1表示已付款；

若用户退货退款，在订单总表生成一条交易总金额为负值的记录（表示退款金额，订单号为退款单号，订单状态为2表示已退款）。



问题：请统计零食类商品中复购率top3高的商品。


注：复购率指用户在一段时间内对某商品的重复购买比例，复购率越大，则反映出消费者对品牌的忠诚度就越高，也叫回头率
       此处我们定义：某商品复购率 = 近90天内购买它至少两次的人数 ÷ 购买它的总人数
       近90天指包含最大日期（记为当天）在内的近90天。结果中复购率保留3位小数，并按复购率倒序、商品ID升序排序


输出示例：

示例数据的输出结果如下：

解释：
商品8001、8002、8003都是零食类商品，8001只被用户102购买了两次，复购率1.000；
商品8002被101购买了两次，被105购买了1次，复购率0.500；
商品8003被102购买两次，被101和105各购买1次，复购率为0.333。
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
  (8001, 901, '零食', 60, 1000, '2020-01-01 10:00:00'),
  (8002, 901, '零食', 140, 500, '2020-01-01 10:00:00'),
  (8003, 901, '零食', 160, 500, '2020-01-01 10:00:00');

INSERT INTO tb_order_overall(order_id, uid, event_time, total_amount, total_cnt, `status`) VALUES
  (301001, 101, '2021-09-30 10:00:00', 140, 1, 1),
  (301002, 102, '2021-10-01 11:00:00', 235, 2, 1),
  (301011, 102, '2021-10-31 11:00:00', 250, 2, 1),
  (301003, 101, '2021-11-02 10:00:00', 300, 2, 1),
  (301013, 105, '2021-11-02 10:00:00', 300, 2, 1),
  (301005, 104, '2021-11-03 10:00:00', 170, 1, 1);

INSERT INTO tb_order_detail(order_id, product_id, price, cnt) VALUES
  (301001, 8002, 150, 1),
  (301011, 8003, 200, 1),
  (301011, 8001, 80, 1),
  (301002, 8001, 85, 1),
  (301002, 8003, 180, 1),
  (301003, 8002, 140, 1),
  (301003, 8003, 180, 1),
  (301013, 8002, 140, 2),
  (301005, 8003, 180, 1);
复制
输出：
8001|1.000
8002|0.500
8003|0.333
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
- `repurchase_rate`

## SQLite 说明
本关卡运行在浏览器内置 SQLite 环境中，原题的 MySQL 建表语句已转换为 SQLite 可执行语法。日期时间差可以使用 `julianday()`、`date()`、`strftime()` 等 SQLite 函数实现。

## 参考 SQL（MySQL 原题写法）
```sql
with a as (     select uid,product_id,count(distinct order_id) as user_product_rn     from tb_order_overall right join tb_order_detail using(order_id) join tb_product_info using(product_id)     where datediff((select max(date(event_time)) from tb_order_overall),event_time)<90 and tag='零食'    group by product_id,uid ) select product_id,round(sum(case when user_product_rn>=2 then 1 else 0 end)/count(distinct uid),3) as repurchase_rate from a group by product_id order by repurchase_rate desc , product_id asc limit 3
```
