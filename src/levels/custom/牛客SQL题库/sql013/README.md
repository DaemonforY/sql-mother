# 计算商城中2021年每月的GMV

## 题目
描述

现有订单总表tb_order_overall



（order_id-订单号, uid-用户ID, event_time-下单时间, total_amount-订单总金额, total_cnt-订单商品总件数, status-订单状态）




场景逻辑说明：
用户将购物车中多件商品一起下单时，订单总表会生成一个订单（但此时未付款，status-订单状态为0，表示待付款）；
当用户支付完成时，在订单总表修改对应订单记录的status-订单状态为1，表示已付款；
若用户退货退款，在订单总表生成一条交易总金额为负值的记录（表示退款金额，订单号为退款单号，status-订单状态为2表示已退款）。


问题：请计算商城中2021年每月的GMV，输出GMV大于10w的每月GMV，值保留到整数。


注：GMV为已付款订单和未付款订单两者之和。结果按GMV升序排序。



输出示例：
示例数据输出如下：


解释：
2021年10月有3笔已付款的订单，1笔未付款订单，总交易金额为109800；2021年11月有2笔已付款订单，1笔未付款订单，
总交易金额为111900（还有1笔退款订单由于已计算了付款的订单金额，无需计算在GMV中）。
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

INSERT INTO tb_order_overall(order_id, uid, event_time, total_amount, total_cnt, `status`) VALUES
  (301001, 101, '2021-10-01 10:00:00', 15900, 2, 1),
  (301002, 101, '2021-10-01 11:00:00', 15900, 2, 1),
  (301003, 102, '2021-10-02 10:00:00', 34500, 8, 0),
  (301004, 103, '2021-10-12 10:00:00', 43500, 9, 1),
  (301005, 105, '2021-11-01 10:00:00', 31900, 7, 1),
  (301006, 102, '2021-11-02 10:00:00', 24500, 6, 1),
  (391007, 102, '2021-11-03 10:00:00', -24500, 6, 2),
  (301008, 104, '2021-11-04 10:00:00', 55500, 12, 0);
复制
输出：
2021-10|109800
2021-11|111900
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
- `month`
- `GMV`

## SQLite 说明
本关卡运行在浏览器内置 SQLite 环境中，原题的 MySQL 建表语句已转换为 SQLite 可执行语法。日期时间差可以使用 `julianday()`、`date()`、`strftime()` 等 SQLite 函数实现。

## 参考 SQL（MySQL 原题写法）
```sql
SELECT SUBSTRING_INDEX(event_time,'-',2) AS month,
    SUM(total_amount) AS GMV
FROM tb_order_overall
WHERE status!=2 AND YEAR(event_time) = 2021
GROUP BY month
HAVING GMV > 100000
ORDER BY GMV ASC
```
