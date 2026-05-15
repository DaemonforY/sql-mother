# 统计活跃间隔对用户分级结果

## 题目
描述

用户行为日志表tb_user_log

（uid-用户ID, artical_id-文章ID, in_time-进入时间, out_time-离开时间, sign_in-是否签到）



问题：统计活跃间隔对用户分级后，各活跃等级用户占比，结果保留两位小数，且按占比降序排序。


注：
用户等级标准简化为：忠实用户(近7天活跃过且非新晋用户)、新晋用户(近7天新增)、沉睡用户(近7天未活跃但更早前活跃过)、流失用户(近30天未活跃但更早前活跃过)。
假设今天就是数据中所有日期的最大值。
近7天表示包含当天T的近7天，即闭区间[T-6, T]。



输出示例：
示例数据的输出结果如下

解释：
今天日期为2021.11.04，根据用户分级标准，用户行为日志表tb_user_log中忠实用户有：109、108、104；新晋用户有105、102；沉睡用户有103；流失用户有101；共7个用户，因此他们的比例分别为0.43、0.29、0.14、0.14。
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
  (109, 9001, '2021-08-31 10:00:00', '2021-08-31 10:00:09', 0),
  (109, 9002, '2021-11-04 11:00:55', '2021-11-04 11:00:59', 0),
  (108, 9001, '2021-09-01 10:00:01', '2021-09-01 10:01:50', 0),
  (108, 9001, '2021-11-03 10:00:01', '2021-11-03 10:01:50', 0),
  (104, 9001, '2021-11-02 10:00:28', '2021-11-02 10:00:50', 0),
  (104, 9003, '2021-09-03 11:00:45', '2021-09-03 11:00:55', 0),
  (105, 9003, '2021-11-03 11:00:53', '2021-11-03 11:00:59', 0),
  (102, 9001, '2021-10-30 10:00:00', '2021-10-30 10:00:09', 0),
  (103, 9001, '2021-10-21 10:00:00', '2021-10-21 10:00:09', 0),
  (101, 0, '2021-10-01 10:00:00', '2021-10-01 10:00:42', 1);
复制
输出：
忠实用户|0.43
新晋用户|0.29
沉睡用户|0.14
流失用户|0.14
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
- `user_grade`
- `ratio`

## SQLite 说明
本关卡运行在浏览器内置 SQLite 环境中，原题的 MySQL 建表语句已转换为 SQLite 可执行语法。日期时间差可以使用 `julianday()`、`date()`、`strftime()` 等 SQLite 函数实现。

## 参考 SQL（MySQL 原题写法）
```sql
select case when datediff(now_time,max_time)<=6 and datediff(now_time,min_time)<=6 then '新晋用户' when datediff(now_time,max_time)<=6 and datediff(now_time,min_time)>6 then '忠实用户' when datediff(now_time,max_time)>29 then '流失用户' when datediff(now_time,max_time)>6 then '沉睡用户' end as user_grade, ROUND(COUNT(DISTINCT uid) / (SELECT COUNT(DISTINCT uid) FROM tb_user_log), 2) AS ratio from (select *, max(date(in_time)) over() as now_time, max(date(in_time)) over(partition by uid) as max_time , min(date(in_time)) over(partition by uid) as min_time from tb_user_log) dt group by user_grade order by ratio desc
```
