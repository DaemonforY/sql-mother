# 工作日各时段叫车量、等待接单时间和调度时间

## 题目
描述

用户打车记录表tb_get_car_record

（uid 用户ID, city-城市, event_time-打车时间, end_time-打车结束时间, order_id-订单号）



打车订单表tb_get_car_order

（order_id-订单号, uid-用户ID, driver_id-司机ID, order_time-接单时间, start_time-开始计费的上车时间, finish_time-订单完成时间, mileage-行驶里程数, fare-费用, grade-评分）




场景逻辑说明：

用户提交打车请求后，在用户打车记录表生成一条打车记录，订单号-order_id设为null；

当有司机接单时，在打车订单表生成一条订单，填充接单时间-order_time 及其左边的字段，上车时间-start_time及其右边的字段全部为null，并把订单号-order_id和接单时间-order_time（end_time-打车结束时间）写入打车记录表；若一直无司机接单，超时或中途用户主动取消打车，则记录打车结束时间-end_time。

若乘客上车前，乘客或司机点击取消订单，会将打车订单表对应订单的finish_time-订单完成时间填充为取消时间，其余字段设为null。

当司机接上乘客时，填充订单表中该订单的start_time-上车时间。

当订单完成时填充订单完成时间、里程数、费用；评分设为null，在用户给司机打1~5星评价后填充。



问题：统计周一到周五各时段的叫车量、平均等待接单时间和平均调度时间。全部以event_time-开始打车时间为时段划分依据，平均等待接单时间和平均调度时间均保留1位小数，平均调度时间仅计算完成了的订单，结果按叫车量升序排序。


注：
不同时段定义：早高峰 [07:00:00 , 09:00:00)、工作时间 [09:00:00 , 17:00:00）、晚高峰 [17:00:00 , 20:00:00）、休息时间 [20:00:00 , 07:00:00）
时间区间左闭右开（即7:00:00算作早高峰，而9:00:00不算做早高峰）
从开始打车到司机接单为等待接单时间，从司机接单到上车为调度时间。

输出示例：
示例数据的输出结果如下：

解释：订单9017打车开始于11点整，属于工作时间，等待时间30秒，调度时间为1分40秒，示例数据中工作时间打车订单就一个，平均等待时间0.5分钟，平均调度时间1.7分钟。

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
    mileage FLOAT COMMENT '行驶里程数',
    fare FLOAT COMMENT '费用',
    grade TINYINT COMMENT '评分'
) CHARACTER SET utf8 COLLATE utf8_bin;

INSERT INTO tb_get_car_record(uid, city, event_time, end_time, order_id) VALUES
 (107, '北京', '2021-09-20 11:00:00', '2021-09-20 11:00:30', 9017),
 (108, '北京', '2021-09-20 21:00:00', '2021-09-20 21:00:40', 9008),
 (108, '北京', '2021-09-20 18:59:30', '2021-09-20 19:01:00', 9018),
 (102, '北京', '2021-09-21 08:59:00', '2021-09-21 09:01:00', 9002),
 (106, '北京', '2021-09-21 17:58:00', '2021-09-21 18:01:00', 9006),
 (103, '北京', '2021-09-22 07:58:00', '2021-09-22 08:01:00', 9003),
 (104, '北京', '2021-09-23 07:59:00', '2021-09-23 08:01:00', 9004),
 (103, '北京', '2021-09-24 19:59:20', '2021-09-24 20:01:00', 9019),
 (101, '北京', '2021-09-24 08:28:10', '2021-09-24 08:30:00', 9011);

INSERT INTO tb_get_car_order(order_id, uid, driver_id, order_time, start_time, finish_time, mileage, fare, grade) VALUES
 (9017, 107, 213, '2021-09-20 11:00:30', '2021-09-20 11:02:10', '2021-09-20 11:31:00', 11, 38, 5),
 (9008, 108, 204, '2021-09-20 21:00:40', '2021-09-20 21:03:00', '2021-09-20 21:31:00', 13.2, 38, 4),
 (9018, 108, 214, '2021-09-20 19:01:00', '2021-09-20 19:04:50', '2021-09-20 19:21:00', 14, 38, 5),
 (9002, 102, 202, '2021-09-21 09:01:00', '2021-09-21 09:06:00', '2021-09-21 09:31:00', 10.0, 41.5, 5),
 (9006, 106, 203, '2021-09-21 18:01:00', '2021-09-21 18:09:00', '2021-09-21 18:31:00', 8.0, 25.5, 4),
 (9007, 107, 203, '2021-09-22 11:01:00', '2021-09-22 11:07:00', '2021-09-22 11:31:00', 9.9, 30, 5),
 (9003, 103, 202, '2021-09-22 08:01:00', '2021-09-22 08:15:00', '2021-09-22 08:31:00', 11.0, 41.5, 4),
 (9004, 104, 202, '2021-09-23 08:01:00', '2021-09-23 08:13:00', '2021-09-23 08:31:00', 7.5, 22, 4),
 (9005, 105, 202, '2021-09-23 10:01:00', '2021-09-23 10:13:00', '2021-09-23 10:31:00', 9, 29, 5),
 (9019, 103, 202, '2021-09-24 20:01:00', '2021-09-24 20:11:00', '2021-09-24 20:51:00', 10, 39, 4),
 (9011, 101, 211, '2021-09-24 08:30:00', '2021-09-24 08:31:00', '2021-09-24 08:54:00', 10, 35, 5);
复制
输出：
工作时间|1|0.5|1.7
休息时间|1|0.7|2.3
晚高峰|3|2.1|7.3
早高峰|4|2.2|8.0
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
- `period`
- `get_car_num`
- `avg_wait_time`
- `avg_dispatch_time`

## SQLite 说明
本关卡运行在浏览器内置 SQLite 环境中，原题的 MySQL 建表语句已转换为 SQLite 可执行语法。日期时间差可以使用 `julianday()`、`date()`、`strftime()` 等 SQLite 函数实现。

## 参考 SQL（MySQL 原题写法）
```sql
select period, count(period) as get_car_num, round(avg(wait_time)/60,1) as avg_wait_time, round(avg(dispatch_time)/60,1) as avg_dispatch_time from (select case when hour(a.event_time)<7 or hour(a.event_time)>=20 then '休息时间' when hour(a.event_time)<9 then '早高峰' when hour(a.event_time)<17 then '工作时间' when hour(a.event_time)<20 then '晚高峰' end as period, if(a.order_id is null,null,timestampdiff(second,a.event_time,a.end_time)) as wait_time, if(a.order_id is null,null,timestampdiff(second,b.order_time,b.start_time)) as dispatch_time from tb_get_car_record a left join tb_get_car_order b on a.order_id = b.order_id where dayofweek(a.event_time) between 2 and 6 ) t group by period order by get_car_num
```
