# 2021年11月每天新用户的次日留存率

## 题目
描述

用户行为日志表tb_user_log

id	uid	artical_id	in_time	out_time	sign_in
1	101	0	2021-11-01 10:00:00	2021-11-01 10:00:42	1
2	102	9001
	2021-11-01 10:00:00	2021-11-01 10:00:09	0
3	103	9001
	2021-11-01 10:00:01	2021-11-01 10:01:50	0
4	101	9002	2021-11-02 10:00:09	2021-11-02 10:00:28	0
5	103	9002
	2021-11-02 10:00:51	2021-11-02 10:00:59
	0
6
	104	9001	2021-11-02 11:00:28
	2021-11-02 11:01:24
	0
7	101	9003	2021-11-03 11:00:55
	
2021-11-03 11:01:24
	0
8
	104	9003
	2021-11-03 11:00:45
	2021-11-03 11:00:55
	0
9	105	9003
	2021-11-03 11:00:53
	2021-11-03 11:00:59
	0
10	101	9002
	2021-11-04 11:00:55
	2021-11-04 11:00:59
	0

（uid-用户ID, artical_id-文章ID, in_time-进入时间, out_time-离开时间, sign_in-是否签到）


问题：统计2021年11月每天新用户的次日留存率（保留2位小数）


注：
次日留存率为当天新增的用户数中第二天又活跃了的用户数占比。
如果in_time-进入时间和out_time-离开时间跨天了，在两天里都记为该用户活跃过，结果按日期升序。


输出示例：
示例数据的输出结果如下

dt	uv_left_rate
2021-11-01	0.67
2021-11-02
	1.00
2021-11-03
	0.00

解释：
11.01有3个用户活跃101、102、103，均为新用户，在11.02只有101、103两个又活跃了，因此11.01的次日留存率为0.67；
11.02有104一位新用户，在11.03又活跃了，因此11.02的次日留存率为1.00；
11.03有105一位新用户，在11.04未活跃，因此11.03的次日留存率为0.00；
11.04没有新用户，不输出。
示例1
输入：
DROP TABLE IF EXISTS tb_user_log;
CREATE TABLE tb_user_log (
    id INT PRIMARY KEY AUTO_INCREMENT COMMENT '自增ID',
    uid INT NOT NULL COMMENT '用户ID',
    artical_id INT NOT NULL COMMENT '视频ID',
    in_time datetime COMMENT '进入时间',
    out_time datetime COMMENT '离开时间',
    sign_in TINYINT DEFAULT 0 COMMENT '是否签到'
) CHARACTER SET utf8 COLLATE utf8_bin;

INSERT INTO tb_user_log(uid, artical_id, in_time, out_time, sign_in) VALUES
  (101, 0, '2021-11-01 10:00:00', '2021-11-01 10:00:42', 1),
  (102, 9001, '2021-11-01 10:00:00', '2021-11-01 10:00:09', 0),
  (103, 9001, '2021-11-01 10:00:01', '2021-11-01 10:01:50', 0),
  (101, 9002, '2021-11-02 10:00:09', '2021-11-02 10:00:28', 0),
  (103, 9002, '2021-11-02 10:00:51', '2021-11-02 10:00:59', 0),
  (104, 9001, '2021-11-02 10:00:28', '2021-11-02 10:00:50', 0),
  (101, 9003, '2021-11-03 11:00:55', '2021-11-03 11:01:24', 0),
  (104, 9003, '2021-11-03 11:00:45', '2021-11-03 11:00:55', 0),
  (105, 9003, '2021-11-03 11:00:53', '2021-11-03 11:00:59', 0),
  (101, 9002, '2021-11-04 11:00:55', '2021-11-04 11:00:59', 0);
复制
输出：
2021-11-01|0.67
2021-11-02|1.00
2021-11-03|0.00
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
- `uv_left_rate`

## SQLite 说明
本关卡运行在浏览器内置 SQLite 环境中，原题的 MySQL 建表语句已转换为 SQLite 可执行语法。日期时间差可以使用 `julianday()`、`date()`、`strftime()` 等 SQLite 函数实现。

## 参考 SQL（MySQL 原题写法）
```sql
with temp1 as (select uid,date_format(in_time,"%Y-%m-%d") as check_time
from tb_user_log
union
select uid,date_format(out_time,"%Y-%m-%d") as check_time
from tb_user_log),
temp2 as (
    select uid,min(date(in_time)) as min_dt
    from tb_user_log
    group by uid
)
select b.min_dt as dt,
round(ifnull(count(distinct a.uid)/count(b.uid),0),2) as uv_left_rate
from temp1 a right join temp2 b on a.uid = b.uid and date_add(b.min_dt,interval 1 day)=a.check_time
group by b.min_dt
having b.min_dt like '2021-11%'
order by b.min_dt
```
