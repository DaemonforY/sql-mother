# 牛客直播各科目同时在线人数

## 题目
描述
牛客某页面推出了数据分析系列直播课程介绍。用户可以选择报名任意一场或多场直播课。
已知课程表course_tb如下（其中course_id代表课程编号，course_name表示课程名称，course_datetime代表上课时间）：
上课情况表attend_tb如下（其中user_id表示用户编号、course_id代表课程编号、in_datetime表示进入直播间的时间、out_datetime表示离开直播间的时间）：


请你统计每个科目最大同时在线人数（按course_id排序），以上数据的输出结果如下：


示例1
输入：
drop table if exists course_tb;
CREATE TABLE course_tb(
course_id int(10) NOT NULL, 
course_name char(10) NOT NULL,
course_datetime char(30) NOT NULL);
INSERT INTO course_tb VALUES(1, 'Python', '2021-12-1 19:00-21:00');
INSERT INTO course_tb VALUES(2, 'SQL', '2021-12-2 19:00-21:00');
INSERT INTO course_tb VALUES(3, 'R', '2021-12-3 19:00-21:00');

drop table if exists attend_tb;
CREATE TABLE attend_tb(
user_id int(10) NOT NULL, 
course_id int(10) NOT NULL,
in_datetime datetime NOT NULL,
out_datetime datetime NOT NULL
);
INSERT INTO attend_tb VALUES(100, 1, '2021-12-1 19:00:00', '2021-12-1 19:28:00');
INSERT INTO attend_tb VALUES(100, 1, '2021-12-1 19:30:00', '2021-12-1 19:53:00');
INSERT INTO attend_tb VALUES(101, 1, '2021-12-1 19:00:00', '2021-12-1 20:55:00');
INSERT INTO attend_tb VALUES(102, 1, '2021-12-1 19:00:00', '2021-12-1 19:05:00');
INSERT INTO attend_tb VALUES(104, 1, '2021-12-1 19:00:00', '2021-12-1 20:59:00');
INSERT INTO attend_tb VALUES(101, 2, '2021-12-2 19:05:00', '2021-12-2 20:58:00');
INSERT INTO attend_tb VALUES(102, 2, '2021-12-2 18:55:00', '2021-12-2 21:00:00');
INSERT INTO attend_tb VALUES(104, 2, '2021-12-2 18:57:00', '2021-12-2 20:56:00');
INSERT INTO attend_tb VALUES(107, 2, '2021-12-2 19:10:00', '2021-12-2 19:18:00');
INSERT INTO attend_tb VALUES(100, 3, '2021-12-3 19:01:00', '2021-12-3 21:00:00');
INSERT INTO attend_tb VALUES(102, 3, '2021-12-3 18:58:00', '2021-12-3 19:05:00');
INSERT INTO attend_tb VALUES(108, 3, '2021-12-3 19:01:00', '2021-12-3 19:56:00');
复制
输出：
1|Python|4
2|SQL|4
3|R|3
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
- `course_id`
- `course_name`
- `max_num`

## SQLite 说明
本关卡运行在浏览器内置 SQLite 环境中，原题的 MySQL 建表语句已转换为 SQLite 可执行语法。日期时间差可以使用 `julianday()`、`date()`、`strftime()` 等 SQLite 函数实现。

## 参考 SQL（MySQL 原题写法）
```sql
with a as(
    select user_id,course_id,in_datetime as check_datetime,1 as uv
    from attend_tb
    union all
    select user_id,course_id,out_datetime,-1 as uv
    from attend_tb
),
b as (
    select *,
    sum(uv) OVER(partition by course_id order by check_datetime) as num
    from a
),
c as (
    select course_id,max(num) as max_num
    from b
    group by course_id
)
select course_id,course_name,max_num
from course_tb JOIN c USING(course_id)
order by course_id
```
