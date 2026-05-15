# 每天的日活数及新用户占比

## 题目
描述

用户行为日志表tb_user_log

id	uid	artical_id	in_time	out_time	sign_cin
1	101	9001	2021-10-31 10:00:00	2021-10-31 10:00:09	0
2	102	9001
	2021-10-31 10:00:00	2021-10-31 10:00:09	0
3	101	0	2021-11-01 10:00:00	2021-11-01 10:00:42	1
4	102	9001	
2021-11-01 10:00:00
	2021-11-01 10:00:09	0
5	108	9001
	2021-11-01 10:00:01	2021-11-01 10:00:50
	0
6
	108	9001	2021-11-02 10:00:01
	2021-11-02 10:00:50
	0
7	104	9001	2021-11-02 10:00:28
	
2021-11-02 10:00:50
	0
8
	106	9001	2021-11-02 10:00:28	2021-11-02 10:00:50
	0
9
	108	9001	2021-11-03 10:00:01	2021-11-03 10:00:50
	0
10	109	9002
	2021-11-03 11:00:55	2021-11-03 11:00:59	0
11
	104	9003
	2021-11-03 11:00:45
	2021-11-03 11:00:55
	0
12	105	9003
	2021-11-03 11:00:53
	2021-11-03 11:00:59
	0
13	106	9003
	2021-11-03 11:00:45
	2021-11-03 11:00:55
	0
（uid-用户ID, artical_id-文章ID, in_time-进入时间, out_time-离开时间, sign_in-是否签到）





问题：统计每天的日活数及新用户占比


注：
新用户占比=当天的新用户数÷当天活跃用户数（日活数）。
如果in_time-进入时间和out_time-离开时间跨天了，在两天里都记为该用户活跃过。
新用户占比保留2位小数，结果按日期升序排序。



输出示例：
示例数据的输出结果如下

dt	dau	uv_new_ratio
2021-10-30	2	1.00
2021-11-01
	3	0.33
2021-11-02
	3	0.67
2021-11-03
	5	0.40

解释：
2021年10月31日有2个用户活跃，都为新用户，新用户占比1.00；
2021年11月1日有3个用户活跃，其中1个新用户，新用户占比0.33；

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
  (101, 9001, '2021-10-31 10:00:00', '2021-10-31 10:00:09', 0),
  (102, 9001, '2021-10-31 10:00:00', '2021-10-31 10:00:09', 0),
  (101, 0, '2021-11-01 10:00:00', '2021-11-01 10:00:42', 1),
  (102, 9001, '2021-11-01 10:00:00', '2021-11-01 10:00:09', 0),
  (108, 9001, '2021-11-01 10:00:01', '2021-11-01 10:01:50', 0),
  (108, 9001, '2021-11-02 10:00:01', '2021-11-02 10:01:50', 0),
  (104, 9001, '2021-11-02 10:00:28', '2021-11-02 10:00:50', 0),
  (106, 9001, '2021-11-02 10:00:28', '2021-11-02 10:00:50', 0),
  (108, 9001, '2021-11-03 10:00:01', '2021-11-03 10:01:50', 0),
  (109, 9002, '2021-11-03 11:00:55', '2021-11-03 11:00:59', 0),
  (104, 9003, '2021-11-03 11:00:45', '2021-11-03 11:00:55', 0),
  (105, 9003, '2021-11-03 11:00:53', '2021-11-03 11:00:59', 0),
  (106, 9003, '2021-11-03 11:00:45', '2021-11-03 11:00:55', 0);
复制
输出：
2021-10-31|2|1.00
2021-11-01|3|0.33
2021-11-02|3|0.67
2021-11-03|5|0.40
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
- `dau`
- `uv_new_ratio`

## SQLite 说明
本关卡运行在浏览器内置 SQLite 环境中，原题的 MySQL 建表语句已转换为 SQLite 可执行语法。日期时间差可以使用 `julianday()`、`date()`、`strftime()` 等 SQLite 函数实现。

## 参考 SQL（MySQL 原题写法）
```sql
with temp1 as(
select uid,date(in_time) as check_time
from tb_user_log
union
select uid,date(out_time) as check_time
from tb_user_log
),
temp2 as (select distinct check_time as dt, count(uid) over(partition by check_time) as dau,
sum(if_new) over(partition by check_time) as uv_new
from(select *, MIN(check_time) OVER(PARTITION BY uid) AS min_date,
    CASE
        WHEN check_time = MIN(check_time) OVER(PARTITION BY uid) THEN 1
        ELSE 0
    END AS if_new
from temp1
order by check_time) t)
select dt , dau , round(uv_new/dau,2) as uv_new_ratio
from temp2
order by dt
```
