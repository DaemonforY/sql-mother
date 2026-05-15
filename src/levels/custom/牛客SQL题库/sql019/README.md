# 2021年国庆在北京接单3次及以上的司机统计信息

## 题目
描述

用户打车记录表tb_get_car_record



（uid-用户ID, city-城市, event_time-打车时间, end_time-打车结束时间, order_id-订单号）




打车订单表tb_get_car_order


（order_id-订单号, uid-用户ID, driver_id-司机ID, order_time-接单时间, start_time-开始计费的上车时间,  finish_time-订单完成时间, mileage-行驶里程数, fare-费用, grade-评分）




场景逻辑说明：

用户提交打车请求后，在用户打车记录表生成一条打车记录，order_id-订单号设为null；

当有司机接单时，在打车订单表生成一条订单，填充order_time-接单时间及其左边的字段，start_time-开始计费的上车时间及其右边的字段全部为null，并把order_id-订单号和order_time-接单时间（end_time-打车结束时间）写入打车记录表；若一直无司机接单，超时或中途用户主动取消打车，则记录end_time-打车结束时间。

若乘客上车前，乘客或司机点击取消订单，会将打车订单表对应订单的finish_time-订单完成时间填充为取消时间，其余字段设为null。

当司机接上乘客时，填充订单表中该start_time-开始计费的上车时间。
当订单完成时填充订单完成时间、里程数、费用；评分设为null，在用户给司机打1~5星评价后填充。




问题：请统计2021年国庆7天期间在北京市接单至少3次的司机的平均接单数和平均兼职收入（暂不考虑平台佣金，直接计算完成的订单费用总额），结果保留3位小数。


输出示例：
示例数据的输出结果如下



解释：
在2021年国庆期间北京市的订单中，202共接了3单，兼职收入105；203接了4单，兼职收入137；201共接了1单，但取消了； 接单至少3次的司机有202和203，他两人全部总共接单数为7，总收入为242。因此平均接单数为3.500，平均收入为121.000；
示例1
输入：
DROP TABLE IF EXISTS tb_get_car_record,tb_get_car_order;
CREATE TABLE tb_get_car_record (
    id INT PRIMARY KEY AUTO_INCREMENT COMMENT '自增ID',
    uid INT NOT NULL COMMENT '用户ID',
    city VARCHAR(10) NOT NULL COMMENT '城市',
    event_time datetime COMMENT '打车时间',
    end_time datetime COMMENT '打车结束时间',
    order_id INT COMMENT '订单号'
) CHARACTER SET utf8 COLLATE utf8_bin;

CREATE TABLE tb_get_car_order (
    id INT PRIMARY KEY AUTO_INCREMENT COMMENT '自增ID',
    order_id INT NOT NULL COMMENT '订单号',
    uid INT NOT NULL COMMENT '用户ID',
    driver_id INT NOT NULL COMMENT '司机ID',
    order_time datetime COMMENT '接单时间',
    start_time datetime COMMENT '开始计费的上车时间',
    finish_time datetime COMMENT '订单结束时间',
    mileage DOUBLE COMMENT '行驶里程数',
    fare DOUBLE COMMENT '费用',
    grade TINYINT COMMENT '评分'
) CHARACTER SET utf8 COLLATE utf8_bin;

INSERT INTO tb_get_car_record(uid, city, event_time, end_time, order_id) VALUES
 (101, '北京', '2021-10-01 07:00:00', '2021-10-01 07:02:00', null),
 (102, '北京', '2021-10-01 09:00:30', '2021-10-01 09:01:00', 9001),
 (101, '北京', '2021-10-01 08:28:10', '2021-10-01 08:30:00', 9002),
 (103, '北京', '2021-10-02 07:59:00', '2021-10-02 08:01:00', 9003),
 (104, '北京', '2021-10-03 07:59:20', '2021-10-03 08:01:00', 9004),
 (105, '北京', '2021-10-01 08:00:00', '2021-10-01 08:02:10', 9005),
 (106, '北京', '2021-10-01 17:58:00', '2021-10-01 18:01:00', 9006),
 (107, '北京', '2021-10-02 11:00:00', '2021-10-02 11:01:00', 9007),
 (108, '北京', '2021-10-02 21:00:00', '2021-10-02 21:01:00', 9008) ;

INSERT INTO tb_get_car_order(order_id, uid, driver_id, order_time, start_time, finish_time, mileage, fare, grade) VALUES
 (9002, 101, 201, '2021-10-01 08:30:00', null, '2021-10-01 08:31:00', null, null, null),
 (9001, 102, 202, '2021-10-01 09:01:00', '2021-10-01 09:06:00', '2021-10-01 09:31:00', 10.0, 41.5, 5),
 (9003, 103, 202, '2021-10-02 08:01:00', '2021-10-02 08:15:00', '2021-10-02 08:31:00', 11.0, 41.5, 4),
 (9004, 104, 202, '2021-10-03 08:01:00', '2021-10-03 08:13:00', '2021-10-03 08:31:00', 7.5, 22, 4),
 (9005, 105, 203, '2021-10-01 08:02:10', '2021-10-01 08:18:00', '2021-10-01 08:31:00', 15.0, 44, 5),
 (9006, 106, 203, '2021-10-01 18:01:00', '2021-10-01 18:09:00', '2021-10-01 18:31:00', 8.0, 25, 5),
 (9007, 107, 203, '2021-10-02 11:01:00', '2021-10-02 11:07:00', '2021-10-02 11:31:00', 9.9, 30, 5),
 (9008, 108, 203, '2021-10-02 21:01:00', '2021-10-02 21:10:00', '2021-10-02 21:31:00', 13.2, 38, 4);
复制
输出：
北京|3.500|121.000
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
- `city`
- `avg_order_num`
- `avg_income`

## SQLite 说明
本关卡运行在浏览器内置 SQLite 环境中，原题的 MySQL 建表语句已转换为 SQLite 可执行语法。日期时间差可以使用 `julianday()`、`date()`、`strftime()` 等 SQLite 函数实现。

## 参考 SQL（MySQL 原题写法）
```sql
SELECT city,
    ROUND(AVG(num),3) AS avg_order_num,
    ROUND(AVG(sum),3) AS avg_income
FROM (SELECT city,
    COUNT(*) AS num,
    SUM(o.fare) AS sum
FROM tb_get_car_record r JOIN tb_get_car_order o ON r.order_id = o.order_id
where  city='北京' and date(order_time) between '2021-10-1'and '2021-10-7'
GROUP BY o.driver_id
HAVING COUNT(*) >= 3) t
GROUP BY city
```
