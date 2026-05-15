# 各城市最大同时等车人数

## 题目
描述
用户打车记录表tb_get_car_record
（uid-用户ID, city-城市, event_time-打车时间, end_time-打车结束时间, order_id-订单号）





打车订单表tb_get_car_order
（order_id-订单号, uid-用户ID, driver_id-司机ID, order_time-接单时间, start_time-开始计费的上车时间, finish_time-订单完成时间, mileage-行驶里程数, fare-费用, grade-评分）





场景逻辑说明：

用户提交打车请求后，在用户打车记录表生成一条打车记录，订单号-order_id设为null；

当有司机接单时，在打车订单表生成一条订单，填充接单时间-order_time及其左边的字段，上车时间及其右边的字段全部为null，并把订单号和接单时间（打车结束时间）写入打车记录表；若一直无司机接单、超时或中途用户主动取消打车，则记录打车结束时间。

若乘客上车前，乘客或司机点击取消订单，会将打车订单表对应订单的订单完成时间-finish_time填充为取消时间，其余字段设为null。

当司机接上乘客时，填充打车订单表中该订单的上车时间start_time。

当订单完成时填充订单完成时间、里程数、费用；评分设为null，在用户给司机打1~5星评价后填充。


问题：请统计各个城市在2021年10月期间，单日中最大的同时等车人数。


注:   等车指从开始打车起，直到取消打车、取消等待或上车前的这段时间里用户的状态。
        如果同一时刻有人停止等车，有人开始等车，等车人数记作先增加后减少。
        结果按各城市最大等车人数升序排序，相同时按城市升序排序。


输出示例：
示例结果如下
解释：由打车订单表可以得知北京2021年10月20日有8条打车记录，108号乘客从08:00:00等到08:03:00，118号乘客从08:00:10等到08:04:50....,由此得知08:02:00秒时刻，共有5人在等车。
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
 (108, '北京', '2021-10-20 08:00:00', '2021-10-20 08:00:40', 9008),
 (108, '北京', '2021-10-20 08:00:10', '2021-10-20 08:00:45', 9018),
 (102, '北京', '2021-10-20 08:00:30', '2021-10-20 08:00:50', 9002),
 (106, '北京', '2021-10-20 08:05:41', '2021-10-20 08:06:00', 9006),
 (103, '北京', '2021-10-20 08:05:50', '2021-10-20 08:07:10', 9003),
 (104, '北京', '2021-10-20 08:01:01', '2021-10-20 08:01:20', 9004),
 (103, '北京', '2021-10-20 08:01:15', '2021-10-20 08:01:30', 9019),
 (101, '北京', '2021-10-20 08:28:10', '2021-10-20 08:30:00', 9011);

INSERT INTO tb_get_car_order(order_id, uid, driver_id, order_time, start_time, finish_time, mileage, fare, grade) VALUES
 (9008, 108, 204, '2021-10-20 08:00:40', '2021-10-20 08:03:00', '2021-10-20 08:31:00', 13.2, 38, 4),
 (9018, 108, 214, '2021-10-20 08:00:45', '2021-10-20 08:04:50', '2021-10-20 08:21:00', 14, 38, 5),
 (9002, 102, 202, '2021-10-20 08:00:50', '2021-10-20 08:06:00', '2021-10-20 08:31:00', 10.0, 41.5, 5),
 (9006, 106, 203, '2021-10-20 08:06:00', '2021-10-20 08:09:00', '2021-10-20 08:31:00', 8.0, 25.5, 4),
 (9003, 103, 202, '2021-10-20 08:07:10', '2021-10-20 08:15:00', '2021-10-20 08:31:00', 11.0, 41.5, 4),
 (9004, 104, 202, '2021-10-20 08:01:20', '2021-10-20 08:13:00', '2021-10-20 08:31:00', 7.5, 22, 4),
 (9019, 103, 202, '2021-10-20 08:01:30', '2021-10-20 08:11:00', '2021-10-20 08:51:00', 10, 39, 4),
 (9011, 101, 211, '2021-10-20 08:30:00', '2021-10-20 08:31:00', '2021-10-20 08:54:00', 10, 35, 5);
复制
输出：
北京|5
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
- `max_wait_uv`

## SQLite 说明
本关卡运行在浏览器内置 SQLite 环境中，原题的 MySQL 建表语句已转换为 SQLite 可执行语法。日期时间差可以使用 `julianday()`、`date()`、`strftime()` 等 SQLite 函数实现。

## 参考 SQL（MySQL 原题写法）
```sql
with temp1 as (select a.uid,a.city,a.event_time as start_time,if(b.order_id is null,a.end_time,if(b.mileage is null,b.finish_time,b.start_time)) as end_timefrom tb_get_car_record a left join tb_get_car_order b on a.order_id = b.order_idwhere date_format(a.event_time,'%Y-%m')='2021-10'),temp2 as (select uid,city,1 as num,start_time as check_timefrom temp1union allselect uid,city,-1 as num,end_time as check_timefrom temp1)select city,max(total_num) as max_wait_uvfrom(select city,sum(num) over(partition by city,date(check_time) order by check_time asc,num desc) as total_numfrom temp2) t1group by cityorder by max_wait_uv,city
```
