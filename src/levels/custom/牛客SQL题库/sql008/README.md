# 每篇文章同一时刻最大在看人数

## 题目
描述

用户行为日志表tb_user_log

id	uid	artical_id	in_time	out_time	sign_in
1	101	9001	2021-11-01 10:00:00	2021-11-01 10:00:11	0
2	102	9001
	2021-11-01 10:00:09	2021-11-01 10:00:38	0
3	103	9001
	2021-11-01 10:00:28	2021-11-01 10:00:58	0
4	104	9002	2021-11-01 11:00:45	2021-11-01 11:01:11	0
5	105	9001
	2021-11-01 10:00:51	2021-11-01 10:00:59
	0
6
	106	9002	2021-11-01 11:00:55
	2021-11-01 11:01:24
	0
7	107	9001	2021-11-01 10:00:01
	
2021-11-01 10:01:50
	0
（uid-用户ID, artical_id-文章ID, in_time-进入时间, out_time-离开时间, sign_in-是否签到）




场景逻辑说明：artical_id-文章ID代表用户浏览的文章的ID，artical_id-文章ID为0表示用户在非文章内容页（比如App内的列表页、活动页等）。


问题：统计每篇文章同一时刻最大在看人数，如果同一时刻有进入也有离开时，先记录用户数增加再记录减少，结果按最大人数降序。


输出示例：
示例数据的输出结果如下

artical_id	max_uv
9001	3
9002	2
解释：10点0分10秒时，有3个用户正在浏览文章9001；11点01分0秒时，有2个用户正在浏览文章9002。

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
  (101, 9001, '2021-11-01 10:00:00', '2021-11-01 10:00:11', 0),
  (102, 9001, '2021-11-01 10:00:09', '2021-11-01 10:00:38', 0),
  (103, 9001, '2021-11-01 10:00:28', '2021-11-01 10:00:58', 0),
  (104, 9002, '2021-11-01 11:00:45', '2021-11-01 11:01:11', 0),
  (105, 9001, '2021-11-01 10:00:51', '2021-11-01 10:00:59', 0),
  (106, 9002, '2021-11-01 11:00:55', '2021-11-01 11:01:24', 0),
  (107, 9001, '2021-11-01 10:00:01', '2021-11-01 10:01:50', 0);
复制
输出：
9001|3
9002|2
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
- `artical_id`
- `max_uv`

## SQLite 说明
本关卡运行在浏览器内置 SQLite 环境中，原题的 MySQL 建表语句已转换为 SQLite 可执行语法。日期时间差可以使用 `julianday()`、`date()`、`strftime()` 等 SQLite 函数实现。

## 参考 SQL（MySQL 原题写法）
```sql
with a as(
 select uid,artical_id,
 in_time as check_time , 1 as rn
 from tb_user_log
 where artical_id != 0
 union all
 select uid,artical_id,
 out_time , -1 as rn
 from tb_user_log
 where artical_id != 0
),b as(
    select *,
    sum(rn) over(partition by artical_id order by check_time , rn desc) as num
    from a
)select artical_id, max(num) as max_uv
from b
group by artical_id
order by max_uv desc
```
