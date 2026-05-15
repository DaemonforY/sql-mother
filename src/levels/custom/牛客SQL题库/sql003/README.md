# 每类视频近一个月的转发量率

## 题目
描述

用户-视频互动表tb_user_video_log

（uid-用户ID, video_id-视频ID, start_time-开始观看时间, end_time-结束观看时间, if_follow-是否关注, if_like-是否点赞, if_retweet-是否转发, comment_id-评论ID）





短视频信息表tb_video_info

（video_id-视频ID, author-创作者ID, tag-类别标签, duration-视频时长, release_time-发布时间）




问题：统计在有用户互动的最近一个月（按包含当天在内的近30天算，比如10月31日的近30天为10.2~10.31之间的数据）中，每类视频的转发量和转发率（保留3位小数）。


注：转发率＝转发量÷播放量。结果按转发率降序排序。


输出示例：
示例数据的输出结果如下

解释：
由表tb_user_video_log的数据可得，用户互动最后的最后天数为2021年10月1日，那么我们需要统计2021年09年01-2021年10月1日 这30天内的每类视频的转发量和转发率。
其中影视类视频2001共有3次播放记录，被转发2次，转发率为0.667；美食类视频2002共有2次播放记录，1次被转发，转发率为0.500。
示例1
输入：
DROP TABLE IF EXISTS tb_user_video_log, tb_video_info;
CREATE TABLE tb_user_video_log (
    id INT PRIMARY KEY AUTO_INCREMENT COMMENT '自增ID',
    uid INT NOT NULL COMMENT '用户ID',
    video_id INT NOT NULL COMMENT '视频ID',
    start_time datetime COMMENT '开始观看时间',
    end_time datetime COMMENT '结束观看时间',
    if_follow TINYINT COMMENT '是否关注',
    if_like TINYINT COMMENT '是否点赞',
    if_retweet TINYINT COMMENT '是否转发',
    comment_id INT COMMENT '评论ID'
) CHARACTER SET utf8 COLLATE utf8_bin;

CREATE TABLE tb_video_info (
    id INT PRIMARY KEY AUTO_INCREMENT COMMENT '自增ID',
    video_id INT UNIQUE NOT NULL COMMENT '视频ID',
    author INT NOT NULL COMMENT '创作者ID',
    tag VARCHAR(16) NOT NULL COMMENT '类别标签',
    duration INT NOT NULL COMMENT '视频时长(秒数)',
    release_time datetime NOT NULL COMMENT '发布时间'
)CHARACTER SET utf8 COLLATE utf8_bin;

INSERT INTO tb_user_video_log(uid, video_id, start_time, end_time, if_follow, if_like, if_retweet, comment_id) VALUES
   (101, 2001, '2021-10-01 10:00:00', '2021-10-01 10:00:20', 0, 1, 1, null)
  ,(102, 2001, '2021-10-01 10:00:00', '2021-10-01 10:00:15', 0, 0, 1, null)
  ,(103, 2001, '2021-10-01 11:00:50', '2021-10-01 11:01:15', 0, 1, 0, 1732526)
  ,(102, 2002, '2021-09-10 11:00:00', '2021-09-10 11:00:30', 1, 0, 1, null)
  ,(103, 2002, '2021-10-01 10:59:05', '2021-10-01 11:00:05', 1, 0, 0, null);

INSERT INTO tb_video_info(video_id, author, tag, duration, release_time) VALUES
   (2001, 901, '影视', 30, '2021-01-01 7:00:00')
  ,(2002, 901, '美食', 60, '2021-01-01 7:00:00')
  ,(2003, 902, '旅游', 90, '2020-01-01 7:00:00');
复制
输出：
影视|2|0.667
美食|1|0.500
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
- `tag`
- `retweet_cnt`
- `retweet_rate`

## SQLite 说明
本关卡运行在浏览器内置 SQLite 环境中，原题的 MySQL 建表语句已转换为 SQLite 可执行语法。日期时间差可以使用 `julianday()`、`date()`、`strftime()` 等 SQLite 函数实现。

## 参考 SQL（MySQL 原题写法）
```sql
select b.tag,sum(a.if_retweet) as retweet_cnt,round(sum(a.if_retweet)/count(*),3) as retweet_rate
from tb_user_video_log a left join tb_video_info b on a.video_id = b.video_id
where timestampdiff(day,date(a.start_time),(select max(start_time) from tb_user_video_log))<=29
group by b.tag
order by retweet_rate desc
```
