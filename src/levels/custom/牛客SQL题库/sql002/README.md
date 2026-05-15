# 平均播放进度大于60%的视频类别

## 题目
描述
用户-视频互动表tb_user_video_log


（uid-用户ID, video_id-视频ID, start_time-开始观看时间, end_time-结束观看时间, if_follow-是否关注, if_like-是否点赞, if_retweet-是否转发, comment_id-评论ID）




短视频信息表tb_video_info
（video_id-视频ID, author-创作者ID, tag-类别标签, duration-视频时长, release_time-发布时间）




问题：计算各类视频的平均播放进度，将进度大于60%的类别输出。


注：
播放进度=播放时长÷视频时长*100%，当播放时长大于视频时长时，播放进度均记为100%。
结果保留两位小数，并按播放进度倒序排序。


输出示例：
示例数据的输出结果如下：
解释：
影视类视频2001被用户101、102、103看过，播放进度分别为：30秒（100%）、21秒（70%）、30秒（100%），平均播放进度为90.00%（保留两位小数）；

美食类视频2002被用户102、103看过，播放进度分别为：30秒（50%）、60秒（100%），平均播放进度为75.00%（保留两位小数）；
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
  (101, 2001, '2021-10-01 10:00:00', '2021-10-01 10:00:30', 0, 1, 1, null),
  (102, 2001, '2021-10-01 10:00:00', '2021-10-01 10:00:21', 0, 0, 1, null),
  (103, 2001, '2021-10-01 11:00:50', '2021-10-01 11:01:20', 0, 1, 0, 1732526),
  (102, 2002, '2021-10-01 11:00:00', '2021-10-01 11:00:30', 1, 0, 1, null),
  (103, 2002, '2021-10-01 10:59:05', '2021-10-01 11:00:05', 1, 0, 1, null);

INSERT INTO tb_video_info(video_id, author, tag, duration, release_time) VALUES
  (2001, 901, '影视', 30, '2021-01-01 7:00:00'),
  (2002, 901, '美食', 60, '2021-01-01 7:00:00'),
  (2003, 902, '旅游', 90, '2020-01-01 7:00:00');
复制
输出：
影视|90.00%
美食|75.00%
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
- `avg_play_progress`

## SQLite 说明
本关卡运行在浏览器内置 SQLite 环境中，原题的 MySQL 建表语句已转换为 SQLite 可执行语法。日期时间差可以使用 `julianday()`、`date()`、`strftime()` 等 SQLite 函数实现。

## 参考 SQL（MySQL 原题写法）
```sql
SELECT tv.tag, CONCAT(ROUND(AVG(IF(TIMESTAMPDIFF(SECOND,tu.start_time,tu.end_time)>tv.duration,tv.duration,TIMESTAMPDIFF(SECOND,tu.start_time,tu.end_time))/tv.duration*100),2),'%') AS avg_play_progress FROM tb_user_video_log tu JOIN tb_video_info tv ON tu.video_id = tv.video_id GROUP BY tv.tag HAVING SUBSTRING_INDEX(avg_play_progress,'%',1) > 60ORDER BY avg_play_progress DESC
```
