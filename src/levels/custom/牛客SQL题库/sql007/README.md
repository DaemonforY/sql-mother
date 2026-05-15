# 2021年11月每天的人均浏览文章时长

## 题目
用户行为日志表tb_user_log
id	uid	artical_id	in_time	out_time	sign_in
1	101	9001	2021-11-01 10:00:00	2021-11-01 10:00:31	0
2	102	9001
	2021-11-01 10:00:00	2021-11-01 10:00:24	0
3	102	9002
	2021-11-01 11:00:00	2021-11-01 11:00:11	0
4	101	9001	2021-11-02 10:00:00	2021-11-02 10:00:50	0
5	102	9002
	2021-11-02 11:00:01	2021-11-02 11:00:24
	0
（uid-用户ID, artical_id-文章ID, in_time-进入时间, out_time-离开时间, sign_in-是否签到）




场景逻辑说明：artical_id-文章ID代表用户浏览的文章的ID，artical_id-文章ID为0表示用户在非文章内容页（比如App内的列表页、活动页等）。


问题：统计2021年11月每天的人均浏览文章时长（秒数），结果保留1位小数，并按时长由短到长排序。


输出示例：
示例数据的输出结果如下

dt	avg_viiew_len_sec
2021-11-01	33.0
2021-11-02	36.5

解释：
11月1日有2个人浏览文章，总共浏览时长为31+24+11=66秒，人均浏览33秒；
11月2日有2个人浏览文章，总共时长为50+23=73秒，人均时长为36.5秒。
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
  (101, 9001, '2021-11-01 10:00:00', '2021-11-01 10:00:31', 0),
  (102, 9001, '2021-11-01 10:00:00', '2021-11-01 10:00:24', 0),
  (102, 9002, '2021-11-01 11:00:00', '2021-11-01 11:00:11', 0),
  (101, 9001, '2021-11-02 10:00:00', '2021-11-02 10:00:50', 0),
  (102, 9002, '2021-11-02 11:00:01', '2021-11-02 11:00:24', 0);
复制
输出：
2021-11-01|33.0
2021-11-02|36.5
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
- `avg_view_len_sec`

## SQLite 说明
本关卡运行在浏览器内置 SQLite 环境中，原题的 MySQL 建表语句已转换为 SQLite 可执行语法。日期时间差可以使用 `julianday()`、`date()`、`strftime()` 等 SQLite 函数实现。

## 参考 SQL（MySQL 原题写法）
```sql
SELECT DATE(in_time) AS dt , ROUND(SUM(TIMESTAMPDIFF(SECOND,in_time,out_time))/COUNT(DISTINCT uid),1) AS avg_viiew_len_sec FROM tb_user_log WHERE YEAR(in_time) = 2021 AND MONTH(in_time) = 11 AND artical_id != 0GROUP BY dt ORDER BY avg_viiew_len_sec ASC
```
