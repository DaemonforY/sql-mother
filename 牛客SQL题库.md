

# 各个视频的平均完播率_牛客题霸_牛客网

## 题目

SQL156 各个视频的平均完播率

描述
用户-视频互动表tb_user_video_log


（uid-用户ID, video_id-视频ID, start_time-开始观看时间, end_time-结束观看时间, if_follow-是否关注, if_like-是否点赞, if_retweet-是否转发, comment_id-评论ID）


短视频信息表tb_video_info


（video_id-视频ID, author-创作者ID, tag-类别标签, duration-视频时长（秒）, release_time-发布时间）


问题：计算2021年里有播放记录的每个视频的完播率(结果保留三位小数)，并按完播率降序排序(注意：计算的是2021年的数据)
注：视频完播率是指完成播放次数占总播放次数的比例。简单起见，结束观看时间与开始播放时间的差>=视频时长时，视为完成播放。


输出示例：
示例数据的结果如下：



解释：
视频2001在2021年10月有3次播放记录，观看时长分别为30秒、24秒、34秒，视频时长30秒，因此有两次是被认为完成播放了的，故完播率为0.667；
视频2002在2021年9月和10月共2次播放记录，观看时长分别为42秒、30秒，视频时长60秒，故完播率为0.000。
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
  (102, 2001, '2021-10-01 10:00:00', '2021-10-01 10:00:24', 0, 0, 1, null),
  (103, 2001, '2021-10-01 11:00:00', '2021-10-01 11:00:34', 0, 1, 0, 1732526),
  (101, 2002, '2021-09-01 10:00:00', '2021-09-01 10:00:42', 1, 0, 1, null),
  (102, 2002, '2021-10-01 11:00:00', '2021-10-01 11:00:30', 1, 0, 1, null);

INSERT INTO tb_video_info(video_id, author, tag, duration, release_time) VALUES
  (2001, 901, '影视', 30, '2021-01-01 7:00:00'),
  (2002, 901, '美食', 60, '2021-01-01 7:00:00'),
  (2003, 902, '旅游', 90, '2021-01-01 7:00:00');
复制
输出：
2001|0.667
2002|0.000
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

## SQL代码

```sql
SELECT tu.video_id,round(avg(CASE WHEN TIMESTAMPDIFF(SECOND,tu.start_time,tu.end_time)>=tv.duration THEN 1 ELSE 0 END),3) AS avg_comp_play_rate FROM tb_user_video_log tu JOIN tb_video_info tv on tu.video_id = tv.video_id WHERE YEAR(start_time) = 2021 and YEAR(end_time) = 2021GROUP BY tu.video_id ORDER BY avg_comp_play_rate DESC
```

---



# 平均播放进度大于60%的视频类别_牛客题霸_牛客网

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

## SQL代码

```sql
SELECT tv.tag, CONCAT(ROUND(AVG(IF(TIMESTAMPDIFF(SECOND,tu.start_time,tu.end_time)>tv.duration,tv.duration,TIMESTAMPDIFF(SECOND,tu.start_time,tu.end_time))/tv.duration*100),2),'%') AS avg_play_progress FROM tb_user_video_log tu JOIN tb_video_info tv ON tu.video_id = tv.video_id GROUP BY tv.tag HAVING SUBSTRING_INDEX(avg_play_progress,'%',1) > 60ORDER BY avg_play_progress DESC
```

---



# 每类视频近一个月的转发量率_牛客题霸_牛客网

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

## SQL代码

```sql
select b.tag,sum(a.if_retweet) as retweet_cnt,round(sum(a.if_retweet)/count(*),3) as retweet_rate
from tb_user_video_log a left join tb_video_info b on a.video_id = b.video_id
where timestampdiff(day,date(a.start_time),(select max(start_time) from tb_user_video_log))<=29
group by b.tag
order by retweet_rate desc
```

---



# 每个创作者每月的涨粉率及截止当前的总粉丝量_牛客题霸_牛客网

## 题目

描述

用户-视频互动表tb_user_video_log

id	uid	video_id	start_time	end_time	if_follow	if_like	if_retweet	comment_id
1	101	2001	2021-09-01 10:00:00	2021-09-01 10:00:20
	0	1	1	NULL
2	105
	2002	2021-09-10 11:00:00
	2021-09-10 11:00:30
	1	0	1	NULL
3	101
	2001	2021-10-01 10:00:00
	2021-10-01 10:00:20
	1	1	1	NULL

4	102
	2001	2021-10-01 10:00:00
	2021-10-01 10:00:15
	0	0	1	NULL
5	103
	2001	2021-10-01 11:00:50
	2021-10-01 11:01:15
	1	1	0	1732526
6	106	2002	2021-10-01 10:59:05
	2021-10-01 11:00:05
	2	0	0	NULL

（uid-用户ID, video_id-视频ID, start_time-开始观看时间, end_time-结束观看时间, if_follow-是否关注, if_like-是否点赞, if_retweet-是否转发, comment_id-评论ID）




短视频信息表tb_video_info

id	video_id	author	tag	duration	release_time
1	2001	901	影视	30	2021-01-01 07:00:00
2	2002
	901
	美食	60	2021-01-01 07:00:00

3	2003
	902
	旅游	90	2020-01-01 07:00:00

4	2004	902	美女	90	2020-01-01 08:00:00

（video_id-视频ID, author-创作者ID, tag-类别标签, duration-视频时长, release_time-发布时间）



问题：计算2021年里每个创作者每月的涨粉率及截止当月的总粉丝量


注：
涨粉率=(加粉量 - 掉粉量) / 播放量。结果按创作者ID、总粉丝量升序排序。
if_follow-是否关注为1表示用户观看视频中关注了视频创作者，为0表示此次互动前后关注状态未发生变化，为2表示本次观看过程中取消了关注。
输出示例：
示例数据的输出结果如下

author	month	fans_growth_rate
	total_fans
901	2021-09	0.500	1
901	2021-10
	0.250	2

解释：
示例数据中表tb_user_video_log里只有视频2001和2002的播放记录，都来自创作者901，播放时间在2021年9月和10月；其中9月里加粉量为1，掉粉量为0，播放量为2，因此涨粉率为0.500（保留3位小数）；其中10月里加粉量为2，掉粉量为1，播放量为4，因此涨粉率为0.250，截止当前总粉丝数为2。
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
   (101, 2001, '2021-09-01 10:00:00', '2021-09-01 10:00:20', 0, 1, 1, null)
  ,(105, 2002, '2021-09-10 11:00:00', '2021-09-10 11:00:30', 1, 0, 1, null)
  ,(101, 2001, '2021-10-01 10:00:00', '2021-10-01 10:00:20', 1, 1, 1, null)
  ,(102, 2001, '2021-10-01 10:00:00', '2021-10-01 10:00:15', 0, 0, 1, null)
  ,(103, 2001, '2021-10-01 11:00:50', '2021-10-01 11:01:15', 1, 1, 0, 1732526)
  ,(106, 2002, '2021-10-01 10:59:05', '2021-10-01 11:00:05', 2, 0, 0, null);

INSERT INTO tb_video_info(video_id, author, tag, duration, release_time) VALUES
   (2001, 901, '影视', 30, '2021-01-01 7:00:00')
  ,(2002, 901, '影视', 60, '2021-01-01 7:00:00')
  ,(2003, 902, '旅游', 90, '2020-01-01 7:00:00')
  ,(2004, 902, '美女', 90, '2020-01-01 8:00:00');
复制
输出：
901|2021-09|0.500|1
901|2021-10|0.250|2
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

## SQL代码

```sql
select    b.author,    date_format(a.start_time, "%Y-%m") as month,    round((sum(if(a.if_follow = 1, 1, 0)) - sum(if(a.if_follow = 2, 1, 0))) / count(a.if_follow),3) as fans_growth_rate,    sum(sum(case when if_follow=2 then -1 else if_follow end)) over(partition by author order by date_format(a.start_time, "%Y-%m")) as total_fans_from    tb_user_video_log a    join tb_video_info b on a.video_id = b.video_idwhere year(a.start_time)=2021    group by    b.author,    monthorder by author,total_fans
```

---



# 国庆期间每类视频点赞量和转发量_牛客题霸_牛客网

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

## SQL代码

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

---



# 近一个月发布的视频中热度最高的top3视频_牛客题霸_牛客网

## 题目

描述

现有用户-视频互动表tb_user_video_log

（uid-用户ID, video_id-视频ID, start_time-开始观看时间, end_time-结束观看时间, if_follow-是否关注, if_like-是否点赞, if_retweet-是否转发, comment_id-评论ID）





短视频信息表tb_video_info

（video_id-视频ID, author-创作者ID, tag-类别标签, duration-视频时长, release_time-发布时间）



问题：找出近一个月发布的视频中热度最高的top3视频。


注：
热度=(a*视频完播率+b*点赞数+c*评论数+d*转发数)*新鲜度；
新鲜度=1/(最近无播放天数+1)；
当前配置的参数a,b,c,d分别为100、5、3、2。
最近播放日期以end_time-结束观看时间为准，假设为T，则最近一个月按[T-29, T]闭区间统计。
结果中热度保留为整数，并按热度降序排序。


输出示例：
示例数据的输出结果如下


解释：
最近播放日期为2021-10-03，记作当天日期；近一个月（2021-09-04及之后）发布的视频有2001、2002、2003、2004，不过2004暂时还没有播放记录；
视频2001完播率1.0（被播放次数4次，完成播放4次），被点赞3次，评论1次，转发2次，最近无播放天数为0，因此热度为：(100*1.0+5*3+3*1+2*2)/(0+1)=122
同理，视频2003完播率0，被点赞数1，评论和转发均为0，最近无播放天数为3，因此热度为：(100*0+5*1+3*0+2*0)/(3+1)=1（1.2保留为整数）。
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
   (101, 2001, '2021-09-24 10:00:00', '2021-09-24 10:00:30', 1, 1, 1, null)
  ,(101, 2001, '2021-10-01 10:00:00', '2021-10-01 10:00:31', 1, 1, 0, null)
  ,(102, 2001, '2021-10-01 10:00:00', '2021-10-01 10:00:35', 0, 0, 1, null)
  ,(103, 2001, '2021-10-03 11:00:50', '2021-10-03 11:01:35', 1, 1, 0, 1732526)
  ,(106, 2002, '2021-10-02 10:59:05', '2021-10-02 11:00:04', 2, 0, 1, null)
  ,(107, 2002, '2021-10-02 10:59:05', '2021-10-02 11:00:06', 1, 0, 0, null)
  ,(108, 2002, '2021-10-02 10:59:05', '2021-10-02 11:00:05', 1, 1, 1, null)
  ,(109, 2002, '2021-10-03 10:59:05', '2021-10-03 11:00:01', 0, 1, 0, null)
  ,(105, 2002, '2021-09-25 11:00:00', '2021-09-25 11:00:30', 1, 0, 1, null)
  ,(101, 2003, '2021-09-26 11:00:00', '2021-09-26 11:00:30', 1, 0, 0, null)
  ,(101, 2003, '2021-09-30 11:00:00', '2021-09-30 11:00:30', 1, 1, 0, null);

INSERT INTO tb_video_info(video_id, author, tag, duration, release_time) VALUES
   (2001, 901, '旅游', 30, '2021-09-05 7:00:00')
  ,(2002, 901, '旅游', 60, '2021-09-05 7:00:00')
  ,(2003, 902, '影视', 90, '2021-09-05 7:00:00')
  ,(2004, 902, '影视', 90, '2021-09-05 8:00:00');
复制
输出：
2001|122
2002|56
2003|1
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

## SQL代码

```sql
select t.video_id
, round((100*t.all_rate + 5*t.like_cnt + 3*t.comment_cnt + 2*t.retween_cnt)
        /(t.f+1), 0) hot_index
from
(
    select vi.video_id
    , avg(if (timestampdiff(second, uv.start_time, uv.end_time) >= vi.duration, 1, 0)) all_rate
    , sum(if_like) like_cnt
    , sum(if_retweet) retween_cnt
    , count(comment_id) comment_cnt
    , DATEDIFF((select max(end_time) from tb_user_video_log), max(end_time)) f
    from tb_video_info vi
    join tb_user_video_log uv
    on vi.video_id = uv.video_id
    where DATEDIFF((select max(end_time) from tb_user_video_log), vi.release_time) <= 29
    group by vi.video_id
) t
order by hot_index desc
limit 3;
```

---



# 2021年11月每天的人均浏览文章时长_牛客题霸_牛客网

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

## SQL代码

```sql
SELECT DATE(in_time) AS dt , ROUND(SUM(TIMESTAMPDIFF(SECOND,in_time,out_time))/COUNT(DISTINCT uid),1) AS avg_viiew_len_sec FROM tb_user_log WHERE YEAR(in_time) = 2021 AND MONTH(in_time) = 11 AND artical_id != 0GROUP BY dt ORDER BY avg_viiew_len_sec ASC
```

---



# 每篇文章同一时刻最大在看人数_牛客题霸_牛客网

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

## SQL代码

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

---



# 2021年11月每天新用户的次日留存率_牛客题霸_牛客网

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

## SQL代码

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

---



# 统计活跃间隔对用户分级结果_牛客题霸_牛客网

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

## SQL代码

```sql
select case when datediff(now_time,max_time)<=6 and datediff(now_time,min_time)<=6 then '新晋用户' when datediff(now_time,max_time)<=6 and datediff(now_time,min_time)>6 then '忠实用户' when datediff(now_time,max_time)>29 then '流失用户' when datediff(now_time,max_time)>6 then '沉睡用户' end as user_grade, ROUND(COUNT(DISTINCT uid) / (SELECT COUNT(DISTINCT uid) FROM tb_user_log), 2) AS ratio from (select *, max(date(in_time)) over() as now_time, max(date(in_time)) over(partition by uid) as max_time , min(date(in_time)) over(partition by uid) as min_time from tb_user_log) dt group by user_grade order by ratio desc
```

---



# 每天的日活数及新用户占比_牛客题霸_牛客网

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

## SQL代码

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

---



# 连续签到领金币_牛客题霸_牛客网

## 题目

描述

用户行为日志表tb_user_log

id	uid	artical_id	in_time	out_time	sign_in
1	101	0	2021-07-07 10:00:00	2021-07-07 10:00:09	1
2	101	0
	2021-07-08 10:00:00	2021-07-08 10:00:09	1
3	101	0	2021-07-09 10:00:00	2021-07-09 10:00:42	1
4	101	0	
2021-07-10 10:00:00
	2021-07-10 10:00:09	1
5	101	0
	2021-07-11 23:59:55	2021-07-11 23:59:59
	1
6
	101	0	2021-07-12 10:00:28
	2021-07-12 10:00:50
	1
7	101	0	2021-07-13 10:00:28
	
2021-07-13 10:00:50
	1
8
	102	0	2021-10-01 10:00:28	2021-10-01 10:00:50
	1
9
	102	0	2021-10-02 10:00:01	2021-10-02 10:01:50
	1
10	102	0
	2021-10-03 10:00:55	2021-10-03 11:00:59	1
11
	102	0
	2021-10-04 10:00:45
	2021-10-04 11:00:55
	0
12	102	0
	2021-10-05 10:00:53
	2021-10-05 11:00:59
	1
13	102	0
	2021-10-06 10:00:45
	2021-10-06 11:00:55
	1
（uid-用户ID, artical_id-文章ID, in_time-进入时间, out_time-离开时间, sign_in-是否签到）


场景逻辑说明：
artical_id-文章ID代表用户浏览的文章的ID，特殊情况artical_id-文章ID为0表示用户在非文章内容页（比如App内的列表页、活动页等）。注意：只有artical_id为0时sign_in值才有效。
从2021年7月7日0点开始，用户每天签到可以领1金币，并可以开始累积签到天数，连续签到的第3、7天分别可额外领2、6金币。
每连续签到7天后重新累积签到天数（即重置签到天数：连续第8天签到时记为新的一轮签到的第一天，领1金币）
问题：计算每个用户2021年7月以来每月获得的金币数（该活动到10月底结束，11月1日开始的签到不再获得金币）。结果按月份、ID升序排序。


注：如果签到记录的in_time-进入时间和out_time-离开时间跨天了，也只记作in_time对应的日期签到了。


输出示例：
示例数据的输出结果如下：

uid	month	coin
101	202107	15
102	202110	7

解释：
101在活动期内连续签到了7天，因此获得1*7+2+6=15金币；
102在10.01~10.03连续签到3天获得5金币
10.04断签了，10.05~10.06连续签到2天获得2金币，共得到7金币。
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
  (101, 0, '2021-07-07 10:00:00', '2021-07-07 10:00:09', 1),
  (101, 0, '2021-07-08 10:00:00', '2021-07-08 10:00:09', 1),
  (101, 0, '2021-07-09 10:00:00', '2021-07-09 10:00:42', 1),
  (101, 0, '2021-07-10 10:00:00', '2021-07-10 10:00:09', 1),
  (101, 0, '2021-07-11 23:59:55', '2021-07-11 23:59:59', 1),
  (101, 0, '2021-07-12 10:00:28', '2021-07-12 10:00:50', 1),
  (101, 0, '2021-07-13 10:00:28', '2021-07-13 10:00:50', 1),
  (102, 0, '2021-10-01 10:00:28', '2021-10-01 10:00:50', 1),
  (102, 0, '2021-10-02 10:00:01', '2021-10-02 10:01:50', 1),
  (102, 0, '2021-10-03 11:00:55', '2021-10-03 11:00:59', 1),
  (102, 0, '2021-10-04 11:00:45', '2021-10-04 11:00:55', 0),
  (102, 0, '2021-10-05 11:00:53', '2021-10-05 11:00:59', 1),
  (102, 0, '2021-10-06 11:00:45', '2021-10-06 11:00:55', 1);
复制
输出：
101|202107|15
102|202110|7
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

## SQL代码

```sql
with a as( -- 取出有效记录     SELECT distinct uid,date(in_time) as dt -- 同一用户一天可能有多条日志记录，去重一下     FROM tb_user_log     where artical_id = 0 and sign_in = 1 and date(in_time) between '2021-07-07' and '2021-10-31') ,b as( -- 得到组内分组标签     select *,         adddate(dt,INTERVAL -              rank() over (partition by uid order by dt)  -- 每个用户，把日期标上序号             day) as group_tag  -- 用日期减序号,得到连续性分组     from a ) ,c as( -- 得出每天赚的金币数     select uid,date_format(dt,'%Y%m') as month,         case rank() over(partition by uid,group_tag order by dt)%7  -- 按连续性分组加序号，然后除以7求余数             when 3 then 3  -- 每到第三天3枚             when 0 then 7  -- 每到第七天7枚             else 1 -- 其他天数1枚         end as coin_eachday     from b ) select uid,month,sum(coin_eachday) as coin from c group by uid,month order by month,uid
```

---



# 计算商城中2021年每月的GMV_牛客题霸_牛客网

## 题目

描述

现有订单总表tb_order_overall



（order_id-订单号, uid-用户ID, event_time-下单时间, total_amount-订单总金额, total_cnt-订单商品总件数, status-订单状态）




场景逻辑说明：
用户将购物车中多件商品一起下单时，订单总表会生成一个订单（但此时未付款，status-订单状态为0，表示待付款）；
当用户支付完成时，在订单总表修改对应订单记录的status-订单状态为1，表示已付款；
若用户退货退款，在订单总表生成一条交易总金额为负值的记录（表示退款金额，订单号为退款单号，status-订单状态为2表示已退款）。


问题：请计算商城中2021年每月的GMV，输出GMV大于10w的每月GMV，值保留到整数。


注：GMV为已付款订单和未付款订单两者之和。结果按GMV升序排序。



输出示例：
示例数据输出如下：


解释：
2021年10月有3笔已付款的订单，1笔未付款订单，总交易金额为109800；2021年11月有2笔已付款订单，1笔未付款订单，
总交易金额为111900（还有1笔退款订单由于已计算了付款的订单金额，无需计算在GMV中）。
示例1
输入：
DROP TABLE IF EXISTS tb_order_overall;
CREATE TABLE tb_order_overall (
    id INT PRIMARY KEY AUTO_INCREMENT COMMENT '自增ID',
    order_id INT NOT NULL COMMENT '订单号',
    uid INT NOT NULL COMMENT '用户ID',
    event_time datetime COMMENT '下单时间',
    total_amount DECIMAL NOT NULL COMMENT '订单总金额',
    total_cnt INT NOT NULL COMMENT '订单商品总件数',
    `status` TINYINT NOT NULL COMMENT '订单状态'
) CHARACTER SET utf8 COLLATE utf8_bin;

INSERT INTO tb_order_overall(order_id, uid, event_time, total_amount, total_cnt, `status`) VALUES
  (301001, 101, '2021-10-01 10:00:00', 15900, 2, 1),
  (301002, 101, '2021-10-01 11:00:00', 15900, 2, 1),
  (301003, 102, '2021-10-02 10:00:00', 34500, 8, 0),
  (301004, 103, '2021-10-12 10:00:00', 43500, 9, 1),
  (301005, 105, '2021-11-01 10:00:00', 31900, 7, 1),
  (301006, 102, '2021-11-02 10:00:00', 24500, 6, 1),
  (391007, 102, '2021-11-03 10:00:00', -24500, 6, 2),
  (301008, 104, '2021-11-04 10:00:00', 55500, 12, 0);
复制
输出：
2021-10|109800
2021-11|111900
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

## SQL代码

```sql
SELECT SUBSTRING_INDEX(event_time,'-',2) AS month,
    SUM(total_amount) AS GMV
FROM tb_order_overall
WHERE status!=2 AND YEAR(event_time) = 2021
GROUP BY month
HAVING GMV > 100000
ORDER BY GMV ASC
```

---



# 统计2021年10月每个退货率不大于0.5的商品各项指标_牛客题霸_牛客网

## 题目

描述

现有用户对展示的商品行为表tb_user_event

id	uid	product_id	event_time	if_click	if_cart	if_payment	if_refund
1	101	8001	2021-10-01 10:00:00	0	0	0	0
2	102	8001
	2021-10-01 10:00:00
	1	0	0	0
3	103	8001
	2021-10-01 10:00:00
	1	1	0	0
4	104	8001
	2021-10-02 10:00:00
	1	1	1	0
5	105	8001
	2021-10-02 10:00:00
	1	1	1	0
6	101	8002
	2021-10-03 10:00:00
	1	1	1	0
7	109	8001
	2021-10-04 10:00:00
	1	1	1	1
（uid-用户ID, product_id-商品ID, event_time-行为时间, if_click-是否点击, if_cart-是否加购物车, if_payment-是否付款, if_refund-是否退货退款）



问题：请统计2021年10月每个有展示记录的退货率不大于0.5的商品各项指标，


注：
商品点展比=点击数÷展示数；
加购率=加购数÷点击数；
成单率=付款数÷加购数；退货率=退款数÷付款数，
当分母为0时整体结果记为0，结果中各项指标保留3位小数，并按商品ID升序排序。


输出示例：
示例数据的输出结果如下

product_id	ctr	cart_rate	payment_rate	refund_rate
8001	0.833	0.800	0.750	0.333
8002	1.000	1.000	1.000	0.000

解释：
在2021年10月商品8001被展示了6次，点击了5次，加购了4次，付款了3次，退款了1次，因此点击率为5/6=0.833，加购率为4/5=0.800，
成单率为3/4=0.750，退货率为1/3=0.333（保留3位小数）；
示例1
输入：
DROP TABLE IF EXISTS tb_user_event;
CREATE TABLE tb_user_event (
    id INT PRIMARY KEY AUTO_INCREMENT COMMENT '自增ID',
    uid INT NOT NULL COMMENT '用户ID',
    product_id INT NOT NULL COMMENT '商品ID',
    event_time datetime COMMENT '行为时间',
    if_click TINYINT COMMENT '是否点击',
    if_cart TINYINT COMMENT '是否加购物车',
    if_payment TINYINT COMMENT '是否付款',
    if_refund TINYINT COMMENT '是否退货退款'
) CHARACTER SET utf8 COLLATE utf8_bin;

INSERT INTO tb_user_event(uid, product_id, event_time, if_click, if_cart, if_payment, if_refund) VALUES
  (101, 8001, '2021-10-01 10:00:00', 0, 0, 0, 0),
  (102, 8001, '2021-10-01 10:00:00', 1, 0, 0, 0),
  (103, 8001, '2021-10-01 10:00:00', 1, 1, 0, 0),
  (104, 8001, '2021-10-02 10:00:00', 1, 1, 1, 0),
  (105, 8001, '2021-10-02 10:00:00', 1, 1, 1, 0),
  (101, 8002, '2021-10-03 10:00:00', 1, 1, 1, 0),
  (109, 8001, '2021-10-04 10:00:00', 1, 1, 1, 1);
复制
输出：
8001|0.833|0.800|0.750|0.333
8002|1.000|1.000|1.000|0.000
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

## SQL代码

```sql
select product_id, round(sum(if_click)/count(product_id),3) as ctr, round(if(sum(if_click)=0,0,sum(if_cart)/sum(if_click)),3) as cart_rate, round(if(sum(if_cart)=0,0,sum(if_payment)/sum(if_cart)),3) as payment_rate, round(if(sum(if_payment)=0,0,sum(if_refund)/sum(if_payment)),3) as refund_rate from tb_user_event where year(event_time)=2021 and month(event_time)= 10group by product_id having refund_rate<=0.5000order by product_id
```

---



# 某店铺的各商品毛利率及店铺整体毛利率_牛客题霸_牛客网

## 题目

描述

商品信息表tb_product_info



（product_id-商品ID, shop_id-店铺ID, tag-商品类别标签, in_price-进货价格, quantity-进货数量, release_time-上架时间）






订单总表tb_order_overall



（order_id-订单号, uid-用户ID, event_time-下单时间, total_amount-订单总金额, total_cnt-订单商品总件数, status-订单状态）




订单明细表tb_order_detail


（order_id-订单号, product_id-商品ID, price-商品单价, cnt-下单数量）





场景逻辑说明：

用户将购物车中多件商品一起下单时，订单总表会生成一个订单（但此时未付款，status-订单状态为0表示待付款），在订单明细表生成该订单中每个商品的信息；

当用户支付完成时，在订单总表修改对应订单记录的status-订单状态为1表示已付款；

若用户退货退款，在订单总表生成一条交易总金额为负值的记录（表示退款金额，订单号为退款单号，status-订单状态为2表示已退款）。



问题：请计算2021年10月以来店铺901中商品毛利率大于24.9%的商品信息及该店铺整体毛利率。


注：商品毛利率=(1-进价/平均单件售价)*100%；
       店铺毛利率=(1-总进价成本/总销售收入)*100%。
       结果先输出店铺毛利率，再按商品ID升序输出各商品毛利率，均保留1位小数。


输出示例：
示例数据的输出结果如下：

解释：
店铺901有两件商品8001和8003；8001售出了3件，销售总额为25500，进价总额为18000，毛利率为1-18000/25500=29.4%，8003售出了1件，售价为18000，进价为12000，毛利率为33.3%；
店铺卖出的这4件商品总销售额为43500，总进价为30000，毛利率为1-30000/43500=31.0%
示例1
输入：
DROP TABLE IF EXISTS tb_order_overall;
CREATE TABLE tb_order_overall (
    id INT PRIMARY KEY AUTO_INCREMENT COMMENT '自增ID',
    order_id INT NOT NULL COMMENT '订单号',
    uid INT NOT NULL COMMENT '用户ID',
    event_time datetime COMMENT '下单时间',
    total_amount DECIMAL NOT NULL COMMENT '订单总金额',
    total_cnt INT NOT NULL COMMENT '订单商品总件数',
    `status` TINYINT NOT NULL COMMENT '订单状态'
) CHARACTER SET utf8 COLLATE utf8_bin;

INSERT INTO tb_order_overall(order_id, uid, event_time, total_amount, total_cnt, `status`) VALUES
  (301001, 101, '2021-10-01 10:00:00', 30000, 3, 1),
  (301002, 102, '2021-10-01 11:00:00', 23900, 2, 1),
  (301003, 103, '2021-10-02 10:00:00', 31000, 2, 1);

DROP TABLE IF EXISTS tb_product_info;
CREATE TABLE tb_product_info (
    id INT PRIMARY KEY AUTO_INCREMENT COMMENT '自增ID',
    product_id INT NOT NULL COMMENT '商品ID',
    shop_id INT NOT NULL COMMENT '店铺ID',
    tag VARCHAR(12) COMMENT '商品类别标签',
    in_price DECIMAL NOT NULL COMMENT '进货价格',
    quantity INT NOT NULL COMMENT '进货数量',
    release_time datetime COMMENT '上架时间'
) CHARACTER SET utf8 COLLATE utf8_bin;

DROP TABLE IF EXISTS tb_order_detail;
CREATE TABLE tb_order_detail (
    id INT PRIMARY KEY AUTO_INCREMENT COMMENT '自增ID',
    order_id INT NOT NULL COMMENT '订单号',
    product_id INT NOT NULL COMMENT '商品ID',
    price DECIMAL NOT NULL COMMENT '商品单价',
    cnt INT NOT NULL COMMENT '下单数量'
) CHARACTER SET utf8 COLLATE utf8_bin;

INSERT INTO tb_product_info(product_id, shop_id, tag, in_price, quantity, release_time) VALUES
  (8001, 901, '家电', 6000, 100, '2020-01-01 10:00:00'),
  (8002, 902, '家电', 12000, 50, '2020-01-01 10:00:00'),
  (8003, 901, '3C数码', 12000, 50, '2020-01-01 10:00:00');

INSERT INTO tb_order_detail(order_id, product_id, price, cnt) VALUES
  (301001, 8001, 8500, 2),
  (301001, 8002, 15000, 1),
  (301002, 8001, 8500, 1),
  (301002, 8002, 16000, 1),
  (301003, 8002, 14000, 1),
  (301003, 8003, 18000, 1);
复制
输出：
店铺汇总|31.0%
8001|29.4%
8003|33.3%
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

## SQL代码

```sql
with a as  (select '店铺汇总' as product_id, concat(round((1-sum(in_price*cnt)/sum(price*cnt))*100,1),'%') as profit_rate from tb_order_overall join tb_order_detail using(order_id) join tb_product_info using(product_id) where date_format(event_time,'%Y%m')>='202110' and shop_id=901union all     (select product_id , concat(round((1-in_price/(sum(price*cnt)/sum(cnt)))*100,1),'%') as profit_rate     from tb_product_info join tb_order_detail using(product_id) join tb_order_overall using(order_id)     where date_format(event_time,'%Y%m')>='202110' and shop_id=901    group by in_price,product_id     having round((1-in_price/(sum(price*cnt)/sum(cnt)))*100,1)>24.9    order by product_id)) select * from a
```

---



# 零食类商品中复购率top3高的商品_牛客题霸_牛客网

## 题目

描述

商品信息表tb_product_info



（product_id-商品ID, shop_id-店铺ID, tag-商品类别标签, in_price-进货价格, quantity-进货数量, release_time-上架时间）





订单总表tb_order_overall



（order_id-订单号, uid-用户ID, event_time-下单时间, total_amount-订单总金额, total_cnt-订单商品总件数, status-订单状态）




订单明细表tb_order_detail


（order_id-订单号, product_id-商品ID, price-商品单价, cnt-下单数量）




场景逻辑说明：

用户将购物车中多件商品一起下单时，订单总表会生成一个订单（但此时未付款， status-订单状态-订单状态为0表示待付款），在订单明细表生成该订单中每个商品的信息；

当用户支付完成时，在订单总表修改对应订单记录的status-订单状态-订单状态为1表示已付款；

若用户退货退款，在订单总表生成一条交易总金额为负值的记录（表示退款金额，订单号为退款单号，订单状态为2表示已退款）。



问题：请统计零食类商品中复购率top3高的商品。


注：复购率指用户在一段时间内对某商品的重复购买比例，复购率越大，则反映出消费者对品牌的忠诚度就越高，也叫回头率
       此处我们定义：某商品复购率 = 近90天内购买它至少两次的人数 ÷ 购买它的总人数
       近90天指包含最大日期（记为当天）在内的近90天。结果中复购率保留3位小数，并按复购率倒序、商品ID升序排序


输出示例：

示例数据的输出结果如下：

解释：
商品8001、8002、8003都是零食类商品，8001只被用户102购买了两次，复购率1.000；
商品8002被101购买了两次，被105购买了1次，复购率0.500；
商品8003被102购买两次，被101和105各购买1次，复购率为0.333。
示例1
输入：
DROP TABLE IF EXISTS tb_order_overall;
CREATE TABLE tb_order_overall (
    id INT PRIMARY KEY AUTO_INCREMENT COMMENT '自增ID',
    order_id INT NOT NULL COMMENT '订单号',
    uid INT NOT NULL COMMENT '用户ID',
    event_time datetime COMMENT '下单时间',
    total_amount DECIMAL NOT NULL COMMENT '订单总金额',
    total_cnt INT NOT NULL COMMENT '订单商品总件数',
    `status` TINYINT NOT NULL COMMENT '订单状态'
) CHARACTER SET utf8 COLLATE utf8_bin;

DROP TABLE IF EXISTS tb_product_info;
CREATE TABLE tb_product_info (
    id INT PRIMARY KEY AUTO_INCREMENT COMMENT '自增ID',
    product_id INT NOT NULL COMMENT '商品ID',
    shop_id INT NOT NULL COMMENT '店铺ID',
    tag VARCHAR(12) COMMENT '商品类别标签',
    in_price DECIMAL NOT NULL COMMENT '进货价格',
    quantity INT NOT NULL COMMENT '进货数量',
    release_time datetime COMMENT '上架时间'
) CHARACTER SET utf8 COLLATE utf8_bin;

DROP TABLE IF EXISTS tb_order_detail;
CREATE TABLE tb_order_detail (
    id INT PRIMARY KEY AUTO_INCREMENT COMMENT '自增ID',
    order_id INT NOT NULL COMMENT '订单号',
    product_id INT NOT NULL COMMENT '商品ID',
    price DECIMAL NOT NULL COMMENT '商品单价',
    cnt INT NOT NULL COMMENT '下单数量'
) CHARACTER SET utf8 COLLATE utf8_bin;

INSERT INTO tb_product_info(product_id, shop_id, tag, in_price, quantity, release_time) VALUES
  (8001, 901, '零食', 60, 1000, '2020-01-01 10:00:00'),
  (8002, 901, '零食', 140, 500, '2020-01-01 10:00:00'),
  (8003, 901, '零食', 160, 500, '2020-01-01 10:00:00');

INSERT INTO tb_order_overall(order_id, uid, event_time, total_amount, total_cnt, `status`) VALUES
  (301001, 101, '2021-09-30 10:00:00', 140, 1, 1),
  (301002, 102, '2021-10-01 11:00:00', 235, 2, 1),
  (301011, 102, '2021-10-31 11:00:00', 250, 2, 1),
  (301003, 101, '2021-11-02 10:00:00', 300, 2, 1),
  (301013, 105, '2021-11-02 10:00:00', 300, 2, 1),
  (301005, 104, '2021-11-03 10:00:00', 170, 1, 1);

INSERT INTO tb_order_detail(order_id, product_id, price, cnt) VALUES
  (301001, 8002, 150, 1),
  (301011, 8003, 200, 1),
  (301011, 8001, 80, 1),
  (301002, 8001, 85, 1),
  (301002, 8003, 180, 1),
  (301003, 8002, 140, 1),
  (301003, 8003, 180, 1),
  (301013, 8002, 140, 2),
  (301005, 8003, 180, 1);
复制
输出：
8001|1.000
8002|0.500
8003|0.333
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

## SQL代码

```sql
with a as (     select uid,product_id,count(distinct order_id) as user_product_rn     from tb_order_overall right join tb_order_detail using(order_id) join tb_product_info using(product_id)     where datediff((select max(date(event_time)) from tb_order_overall),event_time)<90 and tag='零食'    group by product_id,uid ) select product_id,round(sum(case when user_product_rn>=2 then 1 else 0 end)/count(distinct uid),3) as repurchase_rate from a group by product_id order by repurchase_rate desc , product_id asc limit 3
```

---



# 10月的新户客单价和获客成本_牛客题霸_牛客网

## 题目

描述

商品信息表tb_product_info

id	product_id
	shop_id	tag	in_price	quantity	release_time
1	8001	901	日用	60	1000	2020-01-01 10:00:00
2	8002	901	零食	140	500	2020-01-01 10:00:00

3	8003	901	零食	160	500	2020-01-01 10:00:00

4	8004	902	零食
	130	500	2020-01-01 10:00:00

（product_id-商品ID, shop_id-店铺ID, tag-商品类别标签, in_price-进货价格, quantity-进货数量, release_time-上架时间）



订单总表tb_order_overall

id	order_id	uid	event_time	total_amount	total_cnt	status
1	301002	102	2021-10-01 11:00:00	235	2	1
2	301003	101	2021-10-02 10:00:00
	300	2	1
3	301005	104	2021-10-03 10:00:00
	160	1	1
（order_id-订单号, uid-用户ID, event_time-下单时间, total_amount-订单总金额, total_cnt-订单商品总件数, status-订单状态）



订单明细表tb_order_detail

id	order_id	product_id	price	cnt
1	301002	8001	85	1
2	301002
	8003
	180	1
3	301003
	8004
	140
	1
4	301003
	8003
	180	1
5	301005
	8003
	180	1

（order_id-订单号, product_id-商品ID, price-商品单价, cnt-下单数量）




问题：请计算2021年10月商城里所有新用户的首单平均交易金额（客单价）和平均获客成本（保留一位小数）。


注：订单的优惠金额 = 订单明细里的{该订单各商品单价×数量之和} - 订单总表里的{订单总金额} 。


输出示例：
示例数据的输出结果如下
avg_amount	avg_cost
231.7	23.3
解释：
2021年10月有3个新用户，102的首单为301002，订单金额为235，商品总金额为85+180=265，优惠金额为30；
101的首单为301003，订单金额为300，商品总金额为140+180=320，优惠金额为20；
104的首单为301005，订单金额为160，商品总金额为180，优惠金额为20；
平均首单客单价为(235+300+160)/3=231.7，平均获客成本为(30+20+20)/3=23.3
示例1
输入：
DROP TABLE IF EXISTS tb_order_overall;
CREATE TABLE tb_order_overall (
    id INT PRIMARY KEY AUTO_INCREMENT COMMENT '自增ID',
    order_id INT NOT NULL COMMENT '订单号',
    uid INT NOT NULL COMMENT '用户ID',
    event_time datetime COMMENT '下单时间',
    total_amount DECIMAL NOT NULL COMMENT '订单总金额',
    total_cnt INT NOT NULL COMMENT '订单商品总件数',
    `status` TINYINT NOT NULL COMMENT '订单状态'
) CHARACTER SET utf8 COLLATE utf8_bin;

DROP TABLE IF EXISTS tb_product_info;
CREATE TABLE tb_product_info (
    id INT PRIMARY KEY AUTO_INCREMENT COMMENT '自增ID',
    product_id INT NOT NULL COMMENT '商品ID',
    shop_id INT NOT NULL COMMENT '店铺ID',
    tag VARCHAR(12) COMMENT '商品类别标签',
    in_price DECIMAL NOT NULL COMMENT '进货价格',
    quantity INT NOT NULL COMMENT '进货数量',
    release_time datetime COMMENT '上架时间'
) CHARACTER SET utf8 COLLATE utf8_bin;

DROP TABLE IF EXISTS tb_order_detail;
CREATE TABLE tb_order_detail (
    id INT PRIMARY KEY AUTO_INCREMENT COMMENT '自增ID',
    order_id INT NOT NULL COMMENT '订单号',
    product_id INT NOT NULL COMMENT '商品ID',
    price DECIMAL NOT NULL COMMENT '商品单价',
    cnt INT NOT NULL COMMENT '下单数量'
) CHARACTER SET utf8 COLLATE utf8_bin;

INSERT INTO tb_product_info(product_id, shop_id, tag, in_price, quantity, release_time) VALUES
  (8001, 901, '日用', 60, 1000, '2020-01-01 10:00:00'),
  (8002, 901, '零食', 140, 500, '2020-01-01 10:00:00'),
  (8003, 901, '零食', 160, 500, '2020-01-01 10:00:00'),
  (8004, 902, '零食', 130, 500, '2020-01-01 10:00:00');

INSERT INTO tb_order_overall(order_id, uid, event_time, total_amount, total_cnt, `status`) VALUES
  (301002, 102, '2021-10-01 11:00:00', 235, 2, 1),
  (301003, 101, '2021-10-02 10:00:00', 300, 2, 1),
  (301005, 104, '2021-10-03 10:00:00', 160, 1, 1);

INSERT INTO tb_order_detail(order_id, product_id, price, cnt) VALUES
  (301002, 8001, 85, 1),
  (301002, 8003, 180, 1),
  (301003, 8004, 140, 1),
  (301003, 8003, 180, 1),
  (301005, 8003, 180, 1);
复制
输出：
231.7|23.3
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

## SQL代码

```sql
with temp1 as(     select order_id,sum(price*cnt) as total_now_amount     from tb_order_detail     group by order_id ),temp2 as (     select uid,order_id,total_amount,event_time,row_number() over(partition by uid order by event_time) as t_rank     from tb_order_overall     where status = 1) select round(avg(total_amount),1) as avg_amount,round(sum(total_now_amount-total_amount)/count(order_id),1) as avg_cost from temp1 join temp2 using(order_id) where date_format(event_time,"%Y%m")='202110' and t_rank = 1
```

---



# 店铺901国庆期间的7日动销率和滞销率_牛客题霸_牛客网

## 题目

描述
商品信息表tb_product_info
id	product_id
	shop_id	tag	in_price
	quantity	release_time
1	8001	901	日用	60	1000	2020-01-01 10:00:00
2	8002	901	零食	140	500	2020-01-01 10:00:00

3	8003	901	零食	160	500	2020-01-01 10:00:00

（product_id-商品ID, shop_id-店铺ID, tag-商品类别标签, in_price-进货价格, quantity-进货数量, release_time-上架时间）



订单总表tb_order_overall

id	order_id	uid	event_time	total_amount	total_cnt	status
1	301004	102	2021-09-30 10:00:00	170	1	1
2	301005	104	2021-10-01 10:00:00
	160	1	1
3	301003	101	2021-10-02 10:00:00
	300	2	1
4	301002	102	2021-10-03 11:00:00
	235	2	1
（order_id-订单号, uid-用户ID, event_time-下单时间, total_amount-订单总金额, total_cnt-订单商品总件数, status-订单状态）



订单明细表tb_order_detail

id	order_id	product_id	price	cnt
1	301004	8002	180	1
2	301005
	8002
	170	1
3	301002
	8001
	85
	1
4	301002
	8003
	180	1
5	301003
	8002
	150	1
6	301003
	8003
	180	1
（order_id-订单号, product_id-商品ID, price-商品单价, cnt-下单数量）


问题：请计算店铺901在2021年国庆头3天的7日动销率和滞销率，结果保留3位小数，按日期升序排序。


注：
动销率定义为店铺中一段时间内有销量的商品占当前已上架总商品数的比例（有销量的商品/已上架总商品数)。
滞销率定义为店铺中一段时间内没有销量的商品占当前已上架总商品数的比例。（没有销量的商品/已上架总商品数)。
只要当天任一店铺有任何商品的销量就输出该天的结果，即使店铺901当天的动销率为0。


输出示例：
示例数据的输出结果如下：
dt	sale_rate	unsale_rate
2021-10-01	0.333	0.667

2021-10-02
	0.667	0.333

2021-10-03
	1.000	0.000
解释：
10月1日的近7日（9月25日---10月1日）店铺901有销量的商品有8002，截止当天在售商品数为3，动销率为0.333，滞销率为0.667；
10月2日的近7日（9月26日---10月2日）店铺901有销量的商品有8002、8003，截止当天在售商品数为3，动销率为0.667，滞销率为0.333；
10月3日的近7日（9月27日---10月3日）店铺901有销量的商品有8002、8003、8001，截止当天店铺901在售商品数为3，动销率为1.000，
滞销率为0.000；
示例1
输入：
DROP TABLE IF EXISTS tb_order_overall;
CREATE TABLE tb_order_overall (
    id INT PRIMARY KEY AUTO_INCREMENT COMMENT '自增ID',
    order_id INT NOT NULL COMMENT '订单号',
    uid INT NOT NULL COMMENT '用户ID',
    event_time datetime COMMENT '下单时间',
    total_amount DECIMAL NOT NULL COMMENT '订单总金额',
    total_cnt INT NOT NULL COMMENT '订单商品总件数',
    `status` TINYINT NOT NULL COMMENT '订单状态'
) CHARACTER SET utf8 COLLATE utf8_bin;

DROP TABLE IF EXISTS tb_product_info;
CREATE TABLE tb_product_info (
    id INT PRIMARY KEY AUTO_INCREMENT COMMENT '自增ID',
    product_id INT NOT NULL COMMENT '商品ID',
    shop_id INT NOT NULL COMMENT '店铺ID',
    tag VARCHAR(12) COMMENT '商品类别标签',
    in_price DECIMAL NOT NULL COMMENT '进货价格',
    quantity INT NOT NULL COMMENT '进货数量',
    release_time datetime COMMENT '上架时间'
) CHARACTER SET utf8 COLLATE utf8_bin;

DROP TABLE IF EXISTS tb_order_detail;
CREATE TABLE tb_order_detail (
    id INT PRIMARY KEY AUTO_INCREMENT COMMENT '自增ID',
    order_id INT NOT NULL COMMENT '订单号',
    product_id INT NOT NULL COMMENT '商品ID',
    price DECIMAL NOT NULL COMMENT '商品单价',
    cnt INT NOT NULL COMMENT '下单数量'
) CHARACTER SET utf8 COLLATE utf8_bin;

INSERT INTO tb_product_info(product_id, shop_id, tag, in_price, quantity, release_time) VALUES
  (8001, 901, '日用', 60, 1000, '2020-01-01 10:00:00'),
  (8002, 901, '零食', 140, 500, '2020-01-01 10:00:00'),
  (8003, 901, '零食', 160, 500, '2020-01-01 10:00:00');

INSERT INTO tb_order_overall(order_id, uid, event_time, total_amount, total_cnt, `status`) VALUES
  (301004, 102, '2021-09-30 10:00:00', 170, 1, 1),
  (301005, 104, '2021-10-01 10:00:00', 160, 1, 1),
  (301003, 101, '2021-10-02 10:00:00', 300, 2, 1),
  (301002, 102, '2021-10-03 11:00:00', 235, 2, 1);

INSERT INTO tb_order_detail(order_id, product_id, price, cnt) VALUES
  (301004, 8002, 180, 1),
  (301005, 8002, 170, 1),
  (301002, 8001, 85, 1),
  (301002, 8003, 180, 1),
  (301003, 8002, 150, 1),
  (301003, 8003, 180, 1);
复制
输出：
2021-10-01|0.333|0.667
2021-10-02|0.667|0.333
2021-10-03|1.000|0.000
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

## SQL代码

```sql
with temp1 as ( select distinct date(event_time) dt from tb_order_overall where date(event_time) between '2021-10-01' and '2021-10-03'), temp2 as (     select event_time as dt,     product_id     from tb_order_overall join tb_order_detail using(order_id) join tb_product_info using(product_id)     where shop_id=901 and status=1) select t1.dt, round(count(distinct t2.product_id)/(select count(product_id) from tb_product_info where date(release_time) <= t1.dt and shop_id = 901),3) as sale_rate, round(1-count(distinct t2.product_id)/(select count(product_id) from tb_product_info where date(release_time) <= t1.dt and shop_id = 901),3) as unsale_rate from temp1 t1 left join temp2 t2 on datediff(t1.dt,t2.dt) between 0 and 6group by t1.dt order by t1.dt
```

---



# 2021年国庆在北京接单3次及以上的司机统计信息_牛客题霸_牛客网

## 题目

描述

用户打车记录表tb_get_car_record



（uid-用户ID, city-城市, event_time-打车时间, end_time-打车结束时间, order_id-订单号）




打车订单表tb_get_car_order


（order_id-订单号, uid-用户ID, driver_id-司机ID, order_time-接单时间, start_time-开始计费的上车时间,  finish_time-订单完成时间, mileage-行驶里程数, fare-费用, grade-评分）




场景逻辑说明：

用户提交打车请求后，在用户打车记录表生成一条打车记录，order_id-订单号设为null；

当有司机接单时，在打车订单表生成一条订单，填充order_time-接单时间及其左边的字段，start_time-开始计费的上车时间及其右边的字段全部为null，并把order_id-订单号和order_time-接单时间（end_time-打车结束时间）写入打车记录表；若一直无司机接单，超时或中途用户主动取消打车，则记录end_time-打车结束时间。

若乘客上车前，乘客或司机点击取消订单，会将打车订单表对应订单的finish_time-订单完成时间填充为取消时间，其余字段设为null。

当司机接上乘客时，填充订单表中该start_time-开始计费的上车时间。
当订单完成时填充订单完成时间、里程数、费用；评分设为null，在用户给司机打1~5星评价后填充。




问题：请统计2021年国庆7天期间在北京市接单至少3次的司机的平均接单数和平均兼职收入（暂不考虑平台佣金，直接计算完成的订单费用总额），结果保留3位小数。


输出示例：
示例数据的输出结果如下



解释：
在2021年国庆期间北京市的订单中，202共接了3单，兼职收入105；203接了4单，兼职收入137；201共接了1单，但取消了； 接单至少3次的司机有202和203，他两人全部总共接单数为7，总收入为242。因此平均接单数为3.500，平均收入为121.000；
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
    mileage DOUBLE COMMENT '行驶里程数',
    fare DOUBLE COMMENT '费用',
    grade TINYINT COMMENT '评分'
) CHARACTER SET utf8 COLLATE utf8_bin;

INSERT INTO tb_get_car_record(uid, city, event_time, end_time, order_id) VALUES
 (101, '北京', '2021-10-01 07:00:00', '2021-10-01 07:02:00', null),
 (102, '北京', '2021-10-01 09:00:30', '2021-10-01 09:01:00', 9001),
 (101, '北京', '2021-10-01 08:28:10', '2021-10-01 08:30:00', 9002),
 (103, '北京', '2021-10-02 07:59:00', '2021-10-02 08:01:00', 9003),
 (104, '北京', '2021-10-03 07:59:20', '2021-10-03 08:01:00', 9004),
 (105, '北京', '2021-10-01 08:00:00', '2021-10-01 08:02:10', 9005),
 (106, '北京', '2021-10-01 17:58:00', '2021-10-01 18:01:00', 9006),
 (107, '北京', '2021-10-02 11:00:00', '2021-10-02 11:01:00', 9007),
 (108, '北京', '2021-10-02 21:00:00', '2021-10-02 21:01:00', 9008) ;

INSERT INTO tb_get_car_order(order_id, uid, driver_id, order_time, start_time, finish_time, mileage, fare, grade) VALUES
 (9002, 101, 201, '2021-10-01 08:30:00', null, '2021-10-01 08:31:00', null, null, null),
 (9001, 102, 202, '2021-10-01 09:01:00', '2021-10-01 09:06:00', '2021-10-01 09:31:00', 10.0, 41.5, 5),
 (9003, 103, 202, '2021-10-02 08:01:00', '2021-10-02 08:15:00', '2021-10-02 08:31:00', 11.0, 41.5, 4),
 (9004, 104, 202, '2021-10-03 08:01:00', '2021-10-03 08:13:00', '2021-10-03 08:31:00', 7.5, 22, 4),
 (9005, 105, 203, '2021-10-01 08:02:10', '2021-10-01 08:18:00', '2021-10-01 08:31:00', 15.0, 44, 5),
 (9006, 106, 203, '2021-10-01 18:01:00', '2021-10-01 18:09:00', '2021-10-01 18:31:00', 8.0, 25, 5),
 (9007, 107, 203, '2021-10-02 11:01:00', '2021-10-02 11:07:00', '2021-10-02 11:31:00', 9.9, 30, 5),
 (9008, 108, 203, '2021-10-02 21:01:00', '2021-10-02 21:10:00', '2021-10-02 21:31:00', 13.2, 38, 4);
复制
输出：
北京|3.500|121.000
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

## SQL代码

```sql
SELECT city,
    ROUND(AVG(num),3) AS avg_order_num,
    ROUND(AVG(sum),3) AS avg_income
FROM (SELECT city,
    COUNT(*) AS num,
    SUM(o.fare) AS sum
FROM tb_get_car_record r JOIN tb_get_car_order o ON r.order_id = o.order_id
where  city='北京' and date(order_time) between '2021-10-1'and '2021-10-7'
GROUP BY o.driver_id
HAVING COUNT(*) >= 3) t
GROUP BY city
```

---



# 有取消订单记录的司机平均评分_牛客题霸_牛客网

## 题目
描述

现有用户打车记录表tb_get_car_record

（uid-用户ID, city-城市, event_time-打车时间, end_time-打车结束时间, order_id-订单号）





打车订单表tb_get_car_order

（order_id-订单号, uid-用户ID, driver_id-司机ID, order_time-接单时间, start_time-开始计费的上车时间,  finish_time-订单完成时间, mileage-行驶里程数, fare-费用, grade-评分）


场景逻辑说明：

用户提交打车请求后，在用户打车记录表生成一条打车记录，order_id-订单号设为null；

当有司机接单时，在打车订单表生成一条订单，填充order_time-接单时间及其左边的字段，start_time-开始计费的上车时间及其右边的字段全部为null，并把order_id-订单号和order_time-接单时间（end_time-打车结束时间）写入打车记录表；若一直无司机接单，超时或中途用户主动取消打车，则记录end_time-打车结束时间。

若乘客上车前，乘客或司机点击取消订单，会将打车订单表对应订单的finish_time-订单完成时间填充为取消时间，其余字段设为null。

当司机接上乘客时，填充订单表中该start_time-开始计费的上车时间。
当订单完成时填充订单完成时间、里程数、费用；评分设为null，在用户给司机打1~5星评价后填充。






问题：请找到2021年10月有过取消订单记录的司机，计算他们每人全部已完成的有评分订单的平均评分及总体平均评分，保留1位小数。先按driver_id升序输出，再输出总体情况。


输出示例:

示例数据的输出结果如下

解释：
2021年国庆有未完成订单的司机有202和203；202的所有订单评分有：5、4、4，平均分为4.3；203的所有订单评分有：5、5、4、5，平均评分为4.8；总体平均评分为(5+4+4+5+5+4+5)/7=4.6
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
 (101, '北京', '2021-10-01 07:00:00', '2021-10-01 07:02:00', null),
 (102, '北京', '2021-10-01 09:00:30', '2021-10-01 09:01:00', 9001),
 (101, '北京', '2021-10-01 08:28:10', '2021-10-01 08:30:00', 9002),
 (103, '北京', '2021-10-02 07:59:00', '2021-10-02 08:01:00', 9003),
 (104, '北京', '2021-10-03 07:59:20', '2021-10-03 08:01:00', 9004),
 (105, '北京', '2021-10-01 08:00:00', '2021-10-01 08:02:10', 9005),
 (106, '北京', '2021-10-01 17:58:00', '2021-10-01 18:01:00', 9006),
 (107, '北京', '2021-10-02 11:00:00', '2021-10-02 11:01:00', 9007),
 (108, '北京', '2021-10-02 21:00:00', '2021-10-02 21:01:00', 9008),
 (109, '北京', '2021-10-08 18:00:00', '2021-10-08 18:01:00', 9009);

INSERT INTO tb_get_car_order(order_id, uid, driver_id, order_time, start_time, finish_time, mileage, fare, grade) VALUES
 (9002, 101, 202, '2021-10-01 08:30:00', null, '2021-10-01 08:31:00', null, null, null),
 (9001, 102, 202, '2021-10-01 09:01:00', '2021-10-01 09:06:00', '2021-10-01 09:31:00', 10.0, 41.5, 5),
 (9003, 103, 202, '2021-10-02 08:01:00', '2021-10-02 08:15:00', '2021-10-02 08:31:00', 11.0, 41.5, 4),
 (9004, 104, 202, '2021-10-03 08:01:00', '2021-10-03 08:13:00', '2021-10-03 08:31:00', 7.5, 22, 4),
 (9005, 105, 203, '2021-10-01 08:02:10', null, '2021-10-01 08:31:00', null, null, null),
 (9006, 106, 203, '2021-10-01 18:01:00', '2021-10-01 18:09:00', '2021-10-01 18:31:00', 8.0, 25.5, 5),
 (9007, 107, 203, '2021-10-02 11:01:00', '2021-10-02 11:07:00', '2021-10-02 11:31:00', 9.9, 30, 5),
 (9008, 108, 203, '2021-10-02 21:01:00', '2021-10-02 21:10:00', '2021-10-02 21:31:00', 13.2, 38, 4),
 (9009, 109, 203, '2021-10-08 18:01:00', '2021-10-08 18:11:50', '2021-10-08 18:51:00', 13, 40, 5);
复制
输出：
202|4.3
203|4.8
总体|4.6
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

## SQL代码

```sql
SELECT
    driver_id,
    ROUND(AVG(grade), 1) AS avg_grade
FROM
    tb_get_car_order
WHERE
    driver_id IN (
        SELECT DISTINCT
            driver_id
        FROM
            tb_get_car_order
        WHERE
            grade IS NULL
            AND DATE_FORMAT(order_time, "%Y-%m") = "2021-10"
    )
GROUP BY
    driver_id
UNION ALL
SELECT
    "总体",
    ROUND(avg(grade), 1)
FROM
    tb_get_car_order
WHERE
    driver_id IN (
        SELECT DISTINCT
            driver_id
        FROM
            tb_get_car_order
        WHERE
            start_time IS NULL
    )
ORDER BY
    driver_id ASC
```

---



# 每个城市中评分最高的司机信息_牛客题霸_牛客网

## 题目

描述

用户打车记录表tb_get_car_record

id	uid	city	event_time	end_time	order_id
1	101	北京	2021-10-01 07:00:00	2021-10-01 07:02:00
	NULL
2	102	北京
	2021-10-01 09:00:30
	2021-10-01 09:01:00
	9001
3	101	北京
	2021-10-01 08:28:10
	2021-10-01 08:30:00
	9002

4	103	北京
	2021-10-02 07:59:00
	2021-10-02 08:01:00
	9003

5	104	北京
	2021-10-03 07:59:20
	2021-10-03 08:01:00
	9004

6	105	北京
	2021-10-01 08:00:00
	2021-10-01 08:02:10
	9005

7	106	北京
	2021-10-01 17:58:00
	2021-10-01 18:01:00
	9006

8	107	北京
	2021-10-02 11:00:00
	2021-10-02 11:01:00
	9007

9	108	北京
	2021-10-02 21:00:00
	2021-10-02 21:01:00
	9008

10	109	北京
	2021-10-08 18:00:00
	2021-10-08 18:01:00
	9009
（uid-用户ID, city-城市, event_time-打车时间, end_time-打车结束时间, order_id-订单号）


打车订单表tb_get_car_order
id	order_id	uid	driver_id	order_time	start_time	finish_time	mileage	fare	grade
1	9002	101	202	2021-10-01 08:30:00
	NULL
	2021-10-01 08:31:00
	NULL
	NULL
	NULL
2	9001	102	202	2021-10-01 09:01:00
	2021-10-01 09:06:00
	2021-10-01 09:31:00
	10	41.5	5
3	9003
	103	202	2021-10-02 08:01:00
	2021-10-02 08:15:00
	2021-10-02 08:31:00
	11	41.5	4
4	9004
	104	202	2021-10-03 08:01:00
	2021-10-03 08:13:00
	2021-10-03 08:31:00
	7.5	22	4
5	9005
	105	203	2021-10-01 08:02:10
	NULL
	2021-10-01 08:31:00
	NULL	NULL	NULL
6	9006
	106	203	2021-10-01 18:01:00
	2021-10-01 18:09:00
	2021-10-01 18:31:00
	8	25.5	5
7	9007
	107	203	2021-10-02 11:01:00
	2021-10-02 11:07:00
	2021-10-02 11:31:00
	9.9	30	5
8	9008
	108	203	2021-10-02 21:01:00
	2021-10-02 21:10:00
	2021-10-02 21:31:00
	13.2	38	4
9	9009	109	203	2021-10-08 18:01:00	2021-10-08 18:11:50
	2021-10-08 18:51:00
	13	40	5
（order_id-订单号, uid-用户ID, driver_id-司机ID, order_time-接单时间, start_time-开始计费的上车时间,  finish_time-订单完成时间, mileage-行驶里程数, fare-费用, grade-评分）




场景逻辑说明：

用户提交打车请求后，在用户打车记录表生成一条打车记录，order_id-订单号设为null；

当有司机接单时，在打车订单表生成一条订单，填充order_time-接单时间及其左边的字段，start_time-开始计费的上车时间及其右边的字段全部为null，并把order_id-订单号和order_time-接单时间（end_time-打车结束时间）写入打车记录表；若一直无司机接单，超时或中途用户主动取消打车，则记录end_time-打车结束时间。

若乘客上车前，乘客或司机点击取消订单，会将打车订单表对应订单的finish_time-订单完成时间填充为取消时间，其余字段设为null。

当司机接上乘客时，填充订单表中该start_time-开始计费的上车时间。
当订单完成时填充订单完成时间、里程数、费用；评分设为null，在用户给司机打1~5星评价后填充。



问题：请统计每个城市中评分最高的司机平均评分、日均接单量和日均行驶里程数。


注：有多个司机评分并列最高时，都输出。
平均评分和日均接单量保留1位小数，
日均行驶里程数保留3位小数，按日均接单数升序排序。


2285068
示例数据的输出结果如下
city	driver_id	avg_grade	avg_order_num	avg_mileage
北京	203	4.8	1.7	14.700
解释：
示例数据中，在北京市，共有2个司机接单，202的平均评分为4.3，203的平均评分为4.8，因此北京的最高评分的司机为203；203的共在3天里接单过，一共接单5次（包含1次接单后未完成），因此日均接单数为1.7；总行驶里程数为44.1，因此日均行驶里程数为14.700

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
 (101, '北京', '2021-10-01 07:00:00', '2021-10-01 07:02:00', null),
 (102, '北京', '2021-10-01 09:00:30', '2021-10-01 09:01:00', 9001),
 (101, '北京', '2021-10-01 08:28:10', '2021-10-01 08:30:00', 9002),
 (103, '北京', '2021-10-02 07:59:00', '2021-10-02 08:01:00', 9003),
 (104, '北京', '2021-10-03 07:59:20', '2021-10-03 08:01:00', 9004),
 (105, '北京', '2021-10-01 08:00:00', '2021-10-01 08:02:10', 9005),
 (106, '北京', '2021-10-01 17:58:00', '2021-10-01 18:01:00', 9006),
 (107, '北京', '2021-10-02 11:00:00', '2021-10-02 11:01:00', 9007),
 (108, '北京', '2021-10-02 21:00:00', '2021-10-02 21:01:00', 9008),
 (109, '北京', '2021-10-08 18:00:00', '2021-10-08 18:01:00', 9009);

INSERT INTO tb_get_car_order(order_id, uid, driver_id, order_time, start_time, finish_time, mileage, fare, grade) VALUES
 (9002, 101, 202, '2021-10-01 08:30:00', null, '2021-10-01 08:31:00', null, null, null),
 (9001, 102, 202, '2021-10-01 09:01:00', '2021-10-01 09:06:00', '2021-10-01 09:31:00', 10.0, 41.5, 5),
 (9003, 103, 202, '2021-10-02 08:01:00', '2021-10-02 08:15:00', '2021-10-02 08:31:00', 11.0, 41.5, 4),
 (9004, 104, 202, '2021-10-03 08:01:00', '2021-10-03 08:13:00', '2021-10-03 08:31:00', 7.5, 22, 4),
 (9005, 105, 203, '2021-10-01 08:02:10', null, '2021-10-01 08:31:00', null, null, null),
 (9006, 106, 203, '2021-10-01 18:01:00', '2021-10-01 18:09:00', '2021-10-01 18:31:00', 8.0, 25.5, 5),
 (9007, 107, 203, '2021-10-02 11:01:00', '2021-10-02 11:07:00', '2021-10-02 11:31:00', 9.9, 30, 5),
 (9008, 108, 203, '2021-10-02 21:01:00', '2021-10-02 21:10:00', '2021-10-02 21:31:00', 13.2, 38, 4),
 (9009, 109, 203, '2021-10-08 18:01:00', '2021-10-08 18:11:50', '2021-10-08 18:51:00', 13, 40, 5);
复制
输出：
北京|203|4.8|1.7|14.700
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

## SQL代码

```sql
with a as (
select cr.city,co.driver_id,
round(avg(co.grade),1) as avg_grade,
round(count(driver_id)/count(distinct date(order_time)),1) as avg_order_num,
round(sum(co.mileage)/count(distinct date(order_time)),3) as avg_mileage,
dense_rank() over(partition by cr.city order by round(avg(co.grade),1) desc) as rn
from tb_get_car_record cr inner join tb_get_car_order co on cr.order_id = co.order_id
group by cr.city,co.driver_id
)
select city,driver_id,avg_grade,avg_order_num,avg_mileage
from a
where rn = 1
order by avg_order_num
```

---



# 国庆期间近7日日均取消订单量_牛客题霸_牛客网

## 题目

描述

现有用户打车记录表tb_get_car_record

id	uid	city	event_time	end_time	order_id
1	101	北京	2021-09-25 08:28:10	2021-09-25 08:30:00
	9011
2	102	北京
	
2021-09-25 09:00:30
	2021-09-25 09:01:00
	9012
3	103	北京
	2021-09-26 07:59:00	2021-09-26 08:01:00
	9013

4	104	北京
	2021-09-26 07:59:00	2021-09-26 08:01:00
	9023

5	104	北京
	2021-09-27 07:59:20	2021-09-27 08:01:00
	9014

6	105	北京
	2021-09-28 08:00:00	2021-09-28 08:02:10	9015

7	106	北京
	2021-09-29 17:58:00	2021-09-29 18:01:00
	9016

8	107	北京
	2021-09-30 11:00:00	2021-09-30 11:01:00
	9017

9	108	北京
	2021-09-30 21:00:00	2021-09-30 21:01:00
	9018

10	102	北京
	2021-10-01 09:00:30	2021-10-01 09:01:00
	9002
11
	106
	北京
	2021-10-01 17:58:00
	2021-10-01 18:01:00
	9006

12
	101
	北京
	2021-10-02 08:28:10
	2021-10-02 08:30:00
	9001

13	107
	北京
	2021-10-02 11:00:00
	2021-10-02 11:01:00
	9007

14
	108
	北京
	2021-10-02 21:00:00
	2021-10-02 21:01:00
	9008

15
	103
	北京
	2021-10-02 07:59:00
	2021-10-02 08:01:00
	9003

16	104
	北京
	2021-10-03 07:59:20
	2021-10-03 08:01:00
	9004

17	109
	北京
	2021-10-03 18:00:00
	2021-10-03 18:01:00
	9009
（uid-用户ID, city-城市, event_time-打车时间, end_time-打车结束时间, order_id-订单号）


打车订单表tb_get_car_order
id	order_id	uid	driver_id	order_time	start_time	finish_time	mileage	fare	grade
1	9011	101	211	2021-09-25 08:30:00
	2021-09-25 08:31:00	2021-09-25 08:54:00
	10
	35	5
2	9012	102	211	2021-09-25 09:01:00	2021-09-25 09:01:50	2021-09-25 09:28:00
	11	32	5
3	9013
	103	212	2021-09-26 08:01:00	2021-09-26 08:03:00	2021-09-26 08:27:00
	12	31	4
4	9023
	104	213	2021-09-26 08:01:00	NULL	2021-09-26 08:27:00
	NULL	NULL	NULL
5	9014
	104	212	2021-09-27 08:01:00	2021-09-27 08:04:00	2021-09-27 08:21:00
	11	31	5
6	9015
	105	212	2021-09-28 08:02:10
	2021-09-28 08:04:10	2021-09-28 08:25:10	12	31	4
7	9016
	106	
213
	2021-09-29 18:01:00	
2021-09-2
918:02:10
	2021-09-29 18:23:00
	11	39	4
8	9017
	107	213	2021-09-3011:01:00	2021-09-30 11:01:40	2021-09-30 11:31:00
	11	38	5
9	9018	108	214	2021-09-30 21:01:00	2021-09-30 21:02:50	2021-09-30 21:21:00	14	38	5
10	9002	102	202	2021-10-01 09:01:00	2021-10-01 0 9:06:00	2021-10-01 09:31:00
	10	41.5	5
11	9006	106	203	2021-10-0118:01:00	2021-10-01 18:09:00	2021-10-01 18:31:00
	8	25.5	4
12
	9001
	101	202	2021-10-02 08:30:00
	NULL
	2021-10-02 08:31:00
	NULL
	NULL
	NULL

13	9007
	107	203	2021-10-02 11:01:00
	
2021-10-02
11:07:00
	2021-10-02 11:31:00
	9.9	30	5
14
	9008
	108	204	2021-10-02 21:01:00
	2021-10-02 21:10:00
	2021-10-02 21:31:00
	13.2	38	4
15
	9003
	103	202	2021-10-02 08:01:00
	2021-10-02 08:15:00
	2021-10-02 08:31:00
	11	41.5	4
16
	9004
	104	202	2021-10-03 08:01:00
	2021-10-03 08:13:00	2021-10-03 08:31:00
	7.5	22	4
17
	9009	109	204	2021-10-0318:01:00
	NULL
	2021-10-03 18:51:00
	NULL	NULL
	NULL

（order_id-订单号, uid-用户ID, driver_id-司机ID, order_time-接单时间, start_time-开始计费的上车时间,  finish_time-订单完成时间, mileage-行驶里程数, fare-费用, grade-评分）


场景逻辑说明：

用户提交打车请求后，在用户打车记录表生成一条打车记录，order_id-订单号设为null；

当有司机接单时，在打车订单表生成一条订单，填充order_time-接单时间及其左边的字段，start_time-开始计费的上车时间及其右边的字段全部为null，并把order_id-订单号和order_time-接单时间（end_time-打车结束时间）写入打车记录表；若一直无司机接单，超时或中途用户主动取消打车，则记录end_time-打车结束时间。

若乘客上车前，乘客或司机点击取消订单，会将打车订单表对应订单的finish_time-订单完成时间填充为取消时间，其余字段设为null。

当司机接上乘客时，填充订单表中该start_time-开始计费的上车时间。
当订单完成时填充订单完成时间、里程数、费用；评分设为null，在用户给司机打1~5星评价后填充。

问题：请统计国庆头3天里，每天的近7日日均订单完成量和日均订单取消量，按日期升序排序。结果保留2位小数。

输出示例：
示例输出如下
dt	finish_num_7d	cancel_num_7d
2021-10-01	1.43	0.14
2021-10-02
	1.57	0.29
2021-10-03
	1.57	0.29

解释：
2021年9月25到10月3日每天的订单完成量为：2、1、1、1、1、2、2、3、1；每天的订单取消量为：0、1、0、0、0、0、0、1、1；
因此10.1到10.3期间的近7日订单完成量分别为10、11、11，因此日均订单完成量为：1.43、1.57、1.57；
近7日订单取消量分别为1、2、2，因此日均订单取消量为0.14、0.29、0.29；
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
 (101, '北京', '2021-09-25 08:28:10', '2021-09-25 08:30:00', 9011),
 (102, '北京', '2021-09-25 09:00:30', '2021-09-25 09:01:00', 9012),
 (103, '北京', '2021-09-26 07:59:00', '2021-09-26 08:01:00', 9013),
 (104, '北京', '2021-09-26 07:59:00', '2021-09-26 08:01:00', 9023),
 (104, '北京', '2021-09-27 07:59:20', '2021-09-27 08:01:00', 9014),
 (105, '北京', '2021-09-28 08:00:00', '2021-09-28 08:02:10', 9015),
 (106, '北京', '2021-09-29 17:58:00', '2021-09-29 18:01:00', 9016),
 (107, '北京', '2021-09-30 11:00:00', '2021-09-30 11:01:00', 9017),
 (108, '北京', '2021-09-30 21:00:00', '2021-09-30 21:01:00', 9018),
 (102, '北京', '2021-10-01 09:00:30', '2021-10-01 09:01:00', 9002),
 (106, '北京', '2021-10-01 17:58:00', '2021-10-01 18:01:00', 9006),
 (101, '北京', '2021-10-02 08:28:10', '2021-10-02 08:30:00', 9001),
 (107, '北京', '2021-10-02 11:00:00', '2021-10-02 11:01:00', 9007),
 (108, '北京', '2021-10-02 21:00:00', '2021-10-02 21:01:00', 9008),
 (103, '北京', '2021-10-02 07:59:00', '2021-10-02 08:01:00', 9003),
 (104, '北京', '2021-10-03 07:59:20', '2021-10-03 08:01:00', 9004),
 (109, '北京', '2021-10-03 18:00:00', '2021-10-03 18:01:00', 9009);

INSERT INTO tb_get_car_order(order_id, uid, driver_id, order_time, start_time, finish_time, mileage, fare, grade) VALUES
 (9011, 101, 211, '2021-09-25 08:30:00', '2021-09-25 08:31:00', '2021-09-25 08:54:00', 10, 35, 5),
 (9012, 102, 211, '2021-09-25 09:01:00', '2021-09-25 09:01:50', '2021-09-25 09:28:00', 11, 32, 5),
 (9013, 103, 212, '2021-09-26 08:01:00', '2021-09-26 08:03:00', '2021-09-26 08:27:00', 12, 31, 4),
 (9023, 104, 213, '2021-09-26 08:01:00', null, '2021-09-26 08:27:00', null, null, null),
 (9014, 104, 212, '2021-09-27 08:01:00', '2021-09-27 08:04:00', '2021-09-27 08:21:00', 11, 31, 5),
 (9015, 105, 212, '2021-09-28 08:02:10', '2021-09-28 08:04:10', '2021-09-28 08:25:10', 12, 31, 4),
 (9016, 106, 213, '2021-09-29 18:01:00', '2021-09-29 18:02:10', '2021-09-29 18:23:00', 11, 39, 4),
 (9017, 107, 213, '2021-09-30 11:01:00', '2021-09-30 11:01:40', '2021-09-30 11:31:00', 11, 38, 5),
 (9018, 108, 214, '2021-09-30 21:01:00', '2021-09-30 21:02:50', '2021-09-30 21:21:00', 14, 38, 5),
 (9002, 102, 202, '2021-10-01 09:01:00', '2021-10-01 09:06:00', '2021-10-01 09:31:00', 10.0, 41.5, 5),
 (9006, 106, 203, '2021-10-01 18:01:00', '2021-10-01 18:09:00', '2021-10-01 18:31:00', 8.0, 25.5, 4),
 (9001, 101, 202, '2021-10-02 08:30:00', null, '2021-10-02 08:31:00', null, null, null),
 (9007, 107, 203, '2021-10-02 11:01:00', '2021-10-02 11:07:00', '2021-10-02 11:31:00', 9.9, 30, 5),
 (9008, 108, 204, '2021-10-02 21:01:00', '2021-10-02 21:10:00', '2021-10-02 21:31:00', 13.2, 38, 4),
 (9003, 103, 202, '2021-10-02 08:01:00', '2021-10-02 08:15:00', '2021-10-02 08:31:00', 11.0, 41.5, 4),
 (9004, 104, 202, '2021-10-03 08:01:00', '2021-10-03 08:13:00', '2021-10-03 08:31:00', 7.5, 22, 4),
 (9009, 109, 204, '2021-10-03 18:01:00', null, '2021-10-03 18:51:00', null, null, null);
复制
输出：
2021-10-01|1.43|0.14
2021-10-02|1.57|0.29
2021-10-03|1.57|0.29
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

## SQL代码

```sql
with temp1 as(select x.date_time,x.cnt_T as T,ifnull(y.cnt_F,0) as F from(     select date_format(order_time,'%Y-%m-%d') as date_time,     sum(if(start_time is NULL,0,1)) as cnt_T     from tb_get_car_order     group by date_time ) x join (select date_format(order_time,'%Y-%m-%d') as date_time,sum(if(start_time is NULL,1,0)) as cnt_F from tb_get_car_order group by date_time)y on x.date_time = y.date_time) ,temp2 as (select date_time, round(avg(T) over(order by date_time rows between 6 preceding and current row),2) as finish_num_7d, round(avg(F) over(order by date_time rows between 6 preceding and current row),2) as cancel_num_7d from temp1) select *  from temp2 where date_time between '2021-10-01' and '2021-10-03'order by date_time
```

---



# 工作日各时段叫车量、等待接单时间和调度时间_牛客题霸_牛客网

## 题目

描述

用户打车记录表tb_get_car_record

（uid 用户ID, city-城市, event_time-打车时间, end_time-打车结束时间, order_id-订单号）



打车订单表tb_get_car_order

（order_id-订单号, uid-用户ID, driver_id-司机ID, order_time-接单时间, start_time-开始计费的上车时间, finish_time-订单完成时间, mileage-行驶里程数, fare-费用, grade-评分）




场景逻辑说明：

用户提交打车请求后，在用户打车记录表生成一条打车记录，订单号-order_id设为null；

当有司机接单时，在打车订单表生成一条订单，填充接单时间-order_time 及其左边的字段，上车时间-start_time及其右边的字段全部为null，并把订单号-order_id和接单时间-order_time（end_time-打车结束时间）写入打车记录表；若一直无司机接单，超时或中途用户主动取消打车，则记录打车结束时间-end_time。

若乘客上车前，乘客或司机点击取消订单，会将打车订单表对应订单的finish_time-订单完成时间填充为取消时间，其余字段设为null。

当司机接上乘客时，填充订单表中该订单的start_time-上车时间。

当订单完成时填充订单完成时间、里程数、费用；评分设为null，在用户给司机打1~5星评价后填充。



问题：统计周一到周五各时段的叫车量、平均等待接单时间和平均调度时间。全部以event_time-开始打车时间为时段划分依据，平均等待接单时间和平均调度时间均保留1位小数，平均调度时间仅计算完成了的订单，结果按叫车量升序排序。


注：
不同时段定义：早高峰 [07:00:00 , 09:00:00)、工作时间 [09:00:00 , 17:00:00）、晚高峰 [17:00:00 , 20:00:00）、休息时间 [20:00:00 , 07:00:00）
时间区间左闭右开（即7:00:00算作早高峰，而9:00:00不算做早高峰）
从开始打车到司机接单为等待接单时间，从司机接单到上车为调度时间。

输出示例：
示例数据的输出结果如下：

解释：订单9017打车开始于11点整，属于工作时间，等待时间30秒，调度时间为1分40秒，示例数据中工作时间打车订单就一个，平均等待时间0.5分钟，平均调度时间1.7分钟。

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
 (107, '北京', '2021-09-20 11:00:00', '2021-09-20 11:00:30', 9017),
 (108, '北京', '2021-09-20 21:00:00', '2021-09-20 21:00:40', 9008),
 (108, '北京', '2021-09-20 18:59:30', '2021-09-20 19:01:00', 9018),
 (102, '北京', '2021-09-21 08:59:00', '2021-09-21 09:01:00', 9002),
 (106, '北京', '2021-09-21 17:58:00', '2021-09-21 18:01:00', 9006),
 (103, '北京', '2021-09-22 07:58:00', '2021-09-22 08:01:00', 9003),
 (104, '北京', '2021-09-23 07:59:00', '2021-09-23 08:01:00', 9004),
 (103, '北京', '2021-09-24 19:59:20', '2021-09-24 20:01:00', 9019),
 (101, '北京', '2021-09-24 08:28:10', '2021-09-24 08:30:00', 9011);

INSERT INTO tb_get_car_order(order_id, uid, driver_id, order_time, start_time, finish_time, mileage, fare, grade) VALUES
 (9017, 107, 213, '2021-09-20 11:00:30', '2021-09-20 11:02:10', '2021-09-20 11:31:00', 11, 38, 5),
 (9008, 108, 204, '2021-09-20 21:00:40', '2021-09-20 21:03:00', '2021-09-20 21:31:00', 13.2, 38, 4),
 (9018, 108, 214, '2021-09-20 19:01:00', '2021-09-20 19:04:50', '2021-09-20 19:21:00', 14, 38, 5),
 (9002, 102, 202, '2021-09-21 09:01:00', '2021-09-21 09:06:00', '2021-09-21 09:31:00', 10.0, 41.5, 5),
 (9006, 106, 203, '2021-09-21 18:01:00', '2021-09-21 18:09:00', '2021-09-21 18:31:00', 8.0, 25.5, 4),
 (9007, 107, 203, '2021-09-22 11:01:00', '2021-09-22 11:07:00', '2021-09-22 11:31:00', 9.9, 30, 5),
 (9003, 103, 202, '2021-09-22 08:01:00', '2021-09-22 08:15:00', '2021-09-22 08:31:00', 11.0, 41.5, 4),
 (9004, 104, 202, '2021-09-23 08:01:00', '2021-09-23 08:13:00', '2021-09-23 08:31:00', 7.5, 22, 4),
 (9005, 105, 202, '2021-09-23 10:01:00', '2021-09-23 10:13:00', '2021-09-23 10:31:00', 9, 29, 5),
 (9019, 103, 202, '2021-09-24 20:01:00', '2021-09-24 20:11:00', '2021-09-24 20:51:00', 10, 39, 4),
 (9011, 101, 211, '2021-09-24 08:30:00', '2021-09-24 08:31:00', '2021-09-24 08:54:00', 10, 35, 5);
复制
输出：
工作时间|1|0.5|1.7
休息时间|1|0.7|2.3
晚高峰|3|2.1|7.3
早高峰|4|2.2|8.0
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

## SQL代码

```sql
select period, count(period) as get_car_num, round(avg(wait_time)/60,1) as avg_wait_time, round(avg(dispatch_time)/60,1) as avg_dispatch_time from (select case when hour(a.event_time)<7 or hour(a.event_time)>=20 then '休息时间' when hour(a.event_time)<9 then '早高峰' when hour(a.event_time)<17 then '工作时间' when hour(a.event_time)<20 then '晚高峰' end as period, if(a.order_id is null,null,timestampdiff(second,a.event_time,a.end_time)) as wait_time, if(a.order_id is null,null,timestampdiff(second,b.order_time,b.start_time)) as dispatch_time from tb_get_car_record a left join tb_get_car_order b on a.order_id = b.order_id where dayofweek(a.event_time) between 2 and 6 ) t group by period order by get_car_num
```

---



# 各城市最大同时等车人数_牛客题霸_牛客网

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

## SQL代码

```sql
with temp1 as (select a.uid,a.city,a.event_time as start_time,if(b.order_id is null,a.end_time,if(b.mileage is null,b.finish_time,b.start_time)) as end_timefrom tb_get_car_record a left join tb_get_car_order b on a.order_id = b.order_idwhere date_format(a.event_time,'%Y-%m')='2021-10'),temp2 as (select uid,city,1 as num,start_time as check_timefrom temp1union allselect uid,city,-1 as num,end_time as check_timefrom temp1)select city,max(total_num) as max_wait_uvfrom(select city,sum(num) over(partition by city,date(check_time) order by check_time asc,num desc) as total_numfrom temp2) t1group by cityorder by max_wait_uv,city
```

---



# 某宝店铺的SPU数量_牛客题霸_牛客网

## 题目

描述
11月结束后，小牛同学需要对其在某宝的网店就11月份用户交易情况和产品情况进行分析以更好的经营小店。
已知产品情况表product_tb如下（其中，item_id指某款号的具体货号，style_id指款号，tag_price表示标签价格，inventory指库存量）：


请你统计每款的SPU（货号）数量，并按SPU数量降序排序，以上例子的输出结果如下：
示例1
输入：
drop table if exists product_tb;
CREATE TABLE product_tb(
item_id char(10) NOT NULL,
style_id char(10) NOT NULL,
tag_price int(10) NOT NULL,
inventory int(10) NOT NULL
);
INSERT INTO product_tb VALUES('A001', 'A', 100,  20);
INSERT INTO product_tb VALUES('A002', 'A', 120, 30);
INSERT INTO product_tb VALUES('A003', 'A', 200,  15);
INSERT INTO product_tb VALUES('B001', 'B', 130, 18);
INSERT INTO product_tb VALUES('B002', 'B', 150,  22);
INSERT INTO product_tb VALUES('B003', 'B', 125, 10);
INSERT INTO product_tb VALUES('B004', 'B', 155,  12);
INSERT INTO product_tb VALUES('C001', 'C', 260, 25);
INSERT INTO product_tb VALUES('C002', 'C', 280,  18);
复制
输出：
B|4
A|3
C|2
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

## SQL代码

```sql
SELECT style_id,
COUNT(style_id) AS SPU_num
FROM product_tb
GROUP BY style_id
ORDER BY SPU_num desc
```

---



# 某宝店铺的实际销售额与客单价_牛客题霸_牛客网

## 题目

描述
11月结束后，小牛同学需要对其在某宝的网店就11月份用户交易情况和产品情况进行分析以更好的经营小店。
已知11月份销售数据表sales_tb如下（其中，sales_date表示销售日期，user_id指用户编号，item_id指货号，sales_num表示销售数量，sales_price表示结算金额）：
请你统计实际总销售额与客单价（人均付费，总收入/总用户数，结果保留两位小数），以上例子的输出结果如下：


示例1
输入：
drop table if exists sales_tb;
CREATE TABLE sales_tb(
sales_date date NOT NULL,
user_id int(10) NOT NULL,
item_id char(10) NOT NULL,
sales_num int(10) NOT NULL,
sales_price int(10) NOT NULL
);

INSERT INTO sales_tb VALUES('2021-11-1', 1, 'A001',  1, 90);
INSERT INTO sales_tb VALUES('2021-11-1', 2, 'A002',  2, 220);
INSERT INTO sales_tb VALUES('2021-11-1', 2, 'B001',  1, 120);
INSERT INTO sales_tb VALUES('2021-11-2', 3, 'C001',  2, 500);
INSERT INTO sales_tb VALUES('2021-11-2', 4, 'B001',  1, 120);
INSERT INTO sales_tb VALUES('2021-11-3', 5, 'C001',  1, 240);
INSERT INTO sales_tb VALUES('2021-11-3', 6, 'C002',  1, 270);
INSERT INTO sales_tb VALUES('2021-11-4', 7, 'A003',  1, 180);
INSERT INTO sales_tb VALUES('2021-11-4', 8, 'B002',  1, 140);
INSERT INTO sales_tb VALUES('2021-11-4', 9, 'B001',  1, 125);
INSERT INTO sales_tb VALUES('2021-11-5', 10, 'B003',  1, 120);
INSERT INTO sales_tb VALUES('2021-11-5', 10, 'B004',  1, 150);
INSERT INTO sales_tb VALUES('2021-11-5', 10, 'A003',  1, 180);
INSERT INTO sales_tb VALUES('2021-11-6', 11, 'B003',  1, 120);
INSERT INTO sales_tb VALUES('2021-11-6', 10, 'B004',  1, 150);
复制
输出：
2725|247.73
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

## SQL代码

```sql
SELECT SUM(sales_price) as sales_total,
ROUND(SUM(sales_price)/COUNT(distinct user_id),2)
FROM sales_tb
```

---



# 某宝店铺折扣率_牛客题霸_牛客网

## 题目

描述
11月结束后，小牛同学需要对其在某宝的网店就11月份用户交易情况和产品情况进行分析以更好的经营小店。
已知产品情况表product_tb如下（其中，item_id指某款号的具体货号，style_id指款号，tag_price表示标签价格，inventory指库存量）：
item_id	style_id	tag_price	inventory
A001	A	100	20
A002	A	120	30
A003	A	200	15
B001	B	130	18
B002	B	150	22
B003	B	125	10
B004	B	155	12
C001	C	260	25
C002	C	280	18
11月份销售数据表sales_tb如下（其中，sales_date表示销售日期，user_id指用户编号，item_id指货号，sales_num表示销售数量，sales_price表示结算金额）：
sales_date	user_id	item_id	sales_num	sales_price
2021-11-01	1	A001	1	90
2021-11-01
	2	A002
	2	220
2021-11-01
	2	B001
	1	120
2021-11-02
	3	C001	2	500
2021-11-02
	4	B001
	1	120
2021-11-03
	5	C001
	1	240
2021-11-03
	6	C002
	1	270
2021-11-04
	7	A003
	1	180
2021-11-04
	8	B002
	1	140
2021-11-04
	9	B001
	1	125
2021-11-05
	10	B003
	1	120
2021-11-05
	10	B004
	1	150
2021-11-05
	10	A003
	1	180
2021-11-06
	11	B003
	1	120
2021-11-06
	10	B004
	1	150
请你统计折扣率（GMV/吊牌金额，GMV指的是成交金额），以上例子的输出结果如下（折扣率保留两位小数）：
discount_rate(%)
93.97


示例1
输入：
drop table if exists product_tb;
CREATE TABLE product_tb(
item_id char(10) NOT NULL,
style_id char(10) NOT NULL,
tag_price int(10) NOT NULL,
inventory int(10) NOT NULL
);
INSERT INTO product_tb VALUES('A001', 'A', 100,  20);
INSERT INTO product_tb VALUES('A002', 'A', 120, 30);
INSERT INTO product_tb VALUES('A003', 'A', 200,  15);
INSERT INTO product_tb VALUES('B001', 'B', 130, 18);
INSERT INTO product_tb VALUES('B002', 'B', 150,  22);
INSERT INTO product_tb VALUES('B003', 'B', 125, 10);
INSERT INTO product_tb VALUES('B004', 'B', 155,  12);
INSERT INTO product_tb VALUES('C001', 'C', 260, 25);
INSERT INTO product_tb VALUES('C002', 'C', 280,  18);

drop table if exists sales_tb;
CREATE TABLE sales_tb(
sales_date date NOT NULL,
user_id int(10) NOT NULL,
item_id char(10) NOT NULL,
sales_num int(10) NOT NULL,
sales_price int(10) NOT NULL
);

INSERT INTO sales_tb VALUES('2021-11-1', 1, 'A001',  1, 90);
INSERT INTO sales_tb VALUES('2021-11-1', 2, 'A002',  2, 220);
INSERT INTO sales_tb VALUES('2021-11-1', 2, 'B001',  1, 120);
INSERT INTO sales_tb VALUES('2021-11-2', 3, 'C001',  2, 500);
INSERT INTO sales_tb VALUES('2021-11-2', 4, 'B001',  1, 120);
INSERT INTO sales_tb VALUES('2021-11-3', 5, 'C001',  1, 240);
INSERT INTO sales_tb VALUES('2021-11-3', 6, 'C002',  1, 270);
INSERT INTO sales_tb VALUES('2021-11-4', 7, 'A003',  1, 180);
INSERT INTO sales_tb VALUES('2021-11-4', 8, 'B002',  1, 140);
INSERT INTO sales_tb VALUES('2021-11-4', 9, 'B001',  1, 125);
INSERT INTO sales_tb VALUES('2021-11-5', 10, 'B003',  1, 120);
INSERT INTO sales_tb VALUES('2021-11-5', 10, 'B004',  1, 150);
INSERT INTO sales_tb VALUES('2021-11-5', 10, 'A003',  1, 180);
INSERT INTO sales_tb VALUES('2021-11-6', 11, 'B003',  1, 120);
INSERT INTO sales_tb VALUES('2021-11-6', 10, 'B004',  1, 150);
复制
输出：
93.97
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

## SQL代码

```sql
select round(100*sum(sales_price)/sum(tag_price*sales_num),2) as'discount_rate(%)'
from product_tb JOIN sales_tb USING(item_id)
```

---



# 某宝店铺动销率与售罄率_牛客题霸_牛客网

## 题目

描述
11月结束后，小牛同学需要对其在某宝的网店就11月份用户交易情况和产品情况进行分析以更好的经营小店。
已知产品情况表product_tb如下（其中，item_id指某款号的具体货号，style_id指款号，tag_price表示标签价格，inventory指库存量）：


11月份销售数据表sales_tb如下（其中，sales_date表示销售日期，user_id指用户编号，item_id指货号，sales_num表示销售数量，sales_price表示结算金额）：
请你统计每款的动销率（pin_rate，有销售的SKU数量/在售SKU数量）(请忽略动销率实际计算公式，以该题目提供的公式为准)与售罄率（sell-through_rate，GMV/备货值，备货值=吊牌价*库存数），按style_id升序排序，以上例子的输出结果如下：


示例1
输入：
drop table if exists product_tb;
CREATE TABLE product_tb(
item_id char(10) NOT NULL,
style_id char(10) NOT NULL,
tag_price int(10) NOT NULL,
inventory int(10) NOT NULL
);
INSERT INTO product_tb VALUES('A001', 'A', 100,  20);
INSERT INTO product_tb VALUES('A002', 'A', 120, 30);
INSERT INTO product_tb VALUES('A003', 'A', 200,  15);
INSERT INTO product_tb VALUES('B001', 'B', 130, 18);
INSERT INTO product_tb VALUES('B002', 'B', 150,  22);
INSERT INTO product_tb VALUES('B003', 'B', 125, 10);
INSERT INTO product_tb VALUES('B004', 'B', 155,  12);
INSERT INTO product_tb VALUES('C001', 'C', 260, 25);
INSERT INTO product_tb VALUES('C002', 'C', 280,  18);

drop table if exists sales_tb;
CREATE TABLE sales_tb(
sales_date date NOT NULL,
user_id int(10) NOT NULL,
item_id char(10) NOT NULL,
sales_num int(10) NOT NULL,
sales_price int(10) NOT NULL
);

INSERT INTO sales_tb VALUES('2021-11-1', 1, 'A001',  1, 90);
INSERT INTO sales_tb VALUES('2021-11-1', 2, 'A002',  2, 220);
INSERT INTO sales_tb VALUES('2021-11-1', 2, 'B001',  1, 120);
INSERT INTO sales_tb VALUES('2021-11-2', 3, 'C001',  2, 500);
INSERT INTO sales_tb VALUES('2021-11-2', 4, 'B001',  1, 120);
INSERT INTO sales_tb VALUES('2021-11-3', 5, 'C001',  1, 240);
INSERT INTO sales_tb VALUES('2021-11-3', 6, 'C002',  1, 270);
INSERT INTO sales_tb VALUES('2021-11-4', 7, 'A003',  1, 180);
INSERT INTO sales_tb VALUES('2021-11-4', 8, 'B002',  1, 140);
INSERT INTO sales_tb VALUES('2021-11-4', 9, 'B001',  1, 125);
INSERT INTO sales_tb VALUES('2021-11-5', 10, 'B003',  1, 120);
INSERT INTO sales_tb VALUES('2021-11-5', 10, 'B004',  1, 150);
INSERT INTO sales_tb VALUES('2021-11-5', 10, 'A003',  1, 180);
INSERT INTO sales_tb VALUES('2021-11-6', 11, 'B003',  1, 120);
INSERT INTO sales_tb VALUES('2021-11-6', 10, 'B004',  1, 150);
复制
输出：
A|8.33|7.79
B|14.81|11.94
C|10.26|8.75
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

## SQL代码

```sql
select style_id,
round(100*sum(sales_num)/(sum(distinct inventory)-sum(sales_num)),2) as'pin_rate(%)',
round(100*sum(sales_price)/sum(distinct tag_price*inventory),2) as'sell-through_rate(%)'
from product_tb left join sales_tb using(item_id)
group by style_id
order by style_id
```

---



# 某宝店铺连续2天及以上购物的用户及其对应的天数_牛客题霸_牛客网

## 题目

描述
11月结束后，小牛同学需要对其在某宝的网店就11月份用户交易情况和产品情况进行分析以更好的经营小店。
11月份销售数据表sales_tb如下（其中，sales_date表示销售日期，user_id指用户编号，item_id指货号，sales_num表示销售数量，sales_price表示结算金额）：
sales_date	user_id	item_id	sales_num	sales_price
2021-11-01	1	A001	1	90
2021-11-01
	2	A002	2	220
2021-11-01
	2	B001	1	120
2021-11-02
	3	C001	2	500
2021-11-02
	4	B001	1	120
2021-11-03
	5	C001	1	240
2021-11-03
	6	C002	1	270
2021-11-04
	7	A003	1	180
2021-11-04
	8	B002	1	140
2021-11-04
	9	B001	1	125
2021-11-05
	10	B003	1	120
2021-11-05
	10	B004	1	150
2021-11-05
	10	A003	1	180
2021-11-06
	11	B003	1	120
2021-11-06
	10	B004	1	150
请你统计连续2天及以上在该店铺购物的用户及其对应的次数（若有多个用户，按user_id升序排序），以上例子的输出结果如下：
user_id	days_count
10	2


示例1
输入：
drop table if exists sales_tb;
CREATE TABLE sales_tb(
sales_date date NOT NULL,
user_id int(10) NOT NULL,
item_id char(10) NOT NULL,
sales_num int(10) NOT NULL,
sales_price int(10) NOT NULL
);

INSERT INTO sales_tb VALUES('2021-11-1', 1, 'A001',  1, 90);
INSERT INTO sales_tb VALUES('2021-11-1', 2, 'A002',  2, 220);
INSERT INTO sales_tb VALUES('2021-11-1', 2, 'B001',  1, 120);
INSERT INTO sales_tb VALUES('2021-11-2', 3, 'C001',  2, 500);
INSERT INTO sales_tb VALUES('2021-11-2', 4, 'B001',  1, 120);
INSERT INTO sales_tb VALUES('2021-11-3', 5, 'C001',  1, 240);
INSERT INTO sales_tb VALUES('2021-11-3', 6, 'C002',  1, 270);
INSERT INTO sales_tb VALUES('2021-11-4', 7, 'A003',  1, 180);
INSERT INTO sales_tb VALUES('2021-11-4', 8, 'B002',  1, 140);
INSERT INTO sales_tb VALUES('2021-11-4', 9, 'B001',  1, 125);
INSERT INTO sales_tb VALUES('2021-11-5', 10, 'B003',  1, 120);
INSERT INTO sales_tb VALUES('2021-11-5', 10, 'B004',  1, 150);
INSERT INTO sales_tb VALUES('2021-11-5', 10, 'A003',  1, 180);
INSERT INTO sales_tb VALUES('2021-11-6', 11, 'B003',  1, 120);
INSERT INTO sales_tb VALUES('2021-11-6', 10, 'B004',  1, 150);
复制
输出：
10|2
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

## SQL代码

```sql
with a as(
select *,row_number() over(partition by user_id order by sales_date) as rn
from (select distinct user_id,sales_date
from sales_tb) t
),b as(select*,date_sub(sales_date,interval rn DAY) as days_group
from a
),c as(
    select user_id,count(*)as cnt,days_group
    from b
    group by user_id,days_group
)
select user_id,cnt as days_count
from c
where cnt>=2
order by user_id
```

---



# 牛客直播转换率_牛客题霸_牛客网

## 题目

描述
牛客某页面推出了数据分析系列直播课程介绍。用户可以选择报名任意一场或多场直播课。
已知课程表course_tb如下（其中course_id代表课程编号，course_name表示课程名称，course_datetime代表上课时间）：
course_id	course_name	course_datetime
1	Python	2021-12-1 19:00-21:00
2	SQL	2021-12-2 19:00-21:00

3	R	2021-12-3 19:00-21:00

用户行为表behavior_tb如下（其中user_id表示用户编号、if_vw表示是否浏览、if_fav表示是否收藏、if_sign表示是否报名、course_id代表课程编号）：
user_id	if_vw	if_fav	if_sign	course_id
100	1	1	1	1
100	1	1	1	2
100	1	1	1	3
101	1	1	1	1
101	1	1	1	2
101	1	0	0	3
102	1	1	1	1
102	1	1	1	2
102	1	1	1	3
103	1	1	0	1
103	1	0	0	2
103	1	0	0	3
104	1	1	1	1
104	1	1	1	2
104	1	1	0	3
105	1	0	0	1
106	1	0	0	1
107	1	0	0	1
107	1	1	1	2
108	1	1	1	3
请你统计每个科目的转换率（sign_rate(%)，转化率=报名人数/浏览人数，结果保留两位小数）。
注：按照course_id升序排序。
course_id	course_name	sign_rate(%)
1	Python	50.00
2
	SQL	83.33
3	R	50.00
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

drop table if exists behavior_tb;
CREATE TABLE behavior_tb(
user_id int(10) NOT NULL, 
if_vw int(10) NOT NULL,
if_fav int(10) NOT NULL,
if_sign int(10) NOT NULL,
course_id int(10) NOT NULL);

INSERT INTO behavior_tb VALUES(100, 1, 1, 1, 1);
INSERT INTO behavior_tb VALUES(100, 1, 1, 1, 2);
INSERT INTO behavior_tb VALUES(100, 1, 1, 1, 3);
INSERT INTO behavior_tb VALUES(101, 1, 1, 1, 1);
INSERT INTO behavior_tb VALUES(101, 1, 1, 1, 2);
INSERT INTO behavior_tb VALUES(101, 1, 0, 0, 3);
INSERT INTO behavior_tb VALUES(102, 1, 1, 1, 1);
INSERT INTO behavior_tb VALUES(102, 1, 1, 1, 2);
INSERT INTO behavior_tb VALUES(102, 1, 1, 1, 3);
INSERT INTO behavior_tb VALUES(103, 1, 1, 0, 1);
INSERT INTO behavior_tb VALUES(103, 1, 0, 0, 2);
INSERT INTO behavior_tb VALUES(103, 1, 0, 0, 3);
INSERT INTO behavior_tb VALUES(104, 1, 1, 1, 1);
INSERT INTO behavior_tb VALUES(104, 1, 1, 1, 2);
INSERT INTO behavior_tb VALUES(104, 1, 1, 0, 3);
INSERT INTO behavior_tb VALUES(105, 1, 0, 0, 1);
INSERT INTO behavior_tb VALUES(106, 1, 0, 0, 1);
INSERT INTO behavior_tb VALUES(107, 1, 0, 0, 1);
INSERT INTO behavior_tb VALUES(107, 1, 1, 1, 2);
INSERT INTO behavior_tb VALUES(108, 1, 1, 1, 3);
复制
输出：
1|Python|50.00
2|SQL|83.33
3|R|50.00
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

## SQL代码

```sql
SELECT    cou.course_id, -- 课程ID，用于排序和分组    cou.course_name, -- 课程名称    -- 计算转化率：报名人数 / 浏览人数 * 100，保留两位小数    -- 处理浏览人数为0的情况：用NULLIF将分母转为NULL，除法结果为NULL时，IFNULL转为0        ROUND(SUM(beh.if_sign)/SUM(beh.if_vw )*100,2) AS sign_rate -- 别名不要包含特殊字符，如%，否则需用反引号（但题目要求输出%的话，可在最后拼接）FROM    course_tb cou    JOIN behavior_tb beh ON cou.course_id = beh.course_idGROUP BY    cou.course_id,    cou.course_name -- 同时按ID和名称分组（因ID唯一，名称也唯一）ORDER BY    cou.course_id;  -- 按课程ID升序排序
```

---



# 牛客直播开始时各直播间在线人数_牛客题霸_牛客网

## 题目

描述
牛客某页面推出了数据分析系列直播课程介绍。用户可以选择报名任意一场或多场直播课。
已知课程表course_tb如下（其中course_id代表课程编号，course_name表示课程名称，course_datetime代表上课时间）：
course_id	course_name	course_datetime
1	Python	2021-12-1 19:00-21:00
2	SQL	2021-12-2 19:00-21:00

3	R	2021-12-3 19:00-21:00

上课情况表attend_tb如下（其中user_id表示用户编号、course_id代表课程编号、in_datetime表示进入直播间的时间、out_datetime表示离开直播间的时间）：
user_id	course_id	in_datetime	out_datetime
100	1	2021-12-01 19:00:00
	2021-12-01 19:28:00

100	1	2021-12-01 19:30:00
	2021-12-01 19:53:00

101	1	2021-12-01 19:00:00
	2021-12-01 20:55:00

102	1	2021-12-01 19:00:00
	2021-12-01 19:05:00

104	1	2021-12-01 19:00:00
	2021-12-01 20:59:00

101	2	2021-12-02 19:05:00
	2021-12-02 20:58:00

102	2	2021-12-02 18:55:00
	2021-12-02 21:00:00

104	2	2021-12-02 18:57:00
	2021-12-02 20:56:00

107	2	2021-12-02 19:10:00
	2021-12-02 19:18:00

100	3	2021-12-03 19:01:00
	2021-12-03 21:00:00

102	3	2021-12-03 18:58:00
	2021-12-03 19:05:00

108	3	2021-12-03 19:01:00
	2021-12-03 19:56:00

请你统计直播开始时（19：00），各科目的在线人数，以上例子的输出结果为（按照course_id升序排序）：
course_id	course_name	online_num
1	Python	4
2
	SQL	2
3	R	1
示例1
输入：
CREATE TABLE course_tb(
course_id int(10) NOT NULL, 
course_name char(10) NOT NULL,
course_datetime char(30) NOT NULL);
INSERT INTO course_tb VALUES(1, 'Python', '2021-12-1 19:00-21:00');
INSERT INTO course_tb VALUES(2, 'SQL', '2021-12-2 19:00-21:00');
INSERT INTO course_tb VALUES(3, 'R', '2021-12-3 19:00-21:00');

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
2|SQL|2
3|R|1
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

## SQL代码

```sql
select course_id,
course_name,
count(case when time_format(in_datetime,'%H:%i')<='19:00' then 1 end) as online_num
from course_tb join attend_tb USING(course_id)
group by course_id,course_name
order by course_id
```

---



# 牛客直播各科目平均观看时长_牛客题霸_牛客网

## 题目

描述
牛客某页面推出了数据分析系列直播课程介绍。用户可以选择报名任意一场或多场直播课。
已知课程表course_tb如下（其中course_id代表课程编号，course_name表示课程名称，course_datetime代表上课时间）：
course_id	course_name	course_datetime
1	Python	2021-12-1 19:00-21:00
2	SQL	2021-12-2 19:00-21:00

3	R	2021-12-3 19:00-21:00

上课情况表attend_tb如下（其中user_id表示用户编号、course_id代表课程编号、in_datetime表示进入直播间的时间、out_datetime表示离开直播间的时间）：
user_id	course_id	in_datetime	out_datetime
100	1	2021-12-01 19:00:00
	2021-12-01 19:28:00

100	1	2021-12-01 19:30:00
	2021-12-01 19:53:00

101	1	2021-12-01 19:00:00
	2021-12-01 20:55:00

102	1	2021-12-01 19:00:00
	2021-12-01 19:05:00

104	1	2021-12-01 19:00:00
	2021-12-01 20:59:00

101	2	2021-12-02 19:05:00
	2021-12-02 20:58:00

102	2	2021-12-02 18:55:00
	2021-12-02 21:00:00

104	2	2021-12-02 18:57:00
	2021-12-02 20:56:00

107	2	2021-12-02 19:10:00
	2021-12-02 19:18:00

100	3	2021-12-03 19:01:00
	2021-12-03 21:00:00

102	3	2021-12-03 18:58:00
	2021-12-03 19:05:00

108	3	2021-12-03 19:01:00
	2021-12-03 19:56:00

请你统计每个科目的平均观看时长（观看时长定义为离开直播间的时间与进入直播间的时间之差，单位是分钟），输出结果按平均观看时长降序排序，结果保留两位小数。
course_name	avg_Len
SQL	91.25
R	60.33
Python	58.00
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
SQL|91.25
R|60.33
Python|58.00
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

## SQL代码

```sql
select course_name,
ROUND(avg(timestampdiff(MINUTE,in_datetime,out_datetime)),2) as avg_Len
from course_tb RIGHT JOIN attend_tb USING(course_id)
group by course_name
order by avg_Len desc
```

---



# 牛客直播各科目出勤率_牛客题霸_牛客网

## 题目

描述
牛客某页面推出了数据分析系列直播课程介绍。用户可以选择报名任意一场或多场直播课。
已知课程表course_tb如下（其中course_id代表课程编号，course_name表示课程名称，course_datetime代表上课时间）：
course_id	course_name	course_datetime
1	Python	2021-12-1 19:00-21:00
2	SQL	2021-12-2 19:00-21:00

3	R	2021-12-3 19:00-21:00

用户行为表behavior_tb如下（其中user_id表示用户编号、if_vw表示是否浏览、if_fav表示是否收藏、if_sign表示是否报名、course_id代表课程编号）：
user_id	if_vw	if_fav	if_sign	course_id
100	1	1	1	1
100	1	1	1	2
100	1	1	1	3
101	1	1	1	1
101	1	1	1	2
101	1	0	0	3
102	1	1	1	1
102	1	1	1	2
102	1	1	1	3
103	1	1	0	1
103	1	0	0	2
103	1	0	0	3
104	1	1	1	1
104	1	1	1	2
104	1	1	0	3
105	1	0	0	1
106	1	0	0	1
107	1	0	0	1
107	1	1	1	2
108	1	1	1	3
上课情况表attend_tb如下（其中user_id表示用户编号、course_id代表课程编号、in_datetime表示进入直播间的时间、out_datetime表示离开直播间的时间）：
user_id	course_id	in_datetime	out_datetime

100	1	2021-12-01  19:00:00	2021-12-01  19:28:00

100
	1	2021-12-01  19:30:00
	2021-12-01  19:53:00

101
	1	2021-12-01  19:00:00
	2021-12-01  20:55:00

102
	1	2021-12-01  19:00:00
	2021-12-01  19:05:00

104
	1	2021-12-01  19:00:00
	2021-12-01  20:59:00

101
	2	2021-12-02  19:05:00
	2021-12-02  20:58:00

102
	2	2021-12-02  18:55:00
	2021-12-02  21:00:00

104
	2	2021-12-02  18:57:00
	2021-12-02  20:56:00

107
	2	2021-12-02  19:10:00
	2021-12-02  19:18:00

100	3	2021-12-03  19:01:00
	2021-12-03  21:00:00

102	3	2021-12-03  18:58:00
	2021-12-03  19:05:00

108	3	2021-12-03  19:01:00
	2021-12-03  19:56:00

请你统计每个科目的出勤率（attend_rate(%)，结果保留两位小数），出勤率=出勤（在线时长10分钟及以上）人数 / 报名人数，输出结果按course_id升序排序，以上数据的输出结果如下：
course_id	course_name	attend_rate(%)
1	Python	75.00
2	SQL	60.00
3	R	66.67
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

drop table if exists behavior_tb;
CREATE TABLE behavior_tb(
user_id int(10) NOT NULL, 
if_vw int(10) NOT NULL,
if_fav int(10) NOT NULL,
if_sign int(10) NOT NULL,
course_id int(10) NOT NULL);

INSERT INTO behavior_tb VALUES(100, 1, 1, 1, 1);
INSERT INTO behavior_tb VALUES(100, 1, 1, 1, 2);
INSERT INTO behavior_tb VALUES(100, 1, 1, 1, 3);
INSERT INTO behavior_tb VALUES(101, 1, 1, 1, 1);
INSERT INTO behavior_tb VALUES(101, 1, 1, 1, 2);
INSERT INTO behavior_tb VALUES(101, 1, 0, 0, 3);
INSERT INTO behavior_tb VALUES(102, 1, 1, 1, 1);
INSERT INTO behavior_tb VALUES(102, 1, 1, 1, 2);
INSERT INTO behavior_tb VALUES(102, 1, 1, 1, 3);
INSERT INTO behavior_tb VALUES(103, 1, 1, 0, 1);
INSERT INTO behavior_tb VALUES(103, 1, 0, 0, 2);
INSERT INTO behavior_tb VALUES(103, 1, 0, 0, 3);
INSERT INTO behavior_tb VALUES(104, 1, 1, 1, 1);
INSERT INTO behavior_tb VALUES(104, 1, 1, 1, 2);
INSERT INTO behavior_tb VALUES(104, 1, 1, 0, 3);
INSERT INTO behavior_tb VALUES(105, 1, 0, 0, 1);
INSERT INTO behavior_tb VALUES(106, 1, 0, 0, 1);
INSERT INTO behavior_tb VALUES(107, 1, 0, 0, 1);
INSERT INTO behavior_tb VALUES(107, 1, 1, 1, 2);
INSERT INTO behavior_tb VALUES(108, 1, 1, 1, 3);

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
1|Python|75.00
2|SQL|60.00
3|R|66.67
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

## SQL代码

```sql
with temp1 as(  select course_id,  sum(if_sign) as total_numbers  from behavior_tb  group by course_id ),temp2 as ( select course_id,user_id, sum(timestampdiff(second,if(time_format(in_datetime,'%H')<19,concat(date(in_datetime),' ','19:00:00'),in_datetime) ,out_datetime)/60) as total_user_minutes from attend_tb group by course_id,user_id having total_user_minutes>=10) select course_id,course_name, round(count(user_id)/total_numbers*100,2) as'attend_rate(%)'from course_tb JOIN temp1 USING(course_id) JOIN temp2 USING(course_id) group by course_id,course_name order by course_id
```

---



# 牛客直播各科目同时在线人数_牛客题霸_牛客网

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

## SQL代码

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

---



# 某乎问答11月份日人均回答量_牛客题霸_牛客网

## 题目

描述
现有某乎问答创作者回答情况表answer_tb如下（其中answer_date表示创作日期、author_id指创作者编号、issue_id表示问题id、char_len表示回答字数）：


请你统计11月份日人均回答量（回答问题数量/答题人数），按回答日期排序，结果保留两位小数，以上例子的输出结果如下：




示例1
输入：
drop table if exists answer_tb;
CREATE TABLE answer_tb(
answer_date date NOT NULL, 
author_id int(10) NOT NULL,
issue_id char(10) NOT NULL,
char_len int(10) NOT NULL);
INSERT INTO answer_tb VALUES('2021-11-1', 101, 'E001' ,150);
INSERT INTO answer_tb VALUES('2021-11-1', 101, 'E002', 200);
INSERT INTO answer_tb VALUES('2021-11-1',102, 'C003' ,50);
INSERT INTO answer_tb VALUES('2021-11-1' ,103, 'P001', 35);
INSERT INTO answer_tb VALUES('2021-11-1', 104, 'C003', 120);
INSERT INTO answer_tb VALUES('2021-11-1' ,105, 'P001', 125);
INSERT INTO answer_tb VALUES('2021-11-1' , 102, 'P002', 105);
INSERT INTO answer_tb VALUES('2021-11-2',  101, 'P001' ,201);
INSERT INTO answer_tb VALUES('2021-11-2',  110, 'C002', 200);
INSERT INTO answer_tb VALUES('2021-11-2',  110, 'C001', 225);
INSERT INTO answer_tb VALUES('2021-11-2' , 110, 'C002', 220);
INSERT INTO answer_tb VALUES('2021-11-3', 101, 'C002', 180);
INSERT INTO answer_tb VALUES('2021-11-4' ,109, 'E003', 130);
INSERT INTO answer_tb VALUES('2021-11-4', 109, 'E001',123);
INSERT INTO answer_tb VALUES('2021-11-5', 108, 'C001',160);
INSERT INTO answer_tb VALUES('2021-11-5', 108, 'C002', 120);
INSERT INTO answer_tb VALUES('2021-11-5', 110, 'P001', 180);
INSERT INTO answer_tb VALUES('2021-11-5' , 106, 'P002' , 45);
INSERT INTO answer_tb VALUES('2021-11-5' , 107, 'E003', 56);
复制
输出：
2021-11-01|1.40
2021-11-02|2.00
2021-11-03|1.00
2021-11-04|2.00
2021-11-05|1.25
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

## SQL代码

```sql
SELECT answer_date,
ROUND(COUNT(issue_id)/COUNT(distinct author_id),2) as per_num
FROM answer_tb
GROUP BY answer_date
ORDER BY answer_date
```

---



# 某乎问答高质量的回答中用户属于各级别的数量_牛客题霸_牛客网

## 题目

描述
现有某乎问答创作者信息表author_tb如下(其中author_id表示创作者编号、author_level表示创作者级别，共1-6六个级别、sex表示创作者性别)：
author_id	author_level	sex
101	6	m
102	1	f
103	1	m
104	3	m
105	4	f
106	2	f
107	2	m
108	5	f
109	6	f
110	5	m
创作者回答情况表answer_tb如下（其中answer_date表示创作日期、author_id指创作者编号、issue_id指问题编号、char_len表示回答字数）：

answer_date	author_id	issue_id	char_len
2021-11-01	101	E001	150
2021-11-01
	101	E002	200
2021-11-01
	102	C003	50
2021-11-01
	103	P001	35
2021-11-01
	104	C003	120
2021-11-01
	105	P001	125
2021-11-01
	102	P002	105
2021-11-02
	101	P001	201
2021-11-02
	110	C002	200
2021-11-02
	110	C001	225
2021-11-02
	110	C002	220
2021-11-03
	101	C002	180
2021-11-04
	109	E003	130
2021-11-04
	109	E001	123
2021-11-05
	108	C001	160
2021-11-05
	108	C002	120
2021-11-05
	110	P001	180
2021-11-05
	106	P002	45
2021-11-05
	107	E003	56
回答字数大于等于100字的认为是高质量回答，请你统计某乎问答高质量的回答中用户属于1-2级、3-4级、5-6级的题目数量分别是多少，按题目数量降序排列，以上例子的输出结果如下：
level_cut	num
5-6级	12
3-4级
	2
1-2级
	1


示例1
输入：
drop table if exists author_tb;
CREATE TABLE author_tb(
author_id int(10) NOT NULL, 
author_level int(10) NOT NULL,
sex char(10) NOT NULL);
INSERT INTO author_tb VALUES(101 , 6, 'm');
INSERT INTO author_tb VALUES(102 , 1, 'f');
INSERT INTO author_tb VALUES(103 , 1, 'm');
INSERT INTO author_tb VALUES(104 , 3, 'm');
INSERT INTO author_tb VALUES(105 , 4, 'f');
INSERT INTO author_tb VALUES(106 , 2, 'f');
INSERT INTO author_tb VALUES(107 , 2, 'm');
INSERT INTO author_tb VALUES(108 , 5, 'f');
INSERT INTO author_tb VALUES(109 , 6, 'f');
INSERT INTO author_tb VALUES(110 , 5, 'm');

drop table if exists answer_tb;
CREATE TABLE answer_tb(
answer_date date NOT NULL, 
author_id int(10) NOT NULL,
issue_id char(10) NOT NULL,
char_len int(10) NOT NULL);
INSERT INTO answer_tb VALUES('2021-11-1', 101, 'E001' ,150);
INSERT INTO answer_tb VALUES('2021-11-1', 101, 'E002', 200);
INSERT INTO answer_tb VALUES('2021-11-1',102, 'C003' ,50);
INSERT INTO answer_tb VALUES('2021-11-1' ,103, 'P001', 35);
INSERT INTO answer_tb VALUES('2021-11-1', 104, 'C003', 120);
INSERT INTO answer_tb VALUES('2021-11-1' ,105, 'P001', 125);
INSERT INTO answer_tb VALUES('2021-11-1' , 102, 'P002', 105);
INSERT INTO answer_tb VALUES('2021-11-2',  101, 'P001' ,201);
INSERT INTO answer_tb VALUES('2021-11-2',  110, 'C002', 200);
INSERT INTO answer_tb VALUES('2021-11-2',  110, 'C001', 225);
INSERT INTO answer_tb VALUES('2021-11-2' , 110, 'C002', 220);
INSERT INTO answer_tb VALUES('2021-11-3', 101, 'C002', 180);
INSERT INTO answer_tb VALUES('2021-11-4' ,109, 'E003', 130);
INSERT INTO answer_tb VALUES('2021-11-4', 109, 'E001',123);
INSERT INTO answer_tb VALUES('2021-11-5', 108, 'C001',160);
INSERT INTO answer_tb VALUES('2021-11-5', 108, 'C002', 120);
INSERT INTO answer_tb VALUES('2021-11-5', 110, 'P001', 180);
INSERT INTO answer_tb VALUES('2021-11-5' , 106, 'P002' , 45);
INSERT INTO answer_tb VALUES('2021-11-5' , 107, 'E003', 56);
复制
输出：
5-6级|12
3-4级|2
1-2级|1
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

## SQL代码

```sql
SELECT (case when au.author_level >= 5 then '5-6级'
when au.author_level<=2 then '1-2级'
else '3-4级' end) level_cut,
COUNT(an.author_id) num
FROM author_tb au JOIN answer_tb an ON au.author_id = an.author_id
WHERE an.char_len >= 100
GROUP BY level_cut
ORDER BY num desc
```

---



# 某乎问答单日回答问题数大于等于3个的所有用户_牛客题霸_牛客网

## 题目

描述
现有某乎问答创作者回答情况表answer_tb如下（其中answer_date表示创作日期、author_id指创作者编号、issue_id指回答问题编号、char_len表示回答字数）：
answer_date	author_id	issue_id	char_len
2021-11-01	101	E001	150
2021-11-01
	101	E002	200
2021-11-01
	102	C003	50
2021-11-01
	103	P001	35
2021-11-01
	104	C003	120
2021-11-01
	105	P001	125
2021-11-01
	102	P002	105
2021-11-02
	101	P001	201
2021-11-02
	110	C002	200
2021-11-02
	110	C001	225
2021-11-02
	110	C002	220
2021-11-03
	101	C002	180
2021-11-04
	109	E003	130
2021-11-04
	109	E001	123
2021-11-05
	108	C001	160
2021-11-05
	108	C002	120
2021-11-05
	110	P001	180
2021-11-05
	106	P002	45
2021-11-05
	107	E003	56
请你统计11月份单日回答问题数大于等于3个的所有用户信息（author_date表示回答日期、author_id表示创作者id，answer_cnt表示回答问题个数），以上例子的输出结果如下：
answer_date	author_id	answer_cnt
2021-11-02	110	3
注：若有多条数据符合条件，按answer_date、author_id升序排序。


示例1
输入：
drop table if exists answer_tb;
CREATE TABLE answer_tb(
answer_date date NOT NULL, 
author_id int(10) NOT NULL,
issue_id char(10) NOT NULL,
char_len int(10) NOT NULL);
INSERT INTO answer_tb VALUES('2021-11-1', 101, 'E001' ,150);
INSERT INTO answer_tb VALUES('2021-11-1', 101, 'E002', 200);
INSERT INTO answer_tb VALUES('2021-11-1',102, 'C003' ,50);
INSERT INTO answer_tb VALUES('2021-11-1' ,103, 'P001', 35);
INSERT INTO answer_tb VALUES('2021-11-1', 104, 'C003', 120);
INSERT INTO answer_tb VALUES('2021-11-1' ,105, 'P001', 125);
INSERT INTO answer_tb VALUES('2021-11-1' , 102, 'P002', 105);
INSERT INTO answer_tb VALUES('2021-11-2',  101, 'P001' ,201);
INSERT INTO answer_tb VALUES('2021-11-2',  110, 'C002', 200);
INSERT INTO answer_tb VALUES('2021-11-2',  110, 'C001', 225);
INSERT INTO answer_tb VALUES('2021-11-2' , 110, 'C002', 220);
INSERT INTO answer_tb VALUES('2021-11-3', 101, 'C002', 180);
INSERT INTO answer_tb VALUES('2021-11-4' ,109, 'E003', 130);
INSERT INTO answer_tb VALUES('2021-11-4', 109, 'E001',123);
INSERT INTO answer_tb VALUES('2021-11-5', 108, 'C001',160);
INSERT INTO answer_tb VALUES('2021-11-5', 108, 'C002', 120);
INSERT INTO answer_tb VALUES('2021-11-5', 110, 'P001', 180);
INSERT INTO answer_tb VALUES('2021-11-5' , 106, 'P002' , 45);
INSERT INTO answer_tb VALUES('2021-11-5' , 107, 'E003', 56);
复制
输出：
2021-11-02|110|3
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

## SQL代码

```sql
select answer_date,
author_id,
count(*) answer_cnt
from answer_tb
where answer_date like '2021-11-%'
group by answer_date,author_id
having count(*) >= 3
order by answer_date,author_id
```

---



# 某乎问答回答过教育类问题的用户里有多少用户回答过职场类问题_牛客题霸_牛客网

## 题目

描述
现有某乎问答题目信息表issue_tb如下（其中issue_id代表问题编号，issue_type表示问题类型）：
issue_id	issue_type
E001	Education
E002	Education

E003	Education

C001	Career

C002	Career
C003	Career

C004	Career

P001	Psychology
P002	Psychology

创作者回答情况表answer_tb如下（其中answer_date表示创作日期、author_id指创作者编号、issue_id指回答问题编号、char_len表示回答字数）：

answer_date	author_id	issue_id	char_len
2021-11-01	101	E001	150
2021-11-01
	101	E002	200
2021-11-01
	102	C003	50
2021-11-01
	103	P001	35
2021-11-01
	104	C003	120
2021-11-01
	105	P001	125
2021-11-01
	102	P002	105
2021-11-02
	101	P001	201
2021-11-02
	110	C002	200
2021-11-02
	110	C001	225
2021-11-02
	110	C002	220
2021-11-03
	101	C002	180
2021-11-04
	109	E003	130
2021-11-04
	109	E001	123
2021-11-05
	108	C001	160
2021-11-05
	108	C002	120
2021-11-05
	110	P001	180
2021-11-05
	106	P002	45
2021-11-05
	107	E003	56
请你统计回答过教育类问题的用户里有多少用户回答过职场类问题，以上例子的输出结果如下：
num
1


示例1
输入：
drop table if exists issue_tb;
CREATE TABLE issue_tb(
issue_id char(10) NOT NULL, 
issue_type char(10) NOT NULL);
INSERT INTO issue_tb VALUES('E001' ,'Education');
INSERT INTO issue_tb VALUES('E002' ,'Education');
INSERT INTO issue_tb VALUES('E003' ,'Education');
INSERT INTO issue_tb VALUES('C001', 'Career');
INSERT INTO issue_tb VALUES('C002', 'Career');
INSERT INTO issue_tb VALUES('C003', 'Career');
INSERT INTO issue_tb VALUES('C004', 'Career');
INSERT INTO issue_tb VALUES('P001' ,'Psychology');
INSERT INTO issue_tb VALUES('P002' ,'Psychology');

drop table if exists answer_tb;
CREATE TABLE answer_tb(
answer_date date NOT NULL, 
author_id int(10) NOT NULL,
issue_id char(10) NOT NULL,
char_len int(10) NOT NULL);
INSERT INTO answer_tb VALUES('2021-11-1', 101, 'E001' ,150);
INSERT INTO answer_tb VALUES('2021-11-1', 101, 'E002', 200);
INSERT INTO answer_tb VALUES('2021-11-1',102, 'C003' ,50);
INSERT INTO answer_tb VALUES('2021-11-1' ,103, 'P001', 35);
INSERT INTO answer_tb VALUES('2021-11-1', 104, 'C003', 120);
INSERT INTO answer_tb VALUES('2021-11-1' ,105, 'P001', 125);
INSERT INTO answer_tb VALUES('2021-11-1' , 102, 'P002', 105);
INSERT INTO answer_tb VALUES('2021-11-2',  101, 'P001' ,201);
INSERT INTO answer_tb VALUES('2021-11-2',  110, 'C002', 200);
INSERT INTO answer_tb VALUES('2021-11-2',  110, 'C001', 225);
INSERT INTO answer_tb VALUES('2021-11-2' , 110, 'C002', 220);
INSERT INTO answer_tb VALUES('2021-11-3', 101, 'C002', 180);
INSERT INTO answer_tb VALUES('2021-11-4' ,109, 'E003', 130);
INSERT INTO answer_tb VALUES('2021-11-4', 109, 'E001',123);
INSERT INTO answer_tb VALUES('2021-11-5', 108, 'C001',160);
INSERT INTO answer_tb VALUES('2021-11-5', 108, 'C002', 120);
INSERT INTO answer_tb VALUES('2021-11-5', 110, 'P001', 180);
INSERT INTO answer_tb VALUES('2021-11-5' , 106, 'P002' , 45);
INSERT INTO answer_tb VALUES('2021-11-5' , 107, 'E003', 56);
复制
输出：
1
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

## SQL代码

```sql
select
    count(distinct author_id) as num
from
    answer_tb
    join issue_tb using (issue_id)
where
    issue_type = 'Career'
    and author_id in (
        #统计回答过教育类问题的用户
        select distinct
            author_id
        from
            answer_tb
            join issue_tb using (issue_id)
        where
            issue_type = 'Education'
    )
```

---



# 某乎问答最大连续回答问题天数大于等于3天的用户及其对应等级_牛客题霸_牛客网

## 题目

描述
现有某乎问答创作者信息表author_tb如下(其中author_id表示创作者编号、author_level表示创作者级别，共1-6六个级别、sex表示创作者性别)：
author_id	author_level	sex
101	6	m
102	1	f
103	1	m
104	3	m
105	4	f
106	2	f
107	2	m
108	5	f
109	6	f
110	5	m
创作者回答情况表answer_tb如下（其中answer_date表示创作日期、author_id指创作者编号、issue_id指回答问题编号、char_len表示回答字数）：

answer_date	author_id	issue_id	char_len
2021-11-01	101	E001	150
2021-11-01
	101	E002	200
2021-11-01
	102	C003	50
2021-11-01
	103	P001	35
2021-11-01
	104	C003	120
2021-11-01
	105	P001	125
2021-11-01
	102	P002	105
2021-11-02
	101	P001	201
2021-11-02
	110	C002	200
2021-11-02
	110	C001	225
2021-11-02
	110	C002	220
2021-11-03
	101	C002	180
2021-11-04
	109	E003	130
2021-11-04
	109	E001	123
2021-11-05
	108	C001	160
2021-11-05
	108	C002	120
2021-11-05
	110	P001	180
2021-11-05
	106	P002	45
2021-11-05
	107	E003	56
请你统计最大连续回答问题的天数大于等于3天的用户及其等级（若有多条符合条件的数据，按author_id升序排序），以上例子的输出结果如下：
author_id	author_level
	days_cnt
101	6	3
示例1
输入：
drop table if exists author_tb;
CREATE TABLE author_tb(
author_id int(10) NOT NULL, 
author_level int(10) NOT NULL,
sex char(10) NOT NULL);
INSERT INTO author_tb VALUES(101 , 6, 'm');
INSERT INTO author_tb VALUES(102 , 1, 'f');
INSERT INTO author_tb VALUES(103 , 1, 'm');
INSERT INTO author_tb VALUES(104 , 3, 'm');
INSERT INTO author_tb VALUES(105 , 4, 'f');
INSERT INTO author_tb VALUES(106 , 2, 'f');
INSERT INTO author_tb VALUES(107 , 2, 'm');
INSERT INTO author_tb VALUES(108 , 5, 'f');
INSERT INTO author_tb VALUES(109 , 6, 'f');
INSERT INTO author_tb VALUES(110 , 5, 'm');

drop table if exists answer_tb;
CREATE TABLE answer_tb(
answer_date date NOT NULL, 
author_id int(10) NOT NULL,
issue_id char(10) NOT NULL,
char_len int(10) NOT NULL);
INSERT INTO answer_tb VALUES('2021-11-1', 101, 'E001' ,150);
INSERT INTO answer_tb VALUES('2021-11-1', 101, 'E002', 200);
INSERT INTO answer_tb VALUES('2021-11-1',102, 'C003' ,50);
INSERT INTO answer_tb VALUES('2021-11-1' ,103, 'P001', 35);
INSERT INTO answer_tb VALUES('2021-11-1', 104, 'C003', 120);
INSERT INTO answer_tb VALUES('2021-11-1' ,105, 'P001', 125);
INSERT INTO answer_tb VALUES('2021-11-1' , 102, 'P002', 105);
INSERT INTO answer_tb VALUES('2021-11-2',  101, 'P001' ,201);
INSERT INTO answer_tb VALUES('2021-11-2',  110, 'C002', 200);
INSERT INTO answer_tb VALUES('2021-11-2',  110, 'C001', 225);
INSERT INTO answer_tb VALUES('2021-11-2' , 110, 'C002', 220);
INSERT INTO answer_tb VALUES('2021-11-3', 101, 'C002', 180);
INSERT INTO answer_tb VALUES('2021-11-4' ,109, 'E003', 130);
INSERT INTO answer_tb VALUES('2021-11-4', 109, 'E001',123);
INSERT INTO answer_tb VALUES('2021-11-5', 108, 'C001',160);
INSERT INTO answer_tb VALUES('2021-11-5', 108, 'C002', 120);
INSERT INTO answer_tb VALUES('2021-11-5', 110, 'P001', 180);
INSERT INTO answer_tb VALUES('2021-11-5' , 106, 'P002' , 45);
INSERT INTO answer_tb VALUES('2021-11-5' , 107, 'E003', 56);
复制
输出：
101|6|3
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

## SQL代码

```sql
with temp1 as(
    select *,
    DENSE_RANK() OVER (PARTITION BY author_id order by answer_date) as cont
    from answer_tb
),temp2 as(
    select answer_date,
    author_id,
    date_sub(answer_date,interval cont day) as dt
    from temp1
)
select distinct author_id,
author_level,
days_cnt
from (
    select author_id,
    count(distinct answer_date) as days_cnt
    from temp2
    group by author_id,dt
    having days_cnt >= 3
) t1 left join author_tb t2 using(author_id)
order by author_id
```

---

