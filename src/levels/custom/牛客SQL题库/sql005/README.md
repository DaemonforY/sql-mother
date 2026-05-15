# 国庆期间每类视频点赞量和转发量

## 题目
描述

用户-视频互动表tb_user_video_log

（uid-用户ID, video_id-视频ID, start_time-开始观看时间, end_time-结束观看时间, if_follow-是否关注, if_like-是否点赞, if_retweet-是否转发, comment_id-评论ID）






短视频信息表tb_video_info

（video_id-视频ID, author-创作者ID, tag-类别标签, duration-视频时长, release_time-发布时间）



问题：统计2021年国庆头3天每类视频每天的近一周总点赞量和一周内最大单天转发量，结果按视频类别降序、日期升序排序。假设数据库中数据足够多，至少每个类别下国庆头3天及之前一周的每天都有播放记录。


输出示例：
示例数据的输出结果如下
解释：
由表tb_user_video_log里的数据可得只有旅游类视频的播放，2021年9月25到10月3日每天的点赞量和转发量如下：


因此国庆头3天（10.01~10.03）里10.01的近7天（9.25~10.01）总点赞量为5次，单天最大转发量为2次（9月25那天最大）；同理可得10.02和10.03的两个指标。
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
   (101, 2001, '2021-09-24 10:00:00', '2021-09-24 10:00:20', 1, 1, 0, null)
  ,(105, 2002, '2021-09-25 11:00:00', '2021-09-25 11:00:30', 0, 0, 1, null)
  ,(102, 2002, '2021-09-25 11:00:00', '2021-09-25 11:00:30', 1, 1, 1, null)
  ,(101, 2002, '2021-09-26 11:00:00', '2021-09-26 11:00:30', 1, 0, 1, null)
  ,(101, 2002, '2021-09-27 11:00:00', '2021-09-27 11:00:30', 1, 1, 0, null)
  ,(102, 2002, '2021-09-28 11:00:00', '2021-09-28 11:00:30', 1, 0, 1, null)
  ,(103, 2002, '2021-09-29 11:00:00', '2021-09-29 11:00:30', 1, 0, 1, null)
  ,(102, 2002, '2021-09-30 11:00:00', '2021-09-30 11:00:30', 1, 1, 1, null)
  ,(101, 2001, '2021-10-01 10:00:00', '2021-10-01 10:00:20', 1, 1, 0, null)
  ,(102, 2001, '2021-10-01 10:00:00', '2021-10-01 10:00:15', 0, 0, 1, null)
  ,(103, 2001, '2021-10-01 11:00:50', '2021-10-01 11:01:15', 1, 1, 0, 1732526)
  ,(106, 2002, '2021-10-02 10:59:05', '2021-10-02 11:00:05', 2, 0, 1, null)
  ,(107, 2002, '2021-10-02 10:59:05', '2021-10-02 11:00:05', 1, 0, 1, null)
  ,(108, 2002, '2021-10-02 10:59:05', '2021-10-02 11:00:05', 1, 1, 1, null)
  ,(109, 2002, '2021-10-03 10:59:05', '2021-10-03 11:00:05', 0, 1, 0, null);

INSERT INTO tb_video_info(video_id, author, tag, duration, release_time) VALUES
   (2001, 901, '旅游', 30, '2020-01-01 7:00:00')
  ,(2002, 901, '旅游', 60, '2021-01-01 7:00:00')
  ,(2003, 902, '影视', 90, '2020-01-01 7:00:00')
  ,(2004, 902, '美女', 90, '2020-01-01 8:00:00');
复制
输出：
旅游|2021-10-01|5|2
旅游|2021-10-02|5|3
旅游|2021-10-03|6|3
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
- `dt`
- `sum_like_cnt_7d`
- `max_retweet_cnt_7d`

## SQLite 说明
本关卡运行在浏览器内置 SQLite 环境中，原题的 MySQL 建表语句已转换为 SQLite 可执行语法。日期时间差可以使用 `julianday()`、`date()`、`strftime()` 等 SQLite 函数实现。

## 参考 SQL（MySQL 原题写法）
```sql
select *
from(SELECT
    tag,
    dt,
    -- 基于每天汇总后的数据进行 7 天滑动计算
    SUM(daily_likes) OVER (
        PARTITION BY
            tag
        ORDER BY
            dt ROWS BETWEEN 6 PRECEDING
            AND CURRENT ROW
    ) as sum_like_cnt_7d,
    MAX(daily_retweets) OVER (
        PARTITION BY
            tag
        ORDER BY
            dt ROWS BETWEEN 6 PRECEDING
            AND CURRENT ROW
    ) as max_retweet_cnt_7d
FROM
    (
        -- 第一层：先按 tag 和日期分组，计算出每一天的总计
        SELECT
            a.tag,
            DATE_FORMAT(b.start_time, '%Y-%m-%d') as dt,
            SUM(b.if_like) as daily_likes,
            SUM(b.if_retweet) as daily_retweets
        FROM
            tb_video_info a
            LEFT JOIN tb_user_video_log b USING (video_id)
        GROUP BY
            a.tag,
            dt
    ) t_base -- 子查询别名
) t
where dt between '2021-10-01' and '2021-10-03'
ORDER BY
    tag desc,
    dt;
```
